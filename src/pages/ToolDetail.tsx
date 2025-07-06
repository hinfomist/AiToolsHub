
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Star, ArrowUp, ExternalLink, Share, Heart, MessageCircle, Eye, Calendar } from 'lucide-react';

const ToolDetail = () => {
  const { id } = useParams();
  const [userVoted, setUserVoted] = useState(false);
  const [userSaved, setUserSaved] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState('');

  // Mock tool data
  const tool = {
    id: 1,
    name: 'ChatGPT',
    description: 'ChatGPT is an advanced conversational AI developed by OpenAI that can assist with a wide variety of tasks including writing, coding, analysis, creative projects, and problem-solving. Built on the GPT-4 architecture, it provides intelligent, context-aware responses and can maintain coherent conversations across multiple topics.',
    fullDescription: `ChatGPT represents a breakthrough in conversational AI technology. Whether you're a student looking for help with homework, a professional seeking to streamline your workflow, or a creative individual exploring new ideas, ChatGPT adapts to your needs.

Key capabilities include:
• Natural language understanding and generation
• Code writing and debugging across multiple programming languages  
• Creative writing, including stories, poems, and scripts
• Data analysis and interpretation
• Language translation and learning assistance
• Problem-solving and logical reasoning
• Educational support across various subjects

The tool continuously learns from interactions while maintaining user privacy and safety through robust content filtering and ethical guidelines.`,
    category: 'Personal Assistants',
    votes: 1247,
    rating: 4.8,
    views: 25630,
    totalRatings: 3420,
    tags: ['Chat', 'Writing', 'Assistant', 'GPT-4', 'OpenAI', 'Coding', 'Analysis'],
    logoUrl: '🤖',
    websiteUrl: 'https://chat.openai.com',
    highlights: ['Free tier available', 'API access', 'Mobile app', 'Multiple languages', 'Real-time responses'],
    createdAt: '2024-01-15',
    createdBy: 'OpenAI',
    pricing: 'Freemium - $20/month for ChatGPT Plus',
    screenshots: ['📱', '💻', '🖥️']
  };

  const comments = [
    {
      id: 1,
      user: 'Sarah Johnson',
      rating: 5,
      comment: 'Absolutely game-changing for my content writing workflow. The quality of responses is consistently impressive.',
      date: '2024-01-20',
      helpful: 45
    },
    {
      id: 2,
      user: 'Mike Chen',
      rating: 4,
      comment: 'Great for coding assistance and debugging. Sometimes gives outdated information but overall very helpful.',
      date: '2024-01-18',
      helpful: 32
    },
    {
      id: 3,
      user: 'Emily Rodriguez',
      rating: 5,
      comment: 'The versatility is incredible. I use it for everything from email drafting to creative brainstorming.',
      date: '2024-01-15',
      helpful: 28
    }
  ];

  const relatedTools = [
    { id: 2, name: 'Claude', rating: 4.7, category: 'Personal Assistants', logoUrl: '🤖' },
    { id: 3, name: 'Perplexity AI', rating: 4.6, category: 'Personal Assistants', logoUrl: '🔍' },
    { id: 4, name: 'Character.AI', rating: 4.4, category: 'Personal Assistants', logoUrl: '🎭' }
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
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/" className="text-purple-600 hover:text-purple-700">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link to={`/category/${tool.category.toLowerCase().replace(' ', '-')}`} className="text-purple-600 hover:text-purple-700">
            {tool.category}
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
                  <div className="text-6xl">{tool.logoUrl}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">{tool.name}</h1>
                        <p className="text-lg text-gray-600 mb-3">{tool.description}</p>
                        <Badge className="bg-purple-100 text-purple-700">
                          {tool.category}
                        </Badge>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-6 mb-6 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-medium">{tool.rating}</span>
                        <span>({tool.totalRatings} reviews)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ArrowUp className="h-4 w-4" />
                        <span>{tool.votes} votes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{tool.views.toLocaleString()} views</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Added {tool.createdAt}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3">
                      <a
                        href={tool.websiteUrl}
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
                    {tool.tags.map((tag) => (
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
                    {tool.highlights.map((highlight) => (
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
                  {tool.fullDescription.split('\n').map((paragraph, index) => (
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
                  <Link to={`/category/${tool.category.toLowerCase().replace(' ', '-')}`}>
                    <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 cursor-pointer">
                      {tool.category}
                    </Badge>
                  </Link>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600 mb-1">Website</div>
                  <a
                    href={tool.websiteUrl}
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
                      <div className="text-2xl">{relatedTool.logoUrl}</div>
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
