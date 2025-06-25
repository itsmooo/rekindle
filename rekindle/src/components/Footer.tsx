import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Heart, ArrowUp, Sparkles } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Background with gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/90 to-indigo-900"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-500/30 to-indigo-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-gradient-to-tr from-purple-500/20 to-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main footer content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-16">
          {/* Top section with CTA */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
              <Heart className="w-4 h-4 text-pink-300 mr-2" />
              <span className="text-sm font-medium text-blue-200">Join Our Community</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 text-white">
              Ready to Transform Your Workplace Wellness?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Start your journey to a healthier, more balanced work life today.
            </p>
            <Link 
              to="/assessment" 
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white rounded-2xl font-semibold shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300"
            >
              Take Free Assessment
              <Sparkles className="ml-2 h-5 w-5" />
            </Link>
          </div>

          {/* Links grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand section */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Flame className="h-6 w-6 text-white" />
                </div>
                <span className="ml-3 text-3xl font-serif font-bold bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
                  Rekindle
                </span>
              </div>
              <p className="text-blue-100 mb-8 leading-relaxed">
                Empowering individuals and organizations to overcome burnout and create thriving, sustainable work environments.
              </p>
              
              {/* Social links with enhanced styling */}
              <div className="flex space-x-4">
                {[
                  { icon: Facebook, label: "Facebook", color: "from-blue-500 to-blue-600" },
                  { icon: Twitter, label: "Twitter", color: "from-blue-400 to-cyan-500" },
                  { icon: Instagram, label: "Instagram", color: "from-pink-500 to-rose-500" },
                  { icon: Linkedin, label: "LinkedIn", color: "from-blue-600 to-blue-700" },
                ].map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a 
                      key={index}
                      href="#" 
                      className={`w-12 h-12 bg-gradient-to-r ${social.color} rounded-xl flex items-center justify-center shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group`}
                      aria-label={social.label}
                    >
                      <Icon className="h-5 w-5 text-white group-hover:scale-110 transition-transform duration-300" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-white font-serif">Quick Links</h3>
              <ul className="space-y-4">
                {[
                  { to: "/", label: "Home" },
                  { to: "/assessment", label: "Assessment" },
                  { to: "/resources", label: "Resources" },
                  { to: "/for-employers", label: "For Employers" },
                  { to: "/stories", label: "Stories" },
                  { to: "/contact", label: "Contact" },
                ].map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.to} 
                      className="text-blue-200 hover:text-white transition-colors duration-300 flex items-center group"
                    >
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-white font-serif">Resources</h3>
              <ul className="space-y-4">
                {[
                  "Burnout Guide",
                  "Workplace Wellness",
                  "Self-Care Techniques",
                  "Mental Health Support",
                  "Research Papers",
                  "Recovery Strategies"
                ].map((resource, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className="text-blue-200 hover:text-white transition-colors duration-300 flex items-center group"
                    >
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                      {resource}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-white font-serif">Get in Touch</h3>
              <div className="space-y-6">
                <div className="flex items-start group">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-blue-100 text-sm mb-1">Email us</div>
                    <span className="text-white font-medium">support@rekindle.com</span>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-blue-100 text-sm mb-1">Call us</div>
                    <span className="text-white font-medium">+1 (555) 123-4567</span>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-blue-100 text-sm mb-1">Visit us</div>
                    <span className="text-white font-medium">123 Wellness Street, Suite 101<br />San Francisco, CA 94107</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <p className="text-blue-200 text-sm">
                  © {new Date().getFullYear()} Rekindle. All rights reserved.
                </p>
                <span className="mx-3 text-white/20">•</span>
                <div className="flex space-x-4 text-sm">
                  <a href="#" className="text-blue-200 hover:text-white transition-colors">Privacy Policy</a>
                  <a href="#" className="text-blue-200 hover:text-white transition-colors">Terms of Service</a>
                </div>
              </div>
              
              {/* Scroll to top button */}
              <button
                onClick={scrollToTop}
                className="group w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                aria-label="Scroll to top"
              >
                <ArrowUp className="h-5 w-5 text-white group-hover:scale-110 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;