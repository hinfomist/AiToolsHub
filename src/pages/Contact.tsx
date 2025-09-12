import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MessageSquare, MapPin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with backend or emailjs
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | AI Tool Mela AI Tools</title>
        <meta name="description" content="Reach out to us for inquiries about AI tools or partnerships. Get in touch with the AI Tool Mela team." />
        <meta property="og:title" content="Contact Us | AI Tool Mela" />
        <meta property="og:description" content="Get in touch with the AI Tool Mela team for inquiries and partnerships." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        <Navbar />

        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent animate-fade-in">
              Get in Touch with AI Tool Mela
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Have a question, suggestion, or want to partner with us? We'd love to hear from you.
            </p>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                      <MessageSquare className="h-6 w-6 text-purple-600" />
                      Send us a Message
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full"
                          placeholder="your.email@example.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                          Message
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          required
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full min-h-[120px]"
                          placeholder="Tell us how we can help you..."
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 hover:scale-105 transition-all duration-300"
                      >
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Mail className="h-6 w-6 text-purple-600" />
                      <h3 className="text-xl font-semibold text-gray-800">Email Us</h3>
                    </div>
                    <p className="text-gray-600 mb-2">For general inquiries:</p>
                    <a href="mailto:support@aitoolmela.com" className="text-purple-600 hover:text-purple-800 font-medium">
                      support@aitoolmela.com
                    </a>
                    <p className="text-gray-600 mt-4 mb-2">For partnerships:</p>
                    <a href="mailto:partnerships@aitoolmela.com" className="text-purple-600 hover:text-purple-800 font-medium">
                      partnerships@aitoolmela.com
                    </a>
                  </CardContent>
                </Card>

                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <MessageSquare className="h-6 w-6 text-blue-600" />
                      <h3 className="text-xl font-semibold text-gray-800">Social Media</h3>
                    </div>
                    <div className="space-y-2">
                      <p className="text-gray-600">Follow us for updates:</p>
                      <a href="https://twitter.com/aitoolmela" className="block text-blue-600 hover:text-blue-800 font-medium">
                        Twitter: @aitoolmela
                      </a>
                      <a href="#" className="block text-blue-600 hover:text-blue-800 font-medium">
                        Discord Community
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <MapPin className="h-6 w-6 text-green-600" />
                      <h3 className="text-xl font-semibold text-gray-800">Response Time</h3>
                    </div>
                    <p className="text-gray-600">
                      We typically respond to all inquiries within 24-48 hours during business days.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 animate-fade-in">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2 text-gray-800">How do I submit my AI tool?</h3>
                  <p className="text-gray-600">
                    You can submit your AI tool using our submission form. Visit our Submit Tool page and fill out the required information. Our team reviews all submissions within 3-5 business days.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2 text-gray-800">Is listing my tool free?</h3>
                  <p className="text-gray-600">
                    Yes! Basic listing is completely free. We also offer premium listing options with additional features like priority placement and enhanced visibility.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2 text-gray-800">How do you ensure tool quality?</h3>
                  <p className="text-gray-600">
                    Our team manually reviews each submitted tool for functionality, quality, and user experience. We also rely on community feedback and ratings to maintain high standards.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Contact;