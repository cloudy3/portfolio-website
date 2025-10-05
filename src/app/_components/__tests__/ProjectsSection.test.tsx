/* eslint-disable @next/next/no-img-element */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ProjectsSection } from "../sections/ProjectsSection";
import { Project } from "@/types";

// Mock GSAP and animations
jest.mock("@/lib/animations", () => ({
  createStaggeredScrollAnimation: jest.fn(),
}));

// Mock Next.js Image component
jest.mock("next/image", () => {
  return function MockImage({ src, alt, ...props }: unknown) {
    return <img src={src} alt={alt} {...props} />;
  };
});

const mockProjects: Project[] = [
  {
    id: "test-1",
    title: "Test Web Project",
    description: "A test web project description",
    longDescription: "A longer description for the test web project",
    technologies: ["React", "TypeScript", "Next.js"],
    category: "web",
    images: ["/test-image-1.jpg"],
    liveUrl: "https://test-web.example.com",
    githubUrl: "https://github.com/test/web-project",
    featured: true,
    completedAt: new Date("2024-01-15"),
  },
  {
    id: "test-2",
    title: "Test Mobile App",
    description: "A test mobile app description",
    technologies: ["React Native", "TypeScript"],
    category: "mobile",
    images: ["/test-image-2.jpg"],
    githubUrl: "https://github.com/test/mobile-app",
    featured: false,
    completedAt: new Date("2023-12-10"),
  },
  {
    id: "test-3",
    title: "Test Desktop App",
    description: "A test desktop app description",
    technologies: ["Electron", "React"],
    category: "desktop",
    images: [],
    githubUrl: "https://github.com/test/desktop-app",
    featured: false,
    completedAt: new Date("2023-11-05"),
  },
];

describe("ProjectsSection", () => {
  beforeEach(() => {
    // Mock IntersectionObserver
    global.IntersectionObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });

  it("renders the projects section with title", () => {
    render(<ProjectsSection projects={mockProjects} />);

    expect(screen.getByText("Featured Projects")).toBeInTheDocument();
    expect(
      screen.getByText(/A showcase of my recent work/)
    ).toBeInTheDocument();
  });

  it("displays all projects by default", () => {
    render(<ProjectsSection projects={mockProjects} />);

    expect(screen.getByText("Test Web Project")).toBeInTheDocument();
    expect(screen.getByText("Test Mobile App")).toBeInTheDocument();
    expect(screen.getByText("Test Desktop App")).toBeInTheDocument();
  });

  it("shows category filter buttons with counts", () => {
    render(<ProjectsSection projects={mockProjects} />);

    expect(screen.getByText(/All Projects/)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /web \(1\)/ })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /mobile \(1\)/ })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /desktop \(1\)/ })
    ).toBeInTheDocument();

    // Check that counts are displayed
    expect(screen.getByText("(3)")).toBeInTheDocument(); // All projects count
  });

  it("filters projects by category when filter button is clicked", async () => {
    render(<ProjectsSection projects={mockProjects} />);

    // Click on web category filter
    const webButton = screen.getByRole("button", { name: /web/ });
    fireEvent.click(webButton);

    await waitFor(() => {
      expect(screen.getByText("Test Web Project")).toBeInTheDocument();
      expect(screen.queryByText("Test Mobile App")).not.toBeInTheDocument();
      expect(screen.queryByText("Test Desktop App")).not.toBeInTheDocument();
    });
  });

  it("shows featured badge for featured projects", () => {
    render(<ProjectsSection projects={mockProjects} />);

    expect(screen.getByText("Featured")).toBeInTheDocument();
  });

  it("displays project technologies as tags", () => {
    render(<ProjectsSection projects={mockProjects} />);

    expect(screen.getAllByText("React").length).toBeGreaterThan(0);
    expect(screen.getAllByText("TypeScript").length).toBeGreaterThan(0);
    expect(screen.getByText("Next.js")).toBeInTheDocument();
  });

  it("shows View Details and Live Demo buttons", () => {
    render(<ProjectsSection projects={mockProjects} />);

    const viewDetailsButtons = screen.getAllByText("View Details");
    const liveDemoButtons = screen.getAllByText("Live Demo");

    expect(viewDetailsButtons.length).toBeGreaterThan(0);
    expect(liveDemoButtons.length).toBeGreaterThan(0);
  });

  it("opens modal when View Details is clicked", async () => {
    render(<ProjectsSection projects={mockProjects} />);

    const viewDetailsButton = screen.getAllByText("View Details")[0];
    fireEvent.click(viewDetailsButton);

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      expect(
        screen.getByText("A longer description for the test web project")
      ).toBeInTheDocument();
    });
  });

  it("shows placeholder image when project has no images", () => {
    render(<ProjectsSection projects={mockProjects} />);

    // The desktop app has no images, so it should show the placeholder SVG
    const placeholderIcons = screen.getAllByRole("img");
    expect(placeholderIcons.length).toBeGreaterThan(0);
  });

  it("shows empty state when no projects match filter", async () => {
    const emptyProjects: Project[] = [];
    render(<ProjectsSection projects={emptyProjects} />);

    await waitFor(() => {
      expect(screen.getByText("No projects found")).toBeInTheDocument();
      expect(
        screen.getByText(/No projects match the selected category/)
      ).toBeInTheDocument();
    });
  });

  it("handles external links correctly", () => {
    // Mock window.open
    const mockOpen = jest.fn();
    Object.defineProperty(window, "open", {
      value: mockOpen,
      writable: true,
    });

    render(<ProjectsSection projects={mockProjects} />);

    const liveDemoButton = screen.getAllByText("Live Demo")[0];
    fireEvent.click(liveDemoButton);

    expect(mockOpen).toHaveBeenCalledWith(
      "https://test-web.example.com",
      "_blank"
    );
  });

  it("shows technology count when more than 3 technologies", () => {
    const projectWithManyTechs: Project = {
      ...mockProjects[0],
      technologies: [
        "React",
        "TypeScript",
        "Next.js",
        "Tailwind",
        "Jest",
        "Cypress",
      ],
    };

    render(<ProjectsSection projects={[projectWithManyTechs]} />);

    expect(screen.getByText("+3 more")).toBeInTheDocument();
  });
});
