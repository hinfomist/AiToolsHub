import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | AI Tool Mela</title>
        <meta name="description" content="Our commitment to protecting your privacy on AI Tool Mela. Learn how we collect, use, and protect your personal information." />
        <meta property="og:title" content="Privacy Policy | AI Tool Mela" />
        <meta property="og:description" content="Our commitment to protecting your privacy on AI Tool Mela." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        <Navbar />

        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent animate-fade-in">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <p className="text-sm text-gray-500 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              Last updated: January 1, 2025
            </p>
          </div>
        </section>

        {/* Privacy Policy Content */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">1. Introduction</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Welcome to AI Tool Mela ("we," "our," or "us"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. By using our platform, you consent to the data practices described in this policy.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">2. Information We Collect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Personal Information</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We may collect personal information that you voluntarily provide to us when you:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                    <li>Register for an account</li>
                    <li>Submit a tool for listing</li>
                    <li>Contact us through our contact form</li>
                    <li>Subscribe to our newsletter</li>
                    <li>Leave reviews or ratings</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Automatically Collected Information</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We automatically collect certain information when you visit our website, including:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                    <li>IP address and browser type</li>
                    <li>Device information and operating system</li>
                    <li>Pages visited and time spent on our site</li>
                    <li>Referring website information</li>
                    <li>Usage patterns and preferences</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg animate-fade-in" style={{ animationDelay: '1s' }}>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">3. How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We use the information we collect for various purposes, including:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Providing and maintaining our services</li>
                  <li>Processing tool submissions and reviews</li>
                  <li>Communicating with you about our services</li>
                  <li>Sending newsletters and updates (with your consent)</li>
                  <li>Improving our website and user experience</li>
                  <li>Analyzing usage patterns and trends</li>
                  <li>Preventing fraud and ensuring security</li>
                  <li>Complying with legal obligations</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg animate-fade-in" style={{ animationDelay: '1.2s' }}>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">4. Cookies and Tracking Technologies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We use cookies and similar tracking technologies to enhance your experience on our website. These technologies help us:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Remember your preferences and settings</li>
                  <li>Analyze website traffic and usage patterns</li>
                  <li>Provide personalized content and advertisements</li>
                  <li>Improve our services and functionality</li>
                </ul>
                <p className="text-gray-600 leading-relaxed mt-4">
                  You can control cookie preferences through your browser settings, though disabling cookies may affect website functionality.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg animate-fade-in" style={{ animationDelay: '1.4s' }}>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">5. Third-Party Services</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We may use third-party services to support our operations, including:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Analytics providers (Google Analytics)</li>
                  <li>Advertising networks (Google AdSense)</li>
                  <li>Email service providers</li>
                  <li>Cloud storage and hosting services</li>
                  <li>Payment processors</li>
                </ul>
                <p className="text-gray-600 leading-relaxed mt-4">
                  These third parties have their own privacy policies, and we encourage you to review them.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg animate-fade-in" style={{ animationDelay: '1.6s' }}>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">6. Data Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg animate-fade-in" style={{ animationDelay: '1.8s' }}>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">7. Your Rights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Depending on your location, you may have certain rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Right to access your personal data</li>
                  <li>Right to correct inaccurate information</li>
                  <li>Right to delete your personal data</li>
                  <li>Right to restrict processing of your data</li>
                  <li>Right to data portability</li>
                  <li>Right to withdraw consent</li>
                </ul>
                <p className="text-gray-600 leading-relaxed mt-4">
                  To exercise these rights, please contact us using the information provided below.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg animate-fade-in" style={{ animationDelay: '2s' }}>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">8. Children's Privacy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg animate-fade-in" style={{ animationDelay: '2.2s' }}>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">9. Changes to This Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically for any changes.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg animate-fade-in" style={{ animationDelay: '2.4s' }}>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">10. Contact Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                </p>
                <div className="text-gray-600">
                  <p>Email: <a href="mailto:privacy@aitoolmela.com" className="text-purple-600 hover:text-purple-800">privacy@aitoolmela.com</a></p>
                  <p>Website: <a href="/contact" className="text-purple-600 hover:text-purple-800">Contact Page</a></p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Privacy;