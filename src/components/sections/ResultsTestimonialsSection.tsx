import React, { useEffect, useRef, useState } from 'react';
import { Quote } from 'lucide-react';

interface TransformationData {
  id: string;
  number: string;
  title: string;
  description: string;
  tag: string;
}

const TRANSFORMATION_CARDS: TransformationData[] = [
  {
    id: 'strength',
    number: '01',
    title: 'STRENGTH',
    description:
      'Progress measured in stronger lifts, better movement, and greater physical capacity.',
    tag: 'FORCE PRODUCTION & CAPACITY',
  },
  {
    id: 'conditioning',
    number: '02',
    title: 'CONDITIONING',
    description:
      'Improved endurance, control, mobility, and overall athletic performance.',
    tag: 'METABOLIC & MOBILITY PROTOCOL',
  },
  {
    id: 'consistency',
    number: '03',
    title: 'CONSISTENCY',
    description:
      'A structured environment that makes disciplined training easier to maintain.',
    tag: 'HABIT FORMATION & LONGEVITY',
  },
];

interface TestimonialData {
  id: string;
  quote: string;
  attribution: string;
  descriptor: string;
  isFeatured?: boolean;
}

const TESTIMONIALS: TestimonialData[] = [
  {
    id: 'test-01',
    quote:
      'Armour helped me turn training into a disciplined routine. The environment keeps me focused every session.',
    attribution: '— MEMBER TESTIMONIAL',
    descriptor: 'PRIVATE TRAINING CLIENT',
    isFeatured: true,
  },
  {
    id: 'test-02',
    quote:
      'I wanted a more structured approach to training, and the experience feels completely different from a standard gym.',
    attribution: '— MEMBER TESTIMONIAL',
    descriptor: 'PERFORMANCE TIER MEMBER',
    isFeatured: false,
  },
  {
    id: 'test-03',
    quote:
      'The equipment, atmosphere, and training environment make every session feel purposeful.',
    attribution: '— MEMBER TESTIMONIAL',
    descriptor: 'STRENGTH PROTOCOL MEMBER',
    isFeatured: false,
  },
];

const TRUST_METRICS = [
  {
    label: 'DISCIPLINE',
    subtitle: 'ENGINEERED ROUTINE',
  },
  {
    label: 'PRECISION',
    subtitle: 'TARGETED EXECUTION',
  },
  {
    label: 'PROGRESS',
    subtitle: 'MEASURABLE CAPACITY',
  },
];

/**
 * ============================================================================
 * SECTION: RESULTS / TESTIMONIALS (05 // MEMBER RESULTS)
 * ============================================================================
 * 
 * PLACEMENT:
 * Positioned immediately after "Membership" section.
 * 
 * SPECIFICATIONS:
 * 1. Small gold label: "05 // MEMBER RESULTS"
 * 2. Main heading: "THE WORK SPEAKS FOR ITSELF."
 * 3. Supporting text: "Real progress comes from consistency, structured training,
 *    and an environment built around performance."
 * 4. Transformation Showcase:
 *    - 3 cards: 01 — STRENGTH, 02 — CONDITIONING, 03 — CONSISTENCY
 *    - Strictly honest demo placeholders; no fabricated member stats or fake names.
 * 5. Testimonial Section: "MEMBER VOICES"
 *    - 1 large featured testimonial + 2 supporting testimonials
 *    - Attribution strictly marked as "— MEMBER TESTIMONIAL"
 * 6. Trust Strip: "DISCIPLINE", "PRECISION", "PROGRESS"
 * 7. Fully responsive, accessible, zero horizontal overflow, respects prefers-reduced-motion.
 * ============================================================================
 */
export const ResultsTestimonialsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setInView(true);
      return;
    }

    // Fallback safety timeout
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

  const featuredTestimonial = TESTIMONIALS.find((t) => t.isFeatured) || TESTIMONIALS[0];
  const supportingTestimonials = TESTIMONIALS.filter((t) => !t.isFeatured);

  return (
    <section
      ref={sectionRef}
      id="results"
      aria-label="Member Results and Testimonials"
      className="relative z-10 w-full overflow-hidden bg-[#080808] border-b border-[#292929] py-16 md:py-24 lg:py-28"
    >
      {/* Anchor targets for smooth internal navigation */}
      <span id="testimonials" className="absolute -top-24 pointer-events-none" aria-hidden="true" />
      <span id="proof" className="absolute -top-24 pointer-events-none" aria-hidden="true" />

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

      {/* Subtle Radial Gold Glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-br from-[#D4AF37]/5 via-transparent to-transparent rounded-full blur-3xl pointer-events-none"
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
              05 // MEMBER RESULTS
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="heading-section text-white max-w-3xl leading-[1.14] tracking-tight">
            <span>THE WORK</span>
            <br />
            <span className="text-white">SPEAKS FOR ITSELF.</span>
          </h2>

          {/* Supporting Text */}
          <p className="mt-5 text-sm sm:text-base md:text-lg text-[#A5A5A5] leading-relaxed max-w-2xl font-light font-sans">
            Real progress comes from consistency, structured training, and an environment built around performance.
          </p>
        </header>

        {/* ===================================================================
            TRANSFORMATION SHOWCASE: 3 EDITORIAL CARDS
            - Desktop: 3 cards across in a spacious row (lg:grid-cols-3)
            - Tablet: 2 cols then 1 span or balanced responsive grid
            - Mobile: 1 card per row (grid-cols-1)
            =================================================================== */}
        <div className="mb-20 md:mb-24 lg:mb-28">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#1C1C1C]">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" aria-hidden="true" />
              <span className="text-xs font-mono tracking-widest text-white uppercase font-semibold">
                AREAS OF TRANSFORMATION
              </span>
            </div>
            <span className="text-[10px] font-mono tracking-widest text-[#666666] uppercase">
              METHODOLOGY · DEMO PLACEHOLDER
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {TRANSFORMATION_CARDS.map((card, idx) => (
              <article
                key={card.id}
                className={`group relative flex flex-col justify-between p-7 sm:p-8 lg:p-9 bg-[#0B0B0B] border border-[#292929] rounded-[4px] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#D4AF37]/60 hover:shadow-[0_16px_40px_rgba(0,0,0,0.85),0_0_24px_rgba(212,175,55,0.06)] motion-reduce:transition-none motion-reduce:hover:transform-none ${
                  idx === 2 ? 'md:col-span-2 lg:col-span-1' : ''
                } ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-90 translate-y-3'
                }`}
                style={{
                  transitionDelay: inView ? `${100 + idx * 80}ms` : '0ms',
                }}
              >
                {/* Corner Hairline Bracket Accent */}
                <div
                  className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#292929] group-hover:border-[#D4AF37]/80 transition-colors duration-300 pointer-events-none"
                  aria-hidden="true"
                />

                <div>
                  {/* Number & Micro Dot */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-sm sm:text-base tracking-widest text-[#D4AF37] font-semibold">
                      {card.number}
                    </span>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/40 group-hover:bg-[#D4AF37] transition-colors duration-300" />
                  </div>

                  {/* White Serif Heading */}
                  <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-white uppercase mb-3 leading-snug">
                    {card.title}
                  </h3>

                  {/* Muted Gray Description */}
                  <p className="text-sm text-[#A5A5A5] leading-relaxed font-light font-sans mb-8">
                    {card.description}
                  </p>
                </div>

                {/* Bottom Hairline & Category Tag */}
                <div className="pt-5 border-t border-[#1C1C1C] flex items-center justify-between">
                  <div
                    className="h-[1.5px] w-6 bg-[#D4AF37]/40 group-hover:w-12 group-hover:bg-[#D4AF37] transition-all duration-300 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                  <span className="font-mono text-[9px] tracking-widest text-[#666666] uppercase group-hover:text-[#A5A5A5] transition-colors duration-300">
                    {card.tag}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ===================================================================
            SUBSECTION: MEMBER VOICES (TESTIMONIALS)
            - 1 Large Featured Testimonial (Left or Col 7)
            - 2 Smaller Supporting Testimonials (Right or Col 5)
            =================================================================== */}
        <div className="mb-20 md:mb-24">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-3 h-[1.5px] bg-[#D4AF37]" aria-hidden="true" />
            <span className="text-[11px] font-mono tracking-widest text-[#D4AF37] uppercase font-semibold">
              EXPERIENCE ARCHIVE
            </span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white uppercase tracking-wide mb-8 md:mb-12">
            MEMBER VOICES
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* FEATURED LARGE TESTIMONIAL (Col Span 7 on Desktop) */}
            <article
              className={`lg:col-span-7 flex flex-col justify-between p-8 sm:p-10 lg:p-12 bg-[#0B0B0B] border border-[#292929] hover:border-[#D4AF37]/60 rounded-[4px] relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.85),0_0_24px_rgba(212,175,55,0.06)] motion-reduce:transition-none motion-reduce:hover:transform-none ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-90 translate-y-3'
              }`}
              style={{
                transitionDelay: inView ? '320ms' : '0ms',
              }}
            >
              {/* Corner Hairline Accent */}
              <div
                className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#D4AF37]/50 pointer-events-none"
                aria-hidden="true"
              />

              <div>
                {/* Quotation Mark Icon */}
                <div className="w-12 h-12 rounded-[2px] bg-[#141414] border border-[#292929] flex items-center justify-center text-[#D4AF37] mb-8">
                  <Quote size={22} className="rotate-180" />
                </div>

                {/* Primary Testimonial Quote */}
                <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl font-normal text-white leading-relaxed tracking-wide mb-8 text-balance">
                  &ldquo;{featuredTestimonial.quote}&rdquo;
                </blockquote>
              </div>

              {/* Attribution and Gold Line */}
              <div className="pt-6 border-t border-[#1C1C1C]">
                <div className="w-10 h-[2px] bg-[#D4AF37] mb-3" aria-hidden="true" />
                <div className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#D4AF37] uppercase">
                  {featuredTestimonial.attribution}
                </div>
                <div className="text-[10px] font-mono tracking-widest text-[#666666] uppercase mt-1">
                  {featuredTestimonial.descriptor} · DEMO SPECIFICATION
                </div>
              </div>
            </article>

            {/* TWO SUPPORTING TESTIMONIALS (Col Span 5 on Desktop, stacked) */}
            <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
              {supportingTestimonials.map((testimonial, sIdx) => (
                <article
                  key={testimonial.id}
                  className={`flex-1 flex flex-col justify-between p-7 sm:p-8 bg-[#0B0B0B] border border-[#292929] hover:border-[#D4AF37]/60 rounded-[4px] relative transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.85),0_0_24px_rgba(212,175,55,0.06)] motion-reduce:transition-none motion-reduce:hover:transform-none ${
                    inView ? 'opacity-100 translate-y-0' : 'opacity-90 translate-y-3'
                  }`}
                  style={{
                    transitionDelay: inView ? `${420 + sIdx * 100}ms` : '0ms',
                  }}
                >
                  {/* Corner Bracket */}
                  <div
                    className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-[#292929] pointer-events-none"
                    aria-hidden="true"
                  />

                  <div>
                    {/* Quotation Icon */}
                    <div className="w-8 h-8 rounded-[2px] bg-[#141414] border border-[#292929] flex items-center justify-center text-[#D4AF37] mb-5">
                      <Quote size={14} className="rotate-180" />
                    </div>

                    {/* Supporting Quote */}
                    <blockquote className="font-sans text-sm sm:text-base text-[#D4D4D4] font-light leading-relaxed mb-6">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                  </div>

                  {/* Attribution */}
                  <div className="pt-4 border-t border-[#1C1C1C]">
                    <div className="w-6 h-[1.5px] bg-[#D4AF37] mb-2" aria-hidden="true" />
                    <div className="font-mono text-xs font-semibold tracking-widest text-[#D4AF37] uppercase">
                      {testimonial.attribution}
                    </div>
                    <div className="text-[9px] font-mono tracking-widest text-[#666666] uppercase mt-0.5">
                      {testimonial.descriptor} · DEMO SPECIFICATION
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* ===================================================================
            TRUST STRIP: 3 SIMPLE ARCHITECTURAL LABELS
            - "DISCIPLINE"
            - "PRECISION"
            - "PROGRESS"
            - Strictly NO fake statistics, NO fake numbers
            =================================================================== */}
        <div
          className={`pt-12 sm:pt-14 border-t border-[#1C1C1C] transition-all duration-700 ease-out motion-reduce:transition-none ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-90 translate-y-3'
          }`}
          style={{
            transitionDelay: inView ? '560ms' : '0ms',
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {TRUST_METRICS.map((metric, mIdx) => (
              <div
                key={mIdx}
                className="relative flex flex-col items-center justify-center p-6 bg-[#0B0B0B] border border-[#1C1C1C] rounded-[3px] text-center"
              >
                {/* Hairline Gold Accent Indicator */}
                <div className="w-6 h-[1.5px] bg-[#D4AF37] mb-3" aria-hidden="true" />

                {/* Primary Metric Name */}
                <div className="font-serif text-lg sm:text-xl font-bold tracking-[0.2em] text-white uppercase mb-1">
                  {metric.label}
                </div>

                {/* Subtitle */}
                <div className="font-mono text-[9.5px] tracking-widest text-[#888888] uppercase">
                  {metric.subtitle}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
