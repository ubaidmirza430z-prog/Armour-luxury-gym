import React, { useEffect, useRef, useState } from 'react';
import { Quote } from 'lucide-react';

export interface MemberTestimonialItem {
  id: string;
  quote: string;
  memberName: string;
  memberInitials: string;
  trainingGoal: string;
  tenure: string;
  avatarPlaceholderUrl?: string; // Optional image URL slot for real photo
}

/**
 * Central editable testimonial dataset.
 * Gym management can easily swap names, quotes, avatars, and goals here.
 */
export const MEMBER_TESTIMONIALS_DATA: MemberTestimonialItem[] = [
  {
    id: 'testimonial-1',
    quote:
      'Armour gives you an environment where every session feels purposeful. The equipment, trainers and atmosphere completely changed my approach to training.',
    memberName: '[MEMBER NAME — MARCUS V.]',
    memberInitials: 'MV',
    trainingGoal: 'STRENGTH & COMPOUND PROTOCOLS',
    tenure: 'MEMBER SINCE 2024',
  },
  {
    id: 'testimonial-2',
    quote:
      'I wanted a more structured approach to training, and the experience feels completely different from a standard gym. The focus on technique and discipline is unmatched.',
    memberName: '[MEMBER NAME — ELENA R.]',
    memberInitials: 'ER',
    trainingGoal: 'ATHLETIC CONDITIONING & MOBILITY',
    tenure: 'MEMBER SINCE 2024',
  },
  {
    id: 'testimonial-3',
    quote:
      'The equipment, atmosphere, and training environment make every session feel purposeful. Having quiet, uncrowded access to calibrated platforms keeps me consistent.',
    memberName: '[MEMBER NAME — DAVID C.]',
    memberInitials: 'DC',
    trainingGoal: 'PERFORMANCE LONGEVITY & RECOVERY',
    tenure: 'MEMBER SINCE 2025',
  },
];

export const MemberTestimonialsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setInView(true);
      return;
    }

    // Safety fallback
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
      id="member-testimonials"
      aria-label="Member Testimonials: Proven by Performance"
      className="relative z-10 w-full overflow-hidden bg-[#080808] border-b border-[#292929] py-16 md:py-24 lg:py-28"
    >
      {/* Background Architectural Grid Texture */}
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
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-br from-[#D4AF37]/5 via-transparent to-transparent rounded-full blur-3xl pointer-events-none"
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
              MEMBER TESTIMONIALS
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="heading-section text-white max-w-3xl leading-[1.14] tracking-tight">
            PROVEN BY PERFORMANCE.
          </h2>

          {/* Subtitle */}
          <p className="mt-4 text-base sm:text-lg md:text-xl text-[#D4AF37] font-serif tracking-wide">
            Real discipline. Real consistency. Real progress.
          </p>

          <p className="mt-2 text-xs font-mono tracking-widest text-[#666666] uppercase">
            VERIFIED EXPERIENCES · PLACEHOLDER CONTENT READY FOR PRODUCTION DATA
          </p>
        </header>

        {/* ===================================================================
            3 ELEGANT TESTIMONIAL CARDS
            =================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {MEMBER_TESTIMONIALS_DATA.map((item, idx) => (
            <article
              key={item.id}
              className={`group relative flex flex-col justify-between p-7 sm:p-8 bg-[#0B0B0B] border border-[#292929] rounded-[4px] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[#D4AF37]/60 hover:shadow-[0_16px_40px_rgba(0,0,0,0.85),0_0_24px_rgba(212,175,55,0.06)] motion-reduce:transition-none motion-reduce:hover:transform-none ${
                idx === 2 ? 'md:col-span-2 lg:col-span-1 md:max-w-md md:mx-auto md:w-full lg:max-w-none' : ''
              } ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-90 translate-y-3'
              }`}
              style={{
                transitionDelay: inView ? `${120 + idx * 90}ms` : '0ms',
              }}
            >
              {/* Corner Hairline Accent */}
              <div
                className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#292929] group-hover:border-[#D4AF37]/80 transition-colors duration-300 pointer-events-none"
                aria-hidden="true"
              />

              <div>
                {/* Header: Quotation Mark + Gold Accent Bar */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-9 h-9 rounded-[2px] bg-[#141414] border border-[#292929] flex items-center justify-center text-[#D4AF37] group-hover:border-[#D4AF37]/50 transition-colors">
                    <Quote size={15} className="rotate-180" />
                  </div>
                  <div className="w-8 h-[1px] bg-[#D4AF37]/40 group-hover:w-14 group-hover:bg-[#D4AF37] transition-all duration-300" />
                </div>

                {/* Short Testimonial Quote */}
                <blockquote className="font-sans text-sm sm:text-base text-[#D4D4D4] font-light leading-relaxed mb-8">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
              </div>

              {/* Footer: Avatar + Name + Training Goal */}
              <div className="pt-6 border-t border-[#1C1C1C] flex items-center gap-3.5">
                {/* Small Circular Placeholder Avatar */}
                <div className="relative shrink-0">
                  <div className="w-11 h-11 rounded-full bg-[#141414] border border-[#D4AF37]/60 group-hover:border-[#D4AF37] flex items-center justify-center text-xs font-mono font-bold text-[#D4AF37] transition-all duration-300 shadow-[0_0_12px_rgba(212,175,55,0.1)]">
                    {item.memberInitials}
                  </div>
                  {/* Micro active dot */}
                  <span
                    className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#D4AF37] border-2 border-[#0B0B0B]"
                    aria-hidden="true"
                  />
                </div>

                {/* Member Details */}
                <div className="min-w-0 flex-1">
                  <h3 className="font-serif text-sm font-semibold tracking-wide text-white truncate">
                    {item.memberName}
                  </h3>
                  <div className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase truncate mt-0.5">
                    {item.trainingGoal}
                  </div>
                  <div className="text-[9px] font-mono tracking-widest text-[#666666] uppercase">
                    {item.tenure}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
