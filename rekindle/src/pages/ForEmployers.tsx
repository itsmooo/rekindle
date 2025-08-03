import React, { useState } from 'react';
import { ArrowRight, Building, Users, LineChart, Award, CheckCircle, AlertTriangle } from 'lucide-react';

const ForEmployers: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    companySize: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      console.log('Submitting consultation data:', formData);
      const response = await fetch('http://localhost:8000/api/consultation/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);
      const responseData = await response.json();
      console.log('Response data:', responseData);

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          companySize: '',
          message: ''
        });
      } else {
        console.error('Error response:', responseData);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting consultation:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold font-serif mb-6 text-gray-800">
            Create a Thriving Workplace Culture
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Empower your organization with tools and strategies to prevent burnout, boost engagement, and foster team well-being.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#solutions" 
              className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform transition-all duration-300"
            >
              Explore Solutions
            </a>
            <a 
              href="#contact" 
              className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-full font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 transform transition-all duration-300"
            >
              Schedule Consultation
            </a>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold font-serif text-gray-800">
                The Cost of Burnout
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">$1k</div>
                <p className="text-gray-600">Annual healthcare costs attributed to workplace stress</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">400</div>
                <p className="text-gray-600">Workdays lost annually due to stress and burnout</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">20%</div>
                <p className="text-gray-600">Average turnover rate in high-burnout organizations</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Benefits Section */}
        <div className="max-w-4xl mx-auto mb-20" id="benefits">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-serif mb-4 text-gray-800">
              Benefits of Addressing Burnout
            </h2>
            <p className="text-lg text-gray-600">
              Investing in employee wellbeing yields significant returns.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex">
              <div className="mr-4">
                <div className="bg-green-100 rounded-full p-3 text-green-600">
                  <LineChart className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Increased Productivity</h3>
                <p className="text-gray-600">
                  Companies with wellness programs see a 15-20% increase in overall productivity and output quality.
                </p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex">
              <div className="mr-4">
                <div className="bg-blue-100 rounded-full p-3 text-blue-600">
                  <Users className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Reduced Turnover</h3>
                <p className="text-gray-600">
                  Organizations that prioritize wellbeing experience 35% lower turnover and higher retention rates.
                </p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex">
              <div className="mr-4">
                <div className="bg-yellow-100 rounded-full p-3 text-yellow-600">
                  <Building className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Enhanced Culture</h3>
                <p className="text-gray-600">
                  Improved team cohesion, collaboration, and a positive workplace atmosphere that attracts top talent.
                </p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex">
              <div className="mr-4">
                <div className="bg-purple-100 rounded-full p-3 text-purple-600">
                  <Award className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Company Reputation</h3>
                <p className="text-gray-600">
                  Stand out as an employer of choice with a visible commitment to employee wellbeing.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Solutions Section */}
        <div className="max-w-5xl mx-auto mb-20" id="solutions">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-serif mb-4 text-gray-800">
              Our Organizational Solutions
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive programs tailored to your organization's specific needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 flex flex-col h-full">
              <div className="h-3 bg-blue-500"></div>
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Assessment</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Organization-wide burnout assessment</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Cultural and structural analysis</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Risk identification dashboard</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Comprehensive recommendations report</span>
                  </li>
                </ul>
                <a 
                  href="#contact" 
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mt-auto"
                >
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 flex flex-col h-full">
              <div className="h-3 bg-green-500"></div>
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Training</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Manager workshops on burnout prevention</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Team resilience building sessions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Work-life balance strategy workshops</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Customized wellness education programs</span>
                  </li>
                </ul>
                <a 
                  href="#contact" 
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mt-auto"
                >
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 flex flex-col h-full">
              <div className="h-3 bg-purple-500"></div>
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Implementation</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Policy development and consultation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Wellness program implementation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Ongoing support and resource access</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Progress tracking and program refinement</span>
                  </li>
                </ul>
                <a 
                  href="#contact" 
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mt-auto"
                >
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Testimonial Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 md:p-12 border border-blue-200 relative">
            <div className="text-4xl text-blue-200 absolute top-6 left-8">"</div>
            <div className="relative z-10">
              <p className="text-lg md:text-xl text-blue-800 italic mb-6 md:pl-6">
                Working with Rekindle transformed our company culture. Employee satisfaction scores increased by 38%, and our turnover rate dropped from 26% to just 8% in one year. The ROI on this program has been exceptional.
              </p>
              
              <div className="md:pl-6">
                <div className="font-semibold text-blue-900">Jennifer Richards</div>
                <div className="text-blue-700">Chief People Officer, Elevate Tech</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact Section */}
        <div className="max-w-4xl mx-auto" id="contact">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold font-serif mb-4 text-gray-800">
                Schedule a Consultation
              </h2>
              <p className="text-lg text-gray-600">
                Get in touch with our team to discuss how we can help your organization thrive.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="John Smith"
                />
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Acme Inc."
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Work Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="john@company.com"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="(555) 123-4567"
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="companySize" className="block text-sm font-medium text-gray-700 mb-1">
                  Company Size
                </label>
                <select
                  id="companySize"
                  name="companySize"
                  value={formData.companySize}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select company size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="501+">501+ employees</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  How can we help?
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tell us about your organization's needs..."
                ></textarea>
              </div>
              
              {submitStatus === 'success' && (
                <div className="md:col-span-2">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-green-800 font-medium">
                          Thank you! Your consultation request has been submitted successfully.
                        </p>
                        <p className="text-green-700 text-sm mt-1">
                          We'll review your request and get back to you within 24-48 hours. You can also check your email for a confirmation.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="md:col-span-2">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <AlertTriangle className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-red-800 font-medium">
                          There was an error submitting your request.
                        </p>
                        <p className="text-red-700 text-sm mt-1">
                          Please check your internet connection and try again. If the problem persists, please contact us directly.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white rounded-lg py-3 px-4 hover:bg-blue-700 transition-colors shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    'Request Consultation'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForEmployers;