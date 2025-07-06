import React from 'react';
import { Bot, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { ScrollReveal } from './ui/scroll-reveal';

const Footer = () => {
  const handleLegalPageClick = (page: string) => {
    // For now, we'll use window.open to open in a new tab
    // In a real application, you'd use React Router or similar
    const baseUrl = window.location.origin;
    window.open(`${baseUrl}/${page}`, '_blank');
  };

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
            <ScrollReveal
              baseOpacity={0.4}
              enableBlur={true}
              baseRotation={0.5}
              blurStrength={1}
              rotationEnd="center center"
              wordAnimationEnd="center center"
              textClassName="text-gray-400 leading-relaxed mb-4 md:mb-6 max-w-md text-sm md:text-base"
            >
              Transforming businesses through intelligent AI automation, custom agents, 
              and cutting-edge solutions that drive growth and efficiency.
            </ScrollReveal>
            <div className="space-y-2 md:space-y-3">
              <div className="flex items-center space-x-3 text-gray-400 text-sm md:text-base">
                <Mail className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                <a href="mailto:team@brightlabs.in" className="hover:text-white transition-colors">
                  team@brightlabs.in
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-400 text-sm md:text-base">
                <Phone className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                <a href="tel:+15551234567" className="hover:text-white transition-colors">
                  +1 (555) 123-4567
                </a>
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
            <ScrollReveal
              baseOpacity={0.4}
              enableBlur={true}
              baseRotation={0.5}
              blurStrength={1}
              rotationEnd="center center"
              wordAnimationEnd="center center"
              textClassName="text-gray-400 text-sm md:text-base mb-6"
            >
              Get the latest insights on AI trends, automation strategies, and industry news.
            </ScrollReveal>
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
              © 2025 AI Agency. All rights reserved.
            </div>
            <div className="flex space-x-4 md:space-x-6 text-xs md:text-sm">
              <button 
                onClick={() => handleLegalPageClick('privacy-policy')}
                className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => handleLegalPageClick('terms-of-service')}
                className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                Terms of Service
              </button>
              <button 
                onClick={() => handleLegalPageClick('cookie-policy')}
                className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;