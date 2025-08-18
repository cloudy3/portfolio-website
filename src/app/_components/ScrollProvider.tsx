"use client";

import { useEffect, useRef } from "react";
import type LocomotiveScroll from "locomotive-scroll";

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
          locomotiveScroll = new LocomotiveScroll({
            el: scrollRef.current,
            smooth: true,
            multiplier: 1,
            class: "is-revealed",
            scrollbarContainer: false,
            lenisOptions: {
              lerp: 0.1,
              duration: 1.2,
              orientation: "vertical",
              gestureOrientation: "vertical",
              smoothWheel: true,
              wheelMultiplier: 1,
              touchMultiplier: 2,
              normalizeWheel: true,
              easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            },
          });

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
