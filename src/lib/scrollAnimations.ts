import React from "react";

/**
 * Standardized scroll-triggered animation utilities
 * Ensures consistent animation behavior across all components
 */

export interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  delay?: number;
  stagger?: number;
}

/**
 * Creates a standardized intersection observer for scroll animations
 */
export const createScrollObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: ScrollAnimationOptions = {}
): IntersectionObserver => {
  const { threshold = 0.1, rootMargin = "0px 0px -50px 0px" } = options;

  return new IntersectionObserver(callback, {
    threshold,
    rootMargin,
  });
};

/**
 * Standard animation classes for consistent behavior
 */
export const ANIMATION_CLASSES = {
  // Initial states
  HIDDEN: "opacity-0 translate-y-8",
  HIDDEN_LEFT: "opacity-0 -translate-x-8",
  HIDDEN_RIGHT: "opacity-0 translate-x-8",
  HIDDEN_SCALE: "opacity-0 scale-95",

  // Animated states
  VISIBLE: "opacity-100 translate-y-0",
  VISIBLE_X: "opacity-100 translate-x-0",
  VISIBLE_SCALE: "opacity-100 scale-100",

  // Transition classes
  TRANSITION: "transition-all duration-700 ease-out",
  TRANSITION_FAST: "transition-all duration-500 ease-out",
  TRANSITION_SLOW: "transition-all duration-1000 ease-out",
} as const;

/**
 * Applies staggered animation delays to elements
 */
export const applyStaggeredDelay = (
  elements: NodeListOf<Element> | Element[],
  baseDelay: number = 0,
  staggerAmount: number = 100
): void => {
  Array.from(elements).forEach((element, index) => {
    const delay = baseDelay + index * staggerAmount;
    (element as HTMLElement).style.transitionDelay = `${delay}ms`;
  });
};

/**
 * Standard scroll animation hook for components
 */
export const useScrollAnimation = (
  ref: React.RefObject<HTMLElement>,
  options: ScrollAnimationOptions = {}
) => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = createScrollObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      });
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, isVisible, options]);

  return isVisible;
};

/**
 * Performance-optimized animation utilities
 */
export const PERFORMANCE_OPTIMIZATIONS = {
  // Reduce animations on mobile for better performance
  MOBILE_QUERY: "(max-width: 768px)",

  // Respect user's motion preferences
  REDUCED_MOTION_QUERY: "(prefers-reduced-motion: reduce)",

  // Check if user prefers reduced motion
  prefersReducedMotion: (): boolean => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  },

  // Check if on mobile device
  isMobile: (): boolean => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 768px)").matches;
  },

  // Get appropriate animation duration based on device and preferences
  getAnimationDuration: (baseDuration: number = 700): number => {
    if (PERFORMANCE_OPTIMIZATIONS.prefersReducedMotion()) return 0;
    if (PERFORMANCE_OPTIMIZATIONS.isMobile())
      return Math.max(baseDuration * 0.7, 300);
    return baseDuration;
  },
} as const;

/**
 * Utility to create responsive animation classes
 */
export const createResponsiveAnimationClass = (
  baseClass: string,
  mobileClass?: string,
  reducedMotionClass?: string
): string => {
  let classes = baseClass;

  if (mobileClass) {
    classes += ` md:${baseClass} ${mobileClass}`;
  }

  if (reducedMotionClass) {
    classes += ` motion-reduce:${reducedMotionClass}`;
  }

  return classes;
};
