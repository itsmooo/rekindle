import React, { useState } from 'react';
import { Search, BookOpen, VideoIcon, FileText, Coffee, ArrowRight } from 'lucide-react';

type Resource = {
  id: number;
  title: string;
  description: string;
  category: string;
  type: string;
  image: string;
  link: string;
};

const resources: Resource[] = [
  {
    id: 1,
    title: "Understanding the 5 Stages of Burnout",
    description: "Learn to identify the progression of burnout from enthusiasm to complete exhaustion.",
    category: "Understanding",
    type: "Article",
    image: "https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    link: "#"
  },
  {
    id: 2,
    title: "Workplace Boundaries Workshop",
    description: "A guided video workshop on setting healthy boundaries at work.",
    category: "Prevention",
    type: "Video",
    image: "https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    link: "#"
  },
  {
    id: 3,
    title: "The Science of Stress and Recovery",
    description: "Scientific explanation of how stress affects your body and mind, and evidence-based recovery techniques.",
    category: "Recovery",
    type: "Guide",
    image: "https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    link: "#"
  },
  {
    id: 4,
    title: "Daily Mindfulness Practices",
    description: "Simple 5-minute mindfulness exercises you can incorporate into your daily routine.",
    category: "Self-care",
    type: "Guide",
    image: "https://images.pexels.com/photos/268134/pexels-photo-268134.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    link: "#"
  },
  {
    id: 5,
    title: "Recognizing Burnout in Your Team",
    description: "For managers: Learn to identify signs of burnout in your team members before it becomes severe.",
    category: "Understanding",
    type: "Article",
    image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    link: "#"
  },
  {
    id: 6,
    title: "The Burnout Recovery Roadmap",
    description: "A comprehensive guide to navigating your way back from burnout to engagement.",
    category: "Recovery",
    type: "Guide",
    image: "https://images.pexels.com/photos/7112/woman-typing-writing-windows.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    link: "#"
  }
];

const Resources: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  
  const categories = [...new Set(resources.map(resource => resource.category))];
  const types = [...new Set(resources.map(resource => resource.type))];
  
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory ? resource.category === selectedCategory : true;
    const matchesType = selectedType ? resource.type === selectedType : true;
    
    return matchesSearch && matchesCategory && matchesType;
  });
  
  const iconMap: Record<string, React.ReactNode> = {
    'Article': <BookOpen className="h-5 w-5" />,
    'Video': <VideoIcon className="h-5 w-5" />,
    'Guide': <FileText className="h-5 w-5" />,
  };

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold font-serif mb-4 text-gray-800">
            Resource Library
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Explore our collection of expert-created resources to help you understand, prevent, and recover from burnout.
          </p>
        </div>
        
        {/* Search and Filters */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search resources..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <select
                  className="py-2 px-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  value={selectedCategory || ''}
                  onChange={(e) => setSelectedCategory(e.target.value || null)}
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                
                <select
                  className="py-2 px-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  value={selectedType || ''}
                  onChange={(e) => setSelectedType(e.target.value || null)}
                >
                  <option value="">All Types</option>
                  {types.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Resources Grid */}
        <div className="max-w-5xl mx-auto">
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResources.map(resource => (
                <div key={resource.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-gray-100 flex flex-col h-full">
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={resource.image} 
                      alt={resource.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  
                  <div className="p-6 flex-grow">
                    <div className="flex justify-between items-center mb-3">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                        {resource.category}
                      </span>
                      <div className="flex items-center text-gray-500 text-sm">
                        {iconMap[resource.type]}
                        <span className="ml-1">{resource.type}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">{resource.title}</h3>
                    <p className="text-gray-600 mb-4">{resource.description}</p>
                    
                    <a 
                      href={resource.link} 
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mt-auto"
                    >
                      Read more
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Coffee className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No resources found</h3>
              <p className="text-gray-500">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          )}
        </div>
        
        {/* Newsletter */}
        <div className="max-w-3xl mx-auto mt-20 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-blue-100">
          <div className="text-center">
            <h2 className="text-2xl font-bold font-serif mb-4 text-gray-800">
              Get New Resources in Your Inbox
            </h2>
            <p className="text-gray-600 mb-6">
              Subscribe to our newsletter for the latest articles, guides, and tools to help you maintain workplace wellness.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
              <button 
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              >
                Subscribe
              </button>
            </div>
            
            <p className="text-xs text-gray-500 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;