/**
 * Lighthouse configuration for comprehensive performance audit
 */

module.exports = {
  extends: "lighthouse:default",
  settings: {
    // Audit specific form factors
    formFactor: "desktop",
    throttling: {
      rttMs: 40,
      throughputKbps: 10240,
      cpuSlowdownMultiplier: 1,
      requestLatencyMs: 0,
      downloadThroughputKbps: 0,
      uploadThroughputKbps: 0,
    },
    screenEmulation: {
      mobile: false,
      width: 1350,
      height: 940,
      deviceScaleFactor: 1,
      disabled: false,
    },
    emulatedUserAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.109 Safari/537.36 Chrome-Lighthouse",
  },
  audits: [
    // Core Web Vitals
    "largest-contentful-paint",
    "first-contentful-paint",
    "cumulative-layout-shift",
    "total-blocking-time",

    // Performance audits
    "speed-index",
    "interactive",
    "first-meaningful-paint",
    "estimated-input-latency",

    // Resource audits
    "unused-css-rules",
    "unused-javascript",
    "modern-image-formats",
    "uses-optimized-images",
    "uses-webp-images",
    "uses-responsive-images",
    "efficient-animated-content",

    // Network audits
    "uses-http2",
    "uses-long-cache-ttl",
    "total-byte-weight",
    "dom-size",

    // Accessibility audits
    "color-contrast",
    "image-alt",
    "label",
    "link-name",
    "button-name",
    "document-title",
    "html-has-lang",
    "html-lang-valid",
    "meta-description",
    "heading-order",
    "landmark-one-main",
    "list",
    "listitem",
    "definition-list",
    "dlitem",
    "bypass",
    "focus-traps",
    "focusable-controls",
    "interactive-element-affordance",
    "logical-tab-order",
    "managed-focus",
    "offscreen-content-hidden",
    "use-landmarks",
    "visual-order-follows-dom",

    // Best practices
    "uses-https",
    "is-on-https",
    "redirects-http",
    "geolocation-on-start",
    "notification-on-start",
    "no-vulnerable-libraries",
    "js-libraries",
    "deprecations",
    "third-party-summary",

    // SEO audits
    "viewport",
    "font-size",
    "tap-targets",
    "hreflang",
    "canonical",
    "robots-txt",
    "structured-data",
  ],
  categories: {
    performance: {
      title: "Performance",
      auditRefs: [
        { id: "first-contentful-paint", weight: 10, group: "metrics" },
        { id: "largest-contentful-paint", weight: 25, group: "metrics" },
        { id: "speed-index", weight: 10, group: "metrics" },
        { id: "cumulative-layout-shift", weight: 25, group: "metrics" },
        { id: "total-blocking-time", weight: 30, group: "metrics" },
        { id: "unused-css-rules", weight: 0, group: "load-opportunities" },
        { id: "unused-javascript", weight: 0, group: "load-opportunities" },
        { id: "modern-image-formats", weight: 0, group: "load-opportunities" },
        { id: "uses-optimized-images", weight: 0, group: "load-opportunities" },
        { id: "uses-webp-images", weight: 0, group: "load-opportunities" },
        {
          id: "uses-responsive-images",
          weight: 0,
          group: "load-opportunities",
        },
        {
          id: "efficient-animated-content",
          weight: 0,
          group: "load-opportunities",
        },
        { id: "uses-http2", weight: 0, group: "diagnostics" },
        { id: "uses-long-cache-ttl", weight: 0, group: "diagnostics" },
        { id: "total-byte-weight", weight: 0, group: "diagnostics" },
        { id: "dom-size", weight: 0, group: "diagnostics" },
      ],
    },
    accessibility: {
      title: "Accessibility",
      description:
        "These checks highlight opportunities to improve the accessibility of your web app.",
      auditRefs: [
        { id: "color-contrast", weight: 3, group: "a11y-color-contrast" },
        { id: "image-alt", weight: 10, group: "a11y-names-labels" },
        { id: "label", weight: 10, group: "a11y-names-labels" },
        { id: "link-name", weight: 3, group: "a11y-names-labels" },
        { id: "button-name", weight: 10, group: "a11y-names-labels" },
        { id: "document-title", weight: 3, group: "a11y-names-labels" },
        { id: "html-has-lang", weight: 3, group: "a11y-language" },
        { id: "html-lang-valid", weight: 3, group: "a11y-language" },
        { id: "heading-order", weight: 2, group: "a11y-navigation" },
        { id: "landmark-one-main", weight: 3, group: "a11y-navigation" },
        { id: "list", weight: 3, group: "a11y-tables-lists" },
        { id: "listitem", weight: 3, group: "a11y-tables-lists" },
        { id: "definition-list", weight: 3, group: "a11y-tables-lists" },
        { id: "dlitem", weight: 3, group: "a11y-tables-lists" },
        { id: "bypass", weight: 3, group: "a11y-navigation" },
        { id: "focus-traps", weight: 3, group: "a11y-keyboard" },
        { id: "focusable-controls", weight: 3, group: "a11y-keyboard" },
        {
          id: "interactive-element-affordance",
          weight: 3,
          group: "a11y-keyboard",
        },
        { id: "logical-tab-order", weight: 3, group: "a11y-keyboard" },
        { id: "managed-focus", weight: 3, group: "a11y-keyboard" },
        { id: "offscreen-content-hidden", weight: 3, group: "a11y-keyboard" },
        { id: "use-landmarks", weight: 3, group: "a11y-navigation" },
        { id: "visual-order-follows-dom", weight: 3, group: "a11y-keyboard" },
      ],
    },
  },
};
