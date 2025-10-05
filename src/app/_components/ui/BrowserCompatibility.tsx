"use client";

import { useEffect } from "react";
import {
  addBrowserClasses,
  isModernBrowser,
  shouldUseReducedMotion,
} from "@/lib/browserDetection";

export default function BrowserCompatibility() {
  useEffect(() => {
    // Add browser-specific classes to document
    addBrowserClasses();

    // Show warning for unsupported browsers
    if (!isModernBrowser()) {
      console.warn(
        "You are using an older browser. Some features may not work as expected. " +
          "Please consider updating to a modern browser for the best experience."
      );
    }

    // Apply reduced motion preferences
    if (shouldUseReducedMotion()) {
      document.documentElement.classList.add("prefers-reduced-motion");
    }

    // Accessibility enhancements are now handled by AccessibilityProvider

    // Add polyfills for older browsers
    loadPolyfills();
  }, []);

  const loadPolyfills = () => {
    // Basic IntersectionObserver fallback
    if (!("IntersectionObserver" in window)) {
      console.warn(
        "IntersectionObserver not supported. Some animations may not work."
      );
      // Create a basic fallback that immediately triggers callbacks
      class IntersectionObserverPolyfill {
        private callback: IntersectionObserverCallback;

        constructor(callback: IntersectionObserverCallback) {
          this.callback = callback;
        }

        observe(element: Element) {
          // Immediately trigger as if element is visible
          setTimeout(() => {
            const entry: IntersectionObserverEntry = {
              isIntersecting: true,
              target: element,
              intersectionRatio: 1,
              boundingClientRect: element.getBoundingClientRect(),
              intersectionRect: element.getBoundingClientRect(),
              rootBounds: null,
              time: Date.now(),
            };
            this.callback([entry], this as unknown as IntersectionObserver);
          }, 100);
        }

        unobserve() {}
        disconnect() {}
      }

      (
        window as unknown as {
          IntersectionObserver: typeof IntersectionObserverPolyfill;
        }
      ).IntersectionObserver = IntersectionObserverPolyfill;
    }

    // Basic ResizeObserver fallback
    if (!("ResizeObserver" in window)) {
      console.warn(
        "ResizeObserver not supported. Using window resize events as fallback."
      );

      class ResizeObserverPolyfill {
        private callback: ResizeObserverCallback;
        private handleResize: () => void;

        constructor(callback: ResizeObserverCallback) {
          this.callback = callback;
          this.handleResize = () => {
            this.callback([], this as unknown as ResizeObserver);
          };
          window.addEventListener("resize", this.handleResize);
        }

        observe() {}
        unobserve() {}

        disconnect() {
          window.removeEventListener("resize", this.handleResize);
        }
      }

      (
        window as unknown as { ResizeObserver: typeof ResizeObserverPolyfill }
      ).ResizeObserver = ResizeObserverPolyfill;
    }

    // Basic smooth scroll fallback
    if (!CSS.supports("scroll-behavior", "smooth")) {
      console.warn(
        "Smooth scrolling not supported. Falling back to instant scroll."
      );
      // Note: ScrollProvider will handle smooth scroll fallback behavior
      // by disabling smooth scrolling for browsers that don't support it
    }
  };

  return null; // This component doesn't render anything
}
