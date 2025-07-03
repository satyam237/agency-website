"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface AnimatedShinyTextProps {
  children: React.ReactNode;
  className?: string;
  shimmerWidth?: number;
}

export function AnimatedShinyText({
  children,
  className,
  shimmerWidth = 100,
}: AnimatedShinyTextProps) {
  return (
    <span
      className={cn(
        "inline-block animate-shiny-text bg-clip-text text-transparent",
        className,
      )}
      style={{
        backgroundImage: `linear-gradient(110deg, #6b7280 25%, rgba(255,255,255,0.8) 35%, rgba(255,255,255,1) 45%, rgba(255,255,255,0.8) 55%, #6b7280 65%)`,
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        '--shiny-width': `${shimmerWidth}px`,
      } as React.CSSProperties}
    >
      {children}
    </span>
  );
}