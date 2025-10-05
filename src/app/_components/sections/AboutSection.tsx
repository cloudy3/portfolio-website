"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Skill } from "@/types";
// Professional profile data is now embedded in the component for a more personal touch

// Professional skills data from Jing Feng's profile
const SKILLS_DATA: Skill[] = [
  // Top skills from professional experience
  { name: "Flutter", category: "mobile", proficiency: 5, icon: "📱" },
  { name: "Python", category: "backend", proficiency: 5, icon: "🐍" },
  { name: "Google Cloud", category: "cloud", proficiency: 5, icon: "☁️" },
  { name: "Firebase", category: "cloud", proficiency: 5, icon: "🔥" },
  { name: "Dart", category: "mobile", proficiency: 5, icon: "🎯" },
  { name: "TypeScript", category: "frontend", proficiency: 4, icon: "📘" },
  { name: "React", category: "frontend", proficiency: 4, icon: "⚛️" },
  { name: "Docker", category: "devops", proficiency: 4, icon: "🐳" },
  { name: "PostgreSQL", category: "database", proficiency: 4, icon: "🐘" },
  { name: "Node.js", category: "backend", proficiency: 4, icon: "🟢" },
  { name: "Angular", category: "frontend", proficiency: 3, icon: "🅰️" },
  { name: "Java", category: "backend", proficiency: 4, icon: "☕" },
  // Technologies from this portfolio project
  { name: "Next.js", category: "frontend", proficiency: 3, icon: "▲" },
  { name: "Tailwind CSS", category: "frontend", proficiency: 3, icon: "🎨" },
  { name: "Three.js", category: "frontend", proficiency: 3, icon: "🎮" },
  { name: "GSAP", category: "frontend", proficiency: 3, icon: "✨" },
  { name: "Jest", category: "testing", proficiency: 3, icon: "🧪" },
];

const SKILL_CATEGORIES = {
  mobile: "Mobile",
  frontend: "Frontend",
  backend: "Backend",
  cloud: "Cloud",
  database: "Database",
  devops: "DevOps",
  testing: "Testing",
} as const;

interface SkillProgressBarProps {
  skill: Skill;
  index: number;
}

const SkillProgressBar = ({ skill, index }: SkillProgressBarProps) => {
  const percentage = (skill.proficiency / 5) * 100;

  return (
    <div
      className={`mb-6 transition-all duration-1000`}
      style={{ transitionDelay: `${800 + index * 100}ms` }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">{skill.icon}</span>
          <span className="font-medium text-gray-900">{skill.name}</span>
        </div>
        <span className="text-sm text-gray-600 font-medium">
          {skill.proficiency}/5
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="skill-progress-animated bg-gradient-to-r from-amber-400 to-orange-500 h-2 rounded-full"
          style={
            {
              "--progress-width": `${percentage}%`,
            } as React.CSSProperties
          }
        />
      </div>
    </div>
  );
};

const AboutSection = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const filteredSkills =
    activeCategory === "all"
      ? SKILLS_DATA
      : SKILLS_DATA.filter((skill) => skill.category === activeCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Animate progress bars
            setTimeout(() => {
              const progressBars = document.querySelectorAll(
                ".skill-progress-animated"
              );
              progressBars.forEach((bar) => {
                bar.classList.add("animate");
              });
            }, 500);
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  const handleDownloadCV = () => {
    // In a real implementation, this would download an actual CV file
    // For now, we'll create a placeholder action
    const link = document.createElement("a");
    link.href = "/resume.pdf"; // This would be the actual path to your CV
    link.download = "Cheah_Jing_Feng_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="about" className="section-padding bg-white" ref={sectionRef}>
      <div className="container-custom">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="section-title text-gray-900">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto"></div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start mb-12 sm:mb-16">
          {/* Left Column - Photo and Personal Info */}
          <div
            className={`space-y-6 sm:space-y-8 transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            {/* Photo Placeholder */}
            <div className="relative">
              <div className="aspect-square max-w-xs sm:max-w-sm md:max-w-md mx-auto lg:mx-0 rounded-2xl shadow-lg overflow-hidden">
                <Image
                  src="/images/placeholder-avatar.svg"
                  alt="Professional Photo Placeholder"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiByeD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjwvZXZnPgo="
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 bg-amber-400 rounded-full opacity-80"></div>
              <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-4 h-4 sm:w-6 sm:h-6 bg-orange-500 rounded-full opacity-60"></div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                <div className="text-xl sm:text-2xl font-bold text-gray-900">
                  ∞
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  Cups of Coffee
                </div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                <div className="text-xl sm:text-2xl font-bold text-gray-900">
                  96%
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  Problems Solved
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Professional Summary */}
          <div
            className={`space-y-6 transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Hey there! I&apos;m the kind of developer who gets genuinely
                excited about turning coffee into code and complex problems into
                elegant solutions. While others see bugs, I see puzzles waiting
                to be solved.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Currently, I&apos;m making waves in the maritime industry (pun
                intended) by building cloud-native apps that help ships navigate
                the digital ocean. My superpower? Taking ideas from
                &ldquo;wouldn&apos;t it be cool if...&rdquo; to &ldquo;wow, this
                actually works!&rdquo; – like that time I helped cut storage
                costs by 96% with some clever image optimization magic.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                When I&apos;m not wrestling with <strong>Flutter</strong>{" "}
                widgets or architecting <strong>Python</strong> backends on{" "}
                <strong>Google Cloud</strong>, you&apos;ll find me diving deep
                into the latest tech trends (because staying curious is half the
                job, right?). I believe the best code is like a good joke – if
                you have to explain it, it probably needs refactoring.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={handleDownloadCV}
                className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-6 sm:px-8 py-3 rounded-full font-semibold hover:from-amber-500 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:scale-95 touch-manipulation"
              >
                Download CV
              </button>
              <a
                href="#contact"
                className="border-2 border-gray-900 text-gray-900 px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300 text-center active:scale-95 touch-manipulation"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="border-t border-gray-200 pt-16">
          <div
            className={`text-center mb-12 transition-all duration-1000 delay-600 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h3 className="text-gray-900 mb-4">My Digital Toolkit</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto text-center">
              The technologies I&apos;ve befriended over the years (some more
              cooperative than others)
            </p>
          </div>

          {/* Skill Category Filter */}
          <div
            className={`flex flex-wrap justify-center gap-2 mb-12 transition-all duration-1000 delay-700 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === "all"
                  ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Skills
            </button>
            {Object.entries(SKILL_CATEGORIES).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === key
                    ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <div
            className={`grid md:grid-cols-2 gap-8 max-w-4xl mx-auto transition-all duration-1000 delay-800 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            {filteredSkills.map((skill, index) => (
              <SkillProgressBar key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
