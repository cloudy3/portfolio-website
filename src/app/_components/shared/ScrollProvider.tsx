"use client";

interface ScrollProviderProps {
  children: React.ReactNode;
}

export default function ScrollProvider({ children }: ScrollProviderProps) {
  // Disabled all scroll effects to prevent interference with normal scrolling
  // This component now just passes through children without any scroll manipulation

  return <div>{children}</div>;
}
