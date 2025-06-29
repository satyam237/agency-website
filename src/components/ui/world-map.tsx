"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
}

export function WorldMap({
  dots = [],
  lineColor = "#0ea5e9",
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (1000 / 360);
    const y = (90 - lat) * (500 / 180);
    return { x, y };
  };

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 100;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  // Simple world map dots pattern
  const generateWorldDots = () => {
    const dots = [];
    const dotColor = "#374151"; // Much darker gray color
    
    // Generate a grid of dots to represent the world map
    for (let x = 50; x < 950; x += 15) {
      for (let y = 50; y < 450; y += 15) {
        // Increased opacity range for better visibility
        const opacity = Math.random() * 0.5 + 0.4; // Range: 0.4 to 0.9
        const size = Math.random() * 1.5 + 0.8; // Slightly larger dots
        
        // Create continent-like clusters
        let shouldShow = false;
        
        // North America
        if (x > 100 && x < 300 && y > 80 && y < 200) shouldShow = Math.random() > 0.3;
        // South America  
        if (x > 150 && x < 250 && y > 200 && y < 350) shouldShow = Math.random() > 0.4;
        // Europe
        if (x > 450 && x < 550 && y > 80 && y < 150) shouldShow = Math.random() > 0.2;
        // Africa
        if (x > 450 && x < 580 && y > 150 && y < 300) shouldShow = Math.random() > 0.3;
        // Asia
        if (x > 580 && x < 800 && y > 80 && y < 250) shouldShow = Math.random() > 0.35;
        // Australia
        if (x > 700 && x < 800 && y > 280 && y < 320) shouldShow = Math.random() > 0.4;
        
        if (shouldShow) {
          dots.push(
            <circle
              key={`dot-${x}-${y}`}
              cx={x}
              cy={y}
              r={size}
              fill={dotColor}
              opacity={opacity}
            />
          );
        }
      }
    }
    return dots;
  };

  return (
    <div className="w-full aspect-[2/1] bg-white rounded-lg relative font-sans overflow-hidden">
      {/* Background world map */}
      <svg
        viewBox="0 0 1000 500"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
        style={{
          maskImage: "linear-gradient(to bottom, transparent, white 10%, white 90%, transparent)"
        }}
      >
        {generateWorldDots()}
      </svg>
      
      {/* Connection lines and points */}
      <svg
        ref={svgRef}
        viewBox="0 0 1000 500"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
      >
        {/* Connection paths */}
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <g key={`path-group-${i}`}>
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="2"
                initial={{
                  pathLength: 0,
                }}
                animate={{
                  pathLength: 1,
                }}
                transition={{
                  duration: 2,
                  delay: 0.5 * i,
                  ease: "easeOut",
                }}
                key={`path-${i}`}
              />
            </g>
          );
        })}

        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Connection points */}
        {dots.map((dot, i) => (
          <g key={`points-group-${i}`}>
            {/* Start point */}
            <g key={`start-${i}`}>
              <circle
                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                r="3"
                fill={lineColor}
              />
              <circle
                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                r="3"
                fill={lineColor}
                opacity="0.5"
              >
                <animate
                  attributeName="r"
                  from="3"
                  to="12"
                  dur="2s"
                  begin="0s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.5"
                  to="0"
                  dur="2s"
                  begin="0s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
            
            {/* End point */}
            <g key={`end-${i}`}>
              <circle
                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                r="3"
                fill={lineColor}
              />
              <circle
                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                r="3"
                fill={lineColor}
                opacity="0.5"
              >
                <animate
                  attributeName="r"
                  from="3"
                  to="12"
                  dur="2s"
                  begin="0s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.5"
                  to="0"
                  dur="2s"
                  begin="0s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
}