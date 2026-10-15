import React, { useState, useEffect, useRef } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { MEMBERSHIP_PLANS_CONFIG, MembershipPlan } from '../../config/membershipPlans';
import { MembershipModal } from '../ui/MembershipModal';

export interface MembershipSectionProps {
  onInquireClick?: () => void;
  onSelectTier?: (tierName: string) => void;
}

/**
 * ============================================================================
 * SECTION: MEMBERSHIP (04 // MEMBERSHIP)
 * ============================================================================
 * 
 * PLACEMENT:
 * Positioned immediately after "The Armour Facility" section.
 * 
 * DESIGN SPECIFICATION:
 * - Small gold label: "04 // MEMBERSHIP"
 * - Main heading: "CHOOSE YOUR STANDARD."
 * - Supporting text: "Membership designed around consistency, performance, and long-term progress."
 * - 3 Premium Membership Cards:
 *     01 — ESSENTIAL      (₹1,499 / MONTH)
 *     02 — PERFORMANCE    (₹2,499 / MONTH) - Featured "MOST POPULAR"
 *     03 — ELITE          (₹3,999 / MONTH)
 * - Central config object: all pricing & features in /src/config/membershipPlans.ts
 * - Clean modal inquiry workflow with validation and success feedback.
 * - Membership note below cards with "REQUEST INFORMATION →" button.
 * - Responsive: 3 in a row on desktop, 2 per row with 3rd centered on tablet, 1 per row on mobile.
 * ============================================================================
 */
export const MembershipSection: React.FC<MembershipSectionProps> = ({
  onInquireClick,
  onSelectTier,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePlan, setActivePlan] = useState<MembershipPlan | null>(null);

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

  const handleOpenPlanModal = (plan: MembershipPlan) => {
    setActivePlan(plan);
    setIsModalOpen(true);
    if (onSelectTier) {
      onSelectTier(plan.name);
    }
  };

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

  return (
    <section
      ref={sectionRef}
      id="membership"
      aria-label="Membership Tiers and Pricing"
      className="relative z-10 w-full overflow-hidden bg-[#080808] border-b border-[#292929] py-16 md:py-24 lg:py-28"
    >
      {/* Anchor targets for smooth internal navigation */}
      <span id="tiers" className="absolute -top-24 pointer-events-none" aria-hidden="true" />
      <span id="pricing" className="absolute -top-24 pointer-events-none" aria-hidden="true" />

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
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[500px] bg-gradient-to-br from-[#D4AF37]/5 via-transparent to-transparent rounded-full blur-3xl pointer-events-none"
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
              04 // MEMBERSHIP
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="heading-section text-white max-w-3xl leading-[1.14] tracking-tight">
            <span>CHOOSE YOUR</span>
            <br />
            <span className="text-white">STANDARD.</span>
          </h2>

          {/* Supporting Text */}
          <p className="mt-5 text-sm sm:text-base md:text-lg text-[#A5A5A5] leading-relaxed max-w-2xl font-light font-sans">
            Membership designed around consistency, performance, and long-term progress.
          </p>
        </header>

        {/* ===================================================================
            3 PREMIUM MEMBERSHIP CARDS
            - Desktop: 3 cards in one row (lg:grid-cols-3)
            - Tablet: 2 cards per row, 3rd card centered (md:grid-cols-2)
            - Mobile: 1 card per row (grid-cols-1)
            =================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch mb-16 md:mb-20">
          {MEMBERSHIP_PLANS_CONFIG.map((plan, idx) => {
            const isFeatured = !!plan.isPopular;

            return (
              <article
                key={plan.id}
                className={`group relative flex flex-col justify-between p-7 sm:p-9 rounded-[4px] transition-all duration-300 ease-out ${
                  idx === 2 ? 'md:col-span-2 md:max-w-md md:mx-auto md:w-full lg:col-span-1 lg:max-w-none' : ''
                } ${
                  isFeatured
                    ? 'bg-[#101010] border-2 border-[#D4AF37] shadow-[0_18px_48px_rgba(0,0,0,0.85),0_0_30px_rgba(212,175,55,0.12)] -translate-y-1 lg:-translate-y-2'
                    : 'bg-[#0B0B0B] border border-[#292929] hover:border-[#D4AF37]/60 hover:shadow-[0_16px_40px_rgba(0,0,0,0.8),0_0_24px_rgba(212,175,55,0.05)]'
                } hover:-translate-y-2 motion-reduce:transition-none motion-reduce:hover:transform-none ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-90 translate-y-3'
                }`}
                style={{
                  transitionDelay: inView ? `${120 + idx * 90}ms` : '0ms',
                }}
              >
                {/* Featured "MOST POPULAR" Gold Badge */}
                {plan.badge && (
                  <div className="absolute -top-3 right-6 sm:right-8 z-20">
                    <span className="inline-flex items-center gap-1.5 bg-[#D4AF37] text-black text-[10px] font-mono font-bold tracking-[0.18em] uppercase px-3 py-1 rounded-[2px] shadow-sm">
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Corner Hairline Bracket */}
                <div
                  className={`absolute top-0 right-0 w-3 h-3 border-t border-r pointer-events-none transition-colors duration-300 ${
                    isFeatured ? 'border-[#D4AF37]' : 'border-[#292929] group-hover:border-[#D4AF37]/80'
                  }`}
                  aria-hidden="true"
                />

                {/* Upper Content: Plan Info, Price & Description */}
                <div>
                  {/* Plan Number & Indicator */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-sm tracking-widest text-[#D4AF37] font-semibold">
                      {plan.planNumber}
                    </span>
                    <span className="text-[10px] font-mono tracking-widest text-[#666666] uppercase group-hover:text-[#A5A5A5] transition-colors">
                      TIER PROTOCOL
                    </span>
                  </div>

                  {/* Plan Title */}
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-wide text-white uppercase mb-4 leading-tight">
                    {plan.name}
                  </h3>

                  {/* Large Clean Price */}
                  <div className="py-4 px-4 bg-[#080808] border border-[#1C1C1C] rounded-[2px] mb-6">
                    <div className="text-[10px] font-mono tracking-widest text-[#888888] uppercase mb-1">
                      MEMBERSHIP INVESTMENT
                    </div>
                    <div className="font-mono text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-baseline gap-1">
                      <span>{plan.displayPrice}</span>
                    </div>
                  </div>

                  {/* Feature Inclusions with Small Gold Check Marks */}
                  <div className="space-y-3 mb-8">
                    <div className="text-[10px] font-mono tracking-widest text-[#666666] uppercase block">
                      PLAN INCLUSIONS:
                    </div>
                    <ul className="space-y-3 text-sm text-[#CCCCCC]">
                      {plan.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-3">
                          <span
                            className="w-4 h-4 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/50 flex items-center justify-center shrink-0 mt-0.5 text-[#D4AF37]"
                            aria-hidden="true"
                          >
                            <Check size={11} strokeWidth={2.8} />
                          </span>
                          <span className="font-sans font-light leading-snug text-[#E5E5E5]">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom CTA Button */}
                <div className="pt-6 border-t border-[#1C1C1C]">
                  <button
                    type="button"
                    onClick={() => handleOpenPlanModal(plan)}
                    className={`w-full min-h-[48px] py-3.5 px-6 font-sans font-semibold text-xs tracking-[0.16em] uppercase rounded-[2px] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 group/btn ${
                      isFeatured
                        ? 'bg-[#D4AF37] text-black hover:bg-[#E5C358] active:bg-[#C29E2E] shadow-[0_4px_16px_rgba(212,175,55,0.25)]'
                        : 'bg-[#141414] text-white border border-[#292929] hover:border-[#D4AF37] hover:text-[#D4AF37] hover:bg-[#D4AF37]/5 active:bg-[#D4AF37]/10'
                    }`}
                  >
                    <span>{plan.buttonText}</span>
                    <ArrowRight
                      size={14}
                      className="group-hover/btn:translate-x-1 transition-transform duration-200"
                    />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* ===================================================================
            MEMBERSHIP NOTE: CUSTOMIZED CONSULTATION
            =================================================================== */}
        <div className="p-8 sm:p-10 bg-[#0B0B0B] border border-[#292929] rounded-[4px] relative overflow-hidden">
          <div
            className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#D4AF37]/5 to-transparent rounded-full blur-2xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-[10.5px] font-mono tracking-widest text-[#D4AF37] uppercase font-semibold block mb-2">
                BESPOKE SOLUTIONS
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white uppercase tracking-wide mb-2">
                Need a customized membership?
              </h3>
              <p className="text-sm sm:text-base text-[#A5A5A5] font-light leading-relaxed font-sans">
                Speak with our team to find the training experience that fits your goals.
              </p>
            </div>

            <div className="shrink-0">
              <button
                type="button"
                onClick={handleScrollToContact}
                className="w-full sm:w-auto min-h-[48px] py-3.5 px-7 bg-[#141414] text-white border border-[#292929] hover:border-[#D4AF37] hover:text-[#D4AF37] hover:bg-[#D4AF37]/5 active:bg-[#D4AF37]/10 transition-colors font-sans font-semibold text-xs tracking-[0.16em] uppercase rounded-[2px] cursor-pointer flex items-center justify-center gap-2 group"
              >
                <span>REQUEST INFORMATION →</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Membership Inquiry Modal */}
      <MembershipModal
        isOpen={isModalOpen}
        selectedPlan={activePlan}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};
