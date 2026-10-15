import React, { useEffect, useRef, useState } from 'react';

interface FeatureBlockData {
  id: string;
  number: string;
  title: string;
  description: string;
}

const FEATURE_BLOCKS: FeatureBlockData[] = [
  {
    id: 'precision-training',
    number: '01',
    title: 'PRECISION TRAINING',
    description:
      'Structured training environments designed to help you train with purpose.',
  },
  {
    id: 'premium-equipment',
    number: '02',
    title: 'PREMIUM EQUIPMENT',
    description:
      'High-quality training equipment selected for serious performance.',
  },
  {
    id: 'expert-guidance',
    number: '03',
    title: 'EXPERT GUIDANCE',
    description:
      'Professional support to help you train smarter and progress consistently.',
  },
  {
    id: 'luxury-environment',
    number: '04',
    title: 'LUXURY ENVIRONMENT',
    description:
      'A refined training space built for focus, discipline, and comfort.',
  },
];

/**
 * ============================================================================
 * SECTION: THE ARMOUR STANDARD
 * ============================================================================
 * 
 * PLACEMENT:
 * Positioned immediately after the 3D Spatial dumbbell section.
 * 
 * ORDER IN APP:
 * 1. NAVBAR
 * 2. HERO
 * 3. STATUS INFORMATION
 * 4. 3D SPATIAL DUMBBELL
 * 5. THE ARMOUR STANDARD
 * 
 * DESIGN:
 * - Luxury black & gold aesthetic (#080808 canvas, #D4AF37 gold accents).
 * - Thin #292929 borders, #0B0B0B card background panels.
 * - Subtle grid background texture.
 * - Responsive: 4 blocks in a horizontal row on desktop, 2 × 2 on tablet,
 *   1 column on mobile.
 * - Staggered fade-up scroll animations honoring prefers-reduced-motion.
 * ============================================================================
 */
export const TheArmourStandardSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    // If reduced motion is requested, activate immediately
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setInView(true);
      return;
    }

    // Safety fallback: ensure visibility even in headless/restricted iframes
    const timer = setTimeout(() => {
      setInView(true);
    }, 150);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="the-armour-standard"
      aria-label="The Armour Standard"
      className="relative z-10 w-full overflow-hidden bg-[#080808] border-t border-b border-[#292929] py-16 md:py-24 lg:py-28"
    >
      {/* Anchor point for navigation backwards-compatibility */}
      <span id="why-armour" className="absolute -top-24 pointer-events-none" aria-hidden="true" />

      {/* Subtle Architectural Grid Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      {/* Soft Gold Radial Ambient Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-br from-[#D4AF37]/5 to-transparent rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ===================================================================
            SECTION HEADER
            =================================================================== */}
        <header
          className={`flex flex-col mb-12 md:mb-16 lg:mb-20 text-left items-start transition-all duration-700 ease-out motion-reduce:transition-none ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-90 translate-y-3'
          }`}
          style={{ transitionDelay: '0ms' }}
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-2.5 mb-4">
            <span className="w-4 h-[1.5px] bg-[#D4AF37]" aria-hidden="true" />
            <span className="text-[11px] sm:text-xs font-mono tracking-widest text-[#D4AF37] uppercase font-semibold">
              THE ARMOUR STANDARD
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="heading-section text-white max-w-3xl leading-[1.14] tracking-tight">
            <span>ENGINEERED FOR</span>
            <br />
            <span className="text-white">EXCELLENCE.</span>
          </h2>

          {/* Description */}
          <p className="mt-5 text-sm sm:text-base md:text-lg text-[#A5A5A5] leading-relaxed max-w-2xl font-light font-sans">
            Every element of Armour Luxury Gym is designed around performance, precision, and an elevated training experience.
          </p>
        </header>

        {/* ===================================================================
            4 FEATURE BLOCKS:
            - Desktop: 4 in a horizontal row (lg:grid-cols-4)
            - Tablet: 2 × 2 grid (md:grid-cols-2)
            - Mobile: 1 column (grid-cols-1)
            =================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {FEATURE_BLOCKS.map((block, idx) => (
            <article
              key={block.id}
              className={`group relative flex flex-col justify-between p-7 sm:p-8 bg-[#0B0B0B] border border-[#292929] rounded-[4px] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#D4AF37]/60 hover:shadow-[0_12px_32px_rgba(0,0,0,0.7)] motion-reduce:transition-none motion-reduce:hover:transform-none ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-90 translate-y-3'
              }`}
              style={{
                transitionDelay: inView ? `${100 + idx * 100}ms` : '0ms',
              }}
            >
              {/* Corner Hairline Accent */}
              <div
                className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-[#292929] group-hover:border-[#D4AF37]/80 transition-colors duration-300 pointer-events-none"
                aria-hidden="true"
              />

              <div>
                {/* Number */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-sm tracking-widest text-[#D4AF37] font-semibold">
                    {block.number}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/40 group-hover:bg-[#D4AF37] transition-colors duration-300" />
                </div>

                {/* Title */}
                <h3 className="font-serif text-base sm:text-lg font-bold tracking-wide text-white uppercase mb-3 leading-snug">
                  {block.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#A5A5A5] leading-relaxed font-light font-sans">
                  {block.description}
                </p>
              </div>

              {/* Bottom Hairline Architectural Indicator */}
              <div className="mt-8 pt-5 border-t border-[#1C1C1C] flex items-center justify-between">
                <div
                  className="h-[1.5px] w-6 bg-[#D4AF37]/40 group-hover:w-12 group-hover:bg-[#D4AF37] transition-all duration-300 motion-reduce:transition-none"
                  aria-hidden="true"
                />
                <span className="font-mono text-[9.5px] tracking-widest text-[#666666] uppercase group-hover:text-[#A5A5A5] transition-colors duration-300">
                  PILLAR {block.number}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
