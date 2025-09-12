import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { blogService } from '../../services/blogService';

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Always try to get published blogs
        const publishedResult = await blogService.getAllBlogs('published', 50);
        let drafts = [];

        // Try to get drafts (may fail if not authenticated as admin per rules)
        try {
          const draftResult = await blogService.getAllBlogs('draft', 50);
          drafts = draftResult.blogs;
        } catch (draftErr) {
          console.warn('Could not fetch drafts (likely permissions). Showing published only.');
        }
        
        const allBlogs = [
          ...publishedResult.blogs,
          ...drafts
        ].sort((a, b) => {
          const aDate = a.updatedAt?.toDate?.() || (a.updatedAt?.seconds ? new Date(a.updatedAt.seconds * 1000) : new Date(a.updatedAt || 0));
          const bDate = b.updatedAt?.toDate?.() || (b.updatedAt?.seconds ? new Date(b.updatedAt.seconds * 1000) : new Date(b.updatedAt || 0));
          return bDate.getTime() - aDate.getTime();
        });
        
        setBlogs(allBlogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        toast({
          title: "Error",
          description: "Failed to fetch blogs",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [toast]);

  const handleDelete = async (id, title) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      await blogService.deleteBlog(id);
      setBlogs(blogs.filter(blog => blog.id !== id));
      toast({
        title: "Success",
        description: "Blog post deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive",
      });
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    
    let date;
    if (timestamp.toDate) {
      date = timestamp.toDate();
    } else if (timestamp.seconds) {
      date = new Date(timestamp.seconds * 1000);
    } else {
      date = new Date(timestamp);
    }
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Manage Blogs</h1>
        </div>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Manage Blogs</h1>
          <p className="text-gray-600 mt-1">Create, edit, and manage your blog posts</p>
        </div>
        <Link to="/admin/add-blog">
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add New Post
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blogs.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Published</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {blogs.filter(blog => blog.status === 'published').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Drafts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {blogs.filter(blog => blog.status === 'draft').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Blog Posts Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Blog Posts</CardTitle>
        </CardHeader>
        <CardContent>
          {blogs.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">📝</div>
              <p className="text-gray-600 mb-4">No blog posts yet</p>
              <Link to="/admin/add-blog">
                <Button>Create Your First Post</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {blogs.map((blog) => (
                <div key={blog.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{blog.title}</h3>
                      <Badge variant={blog.status === 'published' ? 'default' : 'secondary'}>
                        {blog.status}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                      {blog.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      {blog.author && (
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {blog.author}
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(blog.updatedAt || blog.createdAt)}
                      </div>
                      {blog.views > 0 && (
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {blog.views} views
                        </div>
                      )}
                    </div>
                    
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {blog.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {blog.tags.length > 3 && (
                          <span className="text-xs text-gray-500">+{blog.tags.length - 3} more</span>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    {blog.status === 'published' && (
                      <Link to={`/blog/${blog.slug}`} target="_blank">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                    )}
                    <Link to={`/admin/edit-blog/${blog.id}`}>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(blog.id, blog.title)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageBlogs;