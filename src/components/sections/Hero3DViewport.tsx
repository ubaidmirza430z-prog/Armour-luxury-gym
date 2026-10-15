import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export interface Hero3DViewportProps {
  className?: string;
  scrollY?: number;
}

/**
 * ============================================================================
 * HERO 3D VIEWPORT: SCULPTURAL LUXURY GYM APPARATUS (PBR)
 * ============================================================================
 * 
 * SPECIFICATION (PROMPT #4):
 * - Lightweight premium 3D object: A futuristic luxury gym apparatus /
 *   sculptural fitness machine & architectural dumbbell monolith.
 * - Materials: Matte obsidian carbon black, brushed titanium-metallic rings,
 *   restrained knurled gold (#D4AF37) accents.
 * - Lighting: Dark cinematic studio lighting with soft key, gold rim light, and
 *   restrained cool fill. Majority of the scene remains dark.
 * - Interactivity: Subtle continuous rotation, delicate mouse parallax on desktop,
 *   subtle touch interaction on mobile, and smooth scroll damping.
 * - Mobile optimizations: DPR capped to 1.5 on mobile (2.0 max on desktop),
 *   IntersectionObserver pauses rendering loop when off-screen.
 * - Fallback: WebGL capability detection with high-end static fallback panel.
 * - Future Asset Slot: Modularly structured so that an optimized GLB can later
 *   be loaded from `/public/models/armour-model.glb` with minimal lines.
 * ============================================================================
 */
export const Hero3DViewport: React.FC<Hero3DViewportProps> = ({ className = '', scrollY = 0 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // References for Three.js instance
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const apparatusGroupRef = useRef<THREE.Group | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  // Mouse & Touch interaction tracking
  const targetRotation = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const currentRotation = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // 1. WebGL Support Test
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) {
        setHasWebGL(false);
      }
    } catch {
      setHasWebGL(false);
    }
  }, []);

  // 2. Initialize Three.js Scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !hasWebGL) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 420;
    const isMobile = window.innerWidth < 768;

    // A. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // B. Camera Setup
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.2);
    cameraRef.current = camera;

    // C. WebGL Renderer with capped DPR for mobile
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setHasWebGL(false);
      return;
    }

    renderer.setSize(width, height);
    // Cap DPR: 1.5 on mobile for smooth performance and battery preservation; max 2 on desktop
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // D. Cinematic Luxury Studio Lighting
    // Subtle low-intensity ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    // Key soft white light from top-left
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.6);
    keyLight.position.set(-3.5, 4.0, 3.0);
    scene.add(keyLight);

    // Controlled Gold Rim Light from top-right (#D4AF37)
    const goldRimLight = new THREE.DirectionalLight(0xd4af37, 2.8);
    goldRimLight.position.set(4.0, 3.5, 2.5);
    scene.add(goldRimLight);

    // Cool subtle bottom fill for architectural depth
    const bottomFill = new THREE.DirectionalLight(0x2a303c, 0.8);
    bottomFill.position.set(0, -4.0, -1.0);
    scene.add(bottomFill);

    // E. Build Sculptural Luxury Gym Apparatus Monolith
    const apparatusGroup = new THREE.Group();
    apparatusGroupRef.current = apparatusGroup;

    // --- Materials (PBR standard) ---
    // 1. Matte Obsidian Carbon
    const matteBlackMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.72,
      metalness: 0.18,
    });

    // 2. Brushed Titanium / Chrome
    const titaniumMat = new THREE.MeshStandardMaterial({
      color: 0x3a3a3a,
      roughness: 0.3,
      metalness: 0.85,
    });

    // 3. Restrained Knurled Gold (#D4AF37)
    const goldAccentMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.32,
      metalness: 0.88,
    });

    // --- Geometry: Sculptural dumbbell / architectural monolith core ---
    // Central knurled gold grip cylinder
    const gripGeo = new THREE.CylinderGeometry(0.18, 0.18, 1.8, 32);
    const gripMesh = new THREE.Mesh(gripGeo, goldAccentMat);
    gripMesh.rotation.z = Math.PI / 2;
    apparatusGroup.add(gripMesh);

    // Grip end collars (titanium)
    const collarGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.15, 32);
    const collarLeft = new THREE.Mesh(collarGeo, titaniumMat);
    collarLeft.rotation.z = Math.PI / 2;
    collarLeft.position.x = -0.85;
    apparatusGroup.add(collarLeft);

    const collarRight = new THREE.Mesh(collarGeo, titaniumMat);
    collarRight.rotation.z = Math.PI / 2;
    collarRight.position.x = 0.85;
    apparatusGroup.add(collarRight);

    // Left & Right Architectural Weight Heads (Matte Obsidian Dodecagons/Cylinders)
    const headGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.42, 16);
    const leftHead = new THREE.Mesh(headGeo, matteBlackMat);
    leftHead.rotation.z = Math.PI / 2;
    leftHead.position.x = -1.15;
    apparatusGroup.add(leftHead);

    const rightHead = new THREE.Mesh(headGeo, matteBlackMat);
    rightHead.rotation.z = Math.PI / 2;
    rightHead.position.x = 1.15;
    apparatusGroup.add(rightHead);

    // Outer Faceted Gold Rim Plates on each head
    const rimPlateGeo = new THREE.CylinderGeometry(0.88, 0.88, 0.08, 16);
    const leftRim = new THREE.Mesh(rimPlateGeo, goldAccentMat);
    leftRim.rotation.z = Math.PI / 2;
    leftRim.position.x = -1.38;
    apparatusGroup.add(leftRim);

    const rightRim = new THREE.Mesh(rimPlateGeo, goldAccentMat);
    rightRim.rotation.z = Math.PI / 2;
    rightRim.position.x = 1.38;
    apparatusGroup.add(rightRim);

    // Outer Monolith End Caps (Obsidian)
    const capGeo = new THREE.CylinderGeometry(0.65, 0.65, 0.12, 16);
    const leftCap = new THREE.Mesh(capGeo, matteBlackMat);
    leftCap.rotation.z = Math.PI / 2;
    leftCap.position.x = -1.48;
    apparatusGroup.add(leftCap);

    const rightCap = new THREE.Mesh(capGeo, matteBlackMat);
    rightCap.rotation.z = Math.PI / 2;
    rightCap.position.x = 1.48;
    apparatusGroup.add(rightCap);

    // Outer Architectural Orbit Cage / Precision Gyroscope Ring (Titanium)
    const ringGeo = new THREE.TorusGeometry(1.65, 0.025, 16, 64);
    const ringMesh = new THREE.Mesh(ringGeo, titaniumMat);
    ringMesh.rotation.x = Math.PI / 3;
    apparatusGroup.add(ringMesh);

    // Second Subtle Gold Accent Ring
    const goldRingGeo = new THREE.TorusGeometry(1.85, 0.015, 16, 64);
    const goldRingMesh = new THREE.Mesh(goldRingGeo, goldAccentMat);
    goldRingMesh.rotation.y = Math.PI / 4;
    apparatusGroup.add(goldRingMesh);

    // Initial slight diagonal tilt for editorial poise
    apparatusGroup.rotation.z = -0.32;
    apparatusGroup.rotation.y = 0.45;
    apparatusGroup.position.set(0, 0, 0);

    scene.add(apparatusGroup);
    setIsLoaded(true);

    // F. Performance Optimization: Pause render loop when offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // G. Continuous Premium Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return;

      const delta = clock.getDelta();

      if (apparatusGroup && !prefersReducedMotion) {
        // Very slow, stately baseline rotation
        apparatusGroup.rotation.y += delta * 0.18;
        apparatusGroup.rotation.x += delta * 0.06;

        // Smooth damping interpolation toward user mouse/touch target
        currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.05;
        currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.05;

        apparatusGroup.position.x = currentRotation.current.y * 0.45;
        apparatusGroup.position.y = -currentRotation.current.x * 0.35;
      }

      renderer.render(scene, camera);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    // H. Responsive Resize Handler
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight || 420;
      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // I. Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);

      gripGeo.dispose();
      collarGeo.dispose();
      headGeo.dispose();
      rimPlateGeo.dispose();
      capGeo.dispose();
      ringGeo.dispose();
      goldRingGeo.dispose();
      matteBlackMat.dispose();
      titaniumMat.dispose();
      goldAccentMat.dispose();

      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [hasWebGL]);

  // Subtle Parallax Scroll Damping (from parent scroll position)
  useEffect(() => {
    if (!apparatusGroupRef.current) return;
    const scrollFactor = Math.min(scrollY / 1000, 1);
    // Subtle tilt & vertical shift as user scrolls away
    apparatusGroupRef.current.rotation.z = -0.32 - scrollFactor * 0.25;
    apparatusGroupRef.current.position.y = -scrollFactor * 0.4;
  }, [scrollY]);

  // Mouse move handler for delicate desktop parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    targetRotation.current = { x: y * 0.35, y: x * 0.35 };
  };

  const handleMouseLeave = () => {
    targetRotation.current = { x: 0, y: 0 };
  };

  // Subtle touch move for mobile devices
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotation.current = { x: y * 0.15, y: x * 0.15 };
    }
  };

  const handleTouchEnd = () => {
    targetRotation.current = { x: 0, y: 0 };
  };

  return (
    <div
      className={`relative w-full aspect-square max-w-[460px] sm:max-w-[490px] md:max-w-none md:h-[460px] lg:h-[500px] bg-[#0c0c0c] border border-[#292929] rounded-sm p-2 flex flex-col items-center justify-center overflow-hidden select-none group shadow-[0_10px_35px_rgba(0,0,0,0.6)] ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Interactive 3D Architectural Apparatus Monolith preview"
      role="region"
    >
      {/* Subtle radial luxury glow behind object */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.15) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      {/* Structural Crosshair Accent Hairlines */}
      <div className="absolute top-3 left-3 text-[#383838] text-[9.5px] font-mono tracking-wider pointer-events-none select-none">
        01 // APPARATUS
      </div>
      <div className="absolute top-3 right-3 text-[#383838] text-[9.5px] font-mono tracking-wider pointer-events-none select-none">
        PBR STUDIO RIG
      </div>
      <div className="absolute bottom-3 left-3 text-[#383838] text-[9.5px] font-mono tracking-wider pointer-events-none select-none">
        INTERACTIVE 3D
      </div>
      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 pointer-events-none select-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
        <span className="text-[9.5px] font-mono text-[#D4AF37] tracking-wider uppercase">
          WebGL Active
        </span>
      </div>

      {/* Primary Three.js Mounting Canvas or Static WebGL Fallback */}
      {hasWebGL ? (
        <div
          ref={containerRef}
          className="w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center touch-pan-y"
          style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 500ms ease' }}
        />
      ) : (
        /* WebGL Disabled / Unsupported Luxury Fallback */
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#090909]">
          <div className="w-14 h-14 rounded-xs border border-[#D4AF37]/50 bg-[#D4AF37]/10 flex items-center justify-center mb-4">
            <span className="font-serif text-lg font-bold text-[#D4AF37]">AL</span>
          </div>
          <h3 className="font-serif text-sm tracking-widest text-white uppercase mb-1">
            Sculptural Apparatus Monolith
          </h3>
          <p className="text-xs text-[#A5A5A5] max-w-xs font-light leading-relaxed">
            High-fidelity 3D apparatus model preview. WebGL acceleration is currently inactive or restricted on this device.
          </p>
        </div>
      )}
    </div>
  );
};
