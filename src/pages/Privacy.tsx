import { Helmet } from 'react-helmet-async';
import { Shield, Eye, Cookie, Users, Mail, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Privacy = () => {
  const sections = [
    {
      icon: FileText,
      title: 'Information We Collect',
      content: [
        'Personal information you provide when submitting tools or signing up',
        'Usage data and analytics to improve our platform',
        'Technical information such as IP address and browser type',
        'Cookies and similar tracking technologies for functionality'
      ]
    },
    {
      icon: Eye,
      title: 'How We Use Your Information',
      content: [
        'To provide and maintain our AI tool directory service',
        'To communicate with you about your submissions and updates',
        'To analyze usage patterns and improve user experience',
        'To display relevant content and recommendations'
      ]
    },
    {
      icon: Shield,
      title: 'Data Protection',
      content: [
        'We implement industry-standard security measures',
        'Your data is encrypted during transmission and storage',
        'We regularly audit our security practices and systems',
        'Access to personal data is restricted to authorized personnel only'
      ]
    },
    {
      icon: Cookie,
      title: 'Cookies and Tracking',
      content: [
        'We use essential cookies for site functionality',
        'Analytics cookies help us understand user behavior',
        'You can control cookie preferences in your browser settings',
        'Third-party services may set their own cookies (Google Analytics, ads)'
      ]
    },
    {
      icon: Users,
      title: 'Third-Party Services',
      content: [
        'Google Analytics for website traffic analysis',
        'Advertising partners for displaying relevant ads',
        'Firebase for backend services and authentication',
        'Email service providers for communications'
      ]
    },
    {
      icon: Mail,
      title: 'Your Rights',
      content: [
        'Access and review your personal information',
        'Request correction of inaccurate data',
        'Request deletion of your personal data',
        'Opt-out of marketing communications at any time'
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Privacy Policy | AI Tool Mela</title>
        <meta 
          name="description" 
          content="Our commitment to protecting your privacy on AI Tool Mela. Learn how we collect, use, and protect your data." 
        />
        <meta name="keywords" content="privacy policy, data protection, AI Tool Mela privacy, user rights" />
        <link rel="canonical" href="https://aitoolmela.com/privacy" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
        <Navbar />

        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-lg text-muted-foreground">
              Last updated: January 2025
            </p>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              At AI Tool Mela, we are committed to protecting your privacy and ensuring transparency 
              about how we collect, use, and protect your personal information.
            </p>
          </div>

          {/* Introduction */}
          <Card className="mb-8 border-0 bg-white/70 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Shield className="h-6 w-6 text-primary mr-2" />
                Introduction
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                This Privacy Policy describes how AI Tool Mela ("we," "our," or "us") collects, uses, 
                and protects your information when you use our website and services. By using our platform, 
                you consent to the data practices described in this policy.
              </p>
            </CardContent>
          </Card>

          {/* Privacy Sections */}
          <div className="grid gap-6">
            {sections.map((section, index) => (
              <Card key={index} className="border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <section.icon className="h-6 w-6 text-primary mr-3" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Section */}
          <Card className="mt-8 border-0 bg-white/70 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Mail className="h-6 w-6 text-primary mr-2" />
                Contact Us
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our data practices, 
                please contact us:
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p>Email: <a href="mailto:privacy@aitoolmela.com" className="text-primary hover:underline">privacy@aitoolmela.com</a></p>
                <p>Website: <a href="https://aitoolmela.com/contact" className="text-primary hover:underline">aitoolmela.com/contact</a></p>
              </div>
            </CardContent>
          </Card>

          {/* Updates Notice */}
          <div className="mt-8 p-6 bg-primary/10 rounded-lg border border-primary/20">
            <p className="text-sm text-muted-foreground">
              <strong>Notice:</strong> We may update this Privacy Policy from time to time. 
              We will notify you of any changes by posting the new Privacy Policy on this page 
              and updating the "Last updated" date.
            </p>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Privacy;