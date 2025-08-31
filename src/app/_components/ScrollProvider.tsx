"use client";

import { useEffect, useRef } from "react";
import type LocomotiveScroll from "locomotive-scroll";
import { detectBrowser, shouldUseReducedMotion } from "@/lib/browserDetection";

interface ScrollProviderProps {
  children: React.ReactNode;
}

export default function ScrollProvider({ children }: ScrollProviderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let locomotiveScroll: LocomotiveScroll | null = null;

    const initScroll = async () => {
      try {
        const LocomotiveScroll = (await import("locomotive-scroll")).default;

        if (scrollRef.current) {
          // Check browser compatibility and user preferences
          const browser = detectBrowser();
          const prefersReducedMotion = shouldUseReducedMotion();

          // Skip smooth scrolling for older browsers or if user prefers reduced motion
          if (prefersReducedMotion || !browser.supportsIntersectionObserver) {
            console.log(
              "Skipping smooth scroll due to browser compatibility or user preferences"
            );
            return;
          }

          // Browser-specific optimizations
          const isOlderSafari =
            browser.name === "safari" && parseInt(browser.version) < 14;
          const isFirefox = browser.name === "firefox";

          locomotiveScroll = new LocomotiveScroll({
            el: scrollRef.current,
            smooth: !browser.isMobile && !isOlderSafari, // Disable on mobile and older Safari
            multiplier: browser.isMobile ? 0.6 : isFirefox ? 0.8 : 1, // Reduced multiplier for Firefox
            class: "is-revealed",
            scrollbarContainer: false,
            lenisOptions: {
              lerp: browser.isMobile ? 0.03 : isOlderSafari ? 0.05 : 0.1,
              duration: browser.isMobile ? 0.6 : isFirefox ? 1.0 : 1.2,
              orientation: "vertical",
              gestureOrientation: "vertical",
              smoothWheel: !browser.isMobile && !isOlderSafari,
              wheelMultiplier: browser.isMobile ? 0.6 : isFirefox ? 0.8 : 1,
              touchMultiplier: browser.isMobile ? 1.2 : 2,
              normalizeWheel: !browser.isMobile && !isOlderSafari,
              easing: (t: number) => {
                if (browser.isMobile || isOlderSafari) return t;
                return Math.min(1, 1.001 - Math.pow(2, -10 * t));
              },
            },
          });

          // Expose Locomotive Scroll instance globally for Navigation component
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (window as any).locomotiveScroll = locomotiveScroll;

          // Update locomotive scroll on window resize
          const handleResize = () => {
            if (locomotiveScroll) {
              locomotiveScroll.update();
            }
          };

          window.addEventListener("resize", handleResize);

          return () => {
            window.removeEventListener("resize", handleResize);
            if (locomotiveScroll) {
              locomotiveScroll.destroy();
            }
          };
        }
      } catch (error) {
        console.warn("Locomotive Scroll could not be initialized:", error);
      }
    };

    // Initialize scroll after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(initScroll, 100);

    return () => {
      clearTimeout(timeoutId);
      if (locomotiveScroll) {
        locomotiveScroll.destroy();
      }
    };
  }, []);

  return (
    <div ref={scrollRef} data-scroll-container>
      {children}
    </div>
  );
}
