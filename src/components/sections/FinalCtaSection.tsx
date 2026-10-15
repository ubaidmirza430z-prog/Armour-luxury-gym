import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export interface FinalCtaSectionProps {
  onInquireClick?: () => void;
  onRequestMembership?: () => void;
}

/**
 * ============================================================================
 * SECTION: FINAL CALL TO ACTION
 * ============================================================================
 * 
 * SPECIFICATIONS:
 * Headline: "READY TO RAISE YOUR STANDARD?"
 * Supporting text: "Step into a training environment built around performance, discipline and consistency."
 * Primary button: "REQUEST MEMBERSHIP →"
 * Secondary button: "CONTACT ARMOUR"
 * Gold accent (#D4AF37) and dark background (#080808).
 * Lightweight cinematic ambient effect.
 * ============================================================================
 */
export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({
  onInquireClick,
  onRequestMembership,
}) => {
  const handleScrollToContact = () => {
    if (onInquireClick) {
      onInquireClick();
    } else {
      const contactElement = document.getElementById('contact');
      if (contactElement) {
        contactElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleRequestMembership = () => {
    if (onRequestMembership) {
      onRequestMembership();
    } else {
      const membershipSection = document.getElementById('membership');
      if (membershipSection) {
        membershipSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        handleScrollToContact();
      }
    }
  };

  return (
    <section
      id="final-cta"
      aria-label="Final Call To Action"
      className="relative z-10 w-full overflow-hidden bg-[#080808] border-b border-[#292929] py-20 sm:py-24 md:py-32"
    >
      {/* Background Architectural Grid */}
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

      {/* Subtle Cinematic Dual Gold Aura Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[450px] bg-gradient-to-r from-[#D4AF37]/10 via-[#D4AF37]/5 to-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Subtle Architectural Pill Indicator */}
        <div className="flex items-center gap-2 mb-6">
          <Sparkles size={14} className="text-[#D4AF37]" />
          <span className="text-[11px] font-mono tracking-widest text-[#D4AF37] uppercase font-semibold">
            THE ARMOUR STANDARD
          </span>
          <Sparkles size={14} className="text-[#D4AF37]" />
        </div>

        {/* Main Heading */}
        <h2 className="heading-section text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold uppercase tracking-tight max-w-4xl leading-[1.12] mb-6">
          READY TO RAISE YOUR STANDARD?
        </h2>

        {/* Supporting Text */}
        <p className="text-base sm:text-lg md:text-xl text-[#A5A5A5] font-light max-w-2xl font-sans leading-relaxed mb-10">
          Step into a training environment built around performance, discipline and consistency.
        </p>

        {/* Actions: Primary & Secondary Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          {/* Primary Button */}
          <button
            type="button"
            onClick={handleRequestMembership}
            className="w-full sm:w-auto min-h-[50px] py-4 px-8 bg-[#D4AF37] hover:bg-[#E5C358] active:bg-[#C29E2E] text-black font-sans font-semibold text-xs tracking-[0.18em] uppercase rounded-[2px] transition-all duration-200 shadow-[0_4px_24px_rgba(212,175,55,0.25)] flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>REQUEST MEMBERSHIP →</span>
            <ArrowRight
              size={15}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </button>

          {/* Secondary Button */}
          <button
            type="button"
            onClick={handleScrollToContact}
            className="w-full sm:w-auto min-h-[50px] py-4 px-8 bg-[#111111] hover:bg-[#1A1A1A] text-white border border-[#292929] hover:border-[#D4AF37] hover:text-[#D4AF37] font-sans font-semibold text-xs tracking-[0.18em] uppercase rounded-[2px] transition-colors flex items-center justify-center cursor-pointer"
          >
            CONTACT ARMOUR
          </button>
        </div>

        {/* Discreet Notice */}
        <p className="text-[11px] font-mono tracking-widest text-[#666666] uppercase mt-10">
          STRICT OCCUPANCY LIMITS ENFORCED TO GUARANTEE ACCESS QUALITY
        </p>
      </div>
    </section>
  );
};
