import HeroSection from "./_components/HeroSection";
import AboutSection from "./_components/AboutSection";
import { ProjectsSection } from "./_components/ProjectsSection";

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
      <section id="skills" className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
            My Skills
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              "React",
              "Next.js",
              "TypeScript",
              "Tailwind CSS",
              "Node.js",
              "Python",
              "Design",
              "Animation",
            ].map((skill) => (
              <div key={skill} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {skill.slice(0, 2)}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900">{skill}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
            Experience
          </h2>
          <div className="max-w-4xl mx-auto">
            {[1, 2, 3].map((exp) => (
              <div
                key={exp}
                className="bg-white rounded-lg shadow-lg p-6 mb-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Senior Developer
                  </h3>
                  <span className="text-gray-600">2022 - Present</span>
                </div>
                <h4 className="text-lg text-blue-600 mb-2">
                  Tech Company {exp}
                </h4>
                <p className="text-gray-700">
                  Led development of multiple web applications using modern
                  technologies. Collaborated with cross-functional teams to
                  deliver high-quality solutions.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
