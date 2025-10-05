import dynamic from "next/dynamic";
import HeroSection from "./_components/sections/HeroSection";
import AboutSection from "./_components/sections/AboutSection";

// Lazy load below-the-fold components for better performance
const ProjectsSection = dynamic(
  () =>
    import("./_components/sections/ProjectsSection").then((mod) => ({
      default: mod.ProjectsSection,
    })),
  {
    loading: () => (
      <div className="section-padding bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    ),
  }
);

const SkillsSection = dynamic(
  () => import("./_components/sections/SkillsSection"),
  {
    loading: () => (
      <div className="section-padding bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    ),
  }
);

const ExperienceSection = dynamic(
  () => import("./_components/sections/ExperienceSection"),
  {
    loading: () => (
      <div className="section-padding bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    ),
  }
);

const ContactSection = dynamic(
  () => import("./_components/sections/ContactSection"),
  {
    loading: () => (
      <div className="section-padding bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-500"></div>
      </div>
    ),
  }
);

export default function Home() {
  return (
    <div>
      {/* Hero Section with 3D Background - Load immediately */}
      <HeroSection />

      {/* About Section - Load immediately as it's above the fold */}
      <AboutSection />

      {/* Below-the-fold sections - Lazy loaded */}
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <ContactSection />
    </div>
  );
}
