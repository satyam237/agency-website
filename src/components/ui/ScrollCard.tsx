'use client';
import { ReactLenis } from 'lenis/react';
import React, { useRef, forwardRef, useEffect } from 'react';
import { Bot, Globe, Zap, MessageSquare, Brain, Cog } from 'lucide-react';
import StarBorderButton from './StarBorderButton';
import { ContainerScroll, CardSticky } from './cards-stack';
import { ScrollReveal } from './scroll-reveal';
import ScrollFloat from './scroll-float';

interface ServiceCardData {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  features: string[];
  color: string;
  rotation: string;
}

const servicesData: ServiceCardData[] = [
  {
    icon: Bot,
    title: "AI Agents & Automation",
    description: "Custom AI agents that handle customer service, lead qualification, and complex business processes with human-like intelligence.",
    features: ["24/7 Customer Support", "Lead Qualification", "Process Automation", "Multi-platform Integration"],
    color: '#F5F5F5', // Light Gray
    rotation: 'rotate-6',
  },
  {
    icon: Globe,
    title: "AI-Powered Websites",
    description: "Modern, responsive websites with integrated AI features like chatbots, personalization, and intelligent content management.",
    features: ["AI Chatbot Integration", "Smart Content Management", "Personalization Engine", "SEO Optimization"],
    color: '#E8E8E8', // Medium Light Gray
    rotation: 'rotate-0',
  },
  {
    icon: Brain,
    title: "NLP & Text Processing",
    description: "Advanced natural language processing solutions for document analysis, sentiment analysis, and content generation.",
    features: ["Document Analysis", "Sentiment Analysis", "Content Generation", "Language Translation"],
    color: '#DCDCDC', // Medium Gray
    rotation: '-rotate-6',
  },
  {
    icon: Zap,
    title: "Workflow Automation",
    description: "Streamline your business operations with intelligent automation that learns and adapts to your processes.",
    features: ["Process Mapping", "Intelligent Routing", "Data Integration", "Performance Analytics"],
    color: '#D0D0D0', // Darker Gray
    rotation: 'rotate-3',
  },
  {
    icon: MessageSquare,
    title: "AI Consulting",
    description: "Strategic guidance on AI implementation, technology selection, and digital transformation roadmaps.",
    features: ["AI Strategy Development", "Technology Assessment", "Implementation Planning", "Training & Support"],
    color: '#C4C4C4', // Even Darker Gray
    rotation: 'rotate-0',
  },
  {
    icon: Cog,
    title: "Custom AI Solutions",
    description: "Bespoke AI solutions tailored to your specific industry needs and business requirements.",
    features: ["Custom Model Development", "API Integration", "Scalable Architecture", "Ongoing Maintenance"],
    color: '#B8B8B8', // Darkest Gray
    rotation: '-rotate-3',
  }
];

const ScrollCardServices = forwardRef<HTMLElement>((props, ref) => {
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  // Initialize scroll-triggered animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-up');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
        }
      });
    }, observerOptions);

    // Observe all cards
    cardRefs.current.forEach((card) => {
      if (card) {
        observer.observe(card);
      }
    });

    return () => {
      cardRefs.current.forEach((card) => {
        if (card) {
          observer.unobserve(card);
        }
      });
    };
  }, []);

  const handleConsultationClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ReactLenis root>
      <main className='bg-gradient-to-b from-gray-50 to-white' ref={ref}>
        <div className='wrapper'>
          <section className='text-gray-900 h-[50vh] w-full bg-gradient-to-b from-gray-50 to-white flex items-center justify-center sticky top-0' role="banner" aria-labelledby="services-heading">
            <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#e5e5e52e_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e52e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>

            <div className="text-center">
              <ScrollFloat
                tag="h2"
                textClassName="text-6xl md:text-8xl font-black mb-1 bg-gradient-to-b from-black to-gray-400 bg-clip-text text-transparent"
                scrollStart="top bottom-=10%"
                scrollEnd="center center"
                stagger={0.02}
                ease="back.out(1.7)"
              >
                Our AI Services
              </ScrollFloat>
              <ScrollReveal
                baseOpacity={0.3}
                enableBlur={true}
                baseRotation={0.5}
                blurStrength={1}
                rotationEnd="center center"
                wordAnimationEnd="center center"
                textClassName="text-xl text-gray-600 max-w-3xl mx-auto"
              >
                Comprehensive AI solutions designed to transform your business operations and drive unprecedented growth.
              </ScrollReveal>
            </div>
          </section>
        </div>

        {/* Mobile Layout: Stacked Cards First, Then Text - NO SCROLL REVEAL ON CARDS */}
        <section className='block lg:hidden text-gray-900 w-full bg-gradient-to-b from-white to-gray-50 py-16' role="main">
          <div className='px-4 md:px-8'>
            {/* Animated Stacked Cards Section - Mobile (Now First) - NO SCROLL REVEAL */}
            <ContainerScroll className="min-h-[800px] max-w-sm mx-auto mb-16">
              {servicesData.map((service, i) => (
                <CardSticky
                  key={i}
                  index={i}
                  incrementY={25}
                  incrementZ={10}
                  className={`w-full rounded-2xl ${service.rotation} p-6 grid gap-4 shadow-lg border border-gray-200 focus-within:ring-2 focus-within:ring-gray-500 focus-within:ring-offset-2`}
                  style={{ 
                    backgroundColor: service.color,
                    transformOrigin: 'center center'
                  }}
                  tabIndex={0}
                  role="article"
                  aria-labelledby={`service-title-mobile-${i}`}
                  aria-describedby={`service-description-mobile-${i}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/80 rounded-xl flex items-center justify-center flex-shrink-0">
                      <service.icon className="h-5 w-5 text-gray-700" aria-hidden="true" />
                    </div>
                    <h3 id={`service-title-mobile-${i}`} className='text-lg font-bold text-gray-900'>{service.title}</h3>
                  </div>
                  
                  <p id={`service-description-mobile-${i}`} className="text-gray-700 leading-relaxed text-sm">{service.description}</p>
                  
                  <ul className="space-y-1" role="list" aria-label="Service features">
                    {service.features.slice(0, 3).map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-xs text-gray-700" role="listitem">
                        <div className="w-1 h-1 bg-gray-600 rounded-full mr-2 flex-shrink-0" aria-hidden="true"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardSticky>
              ))}
            </ContainerScroll>

            {/* Text Section - Mobile (Now Second with added spacing) */}
            <div className="text-center pt-8">
              <ScrollFloat
                tag="h3"
                textClassName="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-b from-black to-gray-400 bg-clip-text text-transparent"
                scrollStart="top bottom-=10%"
                scrollEnd="center center"
                stagger={0.03}
                ease="back.out(1.7)"
              >
                Transform Your Business
              </ScrollFloat>
              <ScrollReveal
                baseOpacity={0.3}
                enableBlur={true}
                baseRotation={0.5}
                blurStrength={1}
                rotationEnd="center center"
                wordAnimationEnd="center center"
                textClassName="text-gray-600 text-lg leading-relaxed mb-8 max-w-2xl mx-auto"
              >
                Each service is designed to integrate seamlessly with your existing operations while delivering measurable results.
              </ScrollReveal>
              <div className="space-y-4 max-w-sm mx-auto" role="list" aria-label="Key benefits">
                <div className="flex items-center space-x-3" role="listitem">
                  <div className="w-2 h-2 bg-gradient-to-r from-gray-600 to-gray-400 rounded-full" aria-hidden="true"></div>
                  <span className="text-gray-700">98% Client Satisfaction</span>
                </div>
                <div className="flex items-center space-x-3" role="listitem">
                  <div className="w-2 h-2 bg-gradient-to-r from-gray-600 to-gray-400 rounded-full" aria-hidden="true"></div>
                  <span className="text-gray-700">24/7 Support Included</span>
                </div>
                <div className="flex items-center space-x-3" role="listitem">
                  <div className="w-2 h-2 bg-gradient-to-r from-gray-600 to-gray-400 rounded-full" aria-hidden="true"></div>
                  <span className="text-gray-700">Custom Implementation</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Desktop Layout: Side by Side with Sticky Cards - NO SCROLL REVEAL ON CARDS */}
        <section className='hidden lg:block text-gray-900 w-full bg-gradient-to-b from-white to-gray-50 min-h-screen' role="main">
          <div className='flex justify-between px-4 md:px-16 gap-8'>
            <div className='grid gap-2 flex-1 max-w-2xl'>
              {servicesData.map((service, i) => (
                <figure key={i} className='sticky top-0 h-screen grid place-content-center'>
                  <article
                    ref={(el) => (cardRefs.current[i + 6] = el)}
                    className={`h-96 w-full max-w-lg rounded-2xl ${service.rotation} p-8 grid gap-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-500 opacity-0 translate-y-8 focus-within:ring-2 focus-within:ring-gray-500 focus-within:ring-offset-2 hover:scale-105`}
                    style={{ backgroundColor: service.color }}
                    tabIndex={0}
                    role="article"
                    aria-labelledby={`service-title-desktop-${i}`}
                    aria-describedby={`service-description-desktop-${i}`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white/80 rounded-xl flex items-center justify-center">
                        <service.icon className="h-6 w-6 text-gray-700" aria-hidden="true" />
                      </div>
                      <h3 id={`service-title-desktop-${i}`} className='text-2xl font-bold text-gray-900'>{service.title}</h3>
                    </div>
                    
                    <p id={`service-description-desktop-${i}`} className="text-gray-700 leading-relaxed">{service.description}</p>
                    
                    <ul className="space-y-2" role="list" aria-label="Service features">
                      {service.features.slice(0, 3).map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-700" role="listitem">
                          <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-3" aria-hidden="true"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </article>
                </figure>
              ))}
            </div>
            
            <div className='sticky top-0 h-screen grid place-content-center flex-1 max-w-md'>
              <div className="text-center">
                <ScrollFloat
                  tag="h3"
                  textClassName="text-6xl md:text-7xl font-black text-center tracking-tight leading-[120%] mb-6 bg-gradient-to-b from-black to-gray-400 bg-clip-text text-transparent"
                  scrollStart="top bottom-=10%"
                  scrollEnd="center center"
                  stagger={0.03}
                  ease="back.out(1.7)"
                >
                  Transform Your Business
                </ScrollFloat>
                <ScrollReveal
                  baseOpacity={0.3}
                  enableBlur={true}
                  baseRotation={0.5}
                  blurStrength={1}
                  rotationEnd="center center"
                  wordAnimationEnd="center center"
                  textClassName="text-gray-600 text-lg leading-relaxed mb-8"
                >
                  Each service is designed to integrate seamlessly with your existing operations while delivering measurable results.
                </ScrollReveal>
                <div className="space-y-4 text-left" role="list" aria-label="Key benefits">
                  <div className="flex items-center space-x-3" role="listitem">
                    <div className="w-2 h-2 bg-gradient-to-r from-gray-600 to-gray-400 rounded-full" aria-hidden="true"></div>
                    <span className="text-gray-700">98% Client Satisfaction</span>
                  </div>
                  <div className="flex items-center space-x-3" role="listitem">
                    <div className="w-2 h-2 bg-gradient-to-r from-gray-600 to-gray-400 rounded-full" aria-hidden="true"></div>
                    <span className="text-gray-700">24/7 Support Included</span>
                  </div>
                  <div className="flex items-center space-x-3" role="listitem">
                    <div className="w-2 h-2 bg-gradient-to-r from-gray-600 to-gray-400 rounded-full" aria-hidden="true"></div>
                    <span className="text-gray-700">Custom Implementation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className='bg-gradient-to-b from-gray-50 to-white py-12' role="contentinfo">
          <div className="max-w-4xl mx-auto text-center px-4">
            <ScrollFloat
              tag="h4"
              textClassName="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-b from-black to-gray-400 bg-clip-text text-transparent"
              scrollStart="top bottom-=10%"
              scrollEnd="center center"
              stagger={0.04}
              ease="back.out(1.7)"
            >
              Ready to Get Started?
            </ScrollFloat>
            <ScrollReveal
              baseOpacity={0.3}
              enableBlur={true}
              baseRotation={0.5}
              blurStrength={1}
              rotationEnd="center center"
              wordAnimationEnd="center center"
              textClassName="text-gray-600 text-lg mb-8"
            >
              Let's discuss how our AI solutions can transform your business operations and drive growth.
            </ScrollReveal>
            <StarBorderButton onClick={handleConsultationClick}>
              Schedule Free Consultation
            </StarBorderButton>
          </div>
        </footer>
      </main>

      <style jsx>{`
        .animate-slide-up {
          animation: slideUp 0.6s ease-out forwards;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(2rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Desktop card effects */
        @media (min-width: 1024px) {
          .grid.gap-2 article {
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .grid.gap-2 article:hover {
            transform: scale(1.05) rotate(0deg);
            z-index: 10;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          }
        }
      `}</style>
    </ReactLenis>
  );
});

ScrollCardServices.displayName = 'ScrollCardServices';

export default ScrollCardServices;