import { gsap } from "gsap";
import { ANIMATION_CONFIG } from "./gsap-config";

// Hero section entrance animations
export const createHeroEntranceAnimation = (elements: {
  title?: HTMLElement | string;
  subtitle?: HTMLElement | string;
  description?: HTMLElement | string;
  buttons?: HTMLElement | string;
}) => {
  const timeline = gsap.timeline();

  // Title animation
  if (elements.title) {
    timeline.fromTo(
      elements.title,
      {
        opacity: 0,
        y: 50,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: ANIMATION_CONFIG.duration,
        ease: ANIMATION_CONFIG.ease,
      }
    );
  }

  // Subtitle animation
  if (elements.subtitle) {
    timeline.fromTo(
      elements.subtitle,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: ANIMATION_CONFIG.duration * 0.8,
        ease: ANIMATION_CONFIG.ease,
      },
      "-=0.4"
    );
  }

  // Description animation
  if (elements.description) {
    timeline.fromTo(
      elements.description,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: ANIMATION_CONFIG.duration * 0.6,
        ease: ANIMATION_CONFIG.ease,
      },
      "-=0.3"
    );
  }

  // Buttons animation
  if (elements.buttons) {
    timeline.fromTo(
      elements.buttons,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: ANIMATION_CONFIG.duration * 0.6,
        ease: ANIMATION_CONFIG.ease,
        stagger: ANIMATION_CONFIG.stagger,
      },
      "-=0.2"
    );
  }

  return timeline;
};

// Hero background animation
export const createHeroBackgroundAnimation = (
  element: HTMLElement | string
) => {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      scale: 1.1,
    },
    {
      opacity: 1,
      scale: 1,
      duration: ANIMATION_CONFIG.duration * 1.5,
      ease: "power2.out",
    }
  );
};
