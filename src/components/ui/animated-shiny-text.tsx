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
        backgroundImage: `linear-gradient(110deg, #000000 25%, #C0C0C0 35%, #E5E7EB 45%, #C0C0C0 55%, #000000 65%)`,
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