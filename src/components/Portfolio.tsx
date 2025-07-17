"use client";

import { ArrowRight, ExternalLink, TrendingUp, Zap, Bot, Workflow, Globe, Cpu } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from './ui/scroll-reveal';

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  impact: string;
  category: string;
  image: string;
  href: string;
  metrics: {
    label: string;
    value: string;
  }[];
}

export interface AIPortfolioProps {
  title?: string;
  description?: string;
  projects?: PortfolioProject[];
}

const cn = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

const defaultProjects: PortfolioProject[] = [
  {
    id: "ai-chatbot",
    title: "AI Customer Support Agent",
    description: "Intelligent chatbot that handles 90% of customer inquiries automatically, reducing response time from hours to seconds.",
    impact: "90% reduction in response time",
    category: "AI Agents",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    href: "#",
    metrics: [
      { label: "Response Time", value: "< 2 sec" },
      { label: "Accuracy", value: "94%" },
      { label: "Cost Savings", value: "$50K/year" }
    ]
  },
  {
    id: "workflow-automation",
    title: "Sales Pipeline Automation",
    description: "End-to-end automation system that streamlines lead qualification, follow-ups, and deal progression.",
    impact: "300% increase in lead conversion",
    category: "Workflow Automation",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    href: "#",
    metrics: [
      { label: "Conversion Rate", value: "+300%" },
      { label: "Time Saved", value: "40 hrs/week" },
      { label: "Revenue Growth", value: "+150%" }
    ]
  },
  {
    id: "ai-website",
    title: "AI-Powered E-commerce Platform",
    description: "Smart website with personalized product recommendations and dynamic pricing optimization.",
    impact: "250% boost in sales revenue",
    category: "AI Website Design",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    href: "#",
    metrics: [
      { label: "Sales Increase", value: "+250%" },
      { label: "User Engagement", value: "+180%" },
      { label: "Cart Conversion", value: "+85%" }
    ]
  },
  {
    id: "custom-ai-solution",
    title: "Predictive Analytics Dashboard",
    description: "Custom AI solution for inventory management with demand forecasting and automated reordering.",
    impact: "60% reduction in inventory costs",
    category: "Custom AI Solutions",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    href: "#",
    metrics: [
      { label: "Cost Reduction", value: "60%" },
      { label: "Accuracy", value: "96%" },
      { label: "Efficiency", value: "+400%" }
    ]
  }
];

const categoryIcons = {
  "AI Agents": Bot,
  "Workflow Automation": Workflow,
  "AI Website Design": Globe,
  "Custom AI Solutions": Cpu
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      mass: 0.8,
    },
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
};

const overlayVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

const contentVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
};

function ProjectCard({ project }: { project: PortfolioProject }) {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = categoryIcons[project.category as keyof typeof categoryIcons] || Zap;

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative h-full min-h-[32rem] max-w-full overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-lg"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Glassmorphism overlay on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute inset-0 backdrop-blur-sm bg-black/10 border border-white/10"
          />
        )}
      </AnimatePresence>

      {/* Content */}
      <motion.div
        variants={contentVariants}
        className="absolute inset-0 flex flex-col justify-between p-6 text-white"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm border border-white/20">
              <IconComponent className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="inline-block rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white border border-white/20">
                {project.category}
              </span>
            </div>
          </div>
          <motion.a
            href={project.href}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm border border-white/20 transition-colors hover:bg-white/30"
          >
            <ExternalLink className="h-4 w-4 text-white" />
          </motion.a>
        </motion.div>

        {/* Main Content */}
        <div className="space-y-4">
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold leading-tight text-white mb-2">
              {project.title}
            </h3>
            <p className="text-sm text-white/90 leading-relaxed line-clamp-3">
              {project.description}
            </p>
          </motion.div>

          {/* Impact Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-blue-500/20 backdrop-blur-sm px-4 py-2 border border-white/20"
          >
            <TrendingUp className="h-4 w-4 text-emerald-400" />
            <span className="text-sm font-semibold text-white">
              {project.impact}
            </span>
          </motion.div>

          {/* Metrics */}
          <motion.div variants={itemVariants} className="grid grid-cols-3 gap-3">
            {project.metrics.map((metric, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="rounded-xl bg-white/10 backdrop-blur-sm p-3 border border-white/10"
              >
                <div className="text-lg font-bold text-white">
                  {metric.value}
        </div>
                <div className="text-xs text-white/80">
                  {metric.label}
        </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between pt-2"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-xl bg-white text-black px-4 py-2 text-sm font-semibold transition-all hover:bg-white/90"
            >
              View Case Study
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

const AIPortfolio = ({
  title = "Our AI Automation Success Stories",
  description = "Discover how we've transformed businesses with cutting-edge AI solutions, delivering measurable results and driving unprecedented growth.",
  projects = defaultProjects,
}: AIPortfolioProps) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  return (
    <section id="portfolio" className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-end justify-between">
          <div className="flex flex-col gap-4 max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 md:mb-6"
            >
            <span className="bg-gradient-to-b from-black to-gray-400 bg-clip-text text-transparent">
                {title}
            </span>
            </motion.h2>
          <ScrollReveal
            baseOpacity={0.3}
            enableBlur={true}
            baseRotation={0.5}
            blurStrength={1}
            rotationEnd="center center"
            wordAnimationEnd="center center"
            textClassName="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4"
          >
              {description}
          </ScrollReveal>
        </div>
          <div className="hidden shrink-0 gap-2 md:flex">
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollPrev();
              }}
              disabled={!canScrollPrev}
              className="h-12 w-12 rounded-full border-gray-200 hover:bg-gray-100"
            >
              <ArrowRight className="h-5 w-5 rotate-180" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollNext();
              }}
              disabled={!canScrollNext}
              className="h-12 w-12 rounded-full border-gray-200 hover:bg-gray-100"
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
                  </div>
                </div>
              </div>
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
        >
          <CarouselContent className="ml-0 2xl:ml-[max(8rem,calc(50vw-700px))] 2xl:mr-[max(0rem,calc(50vw-700px))]">
            {projects.map((project, index) => (
              <CarouselItem
                key={project.id}
                className="max-w-[340px] pl-[20px] md:max-w-[380px] lg:max-w-[420px]"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                  }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="mt-8 flex justify-center gap-2">
          {projects.map((_, index) => (
                  <button 
              key={index}
              className={cn(
                "h-2 w-2 rounded-full transition-all duration-300",
                currentSlide === index 
                  ? "bg-black w-8" 
                  : "bg-gray-300 hover:bg-gray-400"
              )}
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIPortfolio;