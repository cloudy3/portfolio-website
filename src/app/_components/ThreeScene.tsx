"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// WebGL capability detection utility
export const detectWebGLSupport = (): boolean => {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    return !!gl;
  } catch {
    return false;
  }
};

// Particle system component
function ParticleSystem({ count = 1000 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Generate particle positions and properties
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Random positions in a sphere
      const radius = Math.random() * 20 + 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Subtle color variations
      const intensity = Math.random() * 0.5 + 0.5;
      colors[i * 3] = intensity; // R
      colors[i * 3 + 1] = intensity * 0.9; // G
      colors[i * 3 + 2] = intensity * 1.1; // B
    }

    return [positions, colors];
  }, [count]);

  // Mouse interaction effect
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animation loop
  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    const positions = meshRef.current.geometry.attributes.position
      .array as Float32Array;

    // Animate particles with mouse influence
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Original positions for reference
      const originalX = positions[i3];
      const originalY = positions[i3 + 1];

      // Mouse influence
      const mouseInfluence = 1.2; // Increased from 0.5 to 1.2 for stronger effect
      const mouseDistanceX = mouseRef.current.x * 15 - originalX; // Increased from 10 to 15 for larger influence area
      const mouseDistanceY = mouseRef.current.y * 15 - originalY; // Increased from 10 to 15 for larger influence area
      const mouseDistance = Math.sqrt(
        mouseDistanceX * mouseDistanceX + mouseDistanceY * mouseDistanceY
      );
      const mouseEffect = Math.max(0, 1 - mouseDistance / 8) * mouseInfluence; // Increased radius from 5 to 8

      // Apply subtle floating animation with mouse interaction
      positions[i3] +=
        Math.sin(time * 0.5 + i * 0.01) * 0.01 +
        mouseDistanceX * mouseEffect * 0.03; // Increased from 0.01 to 0.03 for more visible movement
      positions[i3 + 1] +=
        Math.cos(time * 0.3 + i * 0.01) * 0.01 +
        mouseDistanceY * mouseEffect * 0.03; // Increased from 0.01 to 0.03 for more visible movement
      positions[i3 + 2] += Math.sin(time * 0.4 + i * 0.02) * 0.005;
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;

    // Rotate the entire system slowly
    meshRef.current.rotation.y = time * 0.05;
    meshRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Geometric animation component
function GeometricShapes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.x = time * 0.1;
    groupRef.current.rotation.y = time * 0.15;
  });

  return (
    <group ref={groupRef}>
      {/* Wireframe torus */}
      <mesh position={[-5, 2, -5]}>
        <torusGeometry args={[1, 0.3, 16, 32]} />
        <meshBasicMaterial
          wireframe
          color="#ffd700"
          opacity={0.3}
          transparent
        />
      </mesh>

      {/* Wireframe octahedron */}
      <mesh position={[5, -2, -3]}>
        <octahedronGeometry args={[1.5]} />
        <meshBasicMaterial
          wireframe
          color="#ffffff"
          opacity={0.2}
          transparent
        />
      </mesh>

      {/* Wireframe icosahedron */}
      <mesh position={[0, 3, -8]}>
        <icosahedronGeometry args={[1]} />
        <meshBasicMaterial
          wireframe
          color="#adb5bd"
          opacity={0.25}
          transparent
        />
      </mesh>
    </group>
  );
}

// Loading fallback component
function SceneLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white opacity-50"></div>
    </div>
  );
}

// Fallback component for unsupported browsers
function WebGLFallback() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-amber-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-white rounded-full animate-pulse delay-3000"></div>
      </div>
    </div>
  );
}

// Main ThreeScene component
interface ThreeSceneProps {
  className?: string;
  particleCount?: number;
  enableGeometry?: boolean;
}

export default function ThreeScene({
  className = "",
  particleCount = 800,
  enableGeometry = true,
}: ThreeSceneProps) {
  const [webGLSupported, setWebGLSupported] = useState<boolean | null>(null);

  useEffect(() => {
    setWebGLSupported(detectWebGLSupport());
  }, []);

  // Show loading state while checking WebGL support
  if (webGLSupported === null) {
    return (
      <div className={`relative ${className}`}>
        <SceneLoader />
      </div>
    );
  }

  // Show fallback if WebGL is not supported
  if (!webGLSupported) {
    return (
      <div className={`relative ${className}`}>
        <WebGLFallback />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Canvas
        camera={{
          position: [0, 0, 10],
          fov: 75,
          near: 0.1,
          far: 1000,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]} // Limit pixel ratio for performance
        performance={{ min: 0.5 }} // Performance monitoring
      >
        <Suspense fallback={null}>
          <ParticleSystem count={particleCount} />
          {enableGeometry && <GeometricShapes />}
        </Suspense>
      </Canvas>
    </div>
  );
}
