import React from 'react';
import { cn } from '@/lib/utils';

interface BentoCardProps {
  name: string;
  className: string;
  background: React.ReactNode;
  Icon: React.ComponentType<{ className?: string }>;
  description: string;
}

export const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
}: BentoCardProps) => (
  <div
    key={name}
    className={cn(
      "group relative flex flex-col justify-between overflow-hidden rounded-xl",
      // light styles only
      "bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300",
      className,
    )}
  >
    <div>{background}</div>
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-2 p-4 md:p-6 transition-all duration-300">
      <Icon className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 origin-left transform-gpu text-gray-700 transition-all duration-300 ease-in-out group-hover:scale-90" />
      <h3 className="text-lg md:text-xl font-semibold text-gray-900 leading-tight">
        {name}
      </h3>
      <p className="text-sm md:text-base text-gray-600 leading-relaxed">{description}</p>
    </div>
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-gray-50/50" />
  </div>
);

export const BentoGrid = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        // Mobile: single column
        "grid w-full gap-4",
        // Small screens: 2 columns
        "sm:grid-cols-2",
        // Medium screens: 3 columns with auto rows
        "md:grid-cols-3 md:auto-rows-[18rem]",
        // Large screens: maintain 3 columns with larger rows
        "lg:auto-rows-[22rem]",
        className,
      )}
    >
      {children}
    </div>
  );
};