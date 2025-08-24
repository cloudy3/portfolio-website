import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  animateTextReveal,
  animateFadeIn,
  animateSlideInLeft,
  animateSlideInRight,
  animateScaleIn,
  animateProgressBar,
  createScrollTriggerAnimation,
} from "./animations";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface UseScrollAnimationOptions {
  trigger?: string;
  start?: string;
  end?: string;
  toggleActions?: string;
  scrub?: boolean | number;
  markers?: boolean;
  delay?: number;
  duration?: number;
  stagger?: number;
}

export const useScrollAnimation = () => {
  const animationsRef = useRef<ScrollTrigger[]>([]);

  // Cleanup function
  const cleanup = () => {
    animationsRef.current.forEach((trigger) => {
      trigger.kill();
    });
    animationsRef.current = [];
  };

  // Text reveal animation with scroll trigger
  const animateTextOnScroll = (
    elements: string | HTMLElement[],
    options: UseScrollAnimationOptions = {}
  ) => {
    const {
      trigger,
      start = "top 80%",
      toggleActions = "play none none reverse",
      delay = 0,
      duration = 0.8,
      stagger = 0.1,
    } = options;

    const animation = animateTextReveal(elements, { delay, duration, stagger });

    if (trigger || typeof elements === "string") {
      const scrollTrigger = createScrollTriggerAnimation(
        trigger || elements,
        animation,
        { start, toggleActions }
      );
      animationsRef.current.push(scrollTrigger);
      return scrollTrigger;
    }

    return animation;
  };

  // Fade in animation with scroll trigger
  const animateFadeOnScroll = (
    elements: string | HTMLElement[],
    options: UseScrollAnimationOptions = {}
  ) => {
    const {
      trigger,
      start = "top 80%",
      toggleActions = "play none none reverse",
      delay = 0,
      duration = 0.8,
      stagger = 0.1,
    } = options;

    const animation = animateFadeIn(elements, { delay, duration, stagger });

    if (trigger || typeof elements === "string") {
      const scrollTrigger = createScrollTriggerAnimation(
        trigger || elements,
        animation,
        { start, toggleActions }
      );
      animationsRef.current.push(scrollTrigger);
      return scrollTrigger;
    }

    return animation;
  };

  // Slide in from left with scroll trigger
  const animateSlideLeftOnScroll = (
    elements: string | HTMLElement[],
    options: UseScrollAnimationOptions = {}
  ) => {
    const {
      trigger,
      start = "top 80%",
      toggleActions = "play none none reverse",
      delay = 0,
      duration = 0.8,
      stagger = 0.1,
    } = options;

    const animation = animateSlideInLeft(elements, {
      delay,
      duration,
      stagger,
    });

    if (trigger || typeof elements === "string") {
      const scrollTrigger = createScrollTriggerAnimation(
        trigger || elements,
        animation,
        { start, toggleActions }
      );
      animationsRef.current.push(scrollTrigger);
      return scrollTrigger;
    }

    return animation;
  };

  // Slide in from right with scroll trigger
  const animateSlideRightOnScroll = (
    elements: string | HTMLElement[],
    options: UseScrollAnimationOptions = {}
  ) => {
    const {
      trigger,
      start = "top 80%",
      toggleActions = "play none none reverse",
      delay = 0,
      duration = 0.8,
      stagger = 0.1,
    } = options;

    const animation = animateSlideInRight(elements, {
      delay,
      duration,
      stagger,
    });

    if (trigger || typeof elements === "string") {
      const scrollTrigger = createScrollTriggerAnimation(
        trigger || elements,
        animation,
        { start, toggleActions }
      );
      animationsRef.current.push(scrollTrigger);
      return scrollTrigger;
    }

    return animation;
  };

  // Scale in animation with scroll trigger
  const animateScaleOnScroll = (
    elements: string | HTMLElement[],
    options: UseScrollAnimationOptions = {}
  ) => {
    const {
      trigger,
      start = "top 80%",
      toggleActions = "play none none reverse",
      delay = 0,
      duration = 0.8,
      stagger = 0.1,
    } = options;

    const animation = animateScaleIn(elements, { delay, duration, stagger });

    if (trigger || typeof elements === "string") {
      const scrollTrigger = createScrollTriggerAnimation(
        trigger || elements,
        animation,
        { start, toggleActions }
      );
      animationsRef.current.push(scrollTrigger);
      return scrollTrigger;
    }

    return animation;
  };

  // Progress bar animation with scroll trigger
  const animateProgressOnScroll = (
    elements: string | HTMLElement[],
    targetWidths: string[],
    options: UseScrollAnimationOptions = {}
  ) => {
    const {
      trigger,
      start = "top 80%",
      toggleActions = "play none none reverse",
      delay = 0,
      duration = 1.5,
      stagger = 0.1,
    } = options;

    const timeline = gsap.timeline();

    if (typeof elements === "string") {
      const elementList = document.querySelectorAll(elements);
      elementList.forEach((element, index) => {
        const targetWidth = targetWidths[index] || "100%";
        timeline.add(
          animateProgressBar(element as HTMLElement, targetWidth, {
            delay: delay + index * stagger,
            duration,
          }),
          index * stagger
        );
      });
    } else {
      elements.forEach((element, index) => {
        const targetWidth = targetWidths[index] || "100%";
        timeline.add(
          animateProgressBar(element, targetWidth, {
            delay: delay + index * stagger,
            duration,
          }),
          index * stagger
        );
      });
    }

    if (trigger || typeof elements === "string") {
      const scrollTrigger = createScrollTriggerAnimation(
        trigger || elements,
        timeline,
        { start, toggleActions }
      );
      animationsRef.current.push(scrollTrigger);
      return scrollTrigger;
    }

    return timeline;
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, []);

  return {
    animateTextOnScroll,
    animateFadeOnScroll,
    animateSlideLeftOnScroll,
    animateSlideRightOnScroll,
    animateScaleOnScroll,
    animateProgressOnScroll,
    cleanup,
  };
};
