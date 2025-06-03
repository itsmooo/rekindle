import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  delay?: number;
};

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  color,
  delay = 0 
}) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 shadow-blue-100',
    green: 'bg-green-50 text-green-600 shadow-green-100',
    yellow: 'bg-yellow-50 text-yellow-600 shadow-yellow-100',
    purple: 'bg-purple-50 text-purple-600 shadow-purple-100',
  };
  
  const borderColors = {
    blue: 'border-blue-100',
    green: 'border-green-100',
    yellow: 'border-yellow-100',
    purple: 'border-purple-100',
  };

  return (
    <div 
      className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 h-full"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`rounded-xl p-3 w-12 h-12 flex items-center justify-center mb-5 ${colorClasses[color as keyof typeof colorClasses]} shadow-lg`}>
        <Icon className="h-6 w-6" />
      </div>
      
      <h3 className="text-xl font-semibold mb-3 font-serif text-gray-800">
        {title}
      </h3>
      
      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>
      
      <div className={`mt-6 w-0 group-hover:w-full h-1 rounded ${borderColors[color as keyof typeof borderColors]} transition-all duration-300`}></div>
    </div>
  );
};

export default FeatureCard;