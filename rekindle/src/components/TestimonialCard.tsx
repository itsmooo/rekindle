import React from 'react';
import { Quote } from 'lucide-react';

type TestimonialCardProps = {
  quote: string;
  author: string;
  role: string;
  image: string;
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  quote, 
  author, 
  role, 
  image 
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 relative h-full flex flex-col">
      <Quote className="absolute text-blue-100 h-16 w-16 -top-6 -left-4" />
      <div className="relative z-10">
        <p className="text-gray-700 italic mb-6 leading-relaxed">{quote}</p>
        
        <div className="flex items-center">
          <img 
            src={image} 
            alt={author} 
            className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-blue-50"
          />
          <div>
            <h4 className="font-semibold text-gray-800">{author}</h4>
            <p className="text-gray-500 text-sm">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;