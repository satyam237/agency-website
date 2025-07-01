import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import { GlassFilter } from './components/ui/liquid-glass-button';
import { ScrollProgress } from './components/ui/scroll-progress';

// Lazy load components that are not immediately visible
const Services = React.lazy(() => import('./components/Services'));
const Portfolio = React.lazy(() => import('./components/Portfolio'));
const Contact = React.lazy(() => import('./components/Contact'));
const Footer = React.lazy(() => import('./components/Footer'));

// Lazy load legal pages
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = React.lazy(() => import('./pages/TermsOfService'));
const CookiePolicy = React.lazy(() => import('./pages/CookiePolicy'));

// Loading component for Suspense fallback
const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
  </div>
);

// Main homepage component
const HomePage = () => (
  <div className="min-h-screen relative">
    {/* Scroll Progress Bar - Fixed at top */}
    <div className="fixed top-0 left-0 right-0 z-[60] pointer-events-none">
      <div className="absolute left-0 top-0 h-1 w-full bg-gray-200/50"></div>
      <ScrollProgress 
        className="absolute top-0 h-1 bg-gradient-to-r from-gray-800 via-gray-600 to-gray-400"
        springOptions={{ 
          stiffness: 280, 
          damping: 30, 
          mass: 0.2 
        }}
      />
    </div>
    
    <GlassFilter />
    <Header />
    <Hero />
    <Suspense fallback={<LoadingSpinner />}>
      <Services />
    </Suspense>
    <Suspense fallback={<LoadingSpinner />}>
      <Portfolio />
    </Suspense>
    <Suspense fallback={<LoadingSpinner />}>
      <Contact />
    </Suspense>
    <Suspense fallback={<LoadingSpinner />}>
      <Footer />
    </Suspense>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Main homepage */}
        <Route path="/" element={<HomePage />} />
        
        {/* Legal pages */}
        <Route 
          path="/privacy-policy" 
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <PrivacyPolicy />
            </Suspense>
          } 
        />
        <Route 
          path="/terms-of-service" 
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <TermsOfService />
            </Suspense>
          } 
        />
        <Route 
          path="/cookie-policy" 
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <CookiePolicy />
            </Suspense>
          } 
        />
        
        {/* Catch all route - redirect to homepage */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;