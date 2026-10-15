import React from 'react';
import { SectionContainer } from '../ui/SectionContainer';

interface FeatureCard {
  number: string;
  title: string;
  description: string;
  ariaLabel: string;
  icon: React.ReactNode;
}

const FEATURE_CARDS: FeatureCard[] = [
  {
    number: '01.',
    title: 'PRECISION-LED TRAINING',
    description:
      'Structured training designed around individual goals, movement quality, progressive development, and measurable consistency.',
    ariaLabel: 'Pillar 01: Precision-Led Training',
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
        <circle cx="12" cy="12" r="9" strokeOpacity="0.4" />
        <circle cx="12" cy="12" r="4" strokeWidth="1.5" />
        <line x1="12" y1="1" x2="12" y2="4.5" />
        <line x1="12" y1="19.5" x2="12" y2="23" />
        <line x1="1" y1="12" x2="4.5" y2="12" />
        <line x1="19.5" y1="12" x2="23" y2="12" />
      </svg>
    ),
  },
  {
    number: '02.',
    title: 'FOCUSED ENVIRONMENT',
    description:
      'A considered training environment designed to reduce distractions and keep attention on the session.',
    ariaLabel: 'Pillar 02: Focused Environment',
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
        <path d="M4 8V4h4" />
        <path d="M16 4h4v4" />
        <path d="M20 16v4h-4" />
        <path d="M8 20H4v-4" />
        <rect x="8.5" y="8.5" width="7" height="7" strokeOpacity="0.5" />
        <circle cx="12" cy="12" r="1.5" fill="#D4AF37" stroke="none" />
      </svg>
    ),
  },
  {
    number: '03.',
    title: 'PERSONALIZED APPROACH',
    description:
      'Training guidance can be adapted around individual experience, goals, schedule, and progression.',
    ariaLabel: 'Pillar 03: Personalized Approach',
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
        <circle cx="12" cy="7.5" r="3.5" />
        <path d="M5.5 19.5c0-3.3 2.9-5.5 6.5-5.5s6.5 2.2 6.5 5.5" />
        <line x1="12" y1="17.5" x2="12" y2="20.5" strokeOpacity="0.5" />
      </svg>
    ),
  },
];

export const ArmourDifferenceSection: React.FC = () => {
  return (
    <SectionContainer
      id="armour-difference"
      background="canvas"
      aria-label="The Armour Difference"
      className="relative"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        <header className="flex flex-col mb-12 md:mb-16 lg:mb-20 text-left items-start">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[11px] font-mono tracking-widest text-[#D4AF37] px-2.5 py-1 border border-[#D4AF37]/30 bg-[#D4AF37]/5 rounded-[2px] uppercase">
              03 // THE ARMOUR DIFFERENCE
            </span>
          </div>

          <h2 className="heading-section text-white max-w-3xl leading-[1.15]">
            BUILT UPON<br />
            PRECISION, PRIVACY<br />
            <span className="text-white">&amp; PERSONALIZATION</span>
          </h2>

          <p className="mt-5 text-base md:text-lg text-[#A5A5A5] leading-relaxed max-w-2xl font-light font-sans">
            Armour is designed around focused training, thoughtful programming, and an environment where every session has a purpose.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {FEATURE_CARDS.map((card, idx) => (
            <article
              key={card.number}
              aria-label={card.ariaLabel}
              className={`group relative flex flex-col justify-between p-8 md:p-9 lg:p-10 bg-[#0B0B0B] border border-[#292929] rounded-[4px] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#D4AF37] hover:shadow-[0_12px_32px_rgba(0,0,0,0.6)] ${
                idx === 2 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div
                className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#292929] group-hover:border-[#D4AF37] transition-colors duration-300 pointer-events-none"
                aria-hidden="true"
              />

              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-sm tracking-widest text-[#D4AF37] font-medium">
                    {card.number}
                  </span>
                  <div
                    className="w-10 h-10 rounded-[3px] flex items-center justify-center border border-[#222222] bg-[#121212] text-[#D4AF37] group-hover:border-[#D4AF37]/50 group-hover:bg-[#161616] transition-colors duration-300"
                    aria-hidden="true"
                  >
                    {card.icon}
                  </div>
                </div>

                <h3 className="font-serif text-lg md:text-xl font-semibold tracking-wide text-white uppercase mb-3.5 leading-snug">
                  {card.title}
                </h3>

                <p className="text-sm md:text-[15px] text-[#A5A5A5] leading-relaxed font-light font-sans">
                  {card.description}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-[#1C1C1C] flex items-center justify-between">
                <div
                  className="h-[1px] w-8 bg-[#D4AF37]/40 group-hover:w-16 group-hover:bg-[#D4AF37] transition-all duration-300"
                  aria-hidden="true"
                />
                <span className="font-mono text-[10px] tracking-widest text-[#6B6B6B] uppercase group-hover:text-[#A5A5A5] transition-colors duration-300">
                  STANDARD 0{idx + 1}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
};
