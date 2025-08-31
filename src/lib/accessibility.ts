// Accessibility utilities for cross-browser compatibility

export const addAccessibilityEnhancements = (): void => {
  if (typeof document === "undefined") return;

  // Add skip link for keyboard navigation
  addSkipLink();

  // Enhance focus management
  enhanceFocusManagement();

  // Add ARIA live regions
  addLiveRegions();

  // Handle reduced motion preferences
  handleReducedMotion();

  // Add high contrast support
  addHighContrastSupport();
};

const addSkipLink = (): void => {
  const skipLink = document.createElement("a");
  skipLink.href = "#main-content";
  skipLink.textContent = "Skip to main content";
  skipLink.className =
    "skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded";
  skipLink.style.cssText = `
    position: absolute;
    left: -10000px;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;
  `;

  skipLink.addEventListener("focus", () => {
    skipLink.style.cssText = `
      position: absolute;
      left: 1rem;
      top: 1rem;
      width: auto;
      height: auto;
      overflow: visible;
      z-index: 9999;
      padding: 0.5rem 1rem;
      background: #2563eb;
      color: white;
      border-radius: 0.375rem;
      text-decoration: none;
    `;
  });

  skipLink.addEventListener("blur", () => {
    skipLink.style.cssText = `
      position: absolute;
      left: -10000px;
      top: auto;
      width: 1px;
      height: 1px;
      overflow: hidden;
    `;
  });

  document.body.insertBefore(skipLink, document.body.firstChild);
};

const enhanceFocusManagement = (): void => {
  // Add focus-visible polyfill behavior for older browsers
  let hadKeyboardEvent = true;

  const pointerEvents = ["mousedown", "pointerdown", "touchstart"];
  const keyboardEvents = ["keydown"];

  const onPointerDown = () => {
    hadKeyboardEvent = false;
  };

  const onKeyDown = (e: Event) => {
    const keyboardEvent = e as KeyboardEvent;
    if (
      keyboardEvent.metaKey ||
      keyboardEvent.altKey ||
      keyboardEvent.ctrlKey
    ) {
      return;
    }
    hadKeyboardEvent = true;
  };

  const onFocus = (e: FocusEvent) => {
    const target = e.target as HTMLElement;
    if (target && hadKeyboardEvent) {
      target.classList.add("focus-visible");
    }
  };

  const onBlur = (e: FocusEvent) => {
    const target = e.target as HTMLElement;
    if (target) {
      target.classList.remove("focus-visible");
    }
  };

  pointerEvents.forEach((eventName) => {
    document.addEventListener(eventName, onPointerDown, true);
  });

  keyboardEvents.forEach((eventName) => {
    document.addEventListener(eventName, onKeyDown, true);
  });

  document.addEventListener("focus", onFocus, true);
  document.addEventListener("blur", onBlur, true);
};

const addLiveRegions = (): void => {
  // Add polite live region for announcements
  const politeRegion = document.createElement("div");
  politeRegion.setAttribute("aria-live", "polite");
  politeRegion.setAttribute("aria-atomic", "true");
  politeRegion.className = "sr-only";
  politeRegion.id = "live-region-polite";
  document.body.appendChild(politeRegion);

  // Add assertive live region for urgent announcements
  const assertiveRegion = document.createElement("div");
  assertiveRegion.setAttribute("aria-live", "assertive");
  assertiveRegion.setAttribute("aria-atomic", "true");
  assertiveRegion.className = "sr-only";
  assertiveRegion.id = "live-region-assertive";
  document.body.appendChild(assertiveRegion);
};

const handleReducedMotion = (): void => {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  const handleChange = (mq: MediaQueryList | MediaQueryListEvent) => {
    if (mq.matches) {
      document.documentElement.classList.add("reduce-motion");
    } else {
      document.documentElement.classList.remove("reduce-motion");
    }
  };

  handleChange(mediaQuery);

  // Use addListener for older browsers, addEventListener for newer ones
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener("change", handleChange);
  } else if ("addListener" in mediaQuery) {
    // For older browsers that don't have addEventListener
    (
      mediaQuery as MediaQueryList & {
        addListener: (handler: (mq: MediaQueryList) => void) => void;
      }
    ).addListener(handleChange);
  }
};

const addHighContrastSupport = (): void => {
  const mediaQuery = window.matchMedia("(prefers-contrast: high)");

  const handleChange = (mq: MediaQueryList | MediaQueryListEvent) => {
    if (mq.matches) {
      document.documentElement.classList.add("high-contrast");
    } else {
      document.documentElement.classList.remove("high-contrast");
    }
  };

  handleChange(mediaQuery);

  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener("change", handleChange);
  } else if ("addListener" in mediaQuery) {
    // For older browsers that don't have addEventListener
    (
      mediaQuery as MediaQueryList & {
        addListener: (handler: (mq: MediaQueryList) => void) => void;
      }
    ).addListener(handleChange);
  }
};

export const announceToScreenReader = (
  message: string,
  priority: "polite" | "assertive" = "polite"
): void => {
  const regionId =
    priority === "assertive" ? "live-region-assertive" : "live-region-polite";
  const region = document.getElementById(regionId);

  if (region) {
    region.textContent = message;

    // Clear the message after a short delay to allow for re-announcements
    setTimeout(() => {
      region.textContent = "";
    }, 1000);
  }
};

export const trapFocus = (element: HTMLElement): (() => void) => {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  ) as NodeListOf<HTMLElement>;

  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Tab") {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }

    if (e.key === "Escape") {
      element.dispatchEvent(new CustomEvent("escape-pressed"));
    }
  };

  element.addEventListener("keydown", handleKeyDown);

  // Focus the first focusable element
  if (firstFocusable) {
    firstFocusable.focus();
  }

  // Return cleanup function
  return () => {
    element.removeEventListener("keydown", handleKeyDown);
  };
};
