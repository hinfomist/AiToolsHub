import { Helmet } from 'react-helmet-async';
import { Users, Target, TrendingUp, Award, ShoppingBag, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  const stats = [
    { label: 'AI Tools Listed', value: '128+', icon: ShoppingBag },
    { label: 'Categories', value: '25+', icon: Target },
    { label: 'Happy Users', value: '10K+', icon: Users },
    { label: 'Monthly Growth', value: '150%', icon: TrendingUp },
  ];

  const features = [
    {
      title: 'Curated Selection',
      description: 'Every tool is carefully reviewed and tested by our team to ensure quality and reliability.',
      icon: Award,
    },
    {
      title: 'Community Driven',
      description: 'Our platform grows with contributions from developers, creators, and AI enthusiasts worldwide.',
      icon: Users,
    },
    {
      title: 'Always Updated',
      description: 'We continuously update our directory with the latest AI tools and emerging technologies.',
      icon: TrendingUp,
    },
  ];

  return (
    <>
      <Helmet>
        <title>About AI Tool Mela | Best AI Tools Directory</title>
        <meta 
          name="description" 
          content="Learn about AI Tool Mela, the go-to directory for discovering top AI tools for creativity, productivity, and business." 
        />
        <meta name="keywords" content="AI tools directory, about AI Tool Mela, AI marketplace, artificial intelligence tools" />
        <link rel="canonical" href="https://aitoolmela.com/about" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
        <Navbar />

        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              About AI Tool Mela
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Welcome to AI Tool Mela – Your Ultimate AI Tool Directory. We curate the best AI tools for creators, 
              developers, and businesses in one vibrant hub, making discovery and comparison effortless.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center border-0 bg-white/70 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                    <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 text-foreground">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                In the rapidly evolving world of artificial intelligence, we believe that the right tools should be 
                accessible to everyone. AI Tool Mela bridges the gap between innovative AI technologies and the people 
                who need them most.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="border-0 bg-white/70 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-8">
                    <feature.icon className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-20 px-4 bg-white/30 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 text-foreground">Our Vision</h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                We envision a world where AI tools are not just powerful, but also discoverable and accessible. 
                Our platform serves as the central marketplace where innovation meets practical application.
              </p>
              <p>
                By connecting tool creators with users worldwide, we're building a vibrant ecosystem that 
                accelerates AI adoption and drives digital transformation across industries.
              </p>
              <p>
                Whether you're a startup founder looking for productivity tools, a content creator seeking 
                inspiration, or a developer building the next big thing, AI Tool Mela is your trusted partner 
                in the AI journey.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-foreground">
              Join the AI Revolution
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Ready to discover your next favorite AI tool or share your creation with the world?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/categories">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 px-8">
                  Explore Tools
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/submit">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 px-8">
                  Submit Your Tool
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default About;