import React, { useEffect, useState } from 'react';
import { Button } from '../ui/Button';
import { ArrowRight, Box } from 'lucide-react';
import { Hero3DViewport } from './Hero3DViewport';

export interface HeroSectionProps {
  onInquireClick?: () => void;
}

/**
 * ============================================================================
 * SECTION 02: HERO SECTION (PROMPT #4 UPGRADE)
 * ============================================================================
 * 
 * SPECIFICATION:
 * - Desktop Layout (Two Column Grid):
 *   LEFT:
 *     - Small eyebrow label: "THE PINNACLE OF HUMAN PERFORMANCE"
 *     - Main headline: "WHERE STRENGTH MEETS UNCOMPROMISING LUXURY"
 *       (with gold highlight on UNCOMPROMISING)
 *     - Supporting copy: "Armour Luxury Gym represents an architectural
 *       sanctuary dedicated to human performance, disciplined conditioning,
 *       and refined athletic aesthetics."
 *     - Primary CTA: "REQUEST INFORMATION →" (scrolls to contact section)
 *     - Secondary CTA: "PREVIEW 3D SPATIAL" (scrolls to 3D section)
 *   RIGHT:
 *     - Premium interactive 3D visual area (sculptural apparatus monolith).
 * 
 * - Mobile Layout (< 768px):
 *   Single-column sequential order:
 *   1. Eyebrow
 *   2. Headline (responsive clamp() - no horizontal clipping from 320px to 430px)
 *   3. Description
 *   4. Primary CTA
 *   5. Secondary CTA
 *   6. 3D Visual (controlled height, no overflow)
 * 
 * - Entrance Animation (400ms - 900ms subtle motion):
 *   Eyebrow -> Headline -> Supporting prose -> CTAs -> 3D Viewport.
 *   Honors prefers-reduced-motion automatically.
 * 
 * - Scroll Damping & Parallax:
 *   Lightweight, passive scroll observer passes offset to 3D object without heavy reflows.
 * ============================================================================
 */
export const HeroSection: React.FC<HeroSectionProps> = ({ onInquireClick }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      aria-label="Armour Luxury Gym Introduction"
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-24 pb-16 md:pt-32 md:pb-20 bg-[#080808] border-b border-[#292929] overflow-hidden"
    >
      {/* Subtle luxury ambient glow layer */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle at 40% 30%, rgba(212, 175, 55, 0.14) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      {/* Structural Hairline Grid Accent */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(to right, #292929 1px, transparent 1px), linear-gradient(to bottom, #292929 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Responsive Grid: 1 Col on Mobile/Tablet, 2 Cols on Desktop (1024px+) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">
          
          {/* =================================================================
              LEFT COLUMN: EDITORIAL BRAND NARRATIVE & CONVERSION CTAs
              ================================================================= */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* 1. Small Eyebrow Label */}
            <div className="animate-hero-eyebrow flex items-center gap-2 mb-4 sm:mb-6">
              <span className="w-5 h-[1.5px] bg-[#D4AF37]" aria-hidden="true" />
              <span className="text-kicker text-[11px] sm:text-xs">
                THE PINNACLE OF HUMAN PERFORMANCE
              </span>
              <span className="w-5 h-[1.5px] bg-[#D4AF37] lg:hidden" aria-hidden="true" />
            </div>

            {/* 2. Main Headline with Responsive Fluid Typography */}
            <h1 className="animate-hero-headline heading-hero text-white tracking-tight break-words max-w-2xl">
              <span>WHERE STRENGTH MEETS </span>
              <span className="text-[#D4AF37]">UNCOMPROMISING </span>
              <span>LUXURY</span>
            </h1>

            {/* 3. Supporting Body Copy */}
            <p className="animate-hero-prose mt-5 sm:mt-6 text-sm sm:text-base md:text-lg text-[#A5A5A5] max-w-xl font-light leading-relaxed">
              Armour Luxury Gym represents an architectural sanctuary dedicated to human performance, disciplined conditioning, and refined athletic aesthetics.
            </p>

            {/* 4. Primary & Secondary CTA Buttons */}
            <div className="animate-hero-cta mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                onClick={onInquireClick || (() => handleScrollToSection('contact'))}
                className="w-full sm:w-auto group min-w-[200px]"
              >
                <span>REQUEST INFORMATION</span>
                <ArrowRight
                  size={15}
                  className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                />
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => handleScrollToSection('experience-3d')}
                className="w-full sm:w-auto gap-2 min-w-[190px]"
              >
                <Box size={15} className="text-[#D4AF37]" />
                <span>PREVIEW 3D SPATIAL</span>
              </Button>
            </div>

            {/* Subtle Standards Badges (Neutral, Verified Foundation) */}
            <div className="animate-hero-cta mt-10 pt-6 border-t border-[#292929]/70 w-full max-w-xl grid grid-cols-2 sm:grid-cols-3 gap-4 text-left">
              <div>
                <span className="text-[9.5px] font-mono tracking-widest text-[#6B6B6B] uppercase block">
                  Standards
                </span>
                <span className="text-xs sm:text-sm font-serif font-bold text-white mt-0.5 block">
                  Curated Conditioning
                </span>
              </div>
              <div>
                <span className="text-[9.5px] font-mono tracking-widest text-[#6B6B6B] uppercase block">
                  Enrollment
                </span>
                <span className="text-xs sm:text-sm font-serif font-bold text-[#D4AF37] mt-0.5 block">
                  Inquiry Open
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-[9.5px] font-mono tracking-widest text-[#6B6B6B] uppercase block">
                  Spatial View
                </span>
                <span className="text-xs sm:text-sm font-serif font-bold text-white mt-0.5 block">
                  PBR Interactive
                </span>
              </div>
            </div>
          </div>

          {/* =================================================================
              RIGHT COLUMN: PREMIUM INTERACTIVE 3D VISUAL AREA
              ================================================================= */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center w-full animate-hero-3d">
            <Hero3DViewport scrollY={scrollY} />
          </div>

        </div>
      </div>
    </section>
  );
};
