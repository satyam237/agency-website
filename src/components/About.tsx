import { Users, Target, Award, Lightbulb } from 'lucide-react';
import { CircularTestimonials } from './ui/circular-testimonials';

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Mission-Driven",
      description: "We're committed to democratizing AI technology and making it accessible to businesses of all sizes."
    },
    {
      icon: Lightbulb,
      title: "Innovation First",
      description: "We stay at the forefront of AI technology, constantly exploring new possibilities and solutions."
    },
    {
      icon: Users,
      title: "Client-Centric",
      description: "Your success is our success. We build long-term partnerships based on trust and results."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We deliver premium quality solutions that exceed expectations and drive real business value."
    }
  ];

  const team = [
    {
      quote: "Leading our AI strategy with over 10 years of experience in machine learning and enterprise solutions. I'm passionate about making AI accessible to businesses of all sizes.",
      name: "Alex Chen",
      designation: "CEO & AI Strategist",
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop"
    },
    {
      quote: "Former Google AI researcher specializing in natural language processing. I focus on building AI solutions that truly understand and serve human needs.",
      name: "Sarah Johnson",
      designation: "Lead AI Engineer",
      src: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop"
    },
    {
      quote: "Expert in business process automation and workflow optimization. I help companies streamline their operations through intelligent automation solutions.",
      name: "Marcus Rodriguez",
      designation: "Automation Specialist",
      src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop"
    }
  ];

  return (
    <section id="about" className="py-16 md:py-20 bg-white" role="main" aria-labelledby="about-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 id="about-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              About Our Agency
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            We're a team of AI experts, engineers, and strategists dedicated to helping businesses 
            harness the transformative power of artificial intelligence.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mb-16 md:mb-20">
          <div className="order-2 lg:order-1">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">Our Story</h3>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Founded in 2021, our agency emerged from a simple belief: AI should be accessible, 
                practical, and transformative for businesses of all sizes. What started as a small 
                team of AI enthusiasts has grown into a full-service agency serving clients worldwide.
              </p>
              <p>
                We've helped over 200 companies implement AI solutions that have collectively saved 
                millions of hours and generated substantial ROI. Our approach combines cutting-edge 
                technology with deep business understanding to deliver solutions that truly matter.
              </p>
              <p>
                Today, we continue to push the boundaries of what's possible with AI, always keeping 
                our clients' success at the heart of everything we do.
              </p>
            </div>
          </div>
          <div className="relative order-1 lg:order-2">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Team collaboration in modern office environment"
                className="w-full h-full object-cover"
                loading="lazy"
                width="800"
                height="800"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-r from-gray-800 to-gray-600 rounded-2xl flex items-center justify-center">
              <Lightbulb className="h-8 w-8 md:h-12 md:w-12 text-white" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16 md:mb-20">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8 md:mb-12">Our Values</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8" role="list">
            {values.map((value, index) => (
              <div key={index} className="text-center group" role="listitem">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:from-gray-200 group-hover:to-gray-300 transition-all duration-300">
                  <value.icon className="h-6 w-6 md:h-8 md:w-8 text-gray-700" aria-hidden="true" />
                </div>
                <h4 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">{value.title}</h4>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team with Circular Testimonials */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8 md:mb-12">Meet Our Team</h3>
          <div className="flex justify-center">
            <CircularTestimonials
              testimonials={team}
              autoplay={true}
              colors={{
                name: "#111827",
                designation: "#6b7280",
                testimony: "#374151",
                arrowBackground: "#374151",
                arrowForeground: "#f9fafb",
                arrowHoverBackground: "#111827",
              }}
              fontSizes={{
                name: "28px",
                designation: "18px",
                quote: "18px",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;