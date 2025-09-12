import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, User, Tag, ChevronRight, Home, ExternalLink, Eye, ArrowLeft, Share2, Twitter, Linkedin, Facebook } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { blogService } from '../services/blogService';
import { Helmet } from 'react-helmet-async';
import BlogSidebar from '@/components/BlogSidebar';

const BlogPost = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        if (!slug) return;
        
        const blogData = await blogService.getBlogBySlug(slug);
        setBlog(blogData);
        
        // Increment views
        if (blogData.id) {
          await blogService.incrementViews(blogData.id);
        }
        
        // Fetch related blogs
        const related = await blogService.getRelatedBlogs(
          blogData.id,
          blogData.tags,
          blogData.categories,
          3
        );
        setRelatedBlogs(related);
      } catch (error) {
        console.error('Error fetching blog:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

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

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(blog?.title || '')}&url=${encodeURIComponent(window.location.href)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog?.title,
        text: blog?.excerpt,
        url: window.location.href
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            {/* Hero skeleton */}
            <div className="h-96 bg-gray-200 rounded-2xl mb-8"></div>
            
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="flex-1">
                <div className="space-y-6">
                  <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-80 space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-48 bg-gray-200 rounded-xl"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="text-8xl mb-6">📝</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4 font-serif">Post Not Found</h1>
          <p className="text-xl text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{blog.seoTitle || blog.title} - AI Tool Mela</title>
        <meta name="description" content={blog.seoDescription || blog.excerpt} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={blog.featuredImage} />
        <meta property="article:author" content={blog.author} />
        <meta property="article:published_time" content={blog.createdAt} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.title} />
        <meta name="twitter:description" content={blog.excerpt} />
        <meta name="twitter:image" content={blog.featuredImage} />
        <link rel="canonical" href={`${window.location.origin}/blog/${blog.slug}`} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-white/20 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="text-2xl font-bold font-serif bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                AI Tool Mela
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
            <Link to="/blog" className="hover:text-purple-600 transition-colors font-medium">
              Blog
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-purple-600 font-semibold truncate">{blog.title}</span>
          </nav>
        </div>

        {/* Hero Image */}
        {blog.featuredImage && (
          <section className="max-w-7xl mx-auto px-4 mb-12">
            <div className="relative h-64 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={blog.featuredImage}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                <div className="absolute bottom-8 left-8 right-8">
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-serif leading-tight">
                    {blog.title}
                  </h1>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 pb-16">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Article Content */}
            <article className="flex-1">
              {/* Back Button */}
              <div className="mb-8">
                <Link to="/blog">
                  <Button variant="outline" className="border-gray-200 text-gray-600 hover:bg-gray-50">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Blog
                  </Button>
                </Link>
              </div>

              {/* Header (if no featured image) */}
              {!blog.featuredImage && (
                <header className="mb-12">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 font-serif leading-tight">
                    {blog.title}
                  </h1>
                </header>
              )}

              {/* Meta Info */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border-0 mb-8">
                <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
                  {blog.author && (
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      <span className="font-medium">by {blog.author}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    <span>{formatDate(blog.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    <span>{getReadingTime(blog.content)}</span>
                  </div>
                  {blog.views > 0 && (
                    <div className="flex items-center gap-2">
                      <Eye className="h-5 w-5" />
                      <span>{blog.views} views</span>
                    </div>
                  )}
                </div>

                {/* Categories and Tags */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  {blog.categories && blog.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {blog.categories.map((category) => (
                        <Badge key={category} className="bg-purple-100 text-purple-700 border-purple-200 font-medium">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  )}
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {blog.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-gray-600 border-gray-300">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Social Share */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                  <span className="text-sm font-semibold text-gray-600">Share:</span>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleShare}
                      size="sm"
                      variant="outline"
                      className="border-gray-200 text-gray-600 hover:bg-gray-50"
                    >
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                    <a
                      href={shareUrls.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm font-medium"
                    >
                      <Twitter className="h-4 w-4" />
                      Twitter
                    </a>
                    <a
                      href={shareUrls.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-colors text-sm font-medium"
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </a>
                    <a
                      href={shareUrls.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      <Facebook className="h-4 w-4" />
                      Facebook
                    </a>
                  </div>
                </div>
              </div>

              {/* Related Tool */}
              {blog.relatedToolId && blog.relatedToolName && (
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8 mb-8 border border-purple-100">
                  <h3 className="font-bold text-xl mb-3 text-gray-800 font-serif">Featured Tool</h3>
                  <p className="text-gray-600 mb-6 font-body leading-relaxed">
                    This blog post is about <strong className="text-purple-700">{blog.relatedToolName}</strong>
                  </p>
                  <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold">
                    <Link to={`/tool/${blog.relatedToolId}`}>
                      <ExternalLink className="h-5 w-5 mr-2" />
                      Check out {blog.relatedToolName}
                    </Link>
                  </Button>
                </div>
              )}

              {/* Content */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border-0 mb-12">
                <div 
                  className="prose prose-lg prose-slate max-w-none 
                    prose-headings:font-serif prose-headings:font-bold prose-headings:text-gray-900
                    prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
                    prose-p:font-body prose-p:leading-relaxed prose-p:text-gray-700 prose-p:text-lg
                    prose-a:text-purple-600 prose-a:font-medium hover:prose-a:text-purple-800
                    prose-strong:text-gray-900 prose-strong:font-semibold
                    prose-code:bg-purple-50 prose-code:text-purple-800 prose-code:px-2 prose-code:py-1 prose-code:rounded
                    prose-blockquote:border-l-purple-500 prose-blockquote:bg-purple-50 prose-blockquote:italic
                    prose-ul:text-gray-700 prose-ol:text-gray-700
                    prose-li:text-gray-700 prose-li:font-body
                    prose-img:rounded-lg prose-img:shadow-lg"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </div>

              {/* Related Posts */}
              {relatedBlogs.length > 0 && (
                <section className="mt-16">
                  <h2 className="text-3xl font-bold mb-8 text-gray-900 font-serif">Related Posts</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedBlogs.map((relatedBlog) => (
                      <Link key={relatedBlog.id} to={`/blog/${relatedBlog.slug}`} className="group">
                        <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm">
                          {relatedBlog.featuredImage && (
                            <div className="aspect-video overflow-hidden rounded-t-xl">
                              <img
                                src={relatedBlog.featuredImage}
                                alt={relatedBlog.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          )}
                          <CardContent className="p-6">
                            <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors font-serif">
                              {relatedBlog.title}
                            </h3>
                            <p className="text-gray-600 text-sm line-clamp-2 mb-4 font-body">
                              {relatedBlog.excerpt}
                            </p>
                            <div className="flex items-center text-xs text-gray-500">
                              <Calendar className="h-3 w-3 mr-1" />
                              {formatDate(relatedBlog.createdAt)}
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </article>

            {/* Sidebar */}
            <BlogSidebar currentPostId={blog.id} />
          </div>
        </main>
      </div>
    </>
  );
};

export default BlogPost;