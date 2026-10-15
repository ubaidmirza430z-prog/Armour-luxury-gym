import React, { useEffect, useRef, useState } from 'react';

interface TrainingProgramData {
  id: string;
  number: string;
  title: string;
  description: string;
  focus: string;
}

const TRAINING_PROGRAMS: TrainingProgramData[] = [
  {
    id: 'strength-conditioning',
    number: '01',
    title: 'STRENGTH & CONDITIONING',
    description:
      'Progressive training designed to build strength, power, endurance, and physical capacity.',
    focus: 'CAPACITY & STRENGTH',
  },
  {
    id: 'personal-training',
    number: '02',
    title: 'PERSONAL TRAINING',
    description:
      'One-to-one coaching with structured programming tailored to individual goals and performance.',
    focus: 'INDIVIDUAL PROGRAMMING',
  },
  {
    id: 'body-transformation',
    number: '03',
    title: 'BODY TRANSFORMATION',
    description:
      'A disciplined approach combining training, conditioning, and sustainable progress.',
    focus: 'DISCIPLINE & ADAPTATION',
  },
  {
    id: 'performance-training',
    number: '04',
    title: 'PERFORMANCE TRAINING',
    description:
      'Advanced training protocols for members seeking higher levels of athletic performance.',
    focus: 'PEAK ATHLETIC OUTPUT',
  },
];

/**
 * ============================================================================
 * SECTION: TRAINING PROGRAMS
 * ============================================================================
 * 
 * PLACEMENT:
 * Positioned directly after "The Armour Standard" section.
 * 
 * DESIGN SPECIFICATION:
 * - Small gold label: "02 // TRAINING"
 * - Main heading: "BUILT FOR EVERY LEVEL OF PERFORMANCE."
 * - Supporting text: "From foundational strength to advanced conditioning,
 *   every program is structured around measurable progress and purposeful training."
 * - 4 Premium service cards:
 *     01 — STRENGTH & CONDITIONING
 *     02 — PERSONAL TRAINING
 *     03 — BODY TRANSFORMATION
 *     04 — PERFORMANCE TRAINING
 * - Large dark cards with thin subtle #292929 borders, #0B0B0B background.
 * - Gold accents (#D4AF37), clean uppercase titles, muted gray descriptions.
 * - Subtle hover transitions on desktop; safe passive state on touch devices.
 * - Responsive: 1 column on mobile, 2 × 2 on tablet, balanced grid on desktop.
 * - Respects prefers-reduced-motion and zero layout shift.
 * ============================================================================
 */
export const TrainingProgramsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setInView(true);
      return;
    }

    // Safety fallback: ensure visibility in all iframe and headless scenarios
    const fallbackTimer = setTimeout(() => {
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
      clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="training-programs"
      aria-label="Training Programs"
      className="relative z-10 w-full overflow-hidden bg-[#080808] border-b border-[#292929] py-16 md:py-24 lg:py-28"
    >
      {/* Anchor targets for smooth internal navigation */}
      <span id="training" className="absolute -top-24 pointer-events-none" aria-hidden="true" />

      {/* Architectural Background Grid Texture */}
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

      {/* Radial Gold Ambient Glow */}
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
          {/* Small Gold Eyebrow */}
          <div className="flex items-center gap-2.5 mb-4">
            <span className="w-4 h-[1.5px] bg-[#D4AF37]" aria-hidden="true" />
            <span className="text-[11px] sm:text-xs font-mono tracking-widest text-[#D4AF37] uppercase font-semibold">
              02 // TRAINING
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="heading-section text-white max-w-3xl leading-[1.14] tracking-tight">
            <span>BUILT FOR EVERY</span>
            <br />
            <span className="text-white">LEVEL OF PERFORMANCE.</span>
          </h2>

          {/* Supporting Text */}
          <p className="mt-5 text-sm sm:text-base md:text-lg text-[#A5A5A5] leading-relaxed max-w-2xl font-light font-sans">
            From foundational strength to advanced conditioning, every program is structured around measurable progress and purposeful training.
          </p>
        </header>

        {/* ===================================================================
            4 PREMIUM SERVICE CARDS:
            - Desktop: 4 across on wide screens or 2 × 2 on mid-desktop
            - Tablet: 2 × 2 grid (md:grid-cols-2)
            - Mobile: 1 card per row (grid-cols-1)
            =================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
          {TRAINING_PROGRAMS.map((program, idx) => (
            <article
              key={program.id}
              className={`group relative flex flex-col justify-between p-7 sm:p-8 bg-[#0B0B0B] border border-[#292929] rounded-[4px] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#D4AF37]/60 hover:shadow-[0_14px_36px_rgba(0,0,0,0.8),0_0_24px_rgba(212,175,55,0.05)] motion-reduce:transition-none motion-reduce:hover:transform-none ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-90 translate-y-3'
              }`}
              style={{
                transitionDelay: inView ? `${100 + idx * 80}ms` : '0ms',
              }}
            >
              {/* Corner Hairline Accent */}
              <div
                className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-[#292929] group-hover:border-[#D4AF37]/80 transition-colors duration-300 pointer-events-none"
                aria-hidden="true"
              />

              <div>
                {/* Number & Gold Micro Accent */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-sm sm:text-base tracking-widest text-[#D4AF37] font-semibold">
                    {program.number}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/40 group-hover:bg-[#D4AF37] transition-colors duration-300" />
                </div>

                {/* Card Title */}
                <h3 className="font-serif text-base sm:text-lg lg:text-xl font-bold tracking-wide text-white uppercase mb-3 leading-snug">
                  {program.title}
                </h3>

                {/* Card Description */}
                <p className="text-sm text-[#A5A5A5] leading-relaxed font-light font-sans">
                  {program.description}
                </p>
              </div>

              {/* Bottom Hairline Architectural Indicator */}
              <div className="mt-8 pt-5 border-t border-[#1C1C1C] flex items-center justify-between">
                <div
                  className="h-[1.5px] w-6 bg-[#D4AF37]/40 group-hover:w-12 group-hover:bg-[#D4AF37] transition-all duration-300 motion-reduce:transition-none"
                  aria-hidden="true"
                />
                <span className="font-mono text-[9.5px] tracking-widest text-[#666666] uppercase group-hover:text-[#A5A5A5] transition-colors duration-300">
                  {program.focus}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
