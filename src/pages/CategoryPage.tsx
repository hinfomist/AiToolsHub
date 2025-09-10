import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Star, ExternalLink, ThumbsUp, Eye } from 'lucide-react';
import { toolService } from '../services/toolService';
import AdSlot from '@/components/AdSlot';
import { Helmet } from 'react-helmet-async';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('popular');

  const formattedCategoryName = categoryName
    ? categoryName
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : '';

  useEffect(() => {
    const fetchTools = async () => {
      if (!formattedCategoryName) return;

      setLoading(true);
      try {
        const toolsData = await toolService.getToolsByCategory(formattedCategoryName);
        setTools(toolsData || []);
      } catch (error) {
        console.error('Error fetching category tools:', error);
        setTools([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, [formattedCategoryName]);

  const sortTools = (toolsArray) => {
    const sortedTools = [...toolsArray];
    
    switch (sortBy) {
      case 'popular':
        return sortedTools.sort((a, b) => (Number(b.votes) || 0) - (Number(a.votes) || 0));
      case 'rating':
        return sortedTools.sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0));
      case 'newest':
        return sortedTools.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'oldest':
        return sortedTools.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      case 'name':
        return sortedTools.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
      default:
        return sortedTools;
    }
  };

  const sortedTools = sortTools(tools);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-12 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Helmet>
        <title>{formattedCategoryName} AI Tools | AI Tool Finder</title>
        <meta name="description" content={`Discover the best AI tools for ${formattedCategoryName}. Find ${tools.length} tools to boost your productivity.`} />
      </Helmet>

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
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/categories" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Categories
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
              📝
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {formattedCategoryName}
              </h1>
              <p className="text-gray-600">
                {tools.length} tools found • Discover AI tools in {formattedCategoryName}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Filter:</span>
              <Select defaultValue="all">
                <SelectTrigger className="w-32 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tools</SelectItem>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="lg:flex lg:gap-8">
          {/* Desktop Sidebar Ad */}
          <div className="hidden lg:block lg:flex-shrink-0">
            <div className="sticky top-24">
              <AdSlot position="sidebar" />
            </div>
          </div>

          {/* Tools Grid */}
          <div className="flex-1">
            {sortedTools.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sortedTools.map((tool) => (
                  <Card key={tool.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="relative">
                          <img
                            src={tool.logo || tool.logoUrl || '/placeholder.svg'}
                            alt={tool.name}
                            className="w-14 h-14 rounded-xl object-cover border-2 border-gray-100"
                          />
                          <ExternalLink className="absolute -top-1 -right-1 w-5 h-5 text-gray-400 bg-white rounded-full p-1 border border-gray-200" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-xl mb-1 group-hover:text-purple-600 transition-colors">
                            {tool.name}
                          </h3>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary" className="text-xs">
                              {formattedCategoryName}
                            </Badge>
                            <Badge variant={tool.pricing === 'Free' ? 'default' : 'outline'} className="text-xs">
                              {tool.pricing || 'Free'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {tool.description}
                      </p>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{tool.rating?.toFixed(1) || '0'}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{tool.votes || 0}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            <span>{tool.views || 0} views</span>
                          </div>
                        </div>
                      </div>

                      {/* Tags/Categories */}
                      {tool.tags && tool.tags.length > 0 && (
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {tool.tags.slice(0, 4).map((tag, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Highlights */}
                      {tool.highlights && tool.highlights.length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">Highlights:</p>
                          <div className="flex flex-wrap gap-2">
                            {tool.highlights.slice(0, 3).map((highlight, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-700"
                              >
                                {highlight}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button asChild className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                          <Link to={`/tool/${tool.id}`}>
                            View Details
                          </Link>
                        </Button>
                        <Button asChild variant="outline" size="icon">
                          <a href={tool.website || tool.websiteUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🔍</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No tools found</h3>
                <p className="text-gray-500 mb-4">
                  No tools have been added to this category yet.
                </p>
                <Button asChild>
                  <Link to="/submit">Submit a Tool</Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Banner Ad */}
        <div className="lg:hidden mt-8">
          <AdSlot position="banner" />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;