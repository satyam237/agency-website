import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

interface AnimatedTextCycleProps {
  words: string[];
  className?: string;
  interval?: number;
}

export function AnimatedTextCycle({ 
  words, 
  className = "", 
  interval = 2500 
}: AnimatedTextCycleProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === words.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);
    
    return () => clearTimeout(timeoutId);
  }, [currentIndex, words.length, interval]);

  return (
    <span className="relative inline-block overflow-hidden">
      {/* Container with proper masking */}
      <div className="relative h-[1.2em] overflow-hidden">
        {words.map((word, index) => (
          <motion.span
            key={index}
            className={`absolute left-0 top-0 whitespace-nowrap ${className}`}
            initial={{ 
              opacity: 0, 
              y: "100%",
              filter: "blur(4px)"
            }}
            animate={
              currentIndex === index
                ? {
                    opacity: 1,
                    y: "0%",
                    filter: "blur(0px)"
                  }
                : {
                    opacity: 0,
                    y: currentIndex > index ? "-100%" : "100%",
                    filter: "blur(4px)"
                  }
            }
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 25,
              mass: 0.5,
              duration: 0.8,
              opacity: { duration: 0.3 },
              filter: { duration: 0.3 }
            }}
            style={{
              transformOrigin: "center center",
            }}
          >
            {word}
          </motion.span>
        ))}
      </div>
      
      {/* Invisible placeholder to maintain layout width */}
      <span className={`invisible ${className}`} aria-hidden="true">
        {words.reduce((longest, word) => 
          word.length > longest.length ? word : longest, ""
        )}
      </span>
    </span>
  );
}