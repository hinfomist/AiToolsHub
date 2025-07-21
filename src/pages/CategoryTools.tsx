import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Star, ArrowUp, ExternalLink, Filter } from 'lucide-react';
import { toolService } from '../services/toolService';

const CategoryTools = () => {
  const { categoryName } = useParams();
  const [sortBy, setSortBy] = useState('popular');
  const [filterBy, setFilterBy] = useState('all');
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryDisplayName = categoryName?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Category';

  useEffect(() => {
    const fetchTools = async () => {
      if (!categoryName) return;
      
      setLoading(true);
      try {
        const categoryTools = await toolService.getToolsByCategory(categoryDisplayName);
        setTools(categoryTools);
      } catch (error) {
        console.error('Error fetching tools:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, [categoryName, categoryDisplayName]);

  const getCategoryIcon = (categoryName: string) => {
    const iconMap: { [key: string]: string } = {
      'content-writing': '✍️',
      'image-generation': '🎨',
      'personal-assistants': '🤖',
      'chatbots': '💬',
      'sales': '💼'
    };
    return iconMap[categoryName.toLowerCase()] || '🤖';
  };

  const filteredTools = tools.filter(tool => {
    if (filterBy === 'free') return !tool.isPaid;
    if (filterBy === 'premium') return tool.isPaid;
    return true;
  });

  const sortedTools = [...filteredTools].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.votes - a.votes;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

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
        {/* Header */}
        <div className="mb-8">
          <Link to="/categories" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Categories
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-5xl">{getCategoryIcon(categoryName || '')}</div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {categoryDisplayName}
              </h1>
              <p className="text-xl text-gray-600">
                {tools.length} tools found • Discover AI tools in {categoryDisplayName}
              </p>
            </div>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 bg-white/50 backdrop-blur-sm p-4 rounded-xl">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Filter:</span>
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tools</SelectItem>
                <SelectItem value="free">Free Only</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tools Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading tools...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sortedTools.length > 0 ? sortedTools.map((tool) => (
            <Card key={tool.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl">{tool.logoUrl}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-xl text-gray-800">
                        {tool.name}
                      </h3>
                      <a
                        href={tool.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-purple-600 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">
                        {tool.category}
                      </Badge>
                      <Badge variant={tool.isPaid ? "destructive" : "default"} className="text-xs">
                        {tool.isPaid ? 'Paid' : 'Free'}
                      </Badge>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {tool.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{tool.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ArrowUp className="h-4 w-4" />
                    <span>{tool.votes}</span>
                  </div>
                  <div>
                    {tool.views.toLocaleString()} views
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {tool.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Highlights */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Highlights:</h4>
                  <div className="flex flex-wrap gap-1">
                    {tool.highlights.map((highlight) => (
                      <Badge key={highlight} className="text-xs bg-green-100 text-green-700 hover:bg-green-200">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link to={`/tool/${tool.id}`} className="flex-1">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                      View Details
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" className="px-3">
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            )) : (
              <div className="col-span-full text-center py-12">
                <p className="text-xl text-gray-600">No tools found in this category yet.</p>
                <p className="text-gray-500 mt-2">Check back soon for new additions!</p>
              </div>
            )}
          </div>
        )}

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-purple-200 text-purple-600 hover:bg-purple-50">
            Load More Tools
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CategoryTools;
