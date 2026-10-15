import React, { useEffect, useRef, useState } from 'react';

interface FeatureCardData {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FEATURE_CARDS: FeatureCardData[] = [
  {
    id: 'precision-training',
    number: '01',
    title: '01 — PRECISION TRAINING',
    description:
      'Structured training environments designed to help you train with purpose.',
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Geometric precision / alignment reticle */}
        <circle cx="12" cy="12" r="9" strokeOpacity="0.35" />
        <circle cx="12" cy="12" r="3.5" stroke="#D4AF37" strokeWidth="1.4" />
        <line x1="12" y1="2" x2="12" y2="5.5" />
        <line x1="12" y1="18.5" x2="12" y2="22" />
        <line x1="2" y1="12" x2="5.5" y2="12" />
        <line x1="18.5" y1="12" x2="22" y2="12" />
      </svg>
    ),
  },
  {
    id: 'premium-equipment',
    number: '02',
    title: '02 — PREMIUM EQUIPMENT',
    description:
      'High-quality training equipment selected for serious performance.',
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Calibrated architectural barbell / plate glyph */}
        <path d="M6 5v14" />
        <path d="M18 5v14" />
        <rect x="2" y="7" width="4" height="10" rx="1" strokeWidth="1.2" />
        <rect x="18" y="7" width="4" height="10" rx="1" strokeWidth="1.2" />
        <line x1="6" y1="12" x2="18" y2="12" strokeWidth="1.8" stroke="#D4AF37" />
        <circle cx="12" cy="12" r="1.5" fill="#D4AF37" stroke="none" />
      </svg>
    ),
  },
  {
    id: 'expert-guidance',
    number: '03',
    title: '03 — EXPERT GUIDANCE',
    description:
      'Professional support to help you train smarter and progress consistently.',
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Master coach guidance / compass elevation */}
        <polygon points="12 2 19 21 12 17 5 21 12 2" stroke="#D4AF37" strokeWidth="1.3" />
        <line x1="12" y1="6" x2="12" y2="16" strokeOpacity="0.5" />
      </svg>
    ),
  },
  {
    id: 'luxury-environment',
    number: '04',
    title: '04 — LUXURY ENVIRONMENT',
    description:
      'A refined training space built for focus, discipline, and comfort.',
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Architectural sanctuary perspective enclosure */}
        <path d="M3 21h18" strokeOpacity="0.4" />
        <path d="M5 21V6l7-3 7 3v15" strokeWidth="1.3" />
        <path d="M12 3v18" stroke="#D4AF37" strokeWidth="1.2" />
        <line x1="8.5" y1="11" x2="8.5" y2="16" strokeOpacity="0.5" />
        <line x1="15.5" y1="11" x2="15.5" y2="16" strokeOpacity="0.5" />
      </svg>
    ),
  },
];

/**
 * ============================================================================
 * SECTION: WHY ARMOUR — THE ARMOUR STANDARD
 * ============================================================================
 * 
 * SPECIFICATIONS:
 * - Positioned immediately after the current hero / status information.
 * - Always visible in the DOM with zero risk of being hidden or occluded.
 * - Dark luxury aesthetic: Background #080808, Gold #D4AF37, thin #292929 borders.
 * 
 * CONTENT:
 * - Eyebrow: "THE ARMOUR STANDARD"
 * - Heading:
 *     ENGINEERED FOR
 *     EXCELLENCE.
 * - Description:
 *     "Every element of Armour Luxury Gym is designed around performance,
 *      precision, and an elevated training experience."
 * 
 * 4 CARDS:
 * 1. 01 — PRECISION TRAINING
 * 2. 02 — PREMIUM EQUIPMENT
 * 3. 03 — EXPERT GUIDANCE
 * 4. 04 — LUXURY ENVIRONMENT
 * 
 * RESPONSIVE GRID:
 * - Desktop: 4 cards in one row (lg:grid-cols-4)
 * - Tablet: 2 × 2 grid (md:grid-cols-2)
 * - Mobile: 1 card per row (grid-cols-1)
 * ============================================================================
 */
export const WhyArmourSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasScrolledIntoView, setHasScrolledIntoView] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setHasScrolledIntoView(true);
      return;
    }

    // Safety timeout: Ensure animation triggers promptly even if observer doesn't fire in an iframe
    const safetyTimer = setTimeout(() => {
      setHasScrolledIntoView(true);
    }, 150);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasScrolledIntoView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      clearTimeout(safetyTimer);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-armour"
      aria-label="Why Armour - The Armour Standard"
      className="relative z-10 w-full overflow-hidden bg-[#080808] border-b border-[#292929] py-16 md:py-24 lg:py-28"
    >
      {/* Subtle Architectural Drafting Grid Background */}
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

      {/* Subtle Gold Radial Ambient Vignette */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-gradient-to-br from-[#D4AF37]/5 to-transparent rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ===================================================================
            SECTION HEADER
            Clean unboxed eyebrow, editorial heading, supporting paragraph
            =================================================================== */}
        <header
          className={`flex flex-col mb-12 md:mb-16 lg:mb-20 text-left items-start transition-all duration-700 ease-out motion-reduce:transition-none ${
            hasScrolledIntoView
              ? 'opacity-100 translate-y-0'
              : 'opacity-95 translate-y-2'
          }`}
          style={{ transitionDelay: '0ms' }}
        >
          {/* Small Gold Eyebrow */}
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

          {/* Supporting Paragraph */}
          <p className="mt-5 text-sm sm:text-base md:text-lg text-[#A5A5A5] leading-relaxed max-w-2xl font-light font-sans">
            Every element of Armour Luxury Gym is designed around performance, precision, and an elevated training experience.
          </p>
        </header>

        {/* ===================================================================
            4 FEATURE CARDS GRID:
            Desktop: 4 cards in one row (lg:grid-cols-4)
            Tablet: 2 × 2 grid (md:grid-cols-2 lg:grid-cols-4)
            Mobile: 1 card per row (grid-cols-1)
            Always visible, with gentle staggered scroll reveal
            =================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {FEATURE_CARDS.map((card, idx) => (
            <article
              key={card.id}
              className={`group relative flex flex-col justify-between p-7 sm:p-8 bg-[#0B0B0B] border border-[#292929] rounded-[4px] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[#D4AF37]/60 hover:shadow-[0_12px_32px_rgba(0,0,0,0.7)] motion-reduce:transition-none motion-reduce:hover:transform-none ${
                hasScrolledIntoView
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-95 translate-y-2'
              }`}
              style={{
                transitionDelay: hasScrolledIntoView ? `${120 + idx * 90}ms` : '0ms',
              }}
            >
              {/* Subtle architectural corner highlight */}
              <div
                className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-[#292929] group-hover:border-[#D4AF37]/80 transition-colors duration-300 pointer-events-none"
                aria-hidden="true"
              />

              <div>
                {/* Top Row: Subtle Gold Number + Icon Container */}
                <div className="flex items-center justify-between mb-7">
                  <span className="font-mono text-sm tracking-widest text-[#D4AF37] font-semibold">
                    {card.number}
                  </span>
                  <div
                    className="w-10 h-10 rounded-[2px] flex items-center justify-center border border-[#292929] bg-[#121212] text-[#D4AF37] group-hover:border-[#D4AF37]/40 group-hover:bg-[#161616] transition-colors duration-300"
                    aria-hidden="true"
                  >
                    {card.icon}
                  </div>
                </div>

                {/* White Heading */}
                <h3 className="font-serif text-base sm:text-lg font-bold tracking-wide text-white uppercase mb-3 leading-snug">
                  {card.title}
                </h3>

                {/* Gray Description */}
                <p className="text-sm text-[#A5A5A5] leading-relaxed font-light font-sans">
                  {card.description}
                </p>
              </div>

              {/* Bottom Subtle Architectural Accent:
                  Hairline border + minimal gold expansion indicator */}
              <div className="mt-8 pt-5 border-t border-[#1C1C1C] flex items-center justify-between">
                <div
                  className="h-[1.5px] w-6 bg-[#D4AF37]/40 group-hover:w-12 group-hover:bg-[#D4AF37] transition-all duration-300 motion-reduce:transition-none"
                  aria-hidden="true"
                />
                <span className="font-mono text-[9.5px] tracking-widest text-[#666666] uppercase group-hover:text-[#A5A5A5] transition-colors duration-300">
                  STANDARD {card.number}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
