import { ExternalLink, ArrowRight, Bot, TrendingUp, Clock, Users, Star } from 'lucide-react';
import { Marquee } from './ui/Marquee';

const Portfolio = () => {
  const projects = [
    {
      title: "E-commerce AI Assistant",
      category: "AI Chatbot",
      description: "Intelligent shopping assistant that increased conversion rates by 45% and reduced customer service workload by 60%.",
      image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
      results: [
        { icon: TrendingUp, label: "45% Conversion Increase", value: "45%" },
        { icon: Clock, label: "60% Faster Response", value: "2.3s" },
        { icon: Users, label: "Customer Satisfaction", value: "98%" }
      ],
      technologies: ["GPT-4", "React", "Node.js", "MongoDB"]
    },
    {
      title: "Document Processing Automation",
      category: "NLP Automation",
      description: "Automated invoice processing system that handles 10,000+ documents daily with 99.8% accuracy.",
      image: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=800",
      results: [
        { icon: Bot, label: "Documents Processed", value: "10K+" },
        { icon: TrendingUp, label: "Accuracy Rate", value: "99.8%" },
        { icon: Clock, label: "Time Saved", value: "80%" }
      ],
      technologies: ["Python", "TensorFlow", "OCR", "AWS"]
    },
    {
      title: "Smart CRM Integration",
      category: "Workflow Automation",
      description: "AI-powered CRM that automatically qualifies leads, schedules meetings, and personalizes outreach.",
      image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800",
      results: [
        { icon: Users, label: "Lead Quality", value: "+65%" },
        { icon: TrendingUp, label: "Sales Efficiency", value: "+40%" },
        { icon: Clock, label: "Setup Time", value: "2 weeks" }
      ],
      technologies: ["Salesforce", "OpenAI", "Zapier", "Python"]
    }
  ];

  const testimonials = [
    {
      name: "Jennifer Walsh",
      role: "CEO, TechStart Inc.",
      content: "The AI automation they built for us has been a game-changer. We've seen a 300% ROI in just 6 months.",
      image: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=200",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Operations Director, LogiFlow",
      content: "Their NLP solution processes our documents faster and more accurately than our entire previous team.",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200",
      rating: 5
    },
    {
      name: "Sarah Martinez",
      role: "Marketing Head, GrowthCo",
      content: "The AI website they created for us generates qualified leads 24/7. It's like having a sales team that never sleeps.",
      image: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=200",
      rating: 5
    },
    {
      name: "David Rodriguez",
      role: "CTO, InnovateLabs",
      content: "Exceptional AI implementation. Their automation saved us 40 hours per week and improved accuracy by 95%.",
      image: "https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=200",
      rating: 5
    },
    {
      name: "Emily Thompson",
      role: "Founder, DataDriven Co",
      content: "The custom AI agent they developed understands our business better than some of our employees. Incredible work!",
      image: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=200",
      rating: 5
    },
    {
      name: "Alex Kumar",
      role: "VP Operations, ScaleUp Inc",
      content: "From concept to deployment, their team delivered beyond expectations. Our efficiency increased by 60%.",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200",
      rating: 5
    }
  ];

  const firstRow = testimonials.slice(0, Math.ceil(testimonials.length / 2));
  const secondRow = testimonials.slice(Math.ceil(testimonials.length / 2));

  const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => (
    <figure className="relative w-80 sm:w-96 cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 sm:p-7 shadow-lg hover:shadow-xl transition-all duration-300 mx-2">
      <div className="flex items-center space-x-3 sm:space-x-4 mb-4">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden bg-gradient-to-r from-gray-100 to-gray-200 ring-2 ring-gray-100 flex-shrink-0">
          <img 
            src={testimonial.image} 
            alt={`${testimonial.name}, ${testimonial.role}`}
            className="w-full h-full object-cover"
            width="56"
            height="56"
            loading="lazy"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-gray-900 text-sm sm:text-base truncate">{testimonial.name}</div>
          <div className="text-xs sm:text-sm text-gray-600 truncate">{testimonial.role}</div>
        </div>
        <div className="flex space-x-1 flex-shrink-0" role="img" aria-label={`${testimonial.rating} out of 5 stars`}>
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
          ))}
        </div>
      </div>
      <blockquote className="text-gray-700 leading-relaxed italic font-medium text-sm sm:text-base">
        "{testimonial.content}"
      </blockquote>
    </figure>
  );

  return (
    <section id="portfolio" className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50" role="main" aria-labelledby="portfolio-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 id="portfolio-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Success Stories
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Real results from real clients. See how our AI solutions have transformed businesses across industries.
          </p>
        </div>

        {/* Portfolio Projects */}
        <div className="space-y-16 md:space-y-20 mb-16 md:mb-20">
          {projects.map((project, index) => (
            <article key={index} className="group">
              {/* Mobile Layout: Content First, Image Second */}
              <div className="block lg:hidden space-y-8">
                {/* Project Content - Mobile */}
                <div className="text-center sm:text-left">
                  <div className="inline-block bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                    {project.category}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{project.title}</h3>
                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">{project.description}</p>

                  {/* Results - Mobile */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6" role="list" aria-label="Project results">
                    {project.results.map((result, resultIndex) => (
                      <div key={resultIndex} className="text-center bg-gray-50 rounded-xl p-4 border border-gray-100" role="listitem">
                        <div className="w-10 h-10 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mx-auto mb-2">
                          <result.icon className="h-5 w-5 text-gray-700" aria-hidden="true" />
                        </div>
                        <div className="text-lg font-bold text-gray-900">{result.value}</div>
                        <div className="text-xs text-gray-600">{result.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Technologies - Mobile */}
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-6" role="list" aria-label="Technologies used">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="bg-gray-100 border border-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors duration-200" role="listitem">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-center sm:justify-start">
                    <button 
                      className="group bg-gradient-to-r from-gray-800 to-gray-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                      aria-label={`View case study for ${project.title}`}
                    >
                      <span>View Case Study</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                {/* Project Image - Mobile */}
                <div className="relative">
                  <div className="aspect-video rounded-2xl overflow-hidden bg-gradient-to-r from-gray-100 to-gray-200 shadow-lg">
                    <img 
                      src={project.image} 
                      alt={`${project.title} - ${project.description}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      width="800"
                      height="450"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-gray-50 border border-gray-100 rounded-xl p-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <ExternalLink className="h-6 w-6 text-gray-600" aria-hidden="true" />
                  </div>
                </div>
              </div>

              {/* Desktop Layout: Side by Side */}
              <div className={`hidden lg:grid grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'grid-flow-col-dense' : ''
              }`}>
                {/* Project Image - Desktop */}
                <div className={`relative ${index % 2 === 1 ? 'col-start-2' : ''}`}>
                  <div className="aspect-video rounded-2xl overflow-hidden bg-gradient-to-r from-gray-100 to-gray-200">
                    <img 
                      src={project.image} 
                      alt={`${project.title} - ${project.description}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      width="800"
                      height="450"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-gray-50 border border-gray-100 rounded-xl p-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <ExternalLink className="h-6 w-6 text-gray-600" aria-hidden="true" />
                  </div>
                </div>

                {/* Project Content - Desktop */}
                <div className={index % 2 === 1 ? 'col-start-1' : ''}>
                  <div className="inline-block bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                    {project.category}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">{project.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">{project.description}</p>

                  {/* Results - Desktop */}
                  <div className="grid grid-cols-3 gap-4 mb-6" role="list" aria-label="Project results">
                    {project.results.map((result, resultIndex) => (
                      <div key={resultIndex} className="text-center bg-gray-50 rounded-xl p-3 border border-gray-100" role="listitem">
                        <div className="w-10 h-10 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mx-auto mb-2">
                          <result.icon className="h-5 w-5 text-gray-700" aria-hidden="true" />
                        </div>
                        <div className="text-base font-bold text-gray-900">{result.value}</div>
                        <div className="text-xs text-gray-600">{result.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Technologies - Desktop */}
                  <div className="flex flex-wrap gap-2 mb-6" role="list" aria-label="Technologies used">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="bg-gray-100 border border-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors duration-200" role="listitem">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button 
                    className="group bg-gradient-to-r from-gray-800 to-gray-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                    aria-label={`View case study for ${project.title}`}
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Testimonials with Marquee Effect */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 md:mb-12">What Our Clients Say</h3>
          
          {/* Mobile Testimonials - Horizontal Scroll */}
          <div className="block sm:hidden">
            <div className="flex overflow-x-auto gap-4 pb-4 px-4 -mx-4 scrollbar-hide">
              {testimonials.map((testimonial, index) => (
                <div key={`mobile-${index}`} className="flex-shrink-0">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>

          {/* Desktop/Tablet Testimonials - Vertical Marquee */}
          <div className="hidden sm:block">
            <div className="relative flex h-[500px] md:h-[600px] w-full flex-row items-center justify-center overflow-hidden rounded-2xl" role="region" aria-label="Client testimonials">
              <Marquee pauseOnHover vertical className="[--duration:20s]">
                {firstRow.map((testimonial, index) => (
                  <TestimonialCard key={`first-${index}`} testimonial={testimonial} />
                ))}
              </Marquee>
              <Marquee reverse pauseOnHover vertical className="[--duration:20s]">
                {secondRow.map((testimonial, index) => (
                  <TestimonialCard key={`second-${index}`} testimonial={testimonial} />
                ))}
              </Marquee>
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1/5 bg-gradient-to-b from-gray-50"></div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-gray-50"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;