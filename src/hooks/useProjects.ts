import { useState, useMemo } from "react";
import { Project } from "@/types";
import {
  filterProjectsByCategory,
  filterProjectsByTechnology,
  searchProjects,
  sortProjectsByFeatured,
  getProjectCategoryCounts,
  getAllTechnologies,
} from "@/lib/projectData";

interface UseProjectsOptions {
  initialProjects: Project[];
  initialCategory?: string;
  initialSearchTerm?: string;
}

interface UseProjectsReturn {
  projects: Project[];
  filteredProjects: Project[];
  selectedCategory: string;
  searchTerm: string;
  categoryCounts: Record<string, number>;
  allTechnologies: string[];
  setSelectedCategory: (category: string) => void;
  setSearchTerm: (term: string) => void;
  filterByTechnology: (technology: string) => void;
  clearFilters: () => void;
  isLoading: boolean;
  error: string | null;
}

export const useProjects = ({
  initialProjects,
  initialCategory = "all",
  initialSearchTerm = "",
}: UseProjectsOptions): UseProjectsReturn => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [isLoading] = useState(false); // For future API integration
  const [error] = useState<string | null>(null); // For future error handling

  // Memoized computed values
  const categoryCounts = useMemo(
    () => getProjectCategoryCounts(initialProjects),
    [initialProjects]
  );

  const allTechnologies = useMemo(
    () => getAllTechnologies(initialProjects),
    [initialProjects]
  );

  const filteredProjects = useMemo(() => {
    let filtered = initialProjects;

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filterProjectsByCategory(filtered, selectedCategory);
    }

    // Apply search filter
    if (searchTerm.trim()) {
      filtered = searchProjects(filtered, searchTerm.trim());
    }

    // Sort with featured projects first
    return sortProjectsByFeatured(filtered);
  }, [initialProjects, selectedCategory, searchTerm]);

  const filterByTechnology = (technology: string) => {
    filterProjectsByTechnology(initialProjects, technology);
    // For simplicity, we'll set the search term to the technology
    // In a more complex implementation, we might have separate technology filters
    setSearchTerm(technology);
    setSelectedCategory("all");
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setSearchTerm("");
  };

  return {
    projects: initialProjects,
    filteredProjects,
    selectedCategory,
    searchTerm,
    categoryCounts,
    allTechnologies,
    setSelectedCategory,
    setSearchTerm,
    filterByTechnology,
    clearFilters,
    isLoading,
    error,
  };
};
