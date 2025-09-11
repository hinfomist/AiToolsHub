import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Tag, Mail, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AdSlot from '@/components/AdSlot';
import { blogService } from '../services/blogService';
import { categoryService } from '../services/categoryService';

interface BlogSidebarProps {
  currentPostId?: string;
}

const BlogSidebar = ({ currentPostId }: BlogSidebarProps) => {
  const [recentPosts, setRecentPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  useEffect(() => {
    const fetchSidebarData = async () => {
      try {
        // Fetch recent posts
        const { blogs } = await blogService.getAllBlogs('published', 5);
        const filteredPosts = blogs.filter(blog => blog.id !== currentPostId);
        setRecentPosts(filteredPosts.slice(0, 4));

        // Fetch categories for tools
        const categoriesData = await categoryService.getCategories();
        setCategories(categoriesData.slice(0, 8));
      } catch (error) {
        console.error('Error fetching sidebar data:', error);
      }
    };

    fetchSidebarData();
  }, [currentPostId]);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);
    
    // Simulate newsletter signup
    setTimeout(() => {
      setIsSubscribing(false);
      setEmail('');
      // You can integrate with your newsletter service here
    }, 1000);
  };

  const formatDate = (timestamp: any) => {
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
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <aside className="w-full lg:w-80 space-y-8">
      {/* Ad Slot */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-medium">SPONSORED</span>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <AdSlot position="sidebar" className="w-full h-60 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg flex items-center justify-center text-sm text-muted-foreground" />
        </CardContent>
      </Card>

      {/* Newsletter Signup */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-600 to-blue-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Mail className="h-5 w-5" />
            AI Tools Newsletter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-purple-100 mb-4 text-sm leading-relaxed">
            Get the latest AI tool insights, trends, and exclusive content delivered to your inbox weekly.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="space-y-3">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/20 border-white/30 text-white placeholder:text-purple-200 focus:bg-white/30"
              required
            />
            <Button
              type="submit"
              disabled={isSubscribing}
              className="w-full bg-white text-purple-600 hover:bg-white/90 font-medium"
            >
              {isSubscribing ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="h-5 w-5 text-purple-600" />
              Recent Posts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group block"
              >
                <article className="flex gap-3 p-3 rounded-lg hover:bg-purple-50/50 transition-colors">
                  {post.featuredImage && (
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm leading-tight line-clamp-2 group-hover:text-purple-600 transition-colors mb-1">
                      {post.title}
                    </h4>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(post.createdAt)}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Tool Categories */}
      {categories.length > 0 && (
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Tag className="h-5 w-5 text-purple-600" />
              AI Tool Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Explore AI tools by category
            </p>
            <div className="space-y-2">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/categories/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="group block"
                >
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-purple-50 transition-colors">
                    <span className="text-sm font-medium group-hover:text-purple-600 transition-colors">
                      {category.name}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {category.toolCount || 0}
                    </Badge>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <Link to="/categories">
                <Button variant="outline" size="sm" className="w-full text-purple-600 border-purple-200 hover:bg-purple-50">
                  View All Categories
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Ad Slot Bottom */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="text-center mb-2">
            <span className="text-xs text-muted-foreground font-medium">ADVERTISEMENT</span>
          </div>
          <AdSlot position="sidebar" className="w-full h-40 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center text-sm text-muted-foreground" />
        </CardContent>
      </Card>
    </aside>
  );
};

export default BlogSidebar;