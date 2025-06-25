import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Flame, User, LogOut, LayoutDashboard, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
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
    setShowUserMenu(false);
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
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100/50' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Made larger */}
          <Link to="/" className="flex items-center group">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Flame className="h-6 w-6 text-white" />
            </div>
            <span className="ml-3 text-2xl font-bold text-gray-900">
              Rekindle
            </span>
          </Link>

          {/* Desktop Navigation - Made larger */}
          <nav className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-5 py-3 text-base font-medium transition-all duration-200 ${
                  location.pathname === link.path 
                    ? 'text-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Section - Made larger */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                {isAdmin() && (
                  <Link
                    to="/admin"
                    className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
                  >
                    <LayoutDashboard className="w-5 h-5 mr-2" />
                    Dashboard
                  </Link>
                )}
                
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    {user.name}
                  </button>

                  {/* User Dropdown Menu - Made larger */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <Link
                        to="/profile"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center px-5 py-3 text-base text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                      >
                        <Settings className="w-5 h-5 mr-3" />
                        My Profile
                      </Link>
                      <hr className="my-2 border-gray-100" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-5 py-3 text-base text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                      >
                        <LogOut className="w-5 h-5 mr-3" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-5 py-3 text-base font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-3 bg-blue-600 text-white text-base font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button - Made larger */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-3 text-gray-700 hover:text-gray-900 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation - Made larger */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white">
            <nav className="py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-5 py-3 text-base font-medium transition-colors duration-200 ${
                    location.pathname === link.path 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="pt-4 mt-4 border-t border-gray-100">
                {user ? (
                  <>
                    {isAdmin() && (
                      <Link
                        to="/admin"
                        className="flex items-center px-5 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
                      >
                        <LayoutDashboard className="w-5 h-5 mr-3" />
                        Dashboard
                      </Link>
                    )}
                    <Link
                      to="/profile"
                      className="flex items-center px-5 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <Settings className="w-5 h-5 mr-3" />
                      My Profile
                    </Link>
                    <div className="flex items-center px-5 py-3 text-base font-medium text-gray-700">
                      <div className="w-7 h-7 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      {user.name}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-5 py-3 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors duration-200"
                    >
                      <LogOut className="w-5 h-5 mr-3" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-5 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      className="block mx-5 my-3 px-5 py-3 bg-blue-600 text-white text-base font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 text-center"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Overlay to close user dropdown */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  );
};

export default Navbar;