import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Left: Logo & Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              AI Tool Mela
            </h3>
            <p className="text-gray-400 mb-4">
              Your Ultimate AI Tool Directory. Discover the best AI tools for creators, developers, and businesses in one vibrant hub.
            </p>
            <p className="text-gray-500 text-sm">
              © 2025 AI Tool Mela. All rights reserved.
            </p>
          </div>

          {/* Center: Platform Links */}
          <div>
            <h4 className="font-semibold mb-4 text-purple-400">Platform</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/categories" className="hover:text-white transition-colors hover:text-purple-300">
                  Browse Tools
                </Link>
              </li>
              <li>
                <Link to="/submit" className="hover:text-white transition-colors hover:text-purple-300">
                  Submit Tool
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-white transition-colors hover:text-purple-300">
                  Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Right: Community & Newsletter */}
          <div>
            <h4 className="font-semibold mb-4 text-blue-400">Community</h4>
            <ul className="space-y-2 text-gray-400 mb-4">
              <li>
                <a href="#" className="hover:text-white transition-colors hover:text-blue-300">
                  Discord
                </a>
              </li>
              <li>
                <a href="https://twitter.com/aitoolmela" className="hover:text-white transition-colors hover:text-blue-300">
                  Twitter
                </a>
              </li>
            </ul>
            <div>
              <p className="text-sm text-gray-400 mb-2">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Support Links */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <Link to="/about" className="hover:text-white transition-colors hover:text-purple-300">
              About Us
            </Link>
            <Link to="/contact" className="hover:text-white transition-colors hover:text-purple-300">
              Contact
            </Link>
            <Link to="/privacy" className="hover:text-white transition-colors hover:text-purple-300">
              Privacy Policy
            </Link>
            <a href="#" className="hover:text-white transition-colors hover:text-purple-300">
              Help Center
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;