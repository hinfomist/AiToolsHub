import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, MessageCircle, Send, Twitter, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again later or contact us directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | AI Tool Mela AI Tools</title>
        <meta 
          name="description" 
          content="Reach out to us for inquiries about AI tools, partnerships, or support. Get in touch with the AI Tool Mela team." 
        />
        <meta name="keywords" content="contact AI Tool Mela, support, partnerships, AI tools help" />
        <link rel="canonical" href="https://aitoolmela.com/contact" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
        <Navbar />

        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions about AI tools, want to suggest a feature, or interested in partnerships? 
              We'd love to hear from you.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <MessageCircle className="h-6 w-6 text-primary mr-3" />
                    Send us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your@email.com"
                          className="w-full"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="What's this about?"
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us more about your inquiry..."
                        rows={6}
                        className="w-full resize-none"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                      size="lg"
                    >
                      {isSubmitting ? (
                        <>Sending...</>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Direct Contact */}
              <Card className="border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Mail className="h-5 w-5 text-primary mr-2" />
                    Direct Contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">General Inquiries</h4>
                    <a 
                      href="mailto:support@aitoolmela.com"
                      className="text-primary hover:underline"
                    >
                      support@aitoolmela.com
                    </a>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Partnerships</h4>
                    <a 
                      href="mailto:partnerships@aitoolmela.com"
                      className="text-primary hover:underline"
                    >
                      partnerships@aitoolmela.com
                    </a>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Press & Media</h4>
                    <a 
                      href="mailto:press@aitoolmela.com"
                      className="text-primary hover:underline"
                    >
                      press@aitoolmela.com
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className="border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl">Follow Us</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <a 
                    href="https://twitter.com/aitoolmela"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Twitter className="h-5 w-5 mr-3" />
                    @aitoolmela
                    <ExternalLink className="h-4 w-4 ml-auto" />
                  </a>
                </CardContent>
              </Card>

              {/* FAQ Link */}
              <Card className="border-0 bg-white/70 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h4 className="font-medium mb-2">Frequently Asked Questions</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Check our FAQ section for quick answers to common questions.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    View FAQ
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Contact;