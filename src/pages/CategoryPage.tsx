import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Star, Users, ExternalLink } from 'lucide-react';
import { toolService } from '../services/toolService';
import AdSlot from '@/components/AdSlot';
import { Helmet } from 'react-helmet-async';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [categoryData, setCategoryData] = useState({ tools: [], blogs: [] });
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');

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
        const tools = await toolService.getToolsByCategory(formattedCategoryName);
        setCategoryData({ tools, blogs: [] });
      } catch (error) {
        console.error('Error fetching category tools:', error);
        setCategoryData({ tools: [], blogs: [] });
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, [formattedCategoryName]);

  const sortItems = (items, type) => {
    const sortedItems = [...items];
    
    switch (sortBy) {
      case 'popular':
        return sortedItems.sort((a, b) => {
          if (type === 'tools') {
            return (Number(b.votes) || 0) - (Number(a.votes) || 0);
          } else {
            return (Number(b.views) || 0) - (Number(a.views) || 0);
          }
        });
      case 'rating':
        return sortedItems.sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0));
      case 'oldest':
        return sortedItems.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      case 'name':
        return sortedItems.sort((a, b) => (a.title || a.name || '').localeCompare(b.title || b.name || ''));
      default: // newest
        return sortedItems.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
  };

  const sortedTools = sortItems(categoryData.tools, 'tools');

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getReadingTime = (content) => {
    if (!content) return '0 min read';
    const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const readingTime = Math.ceil(words / 200);
    return `${readingTime} min read`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-12 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <Link to="/blog" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">
                Blog
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
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {formattedCategoryName}
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Explore {categoryData.tools.length} tools in this category.
          </p>

          {/* Controls */}
          <div className="flex justify-end">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40 bg-white/70">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Mobile Banner Ad */}
        <div className="lg:hidden mb-6">
          <AdSlot position="banner" />
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedTools.map((tool) => (
                <Card key={tool.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-white/70 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <img
                        src={tool.logo || '/placeholder.svg'}
                        alt={tool.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-purple-600 transition-colors">
                          {tool.name}
                        </h3>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {tool.description}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{tool.rating?.toFixed(1) || '0.0'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{tool.votes || 0}</span>
                        </div>
                      </div>
                      <Badge variant={tool.pricing === 'Free' ? 'secondary' : 'outline'}>
                        {tool.pricing}
                      </Badge>
                    </div>

                    <div className="flex gap-2">
                      <Button asChild size="sm" className="flex-1">
                        <Link to={`/tool/${tool.id}`}>
                          View Details
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="sm">
                        <a href={tool.website} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {categoryData.tools.length === 0 && (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No tools found</h3>
                <p className="text-gray-500">
                  No tools have been added to this category yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;