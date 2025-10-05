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

export interface Achievement {
  description: string;
  impact?: string;
  metrics?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  description: string;
  achievements: Achievement[];
  technologies: string[];
  logo?: string;
}

export interface Skill {
  name: string;
  proficiency: 1 | 2 | 3 | 4 | 5;
  yearsOfExperience?: number;
  category: string;
  icon?: string;
}

export interface SkillCategory {
  name: string;
  items: Skill[];
}

export interface TechnicalSkills {
  languages: SkillCategory;
  frameworks: SkillCategory;
  cloudInfra: SkillCategory;
  databases: SkillCategory;
  tools: SkillCategory;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  location: string;
  startDate: Date;
  endDate: Date;
  description: string;
  achievements?: string[];
  logo?: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  linkedin: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  summary: string;
  contact: ContactInfo;
}

export interface ProfessionalProfile {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: TechnicalSkills;
  projects: Project[];
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
