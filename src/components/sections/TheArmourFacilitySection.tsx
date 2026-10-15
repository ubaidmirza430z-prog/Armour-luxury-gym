import React, { useEffect, useRef, useState } from 'react';

interface FacilityZoneData {
  id: string;
  number: string;
  zoneCode: string;
  title: string;
  description: string;
  specMetric: string;
  hardware: string[];
  spatialFeature: string;
}

const FACILITY_ZONES: FacilityZoneData[] = [
  {
    id: 'strength-floor',
    number: '01',
    zoneCode: 'ZONE A // APPARATUS',
    title: 'STRENGTH FLOOR',
    description:
      'Purpose-built training space equipped for progressive strength development.',
    specMetric: 'HEAVY LOAD CAPACITY',
    hardware: ['Olympic Lifting Decks', 'Custom Billet Dumbbells', 'Calibrated Steel Racks'],
    spatialFeature: 'Acoustically decoupled vulcanized impact flooring',
  },
  {
    id: 'performance-zone',
    number: '02',
    zoneCode: 'ZONE B // KINETIC',
    title: 'PERFORMANCE ZONE',
    description:
      'Dedicated space for conditioning, movement, agility, and athletic performance.',
    specMetric: 'DYNAMIC SPRINT & DRILL',
    hardware: ['30m Biomechanical Sprint Turf', 'Pneumatic Resistance', 'Conditioning Prowlers'],
    spatialFeature: 'Open-span high-velocity athletic corridor',
  },
  {
    id: 'premium-cardio',
    number: '03',
    zoneCode: 'ZONE C // METABOLIC',
    title: 'PREMIUM CARDIO',
    description:
      'Modern cardiovascular equipment designed for efficient, controlled conditioning.',
    specMetric: 'PRECISION BIOMETRICS',
    hardware: ['Curved Non-Motorized Treadmills', 'Ergometer Rowing Fleet', 'Smart Cycle Towers'],
    spatialFeature: 'Low-glare ambient lighting with zoned dynamic airflow',
  },
  {
    id: 'recovery-space',
    number: '04',
    zoneCode: 'ZONE D // REGENERATION',
    title: 'RECOVERY SPACE',
    description:
      'A refined environment focused on recovery, mobility, and maintaining long-term performance.',
    specMetric: 'CONTRAST & RESTORATION',
    hardware: ['Nordic Cedar Infrared Sauna', 'Cryo Plunge Immersion', 'Percussive Mobility Bays'],
    spatialFeature: 'Acoustic thermal silence with warm indirect illumination',
  },
];

/**
 * ============================================================================
 * SECTION: THE ARMOUR FACILITY (03 // THE FACILITY)
 * ============================================================================
 * 
 * PLACEMENT:
 * Positioned immediately after "Training Programs" section.
 * 
 * DESIGN SPECIFICATION:
 * - Small gold label: "03 // THE FACILITY"
 * - Main heading: "PRECISION EQUIPMENT. UNCOMPROMISING SPACE."
 * - Supporting text: "Every detail is selected to create an environment where
 *   performance, focus, and discipline become part of the experience."
 * - 4 Premium facility cards:
 *     01 — STRENGTH FLOOR
 *     02 — PERFORMANCE ZONE
 *     03 — PREMIUM CARDIO
 *     04 — RECOVERY SPACE
 * - Architectural editorial panels with dark black/charcoal backgrounds,
 *   subtle gold borders, gold numbering, white serif titles, and muted text.
 * - Responsive: 1 column on mobile, 2 × 2 on tablet, balanced grid on desktop.
 * - Respects prefers-reduced-motion and zero layout shifts.
 * ============================================================================
 */
export const TheArmourFacilitySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setInView(true);
      return;
    }

    // Safety fallback: ensure guaranteed visibility
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
      id="the-armour-facility"
      aria-label="The Armour Facility"
      className="relative z-10 w-full overflow-hidden bg-[#080808] border-b border-[#292929] py-16 md:py-24 lg:py-28"
    >
      {/* Anchor targets for smooth internal navigation */}
      <span id="facility" className="absolute -top-24 pointer-events-none" aria-hidden="true" />

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
          {/* Small Gold Eyebrow */}
          <div className="flex items-center gap-2.5 mb-4">
            <span className="w-4 h-[1.5px] bg-[#D4AF37]" aria-hidden="true" />
            <span className="text-[11px] sm:text-xs font-mono tracking-widest text-[#D4AF37] uppercase font-semibold">
              03 // THE FACILITY
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="heading-section text-white max-w-3xl leading-[1.14] tracking-tight">
            <span>PRECISION EQUIPMENT.</span>
            <br />
            <span className="text-white">UNCOMPROMISING SPACE.</span>
          </h2>

          {/* Supporting Text */}
          <p className="mt-5 text-sm sm:text-base md:text-lg text-[#A5A5A5] leading-relaxed max-w-2xl font-light font-sans">
            Every detail is selected to create an environment where performance, focus, and discipline become part of the experience.
          </p>
        </header>

        {/* ===================================================================
            FACILITY SHOWCASE: 4 PREMIUM EDITORIAL PANELS
            - Desktop: 4 across on wide screens or 2 × 2 on mid-desktop
            - Tablet: 2 × 2 grid (md:grid-cols-2)
            - Mobile: 1 card per row (grid-cols-1)
            =================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
          {FACILITY_ZONES.map((zone, idx) => (
            <article
              key={zone.id}
              className={`group relative flex flex-col justify-between p-7 sm:p-8 bg-[#0B0B0B] border border-[#292929] rounded-[4px] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#D4AF37]/60 hover:shadow-[0_16px_40px_rgba(0,0,0,0.85),0_0_24px_rgba(212,175,55,0.06)] motion-reduce:transition-none motion-reduce:hover:transform-none ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-90 translate-y-3'
              }`}
              style={{
                transitionDelay: inView ? `${100 + idx * 80}ms` : '0ms',
              }}
            >
              {/* Subtle Architectural Blueprint Background Geometry */}
              <div
                className="absolute inset-0 overflow-hidden pointer-events-none opacity-5 group-hover:opacity-10 transition-opacity duration-500 rounded-[4px]"
                aria-hidden="true"
              >
                <svg
                  className="w-full h-full"
                  viewBox="0 0 280 340"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="240" cy="40" r="80" stroke="#D4AF37" strokeWidth="0.75" strokeDasharray="3 3" />
                  <line x1="0" y1="120" x2="280" y2="120" stroke="#D4AF37" strokeWidth="0.5" />
                  <line x1="80" y1="0" x2="80" y2="340" stroke="#D4AF37" strokeWidth="0.5" />
                  <rect x="180" y="220" width="80" height="80" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="2 4" />
                </svg>
              </div>

              {/* Corner Hairline Bracket Accent */}
              <div
                className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#292929] group-hover:border-[#D4AF37]/80 transition-colors duration-300 pointer-events-none"
                aria-hidden="true"
              />

              <div className="relative z-10">
                {/* Zone Code & Gold Numbering */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-sm sm:text-base tracking-widest text-[#D4AF37] font-semibold">
                    {zone.number}
                  </span>
                  <span className="font-mono text-[9px] tracking-widest text-[#666666] group-hover:text-[#D4AF37]/90 transition-colors duration-300">
                    {zone.zoneCode}
                  </span>
                </div>

                {/* White Serif Title */}
                <h3 className="font-serif text-base sm:text-lg lg:text-xl font-bold tracking-wide text-white uppercase mb-3 leading-snug">
                  {zone.title}
                </h3>

                {/* Supporting Description */}
                <p className="text-sm text-[#A5A5A5] leading-relaxed font-light font-sans mb-6">
                  {zone.description}
                </p>

                {/* Curated Hardware Specifications */}
                <div className="space-y-1.5 pt-4 border-t border-[#1C1C1C]">
                  {zone.hardware.map((item, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#D4AF37]/60 group-hover:bg-[#D4AF37] transition-colors duration-300" />
                      <span className="text-xs text-[#8A8A8A] font-sans font-light tracking-wide group-hover:text-[#BBBBBB] transition-colors duration-300">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Hairline Architectural Indicator & Spatial Feature */}
              <div className="relative z-10 mt-8 pt-5 border-t border-[#1C1C1C] flex items-center justify-between">
                <div
                  className="h-[1.5px] w-6 bg-[#D4AF37]/40 group-hover:w-12 group-hover:bg-[#D4AF37] transition-all duration-300 motion-reduce:transition-none"
                  aria-hidden="true"
                />
                <span className="font-mono text-[9.5px] tracking-widest text-[#666666] uppercase group-hover:text-[#A5A5A5] transition-colors duration-300">
                  {zone.specMetric}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
