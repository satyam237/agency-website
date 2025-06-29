import React from 'react';
import { Bot, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4 md:mb-6">
              <Bot className="h-6 w-6 md:h-8 md:w-8 text-white" />
              <span className="text-lg md:text-xl font-bold">AI Agency</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-4 md:mb-6 max-w-md text-sm md:text-base">
              Transforming businesses through intelligent AI automation, custom agents, 
              and cutting-edge solutions that drive growth and efficiency.
            </p>
            <div className="space-y-2 md:space-y-3">
              <div className="flex items-center space-x-3 text-gray-400 text-sm md:text-base">
                <Mail className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                <span>hello@aiagency.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400 text-sm md:text-base">
                <Phone className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400 text-sm md:text-base">
                <MapPin className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-400 text-sm md:text-base mb-6">
              Get the latest insights on AI trends, automation strategies, and industry news.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 md:px-4 md:py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-all duration-200 text-sm md:text-base"
              />
              <button className="bg-gradient-to-r from-gray-700 to-gray-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 group text-sm md:text-base">
                <span>Subscribe</span>
                <ArrowRight className="h-3 w-3 md:h-4 md:w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <div className="text-gray-400 text-xs md:text-sm">
              © 2024 AI Agency. All rights reserved.
            </div>
            <div className="flex space-x-4 md:space-x-6 text-xs md:text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;