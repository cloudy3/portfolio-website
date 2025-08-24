import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Animation configurations
export const ANIMATION_CONFIG = {
  duration: 0.8,
  ease: "power2.out",
  stagger: 0.1,
  delay: 0.2,
} as const;

// Text reveal animation
export const animateTextReveal = (
  element: HTMLElement | HTMLElement[] | string,
  options: {
    delay?: number;
    duration?: number;
    y?: number;
    stagger?: number;
  } = {}
) => {
  const {
    delay = 0,
    duration = ANIMATION_CONFIG.duration,
    y = 30,
    stagger = ANIMATION_CONFIG.stagger,
  } = options;

  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y: y,
    },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease: ANIMATION_CONFIG.ease,
    }
  );
};

// Fade in animation
export const animateFadeIn = (
  element: HTMLElement | HTMLElement[] | string,
  options: {
    delay?: number;
    duration?: number;
    stagger?: number;
  } = {}
) => {
  const {
    delay = 0,
    duration = ANIMATION_CONFIG.duration,
    stagger = ANIMATION_CONFIG.stagger,
  } = options;

  return gsap.fromTo(
    element,
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration,
      delay,
      stagger,
      ease: ANIMATION_CONFIG.ease,
    }
  );
};

// Slide in from left animation
export const animateSlideInLeft = (
  element: HTMLElement | HTMLElement[] | string,
  options: {
    delay?: number;
    duration?: number;
    x?: number;
    stagger?: number;
  } = {}
) => {
  const {
    delay = 0,
    duration = ANIMATION_CONFIG.duration,
    x = -50,
    stagger = ANIMATION_CONFIG.stagger,
  } = options;

  return gsap.fromTo(
    element,
    {
      opacity: 0,
      x: x,
    },
    {
      opacity: 1,
      x: 0,
      duration,
      delay,
      stagger,
      ease: ANIMATION_CONFIG.ease,
    }
  );
};

// Slide in from right animation
export const animateSlideInRight = (
  element: HTMLElement | HTMLElement[] | string,
  options: {
    delay?: number;
    duration?: number;
    x?: number;
    stagger?: number;
  } = {}
) => {
  const {
    delay = 0,
    duration = ANIMATION_CONFIG.duration,
    x = 50,
    stagger = ANIMATION_CONFIG.stagger,
  } = options;

  return gsap.fromTo(
    element,
    {
      opacity: 0,
      x: x,
    },
    {
      opacity: 1,
      x: 0,
      duration,
      delay,
      stagger,
      ease: ANIMATION_CONFIG.ease,
    }
  );
};

// Scale in animation
export const animateScaleIn = (
  element: HTMLElement | HTMLElement[] | string,
  options: {
    delay?: number;
    duration?: number;
    scale?: number;
    stagger?: number;
  } = {}
) => {
  const {
    delay = 0,
    duration = ANIMATION_CONFIG.duration,
    scale = 0.8,
    stagger = ANIMATION_CONFIG.stagger,
  } = options;

  return gsap.fromTo(
    element,
    {
      opacity: 0,
      scale: scale,
    },
    {
      opacity: 1,
      scale: 1,
      duration,
      delay,
      stagger,
      ease: ANIMATION_CONFIG.ease,
    }
  );
};

// Progress bar animation
export const animateProgressBar = (
  element: HTMLElement | HTMLElement[] | string,
  targetWidth: string,
  options: {
    delay?: number;
    duration?: number;
  } = {}
) => {
  const { delay = 0, duration = 1.5 } = options;

  return gsap.fromTo(
    element,
    {
      width: "0%",
    },
    {
      width: targetWidth,
      duration,
      delay,
      ease: "power2.out",
    }
  );
};

// Create scroll trigger animation
export const createScrollTriggerAnimation = (
  element: HTMLElement | HTMLElement[] | string,
  animation: gsap.core.Timeline | gsap.core.Tween,
  options: {
    trigger?: string | HTMLElement;
    start?: string;
    end?: string;
    scrub?: boolean | number;
    toggleActions?: string;
    markers?: boolean;
  } = {}
) => {
  const {
    trigger = element,
    start = "top 80%",
    end = "bottom 20%",
    scrub = false,
    toggleActions = "play none none reverse",
    markers = false,
  } = options;

  return ScrollTrigger.create({
    trigger,
    start,
    end,
    scrub,
    toggleActions,
    markers,
    animation,
  });
};

// Utility function to create staggered animations with scroll trigger
export const createStaggeredScrollAnimation = (
  elements: string | HTMLElement[],
  animationType:
    | "fadeIn"
    | "slideInLeft"
    | "slideInRight"
    | "textReveal"
    | "scaleIn",
  options: {
    trigger?: string | HTMLElement;
    start?: string;
    stagger?: number;
    delay?: number;
    duration?: number;
  } = {}
) => {
  const {
    trigger,
    start = "top 80%",
    stagger = 0.1,
    delay = 0,
    duration = 0.8,
  } = options;

  let animation: gsap.core.Timeline | gsap.core.Tween;

  switch (animationType) {
    case "fadeIn":
      animation = animateFadeIn(elements, { stagger, delay, duration });
      break;
    case "slideInLeft":
      animation = animateSlideInLeft(elements, { stagger, delay, duration });
      break;
    case "slideInRight":
      animation = animateSlideInRight(elements, { stagger, delay, duration });
      break;
    case "textReveal":
      animation = animateTextReveal(elements, { stagger, delay, duration });
      break;
    case "scaleIn":
      animation = animateScaleIn(elements, { stagger, delay, duration });
      break;
    default:
      animation = animateFadeIn(elements, { stagger, delay, duration });
  }

  if (trigger) {
    return createScrollTriggerAnimation(trigger, animation, { start });
  }

  return animation;
};
