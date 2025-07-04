import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import { SlideButton } from './ui/slide-button';
import { Calendar } from './ui/calendar';
import { ScrollReveal } from './ui/scroll-reveal';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

interface FormData {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });
  
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Message validation
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const triggerSuccessConfetti = () => {
    // Multi-colored confetti with red, blue, green, yellow, purple, and orange
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#f97316'],
      gravity: 0.5,
      decay: 0.94,
      startVelocity: 30,
      ticks: 100
    });

    // Additional burst for extra celebration
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 120,
        origin: { y: 0.7 },
        colors: ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#f97316'],
        gravity: 0.6,
        decay: 0.95,
        startVelocity: 25,
        ticks: 80
      });
    }, 250);
  };

  const handleSlideComplete = async () => {
    // First validate the form
    if (!validateForm()) {
      setSubmitError(true);
      setTimeout(() => setSubmitError(false), 2000);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(false);
    setSubmitSuccess(false);
    
    try {
      // Get production webhook URL
      const prodWebhookUrl = import.meta.env.VITE_N8N_PROD_WEBHOOK_URL;

      // Prepare form data payload
      const payload = {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        service: formData.service,
        message: formData.message,
        timestamp: new Date().toISOString(),
        source: 'AI Agency Contact Form'
      };

      // Check if production webhook URL is configured
      if (!prodWebhookUrl) {
        console.error('Production webhook URL is not configured');
        setSubmitError(true);
        setTimeout(() => setSubmitError(false), 2000);
        return;
      }

      // Submit to production webhook
      console.log('Submitting to production webhook:', prodWebhookUrl);
      
      const response = await fetch(prodWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      // Success - webhook submission completed
      console.log('✅ Form submission successful!');
      
      setSubmitSuccess(true);
      setIsSubmitted(true);
      
      // Trigger the multi-colored confetti effect
      triggerSuccessConfetti();
      
      // Reset form data
      setFormData({ name: '', email: '', company: '', service: '', message: '' });
      setFormErrors({});
      
      // Reset success state after showing it
      setTimeout(() => {
        setSubmitSuccess(false);
        setIsSubmitted(false);
      }, 3000);

    } catch (error) {
      console.error('❌ Form submission failed:', error);
      if (error instanceof Error) {
        console.error('Error details:', error.message);
      }
      setSubmitError(true);
      setTimeout(() => setSubmitError(false), 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleScheduleCall = () => {
    setShowCalendar(true);
  };

  const handleCloseCalendar = () => {
    setShowCalendar(false);
  };

  const handleDateSelect = (date: Date) => {
    // Here you would typically integrate with your booking system
  };

  const services = [
    "AI Agents & Automation",
    "AI-Powered Websites",
    "NLP & Text Processing",
    "Workflow Automation",
    "AI Consulting",
    "Custom AI Solutions"
  ];

  return (
    <>
      <section id="contact" className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white" role="main" aria-labelledby="contact-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 id="contact-heading" className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6">
              <span className="bg-gradient-to-b from-black to-gray-400 bg-clip-text text-transparent">
                Let's Build Something Amazing
              </span>
            </h2>
            <ScrollReveal
              baseOpacity={0.3}
              enableBlur={true}
              baseRotation={0.5}
              blurStrength={1}
              rotationEnd="center center"
              wordAnimationEnd="center center"
              textClassName="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4"
            >
              Ready to transform your business with AI? Get in touch for a free consultation and discover 
              how we can help you achieve your goals.
            </ScrollReveal>
          </div>

          {/* Main Contact Grid - Send us a message first, Schedule Call second */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
            {/* Contact Form - Always first - NO SCROLL REVEAL */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Send us a message</h3>
              
              {isSubmitted && (
                <div className="mb-4 md:mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-3" role="alert" aria-live="polite">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm md:text-base text-green-700">Thank you! We'll get back to you within 24 hours.</span>
                </div>
              )}

              <form className="space-y-4 md:space-y-6" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 md:px-4 md:py-3 border rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 text-sm md:text-base ${
                        formErrors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="John Doe"
                      aria-describedby={formErrors.name ? 'name-error' : undefined}
                      aria-invalid={formErrors.name ? 'true' : 'false'}
                    />
                    {formErrors.name && (
                      <div id="name-error" className="mt-1 flex items-center space-x-1 text-red-600" role="alert">
                        <AlertCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                        <span className="text-sm">{formErrors.name}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 md:px-4 md:py-3 border rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 text-sm md:text-base ${
                        formErrors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="john@company.com"
                      aria-describedby={formErrors.email ? 'email-error' : undefined}
                      aria-invalid={formErrors.email ? 'true' : 'false'}
                    />
                    {formErrors.email && (
                      <div id="email-error" className="mt-1 flex items-center space-x-1 text-red-600" role="alert">
                        <AlertCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                        <span className="text-sm">{formErrors.email}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 text-sm md:text-base"
                    placeholder="Your Company"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                    Service of Interest
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 text-sm md:text-base"
                  >
                    <option value="">Select a service</option>
                    {services.map((service, index) => (
                      <option key={index} value={service}>{service}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 md:px-4 md:py-3 border rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 resize-none text-sm md:text-base ${
                      formErrors.message ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Tell us about your project, goals, and how we can help..."
                    aria-describedby={formErrors.message ? 'message-error' : undefined}
                    aria-invalid={formErrors.message ? 'true' : 'false'}
                  ></textarea>
                  {formErrors.message && (
                    <div id="message-error" className="mt-1 flex items-center space-x-1 text-red-600" role="alert">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                      <span className="text-sm">{formErrors.message}</span>
                    </div>
                  )}
                </div>

                {/* Slide Button - Centered and properly sized */}
                <div className="flex justify-center pt-4">
                  <SlideButton
                    onSlideComplete={handleSlideComplete}
                    isSubmitting={isSubmitting}
                    isSuccess={submitSuccess}
                    isError={submitError}
                    aria-label="Slide to send your message"
                  />
                </div>
              </form>
            </div>

            {/* Prefer to schedule a call section - Now second */}
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl p-6 md:p-8 text-center">
              <h4 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4">
                Prefer to schedule a call?
              </h4>
              <ScrollReveal
                baseOpacity={0.4}
                enableBlur={true}
                baseRotation={0.5}
                blurStrength={1}
                rotationEnd="center center"
                wordAnimationEnd="center center"
                textClassName="text-gray-600 mb-4 md:mb-6 text-base md:text-lg max-w-2xl mx-auto"
              >
                Book a free 30-minute consultation to discuss your project goals, timeline, and how our AI solutions can transform your business operations.
              </ScrollReveal>
              <button 
                onClick={handleScheduleCall}
                className="bg-gradient-to-r from-gray-800 to-gray-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-xl font-medium hover:shadow-lg transition-all duration-300 text-base md:text-lg"
                aria-label="Schedule a free consultation call"
              >
                Schedule Free Call
              </button>
            </div>
          </div>

          {/* Get in Touch section - Now third - NO SCROLL REVEAL */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl p-6 md:p-8 text-white mb-8 md:mb-12">
            <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Get in Touch</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />
                </div>
                <div>
                  <div className="font-semibold mb-1 text-sm md:text-base">Email Us</div>
                  <div className="text-gray-300 text-sm md:text-base">
                    <a href="mailto:hello@aiagency.com" className="hover:text-white transition-colors">hello@aiagency.com</a>
                  </div>
                  <div className="text-gray-300 text-sm md:text-base">
                    <a href="mailto:support@aiagency.com" className="hover:text-white transition-colors">support@aiagency.com</a>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />
                </div>
                <div>
                  <div className="font-semibold mb-1 text-sm md:text-base">Call Us</div>
                  <div className="text-gray-300 text-sm md:text-base">
                    <a href="tel:+15551234567" className="hover:text-white transition-colors">+1 (555) 123-4567</a>
                  </div>
                  <div className="text-gray-300 text-sm md:text-base">Mon-Fri 9AM-6PM EST</div>
                </div>
              </div>

              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />
                </div>
                <div>
                  <div className="font-semibold mb-1 text-sm md:text-base">Visit Us</div>
                  <div className="text-gray-300 text-sm md:text-base">123 Innovation Drive</div>
                  <div className="text-gray-300 text-sm md:text-base">San Francisco, CA 94105</div>
                </div>
              </div>
            </div>
          </div>

          {/* Why Choose Us section - Now fourth - NO SCROLL REVEAL */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
            <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8 text-center">Why Choose Us?</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{'< 24h'}</div>
                <div className="text-sm md:text-base text-gray-600">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">98%</div>
                <div className="text-sm md:text-base text-gray-600">Project Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">95%</div>
                <div className="text-sm md:text-base text-gray-600">Client Retention</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">300%</div>
                <div className="text-sm md:text-base text-gray-600">Average ROI</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calendar Modal */}
      {showCalendar && (
        <Calendar 
          onClose={handleCloseCalendar}
          onDateSelect={handleDateSelect}
        />
      )}
    </>
  );
};

export default Contact;
        setSubmitError(true);
        setTimeout(() => setSubmitError(false), 2000);
      }

    } catch (error) {
      console.error('Unexpected error during form submission:', error);
      setSubmitError(true);
      setTimeout(() => setSubmitError(false), 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleScheduleCall = () => {
    setShowCalendar(true);
  };

  const handleCloseCalendar = () => {
    setShowCalendar(false);
  };

  const handleDateSelect = (date: Date) => {
    // Here you would typically integrate with your booking system
  };

  const services = [
    "AI Agents & Automation",
    "AI-Powered Websites",
    "NLP & Text Processing",
    "Workflow Automation",
    "AI Consulting",
    "Custom AI Solutions"
  ];

  return (
    <>
      <section id="contact" className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white" role="main" aria-labelledby="contact-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 id="contact-heading" className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6">
              <span className="bg-gradient-to-b from-black to-gray-400 bg-clip-text text-transparent">
                Let's Build Something Amazing
              </span>
            </h2>
            <ScrollReveal
              baseOpacity={0.3}
              enableBlur={true}
              baseRotation={0.5}
              blurStrength={1}
              rotationEnd="center center"
              wordAnimationEnd="center center"
              textClassName="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4"
            >
              Ready to transform your business with AI? Get in touch for a free consultation and discover 
              how we can help you achieve your goals.
            </ScrollReveal>
          </div>

          {/* Main Contact Grid - Send us a message first, Schedule Call second */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
            {/* Contact Form - Always first - NO SCROLL REVEAL */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Send us a message</h3>
              
              {isSubmitted && (
                <div className="mb-4 md:mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-3" role="alert" aria-live="polite">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm md:text-base text-green-700">Thank you! We'll get back to you within 24 hours.</span>
                </div>
              )}

              <form className="space-y-4 md:space-y-6" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 md:px-4 md:py-3 border rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 text-sm md:text-base ${
                        formErrors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="John Doe"
                      aria-describedby={formErrors.name ? 'name-error' : undefined}
                      aria-invalid={formErrors.name ? 'true' : 'false'}
                    />
                    {formErrors.name && (
                      <div id="name-error" className="mt-1 flex items-center space-x-1 text-red-600" role="alert">
                        <AlertCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                        <span className="text-sm">{formErrors.name}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 md:px-4 md:py-3 border rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 text-sm md:text-base ${
                        formErrors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="john@company.com"
                      aria-describedby={formErrors.email ? 'email-error' : undefined}
                      aria-invalid={formErrors.email ? 'true' : 'false'}
                    />
                    {formErrors.email && (
                      <div id="email-error" className="mt-1 flex items-center space-x-1 text-red-600" role="alert">
                        <AlertCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                        <span className="text-sm">{formErrors.email}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 text-sm md:text-base"
                    placeholder="Your Company"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                    Service of Interest
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 text-sm md:text-base"
                  >
                    <option value="">Select a service</option>
                    {services.map((service, index) => (
                      <option key={index} value={service}>{service}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 md:px-4 md:py-3 border rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 resize-none text-sm md:text-base ${
                      formErrors.message ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Tell us about your project, goals, and how we can help..."
                    aria-describedby={formErrors.message ? 'message-error' : undefined}
                    aria-invalid={formErrors.message ? 'true' : 'false'}
                  ></textarea>
                  {formErrors.message && (
                    <div id="message-error" className="mt-1 flex items-center space-x-1 text-red-600" role="alert">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                      <span className="text-sm">{formErrors.message}</span>
                    </div>
                  )}
                </div>

                {/* Slide Button - Centered and properly sized */}
                <div className="flex justify-center pt-4">
                  <SlideButton
                    onSlideComplete={handleSlideComplete}
                    isSubmitting={isSubmitting}
                    isSuccess={submitSuccess}
                    isError={submitError}
                    aria-label="Slide to send your message"
                  />
                </div>
              </form>
            </div>

            {/* Prefer to schedule a call section - Now second */}
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl p-6 md:p-8 text-center">
              <h4 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4">
                Prefer to schedule a call?
              </h4>
              <ScrollReveal
                baseOpacity={0.4}
                enableBlur={true}
                baseRotation={0.5}
                blurStrength={1}
                rotationEnd="center center"
                wordAnimationEnd="center center"
                textClassName="text-gray-600 mb-4 md:mb-6 text-base md:text-lg max-w-2xl mx-auto"
              >
                Book a free 30-minute consultation to discuss your project goals, timeline, and how our AI solutions can transform your business operations.
              </ScrollReveal>
              <button 
                onClick={handleScheduleCall}
                className="bg-gradient-to-r from-gray-800 to-gray-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-xl font-medium hover:shadow-lg transition-all duration-300 text-base md:text-lg"
                aria-label="Schedule a free consultation call"
              >
                Schedule Free Call
              </button>
            </div>
          </div>

          {/* Get in Touch section - Now third - NO SCROLL REVEAL */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl p-6 md:p-8 text-white mb-8 md:mb-12">
            <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Get in Touch</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />
                </div>
                <div>
                  <div className="font-semibold mb-1 text-sm md:text-base">Email Us</div>
                  <div className="text-gray-300 text-sm md:text-base">
                    <a href="mailto:hello@aiagency.com" className="hover:text-white transition-colors">hello@aiagency.com</a>
                  </div>
                  <div className="text-gray-300 text-sm md:text-base">
                    <a href="mailto:support@aiagency.com" className="hover:text-white transition-colors">support@aiagency.com</a>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />
                </div>
                <div>
                  <div className="font-semibold mb-1 text-sm md:text-base">Call Us</div>
                  <div className="text-gray-300 text-sm md:text-base">
                    <a href="tel:+15551234567" className="hover:text-white transition-colors">+1 (555) 123-4567</a>
                  </div>
                  <div className="text-gray-300 text-sm md:text-base">Mon-Fri 9AM-6PM EST</div>
                </div>
              </div>

              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />
                </div>
                <div>
                  <div className="font-semibold mb-1 text-sm md:text-base">Visit Us</div>
                  <div className="text-gray-300 text-sm md:text-base">123 Innovation Drive</div>
                  <div className="text-gray-300 text-sm md:text-base">San Francisco, CA 94105</div>
                </div>
              </div>
            </div>
          </div>

          {/* Why Choose Us section - Now fourth - NO SCROLL REVEAL */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
            <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8 text-center">Why Choose Us?</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{'< 24h'}</div>
                <div className="text-sm md:text-base text-gray-600">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">98%</div>
                <div className="text-sm md:text-base text-gray-600">Project Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">95%</div>
                <div className="text-sm md:text-base text-gray-600">Client Retention</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">300%</div>
                <div className="text-sm md:text-base text-gray-600">Average ROI</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calendar Modal */}
      {showCalendar && (
        <Calendar 
          onClose={handleCloseCalendar}
          onDateSelect={handleDateSelect}
        />
      )}
    </>
  );
};

export default Contact;