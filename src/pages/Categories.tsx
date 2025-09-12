
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AdSlot from '@/components/AdSlot';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { categoryService } from '../services/categoryService';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

const Categories = () => {
  const [categoryCounts, setCategoryCounts] = useState<Record<string, any>>({});

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const counts = await categoryService.getCategoryCounts();
        setCategoryCounts(counts);
      } catch (error) {
        console.error('Error fetching category counts:', error);
      }
    };

    fetchCounts();
  }, []);
  
  const allCategories = [
    { name: 'Content Writing', icon: '✍️', description: 'AI-powered writing and content creation tools' },
    { name: 'Image Generation', icon: '🎨', description: 'Create stunning visuals with AI image generators' },
    { name: 'Personal Assistants', icon: '🤖', description: 'AI assistants for daily tasks and productivity' },
    { name: 'Chatbots', icon: '💬', description: 'Conversational AI and customer service bots' },
    { name: 'Sales', icon: '💼', description: 'AI tools for sales automation and lead generation' },
    { name: 'Productivity', icon: '⚡', description: 'Boost efficiency with AI productivity tools' },
    { name: 'Video Creation', icon: '🎬', description: 'AI-powered video editing and generation' },
    { name: 'Music Creation', icon: '🎵', description: 'Compose and generate music with AI' },
    { name: 'Customer Support', icon: '🎧', description: 'AI customer service and support solutions' },
    { name: 'Interview Prep', icon: '🎤', description: 'AI-powered interview practice and preparation' },
    { name: 'AI Code Tools', icon: '💻', description: 'Code generation and development assistance' },
    { name: 'Resume Builder', icon: '📄', description: 'Create professional resumes with AI help' },
    { name: 'Email Assistants', icon: '📧', description: 'AI email writing and management tools' },
    { name: 'Data Analysis', icon: '📊', description: 'Analyze and visualize data with AI' },
    { name: 'PDF Tools', icon: '📋', description: 'AI-powered PDF processing and analysis' },
    { name: 'Legal AI Tools', icon: '⚖️', description: 'Legal document analysis and assistance' },
    { name: 'Language Translation', icon: '🌍', description: 'AI translation and language tools' },
    { name: 'Design Tools', icon: '🎯', description: 'AI-assisted design and creative tools' },
    { name: 'Avatars & Voice', icon: '🗣️', description: 'AI avatars and voice synthesis' },
    { name: 'Marketing', icon: '📢', description: 'AI marketing automation and optimization' },
    { name: 'SEO Tools', icon: '🔍', description: 'AI-powered SEO analysis and optimization' },
    { name: 'Logo Generator', icon: '🏷️', description: 'Create logos and brand assets with AI' },
    { name: 'Storytelling AI', icon: '📖', description: 'AI-powered story and narrative creation' },
    { name: 'Course Generator', icon: '🎓', description: 'Create educational content with AI' },
    { name: 'Business Plan Tools', icon: '📈', description: 'AI business planning and strategy tools' },
    { name: 'Prompt Marketplace', icon: '💡', description: 'Buy and sell AI prompts and templates' }
  ];

  return (
    <>
      <Helmet>
        <title>Categories - Browse AI Tools | AI Tool Mela</title>
        <meta name="description" content="Browse AI tools by category. Find the perfect tools for content writing, image generation, productivity, and more." />
        <meta property="og:title" content="Categories - Browse AI Tools | AI Tool Mela" />
        <meta property="og:description" content="Browse AI tools by category on AI Tool Mela." />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            All Categories
          </h1>
          <p className="text-xl text-gray-600">
            Explore AI tools organized by category. Find exactly what you need for your project.
          </p>
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
          
          {/* Main Content */}
          <div className="flex-1">
            {/* Categories Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allCategories.map((category) => (
                <Link
                  key={category.name}
                  to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="group"
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-white/70 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="text-3xl">{category.icon}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2 group-hover:text-purple-600 transition-colors">
                            {category.name}
                          </h3>
                          <div className="flex gap-2 mb-2">
                            <Badge variant="secondary">
                              {categoryCounts[category.name]?.tools || 0} tools
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">
                        {category.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-16 text-center">
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Platform Statistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      {Object.values(categoryCounts).reduce((sum: number, category: any) => sum + (category?.tools || 0), 0)}+
                    </div>
                    <div className="text-gray-600">Total Tools</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-600 mb-2">{allCategories.length}+</div>
                    <div className="text-gray-600">Categories</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-indigo-600 mb-2">24/7</div>
                    <div className="text-gray-600">AI Assistance</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
    </>
  );
};

export default Categories;
