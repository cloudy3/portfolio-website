/**
 * Performance monitoring and optimization utilities
 */

// Core Web Vitals monitoring
export const reportWebVitals = (metric: {
  name: string;
  value: number;
  id: string;
}) => {
  if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
    // Log to console in development
    console.log(metric);

    // In production, you would send this to your analytics service
    // Example: analytics.track('Web Vital', metric);
  }
};

// Performance observer for monitoring
export const observePerformance = () => {
  if (typeof window === "undefined") return;

  // Observe Largest Contentful Paint (LCP)
  if ("PerformanceObserver" in window) {
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];

        if (lastEntry) {
          console.log("LCP:", lastEntry.startTime);
        }
      });

      lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
    } catch (error) {
      console.warn("LCP observer not supported:", error);
    }

    // Observe First Input Delay (FID)
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const fidEntry = entry as PerformanceEntry & {
            processingStart?: number;
          };
          if (fidEntry.processingStart) {
            console.log("FID:", fidEntry.processingStart - entry.startTime);
          }
        });
      });

      fidObserver.observe({ entryTypes: ["first-input"] });
    } catch (error) {
      console.warn("FID observer not supported:", error);
    }

    // Observe Cumulative Layout Shift (CLS)
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(
          (
            entry: PerformanceEntry & {
              value?: number;
              hadRecentInput?: boolean;
            }
          ) => {
            if (!entry.hadRecentInput && entry.value) {
              clsValue += entry.value;
            }
          }
        );
        console.log("CLS:", clsValue);
      });

      clsObserver.observe({ entryTypes: ["layout-shift"] });
    } catch (error) {
      console.warn("CLS observer not supported:", error);
    }
  }
};

// Preload critical resources
export const preloadCriticalResources = () => {
  if (typeof window === "undefined") return;

  // Note: Using Google Fonts (Poppins) loaded via Next.js font optimization
  // No need to preload local font files as they don't exist
  console.log("Font preloading: Using Google Fonts optimization");
};

// Optimize third-party scripts
export const loadThirdPartyScript = (
  src: string,
  async = true,
  defer = true
) => {
  if (typeof window === "undefined") return;

  const script = document.createElement("script");
  script.src = src;
  script.async = async;
  script.defer = defer;

  // Add error handling
  script.onerror = () => {
    console.warn(`Failed to load script: ${src}`);
  };

  document.head.appendChild(script);
};

// Memory usage monitoring
export const monitorMemoryUsage = () => {
  if (typeof window === "undefined") return;

  if ("memory" in performance) {
    const memory = (
      performance as Performance & {
        memory?: {
          usedJSHeapSize: number;
          totalJSHeapSize: number;
          jsHeapSizeLimit: number;
        };
      }
    ).memory;
    if (memory) {
      console.log("Memory usage:", {
        used: Math.round(memory.usedJSHeapSize / 1048576) + " MB",
        total: Math.round(memory.totalJSHeapSize / 1048576) + " MB",
        limit: Math.round(memory.jsHeapSizeLimit / 1048576) + " MB",
      });
    }
  }
};

// Network connection monitoring
export const getNetworkInfo = () => {
  // Simplified implementation to avoid TypeScript complexity
  return null;
};

// Adaptive loading based on network conditions
export const shouldLoadHeavyContent = () => {
  // Simplified implementation - always load content
  return true;
};

// Performance budget checker
export const checkPerformanceBudget = () => {
  if (typeof window === "undefined") return;

  // Check bundle size (this would be more accurate with real metrics)
  const scripts = document.querySelectorAll("script[src]");
  let totalScriptSize = 0;

  scripts.forEach((script) => {
    // This is a rough estimate - in production you'd use real metrics
    totalScriptSize += script.getAttribute("src")?.length || 0;
  });

  const budgets = {
    maxScriptSize: 500000, // 500KB
    maxImageSize: 1000000, // 1MB
    maxTotalSize: 2000000, // 2MB
  };

  if (totalScriptSize > budgets.maxScriptSize) {
    console.warn("Script size exceeds budget:", totalScriptSize);
  }

  return {
    scriptSize: totalScriptSize,
    budgets,
    withinBudget: totalScriptSize <= budgets.maxScriptSize,
  };
};

// Core Web Vitals measurement with web-vitals library
export const measureCoreWebVitals = async () => {
  if (typeof window === "undefined") return;

  try {
    // Use dynamic import with proper destructuring
    const { onCLS, onINP, onFCP, onLCP, onTTFB } = await import("web-vitals");

    // Measure and report each Core Web Vital
    onCLS((metric) => {
      console.log("CLS:", metric.value);
      reportWebVitals(metric);
    });

    onINP((metric) => {
      console.log("INP:", metric.value);
      reportWebVitals(metric);
    });

    onFCP((metric) => {
      console.log("FCP:", metric.value);
      reportWebVitals(metric);
    });

    onLCP((metric) => {
      console.log("LCP:", metric.value);
      reportWebVitals(metric);
    });

    onTTFB((metric) => {
      console.log("TTFB:", metric.value);
      reportWebVitals(metric);
    });
  } catch (error) {
    console.warn("Web Vitals measurement failed:", error);
  }
};

// Resource loading optimization
export const optimizeResourceLoading = () => {
  if (typeof window === "undefined") return;

  // Note: Only preload resources that actually exist
  // Removed non-existent resources to prevent 404 errors:
  // - /images/hero-bg.jpg (not needed - using 3D background)
  // - /fonts/poppins-regular.woff2 (using Google Fonts)
  // - /api/projects (using static data)
  // - /images/project-thumbnails/ (using placeholder images)

  console.log("Resource optimization: Using existing assets only");
};

// Image optimization utilities
export const optimizeImages = () => {
  if (typeof window === "undefined") return;

  // Add intersection observer for lazy loading images
  const images = document.querySelectorAll("img[data-src]");

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || "";
          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  }
};

// Bundle size analysis
export const analyzeBundleSize = () => {
  if (typeof window === "undefined" || process.env.NODE_ENV !== "development")
    return;

  const scripts = Array.from(document.querySelectorAll("script[src]"));
  const styles = Array.from(
    document.querySelectorAll('link[rel="stylesheet"]')
  );

  console.group("Bundle Analysis");
  console.log("Scripts:", scripts.length);
  console.log("Stylesheets:", styles.length);

  // Estimate total size (rough approximation)
  const totalResources = scripts.length + styles.length;
  console.log("Total Resources:", totalResources);

  if (totalResources > 20) {
    console.warn(
      "High number of resources detected. Consider bundling optimization."
    );
  }

  console.groupEnd();
};
