"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Calendar, Mail, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MeetingConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  meetingDate: Date;
  email: string;
  autoCloseDelay?: number;
}

export function MeetingConfirmationModal({
  isOpen,
  onClose,
  meetingDate,
  email,
  autoCloseDelay = 3000
}: MeetingConfirmationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showCheckmark, setShowCheckmark] = useState(false);

  const triggerFullScreenConfetti = () => {
    // Multi-colored confetti overlaying the entire screen
    const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#f97316'];
    
    // First burst from center
    confetti({
      particleCount: 200,
      spread: 70,
      origin: { x: 0.5, y: 0.5 },
      colors,
      gravity: 0.5,
      decay: 0.94,
      startVelocity: 30,
      ticks: 120,
      zIndex: 9999
    });

    // Second burst from left
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 60,
        origin: { x: 0.2, y: 0.6 },
        colors,
        gravity: 0.6,
        decay: 0.95,
        startVelocity: 25,
        ticks: 100,
        zIndex: 9999
      });
    }, 200);

    // Third burst from right
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 60,
        origin: { x: 0.8, y: 0.6 },
        colors,
        gravity: 0.6,
        decay: 0.95,
        startVelocity: 25,
        ticks: 100,
        zIndex: 9999
      });
    }, 400);
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    
    // Simulate API call - in production this would send to team@brightlabs.in
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Log meeting details for development
    console.log('📅 Meeting scheduled - notification will be sent to team@brightlabs.in:', {
      email,
      meetingDate: meetingDate.toISOString(),
      timestamp: new Date().toISOString()
    });
    
    setIsSubmitting(false);
    setIsSuccess(true);
    setShowCheckmark(true);
    
    // Trigger full-screen confetti
    triggerFullScreenConfetti();
    
    // Auto-close after delay
    setTimeout(() => {
      onClose();
    }, autoCloseDelay);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  // Reset states when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsSubmitting(false);
      setIsSuccess(false);
      setShowCheckmark(false);
    }
  }, [isOpen]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleClose}
          style={{
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)'
          }}
        >
          <motion.div
            className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl max-w-xs sm:max-w-sm w-full mx-2 sm:mx-4 relative overflow-hidden border border-gray-700/50 shadow-2xl"
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 30 }}
            transition={{ 
              duration: 0.5,
              type: "spring",
              stiffness: 280,
              damping: 30
            }}
            onClick={(e) => e.stopPropagation()}
            style={{ 
              borderRadius: '16px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10 pointer-events-none" />
            
            {/* Close button */}
            {!isSubmitting && !isSuccess && (
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 p-1.5 hover:bg-white/10 rounded-full transition-colors duration-200 z-10 group"
                aria-label="Close modal"
              >
                <X className="h-4 w-4 text-gray-400 group-hover:text-gray-200 transition-colors" />
              </button>
            )}

            {/* Content */}
            <div className="relative p-5 sm:p-6">
              {!isSuccess ? (
                <>
                  {/* Header with Icon */}
                  <div className="text-center mb-5">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg border border-gray-600/50">
                      <motion.div
                        animate={isSubmitting ? { rotate: 360 } : {}}
                        transition={{ duration: 1, repeat: isSubmitting ? Infinity : 0, ease: "linear" }}
                      >
                        <Calendar className="h-6 w-6 text-gray-300" />
                      </motion.div>
                    </div>
                    
                    <h2 className="text-lg sm:text-xl font-bold text-white mb-1">
                      Confirm Meeting
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-400">
                      30-minute consultation call
                    </p>
                  </div>
                  
                  {/* Meeting Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-xl border border-gray-700/50 backdrop-blur-sm">
                      <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Calendar className="h-4 w-4 text-gray-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{formatDate(meetingDate)}</p>
                        <p className="text-xs text-gray-400">We'll send calendar invite</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-xl border border-gray-700/50 backdrop-blur-sm">
                      <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="h-4 w-4 text-gray-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{email}</p>
                        <p className="text-xs text-gray-400">Contact email</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={handleClose}
                      disabled={isSubmitting}
                      className="flex-1 px-3 sm:px-4 py-2.5 border border-gray-600 rounded-xl text-gray-300 hover:bg-gray-700/50 hover:border-gray-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                    >
                      Cancel
                    </button>
                    
                    <motion.button
                      onClick={handleConfirm}
                      disabled={isSubmitting}
                      className="flex-1 px-3 sm:px-4 py-2.5 rounded-xl text-white font-medium transition-all duration-300 relative overflow-hidden text-sm shadow-lg"
                      style={{
                        background: isSubmitting 
                          ? 'linear-gradient(135deg, #4b5563, #6b7280)' 
                          : 'linear-gradient(135deg, #374151, #4b5563, #6b7280)'
                      }}
                      whileTap={{ scale: 0.98 }}
                      whileHover={{ 
                        boxShadow: '0 8px 25px -8px rgba(0, 0, 0, 0.5)',
                        y: -1
                      }}
                    >
                      <AnimatePresence mode="wait">
                        {isSubmitting ? (
                          <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center justify-center"
                          >
                            <motion.div
                              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            <span className="ml-2">Booking...</span>
                          </motion.div>
                        ) : (
                          <motion.span
                            key="default"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            Confirm Meeting
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </div>
                </>
              ) : (
                /* Success State */
                <div className="text-center py-2">
                  {/* Success Icon with Animation */}
                  <motion.div
                    className="w-16 h-16 mx-auto mb-4 relative"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: 0.1
                    }}
                  >
                    {/* Animated Background Circle */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-gray-600 via-gray-500 to-gray-400 rounded-full shadow-lg"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                        delay: 0.2
                      }}
                    />
                    
                    {/* Checkmark */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                        delay: 0.4
                      }}
                    >
                      <Check className="h-8 w-8 text-white" strokeWidth={3} />
                    </motion.div>
                    
                    {/* Sparkle Effects */}
                    <motion.div
                      className="absolute -top-1 -right-1"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <Sparkles className="h-4 w-4 text-gray-300" />
                    </motion.div>
                    <motion.div
                      className="absolute -bottom-1 -left-1"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      <Sparkles className="h-3 w-3 text-gray-400" />
                    </motion.div>
                  </motion.div>
                  
                  {/* Success Message */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h2 className="text-lg sm:text-xl font-bold text-white mb-2">
                      Meeting Scheduled! 🎉
                    </h2>
                    <p className="text-sm text-gray-300 leading-relaxed px-2">
                      We'll send you a calendar invitation and meeting details within 24 hours to both your email and team@brightlabs.in.
                    </p>
                  </motion.div>

                  {/* Auto-close indicator */}
                  <motion.div
                    className="mt-4 flex items-center justify-center space-x-2 text-xs text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <motion.div
                      className="w-1 h-1 bg-gray-400 rounded-full"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    <span>Closing automatically...</span>
                  </motion.div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}