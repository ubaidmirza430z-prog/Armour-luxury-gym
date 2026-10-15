import React, { useEffect, useRef, useState } from 'react';
import { SectionContainer } from '../ui/SectionContainer';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import * as THREE from 'three';
import { Play, Pause, Layers, ShieldCheck, Box } from 'lucide-react';

/**
 * ============================================================================
 * SECTION 04: 3D SPATIAL DUMBBELL & ARCHITECTURAL VIEWPORT
 * ============================================================================
 * 
 * SPECIFICATIONS & OPTIMIZATIONS:
 * - Robust WebGL capability detection with graceful fallback panel.
 * - Mobile DPR capped to 1.5 (2.0 on desktop) to protect mobile GPUs and battery.
 * - IntersectionObserver pauses rendering loop when off-screen.
 * - Respects prefers-reduced-motion.
 * - Touch-friendly controls with min 44px hit targets.
 * ============================================================================
 */
export const ThreeExperienceSection: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isRotating, setIsRotating] = useState(true);
  const [wireframeMode, setWireframeMode] = useState(false);
  const [fpsState, setFpsState] = useState('60 FPS');
  const [isHovered, setIsHovered] = useState(false);

  // References to Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshGroupRef = useRef<THREE.Group | null>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const animFrameId = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  // 1. Initial WebGL Support Detection
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

  useEffect(() => {
    const container = mountRef.current;
    if (!container || !hasWebGL) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsRotating(false);
    }

    const width = container.clientWidth;
    const height = container.clientHeight || 450;
    const isMobile = window.innerWidth < 768;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x080808);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.5);

    // 3. Optimized WebGL Renderer with safe try-catch
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: 'high-performance',
        alpha: false,
      });
    } catch (err) {
      console.warn('WebGL initialization failed, switching to static fallback:', err);
      setHasWebGL(false);
      return;
    }

    renderer.setSize(width, height);
    // Limit DPR on mobile to 1.5 to reduce thermal load and battery consumption
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    rendererRef.current = renderer;

    // Mount canvas to DOM
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Luxury Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const goldRimLight = new THREE.DirectionalLight(0xd4af37, 2.8);
    goldRimLight.position.set(3, 4, 3);
    scene.add(goldRimLight);

    const coolFillLight = new THREE.DirectionalLight(0x4a5568, 1.2);
    coolFillLight.position.set(-3, -2, -2);
    scene.add(coolFillLight);

    // 5. Placeholder Geometry Group: Architectural Dumbbell Monolith
    const group = new THREE.Group();
    meshGroupRef.current = group;

    // Outer architectural geometric shield
    const outerGeo = new THREE.IcosahedronGeometry(1.2, 0);
    const outerMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.85,
      roughness: 0.25,
      wireframe: wireframeMode,
    });
    materialRef.current = outerMat;
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    group.add(outerMesh);

    // Inner wireframe armature
    const innerGeo = new THREE.OctahedronGeometry(1.5, 1);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x292929,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    group.add(innerMesh);

    scene.add(group);

    // 6. Pause rendering loop when offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // 7. Animation Loop
    let lastTime = performance.now();
    let frameCount = 0;

    const animate = (time: number) => {
      animFrameId.current = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return;

      frameCount++;
      if (time - lastTime >= 1000) {
        setFpsState(`${frameCount} FPS`);
        frameCount = 0;
        lastTime = time;
      }

      if (group && isRotating) {
        group.rotation.y += 0.008;
        group.rotation.x += 0.003;
      }

      renderer.render(scene, camera);
    };

    animFrameId.current = requestAnimationFrame(animate);

    // 8. Responsive Resize Handling
    const handleResize = () => {
      if (!container || !rendererRef.current) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight || 450;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // 9. Cleanup & Resource Disposal
    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);

      outerGeo.dispose();
      outerMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();

      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [isRotating, hasWebGL]);

  // Update wireframe mode dynamically without tearing down scene
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.wireframe = wireframeMode;
    }
  }, [wireframeMode]);

  return (
    <SectionContainer
      id="experience-3d"
      background="canvas"
      aria-label="3D Spatial Experience"
    >
      <SectionHeading
        stepBadge="04 // 3D ARCHITECTURE"
        eyebrow="Interactive Spatial Viewport"
        title="ARCHITECTURAL 3D EXPERIENCE PREVIEW"
        description="An optimized Three.js spatial viewport engineered for tactile interaction. Designed to showcase custom calibrated equipment with real-time PBR lighting."
      />

      {/* 3D Viewport Frame */}
      <div className="w-full bg-[#111111] border border-[#292929] rounded-[4px] p-2 sm:p-3 relative overflow-hidden">
        {/* Top Viewport Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-2 border-b border-[#292929] text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" aria-hidden="true" />
            <span className="font-mono text-white text-[11px] tracking-wider uppercase font-semibold">
              Spatial Canvas
            </span>
            <span className="text-[#6B6B6B]">·</span>
            <span className="font-mono text-[#888888] text-[10px]">
              {hasWebGL ? 'WebGL PBR Shading' : '2D Architectural Fallback'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-[#D4AF37] px-2 py-0.5 border border-[#D4AF37]/30 bg-[#D4AF37]/5 rounded-[2px]">
              {hasWebGL ? fpsState : 'STANDBY'}
            </span>
            <span className="font-mono text-[10px] text-[#A5A5A5] px-2 py-0.5 border border-[#292929] bg-[#080808] rounded-[2px]">
              DPR: Capped
            </span>
          </div>
        </div>

        {/* The 3D Canvas Mounting Surface or Graceful Fallback */}
        {hasWebGL ? (
          <div
            ref={mountRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="w-full h-[360px] sm:h-[450px] md:h-[500px] bg-[#080808] relative overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing"
            aria-label="Interactive 3D viewport canvas. Drag to inspect geometry."
          >
            {/* Subtle watermark badge in viewport */}
            <div className="absolute top-4 left-4 z-10 pointer-events-none">
              <span className="text-[10px] font-mono tracking-widest text-[#666666] uppercase block">
                APPARATUS MONOLITH
              </span>
              <span className="text-xs font-serif text-[#A5A5A5]">
                Geometric Precision Shield
              </span>
            </div>
          </div>
        ) : (
          /* Graceful Architectural Fallback */
          <div className="w-full h-[360px] sm:h-[450px] md:h-[500px] bg-[#080808] relative overflow-hidden flex flex-col items-center justify-center text-center p-6">
            <div className="w-16 h-16 rounded-full bg-[#141414] border border-[#D4AF37]/60 flex items-center justify-center text-[#D4AF37] mb-4">
              <Box size={28} />
            </div>
            <h3 className="font-serif text-lg font-bold text-white uppercase tracking-wider mb-2">
              SPATIAL VIEWPORT STANDBY
            </h3>
            <p className="text-xs text-[#888888] font-sans max-w-sm leading-relaxed mb-4">
              Hardware WebGL acceleration is not active in this environment. The spatial apparatus is rendered in high-fidelity 2D mode.
            </p>
            <div className="flex items-center gap-2 text-[10px] font-mono text-[#D4AF37] border border-[#D4AF37]/30 px-3 py-1 rounded-[2px] bg-[#D4AF37]/5">
              <ShieldCheck size={12} />
              <span>HIGH PERFORMANCE STANDBY PROTOCOL</span>
            </div>
          </div>
        )}

        {/* Viewport Control Bar */}
        <div className="mt-2 pt-2 border-t border-[#292929] flex flex-wrap items-center justify-between gap-3 px-3 py-2">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsRotating(!isRotating)}
              disabled={!hasWebGL}
              className="text-[11px] min-h-[44px] px-3.5"
            >
              {isRotating ? (
                <>
                  <Pause size={13} className="text-[#D4AF37]" /> Pause Rotation
                </>
              ) : (
                <>
                  <Play size={13} className="text-[#D4AF37]" /> Auto Rotate
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setWireframeMode(!wireframeMode)}
              disabled={!hasWebGL}
              className="text-[11px] min-h-[44px] px-3.5"
            >
              <Layers size={13} className="text-[#D4AF37]" />
              {wireframeMode ? 'Solid Shader' : 'Wireframe Geometry'}
            </Button>
          </div>

          <div className="text-[11px] text-[#888888] font-mono">
            {isHovered ? 'Pointer Active' : 'Hover / Touch to interact'}
          </div>
        </div>

        {/* Editorial Architecture Footer Caption */}
        <div className="mt-3 p-3.5 bg-[#080808] border border-[#1C1C1C] rounded-[2px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
          <span className="font-mono text-[10px] tracking-widest text-[#666666] uppercase">
            CALIBRATED SPEC // CUSTOM BILLET IRON & MATTE OBSIDIAN FINISH
          </span>
          <span className="font-mono text-[10px] text-[#D4AF37] tracking-wider uppercase">
            PBR LIGHTING RIG ACTIVE
          </span>
        </div>
      </div>
    </SectionContainer>
  );
};
