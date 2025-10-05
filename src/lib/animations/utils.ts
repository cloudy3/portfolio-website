import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Animation utility functions

// Check if element exists and is valid for animation
export const validateAnimationTarget = (
  element: HTMLElement | string | null
): boolean => {
  if (!element) {
    console.warn("Animation target element not found");
    return false;
  }

  if (typeof element === "string") {
    const found = document.querySelector(element);
    if (!found) {
      console.warn(`Animation target selector "${element}" not found`);
      return false;
    }
  }

  return true;
};

// Safe animation wrapper that handles errors
export const safeAnimate = (
  animationFn: () => gsap.core.Timeline | gsap.core.Tween | ScrollTrigger,
  context: string = "animation"
): gsap.core.Timeline | gsap.core.Tween | ScrollTrigger | null => {
  try {
    return animationFn();
  } catch (error) {
    console.error(`GSAP Animation Error in ${context}:`, error);
    return null;
  }
};

// Create a timeline with error handling
export const createSafeTimeline = (
  options?: gsap.TimelineVars
): gsap.core.Timeline => {
  try {
    return gsap.timeline(options);
  } catch (error) {
    console.error("Error creating GSAP timeline:", error);
    return gsap.timeline(); // Return basic timeline as fallback
  }
};

// Batch kill animations for cleanup
export const killAnimations = (
  animations: (gsap.core.Timeline | gsap.core.Tween | ScrollTrigger | null)[]
): void => {
  animations.forEach((animation) => {
    if (animation) {
      try {
        if ("kill" in animation) {
          animation.kill();
        }
      } catch (error) {
        console.warn("Error killing animation:", error);
      }
    }
  });
};

// Get animation duration based on element count for staggered animations
export const calculateStaggeredDuration = (
  elementCount: number,
  baseDuration: number = 0.8,
  stagger: number = 0.1
): number => {
  return baseDuration + (elementCount - 1) * stagger;
};

// Responsive animation options based on screen size
export const getResponsiveAnimationOptions = () => {
  if (typeof window === "undefined") {
    return { duration: 0.8, stagger: 0.1 };
  }

  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth < 1024;

  if (isMobile) {
    return {
      duration: 0.6,
      stagger: 0.05,
      y: 20,
      x: 20,
    };
  }

  if (isTablet) {
    return {
      duration: 0.7,
      stagger: 0.08,
      y: 25,
      x: 30,
    };
  }

  return {
    duration: 0.8,
    stagger: 0.1,
    y: 30,
    x: 50,
  };
};
