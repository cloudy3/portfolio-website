"use client";

import { useEffect, useRef, useState } from "react";
import { Experience, Education, Certification } from "@/types";
import {
  EXPERIENCE_DATA,
  EDUCATION_DATA,
  CERTIFICATIONS_DATA,
  getCurrentExperience,
  getPastExperiences,
  getTotalExperienceYears,
} from "@/lib/data/experience";

interface ExperienceCardProps {
  experience: Experience;
  isExpanded: boolean;
  onToggle: () => void;
  index?: number;
}

const ExperienceCard = ({
  experience,
  isExpanded,
  onToggle,
  index = 0,
}: ExperienceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const getDuration = () => {
    const start = experience.startDate;
    const end = experience.endDate || new Date();

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));

    if (diffMonths < 12) {
      return `${diffMonths} month${diffMonths > 1 ? "s" : ""}`;
    }

    const years = Math.floor(diffMonths / 12);
    const remainingMonths = diffMonths % 12;

    if (remainingMonths === 0) {
      return `${years} year${years > 1 ? "s" : ""}`;
    }

    return `${years} year${years > 1 ? "s" : ""} ${remainingMonths} month${
      remainingMonths > 1 ? "s" : ""
    }`;
  };

  return (
    <div
      ref={cardRef}
      className={`experience-card relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-700 overflow-hidden ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
      }`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      {/* Timeline connector */}
      <div className="absolute left-6 top-0 w-0.5 h-full bg-gradient-to-b from-blue-500 to-purple-600"></div>
      <div className="absolute left-4 top-8 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg"></div>

      <div className="pl-16 pr-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
          <div className="flex items-start mb-4 lg:mb-0">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-2xl mr-4 flex-shrink-0">
              {experience.logo || "🏢"}
            </div>
            <div>
              <h3 className="card-title text-gray-900">
                {experience.position}
              </h3>
              <h4 className="card-subtitle text-blue-600">
                {experience.company}
              </h4>
              <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-600 gap-2">
                <span>
                  {formatDate(experience.startDate)} -{" "}
                  {experience.endDate
                    ? formatDate(experience.endDate)
                    : "Present"}
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="font-medium">{getDuration()}</span>
                {!experience.endDate && (
                  <>
                    <span className="hidden sm:inline">•</span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Current
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={onToggle}
            className="flex-shrink-0 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors duration-200 text-sm font-medium"
          >
            {isExpanded ? "Show Less" : "Show More"}
          </button>
        </div>

        {/* Description */}
        <p className="text-gray-700 mb-4 leading-relaxed">
          {experience.description}
        </p>

        {/* Technologies */}
        <div className="mb-4">
          <h5 className="text-sm font-semibold text-gray-900 mb-2">
            Technologies Used:
          </h5>
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Expandable achievements */}
        {isExpanded && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h5 className="text-sm font-semibold text-gray-900 mb-3">
              Key Achievements:
            </h5>
            <ul className="space-y-3">
              {experience.achievements.map((achievement, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <div className="text-gray-700 text-sm leading-relaxed">
                    <div className="font-medium mb-1">
                      {achievement.description}
                    </div>
                    {achievement.impact && (
                      <div className="text-gray-600 text-xs mb-1">
                        Impact: {achievement.impact}
                      </div>
                    )}
                    {achievement.metrics && (
                      <div className="text-blue-600 text-xs font-medium">
                        📊 {achievement.metrics}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const EducationCard = ({
  education,
  index = 0,
}: {
  education: Education;
  index?: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div
      ref={cardRef}
      className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="flex items-start mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center text-2xl mr-4">
          {education.logo || "🎓"}
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            {education.degree}
          </h3>
          <h4 className="text-md text-green-600 font-semibold mb-2">
            {education.institution}
          </h4>
          <div className="text-sm text-gray-600">
            {formatDate(education.startDate)} - {formatDate(education.endDate)}
          </div>
        </div>
      </div>

      <p className="text-gray-700 mb-4 text-sm leading-relaxed">
        {education.description}
      </p>

      {education.achievements && (
        <div>
          <h5 className="text-sm font-semibold text-gray-900 mb-2">
            Highlights:
          </h5>
          <ul className="space-y-1">
            {education.achievements.slice(0, 2).map((achievement, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                <span className="text-gray-600 text-xs leading-relaxed">
                  {achievement}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const CertificationCard = ({
  certification,
  index = 0,
}: {
  certification: Certification;
  index?: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-700 ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center text-xl mr-3">
            {certification.logo || "📜"}
          </div>
          <div>
            <h3 className="text-md font-bold text-gray-900 mb-1">
              {certification.name}
            </h3>
            <h4 className="text-sm text-purple-600 font-semibold">
              {certification.issuer}
            </h4>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-600">
        <div className="font-mono text-xs text-gray-500">
          ID: {certification.credentialId}
        </div>
      </div>
    </div>
  );
};

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [expandedExperience, setExpandedExperience] = useState<string | null>(
    null
  );
  const [activeTab, setActiveTab] = useState<
    "experience" | "education" | "certifications"
  >("experience");
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeaderVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleToggleExpanded = (experienceId: string) => {
    setExpandedExperience(
      expandedExperience === experienceId ? null : experienceId
    );
  };

  const currentExp = getCurrentExperience();
  const pastExps = getPastExperiences();
  const totalYears = getTotalExperienceYears();

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="section-padding bg-gradient-to-br from-blue-50 to-indigo-100"
    >
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className={`section-title text-gray-900 transition-all duration-700 ${
              isHeaderVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            Experience & Education
          </h2>
          <p
            className={`text-lg text-gray-600 max-w-3xl mx-auto text-center transition-all duration-700 delay-200 ${
              isHeaderVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            My professional journey, educational background, and continuous
            learning through certifications and skill development.
          </p>

          {/* Stats */}
          <div
            className={`flex flex-wrap justify-center gap-8 mb-8 transition-all duration-700 delay-400 ${
              isHeaderVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {totalYears}+
              </div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">
                {EXPERIENCE_DATA.length}
              </div>
              <div className="text-sm text-gray-600">Companies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {CERTIFICATIONS_DATA.length}
              </div>
              <div className="text-sm text-gray-600">Certifications</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { key: "experience", label: "Work Experience", icon: "💼" },
            { key: "education", label: "Education", icon: "🎓" },
            { key: "certifications", label: "Certifications", icon: "📜" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() =>
                setActiveTab(
                  tab.key as "experience" | "education" | "certifications"
                )
              }
              className={`flex items-center px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === tab.key
                  ? "bg-blue-600 text-white shadow-lg transform scale-105"
                  : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-md hover:shadow-lg"
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          {activeTab === "experience" && (
            <div className="space-y-8">
              {/* Current Experience */}
              {currentExp && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></span>
                    Current Position
                  </h3>
                  <ExperienceCard
                    experience={currentExp}
                    isExpanded={expandedExperience === currentExp.id}
                    onToggle={() => handleToggleExpanded(currentExp.id)}
                    index={0}
                  />
                </div>
              )}

              {/* Past Experiences */}
              {pastExps.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 mt-12">
                    Previous Experience
                  </h3>
                  <div className="space-y-6">
                    {pastExps.map((exp, index) => (
                      <ExperienceCard
                        key={exp.id}
                        experience={exp}
                        isExpanded={expandedExperience === exp.id}
                        onToggle={() => handleToggleExpanded(exp.id)}
                        index={index + 1}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "education" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {EDUCATION_DATA.map((edu, index) => (
                <EducationCard key={edu.id} education={edu} index={index} />
              ))}
            </div>
          )}

          {activeTab === "certifications" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CERTIFICATIONS_DATA.map((cert, index) => (
                <CertificationCard
                  key={cert.id}
                  certification={cert}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
