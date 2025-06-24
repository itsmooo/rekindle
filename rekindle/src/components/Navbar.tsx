import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Flame, User, LogOut, LayoutDashboard, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Assessment', path: '/assessment' },
    { name: 'Resources', path: '/resources' },
    { name: 'For Employers', path: '/for-employers' },
    { name: 'Stories', path: '/stories' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-100' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center group">
            <div className="relative">
              <Flame className="h-8 w-8 text-blue-500 group-hover:text-blue-600 transition-colors duration-300" />
              <Sparkles className="h-3 w-3 text-green-400 absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" />
            </div>
            <span className="ml-2 text-2xl font-serif font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-500 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
              Rekindle
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 font-medium rounded-lg transition-all duration-300 group ${
                  location.pathname === link.path 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/50'
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full animate-pulse" />
                )}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </Link>
            ))}
            
            <div className="flex items-center space-x-2 ml-6 pl-6 border-l border-gray-200">
              {user ? (
                <>
                  {isAdmin() && (
                    <Link
                      to="/admin"
                      className="flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 group"
                    >
                      <LayoutDashboard className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                      Dashboard
                    </Link>
                  )}
                  <div className="flex items-center px-4 py-2 text-gray-700 font-medium bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg shadow-sm">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-2">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="bg-gradient-to-r from-gray-800 to-blue-800 bg-clip-text text-transparent">
                      {user.name}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center px-4 py-2 text-gray-700 hover:text-red-600 font-medium transition-all duration-300 rounded-lg hover:bg-red-50 group"
                  >
                    <LogOut className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-6 py-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 rounded-lg hover:bg-blue-50"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 relative overflow-hidden group"
                  >
                    <span className="relative z-10">Sign Up</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </>
              )}
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-700 focus:outline-none p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <Menu 
                size={24} 
                className={`absolute inset-0 transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'
                }`} 
              />
              <X 
                size={24} 
                className={`absolute inset-0 transition-all duration-300 ${
                  isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 rotate-180'
                }`} 
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden fixed inset-0 bg-gradient-to-br from-white via-blue-50 to-purple-50 backdrop-blur-xl z-40 transform transition-all duration-500 ease-out ${
            isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          }`}
        >
          <div className="flex flex-col p-8 h-full">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center">
                <Flame className="h-8 w-8 text-blue-500" />
                <span className="ml-2 text-2xl font-serif font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Rekindle
                </span>
              </div>
              <button
                onClick={toggleMenu}
                className="text-gray-700 focus:outline-none p-2 rounded-lg hover:bg-white/50 transition-colors duration-300"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
            
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link, index) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-xl font-medium px-4 py-3 rounded-xl transition-all duration-300 ${
                    location.pathname === link.path 
                      ? 'text-blue-600 bg-white shadow-md' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-white/70'
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="pt-6 mt-6 border-t border-gray-200">
                {user ? (
                  <>
                    {isAdmin() && (
                      <Link
                        to="/admin"
                        className="flex items-center text-xl font-medium text-gray-700 mb-4 px-4 py-3 rounded-xl hover:bg-white/70 transition-all duration-300"
                      >
                        <LayoutDashboard className="w-6 h-6 mr-3" />
                        Dashboard
                      </Link>
                    )}
                    <div className="flex items-center text-xl font-medium text-gray-700 mb-4 px-4 py-3 bg-white/70 rounded-xl">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      {user.name}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center text-xl font-medium text-red-600 px-4 py-3 rounded-xl hover:bg-red-50 transition-all duration-300 w-full"
                    >
                      <LogOut className="w-6 h-6 mr-3" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block text-xl font-medium text-gray-700 mb-4 px-4 py-3 rounded-xl hover:bg-white/70 transition-all duration-300"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      className="block text-xl font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;