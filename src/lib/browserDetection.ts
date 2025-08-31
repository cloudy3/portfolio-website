// Browser detection utilities for progressive enhancement

export interface BrowserInfo {
  name: string;
  version: string;
  isMobile: boolean;
  isTablet: boolean;
  supportsWebGL: boolean;
  supportsIntersectionObserver: boolean;
  supportsCustomProperties: boolean;
  supportsGrid: boolean;
  supportsBackdropFilter: boolean;
}

export const detectBrowser = (): BrowserInfo => {
  const userAgent = navigator.userAgent.toLowerCase();
  const isClient = typeof window !== "undefined";

  if (!isClient) {
    return {
      name: "unknown",
      version: "0",
      isMobile: false,
      isTablet: false,
      supportsWebGL: false,
      supportsIntersectionObserver: false,
      supportsCustomProperties: false,
      supportsGrid: false,
      supportsBackdropFilter: false,
    };
  }

  // Browser detection
  let browserName = "unknown";
  let browserVersion = "0";

  if (userAgent.includes("chrome") && !userAgent.includes("edg")) {
    browserName = "chrome";
    browserVersion = userAgent.match(/chrome\/(\d+)/)?.[1] || "0";
  } else if (userAgent.includes("firefox")) {
    browserName = "firefox";
    browserVersion = userAgent.match(/firefox\/(\d+)/)?.[1] || "0";
  } else if (userAgent.includes("safari") && !userAgent.includes("chrome")) {
    browserName = "safari";
    browserVersion = userAgent.match(/version\/(\d+)/)?.[1] || "0";
  } else if (userAgent.includes("edg")) {
    browserName = "edge";
    browserVersion = userAgent.match(/edg\/(\d+)/)?.[1] || "0";
  }

  // Device detection
  const isMobile =
    /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      userAgent
    ) || window.innerWidth < 768;
  const isTablet =
    /ipad|android(?!.*mobile)|tablet/i.test(userAgent) ||
    (window.innerWidth >= 768 && window.innerWidth <= 1024);

  // Feature detection
  const supportsWebGL = (() => {
    try {
      const canvas = document.createElement("canvas");
      return !!(
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      );
    } catch {
      return false;
    }
  })();

  const supportsIntersectionObserver = "IntersectionObserver" in window;

  const supportsCustomProperties = (() => {
    try {
      return CSS.supports("--css", "variables");
    } catch {
      return false;
    }
  })();

  const supportsGrid = (() => {
    try {
      return CSS.supports("display", "grid");
    } catch {
      return false;
    }
  })();

  const supportsBackdropFilter = (() => {
    try {
      return (
        CSS.supports("backdrop-filter", "blur(1px)") ||
        CSS.supports("-webkit-backdrop-filter", "blur(1px)")
      );
    } catch {
      return false;
    }
  })();

  return {
    name: browserName,
    version: browserVersion,
    isMobile,
    isTablet,
    supportsWebGL,
    supportsIntersectionObserver,
    supportsCustomProperties,
    supportsGrid,
    supportsBackdropFilter,
  };
};

export const addBrowserClasses = (): void => {
  if (typeof document === "undefined") return;

  const browser = detectBrowser();
  const classes = [
    `browser-${browser.name}`,
    `browser-${browser.name}-${browser.version}`,
    browser.isMobile ? "is-mobile" : "is-desktop",
    browser.isTablet ? "is-tablet" : "",
    browser.supportsWebGL ? "supports-webgl" : "no-webgl",
    browser.supportsIntersectionObserver
      ? "supports-intersection-observer"
      : "no-intersection-observer",
    browser.supportsCustomProperties
      ? "supports-custom-properties"
      : "no-custom-properties",
    browser.supportsGrid ? "supports-grid" : "no-grid",
    browser.supportsBackdropFilter
      ? "supports-backdrop-filter"
      : "no-backdrop-filter",
  ].filter(Boolean);

  document.documentElement.classList.add(...classes);
};

export const isModernBrowser = (): boolean => {
  const browser = detectBrowser();

  // Define minimum versions for modern browser features
  const modernVersions: Record<string, number> = {
    chrome: 60,
    firefox: 55,
    safari: 12,
    edge: 79,
  };

  const minVersion = modernVersions[browser.name];
  if (!minVersion) return false;

  return parseInt(browser.version) >= minVersion;
};

export const shouldUseReducedMotion = (): boolean => {
  if (typeof window === "undefined") return true;

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export const shouldUseHighContrast = (): boolean => {
  if (typeof window === "undefined") return false;

  return window.matchMedia("(prefers-contrast: high)").matches;
};
