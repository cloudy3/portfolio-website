// Design constants and configuration values

// Color palette inspired by Mont-Fort design
export const COLORS = {
  primary: {
    navy: "#1a1a2e",
    white: "#f8f9fa",
  },
  accent: {
    gold: "#ffd700",
    amber: "#f59e0b",
  },
  secondary: {
    gray: "#6c757d",
    lightGray: "#adb5bd",
    darkGray: "#495057",
  },
  success: "#28a745",
  error: "#dc3545",
  warning: "#ffc107",
  info: "#17a2b8",
} as const;

// Typography scale
export const TYPOGRAPHY = {
  fontFamily: {
    sans: ["Inter", "system-ui", "sans-serif"],
    mono: ["JetBrains Mono", "Fira Code", "monospace"],
  },
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
} as const;

// Spacing scale
export const SPACING = {
  xs: "0.5rem",
  sm: "1rem",
  md: "1.5rem",
  lg: "2rem",
  xl: "3rem",
  "2xl": "4rem",
  "3xl": "6rem",
  "4xl": "8rem",
} as const;

// Breakpoints for responsive design
export const BREAKPOINTS = {
  xs: "480px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

// Z-index scale
export const Z_INDEX = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modal: 1040,
  popover: 1050,
  tooltip: 1060,
  toast: 1070,
} as const;

// Animation durations
export const DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
  slower: 750,
} as const;

// Navigation items
export const NAVIGATION_ITEMS = [
  { id: "hero", label: "Home", href: "#hero" },
  { id: "about", label: "About", href: "#about" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "contact", label: "Contact", href: "#contact" },
] as const;

// Social media links (placeholder data)
export const SOCIAL_LINKS = [
  { name: "GitHub", url: "https://github.com", icon: "github" },
  { name: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
  { name: "Twitter", url: "https://twitter.com", icon: "twitter" },
  { name: "Email", url: "mailto:contact@example.com", icon: "email" },
] as const;

// Project categories
export const PROJECT_CATEGORIES = [
  "all",
  "web",
  "mobile",
  "desktop",
  "other",
] as const;

// Skill categories
export const SKILL_CATEGORIES = [
  "frontend",
  "backend",
  "tools",
  "design",
  "other",
] as const;

// Performance thresholds
export const PERFORMANCE = {
  loadTime: 3000, // 3 seconds
  responseTime: 200, // 200ms
  imageQuality: 85, // 85% quality for optimized images
} as const;

// Contact form validation
export const VALIDATION = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  minNameLength: 2,
  maxNameLength: 50,
  minMessageLength: 10,
  maxMessageLength: 1000,
} as const;
