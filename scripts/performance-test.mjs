#!/usr/bin/env node

/**
 * Performance testing script for different network conditions
 */

import { execSync } from "child_process";
import fs from "fs";

console.log("🚀 Starting performance testing across network conditions...\n");

const networkConditions = [
  {
    name: "Fast 3G",
    throttling: {
      rttMs: 150,
      throughputKbps: 1638,
      cpuSlowdownMultiplier: 4,
    },
  },
  {
    name: "Slow 3G",
    throttling: {
      rttMs: 300,
      throughputKbps: 400,
      cpuSlowdownMultiplier: 4,
    },
  },
  {
    name: "Desktop",
    throttling: {
      rttMs: 40,
      throughputKbps: 10240,
      cpuSlowdownMultiplier: 1,
    },
  },
];

const testUrl = "http://localhost:3000";

console.log("ℹ️ Make sure your production build is running on localhost:3000");
console.log('ℹ️ Run "npm run build && npm run start" in another terminal\n');

// Test each network condition
for (const condition of networkConditions) {
  console.log(`📊 Testing ${condition.name} conditions...`);

  const outputFile = `lighthouse-${condition.name
    .toLowerCase()
    .replace(" ", "-")}-report.html`;

  try {
    const command =
      `lighthouse ${testUrl} ` +
      `--throttling.rttMs=${condition.throttling.rttMs} ` +
      `--throttling.throughputKbps=${condition.throttling.throughputKbps} ` +
      `--throttling.cpuSlowdownMultiplier=${condition.throttling.cpuSlowdownMultiplier} ` +
      `--output=html ` +
      `--output-path=${outputFile} ` +
      `--chrome-flags="--headless"`;

    execSync(command, { stdio: "inherit" });
    console.log(`✅ ${condition.name} report saved as ${outputFile}\n`);
  } catch (error) {
    console.warn(
      `⚠️ Failed to test ${condition.name} conditions:`,
      error.message
    );
  }
}

// Generate performance summary
console.log("📋 Generating performance summary...");

const summaryData = {
  timestamp: new Date().toISOString(),
  testConditions: networkConditions.map((c) => c.name),
  recommendations: [
    "Review Lighthouse reports for specific optimization opportunities",
    "Check Core Web Vitals metrics across all network conditions",
    "Optimize images and implement lazy loading",
    "Minimize JavaScript bundle size",
    "Enable compression and caching",
    "Consider implementing service worker for offline functionality",
  ],
};

fs.writeFileSync(
  "performance-summary.json",
  JSON.stringify(summaryData, null, 2)
);
console.log("✅ Performance summary saved as performance-summary.json");

console.log("\n🎉 Performance testing completed!");
console.log("📄 Check the generated Lighthouse reports for detailed analysis.");
