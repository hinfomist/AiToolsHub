import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200">
            AI Tool Mela
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-purple-600 font-medium transition-colors duration-200 hover:scale-105">
              Home
            </Link>
            <Link to="/categories" className="text-gray-600 hover:text-purple-600 font-medium transition-colors duration-200 hover:scale-105">
              Categories
            </Link>
            <Link to="/blog" className="text-gray-600 hover:text-purple-600 font-medium transition-colors duration-200 hover:scale-105">
              Blog
            </Link>
            <Link to="/submit" className="text-gray-600 hover:text-purple-600 font-medium transition-colors duration-200 hover:scale-105">
              Submit Tool
            </Link>
            <Link to="/auth">
              <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50 hover:scale-105 transition-all duration-200">
                Sign In
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              <Link
                to="/"
                className="block px-3 py-2 text-gray-600 hover:text-purple-600 font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/categories"
                className="block px-3 py-2 text-gray-600 hover:text-purple-600 font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Categories
              </Link>
              <Link
                to="/blog"
                className="block px-3 py-2 text-gray-600 hover:text-purple-600 font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
              <Link
                to="/submit"
                className="block px-3 py-2 text-gray-600 hover:text-purple-600 font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Submit Tool
              </Link>
              <Link
                to="/auth"
                className="block px-3 py-2"
                onClick={() => setIsOpen(false)}
              >
                <Button variant="outline" className="w-full border-purple-200 text-purple-600 hover:bg-purple-50">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;