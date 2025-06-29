"use client";

import React, { forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface AnimatedBeamProps {
  className?: string;
  containerRef: React.RefObject<HTMLElement>;
  fromRef: React.RefObject<HTMLElement>;
  toRef: React.RefObject<HTMLElement>;
  curvature?: number;
  reverse?: boolean;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  delay?: number;
  duration?: number;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
}

export const AnimatedBeam = forwardRef<SVGSVGElement, AnimatedBeamProps>(
  (
    {
      className,
      containerRef,
      fromRef,
      toRef,
      curvature = 0,
      reverse = false,
      duration = Math.random() * 3 + 4,
      delay = 0,
      pathColor = "#374151",
      pathWidth = 3,
      pathOpacity = 0.6,
      gradientStartColor = "#1f2937",
      gradientStopColor = "#4b5563",
      startXOffset = 0,
      startYOffset = 0,
      endXOffset = 0,
      endYOffset = 0,
    },
    ref
  ) => {
    const id = React.useId();
    const pathRef = useRef<SVGPathElement>(null);

    React.useEffect(() => {
      const updatePath = () => {
        if (containerRef.current && fromRef.current && toRef.current) {
          const containerRect = containerRef.current.getBoundingClientRect();
          const rectA = fromRef.current.getBoundingClientRect();
          const rectB = toRef.current.getBoundingClientRect();

          const svgX = containerRect.left;
          const svgY = containerRect.top;
          const svgWidth = containerRect.width;
          const svgHeight = containerRect.height;

          const startX = rectA.left - svgX + rectA.width / 2 + startXOffset;
          const startY = rectA.top - svgY + rectA.height / 2 + startYOffset;
          const endX = rectB.left - svgX + rectB.width / 2 + endXOffset;
          const endY = rectB.top - svgY + rectB.height / 2 + endYOffset;

          const controlPointX = (startX + endX) / 2;
          const controlPointY = (startY + endY) / 2 + curvature;

          const d = `M ${startX},${startY} Q ${controlPointX},${controlPointY} ${endX},${endY}`;
          
          if (pathRef.current) {
            pathRef.current.setAttribute("d", d);
          }
        }
      };

      // Update path on mount and when refs change
      updatePath();
      
      // Update path on window resize
      window.addEventListener("resize", updatePath);
      return () => window.removeEventListener("resize", updatePath);
    }, [containerRef, fromRef, toRef, curvature, startXOffset, startYOffset, endXOffset, endYOffset]);

    return (
      <svg
        ref={ref}
        fill="none"
        width="100%"
        height="100%"
        className={cn(
          "pointer-events-none absolute left-0 top-0 transform-gpu stroke-2",
          className
        )}
        viewBox={`0 0 ${containerRef.current?.getBoundingClientRect().width || 400} ${
          containerRef.current?.getBoundingClientRect().height || 400
        }`}
      >
        <defs>
          <linearGradient
            className={`${id}`}
            id={`${id}`}
            gradientUnits="userSpaceOnUse"
            x1="0%"
            x2="100%"
            y1="0"
            y2="0"
          >
            <stop offset="0%" stopColor={gradientStartColor} />
            <stop offset="100%" stopColor={gradientStopColor} />
          </linearGradient>
        </defs>
        
        {/* Static path for better visibility */}
        <motion.path
          ref={pathRef}
          d="M 0,0 Q 0,0 0,0"
          stroke={pathColor}
          strokeWidth={pathWidth}
          strokeOpacity={pathOpacity}
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Animated flowing beam */}
        <motion.path
          ref={pathRef}
          d="M 0,0 Q 0,0 0,0"
          stroke={`url(#${id})`}
          strokeWidth={pathWidth + 1}
          strokeOpacity={0.8}
          fill="none"
          strokeLinecap="round"
          initial={{
            strokeDasharray: 1000,
            strokeDashoffset: reverse ? -1000 : 1000,
          }}
          animate={{
            strokeDashoffset: 0,
          }}
          transition={{
            delay,
            duration,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
      </svg>
    );
  }
);

AnimatedBeam.displayName = "AnimatedBeam";