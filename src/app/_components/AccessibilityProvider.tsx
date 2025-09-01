"use client";

import { useEffect, ReactNode } from "react";
import {
  createSkipLink,
  LiveRegionManager,
  prefersReducedMotion,
} from "@/lib/accessibility";

interface AccessibilityProviderProps {
  children: ReactNode;
}

/**
 * Accessibility provider that sets up global accessibility features
 */
const AccessibilityProvider = ({ children }: AccessibilityProviderProps) => {
  useEffect(() => {
    // Create skip link
    createSkipLink("main-content", "Skip to main content");

    // Initialize live region manager
    const liveRegionManager = new LiveRegionManager();

    // Add reduced motion class if user prefers reduced motion
    if (prefersReducedMotion()) {
      document.documentElement.classList.add("reduce-motion");
    }

    // Listen for reduced motion preference changes
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        document.documentElement.classList.add("reduce-motion");
      } else {
        document.documentElement.classList.remove("reduce-motion");
      }
    };

    mediaQuery.addEventListener("change", handleMotionChange);

    // Cleanup
    return () => {
      liveRegionManager.destroy();
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return <>{children}</>;
};

export default AccessibilityProvider;
