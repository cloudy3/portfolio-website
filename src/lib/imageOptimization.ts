/**
 * Image optimization utilities for better performance
 */

// Generate blur data URL for placeholder
export const generateBlurDataURL = (width = 8, height = 8): string => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  // Create a simple gradient blur placeholder
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#f3f4f6");
  gradient.addColorStop(1, "#e5e7eb");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  return canvas.toDataURL("image/jpeg", 0.1);
};

// Static blur data URL for consistent use
export const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==";

// Image size configurations for responsive images
export const IMAGE_SIZES = {
  card: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  modal: "(max-width: 768px) 100vw, 50vw",
  hero: "100vw",
  thumbnail: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw",
} as const;

// Image loading priorities
export const IMAGE_PRIORITY = {
  hero: true,
  featured: true,
  aboveFold: true,
  belowFold: false,
} as const;

// Optimize image props for Next.js Image component
export interface OptimizedImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
}

export const getOptimizedImageProps = (
  src: string,
  alt: string,
  type: keyof typeof IMAGE_SIZES = "card",
  priority = false
): OptimizedImageProps => {
  return {
    src,
    alt,
    priority,
    sizes: IMAGE_SIZES[type],
    placeholder: "blur",
    blurDataURL: BLUR_DATA_URL,
    loading: priority ? "eager" : "lazy",
  } as OptimizedImageProps;
};

// Preload critical images
export const preloadImage = (src: string): void => {
  if (typeof window !== "undefined") {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = src;
    document.head.appendChild(link);
  }
};

// Check if image format is supported
export const isWebPSupported = (): boolean => {
  if (typeof window === "undefined") return false;

  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;

  return canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0;
};

// Get optimal image format
export const getOptimalImageFormat = (originalSrc: string): string => {
  if (typeof window === "undefined") return originalSrc;

  // If it's already a modern format, return as is
  if (originalSrc.includes(".webp") || originalSrc.includes(".avif")) {
    return originalSrc;
  }

  // For Next.js, the Image component handles format optimization automatically
  return originalSrc;
};
