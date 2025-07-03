"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
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
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
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
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleClose}
          style={{
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)'
          }}
        >
          <motion.div
            className="bg-white rounded-xl p-8 max-w-md w-full mx-4 relative shadow-2xl"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ 
              duration: 0.4,
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
            onClick={(e) => e.stopPropagation()}
            style={{ borderRadius: '12px' }}
          >
            {/* Close button */}
            {!isSubmitting && !isSuccess && (
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                aria-label="Close modal"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            )}

            {/* Content */}
            <div className="text-center">
              {!isSuccess ? (
                <>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <motion.div
                      animate={isSubmitting ? { rotate: 360 } : {}}
                      transition={{ duration: 1, repeat: isSubmitting ? Infinity : 0, ease: "linear" }}
                    >
                      📅
                    </motion.div>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Confirm Your Meeting
                  </h2>
                  
                  <div className="space-y-4 mb-8">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Date & Time</p>
                      <p className="font-semibold text-gray-900">{formatDate(meetingDate)}</p>
                      <p className="text-sm text-gray-600">30-minute consultation call</p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Contact Email</p>
                      <p className="font-semibold text-gray-900">{email}</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <motion.div
                    className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: 0.1
                    }}
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                        delay: 0.3
                      }}
                    >
                      <Check className="h-8 w-8 text-green-600" />
                    </motion.div>
                  </motion.div>
                  
                  <motion.h2
                    className="text-2xl font-bold text-gray-900 mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    Meeting Scheduled! 🎉
                  </motion.h2>
                  
                  <motion.p
                    className="text-gray-600 mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    We'll send you a calendar invitation and meeting details within 24 hours.
                  </motion.p>
                </>
              )}

              {/* Action Buttons */}
              {!isSuccess && (
                <div className="flex gap-3">
                  <button
                    onClick={handleClose}
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  
                  <motion.button
                    onClick={handleConfirm}
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-3 rounded-lg text-white font-medium transition-all duration-300 relative overflow-hidden"
                    style={{
                      backgroundColor: isSubmitting ? '#6b7280' : (showCheckmark ? '#4CAF50' : '#374151')
                    }}
                    whileTap={{ scale: 0.98 }}
                    animate={showCheckmark ? {
                      backgroundColor: '#4CAF50',
                      scale: [1, 1.05, 1]
                    } : {}}
                    transition={{ duration: 0.3 }}
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
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          <span className="ml-2">Confirming...</span>
                        </motion.div>
                      ) : showCheckmark ? (
                        <motion.div
                          key="success"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ 
                            type: "spring",
                            stiffness: 400,
                            damping: 25
                          }}
                          className="flex items-center justify-center"
                        >
                          <Check className="w-5 h-5 mr-2" />
                          Confirmed!
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
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}