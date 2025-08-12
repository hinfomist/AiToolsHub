import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, TrendingUp, Users, ArrowUp, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toolService } from '../services/toolService';
import AdSlot from '@/components/AdSlot';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [trendingTools, setTrendingTools] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});

  const featuredCategories = [
    { name: 'Content Writing', count: categoryCounts['Content Writing'] || 0, icon: '✍️' },
    { name: 'Image Generation', count: categoryCounts['Image Generation'] || 0, icon: '🎨' },
    { name: 'Personal Assistants', count: categoryCounts['Personal Assistants'] || 0, icon: '🤖' },
    { name: 'Chatbots', count: categoryCounts['Chatbots'] || 0, icon: '💬' },
    { name: 'Sales', count: categoryCounts['Sales'] || 0, icon: '💼' },
    { name: 'Productivity', count: categoryCounts['Productivity'] || 0, icon: '⚡' },
    { name: 'Video Creation', count: categoryCounts['Video Creation'] || 0, icon: '🎬' },
    { name: 'Music Creation', count: categoryCounts['Music Creation'] || 0, icon: '🎵' }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tools, counts] = await Promise.all([
          toolService.getAllTools(),
          toolService.getCategoryCounts()
        ]);
        
        // Get top 3 trending tools (by votes)
        const trending = tools
          .sort((a, b) => (b.votes || 0) - (a.votes || 0))
          .slice(0, 3)
          .map(tool => ({
            id: tool.id,
            name: tool.name,
            description: tool.description,
            category: tool.category,
            votes: tool.votes || 0,
            rating: tool.rating || 0,
            tags: tool.tags || [],
            logoUrl: tool.logoUrl || '🤖'
          }));
        
        setTrendingTools(trending);
        setCategoryCounts(counts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
              <Link to="/auth">
                <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent animate-fade-in">
            Discover the Best AI Tools
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Find, compare, and discover the perfect AI tools for your needs. From content creation to productivity, we've got you covered.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-8 animate-scale-in" style={{ animationDelay: '0.4s' }}>
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search AI tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-4 text-lg border-2 border-gray-200 focus:border-purple-400 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Link to="/categories">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg hover:scale-105 transition-all duration-300">
                Browse Categories
              </Button>
            </Link>
            <Link to="/submit">
              <Button size="lg" variant="outline" className="border-2 border-purple-200 text-purple-600 hover:bg-purple-50 px-8 py-3 text-lg hover:scale-105 transition-all duration-300">
                Submit Your Tool
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {Object.values(categoryCounts).reduce((sum: number, count: unknown) => sum + (typeof count === 'number' ? count : 0), 0)}+
              </div>
              <div className="text-gray-600">AI Tools Listed</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '1s' }}>
              <div className="text-3xl font-bold text-blue-600 mb-2">25+</div>
              <div className="text-gray-600">Categories</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '1.2s' }}>
              <div className="text-3xl font-bold text-indigo-600 mb-2">10K+</div>
              <div className="text-gray-600">Happy Users</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Banner Ad */}
      <div className="lg:hidden px-4 py-6">
        <AdSlot position="banner" />
      </div>

      {/* Featured Categories */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto lg:flex lg:gap-8">
          {/* Desktop Sidebar Ad */}
          <div className="hidden lg:block lg:flex-shrink-0">
            <div className="sticky top-24">
              <AdSlot position="sidebar" />
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 animate-fade-in">
              Explore by Category
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredCategories.map((category, index) => (
                <Link
                  key={category.name}
                  to={`/category/${category.name.toLowerCase().replace(' ', '-')}`}
                  className="group animate-fade-in"
                  style={{ animationDelay: `${1.4 + index * 0.1}s` }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-white/70 backdrop-blur-sm hover:scale-105">
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl mb-4 animate-pulse">{category.icon}</div>
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-purple-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-gray-500">
                        {category.count} tools
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/categories">
                <Button variant="outline" size="lg" className="border-purple-200 text-purple-600 hover:bg-purple-50 hover:scale-105 transition-all duration-300">
                  View All Categories
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Tools */}
      <section className="py-16 px-4 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-12">
            <TrendingUp className="h-8 w-8 text-purple-600" />
            <h2 className="text-3xl font-bold text-gray-800">
              Trending Tools
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingTools.map((tool, index) => (
              <Link key={tool.id} to={`/tool/${tool.id}`} className="group animate-fade-in" style={{ animationDelay: `${2 + index * 0.2}s` }}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center">
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
                          <span className="text-2xl">{tool.logoUrl || '🤖'}</span>
                        )}
                        <span className="text-2xl hidden">🤖</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1 group-hover:text-purple-600 transition-colors">
                          {tool.name}
                        </h3>
                        <Badge variant="secondary" className="mb-2">
                          {tool.category}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {tool.description}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{tool.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <ArrowUp className="h-4 w-4" />
                        <span className="text-sm">{tool.votes}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {tool.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-800 animate-fade-in">
            Ready to Share Your AI Tool?
          </h2>
          <p className="text-xl text-gray-600 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Join thousands of developers and creators who have already listed their AI tools on our platform.
          </p>
          <Link to="/submit">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg hover:scale-105 transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              Submit Your Tool
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">AI Tool Finder</h3>
              <p className="text-gray-400">
                Discover the best AI tools for your projects and workflow.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/categories" className="hover:text-white transition-colors">Browse Tools</Link></li>
                <li><Link to="/submit" className="hover:text-white transition-colors">Submit Tool</Link></li>
                <li><Link to="/categories" className="hover:text-white transition-colors">Categories</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Newsletter</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AI Tool Finder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;