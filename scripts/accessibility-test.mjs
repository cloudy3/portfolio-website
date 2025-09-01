#!/usr/bin/env node

/**
 * Accessibility testing script using axe-core
 */

import { execSync } from "child_process";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

console.log("♿ Starting accessibility audit...\n");

// Install axe-core if not present
try {
  require.resolve("@axe-core/cli");
} catch (error) {
  console.log("📦 Installing axe-core CLI...");
  execSync("npm install --save-dev @axe-core/cli", { stdio: "inherit" });
}

// Run accessibility tests
console.log("🔍 Running axe-core accessibility tests...");

const testUrls = [
  "http://localhost:3000",
  "http://localhost:3000/#about",
  "http://localhost:3000/#projects",
  "http://localhost:3000/#skills",
  "http://localhost:3000/#experience",
  "http://localhost:3000/#contact",
];

console.log(
  "ℹ️ Make sure your development server is running on localhost:3000"
);
console.log('ℹ️ Run "npm run dev" in another terminal if needed\n');

// Test each URL
testUrls.forEach((url, index) => {
  console.log(`Testing ${url}...`);
  try {
    execSync(
      `npx axe ${url} --reporter html --output-file accessibility-report-${index}.html`,
      {
        stdio: "inherit",
      }
    );
    console.log(`✅ Report saved as accessibility-report-${index}.html`);
  } catch (error) {
    console.warn(`⚠️ Accessibility issues found for ${url}`);
  }
});

console.log("\n🎉 Accessibility audit completed!");
console.log("📄 Check the generated HTML reports for detailed results.");
