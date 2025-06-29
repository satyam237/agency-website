import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface Item {
  name: string;
  description: string;
  icon: string;
  color: string;
  time: string;
}

let notifications = [
  {
    name: "AI Agent Deployed",
    description: "Customer service automation is now live",
    time: "15m ago",
    icon: "🤖",
    color: "#00C9A7",
  },
  {
    name: "Calendar Integration",
    description: "Google Calendar sync completed successfully",
    time: "10m ago",
    icon: "📅",
    color: "#FFB800",
  },
  {
    name: "Document Processed",
    description: "OCR analysis completed for invoice batch",
    time: "5m ago",
    icon: "📄",
    color: "#FF3D71",
  },
  {
    name: "MCP Server Connected",
    description: "New integration endpoint established",
    time: "2m ago",
    icon: "🔗",
    color: "#1E86FF",
  },
  {
    name: "Meeting Scheduled",
    description: "AI assistant booked client consultation",
    time: "1m ago",
    icon: "📞",
    color: "#9C27B0",
  },
];

const Notification = ({ name, description, icon, color, time }: Item) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[350px] md:max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-3 md:p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles only
        "bg-white border border-gray-200 shadow-sm hover:shadow-md",
      )}
    >
      <div className="flex flex-row items-center gap-2 md:gap-3">
        <div
          className="flex size-8 md:size-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-sm md:text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-sm md:text-lg font-medium text-gray-900">
            <span className="text-xs sm:text-sm md:text-base">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-xs md:text-sm font-normal text-gray-600">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

export function AnimatedList({
  className,
}: {
  className?: string;
}) {
  const [messages, setMessages] = useState(notifications);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessages((prev) => {
        const newMessages = [...prev.slice(1), prev[0]];
        return newMessages;
      });
      setIndex((prev) => (prev + 1) % notifications.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const animatedMessages = useMemo(() => {
    return messages.slice(0, 3);
  }, [messages]);

  return (
    <div className={cn("relative flex h-[400px] md:h-[500px] w-full flex-col p-4 md:p-6 overflow-hidden", className)}>
      <AnimatePresence>
        {animatedMessages.map((item, idx) => (
          <motion.div
            key={item.name + idx}
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.3 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute w-full"
            style={{
              top: idx * 80 + (idx * 10), // Responsive spacing
            }}
          >
            <Notification {...item} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}