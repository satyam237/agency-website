"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import DottedMap from "dotted-map";
import proj4 from "proj4";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
}

export function WorldMapNew({
  dots = [],
  lineColor = "#0ea5e9",
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [svgMap, setSvgMap] = useState<string>("");

  useEffect(() => {
    const loadMap = async () => {
      try {
        // Make proj4 globally available for DottedMap
        if (typeof window !== 'undefined') {
          (window as any).proj4 = proj4;
        }

        const map = new DottedMap({ height: 100, grid: "diagonal" });

        const svg = map.getSVG({
          radius: 0.22,
          color: "#00000040",
          shape: "circle",
          backgroundColor: "white",
        });

        setSvgMap(svg);
      } catch (error) {
        console.error('Error loading map:', error);
        // Use fallback map
        setSvgMap(createFallbackWorldMap());
      }
    };

    loadMap();
  }, []);

  const createFallbackWorldMap = () => {
    const bgColor = "#ffffff";
    const dotColor = "#00000040";
    
    return `<svg viewBox="0 0 1056 495" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${bgColor}"/>
      ${generateDottedWorldSVG(dotColor)}
    </svg>`;
  };

  const generateDottedWorldSVG = (color: string) => {
    const dots = [];
    // Create a dotted pattern resembling world continents
    for (let x = 0; x < 1056; x += 8) {
      for (let y = 0; y < 495; y += 8) {
        // Create continent-like patterns
        let shouldShow = false;
        const random = Math.random();
        
        // North America
        if (x > 100 && x < 350 && y > 80 && y < 250) {
          shouldShow = random > 0.6;
        }
        // South America
        else if (x > 200 && x < 320 && y > 250 && y < 400) {
          shouldShow = random > 0.7;
        }
        // Europe
        else if (x > 450 && x < 550 && y > 80 && y < 180) {
          shouldShow = random > 0.5;
        }
        // Africa
        else if (x > 480 && x < 600 && y > 180 && y < 350) {
          shouldShow = random > 0.6;
        }
        // Asia
        else if (x > 600 && x < 900 && y > 80 && y < 300) {
          shouldShow = random > 0.65;
        }
        // Australia
        else if (x > 800 && x < 900 && y > 350 && y < 400) {
          shouldShow = random > 0.7;
        }
        
        if (shouldShow) {
          dots.push(`<circle cx="${x}" cy="${y}" r="0.8" fill="${color}"/>`);
        }
      }
    }
    return dots.join('');
  };

  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  return (
    <div className="w-full aspect-[2/1] bg-white rounded-lg relative font-sans">
      {svgMap && (
        <img
          src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
          className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none"
          alt="world map"
          height="495"
          width="1056"
          draggable={false}
        />
      )}
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
      >
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <g key={`path-group-${i}`}>
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="1"
                initial={{
                  pathLength: 0,
                }}
                animate={{
                  pathLength: 1,
                }}
                transition={{
                  duration: 1,
                  delay: 0.5 * i,
                  ease: "easeOut",
                }}
                key={`start-upper-${i}`}
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

        {dots.map((dot, i) => (
          <g key={`points-group-${i}`}>
            <g key={`start-${i}`}>
              <circle
                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                r="2"
                fill={lineColor}
              />
              <circle
                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                r="2"
                fill={lineColor}
                opacity="0.5"
              >
                <animate
                  attributeName="r"
                  from="2"
                  to="8"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.5"
                  to="0"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
            <g key={`end-${i}`}>
              <circle
                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                r="2"
                fill={lineColor}
              />
              <circle
                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                r="2"
                fill={lineColor}
                opacity="0.5"
              >
                <animate
                  attributeName="r"
                  from="2"
                  to="8"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.5"
                  to="0"
                  dur="1.5s"
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