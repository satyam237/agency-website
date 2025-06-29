"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-col h-[100vh] items-center justify-center bg-white text-slate-950 transition-bg",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={cn(
            `
            [--aurora:linear-gradient(90deg,transparent_0%,rgba(147,197,253,0.3)_20%,rgba(196,181,253,0.25)_40%,rgba(147,197,253,0.3)_60%,transparent_100%)]
            [background-image:var(--aurora)]
            [background-size:200%_100%]
            [background-position:0%_0%]
            filter blur-[8px]
            after:content-[""] after:absolute after:inset-0 after:[background-image:var(--aurora)]
            after:[background-size:150%_100%] 
            after:animate-aurora after:[background-attachment:fixed]
            pointer-events-none
            absolute inset-0 opacity-60 will-change-transform`,

            showRadialGradient &&
              `[mask-image:linear-gradient(to_bottom,black_0%,black_30%,transparent_70%)]`
          )}
        ></div>
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};