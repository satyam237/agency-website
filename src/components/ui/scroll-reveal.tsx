import React, { useEffect, useRef, useMemo, ReactNode, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 1,
  blurStrength = 1.5,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "center center",
  wordAnimationEnd = "center center",
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) {
        return <span key={index}>{word}</span>;
      }
      return (
        <span className="inline-block scroll-reveal-word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    triggersRef.current.forEach(trigger => trigger.kill());
    triggersRef.current = [];

    const scroller =
      scrollContainerRef && scrollContainerRef.current
        ? scrollContainerRef.current
        : window;

    const wordElements = el.querySelectorAll<HTMLElement>(".scroll-reveal-word");

    // Softer rotation animation
    const rotationTrigger = ScrollTrigger.create({
        trigger: el,
        scroller,
        start: "top bottom-=10%",
        end: rotationEnd,
        scrub: 1.5, // Smoother scrub
        animation: gsap.fromTo(el, 
          { transformOrigin: "0% 50%", rotate: baseRotation }, 
          { ease: "power2.out", rotate: 0 }
        )
    });
    triggersRef.current.push(rotationTrigger);

    // Opacity animation - fully reveals at center
    const opacityTrigger = ScrollTrigger.create({
        trigger: el,
        scroller,
        start: "top bottom-=15%",
        end: wordAnimationEnd,
        scrub: 1.2, // Smoother scrub
        animation: gsap.fromTo(wordElements, 
          { opacity: baseOpacity, willChange: "opacity" }, 
          { ease: "power2.out", opacity: 1, stagger: 0.03 }
        )
    });
    triggersRef.current.push(opacityTrigger);

    // Softer blur animation
    if (enableBlur) {
      const blurTrigger = ScrollTrigger.create({
            trigger: el,
            scroller,
            start: "top bottom-=15%",
            end: wordAnimationEnd,
            scrub: 1.2, // Smoother scrub
            animation: gsap.fromTo(wordElements, 
              { filter: `blur(${blurStrength}px)` }, 
              { ease: "power2.out", filter: "blur(0px)", stagger: 0.03 }
            )
        });
        triggersRef.current.push(blurTrigger);
    }

    return () => {
      triggersRef.current.forEach((trigger) => trigger.kill());
      triggersRef.current = [];
    };
  }, [
    children,
    scrollContainerRef,
    enableBlur,
    baseRotation,
    baseOpacity,
    rotationEnd,
    wordAnimationEnd,
    blurStrength,
  ]);

  return (
    <div ref={containerRef} className={`${containerClassName}`}>
      <div className={textClassName}>
        {splitText}
      </div>
    </div>
  );
};