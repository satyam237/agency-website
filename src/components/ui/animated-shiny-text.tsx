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
        "inline-block animate-shiny-text bg-clip-text text-transparent bg-gradient-to-r",
        "from-current via-white to-current bg-[length:200%_100%]",
        className,
      )}
      style={{
        backgroundImage: `linear-gradient(110deg, currentColor 25%, rgba(255,255,255,0.8) 35%, rgba(255,255,255,1) 45%, rgba(255,255,255,0.8) 55%, currentColor 65%)`,
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      } as React.CSSProperties}
    >
      {children}
    </span>
  );
}