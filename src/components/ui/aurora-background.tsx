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
        {/* First Aurora Wave */}
        <div
          className={cn(
            `
            absolute inset-0 opacity-40
            [background:linear-gradient(110deg,transparent_25%,rgba(147,197,253,0.6)_35%,rgba(196,181,253,0.5)_45%,rgba(147,197,253,0.6)_55%,transparent_65%)]
            [background-size:300%_100%]
            animate-aurora
            filter blur-[12px]
            `,
            showRadialGradient &&
              `[mask-image:linear-gradient(to_bottom,black_0%,black_40%,transparent_80%)]`
          )}
        ></div>
        
        {/* Second Aurora Wave - Different timing */}
        <div
          className={cn(
            `
            absolute inset-0 opacity-30
            [background:linear-gradient(70deg,transparent_20%,rgba(196,181,253,0.4)_30%,rgba(147,197,253,0.5)_40%,rgba(196,181,253,0.4)_50%,transparent_60%)]
            [background-size:250%_100%]
            [animation:aurora_45s_linear_infinite_reverse]
            filter blur-[8px]
            `,
            showRadialGradient &&
              `[mask-image:linear-gradient(to_bottom,black_0%,black_35%,transparent_75%)]`
          )}
        ></div>
        
        {/* Third Aurora Wave - Subtle overlay */}
        <div
          className={cn(
            `
            absolute inset-0 opacity-25
            [background:linear-gradient(130deg,transparent_30%,rgba(147,197,253,0.3)_40%,rgba(196,181,253,0.4)_50%,rgba(147,197,253,0.3)_60%,transparent_70%)]
            [background-size:400%_100%]
            [animation:aurora_80s_linear_infinite]
            filter blur-[6px]
            `,
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