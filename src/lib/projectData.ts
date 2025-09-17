import { Project } from "@/types";

// Sample project data following the Project interface
export const sampleProjects: Project[] = [
  {
    id: "project-1",
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce platform with modern design, payment integration, and admin dashboard.",
    longDescription:
      "A comprehensive e-commerce solution built with Next.js and TypeScript. Features include user authentication, product catalog, shopping cart, payment processing with Stripe, order management, and an admin dashboard for inventory management. The platform is fully responsive and optimized for performance with server-side rendering and static generation.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Stripe",
      "PostgreSQL",
      "Prisma",
    ],
    category: "web",
    images: [
      "/projects/placeholder.svg",
      "/projects/placeholder.svg",
      "/projects/placeholder.svg",
    ],
    liveUrl: "https://ecommerce-demo.example.com",
    githubUrl: "https://github.com/username/ecommerce-platform",
    featured: true,
    completedAt: new Date("2024-01-15"),
  },
  {
    id: "project-2",
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates and team collaboration features.",
    longDescription:
      "A modern task management application inspired by tools like Trello and Asana. Built with React and Node.js, featuring real-time collaboration through WebSockets, drag-and-drop functionality, team management, project organization, and detailed analytics. The app includes user authentication, role-based permissions, and mobile-responsive design.",
    technologies: [
      "React",
      "Node.js",
      "Socket.io",
      "MongoDB",
      "Express",
      "Material-UI",
    ],
    category: "web",
    images: ["/projects/placeholder.svg", "/projects/placeholder.svg"],
    liveUrl: "https://taskmanager-demo.example.com",
    githubUrl: "https://github.com/username/task-management-app",
    featured: true,
    completedAt: new Date("2023-11-20"),
  },
  {
    id: "project-3",
    title: "Portfolio Website",
    description:
      "A modern portfolio website with 3D animations and smooth scrolling effects.",
    longDescription:
      "A personal portfolio website showcasing projects and skills with modern web technologies. Built with Next.js 15 and featuring Three.js 3D animations, GSAP scroll animations, responsive design, and optimized performance. The site includes sections for projects, skills, experience, and contact information with a clean, professional design inspired by award-winning websites.",
    technologies: [
      "Next.js",
      "Three.js",
      "GSAP",
      "Tailwind CSS",
      "TypeScript",
      "Vercel",
    ],
    category: "web",
    images: ["/projects/placeholder.svg", "/projects/placeholder.svg"],
    liveUrl: "https://portfolio.example.com",
    githubUrl: "https://github.com/username/portfolio-website",
    featured: true,
    completedAt: new Date("2024-02-28"),
  },
];

// Utility functions for project data management

/**
 * Filter projects by category
 */
export const filterProjectsByCategory = (
  projects: Project[],
  category: string
): Project[] => {
  if (category === "all") {
    return projects;
  }
  return projects.filter((project) => project.category === category);
};

/**
 * Filter projects by technology
 */
export const filterProjectsByTechnology = (
  projects: Project[],
  technology: string
): Project[] => {
  return projects.filter((project) =>
    project.technologies.some((tech) =>
      tech.toLowerCase().includes(technology.toLowerCase())
    )
  );
};

/**
 * Search projects by title or description
 */
export const searchProjects = (
  projects: Project[],
  searchTerm: string
): Project[] => {
  const term = searchTerm.toLowerCase();
  return projects.filter(
    (project) =>
      project.title.toLowerCase().includes(term) ||
      project.description.toLowerCase().includes(term) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(term))
  );
};

/**
 * Sort projects by completion date (newest first)
 */
export const sortProjectsByDate = (
  projects: Project[],
  ascending: boolean = false
): Project[] => {
  return [...projects].sort((a, b) => {
    const dateA = new Date(a.completedAt).getTime();
    const dateB = new Date(b.completedAt).getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
};

/**
 * Sort projects with featured projects first
 */
export const sortProjectsByFeatured = (projects: Project[]): Project[] => {
  return [...projects].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    // If both are featured or both are not featured, sort by date
    return (
      new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
    );
  });
};

/**
 * Get featured projects only
 */
export const getFeaturedProjects = (projects: Project[]): Project[] => {
  return projects.filter((project) => project.featured);
};

/**
 * Get projects by category with counts
 */
export const getProjectCategoryCounts = (
  projects: Project[]
): Record<string, number> => {
  const counts: Record<string, number> = {
    all: projects.length,
    web: 0,
    mobile: 0,
    desktop: 0,
    other: 0,
  };

  projects.forEach((project) => {
    counts[project.category] = (counts[project.category] || 0) + 1;
  });

  return counts;
};

/**
 * Get all unique technologies from projects
 */
export const getAllTechnologies = (projects: Project[]): string[] => {
  const technologies = new Set<string>();
  projects.forEach((project) => {
    project.technologies.forEach((tech) => technologies.add(tech));
  });
  return Array.from(technologies).sort();
};

/**
 * Get projects that use a specific technology
 */
export const getProjectsByTechnology = (
  projects: Project[],
  technology: string
): Project[] => {
  return projects.filter((project) =>
    project.technologies.includes(technology)
  );
};

/**
 * Get recent projects (within last N months)
 */
export const getRecentProjects = (
  projects: Project[],
  months: number = 6
): Project[] => {
  const cutoffDate = new Date();
  cutoffDate.setMonth(cutoffDate.getMonth() - months);

  return projects.filter(
    (project) => new Date(project.completedAt) >= cutoffDate
  );
};
