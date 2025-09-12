import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, Tag, ChevronRight, Home, ArrowRight, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { blogService } from '../services/blogService';
import { Helmet } from 'react-helmet-async';
import BlogSidebar from '@/components/BlogSidebar';
import blogHeroImage from '@/assets/blog-hero.jpg';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { blogs: blogData, lastVisible, hasMore: hasMoreData } = await blogService.getAllBlogs('published', 12);
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
      const { blogs: moreBlogData, lastVisible, hasMore: hasMoreData } = await blogService.getAllBlogs('published', 6, lastDoc);
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            {/* Hero skeleton */}
            <div className="h-96 bg-gray-200 rounded-2xl mb-12"></div>
            
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-white rounded-xl shadow-sm p-6 space-y-4">
                      <div className="h-48 bg-gray-200 rounded-lg"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full lg:w-80">
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-48 bg-gray-200 rounded-xl"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>AI Tools Blog - Latest Insights & Trends | AI Tool Finder</title>
        <meta name="description" content="Stay ahead with the latest AI tool insights, industry trends, reviews, and productivity tips. Discover how artificial intelligence is transforming various industries and workflows." />
        <meta property="og:title" content="AI Tools Blog - Latest Insights & Trends" />
        <meta property="og:description" content="Latest insights on AI tools, industry trends, and productivity tips" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={blogHeroImage} />
        <link rel="canonical" href={`${window.location.origin}/blog`} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-white/20 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="text-2xl font-bold font-serif bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                AI Tool Finder
              </Link>
              <div className="flex items-center space-x-6">
                <Link to="/categories" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">
                  Categories
                </Link>
                <Link to="/blog" className="text-purple-600 font-semibold">
                  Blog
                </Link>
                <Link to="/submit" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">
                  Submit Tool
                </Link>
                <Link to="/auth">
                  <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50 font-medium">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-purple-600 transition-colors flex items-center font-medium">
              <Home className="h-4 w-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-purple-600 font-semibold">Blog</span>
          </nav>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden mb-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={blogHeroImage}
                alt="AI Tools Blog Hero"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-blue-900/60 to-transparent">
                <div className="flex flex-col justify-center h-full px-8 md:px-16">
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="h-6 w-6 text-yellow-400" />
                      <span className="text-yellow-400 font-semibold text-lg">Latest Insights</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif leading-tight">
                      AI Tools Blog
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed font-light">
                      Stay updated with the latest insights, trends, and tips in the AI tools ecosystem
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link to="/submit">
                        <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-6 text-lg">
                          Submit Your Tool
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </Link>
                      <Link to="/categories">
                        <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-semibold px-8 py-6 text-lg">
                          Explore Categories
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 pb-16">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Blog Posts */}
            <div className="flex-1">
              {blogs.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-8xl mb-6">✨</div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4 font-serif">No Posts Yet</h2>
                  <p className="text-xl text-gray-600 mb-8">We're preparing amazing content about AI tools!</p>
                  <Link to="/submit">
                    <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold">
                      Submit Your Tool
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {blogs.map((blog) => (
                      <article key={blog.id} className="group animate-fade-in">
                        <Link to={`/blog/${blog.slug}`}>
                          <Card className="h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white/90 backdrop-blur-sm overflow-hidden group-hover:scale-[1.02]">
                            {/* Featured Image */}
                            {blog.featuredImage && (
                              <div className="aspect-[16/10] overflow-hidden">
                                <img
                                  src={blog.featuredImage}
                                  alt={blog.title}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                  loading="lazy"
                                />
                              </div>
                            )}
                            
                            <CardContent className="p-6">
                              {/* Meta Info */}
                              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
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
                              <h2 className="text-xl font-bold mb-3 group-hover:text-purple-600 transition-colors line-clamp-2 font-serif leading-tight">
                                {blog.title}
                              </h2>

                              {/* Excerpt */}
                              <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed font-body">
                                {blog.excerpt}
                              </p>

                              {/* Author */}
                              {blog.author && (
                                <div className="flex items-center gap-2 mb-4">
                                  <User className="h-4 w-4 text-gray-400" />
                                  <span className="text-sm text-gray-600 font-medium">by {blog.author}</span>
                                </div>
                              )}

                              {/* Tags */}
                              {blog.tags && blog.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                  {blog.tags.slice(0, 2).map((tag) => (
                                    <Badge key={tag} variant="secondary" className="text-xs bg-purple-50 text-purple-700 hover:bg-purple-100">
                                      #{tag}
                                    </Badge>
                                  ))}
                                  {blog.tags.length > 2 && (
                                    <span className="text-xs text-gray-500 font-medium">+{blog.tags.length - 2} more</span>
                                  )}
                                </div>
                              )}

                              {/* Categories */}
                              {blog.categories && blog.categories.length > 0 && (
                                <div className="flex items-center gap-2">
                                  <Tag className="h-4 w-4 text-gray-400" />
                                  <span className="text-sm text-purple-600 font-semibold">
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
                    <div className="text-center mt-16">
                      <Button
                        onClick={loadMoreBlogs}
                        disabled={loadingMore}
                        size="lg"
                        variant="outline"
                        className="border-purple-200 text-purple-600 hover:bg-purple-50 font-semibold px-8 py-6 text-lg"
                      >
                        {loadingMore ? 'Loading Amazing Content...' : 'Load More Posts'}
                        {!loadingMore && <ArrowRight className="ml-2 h-5 w-5" />}
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Sidebar */}
            <BlogSidebar />
          </div>
        </main>
      </div>
    </>
  );
};

export default Blog;