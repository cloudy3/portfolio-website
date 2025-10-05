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

// GSAP setup and configuration
export const setupGSAP = () => {
  if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    // Set default ease
    gsap.defaults({
      ease: ANIMATION_CONFIG.ease,
      duration: ANIMATION_CONFIG.duration,
    });
  }
};

// Cleanup all GSAP animations and ScrollTriggers
export const cleanupGSAP = () => {
  if (typeof window !== "undefined") {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    gsap.killTweensOf("*");
  }
};
