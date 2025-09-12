import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Star, TrendingUp, Users, ArrowUp, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toolService } from '../services/toolService';
import AdSlot from '@/components/AdSlot';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [trendingTools, setTrendingTools] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});

  // Category mapping with keywords for search
  const categoryKeywords = {
    'Content Writing': ['writing', 'content', 'blog', 'article', 'copywriting', 'text', 'write'],
    'Image Generation': ['image', 'art', 'design', 'photo', 'picture', 'visual', 'graphic'],
    'Personal Assistants': ['assistant', 'help', 'productivity', 'personal', 'ai helper'],
    'Chatbots': ['chat', 'bot', 'conversation', 'messaging', 'talk'],
    'Sales': ['sales', 'selling', 'lead', 'crm', 'business'],
    'Productivity': ['productivity', 'efficient', 'work', 'organize', 'task'],
    'Video Creation': ['video', 'editing', 'movie', 'film', 'visual', 'animation'],
    'Music Creation': ['music', 'audio', 'sound', 'song', 'beat', 'compose'],
    'Customer Support': ['support', 'customer', 'service', 'help desk', 'ticket'],
    'Interview Prep': ['interview', 'job', 'preparation', 'career', 'hiring'],
    'AI Code Tools': ['code', 'coding', 'programming', 'developer', 'software'],
    'Resume Builder': ['resume', 'cv', 'job', 'career', 'application'],
    'Email Assistants': ['email', 'mail', 'communication', 'inbox'],
    'Data Analysis': ['data', 'analytics', 'analysis', 'insights', 'statistics'],
    'PDF Tools': ['pdf', 'document', 'file', 'conversion'],
    'Legal AI Tools': ['legal', 'law', 'lawyer', 'contract', 'document'],
    'Language Translation': ['translation', 'translate', 'language', 'international'],
    'Design Tools': ['design', 'ui', 'ux', 'creative', 'layout'],
    'Avatars & Voice': ['avatar', 'voice', 'speech', 'character'],
    'Marketing': ['marketing', 'promotion', 'advertising', 'campaign'],
    'SEO Tools': ['seo', 'search', 'optimization', 'ranking'],
    'Logo Generator': ['logo', 'brand', 'identity', 'branding'],
    'Storytelling AI': ['story', 'narrative', 'creative writing', 'fiction'],
    'Course Generator': ['course', 'education', 'learning', 'teaching'],
    'Business Plan Tools': ['business plan', 'strategy', 'planning', 'startup'],
    'Prompt Marketplace': ['prompt', 'template', 'marketplace', 'ai prompt']
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    const query = searchQuery.toLowerCase().trim();
    
    // Find matching category based on keywords
    for (const [categoryName, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.some(keyword => keyword.includes(query) || query.includes(keyword))) {
        const categorySlug = categoryName.toLowerCase().replace(/\s+/g, '-');
        navigate(`/category/${categorySlug}`);
        return;
      }
    }
    
    // If no category match found, search for general terms and redirect to categories
    navigate('/categories');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

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
    <>
      <Helmet>
        <title>AI Tool Mela - Best AI Tools Directory</title>
        <meta name="description" content="Discover the best AI tools for creators, developers, and businesses. Your ultimate AI tool directory with 128+ tools across 25+ categories." />
        <meta property="og:title" content="AI Tool Mela - Best AI Tools Directory" />
        <meta property="og:description" content="Discover the best AI tools for creators, developers, and businesses. Your ultimate AI tool directory with 128+ tools across 25+ categories." />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        <Navbar />

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
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="What are you looking for? writing, video, coding, legal, pdf..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-12 pr-4 py-4 text-lg border-2 border-gray-200 focus:border-purple-400 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-full"
                />
              </div>
              <Button 
                onClick={handleSearch}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
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

        <Footer />
      </div>
    </>
  );
};

export default Index;