"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface SpringConfig {
  damping: number;
  stiffness: number;
  mass: number;
  restDelta: number;
}

interface SmoothCursorProps {
  cursor?: JSX.Element;
  springConfig?: SpringConfig;
  className?: string;
}

const defaultSpringConfig: SpringConfig = {
  damping: 45,
  stiffness: 400,
  mass: 1,
  restDelta: 0.001,
};

const DefaultCursorSVG = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="pointer-events-none"
  >
    <circle
      cx="12"
      cy="12"
      r="8"
      fill="rgba(0, 0, 0, 0.1)"
      stroke="rgba(0, 0, 0, 0.3)"
      strokeWidth="1"
    />
    <circle
      cx="12"
      cy="12"
      r="3"
      fill="rgba(0, 0, 0, 0.6)"
    />
  </svg>
);

export function SmoothCursor({
  cursor = <DefaultCursorSVG />,
  springConfig = defaultSpringConfig,
  className,
}: SmoothCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Motion values for cursor position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animations for smooth movement
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Rotation based on movement direction
  const [rotation, setRotation] = useState(0);
  const lastPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = 0;

    const updateCursor = (e: MouseEvent) => {
      const currentTime = Date.now();
      
      // Throttle updates for better performance
      if (currentTime - lastTime < 16) return; // ~60fps
      lastTime = currentTime;

      const { clientX, clientY } = e;
      
      // Calculate rotation based on movement direction
      const deltaX = clientX - lastPosition.current.x;
      const deltaY = clientY - lastPosition.current.y;
      
      if (Math.abs(deltaX) > 1 || Math.abs(deltaY) > 1) {
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
        setRotation(angle);
        lastPosition.current = { x: clientX, y: clientY };
      }

      // Update motion values
      mouseX.set(clientX);
      mouseY.set(clientY);

      if (!isVisible) {
        setIsVisible(true);
      }
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseDown = () => {
      setIsHovering(true);
    };

    const handleMouseUp = () => {
      setIsHovering(false);
    };

    // Check for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button, a, input, textarea, select, [role="button"], [tabindex]');
      setIsHovering(!!isInteractive);
    };

    // Add event listeners
    document.addEventListener("mousemove", updateCursor);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseOver);

    // Cleanup
    return () => {
      document.removeEventListener("mousemove", updateCursor);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
      
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [mouseX, mouseY, isVisible]);

  // Hide default cursor on desktop
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      * {
        cursor: none !important;
      }
      
      @media (max-width: 768px) {
        * {
          cursor: auto !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      {/* Desktop cursor - hidden on mobile */}
      <motion.div
        ref={cursorRef}
        className={cn(
          "fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block",
          className
        )}
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isVisible ? (isHovering ? 1.5 : 1) : 0,
          rotate: rotation,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          scale: { duration: 0.2, ease: "easeOut" },
          rotate: { duration: 0.3, ease: "easeOut" },
          opacity: { duration: 0.2 },
        }}
      >
        <div className="relative">
          {cursor}
          
          {/* Hover effect ring */}
          {isHovering && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-gray-400"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 2, opacity: 0.3 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          )}
        </div>
      </motion.div>

      {/* Mobile instructions - shown only on mobile */}
      <div className="block md:hidden fixed bottom-4 left-4 right-4 z-50 pointer-events-none">
        <div className="bg-black/80 text-white text-sm px-4 py-2 rounded-lg text-center backdrop-blur-sm">
          Tap anywhere to interact
        </div>
      </div>
    </>
  );
}

// Demo component for testing
export function SmoothCursorDemo() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="text-center space-y-8">
        <div>
          <span className="hidden md:block text-lg text-gray-700">
            Move your mouse around to see the smooth cursor
          </span>
          <span className="block md:hidden text-lg text-gray-700">
            Tap anywhere to see interactions
          </span>
        </div>
        
        <div className="space-y-4">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
            Hover over me
          </button>
          
          <div>
            <a href="#" className="text-blue-500 underline hover:text-blue-700">
              This is a link
            </a>
          </div>
          
          <input
            type="text"
            placeholder="Type here..."
            className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <SmoothCursor />
    </div>
  );
}