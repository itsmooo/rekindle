import React from 'react';
import { Mail, Phone, MapPin, MessageSquare, Clock, CalendarCheck } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold font-serif mb-4 text-gray-800">
            Get In Touch
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Have questions or need support? Our team is here to help you on your journey to workplace wellness.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
          {/* Contact Form */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-bold font-serif mb-6 text-gray-800">
              Send Us a Message
            </h2>
            
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John Smith"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="How can we help you?"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tell us how we can assist you..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white rounded-lg py-3 px-4 hover:bg-blue-700 transition-colors shadow-md"
              >
                Send Message
              </button>
            </form>
          </div>
          
          {/* Contact Info */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-lg p-8 border border-blue-300 mb-6 flex-grow">
              <h2 className="text-2xl font-bold font-serif mb-6">
                Contact Information
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="h-6 w-6 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <p>support@rekindle.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-6 w-6 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium mb-1">Phone</h3>
                    <p>+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium mb-1">Office</h3>
                    <p>123 Wellness Street, Suite 101<br />San Francisco, CA 94107</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-6 w-6 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium mb-1">Hours</h3>
                    <p>Monday - Friday: 9AM - 5PM<br />Saturday - Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                <CalendarCheck className="h-6 w-6 text-blue-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-800">Schedule a Call</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Prefer to speak directly with one of our wellness consultants? Book a 30-minute consultation.
              </p>
              <a 
                href="#" 
                className="inline-block w-full py-2 px-4 bg-blue-100 text-blue-700 rounded-lg text-center hover:bg-blue-200 transition-colors font-medium"
              >
                Book Appointment
              </a>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold font-serif mb-8 text-center text-gray-800">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Is Rekindle a medical or therapy service?</h3>
              <p className="text-gray-600">
                No, Rekindle is an educational resource and support platform. While our content is research-based, we are not a substitute for professional medical or mental health care. We always recommend consulting healthcare providers for medical concerns.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Are your assessments confidential?</h3>
              <p className="text-gray-600">
                Yes, all individual assessments are completely confidential. Your personal data is not stored on our servers. For organizational assessments, we provide anonymized aggregate data to employers.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Do you offer custom solutions for organizations?</h3>
              <p className="text-gray-600">
                Yes, we offer tailored programs for organizations of all sizes. From assessments to training workshops and policy development, we can customize our approach to your specific needs. Contact us for a consultation.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">How soon can I expect a response to my inquiry?</h3>
              <p className="text-gray-600">
                We typically respond to all inquiries within 1-2 business days. For urgent matters, please call our office directly for immediate assistance during business hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;