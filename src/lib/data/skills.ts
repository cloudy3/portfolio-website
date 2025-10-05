import { TechnicalSkills } from "@/types";

export const TECHNICAL_SKILLS: TechnicalSkills = {
  languages: {
    name: "Programming Languages",
    items: [
      {
        name: "Dart",
        proficiency: 5,
        yearsOfExperience: 2.5,
        category: "mobile",
        icon: "🎯",
      },
      {
        name: "Python",
        proficiency: 5,
        yearsOfExperience: 3,
        category: "backend",
        icon: "🐍",
      },
      {
        name: "JavaScript/TypeScript",
        proficiency: 4,
        yearsOfExperience: 2.5,
        category: "frontend",
        icon: "📘",
      },
      {
        name: "Java",
        proficiency: 4,
        yearsOfExperience: 2,
        category: "backend",
        icon: "☕",
      },
      {
        name: "C/C++",
        proficiency: 3,
        yearsOfExperience: 1,
        category: "systems",
        icon: "⚡",
      },
      {
        name: "SQL",
        proficiency: 4,
        yearsOfExperience: 2.5,
        category: "database",
        icon: "🗃️",
      },
    ],
  },
  frameworks: {
    name: "Frameworks & Libraries",
    items: [
      {
        name: "Flutter",
        proficiency: 5,
        yearsOfExperience: 2.5,
        category: "mobile",
        icon: "📱",
      },
      {
        name: "React",
        proficiency: 4,
        yearsOfExperience: 2,
        category: "frontend",
        icon: "⚛️",
      },
      {
        name: "Angular",
        proficiency: 3,
        yearsOfExperience: 1,
        category: "frontend",
        icon: "🅰️",
      },
      {
        name: "Node.js",
        proficiency: 4,
        yearsOfExperience: 2,
        category: "backend",
        icon: "🟢",
      },
      {
        name: "Flask",
        proficiency: 4,
        yearsOfExperience: 2,
        category: "backend",
        icon: "🌶️",
      },
      {
        name: "Django",
        proficiency: 3,
        yearsOfExperience: 1,
        category: "backend",
        icon: "🎸",
      },
    ],
  },
  cloudInfra: {
    name: "Cloud & Infrastructure",
    items: [
      {
        name: "Google Cloud Platform",
        proficiency: 5,
        yearsOfExperience: 2.5,
        category: "cloud",
        icon: "☁️",
      },
      {
        name: "Cloud Run",
        proficiency: 5,
        yearsOfExperience: 1.5,
        category: "cloud",
        icon: "🏃",
      },
      {
        name: "Cloud Functions",
        proficiency: 4,
        yearsOfExperience: 1.5,
        category: "cloud",
        icon: "⚡",
      },
      {
        name: "Compute Engine",
        proficiency: 4,
        yearsOfExperience: 1,
        category: "cloud",
        icon: "🖥️",
      },
      {
        name: "Firebase",
        proficiency: 5,
        yearsOfExperience: 2.5,
        category: "cloud",
        icon: "🔥",
      },
      {
        name: "Firestore",
        proficiency: 5,
        yearsOfExperience: 2.5,
        category: "database",
        icon: "🗄️",
      },
      {
        name: "Docker",
        proficiency: 4,
        yearsOfExperience: 2,
        category: "devops",
        icon: "🐳",
      },
      {
        name: "GitLab CI",
        proficiency: 3,
        yearsOfExperience: 1,
        category: "devops",
        icon: "🦊",
      },
    ],
  },
  databases: {
    name: "Databases",
    items: [
      {
        name: "PostgreSQL",
        proficiency: 4,
        yearsOfExperience: 2,
        category: "database",
        icon: "🐘",
      },
      {
        name: "MySQL",
        proficiency: 3,
        yearsOfExperience: 1.5,
        category: "database",
        icon: "🐬",
      },
      {
        name: "Hive (local DB)",
        proficiency: 4,
        yearsOfExperience: 1.5,
        category: "database",
        icon: "🍯",
      },
    ],
  },
  tools: {
    name: "Tools & Technologies",
    items: [
      {
        name: "Git",
        proficiency: 5,
        yearsOfExperience: 3,
        category: "devops",
        icon: "📝",
      },
      {
        name: "Figma",
        proficiency: 4,
        yearsOfExperience: 2,
        category: "design",
        icon: "🎨",
      },
      {
        name: "GetX",
        proficiency: 5,
        yearsOfExperience: 2,
        category: "mobile",
        icon: "🎯",
      },
      {
        name: "Agile/Scrum",
        proficiency: 4,
        yearsOfExperience: 2.5,
        category: "methodology",
        icon: "🔄",
      },
    ],
  },
};

// Utility functions for skills data
export const getSkillsByCategory = (categoryName: string) => {
  const categories = Object.values(TECHNICAL_SKILLS);
  const category = categories.find((cat) => cat.name === categoryName);
  return category ? category.items : [];
};

export const getAllSkillCategories = () => {
  return Object.values(TECHNICAL_SKILLS).map((category) => category.name);
};

export const getHighProficiencySkills = (minProficiency: number = 4) => {
  const allSkills = Object.values(TECHNICAL_SKILLS).flatMap(
    (category) => category.items
  );
  return allSkills.filter((skill) => skill.proficiency >= minProficiency);
};

export const getSkillsByProficiency = (proficiency: number) => {
  const allSkills = Object.values(TECHNICAL_SKILLS).flatMap(
    (category) => category.items
  );
  return allSkills.filter((skill) => skill.proficiency === proficiency);
};
// Backward compatibility export - flattened skills array
export const SKILLS_DATA = Object.values(TECHNICAL_SKILLS).flatMap(
  (category) => category.items
);
