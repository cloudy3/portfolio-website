// Core data model interfaces for the portfolio website

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  category: "web" | "mobile" | "desktop" | "other";
  images: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  completedAt: Date;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  description: string;
  technologies: string[];
  achievements: string[];
  logo?: string;
}

export interface Skill {
  name: string;
  category: "frontend" | "backend" | "tools" | "design" | "other";
  level: 1 | 2 | 3 | 4 | 5;
  icon?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  startDate: Date;
  endDate: Date;
  description: string;
  achievements?: string[];
  logo?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  credentialId: string;
  logo?: string;
}

// Additional utility types
export interface NavigationItem {
  id: string;
  label: string;
  href: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}
