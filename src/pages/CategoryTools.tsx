
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Star, ArrowUp, ExternalLink, Filter } from 'lucide-react';

const CategoryTools = () => {
  const { categoryName } = useParams();
  const [sortBy, setSortBy] = useState('popular');
  const [filterBy, setFilterBy] = useState('all');

  // Mock data for tools in a category
  const tools = [
    {
      id: 1,
      name: 'ChatGPT',
      description: 'Advanced conversational AI that can help with writing, coding, analysis, and creative tasks. Perfect for students, professionals, and anyone looking to boost productivity.',
      category: 'Personal Assistants',
      votes: 1247,
      rating: 4.8,
      views: 25630,
      tags: ['Chat', 'Writing', 'Assistant', 'GPT-4'],
      logoUrl: '🤖',
      websiteUrl: 'https://chat.openai.com',
      highlights: ['Free tier available', 'API access', 'Mobile app'],
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'Claude',
      description: 'Anthropic\'s AI assistant that excels at analysis, writing, and coding. Known for being helpful, harmless, and honest in all interactions.',
      category: 'Personal Assistants',
      votes: 892,
      rating: 4.7,
      views: 18420,
      tags: ['Chat', 'Analysis', 'Writing', 'Code'],
      logoUrl: '🤖',
      websiteUrl: 'https://claude.ai',
      highlights: ['Long context window', 'File uploads', 'Ethical AI'],
      createdAt: '2024-02-01'
    },
    {
      id: 3,
      name: 'Perplexity AI',
      description: 'AI-powered search engine that provides accurate, real-time answers with citations. Perfect for research and fact-checking.',
      category: 'Personal Assistants',
      votes: 634,
      rating: 4.6,
      views: 12890,
      tags: ['Search', 'Research', 'Citations', 'Real-time'],
      logoUrl: '🔍',
      websiteUrl: 'https://perplexity.ai',
      highlights: ['Real-time data', 'Source citations', 'Mobile friendly'],
      createdAt: '2024-01-20'
    },
    {
      id: 4,
      name: 'Character.AI',
      description: 'Create and chat with AI characters. Build custom personalities for entertainment, role-playing, or creative writing assistance.',
      category: 'Personal Assistants',
      votes: 523,
      rating: 4.4,
      views: 15240,
      tags: ['Characters', 'Chat', 'Entertainment', 'Creative'],
      logoUrl: '🎭',
      websiteUrl: 'https://beta.character.ai',
      highlights: ['Custom characters', 'Community driven', 'Creative writing'],
      createdAt: '2024-01-10'
    },
    {
      id: 5,
      name: 'Replika',
      description: 'Your AI companion that learns and grows with you. Designed for meaningful conversations and emotional support.',
      category: 'Personal Assistants',
      votes: 445,
      rating: 4.3,
      views: 11630,
      tags: ['Companion', 'Emotional', 'Personal', 'Growth'],
      logoUrl: '💭',
      websiteUrl: 'https://replika.ai',
      highlights: ['Emotional intelligence', 'Personalized', 'Mental health'],
      createdAt: '2024-01-05'
    },
    {
      id: 6,
      name: 'Microsoft Copilot',
      description: 'Microsoft\'s AI assistant integrated across Office 365 and Windows. Helps with productivity, coding, and creative tasks.',
      category: 'Personal Assistants',
      votes: 712,
      rating: 4.5,
      views: 19850,
      tags: ['Microsoft', 'Office', 'Productivity', 'Integration'],
      logoUrl: '🏢',
      websiteUrl: 'https://copilot.microsoft.com',
      highlights: ['Office integration', 'Enterprise ready', 'Multi-platform'],
      createdAt: '2024-01-25'
    }
  ];

  const categoryDisplayName = categoryName?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Category';

  const sortedTools = [...tools].sort((a, b) => {
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
            <div className="text-5xl">🤖</div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {categoryDisplayName}
              </h1>
              <p className="text-xl text-gray-600">
                {tools.length} tools found • Discover AI assistants and chatbots
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sortedTools.map((tool) => (
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
                    <Badge variant="secondary" className="mb-2">
                      {tool.category}
                    </Badge>
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
          ))}
        </div>

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
