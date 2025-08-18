import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navigation from "../Navigation";

// Mock scrollIntoView
const mockScrollIntoView = jest.fn();
Object.defineProperty(Element.prototype, "scrollIntoView", {
  value: mockScrollIntoView,
  writable: true,
});

// Mock getBoundingClientRect
Object.defineProperty(Element.prototype, "getBoundingClientRect", {
  value: jest.fn(() => ({
    top: 0,
    bottom: 100,
    left: 0,
    right: 100,
    width: 100,
    height: 100,
  })),
  writable: true,
});

describe("Navigation", () => {
  beforeEach(() => {
    mockScrollIntoView.mockClear();
    // Reset scroll position
    Object.defineProperty(window, "scrollY", { value: 0, writable: true });
  });

  it("renders brand/logo", () => {
    render(<Navigation />);
    expect(screen.getByText("Portfolio")).toBeInTheDocument();
  });

  it("renders desktop navigation items", () => {
    render(<Navigation />);

    // Check for desktop navigation container
    const desktopNavContainer = document.querySelector(".hidden.md\\:block");
    expect(desktopNavContainer).toBeInTheDocument();

    // Check that navigation items exist
    expect(screen.getAllByText("Home")).toHaveLength(2); // Desktop and mobile
    expect(screen.getAllByText("About")).toHaveLength(2);
  });

  it("shows mobile menu button", () => {
    render(<Navigation />);
    const mobileButton = screen.getByRole("button", {
      name: /open main menu/i,
    });
    expect(mobileButton).toBeInTheDocument();
  });

  it("toggles mobile menu when button is clicked", () => {
    render(<Navigation />);
    const mobileButton = screen.getByRole("button", {
      name: /open main menu/i,
    });

    fireEvent.click(mobileButton);

    const mobileNav = document.getElementById("mobile-nav");
    expect(mobileNav).toHaveClass("max-h-96");
  });

  it("handles navigation click", () => {
    // Create a mock element with scrollIntoView
    const mockElement = document.createElement("div");
    mockElement.id = "hero";
    mockElement.scrollIntoView = mockScrollIntoView;
    document.body.appendChild(mockElement);

    render(<Navigation />);
    const homeButton = screen.getAllByText("Home")[0];

    fireEvent.click(homeButton);

    expect(mockScrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "start",
    });

    // Cleanup
    document.body.removeChild(mockElement);
  });

  it("applies correct styling classes", () => {
    render(<Navigation />);
    const nav = screen.getByRole("navigation");

    // Should have fixed positioning and initial transparent background
    expect(nav).toHaveClass("fixed", "top-0", "left-0", "right-0");
    expect(nav).toHaveClass("bg-transparent");
  });
});
