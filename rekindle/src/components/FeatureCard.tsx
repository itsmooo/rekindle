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
    blue: {
      bg: 'from-blue-500/10 to-blue-600/20',
      icon: 'from-blue-500 to-blue-600',
      border: 'border-blue-200/50',
      glow: 'shadow-blue-500/20',
      hover: 'hover:shadow-blue-500/30',
    },
    green: {
      bg: 'from-green-500/10 to-green-600/20',
      icon: 'from-green-500 to-green-600',
      border: 'border-green-200/50',
      glow: 'shadow-green-500/20',
      hover: 'hover:shadow-green-500/30',
    },
    yellow: {
      bg: 'from-yellow-500/10 to-yellow-600/20',
      icon: 'from-yellow-500 to-yellow-600',
      border: 'border-yellow-200/50',
      glow: 'shadow-yellow-500/20',
      hover: 'hover:shadow-yellow-500/30',
    },
    purple: {
      bg: 'from-purple-500/10 to-purple-600/20',
      icon: 'from-purple-500 to-purple-600',
      border: 'border-purple-200/50',
      glow: 'shadow-purple-500/20',
      hover: 'hover:shadow-purple-500/30',
    },
  };

  const currentColor = colorClasses[color as keyof typeof colorClasses];

  return (
    <div 
      className={`group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border ${currentColor.border} shadow-2xl ${currentColor.glow} ${currentColor.hover} hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 h-full overflow-hidden`}
      style={{ 
        animationDelay: `${delay}ms`,
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Background gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${currentColor.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>
      
      {/* Floating background elements */}
      <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-white/20 to-white/10 rounded-full blur-sm opacity-60 group-hover:scale-125 transition-transform duration-500"></div>
      <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-white/15 to-white/5 rounded-full blur-sm opacity-40 group-hover:scale-110 transition-transform duration-500"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Icon container with enhanced styling */}
        <div className="relative mb-6">
          <div className={`w-16 h-16 bg-gradient-to-r ${currentColor.icon} rounded-2xl flex items-center justify-center shadow-2xl ${currentColor.glow} group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative overflow-hidden`}>
            {/* Icon glow effect */}
            <div className="absolute inset-0 bg-white/20 rounded-2xl blur-sm scale-75 group-hover:scale-90 transition-transform duration-500"></div>
            <Icon className="h-8 w-8 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" />
          </div>
          
          {/* Floating sparkle effect */}
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300"></div>
        </div>
        
        {/* Title with enhanced typography */}
        <h3 className="text-2xl font-bold mb-4 font-serif text-gray-800 group-hover:text-gray-900 transition-colors duration-300 leading-tight">
          {title}
        </h3>
        
        {/* Description with better spacing */}
        <p className="text-gray-600 leading-relaxed text-lg group-hover:text-gray-700 transition-colors duration-300 mb-6">
          {description}
        </p>
        
        {/* Interactive bottom accent */}
        <div className="relative">
          <div className={`h-1 bg-gradient-to-r ${currentColor.icon} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left shadow-lg`}></div>
          <div className="absolute inset-0 bg-white/40 h-1 rounded-full blur-sm transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        </div>
      </div>

      {/* Hover effect border */}
      <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/30 transition-all duration-500"></div>
      
      {/* Inner glow effect */}
      <div className="absolute inset-1 rounded-3xl border border-white/10 group-hover:border-white/20 transition-all duration-500"></div>
    </div>
  );
};

export default FeatureCard;