import React from 'react';
import AssessmentTool from '../components/AssessmentTool';
import BurnoutPredictionForm from '../components/BurnoutPredictionForm';
import { ArrowRight, Brain, Shield, Clock, Users, Target, Zap } from 'lucide-react';

const Assessment: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-indigo-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-violet-400/8 to-blue-500/8 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-gradient-to-r from-cyan-300/8 to-blue-400/8 rounded-full blur-2xl"></div>
      </div>

      <div className="relative pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Header Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg shadow-blue-500/25 mb-6">
              <Brain className="w-8 h-8 text-white" />
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 mb-6">
              Burnout <span className="text-blue-600">Assessment</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
              Take our evidence-based assessment to understand your burnout risk level and receive personalized recommendations for recovery.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-blue-500" />
                <span className="text-gray-600 font-medium">5-10 minutes</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-500" />
                <span className="text-gray-600 font-medium">100% Confidential</span>
              </div>
              {/* <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-purple-500" />
                <span className="text-gray-600 font-medium">10k+ Completed</span>
              </div> */}
            </div>
          </div>
          
          {/* Assessment Tools */}
          <div className="space-y-16">
            {/* Main Assessment */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-3xl blur-xl"></div>
              <div className="relative">
                <AssessmentTool />
              </div>
            </div>

            {/* Burnout Prediction Form */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-50/50 to-purple-50/50 rounded-3xl blur-xl"></div>
              <div className="relative">
                <BurnoutPredictionForm />
              </div>
            </div>
          </div>
        
          {/* About Section */}
          <div className="max-w-6xl mx-auto mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Our Assessment Works
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our comprehensive approach combines validated research with personalized insights to give you actionable results.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="group relative bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-white/20 hover:shadow-lg transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-sm mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Science-Based</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Built on validated research from occupational psychology and burnout studies, ensuring accurate and reliable results.
                  </p>
                </div>
              </div>
              
              <div className="group relative bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-white/20 hover:shadow-lg transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-sm mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Personalized</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Tailored recommendations based on your unique responses, work situation, and personal circumstances.
                  </p>
                </div>
              </div>
              
              <div className="group relative bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-white/20 hover:shadow-lg transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-violet-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl shadow-sm mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Confidential</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Your responses are completely private and secure. We never store or share your personal assessment data.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Important Note */}
            <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50 p-8 md:p-10 rounded-2xl border border-blue-100/50 shadow-sm">
              <div className="absolute top-4 left-4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="absolute top-6 left-6 w-1 h-1 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Brain className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-blue-900">Important Disclaimer</h3>
                  <p className="text-blue-800 mb-4 leading-relaxed">
                    This assessment is a screening tool designed to help you understand your burnout risk and provide guidance. It is not a diagnostic instrument and should not replace professional medical advice.
                  </p>
                  <p className="text-blue-700 leading-relaxed">
                    If you're experiencing severe symptoms or mental health concerns, please consult with a qualified healthcare professional or mental health provider.
                  </p>
                </div>
              </div>
            </div>
            
            {/* CTA Section */}
            <div className="text-center mt-16">
              <div className="inline-flex items-center justify-center space-x-8">
                <a 
                  href="/resources" 
                  className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 transition-all duration-300 hover:scale-105"
                >
                  Explore Recovery Resources
                  <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-200" />
                </a>
              </div>
              
              <p className="text-gray-500 mt-4 text-sm">
                Access our comprehensive library of burnout recovery tools and strategies
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;