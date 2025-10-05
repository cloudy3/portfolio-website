"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Project } from "@/types";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
// Removed unused import: getOptimizedImageProps
import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalFooter,
} from "@/components/ui/Modal";
import { PROJECT_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { sampleProjects } from "@/lib/projectData";
import { useProjects } from "@/hooks/useProjects";

interface ProjectsSectionProps {
  projects?: Project[];
}

interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onViewDetails,
}) => {
  return (
    <Card hover className="h-full flex flex-col">
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        {project.images.length > 0 ? (
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={project.featured}
            loading={project.featured ? "eager" : "lazy"}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
        {project.featured && (
          <div className="absolute top-2 right-2 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Featured
          </div>
        )}
      </div>

      <CardHeader className="flex-1">
        <h3 className="card-title text-gray-900">{project.title}</h3>
        <p className="card-description line-clamp-3">{project.description}</p>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => onViewDetails(project)}
            className="flex-1"
          >
            View Details
          </Button>
          {project.liveUrl && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(project.liveUrl, "_blank")}
              className="flex-1"
            >
              Live Demo
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  if (!project) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalHeader onClose={onClose}>
        <h2 className="text-2xl font-bold text-gray-900">{project.title}</h2>
      </ModalHeader>

      <ModalContent>
        <div className="space-y-6">
          {/* Project Images */}
          {project.images.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.images.map((image, index) => (
                <div
                  key={index}
                  className="relative h-48 rounded-lg overflow-hidden"
                >
                  <Image
                    src={image}
                    alt={`${project.title} screenshot ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                </div>
              ))}
            </div>
          )}

          {/* Project Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Description
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Project Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Category
              </h3>
              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full capitalize">
                {project.category}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Completed
              </h3>
              <p className="text-gray-600">
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "long",
                }).format(project.completedAt)}
              </p>
            </div>
          </div>
        </div>
      </ModalContent>

      <ModalFooter>
        {project.githubUrl && (
          <Button
            variant="outline"
            onClick={() => window.open(project.githubUrl, "_blank")}
          >
            View Code
          </Button>
        )}
        {project.liveUrl && (
          <Button
            variant="primary"
            onClick={() => window.open(project.liveUrl, "_blank")}
          >
            Live Demo
          </Button>
        )}
      </ModalFooter>
    </Modal>
  );
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects = sampleProjects,
}) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Use the projects hook for data management
  const {
    filteredProjects: sortedProjects,
    selectedCategory,
    setSelectedCategory,
    categoryCounts,
  } = useProjects({
    initialProjects: projects,
  });

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  // Initialize visibility with Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
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

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="-mt-16 pt-20 pb-20 bg-gray-50"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="section-title text-gray-900">Featured Projects</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-center">
            A showcase of my recent work and personal projects, demonstrating
            various technologies and problem-solving approaches.
          </p>
        </div>

        {/* Category Filter */}
        <div
          className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {PROJECT_CATEGORIES.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "primary" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "capitalize",
                selectedCategory === category && "ring-2 ring-amber-200"
              )}
            >
              {category === "all" ? "All Projects" : category}
              <span className="ml-2 text-xs opacity-75">
                ({categoryCounts[category] || 0})
              </span>
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div
          ref={cardsRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {sortedProjects.map((project, index) => (
            <div
              key={project.id}
              className={`transition-all duration-700 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              style={{ transitionDelay: `${600 + index * 100}ms` }}
            >
              <ProjectCard
                project={project}
                onViewDetails={handleViewDetails}
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sortedProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No projects found
            </h3>
            <p className="text-gray-600">
              No projects match the selected category. Try selecting a different
              filter.
            </p>
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};
