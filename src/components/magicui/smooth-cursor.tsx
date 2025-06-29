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

// Black arrow head cursor
const DefaultCursorSVG = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="pointer-events-none"
  >
    {/* Arrow head shape pointing right by default */}
    <path
      d="M2 2L18 10L10 12L8 18L2 2Z"
      fill="#000000"
      stroke="#000000"
      strokeWidth="0.5"
      strokeLinejoin="round"
    />
    {/* Small highlight for depth */}
    <path
      d="M3 3L15 9L9 10.5L7.5 15L3 3Z"
      fill="#000000"
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

  // Rotation and movement tracking
  const [rotation, setRotation] = useState(0);
  const lastPosition = useRef({ x: 0, y: 0, time: 0 });
  const velocityHistory = useRef<Array<{ x: number; y: number; time: number }>>([]);

  useEffect(() => {
    let animationFrameId: number;

    const updateCursor = (e: MouseEvent) => {
      const currentTime = Date.now();
      const { clientX, clientY } = e;
      
      // Calculate movement delta
      const deltaX = clientX - lastPosition.current.x;
      const deltaY = clientY - lastPosition.current.y;
      const deltaTime = currentTime - lastPosition.current.time;
      
      // Only update rotation if there's significant movement
      if ((Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) && deltaTime > 0) {
        // Add current velocity to history
        velocityHistory.current.push({
          x: deltaX / deltaTime,
          y: deltaY / deltaTime,
          time: currentTime
        });
        
        // Keep only recent history (last 150ms for smoother averaging)
        velocityHistory.current = velocityHistory.current.filter(
          v => currentTime - v.time < 150
        );
        
        // Calculate average velocity for smoother direction
        if (velocityHistory.current.length > 2) {
          const avgVelX = velocityHistory.current.reduce((sum, v) => sum + v.x, 0) / velocityHistory.current.length;
          const avgVelY = velocityHistory.current.reduce((sum, v) => sum + v.y, 0) / velocityHistory.current.length;
          
          // Calculate angle from average velocity - this points in the direction of movement
          if (Math.abs(avgVelX) > 0.02 || Math.abs(avgVelY) > 0.02) {
            // atan2 gives us the angle the movement is heading towards
            const angle = Math.atan2(avgVelY, avgVelX) * (180 / Math.PI);
            setRotation(angle);
          }
        }
        
        lastPosition.current = { x: clientX, y: clientY, time: currentTime };
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
      // Clear velocity history when mouse leaves
      velocityHistory.current = [];
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
      const isInteractive = target.closest('button, a, input, textarea, select, [role="button"], [tabindex], .cursor-pointer');
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
          translateX: "-50%", // Center the cursor
          translateY: "-50%",
        }}
        animate={{
          scale: isVisible ? (isHovering ? 1.4 : 1) : 0,
          rotate: rotation,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          scale: { duration: 0.2, ease: "easeOut" },
          rotate: { duration: 0.4, ease: "easeOut" },
          opacity: { duration: 0.2 },
        }}
      >
        <div className="relative">
          {cursor}
          
          {/* Hover effect - subtle glow for arrow */}
          {isHovering && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(0,0,0,0.15) 0%, transparent 70%)",
                width: "32px",
                height: "32px",
                left: "-6px",
                top: "-6px",
              }}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1.8, opacity: 0.7 }}
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
            Move your mouse around - the arrow points in the direction you're moving
          </span>
          <span className="block md:hidden text-lg text-gray-700">
            Tap anywhere to see interactions
          </span>
        </div>
        
        <div className="space-y-4">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer">
            Hover over me
          </button>
          
          <div>
            <a href="#" className="text-blue-500 underline hover:text-blue-700 cursor-pointer">
              This is a link
            </a>
          </div>
          
          <input
            type="text"
            placeholder="Type here..."
            className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          />
          
          <div className="mt-8 p-6 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-600">Move your mouse in circles, straight lines, or any direction - the arrow will point where you're going!</p>
          </div>
        </div>
      </div>
      
      <SmoothCursor />
    </div>
  );
}