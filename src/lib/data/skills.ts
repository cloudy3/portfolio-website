import { Skill } from "@/types";

export const SKILLS_DATA: Skill[] = [
  // Frontend Skills
  {
    name: "React",
    category: "frontend",
    level: 5,
    icon: "⚛️",
  },
  {
    name: "Next.js",
    category: "frontend",
    level: 5,
    icon: "▲",
  },
  {
    name: "TypeScript",
    category: "frontend",
    level: 4,
    icon: "📘",
  },
  {
    name: "JavaScript",
    category: "frontend",
    level: 5,
    icon: "🟨",
  },
  {
    name: "HTML5",
    category: "frontend",
    level: 5,
    icon: "🌐",
  },
  {
    name: "CSS3",
    category: "frontend",
    level: 5,
    icon: "🎨",
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    level: 4,
    icon: "💨",
  },
  {
    name: "SASS/SCSS",
    category: "frontend",
    level: 4,
    icon: "💅",
  },
  {
    name: "Vue.js",
    category: "frontend",
    level: 3,
    icon: "💚",
  },

  // Backend Skills
  {
    name: "Node.js",
    category: "backend",
    level: 4,
    icon: "🟢",
  },
  {
    name: "Python",
    category: "backend",
    level: 4,
    icon: "🐍",
  },
  {
    name: "Express.js",
    category: "backend",
    level: 4,
    icon: "🚂",
  },
  {
    name: "PostgreSQL",
    category: "backend",
    level: 3,
    icon: "🐘",
  },
  {
    name: "MongoDB",
    category: "backend",
    level: 3,
    icon: "🍃",
  },
  {
    name: "GraphQL",
    category: "backend",
    level: 3,
    icon: "🔗",
  },
  {
    name: "REST APIs",
    category: "backend",
    level: 4,
    icon: "🔌",
  },

  // Tools
  {
    name: "Git",
    category: "tools",
    level: 4,
    icon: "📝",
  },
  {
    name: "Docker",
    category: "tools",
    level: 3,
    icon: "🐳",
  },
  {
    name: "AWS",
    category: "tools",
    level: 3,
    icon: "☁️",
  },
  {
    name: "Vercel",
    category: "tools",
    level: 4,
    icon: "▲",
  },
  {
    name: "Webpack",
    category: "tools",
    level: 3,
    icon: "📦",
  },
  {
    name: "Vite",
    category: "tools",
    level: 4,
    icon: "⚡",
  },
  {
    name: "Jest",
    category: "tools",
    level: 4,
    icon: "🃏",
  },
  {
    name: "Cypress",
    category: "tools",
    level: 3,
    icon: "🌲",
  },

  // Design
  {
    name: "Figma",
    category: "design",
    level: 4,
    icon: "🎨",
  },
  {
    name: "Adobe XD",
    category: "design",
    level: 3,
    icon: "🎭",
  },
  {
    name: "UI/UX Design",
    category: "design",
    level: 4,
    icon: "✨",
  },
  {
    name: "Responsive Design",
    category: "design",
    level: 5,
    icon: "📱",
  },
];

export const getSkillsByCategory = (category: Skill["category"]) => {
  return SKILLS_DATA.filter((skill) => skill.category === category);
};

export const getAllSkillCategories = () => {
  return Array.from(new Set(SKILLS_DATA.map((skill) => skill.category)));
};
