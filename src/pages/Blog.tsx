import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, Tag, ChevronRight, Home } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { blogService } from '../services/blogService';
import { Helmet } from 'react-helmet-async';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { blogs: blogData, lastVisible, hasMore: hasMoreData } = await blogService.getAllBlogs('published', 10);
        setBlogs(blogData);
        setLastDoc(lastVisible);
        setHasMore(hasMoreData);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const loadMoreBlogs = async () => {
    if (!hasMore || loadingMore) return;

    setLoadingMore(true);
    try {
      const { blogs: moreBlogData, lastVisible, hasMore: hasMoreData } = await blogService.getAllBlogs('published', 10, lastDoc);
      setBlogs(prev => [...prev, ...moreBlogData]);
      setLastDoc(lastVisible);
      setHasMore(hasMoreData);
    } catch (error) {
      console.error('Error loading more blogs:', error);
    } finally {
      setLoadingMore(false);
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
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content?.replace(/<[^>]*>/g, '').split(/\s+/).length || 0;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-lg p-6 space-y-4">
                  <div className="h-48 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Blog - AI Tool Finder | Latest Insights & Trends</title>
        <meta name="description" content="Stay updated with the latest AI tool insights, industry trends, and productivity tips. Discover how AI is transforming various industries." />
        <meta property="og:title" content="Blog - AI Tool Finder" />
        <meta property="og:description" content="Latest insights on AI tools and industry trends" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`${window.location.origin}/blog`} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                AI Tool Finder
              </Link>
              <div className="flex items-center space-x-4">
                <Link to="/categories" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">
                  Categories
                </Link>
                <Link to="/blog" className="text-purple-600 font-medium">
                  Blog
                </Link>
                <Link to="/submit" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">
                  Submit Tool
                </Link>
                <Link to="/auth">
                  <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Breadcrumb */}
        <div className="max-w-6xl mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-purple-600 transition-colors flex items-center">
              <Home className="h-4 w-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-purple-600 font-medium">Blog</span>
          </nav>
        </div>

        {/* Header */}
        <header className="max-w-6xl mx-auto px-4 py-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            AI Tools Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest insights, trends, and tips in the AI tools ecosystem
          </p>
        </header>

        {/* Blog Grid */}
        <main className="max-w-6xl mx-auto px-4 pb-16">
          {blogs.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📝</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">No Blog Posts Yet</h2>
              <p className="text-gray-600">Check back soon for the latest insights on AI tools!</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                  <article key={blog.id} className="group">
                    <Link to={`/blog/${blog.slug}`}>
                      <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm overflow-hidden group-hover:scale-105">
                        {/* Featured Image */}
                        {blog.featuredImage && (
                          <div className="aspect-video overflow-hidden">
                            <img
                              src={blog.featuredImage}
                              alt={blog.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        )}
                        
                        <CardContent className="p-6">
                          {/* Meta Info */}
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {formatDate(blog.createdAt)}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {getReadingTime(blog.content)}
                            </div>
                          </div>

                          {/* Title */}
                          <h2 className="text-xl font-bold mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                            {blog.title}
                          </h2>

                          {/* Excerpt */}
                          <p className="text-gray-600 mb-4 line-clamp-3">
                            {blog.excerpt}
                          </p>

                          {/* Author */}
                          {blog.author && (
                            <div className="flex items-center gap-2 mb-4">
                              <User className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-600">by {blog.author}</span>
                            </div>
                          )}

                          {/* Tags */}
                          {blog.tags && blog.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
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

                          {/* Categories */}
                          {blog.categories && blog.categories.length > 0 && (
                            <div className="flex items-center gap-2">
                              <Tag className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-purple-600 font-medium">
                                {blog.categories[0]}
                              </span>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </Link>
                  </article>
                ))}
              </div>

              {/* Load More */}
              {hasMore && (
                <div className="text-center mt-12">
                  <Button
                    onClick={loadMoreBlogs}
                    disabled={loadingMore}
                    variant="outline"
                    size="lg"
                    className="border-purple-200 text-purple-600 hover:bg-purple-50"
                  >
                    {loadingMore ? 'Loading...' : 'Load More Posts'}
                  </Button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default Blog;