#!/usr/bin/env node

/**
 * Comprehensive performance and accessibility audit script
 */

import { execSync } from "child_process";
import fs from "fs";
import path from "path";

console.log("🚀 Starting comprehensive audit...\n");

// 1. Build the project for production analysis
console.log("📦 Building project for production...");
try {
  execSync("npm run build", { stdio: "inherit" });
  console.log("✅ Build completed successfully\n");
} catch (error) {
  console.error("❌ Build failed:", error.message);
  process.exit(1);
}

// 2. Bundle analysis
console.log("📊 Analyzing bundle size...");
try {
  execSync("npm run build:analyze", { stdio: "inherit" });
  console.log("✅ Bundle analysis completed\n");
} catch (error) {
  console.warn("⚠️ Bundle analysis failed:", error.message);
}

// 3. Check for unused dependencies
console.log("🔍 Checking for unused dependencies...");
try {
  // This would require depcheck to be installed
  // execSync('npx depcheck', { stdio: 'inherit' });
  console.log("ℹ️ Manual dependency check recommended\n");
} catch (error) {
  console.warn("⚠️ Dependency check failed:", error.message);
}

// 4. ESLint audit
console.log("🔧 Running ESLint audit...");
try {
  execSync("npm run lint", { stdio: "inherit" });
  console.log("✅ ESLint audit completed\n");
} catch (error) {
  console.warn("⚠️ ESLint found issues:", error.message);
}

// 5. TypeScript check
console.log("📝 Running TypeScript check...");
try {
  execSync("npx tsc --noEmit", { stdio: "inherit" });
  console.log("✅ TypeScript check completed\n");
} catch (error) {
  console.warn("⚠️ TypeScript check found issues:", error.message);
}

// 6. Test coverage
console.log("🧪 Running tests with coverage...");
try {
  execSync("npm test -- --coverage --watchAll=false", { stdio: "inherit" });
  console.log("✅ Test coverage completed\n");
} catch (error) {
  console.warn("⚠️ Tests failed or incomplete coverage:", error.message);
}

console.log("🎉 Audit completed! Check the reports generated.");
console.log("\nNext steps:");
console.log("1. Review bundle analyzer report");
console.log("2. Check test coverage report");
console.log("3. Run Lighthouse audit on deployed site");
console.log("4. Test accessibility with screen readers");
