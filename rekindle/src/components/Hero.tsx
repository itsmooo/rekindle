import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 z-0"></div>
      
      {/* Decorative circles */}
      <div className="absolute -top-10 -right-10 w-72 h-72 bg-blue-100 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-green-100 rounded-full opacity-40 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 bg-gradient-to-r from-blue-700 via-blue-600 to-green-500 bg-clip-text text-transparent leading-tight">
            Reignite Your Passion &<br />Overcome Burnout
          </h1>
          
          <p className="text-lg md:text-xl text-gray-700 mb-8 md:mb-12 leading-relaxed">
            Rekindle helps you recognize, address, and recover from workplace burnout with evidence-based resources and support.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/assessment" 
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full font-medium shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-0.5 transform transition-all duration-300 text-center"
            >
              Take Free Assessment
            </Link>
            
            <Link 
              to="/resources" 
              className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-full font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 transform transition-all duration-300 flex items-center justify-center group"
            >
              <span>Explore Resources</span>
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
          
          <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-10 text-gray-600">
            <div className="flex items-center">
              <div className="bg-blue-500 rounded-full h-12 w-12 flex items-center justify-center shadow-md">
                <span className="text-white font-bold">85%</span>
              </div>
              <p className="ml-3 text-left">of workers experience<br />burnout symptoms</p>
            </div>
            
            <div className="flex items-center">
              <div className="bg-green-500 rounded-full h-12 w-12 flex items-center justify-center shadow-md">
                <span className="text-white font-bold">92%</span>
              </div>
              <p className="ml-3 text-left">recovery rate with<br />proper support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;