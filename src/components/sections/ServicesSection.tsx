import React, { useState } from 'react';
import { SectionContainer } from '../ui/SectionContainer';
import { SectionHeading } from '../ui/SectionHeading';
import { Dumbbell, Activity, HeartPulse, Apple, ArrowRight } from 'lucide-react';

interface ServiceCategory {
  id: string;
  code: string;
  name: string;
  description: string;
  icon: React.ElementType;
  amenities: string[];
}

const SERVICES: ServiceCategory[] = [
  {
    id: 'conditioning',
    code: '01',
    name: 'Athletic Conditioning',
    description:
      'Structured physical conditioning programs tailored to strength development, functional stamina, and balanced mobility.',
    icon: Dumbbell,
    amenities: ['Strength apparatus: Details to be confirmed', 'Training stations: In development', 'Coached conditioning: Details in preparation'],
  },
  {
    id: 'diagnostics',
    code: '02',
    name: 'Movement & Performance Assessment',
    description:
      'Comprehensive movement screening and physical evaluations designed to guide effective personal progression.',
    icon: Activity,
    amenities: ['Diagnostic protocols: Details to be confirmed', 'Progress tracking: In development', 'Evaluations: Scheduled by appointment'],
  },
  {
    id: 'recovery',
    code: '03',
    name: 'Recovery & Regeneration',
    description:
      'Supportive recovery modalities designed to assist natural physical repair, tissue restoration, and relaxation.',
    icon: HeartPulse,
    amenities: ['Recovery facilities: Details to be confirmed', 'Regeneration space: In development', 'Protocol guidelines: To be announced'],
  },
  {
    id: 'nutrition',
    code: '04',
    name: 'Nutritional Guidance & Refreshment',
    description:
      'Targeted nutritional strategies and curated post-workout refreshments to complement training regimens.',
    icon: Apple,
    amenities: ['Nutritional guidance: Details to be confirmed', 'Refreshment amenities: In development', 'Dietary consultations: To be announced'],
  },
];

/**
 * ============================================================================
 * SECTION 05: SERVICES & DISCIPLINES (FOUNDATION STAGE)
 * ============================================================================
 * Beginner Note:
 * This component establishes the services framework.
 * Real service catalogs, exact booking links, and pricing tiers can be plugged
 * in during the Services expansion step.
 * ============================================================================
 */
export const ServicesSection: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>('conditioning');

  return (
    <SectionContainer id="services" background="surface" aria-label="Training Services & Disciplines">
      <SectionHeading
        stepBadge="05 // DISCIPLINES"
        eyebrow="Training & Performance"
        title="SPECIALIZED DISCIPLINES TAILORED TO THE INDIVIDUAL"
        description="Every training program at Armour is engineered around your physiological profile, athletic objectives, and recovery thresholds."
      />

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SERVICES.map((service) => {
          const Icon = service.icon;
          const isSelected = selectedService === service.id;

          return (
            <div
              key={service.id}
              onClick={() => setSelectedService(service.id)}
              className={`p-6 sm:p-8 bg-[#080808] border transition-all duration-200 cursor-pointer rounded-xs flex flex-col justify-between ${
                isSelected
                  ? 'border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.05)]'
                  : 'border-[#292929] hover:border-[#404040]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-[#D4AF37]">
                    {service.code}.
                  </span>
                  <div className="w-8 h-8 rounded-xs border border-[#292929] bg-[#111111] flex items-center justify-center text-[#A5A5A5]">
                    <Icon size={16} />
                  </div>
                </div>

                <h3 className="heading-card text-white mb-2">
                  {service.name}
                </h3>
                <p className="text-sm text-[#A5A5A5] leading-relaxed mb-6 font-light">
                  {service.description}
                </p>
              </div>

              <div>
                <div className="pt-4 border-t border-[#1a1a1a] space-y-1.5 mb-4">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#6B6B6B] block">
                    Discipline Features:
                  </span>
                  {service.amenities.map((item) => (
                    <div key={item} className="text-xs text-[#A5A5A5] flex items-center gap-2">
                      <span className="w-1.5 h-[1px] bg-[#D4AF37]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#6B6B6B] group-hover:text-[#D4AF37] font-medium">
                  <span>{isSelected ? 'Selected Category' : 'Inspect Category Details'}</span>
                  <ArrowRight size={13} className="text-[#D4AF37]" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </SectionContainer>
  );
};
