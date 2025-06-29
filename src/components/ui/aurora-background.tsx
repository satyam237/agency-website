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
        {/* Aurora Wave 1 - Main wave */}
        <div
          className="absolute top-0 left-0 w-[200%] h-32 opacity-60"
          style={{
            background: `
              radial-gradient(ellipse 800px 100px at 50% 0%, 
                rgba(147, 197, 253, 0.8) 0%, 
                rgba(147, 197, 253, 0.4) 30%, 
                transparent 70%
              )
            `,
            animation: 'auroraMove1 12s linear infinite',
            filter: 'blur(2px)',
            maskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)'
          }}
        />
        
        {/* Aurora Wave 2 - Secondary wave */}
        <div
          className="absolute top-4 left-0 w-[180%] h-24 opacity-50"
          style={{
            background: `
              radial-gradient(ellipse 600px 80px at 40% 0%, 
                rgba(196, 181, 253, 0.7) 0%, 
                rgba(196, 181, 253, 0.3) 40%, 
                transparent 80%
              )
            `,
            animation: 'auroraMove2 15s linear infinite',
            filter: 'blur(3px)',
            maskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 100%)'
          }}
        />
        
        {/* Aurora Wave 3 - Accent wave */}
        <div
          className="absolute top-8 left-0 w-[220%] h-20 opacity-40"
          style={{
            background: `
              radial-gradient(ellipse 500px 60px at 60% 0%, 
                rgba(147, 197, 253, 0.6) 0%, 
                rgba(147, 197, 253, 0.2) 50%, 
                transparent 90%
              )
            `,
            animation: 'auroraMove3 18s linear infinite',
            filter: 'blur(4px)',
            maskImage: 'linear-gradient(to bottom, black 0%, black 40%, transparent 100%)'
          }}
        />
        
        {/* Aurora Wave 4 - Subtle background wave */}
        <div
          className="absolute top-12 left-0 w-[160%] h-16 opacity-30"
          style={{
            background: `
              radial-gradient(ellipse 400px 50px at 30% 0%, 
                rgba(196, 181, 253, 0.5) 0%, 
                rgba(196, 181, 253, 0.2) 60%, 
                transparent 100%
              )
            `,
            animation: 'auroraMove4 20s linear infinite',
            filter: 'blur(5px)',
            maskImage: 'linear-gradient(to bottom, black 0%, black 30%, transparent 100%)'
          }}
        />
      </div>
      
      <div className="relative z-10">
        {children}
      </div>
      
      <style jsx>{`
        @keyframes auroraMove1 {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        @keyframes auroraMove2 {
          0% {
            transform: translateX(20%);
          }
          100% {
            transform: translateX(-80%);
          }
        }
        
        @keyframes auroraMove3 {
          0% {
            transform: translateX(10%);
          }
          100% {
            transform: translateX(-110%);
          }
        }
        
        @keyframes auroraMove4 {
          0% {
            transform: translateX(30%);
          }
          100% {
            transform: translateX(-70%);
          }
        }
      `}</style>
    </div>
  );
};