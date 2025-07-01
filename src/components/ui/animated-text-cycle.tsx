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
    <span className={`relative inline-block ${className}`}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="absolute left-0 top-0 whitespace-nowrap"
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={
            currentIndex === index
              ? {
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                }
              : {
                  opacity: 0,
                  y: currentIndex > index ? -50 : 50,
                  rotateX: currentIndex > index ? 90 : -90,
                }
          }
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            mass: 0.8,
            duration: 0.6,
          }}
          style={{
            transformOrigin: "center center",
            transformStyle: "preserve-3d",
          }}
        >
          {word}
        </motion.span>
      ))}
      {/* Invisible placeholder to maintain layout */}
      <span className="invisible">
        {words.reduce((longest, word) => 
          word.length > longest.length ? word : longest, ""
        )}
      </span>
    </span>
  );
}