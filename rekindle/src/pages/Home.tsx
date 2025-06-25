import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import TestimonialCard from '../components/TestimonialCard';
import WellnessTracker from '../components/WellnessTracker';
import MeditationTimer from '../components/MeditationTimer';
import { Brain, Battery, LineChart, Users, ArrowRight, BookOpen, Target, Coffee, CheckCircle, Sparkles, Zap, Shield, Globe } from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: "Understand Burnout",
      description: "Learn to recognize the signs and symptoms of burnout before they become overwhelming.",
      color: "blue"
    },
    {
      icon: LineChart,
      title: "Assess Your State",
      description: "Take our evidence-based assessment to understand your current burnout risk level.",
      color: "green"
    },
    {
      icon: Battery,
      title: "Recovery Strategies",
      description: "Discover personalized strategies to recover from burnout and prevent future occurrences.",
      color: "yellow"
    },
    {
      icon: Users,
      title: "Organizational Support",
      description: "Resources for employers to create healthier work environments and support team wellness.",
      color: "purple"
    }
  ];

  const testimonials = [
    {
      quote: "After months of feeling exhausted and detached from my work, Rekindle helped me understand I was experiencing burnout. The resources here helped me recover and set healthier boundaries.",
      author: "Sarah Johnson",
      role: "Marketing Manager",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      quote: "As a CEO, I was alarmed by increasing burnout rates in my company. The organizational resources provided by Rekindle helped us implement changes that improved team wellness and productivity.",
      author: "Michael Chen",
      role: "CEO, TechSolutions",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      quote: "I didn't realize I was experiencing burnout until I took the assessment. The personalized recovery plan gave me practical steps to regain my energy and passion for my work.",
      author: "James Rodriguez",
      role: "Software Engineer",
      image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ];

  const quickTips = [
    {
      icon: Coffee,
      title: "Take Regular Breaks",
      description: "Follow the 52/17 rule: 52 minutes of focused work followed by 17 minutes of rest.",
      color: "from-amber-400 to-orange-500"
    },
    {
      icon: Target,
      title: "Set Clear Boundaries",
      description: "Establish work hours and stick to them. Learn to say no to additional commitments.",
      color: "from-red-400 to-pink-500"
    },
    {
      icon: BookOpen,
      title: "Practice Mindfulness",
      description: "Incorporate short meditation sessions throughout your day to stay centered.",
      color: "from-green-400 to-emerald-500"
    }
  ];

  return (
    <div>
      <Hero />
      
      {/* Features Section - Enhanced */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/20"></div>
        
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-indigo-200/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-purple-100/15 to-pink-100/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Section header with better styling */}
          <div className="text-center max-w-4xl mx-auto mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100/80 backdrop-blur-sm rounded-full mb-6 border border-blue-200/50">
              <Sparkles className="w-4 h-4 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-700">Your Wellness Journey</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-6 bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-700 bg-clip-text text-transparent">
              Your Path to Workplace Wellness
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Burnout doesn't happen overnight, and recovery is a journey. We provide the tools, resources, and support you need every step of the way.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                color={feature.color}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Tips Section - Enhanced */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-purple-50/30"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-100/80 to-green-100/80 backdrop-blur-sm rounded-full mb-6 border border-green-200/50">
              <Zap className="w-4 h-4 text-green-600 mr-2" />
              <span className="text-sm font-medium text-green-700">Quick Wins</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Start Your Wellness Journey Today
            </h2>
            <p className="text-xl text-gray-600">
              Simple, science-backed strategies you can implement immediately to improve your well-being.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {quickTips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <div key={index} className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50 hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                  {/* Background gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${tip.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}></div>
                  
                  {/* Floating elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-white/20 rounded-full blur-sm opacity-60 group-hover:scale-125 transition-transform duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center mb-6">
                      <div className={`bg-gradient-to-r ${tip.color} rounded-2xl p-4 mr-4 shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 font-serif group-hover:text-gray-900 transition-colors duration-300">{tip.title}</h3>
                    </div>
                    <p className="text-gray-600 text-lg leading-relaxed group-hover:text-gray-700 transition-colors duration-300">{tip.description}</p>
                    
                    {/* Bottom accent */}
                    <div className="mt-6">
                      <div className={`h-1 bg-gradient-to-r ${tip.color} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Wellness Tools Section - Enhanced */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-indigo-50/20 to-purple-50/30"></div>
        
        {/* Decorative background */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full opacity-20">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-300 to-indigo-400 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-purple-300 to-pink-400 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-100/80 to-purple-100/80 backdrop-blur-sm rounded-full mb-6 border border-indigo-200/50">
              <Shield className="w-4 h-4 text-indigo-600 mr-2" />
              <span className="text-sm font-medium text-indigo-700">Interactive Tools</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-6 bg-gradient-to-r from-indigo-800 via-purple-700 to-pink-600 bg-clip-text text-transparent">
              Track Your Wellness Journey
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Use our interactive tools to monitor your progress and maintain mindfulness throughout your day.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            <div className="transform hover:scale-105 transition-transform duration-500">
              <WellnessTracker />
            </div>
            <div className="transform hover:scale-105 transition-transform duration-500">
              <MeditationTimer />
            </div>
          </div>
        </div>
      </section>

      {/* Progress Milestones - Enhanced */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-purple-600/10"></div>
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-purple-400/15 to-pink-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
                <Globe className="w-4 h-4 text-blue-300 mr-2" />
                <span className="text-sm font-medium text-blue-200">Recovery Roadmap</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6 text-white">Your Recovery Journey</h2>
              <p className="text-xl text-blue-100">Track your progress through these key milestones on your path to wellness</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { number: "01", title: "Awareness", desc: "Recognize signs of burnout", icon: Brain },
                { number: "02", title: "Assessment", desc: "Understand your current state", icon: LineChart },
                { number: "03", title: "Action", desc: "Implement recovery strategies", icon: Target },
                { number: "04", title: "Growth", desc: "Maintain long-term well-being", icon: Sparkles }
              ].map((milestone, index) => {
                const Icon = milestone.icon;
                return (
                  <div key={index} className="relative group">
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-500 hover:-translate-y-2 h-full">
                      {/* Icon */}
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <div className="text-4xl font-bold text-blue-200 mb-3 font-mono">{milestone.number}</div>
                      <h3 className="text-2xl font-bold mb-3 text-white font-serif">{milestone.title}</h3>
                      <p className="text-blue-100 leading-relaxed">{milestone.desc}</p>
                      
                      {/* Progress indicator */}
                      <div className="mt-6 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full transition-all duration-1000 group-hover:w-full" style={{ width: `${25 * (index + 1)}%` }}></div>
                      </div>
                    </div>
                    
                    {/* Connection line */}
                    {index < 3 && (
                      <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                        <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
                        <ArrowRight className="h-6 w-6 text-blue-300 absolute -top-3 -right-1" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      
      {/* Assessment CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-20 -top-20 rounded-full w-64 h-64 bg-white"></div>
          <div className="absolute -left-20 -bottom-20 rounded-full w-80 h-80 bg-white"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6">
              How Are You Really Feeling?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Take our confidential burnout assessment to understand your current state and get personalized recommendations.
            </p>
            <Link 
              to="/assessment" 
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-full font-medium shadow-lg hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300"
            >
              Take Free Assessment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 text-gray-800">
              Success Stories
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Hear from people who have overcome burnout and rediscovered their passion with Rekindle's help.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
                image={testimonial.image}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/stories" 
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              Read more success stories
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Final CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6 text-gray-800">
              Ready to Rekindle Your Workplace Passion?
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Join thousands who have turned burnout into renewed energy and purpose. Our resources are completely free and accessible to everyone.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/assessment" 
                className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform transition-all duration-300"
              >
                Start Assessment
              </Link>
              
              <Link 
                to="/resources" 
                className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-full font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 transform transition-all duration-300"
              >
                Explore Resources
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;