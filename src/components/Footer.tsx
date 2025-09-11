import { Link } from 'react-router-dom';
import { ShoppingBag, Twitter, Mail, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">AI Tool Mela</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Discover the Best AI Tools in One Vibrant Directory
            </p>
            <p className="text-gray-500 text-xs">
              © 2025 AI Tool Mela. All rights reserved.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-200">Platform</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link 
                  to="/categories" 
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  Browse Tools
                </Link>
              </li>
              <li>
                <Link 
                  to="/submit" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Submit Tool
                </Link>
              </li>
              <li>
                <Link 
                  to="/categories" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-200">Community</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a 
                  href="https://twitter.com/aitoolmela" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <Twitter className="h-4 w-4 mr-2" />
                  Twitter
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </li>
              <li>
                <a 
                  href="mailto:support@aitoolmela.com"
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Newsletter
                </a>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-200">Support</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;