"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ThreeScene from "./ThreeScene";
import { ANIMATION_CONFIG } from "@/lib/animations";
import { DURATIONS } from "@/lib/constants";

interface HeroSectionProps {
  className?: string;
}

export default function HeroSection({ className = "" }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaButtonsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // Simple scroll to section function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    console.log("Scrolling to section:", sectionId, "Element found:", element);

    if (element) {
      // Calculate the target position
      const elementTop = element.offsetTop;
      const offset = 80; // Account for fixed navigation
      const targetPosition = Math.max(0, elementTop - offset);

      console.log(
        "Element offsetTop:",
        elementTop,
        "Target position:",
        targetPosition
      );

      // Use native smooth scroll
      try {
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
        console.log("Using native smooth scroll");
      } catch (error) {
        console.error("Native scroll failed, trying scrollIntoView:", error);
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else {
      console.error("Element not found for section:", sectionId);
    }
  };

  // Initialize animations on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(titleRef.current, {
        opacity: 0,
        y: 50,
      });

      gsap.set(subtitleRef.current, {
        opacity: 0,
        y: 80, // Start further down to account for spacing
      });

      gsap.set(descriptionRef.current, {
        opacity: 0,
        y: 50,
      });

      gsap.set(ctaButtonsRef.current, {
        opacity: 0,
        y: 30,
      });

      gsap.set(scrollIndicatorRef.current, {
        opacity: 0,
        y: 20,
      });

      // Create entrance animation timeline
      const tl = gsap.timeline({ delay: 0.5 });

      // Animate title with split text effect
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: DURATIONS.slow / 1000, // Convert to seconds
        ease: ANIMATION_CONFIG.ease,
      })
        // Animate subtitle
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: DURATIONS.normal / 1000, // Convert to seconds
            ease: ANIMATION_CONFIG.ease,
          },
          "-=0.2" // Delay it a bit more to create visual separation
        )
        // Animate description
        .to(
          descriptionRef.current,
          {
            opacity: 1,
            y: 0,
            duration: DURATIONS.normal / 1000, // Convert to seconds
            ease: ANIMATION_CONFIG.ease,
          },
          "-=0.2"
        )
        // Animate CTA buttons
        .to(
          ctaButtonsRef.current,
          {
            opacity: 1,
            y: 0,
            duration: DURATIONS.normal / 1000, // Convert to seconds
            ease: ANIMATION_CONFIG.ease,
          },
          "-=0.1"
        )
        // Animate scroll indicator
        .to(
          scrollIndicatorRef.current,
          {
            opacity: 1,
            y: 0,
            duration: DURATIONS.fast / 1000, // Convert to seconds
            ease: ANIMATION_CONFIG.ease,
          },
          "-=0.1"
        );

      // Simple floating animation for scroll indicator (no ScrollTrigger)
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 1.5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Removed all ScrollTrigger animations to prevent scroll conflicts
      // This allows for normal, uninterrupted scrolling behavior
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className={`relative h-screen flex items-center justify-center overflow-hidden ${className}`}
      id="hero"
    >
      {/* 3D Background Scene */}
      <div className="absolute inset-0 z-0">
        <ThreeScene
          className="w-full h-full"
          particleCount={900}
          enableClouds={true}
        />
      </div>

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-slate-900/40 to-slate-900/60 z-10"></div>

      {/* Hero Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 md:px-8 lg:px-12 max-w-5xl mx-auto pt-24 sm:pt-28 md:pt-32">
        {/* Main Title */}
        <h1
          ref={titleRef}
          className="text-white mb-8 sm:mb-12 md:mb-16 leading-relaxed"
        >
          <span className="block">Hi,</span>
          <span className="block bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
            I&apos;m Jing Feng
          </span>
        </h1>

        {/* Subtitle */}
        <h3
          ref={subtitleRef}
          className="text-gray-100 mb-3 sm:mb-4 mt-12 sm:mt-16 md:mt-20 font-light px-2"
        >
          Software Engineer
        </h3>

        {/* Description */}
        <p
          ref={descriptionRef}
          className="text-gray-200 mb-8 sm:mb-10 md:mb-12 mt-4 sm:mt-6 md:mt-8 max-w-3xl mx-auto leading-relaxed px-2"
        >
          Crafting exceptional digital experiences with modern technologies.
          Passionate about clean code, innovative design, and solving complex
          problems.
        </p>

        {/* Call-to-Action Buttons */}
        <div
          ref={ctaButtonsRef}
          className="flex flex-col xs:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center mb-12 sm:mb-14 md:mb-16 px-2"
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              console.log("View My Work button clicked");
              scrollToSection("projects");
            }}
            className="group relative w-full xs:w-auto min-w-[160px] px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/25 active:scale-95 touch-manipulation"
          >
            <span className="relative z-10">View My Work</span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              console.log("Get In Touch button clicked");
              scrollToSection("contact");
            }}
            className="group w-full xs:w-auto min-w-[160px] px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/30 text-white font-semibold rounded-lg backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-white/10 active:scale-95 touch-manipulation"
          >
            <span className="group-hover:text-amber-300 transition-colors duration-300">
              Get In Touch
            </span>
          </button>
        </div>

        {/* Scroll Indicator */}
        <div
          ref={scrollIndicatorRef}
          className="flex flex-col items-center cursor-pointer touch-manipulation"
          onClick={(e) => {
            e.preventDefault();
            console.log("Scroll indicator clicked");
            scrollToSection("about");
          }}
        >
          <span className="text-gray-400 text-xs sm:text-sm mb-2 hover:text-amber-400 transition-colors duration-300">
            Scroll to explore
          </span>
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-gray-400 rounded-full flex justify-center hover:border-amber-400 transition-colors duration-300 active:scale-95">
            <div className="w-1 h-2 sm:h-3 bg-gray-400 rounded-full mt-1.5 sm:mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-900 to-transparent z-15"></div>
    </section>
  );
}
