import { ComponentPropsWithoutRef, CSSProperties, FC } from "react";
import { cn } from "@/lib/utils";

export interface AnimatedShinyTextProps
  extends ComponentPropsWithoutRef<"span"> {
  shimmerWidth?: number;
}

export const AnimatedShinyText: FC<AnimatedShinyTextProps> = ({
  children,
  className,
  shimmerWidth = 100,
  ...props
}) => {
  return (
    <span
      style={
        {
          "--shiny-width": `${shimmerWidth}px`,
        } as CSSProperties
      }
      className={cn(
        // Base styling
        "inline-block relative",
        
        // Shine effect
        "animate-shiny-text",
        
        // Shine gradient background
        "bg-gradient-to-r from-transparent via-white/80 via-50% to-transparent",
        
        // Ensure text is visible when animation isn't active
        "[&:not(.animate-shiny-text)]:text-current",
        
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
};