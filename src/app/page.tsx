import HeroSection from "./_components/HeroSection";
import AboutSection from "./_components/AboutSection";
import { ProjectsSection } from "./_components/ProjectsSection";
import SkillsSection from "./_components/SkillsSection";
import ExperienceSection from "./_components/ExperienceSection";
import ContactSection from "./_components/ContactSection";

export default function Home() {
  return (
    <div>
      {/* Hero Section with 3D Background */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Skills Section */}
      <SkillsSection />

      {/* Experience Section */}
      <ExperienceSection />

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}
