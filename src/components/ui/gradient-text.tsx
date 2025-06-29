"use client";

import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
  duration?: number;
}

const GradientText = forwardRef<HTMLSpanElement, GradientTextProps>(
  ({ children, className, animate = true, duration = 3, ...props }, ref) => {
    return (
      <motion.span
        ref={ref}
        className={cn(
          "inline-block bg-gradient-to-r from-black via-gray-600 to-gray-400 bg-clip-text text-transparent",
          "bg-[length:200%_100%]",
          animate && "animate-gradient-shift",
          className
        )}
        style={{
          backgroundImage: "linear-gradient(90deg, #000000, #4b5563, #6b7280, #9ca3af, #d1d5db, #9ca3af, #6b7280, #4b5563, #000000)",
          animationDuration: `${duration}s`,
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        {...props}
      >
        {children}
      </motion.span>
    );
  }
);

GradientText.displayName = "GradientText";

export { GradientText };