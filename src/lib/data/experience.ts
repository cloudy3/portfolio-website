import { Experience, Education, Certification } from "@/types";

export const EXPERIENCE_DATA: Experience[] = [
  {
    id: "exp-1",
    company: "TechCorp Solutions",
    position: "Senior Full Stack Developer",
    startDate: new Date("2022-03-01"),
    endDate: undefined, // Current position
    description:
      "Leading development of scalable web applications using React, Next.js, and Node.js. Mentoring junior developers and architecting solutions for complex business requirements.",
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "AWS",
      "Docker",
    ],
    achievements: [
      "Led a team of 5 developers in rebuilding the company's main product, resulting in 40% performance improvement",
      "Implemented CI/CD pipeline reducing deployment time by 60%",
      "Mentored 3 junior developers, with 2 receiving promotions within 6 months",
      "Architected microservices infrastructure serving 100k+ daily active users",
    ],
    logo: "🏢",
  },
  {
    id: "exp-2",
    company: "Digital Innovations Inc",
    position: "Frontend Developer",
    startDate: new Date("2020-06-01"),
    endDate: new Date("2022-02-28"),
    description:
      "Developed responsive web applications and collaborated with UX/UI designers to create exceptional user experiences. Specialized in React ecosystem and modern frontend tooling.",
    technologies: [
      "React",
      "Vue.js",
      "JavaScript",
      "SASS",
      "Webpack",
      "Jest",
      "Figma",
    ],
    achievements: [
      "Built 15+ responsive web applications with 99.9% uptime",
      "Reduced bundle size by 35% through code splitting and optimization",
      "Implemented automated testing suite with 90% code coverage",
      "Collaborated with design team to establish component library used across 10+ projects",
    ],
    logo: "💡",
  },
  {
    id: "exp-3",
    company: "StartupXYZ",
    position: "Junior Web Developer",
    startDate: new Date("2019-01-01"),
    endDate: new Date("2020-05-31"),
    description:
      "Started my professional journey building web applications and learning modern development practices. Contributed to both frontend and backend development in a fast-paced startup environment.",
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "PHP",
      "MySQL",
      "Bootstrap",
      "jQuery",
    ],
    achievements: [
      "Developed company's first mobile-responsive website",
      "Improved page load times by 50% through optimization techniques",
      "Built internal tools that saved 10+ hours of manual work per week",
      "Contributed to 20+ feature releases in agile development cycles",
    ],
    logo: "🚀",
  },
];

export const EDUCATION_DATA: Education[] = [
  {
    id: "edu-1",
    institution: "University of Technology",
    degree: "Bachelor of Science in Computer Science",
    startDate: new Date("2015-09-01"),
    endDate: new Date("2019-06-30"),
    description:
      "Focused on software engineering, algorithms, and web technologies. Graduated Magna Cum Laude with a 3.8 GPA.",
    achievements: [
      "Dean's List for 6 consecutive semesters",
      "Led university's web development club with 50+ members",
      "Built award-winning capstone project using React and Node.js",
      "Completed internship at local tech company during final year",
    ],
    logo: "🎓",
  },
];

export const CERTIFICATIONS_DATA: Certification[] = [
  {
    id: "cert-1",
    name: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    issueDate: new Date("2023-08-15"),
    expiryDate: new Date("2026-08-15"),
    credentialId: "AWS-SAA-123456",
    logo: "☁️",
  },
  {
    id: "cert-2",
    name: "React Developer Certification",
    issuer: "Meta",
    issueDate: new Date("2022-11-20"),
    expiryDate: undefined,
    credentialId: "META-REACT-789012",
    logo: "⚛️",
  },
  {
    id: "cert-3",
    name: "Google Analytics Certified",
    issuer: "Google",
    issueDate: new Date("2023-03-10"),
    expiryDate: new Date("2024-03-10"),
    credentialId: "GOOGLE-GA-345678",
    logo: "📊",
  },
];

export const getCurrentExperience = () => {
  return EXPERIENCE_DATA.find((exp) => !exp.endDate);
};

export const getPastExperiences = () => {
  return EXPERIENCE_DATA.filter((exp) => exp.endDate).sort(
    (a, b) => new Date(b.endDate!).getTime() - new Date(a.endDate!).getTime()
  );
};

export const getTotalExperienceYears = () => {
  const firstJob = EXPERIENCE_DATA.reduce((earliest, exp) =>
    exp.startDate < earliest.startDate ? exp : earliest
  );

  const now = new Date();
  const diffTime = Math.abs(now.getTime() - firstJob.startDate.getTime());
  const diffYears = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 365));

  return diffYears;
};
