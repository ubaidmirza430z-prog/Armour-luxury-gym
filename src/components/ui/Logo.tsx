import React from 'react';

export interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  monogramSize?: number;
  colorScheme?: 'gold' | 'white';
}

/**
 * ============================================================================
 * ARMOUR LUXURY GYM - APPROVED GEOMETRIC AL MONOGRAM & BRAND IDENTITY
 * ============================================================================
 * 
 * DESIGN SPECIFICATION:
 * - A premium, architectural monogram visually merging:
 *     A = ARMOUR (strong apex and balanced diagonal architecture)
 *     L = LUXURY (seamless horizontal base stem extending from the right flank)
 * - Pure geometric lines without fitness cliches (no dumbbells, muscles, shields, or crowns).
 * - Primary color: Gold (#D4AF37)
 * - Secondary / alternative: White (#FFFFFF)
 * - Background: #080808
 * - Highly readable and distinct across all viewports (from 320px mobile to 4K desktop).
 * 
 * HOW TO REPLACE WITH FINAL ASSET LATER:
 * 1. Place your final logo file in `/public/logo.svg` or `/public/logo.png`.
 * 2. In this component, replace the `<svg>` monogram block below with:
 *    `<img src="/logo.svg" alt="Armour Luxury Gym Monogram" className="..." />`
 * ============================================================================
 */
export const Logo: React.FC<LogoProps> = ({
  className = '',
  showWordmark = true,
  monogramSize = 34,
  colorScheme = 'gold',
}) => {
  const primaryStroke = colorScheme === 'gold' ? '#D4AF37' : '#FFFFFF';
  const accentStroke = colorScheme === 'gold' ? '#FFFFFF' : '#D4AF37';

  return (
    <a
      href="#hero"
      aria-label="Armour Luxury Gym - Return to home"
      className={`inline-flex items-center gap-2.5 sm:gap-3 group select-none transition-opacity hover:opacity-95 shrink-0 ${className}`}
    >
      {/* =====================================================================
          APPROVED AL MONOGRAM (Architectural Geometric Vector)
          Can be effortlessly replaced by a real SVG or PNG asset anytime.
          ===================================================================== */}
      <div
        className="relative flex items-center justify-center shrink-0"
        style={{ width: monogramSize, height: monogramSize }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full transform transition-transform duration-300 group-hover:scale-[1.03]"
        >
          {/* Subtle outer geometric hairline frame */}
          <rect
            x="4"
            y="4"
            width="92"
            height="92"
            rx="2"
            stroke="#292929"
            strokeWidth="1.5"
            className="group-hover:stroke-[#D4AF37]/50 transition-colors"
          />

          {/* Combined 'A' and 'L' Architectural Geometry */}
          {/* Left diagonal leg of 'A' */}
          <path
            d="M 48 18 L 22 80"
            stroke={primaryStroke}
            strokeWidth="6.5"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />

          {/* Right leg of 'A' merging continuously into horizontal baseline of 'L' */}
          <path
            d="M 48 18 L 74 80 L 86 80"
            stroke={primaryStroke}
            strokeWidth="6.5"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />

          {/* Architectural horizontal crossbar of 'A' */}
          <path
            d="M 33 56 L 63 56"
            stroke={accentStroke}
            strokeWidth="4.5"
            strokeLinecap="square"
          />

          {/* Subtle top apex architectural notch in gold */}
          <rect
            x="45.5"
            y="13"
            width="5"
            height="5"
            fill={primaryStroke}
            transform="rotate(45 48 15.5)"
          />
        </svg>
      </div>

      {/* =====================================================================
          BRAND WORDMARK: ARMOUR + LUXURY GYM
          Clean modern sans / high-contrast typography hierarchy
          ===================================================================== */}
      {showWordmark && (
        <div className="flex flex-col tracking-wider leading-none">
          <span className="font-sans font-extrabold text-[13px] sm:text-[15px] tracking-[0.2em] text-white leading-none">
            ARMOUR
          </span>
          <span className="font-sans text-[8.5px] sm:text-[9.5px] tracking-[0.28em] text-[#A5A5A5] leading-tight font-medium uppercase mt-1 group-hover:text-[#D4AF37] transition-colors">
            LUXURY GYM
          </span>
        </div>
      )}
    </a>
  );
};
