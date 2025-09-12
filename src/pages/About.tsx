import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <>
      <Helmet>
        <title>About AI Tool Mela | Best AI Tools Directory</title>
        <meta name="description" content="Learn about AI Tool Mela, the go-to directory for discovering top AI tools. We curate the best AI tools for creators, developers, and businesses." />
        <meta property="og:title" content="About AI Tool Mela | Best AI Tools Directory" />
        <meta property="og:description" content="Learn about AI Tool Mela, the go-to directory for discovering top AI tools." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        <Navbar />

        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent animate-fade-in">
              About AI Tool Mela
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Welcome to AI Tool Mela – Your Ultimate AI Tool Directory. We curate the best AI tools for creators, developers, and businesses in one vibrant hub.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Mission</h2>
                <p className="text-gray-600 mb-4 text-lg leading-relaxed">
                  At AI Tool Mela, we believe that the right AI tool can transform how you work, create, and innovate. Our mission is to bridge the gap between cutting-edge AI technology and the people who need it most.
                </p>
                <p className="text-gray-600 mb-4 text-lg leading-relaxed">
                  We carefully curate and review AI tools across 25+ categories, from content writing and image generation to productivity and business automation. Every tool in our directory is tested and evaluated to ensure it meets our quality standards.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Our community-driven approach means that we don't just list tools – we help you understand which ones will truly make a difference in your workflow.
                </p>
              </div>
              <div className="animate-scale-in" style={{ animationDelay: '0.6s' }}>
                <Card className="p-8 bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-0">
                    <h3 className="text-2xl font-semibold mb-4 text-purple-600">Why Choose AI Tool Mela?</h3>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start">
                        <span className="text-purple-500 mr-2">✓</span>
                        Hand-curated selection of premium AI tools
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-500 mr-2">✓</span>
                        Detailed reviews and ratings from real users
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-500 mr-2">✓</span>
                        Regular updates with the latest AI innovations
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-500 mr-2">✓</span>
                        Free to use for everyone
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-500 mr-2">✓</span>
                        Community-driven recommendations
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 animate-fade-in">
              Platform Statistics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
                <div className="text-4xl font-bold text-purple-600 mb-2">128+</div>
                <div className="text-gray-600 text-lg">AI Tools Listed</div>
                <p className="text-sm text-gray-500 mt-2">Carefully curated and reviewed</p>
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '1s' }}>
                <div className="text-4xl font-bold text-blue-600 mb-2">25+</div>
                <div className="text-gray-600 text-lg">Categories</div>
                <p className="text-sm text-gray-500 mt-2">From writing to automation</p>
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '1.2s' }}>
                <div className="text-4xl font-bold text-indigo-600 mb-2">10K+</div>
                <div className="text-gray-600 text-lg">Happy Users</div>
                <p className="text-sm text-gray-500 mt-2">Growing community worldwide</p>
              </div>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 animate-fade-in">
              Our Vision for the Future
            </h2>
            <p className="text-xl text-gray-600 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              We envision a world where AI tools are accessible, understandable, and beneficial for everyone. As AI technology continues to evolve, we're committed to being your trusted guide in this exciting landscape.
            </p>
            <p className="text-lg text-gray-600 mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              Join us on this journey as we continue to discover, test, and share the most innovative AI tools that are shaping the future of work and creativity.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-gray-800 animate-fade-in">
              Ready to Share Your AI Tool?
            </h2>
            <p className="text-xl text-gray-600 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Have an amazing AI tool that deserves recognition? Join our community and help others discover innovative solutions.
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

export default About;