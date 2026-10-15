import React from 'react';
import { SectionContainer } from '../ui/SectionContainer';
import { SectionHeading } from '../ui/SectionHeading';
import { UserCheck, Award, Calendar } from 'lucide-react';

interface TrainerSlot {
  slotTitle: string;
  focus: string;
  credentialsPlanned: string[];
}

const TRAINER_ROLES: TrainerSlot[] = [
  {
    slotTitle: 'Performance Coaching Slot 01',
    focus: 'Strength & Conditioning',
    credentialsPlanned: ['Professional certifications: Details to be confirmed', 'Coaching specialization: In development', 'Staff credentials: To be announced'],
  },
  {
    slotTitle: 'Performance Coaching Slot 02',
    focus: 'Movement & Mobility',
    credentialsPlanned: ['Professional certifications: Details to be confirmed', 'Coaching specialization: In development', 'Staff credentials: To be announced'],
  },
  {
    slotTitle: 'Performance Coaching Slot 03',
    focus: 'Athletic Progression',
    credentialsPlanned: ['Professional certifications: Details to be confirmed', 'Coaching specialization: In development', 'Staff credentials: To be announced'],
  },
];

/**
 * ============================================================================
 * SECTION 06: MASTER TRAINERS (FOUNDATION STAGE)
 * ============================================================================
 * Beginner Note:
 * Per project rules, we do NOT invent fake trainer names or portraits.
 * Instead, this component establishes the exact architectural slots for
 * your coaching staff, ready to receive real names, bios, headshots, and
 * booking links.
 * ============================================================================
 */
export const TrainersSection: React.FC = () => {
  return (
    <SectionContainer id="trainers" background="canvas" aria-label="Master Coaching Staff">
      <SectionHeading
        stepBadge="06 // COACHING"
        eyebrow="Elite Coaching Faculty"
        title="DIRECTED BY MASTER PERFORMANCE SPECIALISTS"
        description="Our faculty comprises world-class performance directors, biomechanists, and physical therapists dedicated to individual athletic longevity."
      />

      {/* Trainer Roster Architecture Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {TRAINER_ROLES.map((slot, index) => (
          <div
            key={slot.slotTitle}
            className="p-6 bg-[#111111] border border-[#292929] hover:border-[#D4AF37]/50 transition-colors rounded-xs flex flex-col justify-between"
          >
            {/* Portrait Asset Slot Placeholder */}
            <div>
              <div className="w-full aspect-[4/5] bg-[#080808] border border-[#202020] rounded-xs mb-5 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden group">
                <div className="w-14 h-14 rounded-full border border-[#292929] bg-[#161616] flex items-center justify-center text-[#A5A5A5] mb-3">
                  <UserCheck size={22} className="text-[#D4AF37]" />
                </div>
                <span className="text-xs font-mono tracking-widest text-[#D4AF37] uppercase">
                  Staff Slot 0{index + 1}
                </span>
                <span className="text-[11px] text-[#6B6B6B] mt-1">
                  Ready for Staff Profile (4:5 Ratio)
                </span>
              </div>

              {/* Role Title & Focus */}
              <h3 className="text-base font-display font-bold text-white tracking-wide mb-1">
                {slot.slotTitle}
              </h3>
              <p className="text-xs text-[#D4AF37] font-mono tracking-wider uppercase mb-4">
                {slot.focus}
              </p>
            </div>

            {/* Credential Architecture */}
            <div className="pt-4 border-t border-[#1e1e1e] space-y-2">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#6B6B6B]">
                <Award size={13} className="text-[#D4AF37]" />
                <span>Coaching Profile:</span>
              </div>
              <ul className="space-y-1 text-xs text-[#A5A5A5]">
                {slot.credentialsPlanned.map((cred) => (
                  <li key={cred} className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-[#292929] rounded-full" />
                    <span>{cred}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 pt-3 flex items-center justify-between text-[11px] text-[#6B6B6B]">
                <span className="flex items-center gap-1">
                  <Calendar size={12} /> Status:
                </span>
                <span className="text-white">Details to be confirmed</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
};
