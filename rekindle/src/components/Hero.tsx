import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';

const Hero: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30">
      {/* Enhanced blurred background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main large gradient orbs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-indigo-600/25 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-violet-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Additional large orbs for more depth */}
        <div className="absolute -top-20 left-1/4 w-72 h-72 bg-gradient-to-bl from-sky-300/20 to-cyan-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2.5s' }}></div>
        <div className="absolute -bottom-20 right-1/4 w-64 h-64 bg-gradient-to-tr from-purple-300/15 to-pink-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3.2s' }}></div>
        
        {/* Medium accent orbs */}
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-gradient-to-r from-cyan-300/15 to-blue-400/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-gradient-to-r from-indigo-300/15 to-purple-400/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        
        {/* Additional medium orbs */}
        <div className="absolute top-1/3 left-1/5 w-56 h-56 bg-gradient-to-r from-teal-300/12 to-emerald-400/12 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-1/3 right-1/5 w-52 h-52 bg-gradient-to-r from-rose-300/12 to-orange-400/12 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2.8s' }}></div>
        
        {/* Small floating orbs */}
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-gradient-to-r from-pink-300/10 to-rose-400/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 left-1/4 w-24 h-24 bg-gradient-to-r from-emerald-300/10 to-teal-400/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.8s' }}></div>
        
        {/* Extra small floating elements */}
        <div className="absolute top-1/5 right-1/2 w-20 h-20 bg-gradient-to-r from-amber-300/8 to-yellow-400/8 rounded-full blur-lg animate-pulse" style={{ animationDelay: '3.5s' }}></div>
        <div className="absolute bottom-1/5 left-1/2 w-16 h-16 bg-gradient-to-r from-lime-300/8 to-green-400/8 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1.2s' }}></div>
        <div className="absolute top-2/3 right-1/6 w-28 h-28 bg-gradient-to-r from-fuchsia-300/8 to-violet-400/8 rounded-full blur-lg animate-pulse" style={{ animationDelay: '4.5s' }}></div>
        <div className="absolute bottom-2/3 left-1/6 w-22 h-22 bg-gradient-to-r from-slate-300/8 to-gray-400/8 rounded-full blur-lg animate-pulse" style={{ animationDelay: '0.3s' }}></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/2 w-4 h-4 bg-blue-400/20 rounded-full blur-sm animate-float"></div>
        <div className="absolute top-3/4 right-1/3 w-3 h-3 bg-indigo-400/20 rounded-full blur-sm animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/3 w-5 h-5 bg-purple-400/15 rounded-full blur-sm animate-float" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-1/4 right-1/2 w-2 h-2 bg-cyan-400/20 rounded-full blur-sm animate-float-delayed"></div>
        <div className="absolute top-1/6 right-1/4 w-4 h-4 bg-pink-400/15 rounded-full blur-sm animate-float" style={{ animationDelay: '2.3s' }}></div>
        <div className="absolute bottom-1/6 left-1/4 w-3 h-3 bg-emerald-400/15 rounded-full blur-sm animate-float-delayed" style={{ animationDelay: '0.7s' }}></div>
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23000000%22 fill-opacity=%220.03%22%3E%3Ccircle cx=%227%22 cy=%227%22 r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
        
        {/* Additional pattern overlays */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22%23000000%22 fill-opacity=%220.015%22%3E%3Cpath d=%22M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z%22/%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        {/* Noise texture for depth */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%221%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.02%22/%3E%3C/svg%3E')] opacity-30"></div>
        
        {/* Multiple radial gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-white/5 to-white/10"></div>
        <div className="absolute inset-0 bg-gradient-radial from-blue-50/10 via-transparent to-indigo-50/5"></div>
        
        {/* Subtle animated rays */}
        <div className="absolute top-1/2 left-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-200/20 to-transparent transform -translate-x-1/2 -translate-y-1/2 rotate-45 animate-pulse" style={{ animationDelay: '5s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-full h-px bg-gradient-to-r from-transparent via-indigo-200/15 to-transparent transform -translate-x-1/2 -translate-y-1/2 -rotate-45 animate-pulse" style={{ animationDelay: '6s' }}></div>
      </div>

      <div className="relative container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <div className={`transition-all duration-700 delay-200 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-gray-900 mb-8">
              Overcome Burnout,
              <br />
              <span className="text-blue-600">Reignite Passion</span>
            </h1>
          </div>

          {/* Description */}
          <div className={`transition-all duration-700 delay-400 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-10">
              Evidence-based tools and personalized strategies to help you recover from workplace burnout and rediscover your professional passion.
            </p>
          </div>

          {/* Trust Indicators */}
          <div className={`flex flex-wrap items-center justify-center gap-8 mb-12 transition-all duration-700 delay-500 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <span className="text-gray-600 font-medium text-lg">Science-backed</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <span className="text-gray-600 font-medium text-lg">Free to use</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <span className="text-gray-600 font-medium text-lg">Proven results</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-700 delay-700 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <Link 
              to="/assessment" 
              className="inline-flex items-center justify-center px-10 py-5 bg-blue-600 text-white text-lg font-semibold rounded-md shadow-lg hover:bg-blue-700 hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Take Free Assessment
              <ArrowRight className="ml-3 h-6 w-6" />
            </Link>
            
            <Link 
              to="/resources" 
              className="inline-flex items-center justify-center px-10 py-5 bg-white text-gray-700 text-lg font-semibold rounded-md border border-gray-300 shadow-sm hover:bg-gray-50 hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Explore Resources
            </Link>
          </div>

          {/* Bottom Stats Section */}
          <div className={`transition-all duration-700 delay-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
              {[
                { number: "85%", label: "Experience Burnout" },
                { number: "92%", label: "Recovery Success" },
                { number: "10k+", label: "Users Helped" },
                { number: "4.9★", label: "User Rating" },
              ].map((stat, index) => (
                <div key={index} className="group">
                  <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">{stat.number}</div>
                  <div className="text-gray-600 text-base">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;