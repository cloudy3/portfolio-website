// Main exports for all professional data
export {
  JING_FENG_PROFILE,
  TECHNICAL_HIGHLIGHTS,
} from "./professional-profile";
export {
  EXPERIENCE_DATA,
  EDUCATION_DATA,
  CERTIFICATIONS_DATA,
} from "./experience";
export { TECHNICAL_SKILLS, SKILLS_DATA } from "./skills";
// Import projects from the main projectData file
export { sampleProjects as PROJECTS_DATA } from "../projectData";

// Re-export utility functions
export * from "./experience";
export * from "./skills";
export * from "../projectData";

// Combined professional profile
import { ProfessionalProfile } from "@/types";
import { JING_FENG_PROFILE } from "./professional-profile";
import { EXPERIENCE_DATA, EDUCATION_DATA } from "./experience";
import { TECHNICAL_SKILLS } from "./skills";
import { sampleProjects } from "../projectData";

export const COMPLETE_PROFESSIONAL_PROFILE: ProfessionalProfile = {
  personalInfo: JING_FENG_PROFILE,
  experience: EXPERIENCE_DATA,
  education: EDUCATION_DATA,
  skills: TECHNICAL_SKILLS,
  projects: sampleProjects,
};
