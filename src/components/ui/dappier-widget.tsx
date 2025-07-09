"use client";

import React, { useEffect, useState } from 'react';
import { MessageCircle, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'dappier-ask-ai-widget': {
        widgetId: string;
        apiKey?: string;
      };
    }
  }
}

export const DappierWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if the Dappier widget is loaded
    const checkWidget = () => {
      if (typeof window !== 'undefined' && (window as any).DappierWidget) {
        setIsLoaded(true);
      } else {
        setTimeout(checkWidget, 100);
      }
    };
    
    checkWidget();
  }, []);

  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          delay: 1,
          type: "spring",
          stiffness: 260,
          damping: 20 
        }}
      >
        <motion.button
          onClick={toggleWidget}
          className="group relative bg-gradient-to-r from-gray-800 to-gray-600 hover:from-gray-700 hover:to-gray-500 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-5 w-5" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center space-x-2"
              >
                <MessageCircle className="h-5 w-5" />
                <span className="hidden sm:inline text-sm font-medium">Ask AI</span>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Sparkle effect */}
          <motion.div
            className="absolute -top-1 -right-1"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360] 
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          >
            <Sparkles className="h-3 w-3 text-yellow-400" />
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex items-end justify-center sm:items-center sm:justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleWidget}
            />
            
            {/* Modal Content */}
            <motion.div
              className="relative w-full max-w-2xl h-[80vh] sm:h-[600px] bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
              initial={{ 
                y: "100%",
                scale: 0.9,
                opacity: 0 
              }}
              animate={{ 
                y: 0,
                scale: 1,
                opacity: 1 
              }}
              exit={{ 
                y: "100%",
                scale: 0.9,
                opacity: 0 
              }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30 
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-gray-800 to-gray-600 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">AI Assistant</h3>
                    <p className="text-sm text-gray-600">Ask me anything about our services</p>
                  </div>
                </div>
                <button
                  onClick={toggleWidget}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  aria-label="Close AI Assistant"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              {/* Widget Container */}
              <div className="flex-1 h-full">
                {isLoaded ? (
                  <div 
                    id="dappier-ask-ai-widget" 
                    className="w-full h-full"
                    style={{ minHeight: '500px' }}
                  >
                    <dappier-ask-ai-widget 
                      widgetId="wd_01jw8xz7ztf4zr22e2whnsxp7s"
                      apiKey="ak_01jzqvez0qffdr5e40k5x0h2mm"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <motion.div
                        className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full mx-auto mb-4"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <p className="text-gray-600">Loading AI Assistant...</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};