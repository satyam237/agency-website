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
    <p
      className={cn(
        "mx-auto max-w-md text-neutral-600/70 dark:text-neutral-400/70",
        "animate-shiny-text bg-clip-text bg-no-repeat",
        "[background-position:0_0] [background-size:var(--shiny-width)_100%] [transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite]",
        className,
      )}
      style={{
        "--shiny-width": `${shimmerWidth}px`,
        backgroundImage: `linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.8) 35%, rgba(255,255,255,0.9) 45%, rgba(255,255,255,0.8) 55%, transparent 65%)`,
      } as React.CSSProperties}
    >
      {children}
    </p>
  );
}