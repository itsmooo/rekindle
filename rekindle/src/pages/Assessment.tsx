import React from 'react';
import AssessmentTool from '../components/AssessmentTool';
import BurnoutPredictionForm from '../components/BurnoutPredictionForm';
import { ArrowRight, FilePlus, RefreshCw, FileText } from 'lucide-react';

const Assessment: React.FC = () => {
  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold font-serif mb-4 text-gray-800">
            Burnout Assessment
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            This evidence-based assessment will help you understand your current burnout risk level and provide personalized recommendations.
          </p>
        </div>
        
        <div className="mb-12">
          <AssessmentTool />
        </div>

        <div className="mb-12">
          <BurnoutPredictionForm />
        </div>
        
        <div className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold font-serif mb-6 text-gray-800">
            About Our Assessment
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <FilePlus className="h-8 w-8 text-blue-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Science-Based</h3>
              <p className="text-gray-600">
                Developed from validated research on occupational burnout and wellness factors.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <RefreshCw className="h-8 w-8 text-green-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Adaptable</h3>
              <p className="text-gray-600">
                Personalized recommendations based on your specific responses and situation.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <FileText className="h-8 w-8 text-purple-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Confidential</h3>
              <p className="text-gray-600">
                Your assessment results are completely private and not stored on our servers.
              </p>
            </div>
          </div>
          
          <div className="bg-blue-50 p-6 md:p-8 rounded-xl border border-blue-100">
            <h3 className="text-xl font-semibold mb-4 text-blue-800">Important Note</h3>
            <p className="text-blue-700 mb-4">
              This assessment is a screening tool and not a diagnostic instrument. It is designed to help you understand your current burnout risk and provide guidance.
            </p>
            <p className="text-blue-700">
              If you're experiencing severe symptoms or mental health concerns, please consult with a qualified healthcare professional.
            </p>
          </div>
          
          <div className="mt-12 text-center">
            <a 
              href="/resources" 
              className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700"
            >
              Explore our resource library
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;