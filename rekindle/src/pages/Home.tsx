import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import TestimonialCard from '../components/TestimonialCard';
import WellnessTracker from '../components/WellnessTracker';
import MeditationTimer from '../components/MeditationTimer';
import { Brain, Battery, LineChart, Users, ArrowRight, BookOpen, Target, Coffee, CheckCircle } from 'lucide-react';

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
      description: "Follow the 52/17 rule: 52 minutes of focused work followed by 17 minutes of rest."
    },
    {
      icon: Target,
      title: "Set Clear Boundaries",
      description: "Establish work hours and stick to them. Learn to say no to additional commitments."
    },
    {
      icon: BookOpen,
      title: "Practice Mindfulness",
      description: "Incorporate short meditation sessions throughout your day to stay centered."
    }
  ];

  return (
    <div>
      <Hero />
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 text-gray-800">
              Your Path to Workplace Wellness
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Burnout doesn't happen overnight, and recovery is a journey. We provide the tools, resources, and support you need every step of the way.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

      {/* Quick Tips Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold font-serif mb-4 text-gray-800">
              Quick Wellness Tips
            </h2>
            <p className="text-gray-600">
              Simple strategies you can implement today to start improving your well-being.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {quickTips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 rounded-full p-3 mr-4">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">{tip.title}</h3>
                  </div>
                  <p className="text-gray-600">{tip.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Wellness Tools Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 text-gray-800">
              Track Your Wellness Journey
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Use our interactive tools to monitor your progress and maintain mindfulness throughout your day.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <WellnessTracker />
            <MeditationTimer />
          </div>
        </div>
      </section>

      {/* Progress Milestones */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-serif mb-4">Your Recovery Journey</h2>
              <p className="text-blue-100">Track your progress through these key milestones</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { number: "01", title: "Awareness", desc: "Recognize signs of burnout" },
                { number: "02", title: "Assessment", desc: "Understand your current state" },
                { number: "03", title: "Action", desc: "Implement recovery strategies" },
                { number: "04", title: "Growth", desc: "Maintain long-term well-being" }
              ].map((milestone, index) => (
                <div key={index} className="relative">
                  <div className="bg-white/10 rounded-lg p-6">
                    <div className="text-3xl font-bold text-blue-200 mb-2">{milestone.number}</div>
                    <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                    <p className="text-blue-100">{milestone.desc}</p>
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                      <ArrowRight className="h-6 w-6 text-blue-300" />
                    </div>
                  )}
                </div>
              ))}
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