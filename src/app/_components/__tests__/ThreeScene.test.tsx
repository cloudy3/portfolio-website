// Tests for ThreeScene WebGL detection functionality
import { detectWebGLSupport } from "../ThreeScene";

// Mock Canvas and WebGL context
const mockGetContext = jest.fn();
const mockCreateElement = jest.fn(() => ({
  getContext: mockGetContext,
}));

// Mock document.createElement
Object.defineProperty(document, "createElement", {
  value: mockCreateElement,
  writable: true,
});

describe("ThreeScene WebGL Detection", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset the createElement mock to default behavior
    mockCreateElement.mockReturnValue({
      getContext: mockGetContext,
    });
  });

  describe("detectWebGLSupport", () => {
    it("should return true when WebGL is supported", () => {
      // Mock successful WebGL context creation
      mockGetContext.mockReturnValueOnce({
        // Mock WebGL context object
        getParameter: jest.fn(),
        createShader: jest.fn(),
      });

      const result = detectWebGLSupport();

      expect(mockCreateElement).toHaveBeenCalledWith("canvas");
      expect(mockGetContext).toHaveBeenCalledWith("webgl");
      expect(result).toBe(true);
    });

    it("should return true when experimental-webgl is supported", () => {
      // Mock WebGL failing but experimental-webgl succeeding
      mockGetContext
        .mockReturnValueOnce(null) // webgl fails
        .mockReturnValueOnce({
          // experimental-webgl succeeds
          getParameter: jest.fn(),
          createShader: jest.fn(),
        });

      const result = detectWebGLSupport();

      expect(mockCreateElement).toHaveBeenCalledWith("canvas");
      expect(mockGetContext).toHaveBeenCalledWith("webgl");
      expect(mockGetContext).toHaveBeenCalledWith("experimental-webgl");
      expect(result).toBe(true);
    });

    it("should return false when WebGL is not supported", () => {
      // Mock both WebGL contexts failing
      mockGetContext
        .mockReturnValueOnce(null) // webgl fails
        .mockReturnValueOnce(null); // experimental-webgl fails

      const result = detectWebGLSupport();

      expect(mockCreateElement).toHaveBeenCalledWith("canvas");
      expect(mockGetContext).toHaveBeenCalledWith("webgl");
      expect(mockGetContext).toHaveBeenCalledWith("experimental-webgl");
      expect(result).toBe(false);
    });

    it("should return false when an exception is thrown", () => {
      // Mock exception during context creation
      mockGetContext.mockImplementation(() => {
        throw new Error("WebGL not available");
      });

      const result = detectWebGLSupport();

      expect(result).toBe(false);
    });

    it("should handle canvas creation failure", () => {
      // Mock canvas creation failure
      mockCreateElement.mockImplementation(() => {
        throw new Error("Canvas creation failed");
      });

      const result = detectWebGLSupport();

      expect(result).toBe(false);
    });
  });
});

// Note: Full component integration tests for Three.js components are complex in jsdom
// The WebGL detection tests above cover the main functionality we need to verify
