import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Star, ArrowUp, ExternalLink, Share, Heart, MessageCircle, Eye, Calendar } from 'lucide-react';
import { toolService } from '../services/toolService';
import { blogService } from '../services/blogService';
import AdSlot from '@/components/AdSlot';

const ToolDetail = () => {
  const { id } = useParams();
  const [userVoted, setUserVoted] = useState(false);
  const [userSaved, setUserSaved] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState('');
  const [tool, setTool] = useState(null);
  const [relatedTools, setRelatedTools] = useState([]);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTool = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const toolData = await toolService.getTool(id);
        setTool(toolData);
        
        if (toolData) {
          const [related, blogs] = await Promise.all([
            toolService.getToolsByCategory(toolData.category),
            blogService.getBlogsByRelatedTool(toolData.id)
          ]);
          setRelatedTools(related.filter(t => t.id !== toolData.id).slice(0, 3));
          setRelatedBlogs(blogs);
        }
      } catch (error) {
        console.error('Error fetching tool:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTool();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tool details...</p>
        </div>
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Tool Not Found</h1>
          <Link to="/" className="text-purple-600 hover:text-purple-700">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const comments = [
    {
      id: 1,
      user: 'Sarah Johnson',
      rating: 5,
      comment: `Amazing tool! ${tool.name} has completely transformed my workflow. Highly recommend it to anyone in this space.`,
      date: '2024-01-20',
      helpful: 45
    },
    {
      id: 2,
      user: 'Mike Chen',
      rating: 4,
      comment: `Great experience with ${tool.name}. The features are solid and the interface is intuitive. Some minor issues but overall very satisfied.`,
      date: '2024-01-18',
      helpful: 32
    },
    {
      id: 3,
      user: 'Emily Rodriguez',
      rating: 5,
      comment: `${tool.name} exceeded my expectations. The quality and reliability make it worth every penny. Perfect for professional use.`,
      date: '2024-01-15',
      helpful: 28
    }
  ];


  const handleVote = () => {
    setUserVoted(!userVoted);
  };

  const handleSave = () => {
    setUserSaved(!userSaved);
  };

  const handleRating = (rating: number) => {
    setUserRating(rating);
  };

  return (
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
              <Link to="/submit" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">
                Submit Tool
              </Link>
              <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Mobile Banner Ad */}
        <div className="lg:hidden mb-6">
          <AdSlot position="banner" />
        </div>
        
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/" className="text-purple-600 hover:text-purple-700">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link to={`/category/${(tool.category || '').toLowerCase().replace(/\s+/g, '-')}`} className="text-purple-600 hover:text-purple-700">
            {tool.category || 'General'}
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-600">{tool.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tool Header */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center">
                    {tool.logoUrl && tool.logoUrl.startsWith('http') ? (
                      <img 
                        src={tool.logoUrl} 
                        alt={`${tool.name} logo`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'block';
                        }}
                      />
                    ) : (
                      <span className="text-4xl">{tool.logoUrl || '🤖'}</span>
                    )}
                    <span className="text-4xl hidden">🤖</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">{tool.name}</h1>
                        <p className="text-lg text-gray-600 mb-3">{tool.description}</p>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-purple-100 text-purple-700">
                            {tool.category}
                          </Badge>
                          <Badge variant={tool.isPaid ? "destructive" : "default"}>
                            {tool.isPaid ? 'Paid' : 'Free'}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-6 mb-6 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-medium">{tool.rating ?? 0}</span>
                        <span>({tool.totalRatings ?? 0} reviews)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ArrowUp className="h-4 w-4" />
                        <span>{tool.votes ?? 0} votes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{Number(tool.views ?? 0).toLocaleString()} views</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Added {tool.createdAt || ''}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3">
                      <a
                        href={tool.websiteUrl?.startsWith('http') ? tool.websiteUrl : (tool.websiteUrl ? `https://${tool.websiteUrl}` : '#')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 min-w-0"
                      >
                        <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Visit Website
                        </Button>
                      </a>
                      <Button
                        variant="outline"
                        onClick={handleVote}
                        className={userVoted ? 'bg-purple-50 border-purple-200 text-purple-600' : ''}
                      >
                        <ArrowUp className="h-4 w-4 mr-1" />
                        {userVoted ? 'Voted' : 'Vote'}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleSave}
                        className={userSaved ? 'bg-red-50 border-red-200 text-red-600' : ''}
                      >
                        <Heart className={`h-4 w-4 mr-1 ${userSaved ? 'fill-current' : ''}`} />
                        {userSaved ? 'Saved' : 'Save'}
                      </Button>
                      <Button variant="outline">
                        <Share className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {(tool.tags || []).map((tag) => (
                      <Badge key={tag} variant="outline" className="hover:bg-purple-50 cursor-pointer">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div>
                  <h3 className="font-semibold mb-3">Key Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {(tool.highlights || []).map((highlight) => (
                      <Badge key={highlight} className="bg-green-100 text-green-700">
                        ✓ {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Description */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>About {tool.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  {(tool.fullDescription || tool.description || '').split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* User Rating */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Rate this Tool</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-sm font-medium">Your rating:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRating(star)}
                        className="p-1"
                      >
                        <Star
                          className={`h-6 w-6 ${
                            star <= userRating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <Textarea
                  placeholder="Share your experience with this tool..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="mb-4"
                />
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Submit Review
                </Button>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  User Reviews ({comments.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {comments.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="font-medium text-gray-800">{review.user}</div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-3 w-3 ${
                                    star <= review.rating
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span>•</span>
                            <span>{review.date}</span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {review.helpful} found helpful
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">{review.comment}</p>
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-purple-600">
                        👍 Helpful
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Desktop Ad Space */}
            <AdSlot position="sidebar" />
            {/* Tool Info */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Tool Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-600 mb-1">Creator</div>
                  <div className="text-gray-800">{tool.createdBy}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600 mb-1">Pricing</div>
                  <div className="text-gray-800">{tool.pricing}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600 mb-1">Category</div>
                  <Link to={`/category/${(tool.category || '').toLowerCase().replace(/\s+/g, '-')}`}>
                    <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 cursor-pointer">
                      {tool.category || 'General'}
                    </Badge>
                  </Link>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600 mb-1">Website</div>
                  <a
                    href={tool.websiteUrl?.startsWith('http') ? tool.websiteUrl : (tool.websiteUrl ? `https://${tool.websiteUrl}` : '#')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-700 text-sm"
                  >
                    Visit Official Site →
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Related Tools */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Related Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {relatedTools.map((relatedTool) => (
                    <Link
                      key={relatedTool.id}
                      to={`/tool/${relatedTool.id}`}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center">
                        {relatedTool.logoUrl && relatedTool.logoUrl.startsWith('http') ? (
                          <img 
                            src={relatedTool.logoUrl} 
                            alt={`${relatedTool.name} logo`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const fallback = target.nextElementSibling as HTMLElement;
                              if (fallback) fallback.style.display = 'block';
                            }}
                          />
                        ) : (
                          <span className="text-lg">{relatedTool.logoUrl || '🤖'}</span>
                        )}
                        <span className="text-lg hidden">🤖</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-800 group-hover:text-purple-600">
                          {relatedTool.name}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          {relatedTool.rating}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Related Blogs */}
            {relatedBlogs.length > 0 && (
              <Card className="border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Related Blogs about {tool?.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {relatedBlogs.map((blog) => (
                      <Link
                        key={blog.id}
                        to={`/blog/${blog.slug}`}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-purple-50 transition-colors group"
                      >
                        {blog.featuredImage && (
                          <img
                            src={blog.featuredImage}
                            alt={blog.title}
                            className="w-16 h-12 object-cover rounded"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-800 group-hover:text-purple-600 line-clamp-2 text-sm">
                            {blog.title}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(blog.createdAt).toLocaleDateString()}
                            <Eye className="h-3 w-3" />
                            {blog.views || 0} views
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Share Widget */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Share Tool</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="text-blue-600 border-blue-200">
                    Twitter
                  </Button>
                  <Button variant="outline" size="sm" className="text-blue-800 border-blue-200">
                    Facebook
                  </Button>
                  <Button variant="outline" size="sm" className="text-blue-700 border-blue-200">
                    LinkedIn
                  </Button>
                  <Button variant="outline" size="sm" className="text-gray-600 border-gray-200">
                    Copy Link
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolDetail;
