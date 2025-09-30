import { Experience, Education, Certification } from "@/types";

export const EXPERIENCE_DATA: Experience[] = [
  {
    id: "exp-1",
    company: "Bernhard Schulte Singapore Holdings",
    position: "Software Engineer",
    startDate: new Date("2023-07-01"),
    endDate: undefined, // Current position
    description:
      "Full-stack developer who designs and deploys scalable web and mobile applications that streamline critical operations for international subsidiaries. My work includes developing dynamic websites that significantly improved the diving report process across four countries and creating an end-to-end mobile app that digitized manual vessel inspection procedures for field divers.",
    technologies: [
      "Flutter",
      "Google Cloud Platform",
      "Python",
      "Microservices",
      "Web and Mobile Development",
      "Microsoft Azure",
    ],
    achievements: [
      "Built and deployed vessel-tracking system on Google Compute Engine, ingesting global data via websocket and visualizing live ship positions on an interactive dashboard.",
      "Designed Python Flask API on Cloud Run for large-scale image processing, improving efficiency for long-running tasks.",
      "Automated image compression with Firebase Extensions, reducing storage costs by 96% and streamlining CI/CD.",
      "Integrated Microsoft OneDrive Picker API, accelerating client upload workflows by 60% for large image batches.",
      "Restructured Firestore schema, migrating 4,500+ documents into a scalable data model.",
      "Deployed region-specific Cloud Storage buckets and Firestore databases (Asia, Europe), cutting latency by 50% in key markets.",
      "Delivered cross-platform apps in Flutter for maritime clients; launched Android apps on Google Play Store.",
      "Enhanced app performance with GetX state management and Hive for offline usage.",
      "Supported backend processes with Cloud Functions and drove documentation improvements to streamline team workflows.",
    ],
    logo: "🏢",
  },
  {
    id: "exp-2",
    company: "Resync",
    position: "Software Engineer Intern",
    startDate: new Date("2021-07-01"),
    endDate: new Date("2021-12-28"),
    description:
      "I drove full-stack development for Resync's core energy management platform, delivering high-performance mobile and web applications for their proprietary dashboard. This work enabled the smart tracking and visualization of energy consumption, providing users with critical data for optimization and cost efficiency.",
    technologies: ["Flutter", "Python", "Web and Mobile Development", "Figma"],
    achievements: [
      "Delivered end-to-end Flutter mobile app with push notifications (FCM), used by prominent organizations including the National Environment Agency (NEA)",
      "Developed Angular web portal and React components, implementing Redux for state management and reducing frontend bugs by 30%",
      "Containerized backend services with Docker and PostgreSQL, streamlining deployment and reducing setup time by 70%",
      "Established unit testing framework (Mocha, Chai, Sinon), increasing code coverage to 85% and catching regressions early",
      "Collaborated in 2-week Agile sprints; introduced GitLab CI linting hooks, improving code quality and commit hygiene",
    ],
    logo: "💡",
  },
];

export const EDUCATION_DATA: Education[] = [
  {
    id: "edu-1",
    institution: "Nanyang Technological University",
    degree: "Bachelor of Engineering in Computer Science",
    startDate: new Date("2019-08-01"),
    endDate: new Date("2023-06-30"),
    description:
      "B.Eng. Computer Science with Highest Distinction (First Class Honours)",
    achievements: [
      "Specialisations: Artificial Intelligence, Data Science & Analytics",
      "Was offered the EDB-IPP PhD scholarship",
    ],
    logo: "🎓",
  },
];

export const CERTIFICATIONS_DATA: Certification[] = [
  {
    id: "cert-1",
    name: "The Complete 2024 Web Development Bootcamp",
    issuer: "Udemy",
    credentialId: "AWS-SAA-123456",
    logo: "☁️",
  },
  {
    id: "cert-2",
    name: "React Developer Certification",
    issuer: "Meta",
    credentialId: "META-REACT-789012",
    logo: "⚛️",
  },
  {
    id: "cert-3",
    name: "Google Analytics Certified",
    issuer: "Google",
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
  const totalMonths = EXPERIENCE_DATA.reduce((total, exp) => {
    const startDate = exp.startDate;
    const endDate = exp.endDate || new Date(); // Use current date if still employed

    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const months = diffTime / (1000 * 60 * 60 * 24 * 30.44); // Average days per month

    return total + months;
  }, 0);

  const years = totalMonths / 12;
  return Math.round(years * 10) / 10; // Round to 1 decimal place
};
