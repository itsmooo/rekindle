import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Quote, ArrowRight } from 'lucide-react';

type Story = {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  shortQuote: string;
  fullStory: string;
  tags: string[];
};

const stories: Story[] = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "Software Engineer",
    company: "Tech Innovations Inc.",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    shortQuote: "I went from dreading my workday to rediscovering my passion for coding.",
    fullStory: "Two years into my role as a lead developer, I hit a wall. The constant pressure to deliver, late-night deployments, and endless meetings left me completely drained. I would sit at my computer, unable to write a single line of code without feeling overwhelming anxiety.\n\nI didn't recognize the symptoms of burnout until I took Rekindle's assessment. The personalized recovery plan helped me implement boundaries around work hours and redefine success on my own terms. My manager was surprisingly supportive when I shared my struggles.\n\nGradually, I rebuilt my relationship with work. I started a daily meditation practice, limited my meeting hours, and focused on projects that leveraged my strengths. Six months later, I'm coding with enthusiasm again and have even started mentoring junior developers – something I never had energy for before.",
    tags: ["Tech Industry", "Work Boundaries", "Recovery"]
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "Global Brands",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    shortQuote: "Setting boundaries saved my career and my health.",
    fullStory: "As a marketing director for a fast-growing company, I wore my 70-hour workweeks like a badge of honor. When my team doubled in size, so did my responsibilities, but I kept pushing myself harder. I started experiencing chronic headaches, insomnia, and would find myself crying in my car before walking into the office.\n\nA colleague recommended Rekindle's resources. What resonated most was learning that saying 'no' wasn't a failure but a necessary part of sustainable success. I worked with a coach to prioritize my responsibilities and delegate effectively.\n\nThe most significant change was establishing clear communication channels with my team and setting appropriate response time expectations. We implemented 'focus days' where meetings are prohibited, allowing deep work. My productivity actually increased while working fewer hours, and my team reports higher satisfaction. Most importantly, I no longer feel defined solely by my work achievements.",
    tags: ["Leadership", "Work-Life Balance", "Delegation"]
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "CEO",
    company: "Innovative Solutions",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    shortQuote: "Addressing burnout organization-wide transformed our company culture.",
    fullStory: "As the CEO of a rapidly growing startup, I was alarmed when our employee turnover rate hit 40% in one year. Exit interviews revealed a consistent pattern: burnout was driving our best talent away. The financial cost was enormous, but the impact on morale was even worse.\n\nI partnered with Rekindle to implement a company-wide wellbeing initiative. We started with anonymous assessments to identify the most pressing issues. The results were eye-opening – our culture of 'always on' communication and unclear priorities were the biggest contributors to stress.\n\nWe restructured our workflows, implemented 'no-meeting Wednesdays,' and trained managers to recognize early signs of burnout. We also created clearer career progression frameworks so employees could see their future at the company.\n\nWithin 18 months, our turnover rate dropped to 15%, and employee satisfaction scores increased by 40%. The most surprising outcome was the positive impact on our bottom line – productivity and innovation actually improved when people weren't exhausted and disengaged.",
    tags: ["Leadership", "Organizational Change", "Culture"]
  },
  {
    id: 4,
    name: "Emily Taylor",
    role: "Nurse Practitioner",
    company: "Central Hospital",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    shortQuote: "I learned that caring for myself enables me to better care for my patients.",
    fullStory: "After ten years in emergency medicine during a global health crisis, I was emotionally exhausted. I still loved helping patients, but I couldn't shake the feeling of numbness and detachment. My colleagues were experiencing the same, but in healthcare, burnout is often normalized as just 'part of the job.'\n\nThrough Rekindle's healthcare-specific resources, I gained permission to prioritize my own wellbeing. I joined a peer support group specifically for healthcare workers and learned practical tools for processing difficult patient outcomes.\n\nThe most important change was establishing rituals to separate work from home life. I now have a specific routine at the end of each shift to mentally 'clock out,' and I've become vigilant about taking my allotted vacation days to fully disconnect.\n\nWhile the healthcare system still has structural challenges, I've found a sustainable way to practice. I'm present with my patients again and have rediscovered the compassion that drew me to nursing in the first place.",
    tags: ["Healthcare", "Emotional Wellbeing", "Self-Care"]
  }
];

const Stories: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  const toggleExpand = (id: number) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };
  
  const allTags = Array.from(new Set(stories.flatMap(story => story.tags)));
  
  const filteredStories = selectedTag 
    ? stories.filter(story => story.tags.includes(selectedTag))
    : stories;

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold font-serif mb-4 text-gray-800">
            Recovery Stories
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Real stories from real people who have overcome burnout and reconnected with their passion.
          </p>
        </div>
        
        {/* Tag Filters */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-2 rounded-full text-sm ${
                selectedTag === null
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } transition-colors`}
            >
              All Stories
            </button>
            
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full text-sm ${
                  selectedTag === tag
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } transition-colors`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        
        {/* Stories */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {filteredStories.map(story => (
              <div 
                key={story.id} 
                className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start">
                    <img 
                      src={story.image} 
                      alt={story.name} 
                      className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-blue-50"
                    />
                    <div className="flex-grow">
                      <h3 className="text-xl font-semibold text-gray-800">{story.name}</h3>
                      <p className="text-gray-600">{story.role} at {story.company}</p>
                      
                      <div className="flex flex-wrap gap-2 mt-2">
                        {story.tags.map(tag => (
                          <span 
                            key={tag} 
                            className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 relative">
                    <Quote className="absolute text-blue-100 h-8 w-8 -left-1 -top-1" />
                    <p className="italic text-gray-700 pl-6 font-medium">
                      "{story.shortQuote}"
                    </p>
                  </div>
                  
                  {expandedId === story.id && (
                    <div className="mt-6 text-gray-700 leading-relaxed">
                      {story.fullStory.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="mb-4">{paragraph}</p>
                      ))}
                    </div>
                  )}
                  
                  <button
                    onClick={() => toggleExpand(story.id)}
                    className="mt-4 flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  >
                    {expandedId === story.id ? (
                      <>
                        <span>Read less</span>
                        <ChevronUp className="ml-1 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        <span>Read full story</span>
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Share Your Story CTA */}
          <div className="mt-16 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-8 border border-blue-100 text-center">
            <h3 className="text-2xl font-bold font-serif mb-4 text-gray-800">
              Share Your Story
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Has Rekindle helped you overcome burnout? Your journey could inspire others facing similar challenges. We'd love to feature your experience.
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full font-medium shadow-md hover:bg-blue-700 transition-colors"
            >
              Submit Your Story
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stories;