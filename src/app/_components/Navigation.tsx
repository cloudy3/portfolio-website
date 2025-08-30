"use client";

import { useState, useEffect, useRef } from "react";
import { NAVIGATION_ITEMS, Z_INDEX } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface NavigationProps {
  className?: string;
}

export default function Navigation({ className }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Handle scroll events for active section highlighting and navbar styling
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let locomotiveScroll: any = null;

    const handleScroll = (scrollY?: number) => {
      const currentScrollY = scrollY || window.scrollY || window.pageYOffset;
      setIsScrolled(currentScrollY > 50);

      // Find active section based on scroll position
      const sections = NAVIGATION_ITEMS.map((item) => item.id);
      let currentSection = "hero";

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjust the threshold for better detection
          if (rect.top <= 150 && rect.bottom >= 150) {
            currentSection = sectionId;
          }
        }
      }

      setActiveSection(currentSection);
    };

    // Initial call to set correct state
    handleScroll();

    // Try to hook into Locomotive Scroll instance
    const initLocomotiveListener = () => {
      // Check if Locomotive Scroll is available on window
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((window as any).locomotiveScroll) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        locomotiveScroll = (window as any).locomotiveScroll;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        locomotiveScroll.on("scroll", (args: any) => {
          handleScroll(args.scroll.y);
        });
      } else {
        // Fallback to regular scroll events
        window.addEventListener("scroll", () => handleScroll(), {
          passive: true,
        });
      }
    };

    // Try immediately, then with a delay for Locomotive Scroll to initialize
    initLocomotiveListener();
    const timeoutId = setTimeout(initLocomotiveListener, 1000);

    return () => {
      clearTimeout(timeoutId);
      if (locomotiveScroll && locomotiveScroll.off) {
        locomotiveScroll.off("scroll", handleScroll);
      }
      window.removeEventListener("scroll", () => handleScroll());
    };
  }, []);

  // Intersection Observer for better section detection
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-10% 0px -80% 0px",
      threshold: 0.1,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      // Find the section that's most visible
      let mostVisibleSection = "";
      let maxVisibility = 0;

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > maxVisibility) {
          const sectionId = entry.target.id;
          if (
            sectionId &&
            NAVIGATION_ITEMS.some((item) => item.id === sectionId)
          ) {
            mostVisibleSection = sectionId;
            maxVisibility = entry.intersectionRatio;
          }
        }
      });

      if (mostVisibleSection) {
        setActiveSection(mostVisibleSection);
      }
    }, observerOptions);

    // Observe all sections with a delay to ensure they're rendered
    const observeSections = () => {
      NAVIGATION_ITEMS.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element && observerRef.current) {
          observerRef.current.observe(element);
        }
      });
    };

    // Delay observation to ensure sections are rendered
    const timeoutId = setTimeout(observeSections, 500);

    return () => {
      clearTimeout(timeoutId);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Handle smooth scroll to section
  const handleNavClick = (href: string) => {
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);

    if (element) {
      // Force navbar to update immediately
      setIsScrolled(true);
      setActiveSection(targetId);

      // Try to use Locomotive Scroll's scrollTo method first
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const locomotiveScroll = (window as any).locomotiveScroll;
      if (locomotiveScroll && locomotiveScroll.scrollTo) {
        locomotiveScroll.scrollTo(element, {
          offset: -80, // Account for fixed navbar
          duration: 1000,
          easing: [0.25, 0.0, 0.35, 1.0],
        });
      } else {
        // Fallback to regular scroll
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }

    setIsOpen(false);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const nav = document.getElementById("mobile-nav");
      const button = document.getElementById("mobile-menu-button");

      if (
        isOpen &&
        nav &&
        button &&
        !nav.contains(event.target as Node) &&
        !button.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 transition-all duration-300 z-50",
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-lg"
          : "bg-transparent",
        className
      )}
      style={{ zIndex: Z_INDEX.fixed }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <button
              onClick={() => handleNavClick("#hero")}
              className={cn(
                "text-xl font-bold transition-colors duration-300",
                isScrolled ? "text-gray-900" : "text-white"
              )}
            >
              Portfolio
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {NAVIGATION_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    "px-3 py-2 text-sm font-medium transition-all duration-300 relative",
                    "hover:scale-105 hover:opacity-80",
                    activeSection === item.id
                      ? isScrolled
                        ? "text-blue-600"
                        : "text-yellow-400"
                      : isScrolled
                      ? "text-gray-700 hover:text-gray-900"
                      : "text-white/90 hover:text-white"
                  )}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span
                      className={cn(
                        "absolute bottom-0 left-0 right-0 h-0.5 transition-colors duration-300",
                        isScrolled ? "bg-blue-600" : "bg-yellow-400"
                      )}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              id="mobile-menu-button"
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "inline-flex items-center justify-center p-2 rounded-md transition-colors duration-300",
                isScrolled
                  ? "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  : "text-white hover:text-gray-300 hover:bg-white/10"
              )}
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <div className="w-6 h-6 relative">
                <span
                  className={cn(
                    "absolute block h-0.5 w-6 transform transition-all duration-300",
                    isScrolled ? "bg-gray-700" : "bg-white",
                    isOpen ? "rotate-45 translate-y-2" : "translate-y-0"
                  )}
                />
                <span
                  className={cn(
                    "absolute block h-0.5 w-6 transform transition-all duration-300 translate-y-2",
                    isScrolled ? "bg-gray-700" : "bg-white",
                    isOpen ? "opacity-0" : "opacity-100"
                  )}
                />
                <span
                  className={cn(
                    "absolute block h-0.5 w-6 transform transition-all duration-300 translate-y-4",
                    isScrolled ? "bg-gray-700" : "bg-white",
                    isOpen ? "-rotate-45 -translate-y-2" : "translate-y-0"
                  )}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        id="mobile-nav"
        className={cn(
          "md:hidden transition-all duration-300 overflow-hidden",
          "bg-white/95 backdrop-blur-md shadow-lg",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {NAVIGATION_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.href)}
              className={cn(
                "block w-full text-left px-3 py-2 text-base font-medium transition-all duration-300",
                "hover:bg-gray-100 hover:scale-105",
                activeSection === item.id
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:text-gray-900"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
