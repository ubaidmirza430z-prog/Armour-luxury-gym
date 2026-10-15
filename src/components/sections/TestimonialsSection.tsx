import React, { useState } from 'react';
import { SectionContainer } from '../ui/SectionContainer';
import { SectionHeading } from '../ui/SectionHeading';
import { Quote, Star, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

interface TestimonialFramework {
  slotId: string;
  memberProfile: string;
  focusArea: string;
  statusText: string;
}

const TESTIMONIAL_SLOTS: TestimonialFramework[] = [
  {
    slotId: 'T-01',
    memberProfile: 'Member Perspective Slot 01',
    focusArea: 'Strength & Conditioning',
    statusText: 'DETAILS TO BE CONFIRMED — Verified member feedback to be inserted upon official launch.',
  },
  {
    slotId: 'T-02',
    memberProfile: 'Member Perspective Slot 02',
    focusArea: 'Athletic Performance',
    statusText: 'DETAILS TO BE CONFIRMED — Verified member feedback to be inserted upon official launch.',
  },
  {
    slotId: 'T-03',
    memberProfile: 'Member Perspective Slot 03',
    focusArea: 'Movement & Longevity',
    statusText: 'DETAILS TO BE CONFIRMED — Verified member feedback to be inserted upon official launch.',
  },
];

/**
 * ============================================================================
 * SECTION 09: TESTIMONIALS & PROOF (FOUNDATION STAGE)
 * ============================================================================
 * Beginner Note:
 * Strict project rule: NO FAKE TESTIMONIALS or fabricated quotes.
 * This component provides the responsive quote framework, member attribution
 * layout, and pagination controls ready for real client quotes.
 * ============================================================================
 */
export const TestimonialsSection: React.FC = () => {
  const [activeSlot, setActiveSlot] = useState(0);

  const handleNext = () => {
    setActiveSlot((prev) => (prev + 1) % TESTIMONIAL_SLOTS.length);
  };

  const handlePrev = () => {
    setActiveSlot((prev) => (prev - 1 + TESTIMONIAL_SLOTS.length) % TESTIMONIAL_SLOTS.length);
  };

  const current = TESTIMONIAL_SLOTS[activeSlot];

  return (
    <SectionContainer id="testimonials" background="surface" aria-label="Member Testimonials Framework">
      <SectionHeading
        stepBadge="09 // ENDORSEMENTS"
        eyebrow="Member Experience"
        title="VERIFIED MEMBER PERSPECTIVES"
        description="Armour upholds the highest discretion for all members. Real transformational accounts will be cataloged here following private onboarding."
      />

      <div className="max-w-4xl mx-auto">
        <div className="p-8 md:p-12 bg-[#080808] border border-[#292929] rounded-xs relative">
          {/* Quote Mark in Gold */}
          <div className="w-12 h-12 rounded-xs border border-[#292929] bg-[#111111] flex items-center justify-center text-[#D4AF37] mb-6">
            <Quote size={20} />
          </div>

          {/* Testimonial Placeholder Quote Box */}
          <div className="min-h-[120px] flex flex-col justify-center">
            <p className="text-base sm:text-lg md:text-xl font-display text-[#E0E0E0] italic leading-relaxed">
              &ldquo;{current.statusText}&rdquo;
            </p>
          </div>

          {/* Attribution Metadata */}
          <div className="mt-8 pt-6 border-t border-[#1a1a1a] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-white font-medium text-sm">
                <span>{current.memberProfile}</span>
                <CheckCircle2 size={15} className="text-[#D4AF37]" />
              </div>
              <span className="text-xs text-[#6B6B6B] block mt-0.5">
                Focus Discipline: {current.focusArea}
              </span>
            </div>

            {/* Interactive Carousel Pagination Controls */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[#A5A5A5] mr-2">
                0{activeSlot + 1} / 0{TESTIMONIAL_SLOTS.length}
              </span>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous testimonial framework"
                className="w-9 h-9 border border-[#292929] hover:border-[#D4AF37] text-white flex items-center justify-center rounded-xs bg-[#111111] transition-colors cursor-pointer"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next testimonial framework"
                className="w-9 h-9 border border-[#292929] hover:border-[#D4AF37] text-white flex items-center justify-center rounded-xs bg-[#111111] transition-colors cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Quiet Footnote */}
        <div className="mt-4 text-center text-xs text-[#6B6B6B]">
          Private NDA & Discretion Protocols apply to all Armour athlete profiles.
        </div>
      </div>
    </SectionContainer>
  );
};
