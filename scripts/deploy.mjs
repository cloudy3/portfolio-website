#!/usr/bin/env node

/**
 * Deployment script for portfolio website
 * Runs pre-deployment checks and builds for production
 */

import { execSync } from "child_process";
import { existsSync } from "fs";

console.log("🚀 Starting deployment preparation...\n");

// Step 1: Run tests
console.log("🧪 Running tests...");
try {
  execSync("npm test -- --watchAll=false", { stdio: "inherit" });
  console.log("✅ Tests passed\n");
} catch (error) {
  console.log("❌ Tests failed. Please fix issues before deploying.\n");
  process.exit(1);
}

// Step 2: Lint code
console.log("🔍 Linting code...");
try {
  execSync("npm run lint", { stdio: "inherit" });
  console.log("✅ Linting passed\n");
} catch (error) {
  console.log("❌ Linting failed. Please fix issues before deploying.\n");
  process.exit(1);
}

// Step 3: Build for production
console.log("🏗️ Building for production...");
try {
  execSync("npm run build", { stdio: "inherit" });
  console.log("✅ Build successful\n");
} catch (error) {
  console.log("❌ Build failed. Please fix issues before deploying.\n");
  process.exit(1);
}

// Step 4: Check if .vercel directory exists (indicates Vercel setup)
console.log("📦 Checking deployment configuration...");
if (existsSync(".vercel")) {
  console.log("✅ Vercel configuration found");
} else {
  console.log(
    'ℹ️ No Vercel configuration found. Run "vercel" to set up deployment.'
  );
}

// Step 5: Security audit
console.log("\n🔒 Running security audit...");
try {
  execSync("npm audit --audit-level moderate", { stdio: "inherit" });
  console.log("✅ Security audit passed\n");
} catch (error) {
  console.log(
    "⚠️ Security vulnerabilities found. Consider fixing before deploying.\n"
  );
}

console.log("🎉 Deployment preparation complete!");
console.log("\n📋 Next steps:");
console.log("1. Review the deployment checklist in deployment-checklist.md");
console.log("2. Test the production build locally: npm run start");
console.log("3. Deploy to Vercel: vercel --prod");
console.log("4. Verify deployment at your production URL");
console.log("\n✨ Ready for production deployment!");
