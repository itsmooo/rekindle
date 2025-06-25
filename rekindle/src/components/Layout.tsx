import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Enhanced background with multiple layers */}
      <div className="fixed inset-0 z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-indigo-300/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-purple-200/15 to-pink-200/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-bl from-green-200/15 to-emerald-200/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `
            radial-gradient(circle at 25px 25px, rgb(59, 130, 246) 2px, transparent 0),
            radial-gradient(circle at 75px 75px, rgb(139, 92, 246) 2px, transparent 0)
          `,
          backgroundSize: '100px 100px'
        }}></div>
        
        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow relative">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;