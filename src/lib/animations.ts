// Animation utilities and configurations for GSAP and other animation libraries

export interface AnimationConfig {
  duration: number;
  delay?: number;
  ease?: string;
  stagger?: number;
}

// Default animation configurations
export const ANIMATION_CONFIGS = {
  // Fade animations
  fadeIn: {
    duration: 0.8,
    ease: "power2.out",
  },
  fadeInUp: {
    duration: 0.8,
    ease: "power2.out",
    y: 30,
    opacity: 0,
  },
  fadeInDown: {
    duration: 0.8,
    ease: "power2.out",
    y: -30,
    opacity: 0,
  },
  fadeInLeft: {
    duration: 0.8,
    ease: "power2.out",
    x: -30,
    opacity: 0,
  },
  fadeInRight: {
    duration: 0.8,
    ease: "power2.out",
    x: 30,
    opacity: 0,
  },

  // Scale animations
  scaleIn: {
    duration: 0.6,
    ease: "back.out(1.7)",
    scale: 0,
    opacity: 0,
  },

  // Stagger animations
  staggerChildren: {
    duration: 0.6,
    ease: "power2.out",
    stagger: 0.1,
  },

  // Hover animations
  hover: {
    duration: 0.3,
    ease: "power2.out",
  },

  // Page transitions
  pageTransition: {
    duration: 0.5,
    ease: "power2.inOut",
  },
} as const;

// Easing functions
export const EASING = {
  easeInOut: "power2.inOut",
  easeOut: "power2.out",
  easeIn: "power2.in",
  bounce: "back.out(1.7)",
  elastic: "elastic.out(1, 0.3)",
} as const;

// Animation timing constants
export const TIMING = {
  fast: 0.3,
  normal: 0.6,
  slow: 1.0,
  verySlow: 1.5,
} as const;

// Scroll animation thresholds
export const SCROLL_THRESHOLDS = {
  start: 0.1,
  center: 0.5,
  end: 0.9,
} as const;

// Utility function to create staggered animation delays
export const createStaggerDelay = (
  index: number,
  baseDelay: number = 0.1
): number => {
  return baseDelay * index;
};

// Utility function to get random animation delay
export const getRandomDelay = (min: number = 0, max: number = 0.5): number => {
  return Math.random() * (max - min) + min;
};
