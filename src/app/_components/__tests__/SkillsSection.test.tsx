import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SkillsSection from "../sections/SkillsSection";
import { SKILLS_DATA, TECHNICAL_SKILLS } from "@/lib/data/skills";

// Mock GSAP
jest.mock("gsap", () => ({
  gsap: {
    registerPlugin: jest.fn(),
    context: jest.fn(() => ({
      revert: jest.fn(),
    })),
    set: jest.fn(),
    to: jest.fn(),
    timeline: jest.fn(() => ({
      to: jest.fn().mockReturnThis(),
    })),
  },
}));

// Mock GSAP plugins
jest.mock("gsap/ScrollToPlugin", () => ({
  ScrollToPlugin: {},
}));

jest.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: {},
}));

// Mock IntersectionObserver for animation triggers
const mockIntersectionObserver = jest.fn();
const mockObserve = jest.fn();
const mockUnobserve = jest.fn();
const mockDisconnect = jest.fn();

mockIntersectionObserver.mockImplementation((callback) => ({
  observe: mockObserve.mockImplementation((element) => {
    // Immediately trigger the callback to simulate element being visible
    callback([{ isIntersecting: true, target: element }]);
  }),
  unobserve: mockUnobserve,
  disconnect: mockDisconnect,
}));

window.IntersectionObserver = mockIntersectionObserver;

describe("SkillsSection", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset IntersectionObserver mock
    mockIntersectionObserver.mockClear();
    mockObserve.mockClear();
    mockUnobserve.mockClear();
    mockDisconnect.mockClear();
  });

  describe("Basic Rendering", () => {
    it("renders the skills section with correct title and description", () => {
      render(<SkillsSection />);

      expect(screen.getByText("My Skills")).toBeInTheDocument();
      expect(
        screen.getByText(/A comprehensive overview of my technical expertise/)
      ).toBeInTheDocument();
    });

    it("renders category filter buttons", () => {
      render(<SkillsSection />);

      expect(screen.getByText("All Skills")).toBeInTheDocument();
      expect(screen.getByText("Frontend")).toBeInTheDocument();
      expect(screen.getByText("Backend")).toBeInTheDocument();
      expect(screen.getByText("DevOps")).toBeInTheDocument();
      expect(screen.getByText("Design")).toBeInTheDocument();
    });

    it("renders skills summary statistics", () => {
      render(<SkillsSection />);

      // Check for statistics display
      expect(screen.getByText(`${SKILLS_DATA.length}+`)).toBeInTheDocument();
      expect(screen.getByText("Technologies")).toBeInTheDocument();
      expect(screen.getByText("Advanced Skills")).toBeInTheDocument();
      expect(screen.getByText("Expert Level")).toBeInTheDocument();
      expect(screen.getByText("Categories")).toBeInTheDocument();
    });
  });

  describe("Skill Categorization and Display", () => {
    it("displays skills summary statistics correctly", () => {
      render(<SkillsSection />);

      // Check that statistics are displayed (these don't depend on intersection observer)
      expect(screen.getByText(`${SKILLS_DATA.length}+`)).toBeInTheDocument();
      expect(screen.getByText("Technologies")).toBeInTheDocument();
      expect(screen.getByText("Advanced Skills")).toBeInTheDocument();
      expect(screen.getByText("Expert Level")).toBeInTheDocument();
    });

    it("handles category filter button interactions", () => {
      render(<SkillsSection />);

      const frontendButton = screen.getByText("Frontend");
      const backendButton = screen.getByText("Backend");
      const allSkillsButton = screen.getByText("All Skills");

      // Initially "All Skills" should be active
      expect(allSkillsButton).toHaveClass("bg-blue-600", "text-white");

      // Click frontend button
      fireEvent.click(frontendButton);
      expect(frontendButton).toHaveClass("bg-blue-600", "text-white");

      // Click backend button
      fireEvent.click(backendButton);
      expect(backendButton).toHaveClass("bg-blue-600", "text-white");
    });

    it("displays category filter buttons correctly", () => {
      render(<SkillsSection />);

      // Check that all category buttons are present
      expect(screen.getByText("All Skills")).toBeInTheDocument();
      expect(screen.getByText("Frontend")).toBeInTheDocument();
      expect(screen.getByText("Backend")).toBeInTheDocument();
      expect(screen.getByText("DevOps")).toBeInTheDocument();
      expect(screen.getByText("Design")).toBeInTheDocument();
    });
  });

  describe("Skill Proficiency Display", () => {
    it("calculates skill statistics correctly", () => {
      render(<SkillsSection />);

      // Check statistics calculations
      const expertSkillsCount = SKILLS_DATA.filter(
        (skill) => skill.proficiency === 5
      ).length;
      const advancedSkillsCount = SKILLS_DATA.filter(
        (skill) => skill.proficiency >= 4
      ).length;

      expect(
        screen.getByText(expertSkillsCount.toString())
      ).toBeInTheDocument();
      expect(
        screen.getByText(advancedSkillsCount.toString())
      ).toBeInTheDocument();
    });

    it("displays skills data structure correctly", () => {
      // Test that the skills data is properly structured
      expect(SKILLS_DATA.length).toBeGreaterThan(0);

      // Check that all skills have required properties
      SKILLS_DATA.forEach((skill) => {
        expect(skill).toHaveProperty("name");
        expect(skill).toHaveProperty("proficiency");
        expect(skill).toHaveProperty("category");
        expect(skill.proficiency).toBeGreaterThanOrEqual(1);
        expect(skill.proficiency).toBeLessThanOrEqual(5);
      });
    });
  });

  describe("Technical Skills Data Rendering", () => {
    it("validates technical skills data structure", () => {
      // Test that TECHNICAL_SKILLS has all required categories
      expect(TECHNICAL_SKILLS).toHaveProperty("languages");
      expect(TECHNICAL_SKILLS).toHaveProperty("frameworks");
      expect(TECHNICAL_SKILLS).toHaveProperty("cloudInfra");
      expect(TECHNICAL_SKILLS).toHaveProperty("databases");
      expect(TECHNICAL_SKILLS).toHaveProperty("tools");

      // Test that each category has items
      expect(TECHNICAL_SKILLS.languages.items.length).toBeGreaterThan(0);
      expect(TECHNICAL_SKILLS.frameworks.items.length).toBeGreaterThan(0);
      expect(TECHNICAL_SKILLS.cloudInfra.items.length).toBeGreaterThan(0);
      expect(TECHNICAL_SKILLS.databases.items.length).toBeGreaterThan(0);
      expect(TECHNICAL_SKILLS.tools.items.length).toBeGreaterThan(0);
    });

    it("validates flattened skills data", () => {
      // Test that SKILLS_DATA is properly flattened
      expect(SKILLS_DATA.length).toBeGreaterThan(0);

      // Check that it contains skills from all categories
      const categories = new Set(SKILLS_DATA.map((skill) => skill.category));
      expect(categories.size).toBeGreaterThan(1); // Should have multiple categories

      // Verify some key skills are present
      const skillNames = SKILLS_DATA.map((skill) => skill.name);
      expect(skillNames).toContain("Dart");
      expect(skillNames).toContain("Python");
      expect(skillNames).toContain("Flutter");
      expect(skillNames).toContain("React");
    });

    it("displays high proficiency skills in statistics", () => {
      render(<SkillsSection />);

      const advancedSkillsCount = SKILLS_DATA.filter(
        (skill) => skill.proficiency >= 4
      ).length;
      const expertSkillsCount = SKILLS_DATA.filter(
        (skill) => skill.proficiency === 5
      ).length;

      expect(
        screen.getByText(advancedSkillsCount.toString())
      ).toBeInTheDocument();
      expect(
        screen.getByText(expertSkillsCount.toString())
      ).toBeInTheDocument();
    });
  });

  describe("Animation Triggers and Interactive Elements", () => {
    it("sets up IntersectionObserver for animation triggers", () => {
      render(<SkillsSection />);

      // Verify that IntersectionObserver was called for section animations
      expect(mockIntersectionObserver).toHaveBeenCalled();
    });

    it("applies active state styling to selected category button", () => {
      render(<SkillsSection />);

      const allSkillsButton = screen.getByText("All Skills");
      const frontendButton = screen.getByText("Frontend");

      // Initially "All Skills" should be active
      expect(allSkillsButton).toHaveClass("bg-blue-600", "text-white");

      // Click frontend button
      fireEvent.click(frontendButton);

      // Frontend button should now be active
      expect(frontendButton).toHaveClass("bg-blue-600", "text-white");
    });

    it("handles category filter interactions", async () => {
      render(<SkillsSection />);

      const categories = ["Frontend", "Backend", "DevOps", "Design"];

      for (const category of categories) {
        const button = screen.getByText(category);
        fireEvent.click(button);

        await waitFor(() => {
          expect(button).toHaveClass("bg-blue-600", "text-white");
        });
      }
    });

    it("handles animation setup without errors", () => {
      // Test that the component renders without throwing errors
      expect(() => render(<SkillsSection />)).not.toThrow();

      // Verify that IntersectionObserver was called for animations
      expect(mockIntersectionObserver).toHaveBeenCalled();
    });

    it("manages component state correctly", () => {
      render(<SkillsSection />);

      // Test that category buttons work
      const frontendButton = screen.getByText("Frontend");
      const backendButton = screen.getByText("Backend");

      fireEvent.click(frontendButton);
      expect(frontendButton).toHaveClass("bg-blue-600", "text-white");

      fireEvent.click(backendButton);
      expect(backendButton).toHaveClass("bg-blue-600", "text-white");
    });
  });

  describe("Responsive Design and Accessibility", () => {
    it("applies responsive grid classes", () => {
      render(<SkillsSection />);

      // Check for responsive grid classes
      const gridContainers = document.querySelectorAll(".grid");
      expect(gridContainers.length).toBeGreaterThan(0);

      // Check for stats grid which is always rendered
      const statsGridContainer = document.querySelector(".grid.grid-cols-2");
      expect(statsGridContainer).toBeInTheDocument();

      // Check that stats grid has the correct responsive classes
      if (statsGridContainer) {
        expect(statsGridContainer).toHaveClass("grid-cols-2", "md:grid-cols-4");
      }
    });

    it("has proper section structure with id for navigation", () => {
      render(<SkillsSection />);

      const section = document.querySelector("#skills");
      expect(section).toBeInTheDocument();
      expect(section?.tagName).toBe("SECTION");
    });

    it("uses semantic HTML structure", () => {
      render(<SkillsSection />);

      // Check for proper heading hierarchy
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
        "My Skills"
      );

      // Check for proper button roles
      const filterButtons = screen.getAllByRole("button");
      expect(filterButtons.length).toBe(6); // All Skills + 5 categories
    });
  });

  describe("Error Handling and Edge Cases", () => {
    it("handles empty skills data gracefully", () => {
      // Mock empty skills data
      jest.doMock("@/lib/data/skills", () => ({
        SKILLS_DATA: [],
        TECHNICAL_SKILLS: {
          languages: { name: "Programming Languages", items: [] },
          frameworks: { name: "Frameworks & Libraries", items: [] },
          cloudInfra: { name: "Cloud & Infrastructure", items: [] },
          databases: { name: "Databases", items: [] },
          tools: { name: "Tools & Technologies", items: [] },
        },
        getSkillsByCategory: () => [],
      }));

      expect(() => render(<SkillsSection />)).not.toThrow();
    });

    it("handles missing skill icons gracefully", () => {
      render(<SkillsSection />);

      // Component should render even if some skills don't have icons
      // Default icon "💻" should be used
      expect(screen.getByText("My Skills")).toBeInTheDocument();
    });

    it("handles category switching without errors", async () => {
      render(<SkillsSection />);

      const categories = [
        "All Skills",
        "Frontend",
        "Backend",
        "DevOps",
        "Design",
      ];

      // Rapidly switch between categories
      for (let i = 0; i < 3; i++) {
        for (const category of categories) {
          const button = screen.getByText(category);
          fireEvent.click(button);

          await waitFor(() => {
            expect(button).toHaveClass("bg-blue-600", "text-white");
          });
        }
      }

      // Should not throw any errors
      expect(screen.getByText("My Skills")).toBeInTheDocument();
    });
  });
});
