import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
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
        <title>AI Tool Mela: Discover the Best AI Tools Directory</title>
        <meta 
          name="description" 
          content="Find, compare, and submit top AI tools for content, productivity, and more at AI Tool Mela. Discover the Best AI Tools in One Vibrant Directory." 
        />
        <meta name="keywords" content="AI tools, artificial intelligence, productivity tools, content creation, AI directory" />
        <link rel="canonical" href="https://aitoolmela.com/" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "AI Tool Mela",
            "url": "https://aitoolmela.com",
            "description": "Discover the Best AI Tools in One Vibrant Directory",
            "sameAs": ["https://twitter.com/aitoolmela"]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

      {/* Hero Section */}
      <section className="relative py-32 px-4 bg-gradient-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-black mb-6 text-primary animate-bounce-in text-glow">
            AI TOOL MELA
          </h1>
          <p className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-foreground animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Discover the Best AI Tools in One 
            <span className="text-primary"> VIBRANT </span>
            Directory
          </p>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-fade-in font-medium" style={{ animationDelay: '0.4s' }}>
            Find, compare, and discover the perfect AI tools for your needs. From content creation to productivity, we've got you covered.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-3xl mx-auto mb-12 animate-scale-in" style={{ animationDelay: '0.6s' }}>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-primary h-6 w-6" />
                <Input
                  type="text"
                  placeholder="What are you looking for? writing, video, coding, legal, pdf..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-16 pr-6 py-6 text-xl border-4 border-primary bg-card text-foreground placeholder:text-muted-foreground rounded-2xl shadow-[0_0_30px_hsl(60_100%_50%/0.3)] hover:shadow-[0_0_50px_hsl(60_100%_50%/0.5)] transition-all duration-300 font-medium"
                />
              </div>
              <Button 
                onClick={handleSearch}
                variant="hero"
                size="hero"
                className="rounded-2xl"
              >
                <Search className="h-6 w-6" />
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <Link to="/categories">
              <Button variant="hero" size="hero" className="rounded-2xl">
                Browse Categories
              </Button>
            </Link>
            <Link to="/submit">
              <Button variant="outline" size="hero" className="rounded-2xl font-black">
                Submit Your Tool
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-primary">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="animate-bounce-in hover-glow p-8 rounded-2xl bg-black/20" style={{ animationDelay: '1s' }}>
              <div className="font-display text-6xl font-black text-primary-foreground mb-4">
                {Object.values(categoryCounts).reduce((sum: number, count: unknown) => sum + (typeof count === 'number' ? count : 0), 0)}+
              </div>
              <div className="font-heading text-xl font-bold text-primary-foreground">AI TOOLS LISTED</div>
            </div>
            <div className="animate-bounce-in hover-glow p-8 rounded-2xl bg-black/20" style={{ animationDelay: '1.2s' }}>
              <div className="font-display text-6xl font-black text-primary-foreground mb-4">25+</div>
              <div className="font-heading text-xl font-bold text-primary-foreground">CATEGORIES</div>
            </div>
            <div className="animate-bounce-in hover-glow p-8 rounded-2xl bg-black/20" style={{ animationDelay: '1.4s' }}>
              <div className="font-display text-6xl font-black text-primary-foreground mb-4">10K+</div>
              <div className="font-heading text-xl font-bold text-primary-foreground">HAPPY USERS</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Banner Ad */}
      <div className="lg:hidden px-4 py-6">
        <AdSlot position="banner" />
      </div>

      {/* Featured Categories */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-7xl mx-auto lg:flex lg:gap-8">
          {/* Desktop Sidebar Ad */}
          <div className="hidden lg:block lg:flex-shrink-0">
            <div className="sticky top-24">
              <AdSlot position="sidebar" />
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            <h2 className="font-display text-5xl md:text-6xl font-black text-center mb-16 text-foreground animate-bounce-in">
              EXPLORE BY <span className="text-primary">CATEGORY</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {featuredCategories.map((category, index) => (
                <Link
                  key={category.name}
                  to={`/category/${category.name.toLowerCase().replace(' ', '-')}`}
                  className="group animate-slide-up"
                  style={{ animationDelay: `${1.6 + index * 0.1}s` }}
                >
                  <Card className="card-featured h-full hover-bounce group">
                    <CardContent className="p-8 text-center">
                      <div className="text-6xl mb-6 animate-glow-pulse group-hover:scale-125 transition-all duration-300">
                        {category.icon}
                      </div>
                      <h3 className="font-heading text-xl font-bold mb-3 group-hover:text-primary transition-colors text-foreground">
                        {category.name.toUpperCase()}
                      </h3>
                      <p className="font-bold text-primary text-lg">
                        {category.count} TOOLS
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link to="/categories">
                <Button variant="outline" size="hero" className="rounded-2xl font-black">
                  VIEW ALL CATEGORIES
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Tools */}
      <section className="py-24 px-4 bg-gradient-dark">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-16">
            <TrendingUp className="h-12 w-12 text-primary animate-glow-pulse" />
            <h2 className="font-display text-5xl md:text-6xl font-black text-foreground">
              <span className="text-primary">TRENDING</span> TOOLS
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingTools.map((tool, index) => (
              <Link key={tool.id} to={`/tool/${tool.id}`} className="group animate-bounce-in" style={{ animationDelay: `${2 + index * 0.2}s` }}>
                <Card className="card-featured h-full hover-bounce">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6 mb-6">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 bg-primary/20 flex items-center justify-center border-2 border-primary">
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
                          <span className="text-3xl">{tool.logoUrl || '🤖'}</span>
                        )}
                        <span className="text-3xl hidden">🤖</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading text-xl font-bold mb-2 group-hover:text-primary transition-colors text-foreground">
                          {tool.name.toUpperCase()}
                        </h3>
                        <Badge variant="secondary" className="mb-3 bg-primary text-primary-foreground font-bold px-3 py-1">
                          {tool.category.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-6 line-clamp-2 font-medium text-base">
                      {tool.description}
                    </p>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-primary fill-current" />
                        <span className="text-lg font-bold text-foreground">{tool.rating}</span>
                      </div>
                      <div className="flex items-center gap-2 text-primary">
                        <ArrowUp className="h-5 w-5" />
                        <span className="text-lg font-bold">{tool.votes}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {tool.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-sm font-bold border-primary text-primary">
                          {tag.toUpperCase()}
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
      <section className="py-32 px-4 bg-gradient-primary">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-display text-5xl md:text-7xl font-black mb-8 text-primary-foreground animate-bounce-in">
            READY TO SHARE YOUR <span className="text-black">AI TOOL?</span>
          </h2>
          <p className="text-2xl md:text-3xl text-primary-foreground mb-12 animate-fade-in font-bold max-w-4xl mx-auto" style={{ animationDelay: '0.2s' }}>
            Join thousands of developers and creators who have already listed their AI tools on our platform.
          </p>
          <Link to="/submit">
            <Button variant="outline" size="hero" className="bg-black text-primary border-4 border-black hover:bg-primary hover:text-black hover:scale-110 font-black text-2xl px-16 py-8 rounded-3xl animate-glow-pulse" style={{ animationDelay: '0.4s' }}>
              SUBMIT YOUR TOOL NOW
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