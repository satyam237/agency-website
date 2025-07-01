import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollFloat = ({
  children,
  scrollContainerRef,
  containerClassName = "",
  textClassName = "",
  animationDuration = 1,
  ease = "power2.out",
  scrollStart = "top 85%",
  scrollEnd = "top 30%",
  stagger = 0.1
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split(" ").map((word, index) => (
      <span className="inline-block word-float" key={index}>
        {word}
        {index < text.split(" ").length - 1 && <span>&nbsp;</span>}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller =
      scrollContainerRef && scrollContainerRef.current
        ? scrollContainerRef.current
        : window;

    const wordElements = el.querySelectorAll(".word-float");
    
    if (wordElements.length === 0) return;

    // Set initial state - make sure text is visible by default
    gsap.set(wordElements, {
      opacity: 1, // Keep visible as fallback
      x: -30, // Start from left
      y: 20, // Slightly below
      scale: 0.9,
      transformOrigin: "center center"
    });

    // Create the floating animation
    gsap.to(wordElements, {
      duration: animationDuration,
      ease: ease,
      x: 0, // Float to original position
      y: 0, // Float up to original position
      scale: 1, // Scale to normal size
      stagger: stagger,
      scrollTrigger: {
        trigger: el,
        scroller,
        start: scrollStart,
        end: scrollEnd,
        scrub: 1,
        toggleActions: "play none none reverse"
      },
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === el) {
          trigger.kill();
        }
      });
    };
  }, [
    children,
    scrollContainerRef,
    animationDuration,
    ease,
    scrollStart,
    scrollEnd,
    stagger
  ]);

  return (
    <h2
      ref={containerRef}
      className={`my-5 overflow-hidden ${containerClassName}`}
    >
      <span
        className={`inline-block text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] ${textClassName}`}
      >
        {splitText}
      </span>
    </h2>
  );
};

export default ScrollFloat;