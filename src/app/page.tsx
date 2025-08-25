import HeroSection from "./_components/HeroSection";
import AboutSection from "./_components/AboutSection";
import { ProjectsSection } from "./_components/ProjectsSection";
import SkillsSection from "./_components/SkillsSection";
import ExperienceSection from "./_components/ExperienceSection";

export default function Home() {
  return (
    <div className="min-h-screen">
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
      <section
        id="contact"
        className="section-padding bg-gradient-to-br from-gray-900 to-blue-900 text-white"
      >
        <div className="container-custom">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Get In Touch
          </h2>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xl mb-8 opacity-90">
              I&apos;m always interested in new opportunities and
              collaborations. Let&apos;s create something amazing together!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-colors">
                Send Message
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-colors">
                Download CV
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
