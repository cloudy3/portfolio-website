"use client";

import { useEffect } from "react";
import {
  observePerformance,
  preloadCriticalResources,
  monitorMemoryUsage,
  measureCoreWebVitals,
  optimizeResourceLoading,
  optimizeImages,
  analyzeBundleSize,
} from "@/lib/performance";

/**
 * Performance monitoring component that tracks Core Web Vitals
 * and provides performance insights in development
 */
const PerformanceMonitor = () => {
  useEffect(() => {
    // Initialize performance monitoring
    observePerformance();

    // Measure Core Web Vitals
    measureCoreWebVitals();

    // Optimize resource loading
    optimizeResourceLoading();

    // Optimize images
    optimizeImages();

    // Preload critical resources
    preloadCriticalResources();

    // Analyze bundle size in development
    if (process.env.NODE_ENV === "development") {
      analyzeBundleSize();

      const memoryInterval = setInterval(() => {
        monitorMemoryUsage();
      }, 30000); // Every 30 seconds

      return () => clearInterval(memoryInterval);
    }
  }, []);

  // This component doesn't render anything
  return null;
};

export default PerformanceMonitor;
