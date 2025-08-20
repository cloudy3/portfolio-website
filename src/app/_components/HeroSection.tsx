"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ThreeScene from "./ThreeScene";
import { ANIMATION_CONFIGS, TIMING } from "@/lib/animations";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
}

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

  // Smooth scroll to section function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: {
          y: element,
          offsetY: 80, // Account for fixed navigation
        },
        ease: "power2.inOut",
      });
    }
  };

  // Initialize animations on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(
        [titleRef.current, subtitleRef.current, descriptionRef.current],
        {
          opacity: 0,
          y: 50,
        }
      );

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
        duration: TIMING.slow,
        ease: ANIMATION_CONFIGS.fadeInUp.ease,
      })
        // Animate subtitle
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: TIMING.normal,
            ease: ANIMATION_CONFIGS.fadeInUp.ease,
          },
          "-=0.3"
        )
        // Animate description
        .to(
          descriptionRef.current,
          {
            opacity: 1,
            y: 0,
            duration: TIMING.normal,
            ease: ANIMATION_CONFIGS.fadeInUp.ease,
          },
          "-=0.2"
        )
        // Animate CTA buttons
        .to(
          ctaButtonsRef.current,
          {
            opacity: 1,
            y: 0,
            duration: TIMING.normal,
            ease: ANIMATION_CONFIGS.fadeInUp.ease,
          },
          "-=0.1"
        )
        // Animate scroll indicator
        .to(
          scrollIndicatorRef.current,
          {
            opacity: 1,
            y: 0,
            duration: TIMING.fast,
            ease: ANIMATION_CONFIGS.fadeInUp.ease,
          },
          "-=0.1"
        );

      // Parallax effect on scroll
      gsap.to(heroRef.current, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Floating animation for scroll indicator
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 1.5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}
      id="hero"
    >
      {/* 3D Background Scene */}
      <div className="absolute inset-0 z-0">
        <ThreeScene
          className="w-full h-full"
          particleCount={900}
          enableGeometry={true}
        />
      </div>

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-slate-900/40 to-slate-900/60 z-10"></div>

      {/* Hero Content */}
      <div className="relative z-20 text-center px-6 sm:px-8 lg:px-12 max-w-5xl mx-auto mt-24 sm:mt-28 lg:mt-62">
        {/* Main Title */}
        <h1
          ref={titleRef}
          className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight"
        >
          <span className="block">Creative</span>
          <span className="block bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
            Developer
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-4 font-light"
        >
          Full-Stack Engineer & UI/UX Enthusiast
        </p>

        {/* Description */}
        <p
          ref={descriptionRef}
          className="text-base sm:text-lg lg:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Crafting exceptional digital experiences with modern technologies.
          Passionate about clean code, innovative design, and solving complex
          problems.
        </p>

        {/* Call-to-Action Buttons */}
        <div
          ref={ctaButtonsRef}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-16"
        >
          <button
            onClick={() => scrollToSection("projects")}
            className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/25 hover:scale-105"
          >
            <span className="relative z-10">View My Work</span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          <button
            onClick={() => scrollToSection("contact")}
            className="group px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-white/10 hover:scale-105"
          >
            <span className="group-hover:text-amber-300 transition-colors duration-300">
              Get In Touch
            </span>
          </button>
        </div>

        {/* Scroll Indicator */}
        <div
          ref={scrollIndicatorRef}
          className="flex flex-col items-center cursor-pointer"
          onClick={() => scrollToSection("about")}
        >
          <span className="text-gray-400 text-sm mb-2 hover:text-amber-400 transition-colors duration-300">
            Scroll to explore
          </span>
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center hover:border-amber-400 transition-colors duration-300">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-900 to-transparent z-15"></div>
    </section>
  );
}
