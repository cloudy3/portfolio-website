"use client";

import { useEffect, useRef, useState } from "react";
import { Skill } from "@/types";
import { SKILLS_DATA, getSkillsByCategory } from "@/lib/data/skills";
import {
  createStaggeredScrollAnimation,
  animateProgressBar,
} from "@/lib/animations";

interface SkillCardProps {
  skill: Skill;
  index: number;
}

const SkillCard = ({ skill, index }: SkillCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);

          // Animate progress bar when visible
          if (progressRef.current) {
            const targetWidth = `${(skill.level / 5) * 100}%`;
            animateProgressBar(progressRef.current, targetWidth, {
              delay: index * 0.1,
            });
          }
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [skill.level, index, isVisible]);

  const getLevelText = (level: number) => {
    switch (level) {
      case 1:
        return "Beginner";
      case 2:
        return "Basic";
      case 3:
        return "Intermediate";
      case 4:
        return "Advanced";
      case 5:
        return "Expert";
      default:
        return "Unknown";
    }
  };

  return (
    <div
      ref={cardRef}
      className="skill-card bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-2xl mr-4">
          {skill.icon || "💻"}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{skill.name}</h3>
          <p className="text-sm text-gray-600">{getLevelText(skill.level)}</p>
        </div>
      </div>

      <div className="mb-2">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Proficiency</span>
          <span>{skill.level}/5</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            ref={progressRef}
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-1000 ease-out"
            style={{ width: "0%" }}
          />
        </div>
      </div>
    </div>
  );
};

interface SkillCategoryProps {
  category: Skill["category"];
  skills: Skill[];
}

const SkillCategory = ({ category, skills }: SkillCategoryProps) => {
  const categoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (categoryRef.current) {
      // Animate category title
      const titleElement = categoryRef.current.querySelector(".category-title");
      if (titleElement) {
        createStaggeredScrollAnimation(
          [titleElement as HTMLElement],
          "textReveal",
          {
            trigger: categoryRef.current,
            start: "top 85%",
            duration: 0.8,
          }
        );
      }

      // Animate skill cards
      const skillCards = categoryRef.current.querySelectorAll(".skill-card");
      if (skillCards.length > 0) {
        createStaggeredScrollAnimation(
          Array.from(skillCards) as HTMLElement[],
          "scaleIn",
          {
            trigger: categoryRef.current,
            start: "top 80%",
            stagger: 0.1,
            duration: 0.6,
          }
        );
      }
    }
  }, []);

  const getCategoryTitle = (category: Skill["category"]) => {
    switch (category) {
      case "frontend":
        return "Frontend Development";
      case "backend":
        return "Backend Development";
      case "tools":
        return "Tools & Technologies";
      case "design":
        return "Design & UX";
      case "other":
        return "Other Skills";
      default:
        return (
          (category as string).charAt(0).toUpperCase() +
          (category as string).slice(1)
        );
    }
  };

  const getCategoryIcon = (category: Skill["category"]) => {
    switch (category) {
      case "frontend":
        return "🎨";
      case "backend":
        return "⚙️";
      case "tools":
        return "🛠️";
      case "design":
        return "✨";
      case "other":
        return "🚀";
      default:
        return "💻";
    }
  };

  return (
    <div ref={categoryRef} className="mb-16">
      <div className="flex items-center mb-8">
        <span className="text-3xl mr-3">{getCategoryIcon(category)}</span>
        <h3 className="category-title text-2xl md:text-3xl font-bold text-gray-900">
          {getCategoryTitle(category)}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill, index) => (
          <SkillCard key={skill.name} skill={skill} index={index} />
        ))}
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<
    Skill["category"] | "all"
  >("all");

  useEffect(() => {
    if (sectionRef.current) {
      // Animate section title
      const titleElement = sectionRef.current.querySelector(".section-title");
      if (titleElement) {
        createStaggeredScrollAnimation(
          [titleElement as HTMLElement],
          "textReveal",
          {
            trigger: sectionRef.current,
            start: "top 90%",
            duration: 1,
          }
        );
      }

      // Animate section subtitle
      const subtitleElement =
        sectionRef.current.querySelector(".section-subtitle");
      if (subtitleElement) {
        createStaggeredScrollAnimation(
          [subtitleElement as HTMLElement],
          "fadeIn",
          {
            trigger: sectionRef.current,
            start: "top 85%",
            delay: 0.3,
            duration: 0.8,
          }
        );
      }
    }
  }, []);

  const categories: (Skill["category"] | "all")[] = [
    "all",
    "frontend",
    "backend",
    "tools",
    "design",
  ];

  const getFilteredSkills = () => {
    if (activeCategory === "all") {
      return SKILLS_DATA;
    }
    return getSkillsByCategory(activeCategory);
  };

  const getSkillsByCategories = () => {
    if (activeCategory !== "all") {
      return [{ category: activeCategory, skills: getFilteredSkills() }];
    }

    // Get all unique categories from the actual skills data
    const actualCategories = Array.from(
      new Set(SKILLS_DATA.map((skill) => skill.category))
    );

    return actualCategories
      .map((category) => ({
        category: category,
        skills: getSkillsByCategory(category),
      }))
      .filter((group) => group.skills.length > 0);
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="section-padding bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            My Skills
          </h2>
          <p className="section-subtitle text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive overview of my technical expertise and proficiency
            levels across various technologies and tools I use to create
            exceptional digital experiences.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-blue-600 text-white shadow-lg transform scale-105"
                  : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-md hover:shadow-lg"
              }`}
            >
              {category === "all"
                ? "All Skills"
                : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Skills Display */}
        <div className="max-w-7xl mx-auto">
          {getSkillsByCategories().map(({ category, skills }) => (
            <SkillCategory key={category} category={category} skills={skills} />
          ))}
        </div>

        {/* Skills Summary */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Continuous Learning
            </h3>
            <p className="text-gray-600 mb-6">
              I&apos;m passionate about staying current with the latest
              technologies and best practices. Always eager to learn new skills
              and improve existing ones.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {SKILLS_DATA.length}+
                </div>
                <div className="text-sm text-gray-600">Technologies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {SKILLS_DATA.filter((s) => s.level >= 4).length}
                </div>
                <div className="text-sm text-gray-600">Advanced Skills</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {SKILLS_DATA.filter((s) => s.level === 5).length}
                </div>
                <div className="text-sm text-gray-600">Expert Level</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {categories.length - 1}
                </div>
                <div className="text-sm text-gray-600">Categories</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
