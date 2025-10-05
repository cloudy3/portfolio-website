import { render, screen, fireEvent } from "@testing-library/react";
import HeroSection from "../sections/HeroSection";

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

// Mock ThreeScene component
jest.mock("../ThreeScene", () => {
  return function MockThreeScene({ className }: { className?: string }) {
    return (
      <div data-testid="three-scene" className={className}>
        3D Scene
      </div>
    );
  };
});

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe("HeroSection", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders hero content correctly", () => {
    render(<HeroSection />);

    expect(screen.getByText("Hi,")).toBeInTheDocument();
    expect(screen.getByText("I&apos;m Jing Feng")).toBeInTheDocument();
    expect(
      screen.getByText("Full-Stack Engineer & UI/UX Enthusiast")
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Crafting exceptional digital experiences/)
    ).toBeInTheDocument();
  });

  it("renders call-to-action buttons", () => {
    render(<HeroSection />);

    expect(screen.getByText("View My Work")).toBeInTheDocument();
    expect(screen.getByText("Get In Touch")).toBeInTheDocument();
  });

  it("renders scroll indicator", () => {
    render(<HeroSection />);

    expect(screen.getByText("Scroll to explore")).toBeInTheDocument();
  });

  it("renders ThreeScene component", () => {
    render(<HeroSection />);

    expect(screen.getByTestId("three-scene")).toBeInTheDocument();
  });

  it("handles button clicks without errors", () => {
    // Mock getElementById for scroll functionality
    const mockElement = { offsetTop: 100 };
    jest
      .spyOn(document, "getElementById")
      .mockReturnValue(mockElement as HTMLElement);

    render(<HeroSection />);

    const viewWorkButton = screen.getByText("View My Work");
    const contactButton = screen.getByText("Get In Touch");

    expect(() => {
      fireEvent.click(viewWorkButton);
      fireEvent.click(contactButton);
    }).not.toThrow();
  });

  it("handles scroll indicator click", () => {
    const mockElement = { offsetTop: 100 };
    jest
      .spyOn(document, "getElementById")
      .mockReturnValue(mockElement as HTMLElement);

    render(<HeroSection />);

    const scrollIndicator = screen.getByText("Scroll to explore");

    expect(() => {
      fireEvent.click(scrollIndicator);
    }).not.toThrow();
  });

  it("applies custom className", () => {
    const { container } = render(<HeroSection className="custom-class" />);

    expect(container.firstChild).toHaveClass("custom-class");
  });
});
