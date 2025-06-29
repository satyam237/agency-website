import React, { useEffect, useState } from 'react';
import { ArrowRight, Sparkles, Zap, Bot } from 'lucide-react';
import { AnimatedText } from './ui/animated-underline-text-one';
import { GradientText } from './ui/gradient-text';
import { AuroraBackground } from './ui/aurora-background';
import { motion } from 'framer-motion';

const Hero = () => {
  const [animatedStats, setAnimatedStats] = useState({
    automations: 0,
    satisfaction: 0,
    uptime: 0
  });

  const targetStats = {
    automations: 3,
    satisfaction: 98,
    uptime: 24
  };

  useEffect(() => {
    const animateStats = () => {
      const duration = 2000; // 2 seconds
      const steps = 60; // 60 steps for smooth animation
      const stepDuration = duration / steps;

      let currentStep = 0;

      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        setAnimatedStats({
          automations: Math.round(targetStats.automations * easeOutQuart),
          satisfaction: Math.round(targetStats.satisfaction * easeOutQuart),
          uptime: Math.round(targetStats.uptime * easeOutQuart)
        });

        if (currentStep >= steps) {
          clearInterval(interval);
          // Ensure final values are exact
          setAnimatedStats(targetStats);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    };

    // Start animation after a short delay
    const timeout = setTimeout(animateStats, 500);
    return () => clearTimeout(timeout);
  }, []);

  const handleGetStarted = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const headerHeight = 80;
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleViewWork = () => {
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      const headerHeight = 80;
      const elementPosition = portfolioSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="relative overflow-hidden">
      {/* Aurora Background with Hero Content */}
      <AuroraBackground className="relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <div className="space-y-6 md:space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-3 md:px-5 md:py-3 shadow-sm">
              <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-gray-600" />
              <span className="text-sm md:text-base font-medium text-gray-700">AI-Powered Solutions</span>
            </div>

            {/* Main Heading with Gradient AI Text */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight">
              <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 bg-clip-text text-transparent">
                Transform Your Business
              </span>
              <br />
              <span className="bg-gradient-to-r from-gray-600 via-gray-500 to-gray-400 bg-clip-text text-transparent">
                with{' '}
              </span>
              <GradientText 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black"
                duration={4}
              >
                AI
              </GradientText>
              {' '}
              <AnimatedText 
                text="Automation"
                textClassName="bg-gradient-to-r from-gray-600 via-gray-500 to-gray-400 bg-clip-text text-transparent text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black"
                underlineClassName="text-gray-400"
                underlinePath="M 0,10 Q 100,0 200,10 Q 300,20 400,10"
                underlineHoverPath="M 0,10 Q 100,20 200,10 Q 300,0 400,10"
                underlineDuration={2}
                className="inline-block"
              />
            </h1>

            {/* Subtitle - Increased font size */}
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
              We build intelligent AI agents, automate complex workflows, and create cutting-edge websites 
              that drive growth and efficiency for forward-thinking businesses.
            </p>

            {/* CTA Buttons - Reduced sizes */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 md:space-x-8 pt-6 md:pt-8 px-4">
              <button 
                onClick={handleGetStarted}
                className="group bg-gradient-to-r from-gray-900 to-gray-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold text-base md:text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 w-full sm:w-auto justify-center"
              >
                <span>Start Your AI Journey</span>
                <ArrowRight className="h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={handleViewWork}
                className="group relative bg-white/90 backdrop-blur-sm border-2 border-gray-300 text-gray-700 px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold text-base md:text-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 w-full sm:w-auto justify-center shadow-lg hover:shadow-xl"
              >
                <span>View Our Work</span>
                <Zap className="h-4 w-4 md:h-5 md:w-5 group-hover:rotate-12 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      </AuroraBackground>

      {/* Stats Section */}
      <div className="stats-section w-full bg-gradient-to-r from-gray-100/50 via-gray-50 to-gray-100/50 backdrop-blur-sm border-t border-gray-200/50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                {animatedStats.automations < 10 ? `0${animatedStats.automations}` : animatedStats.automations}+
              </div>
              <div className="text-lg md:text-xl lg:text-2xl text-gray-600 font-semibold">AI Automations Deployed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                {animatedStats.satisfaction}%
              </div>
              <div className="text-lg md:text-xl lg:text-2xl text-gray-600 font-semibold">Client Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                {animatedStats.uptime}/7
              </div>
              <div className="text-lg md:text-xl lg:text-2xl text-gray-600 font-semibold">AI Agent Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;