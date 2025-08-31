"use client";

import { useState, useEffect, useRef } from "react";
import { ContactForm } from "@/types";
import { VALIDATION, SOCIAL_LINKS } from "@/lib/constants";

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface FormState {
  isSubmitting: boolean;
  isSubmitted: boolean;
  errors: FormErrors;
}

const ContactSection = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    isSubmitted: false,
    errors: {},
  });

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  // Real-time validation
  const validateField = (name: keyof ContactForm, value: string): string => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required";
        if (value.trim().length < VALIDATION.minNameLength)
          return `Name must be at least ${VALIDATION.minNameLength} characters`;
        if (value.trim().length > VALIDATION.maxNameLength)
          return `Name must be less than ${VALIDATION.maxNameLength} characters`;
        return "";

      case "email":
        if (!value.trim()) return "Email is required";
        if (!VALIDATION.email.test(value))
          return "Please enter a valid email address";
        return "";

      case "subject":
        if (!value.trim()) return "Subject is required";
        if (value.trim().length < 3)
          return "Subject must be at least 3 characters";
        return "";

      case "message":
        if (!value.trim()) return "Message is required";
        if (value.trim().length < VALIDATION.minMessageLength)
          return `Message must be at least ${VALIDATION.minMessageLength} characters`;
        if (value.trim().length > VALIDATION.maxMessageLength)
          return `Message must be less than ${VALIDATION.maxMessageLength} characters`;
        return "";

      default:
        return "";
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const fieldName = name as keyof ContactForm;

    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    // Real-time validation
    const error = validateField(fieldName, value);
    setFormState((prev) => ({
      ...prev,
      errors: {
        ...prev.errors,
        [fieldName]: error,
      },
    }));
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    let isValid = true;

    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key as keyof ContactForm, value);
      if (error) {
        errors[key as keyof FormErrors] = error;
        isValid = false;
      }
    });

    setFormState((prev) => ({
      ...prev,
      errors,
    }));

    return isValid;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setFormState((prev) => ({
      ...prev,
      isSubmitting: true,
    }));

    try {
      // Simulate form submission - in a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setFormState((prev) => ({
        ...prev,
        isSubmitting: false,
        isSubmitted: true,
      }));

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormState((prev) => ({
          ...prev,
          isSubmitted: false,
        }));
      }, 5000);
    } catch {
      setFormState((prev) => ({
        ...prev,
        isSubmitting: false,
        errors: {
          ...prev.errors,
          message: "Failed to send message. Please try again.",
        },
      }));
    }
  };

  const getSocialIcon = (iconName: string) => {
    const icons: Record<string, string> = {
      github: "🐙",
      linkedin: "💼",
      twitter: "🐦",
      email: "📧",
    };
    return icons[iconName] || "🔗";
  };

  return (
    <section
      id="contact"
      className="section-padding bg-gray-50"
      ref={sectionRef}
    >
      <div className="container-custom">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="section-title text-gray-900">Get In Touch</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-center">
            Have a project in mind or want to collaborate? I&apos;d love to hear
            from you. Let&apos;s create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div
            className={`space-y-6 sm:space-y-8 transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <div>
              <h3 className="text-gray-900 mb-6">Let&apos;s Connect</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                I&apos;m always interested in new opportunities, interesting
                projects, and meaningful collaborations. Whether you have a
                question about my work or just want to say hello, feel free to
                reach out.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white text-xl">
                  📧
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Email</h4>
                  <a
                    href="mailto:contact@example.com"
                    className="text-gray-600 hover:text-amber-500 transition-colors duration-300"
                  >
                    contact@example.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white text-xl">
                  📍
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Location</h4>
                  <p className="text-gray-600">
                    Available for remote work worldwide
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white text-xl">
                  ⏰
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Response Time</h4>
                  <p className="text-gray-600">Usually within 24 hours</p>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Follow Me</h4>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center text-lg sm:text-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-400 hover:to-orange-500 hover:text-white active:scale-95 touch-manipulation"
                    aria-label={`Visit my ${social.name} profile`}
                  >
                    {getSocialIcon(social.icon)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
              <h3 className="text-gray-900 mb-6">Send Message</h3>

              {/* Success Message */}
              {formState.isSubmitted && (
                <div
                  className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
                  role="alert"
                  aria-live="polite"
                >
                  <div className="flex items-center">
                    <span className="text-green-500 text-xl mr-3">✅</span>
                    <div>
                      <h4 className="font-semibold text-green-800">
                        Message Sent Successfully!
                      </h4>
                      <p className="text-green-700 text-sm">
                        Thank you for reaching out. I&apos;ll get back to you
                        soon.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 ${
                      formState.errors.name
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    placeholder="Enter your full name"
                    aria-describedby={
                      formState.errors.name ? "name-error" : undefined
                    }
                    aria-invalid={!!formState.errors.name}
                  />
                  {formState.errors.name && (
                    <p
                      id="name-error"
                      className="mt-2 text-sm text-red-600"
                      role="alert"
                    >
                      {formState.errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 ${
                      formState.errors.email
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    placeholder="Enter your email address"
                    aria-describedby={
                      formState.errors.email ? "email-error" : undefined
                    }
                    aria-invalid={!!formState.errors.email}
                  />
                  {formState.errors.email && (
                    <p
                      id="email-error"
                      className="mt-2 text-sm text-red-600"
                      role="alert"
                    >
                      {formState.errors.email}
                    </p>
                  )}
                </div>

                {/* Subject Field */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 ${
                      formState.errors.subject
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    placeholder="What's this about?"
                    aria-describedby={
                      formState.errors.subject ? "subject-error" : undefined
                    }
                    aria-invalid={!!formState.errors.subject}
                  />
                  {formState.errors.subject && (
                    <p
                      id="subject-error"
                      className="mt-2 text-sm text-red-600"
                      role="alert"
                    >
                      {formState.errors.subject}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 resize-vertical ${
                      formState.errors.message
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    placeholder="Tell me about your project or just say hello..."
                    aria-describedby={
                      formState.errors.message ? "message-error" : undefined
                    }
                    aria-invalid={!!formState.errors.message}
                  />
                  <div className="flex justify-between items-center mt-2">
                    {formState.errors.message ? (
                      <p
                        id="message-error"
                        className="text-sm text-red-600"
                        role="alert"
                      >
                        {formState.errors.message}
                      </p>
                    ) : (
                      <div></div>
                    )}
                    <p className="text-sm text-gray-500">
                      {formData.message.length}/{VALIDATION.maxMessageLength}
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={formState.isSubmitting}
                  className={`w-full py-3 sm:py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg active:scale-95 touch-manipulation ${
                    formState.isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600"
                  }`}
                  aria-describedby="submit-status"
                >
                  {formState.isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span className="text-sm sm:text-base">
                        Sending Message...
                      </span>
                    </span>
                  ) : (
                    <span className="text-sm sm:text-base">Send Message</span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
