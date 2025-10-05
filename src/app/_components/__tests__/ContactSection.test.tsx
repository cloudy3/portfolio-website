import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ContactSection from "../sections/ContactSection";

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

describe("ContactSection", () => {
  beforeEach(() => {
    mockIntersectionObserver.mockClear();
  });

  it("renders contact section with all elements", () => {
    render(<ContactSection />);

    // Check section header
    expect(screen.getByText("Get In Touch")).toBeInTheDocument();
    expect(screen.getAllByText("Send Message")[0]).toBeInTheDocument();

    // Check contact information
    expect(screen.getByText("Let's Connect")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Location")).toBeInTheDocument();
    expect(screen.getByText("Response Time")).toBeInTheDocument();

    // Check form fields
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it("renders social media links", () => {
    render(<ContactSection />);

    const socialLinks = screen.getAllByRole("link");
    const socialMediaLinks = socialLinks.filter((link) =>
      link.getAttribute("aria-label")?.includes("Visit my")
    );

    expect(socialMediaLinks.length).toBeGreaterThan(0);
  });

  describe("Form Validation", () => {
    it("shows validation errors for empty required fields", async () => {
      const user = userEvent.setup();
      render(<ContactSection />);

      const submitButton = screen.getByRole("button", {
        name: /send message/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText("Name is required")).toBeInTheDocument();
        expect(screen.getByText("Email is required")).toBeInTheDocument();
        expect(screen.getByText("Subject is required")).toBeInTheDocument();
        expect(screen.getByText("Message is required")).toBeInTheDocument();
      });
    });

    it("validates name field length", async () => {
      const user = userEvent.setup();
      render(<ContactSection />);

      const nameInput = screen.getByLabelText(/full name/i);

      // Test minimum length
      await user.type(nameInput, "A");
      fireEvent.blur(nameInput);

      await waitFor(() => {
        expect(
          screen.getByText("Name must be at least 2 characters")
        ).toBeInTheDocument();
      });
    });

    it("validates email format", async () => {
      const user = userEvent.setup();
      render(<ContactSection />);

      const emailInput = screen.getByLabelText(/email address/i);

      await user.type(emailInput, "invalid-email");
      fireEvent.blur(emailInput);

      await waitFor(() => {
        expect(
          screen.getByText("Please enter a valid email address")
        ).toBeInTheDocument();
      });

      // Test valid email
      await user.clear(emailInput);
      await user.type(emailInput, "test@example.com");
      fireEvent.blur(emailInput);

      await waitFor(() => {
        expect(
          screen.queryByText("Please enter a valid email address")
        ).not.toBeInTheDocument();
      });
    });

    it("validates subject field", async () => {
      const user = userEvent.setup();
      render(<ContactSection />);

      const subjectInput = screen.getByLabelText(/subject/i);

      await user.type(subjectInput, "Hi");
      fireEvent.blur(subjectInput);

      await waitFor(() => {
        expect(
          screen.getByText("Subject must be at least 3 characters")
        ).toBeInTheDocument();
      });
    });

    it("validates message field length", async () => {
      const user = userEvent.setup();
      render(<ContactSection />);

      const messageInput = screen.getByLabelText(/message/i);

      // Test minimum length
      await user.type(messageInput, "Short");
      fireEvent.blur(messageInput);

      await waitFor(() => {
        expect(
          screen.getByText("Message must be at least 10 characters")
        ).toBeInTheDocument();
      });
    });

    it("shows character count for message field", () => {
      render(<ContactSection />);

      const characterCount = screen.getByText("0/1000");
      expect(characterCount).toBeInTheDocument();
    });

    it("updates character count as user types", async () => {
      const user = userEvent.setup();
      render(<ContactSection />);

      const messageInput = screen.getByLabelText(/message/i);
      await user.type(messageInput, "Hello world");

      await waitFor(() => {
        expect(screen.getByText("11/1000")).toBeInTheDocument();
      });
    });
  });

  describe("Form Submission", () => {
    it("submits form with valid data", async () => {
      const user = userEvent.setup();
      render(<ContactSection />);

      // Fill out form with valid data
      await user.type(screen.getByLabelText(/full name/i), "John Doe");
      await user.type(
        screen.getByLabelText(/email address/i),
        "john@example.com"
      );
      await user.type(screen.getByLabelText(/subject/i), "Test Subject");
      await user.type(
        screen.getByLabelText(/message/i),
        "This is a test message with enough characters."
      );

      const submitButton = screen.getByRole("button", {
        name: /send message/i,
      });
      await user.click(submitButton);

      // Check loading state
      expect(screen.getByText("Sending Message...")).toBeInTheDocument();
      expect(submitButton).toBeDisabled();

      // Wait for success message
      await waitFor(
        () => {
          expect(
            screen.getByText("Message Sent Successfully!")
          ).toBeInTheDocument();
        },
        { timeout: 3000 }
      );

      // Check that form is reset
      expect(screen.getByLabelText(/full name/i)).toHaveValue("");
      expect(screen.getByLabelText(/email address/i)).toHaveValue("");
      expect(screen.getByLabelText(/subject/i)).toHaveValue("");
      expect(screen.getByLabelText(/message/i)).toHaveValue("");
    });

    it("prevents submission with invalid data", async () => {
      const user = userEvent.setup();
      render(<ContactSection />);

      const submitButton = screen.getByRole("button", {
        name: /send message/i,
      });
      await user.click(submitButton);

      // Should not show loading state
      expect(screen.queryByText("Sending Message...")).not.toBeInTheDocument();
      expect(submitButton).not.toBeDisabled();
    });
  });

  describe("Accessibility", () => {
    it("has proper form labels", () => {
      render(<ContactSection />);

      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    });

    it("has proper ARIA attributes for form validation", async () => {
      const user = userEvent.setup();
      render(<ContactSection />);

      const nameInput = screen.getByLabelText(/full name/i);
      const submitButton = screen.getByRole("button", {
        name: /send message/i,
      });

      await user.click(submitButton);

      await waitFor(() => {
        expect(nameInput).toHaveAttribute("aria-invalid", "true");
        expect(nameInput).toHaveAttribute("aria-describedby", "name-error");
      });
    });

    it("has proper role attributes for alerts", async () => {
      const user = userEvent.setup();
      render(<ContactSection />);

      const submitButton = screen.getByRole("button", {
        name: /send message/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        const errorMessages = screen.getAllByRole("alert");
        expect(errorMessages.length).toBeGreaterThan(0);
      });
    });

    it("has proper aria-labels for social media links", () => {
      render(<ContactSection />);

      const socialLinks = screen.getAllByRole("link");
      const socialMediaLinks = socialLinks.filter((link) =>
        link.getAttribute("aria-label")?.includes("Visit my")
      );

      socialMediaLinks.forEach((link) => {
        expect(link).toHaveAttribute("aria-label");
        expect(link.getAttribute("aria-label")).toMatch(/Visit my .+ profile/);
      });
    });

    it("supports keyboard navigation", async () => {
      const user = userEvent.setup();
      render(<ContactSection />);

      const nameInput = screen.getByLabelText(/full name/i);
      const emailInput = screen.getByLabelText(/email address/i);
      const subjectInput = screen.getByLabelText(/subject/i);
      const messageInput = screen.getByLabelText(/message/i);
      const submitButton = screen.getByRole("button", {
        name: /send message/i,
      });

      // Focus on the first form field directly
      nameInput.focus();
      expect(nameInput).toHaveFocus();

      await user.tab();
      expect(emailInput).toHaveFocus();

      await user.tab();
      expect(subjectInput).toHaveFocus();

      await user.tab();
      expect(messageInput).toHaveFocus();

      await user.tab();
      expect(submitButton).toHaveFocus();
    });
  });

  describe("Real-time Validation", () => {
    it("validates fields as user types", async () => {
      const user = userEvent.setup();
      render(<ContactSection />);

      const nameInput = screen.getByLabelText(/full name/i);

      // Type invalid input
      await user.type(nameInput, "A");
      fireEvent.blur(nameInput);

      await waitFor(() => {
        expect(
          screen.getByText("Name must be at least 2 characters")
        ).toBeInTheDocument();
      });

      // Fix the input
      await user.type(nameInput, "lice");

      await waitFor(() => {
        expect(
          screen.queryByText("Name must be at least 2 characters")
        ).not.toBeInTheDocument();
      });
    });

    it("clears validation errors when field becomes valid", async () => {
      const user = userEvent.setup();
      render(<ContactSection />);

      const emailInput = screen.getByLabelText(/email address/i);

      // Type invalid email
      await user.type(emailInput, "invalid");
      fireEvent.blur(emailInput);

      await waitFor(() => {
        expect(
          screen.getByText("Please enter a valid email address")
        ).toBeInTheDocument();
      });

      // Fix the email
      await user.clear(emailInput);
      await user.type(emailInput, "valid@example.com");

      await waitFor(() => {
        expect(
          screen.queryByText("Please enter a valid email address")
        ).not.toBeInTheDocument();
      });
    });
  });
});
