"use client";

import { useEffect } from "react";
import { checkColorContrast } from "@/lib/accessibility";

/**
 * Accessibility auditor component that runs automated accessibility checks
 * in development mode
 */
const AccessibilityAuditor = () => {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    const runAccessibilityAudit = () => {
      console.group("🔍 Accessibility Audit");

      // Check for missing alt text
      const images = document.querySelectorAll("img");
      const imagesWithoutAlt = Array.from(images).filter(
        (img) => !img.alt && !img.getAttribute("aria-label")
      );

      if (imagesWithoutAlt.length > 0) {
        console.warn(
          `Found ${imagesWithoutAlt.length} images without alt text:`,
          imagesWithoutAlt
        );
      } else {
        console.log("✅ All images have alt text");
      }

      // Check for missing form labels
      const inputs = document.querySelectorAll("input, select, textarea");
      const inputsWithoutLabels = Array.from(inputs).filter((input) => {
        const id = input.id;
        const hasLabel = id && document.querySelector(`label[for="${id}"]`);
        const hasAriaLabel = input.getAttribute("aria-label");
        const hasAriaLabelledBy = input.getAttribute("aria-labelledby");

        return !hasLabel && !hasAriaLabel && !hasAriaLabelledBy;
      });

      if (inputsWithoutLabels.length > 0) {
        console.warn(
          `Found ${inputsWithoutLabels.length} form inputs without labels:`,
          inputsWithoutLabels
        );
      } else {
        console.log("✅ All form inputs have labels");
      }

      // Check heading hierarchy
      const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
      const headingLevels = Array.from(headings).map((h) =>
        parseInt(h.tagName.charAt(1))
      );

      let headingIssues = false;
      for (let i = 1; i < headingLevels.length; i++) {
        if (headingLevels[i] - headingLevels[i - 1] > 1) {
          console.warn(
            "Heading hierarchy issue: skipped heading level",
            headings[i]
          );
          headingIssues = true;
        }
      }

      if (!headingIssues) {
        console.log("✅ Heading hierarchy is correct");
      }

      // Check for missing main landmark
      const main = document.querySelector("main");
      if (!main) {
        console.warn("Missing main landmark element");
      } else {
        console.log("✅ Main landmark found");
      }

      // Check color contrast (sample check)
      const colorContrast = checkColorContrast("#1a1a2e", "#ffffff");
      if (colorContrast < 4.5) {
        console.warn(`Low color contrast ratio: ${colorContrast.toFixed(2)}`);
      } else {
        console.log(
          `✅ Good color contrast ratio: ${colorContrast.toFixed(2)}`
        );
      }

      // Check for keyboard navigation
      const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length === 0) {
        console.warn("No focusable elements found");
      } else {
        console.log(`✅ Found ${focusableElements.length} focusable elements`);
      }

      // Check for ARIA attributes
      const elementsWithAria = document.querySelectorAll(
        "[aria-label], [aria-labelledby], [aria-describedby], [role]"
      );
      console.log(
        `ℹ️ Found ${elementsWithAria.length} elements with ARIA attributes`
      );

      console.groupEnd();
    };

    // Run audit after DOM is fully loaded
    const timer = setTimeout(runAccessibilityAudit, 2000);

    return () => clearTimeout(timer);
  }, []);

  // This component doesn't render anything
  return null;
};

export default AccessibilityAuditor;
