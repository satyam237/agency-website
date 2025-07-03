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
        // Base text styling
        "inline-block",
        
        // Shine effect with proper background setup
        "animate-shiny-text bg-clip-text bg-no-repeat",
        
        // Shine gradient - works for both light and dark themes
        "bg-gradient-to-r from-transparent via-current via-50% to-transparent",
        
        // Default text color that will be enhanced by the shine
        "text-current",
        
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
};