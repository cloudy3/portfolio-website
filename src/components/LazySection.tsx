"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface LazySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  threshold?: number;
  rootMargin?: string;
  className?: string;
}

/**
 * LazySection component that loads content when it comes into view
 * Useful for performance optimization of below-the-fold content
 */
export const LazySection = ({
  children,
  fallback,
  threshold = 0.1,
  rootMargin = "100px",
  className = "",
}: LazySectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasLoaded) {
            setIsVisible(true);
            setHasLoaded(true);
            // Disconnect observer after loading to prevent re-triggering
            observer.disconnect();
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, [threshold, rootMargin, hasLoaded]);

  const defaultFallback = (
    <div className="flex items-center justify-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
    </div>
  );

  return (
    <div ref={sectionRef} className={className}>
      {isVisible ? children : fallback || defaultFallback}
    </div>
  );
};

export default LazySection;
