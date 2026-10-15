import React from 'react';

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  level?: 1 | 2 | 3;
  className?: string;
  stepBadge?: string;
}

/**
 * Editorial section header component for Armour Luxury Gym.
 * Complies with strict typography hierarchy:
 * - Gold kicker/eyebrow (unboxed, tracked)
 * - Cinematic display title with text-wrap: balance
 * - Subdued, readable body description
 */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  align = 'left',
  level = 2,
  className = '',
  stepBadge,
}) => {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';
  const descAlign = align === 'center' ? 'mx-auto' : '';

  const HeadingTag = `h${level}` as React.ElementType;

  return (
    <header className={`flex flex-col mb-10 md:mb-14 ${alignClass} ${className}`}>
      {/* Eyebrow / Step Indicator */}
      {(eyebrow || stepBadge) && (
        <div className="flex items-center gap-3 mb-3">
          {stepBadge && (
            <span className="text-[11px] font-mono tracking-widest text-[#D4AF37] px-2 py-0.5 border border-[#D4AF37]/30 bg-[#D4AF37]/5 rounded-xs">
              {stepBadge}
            </span>
          )}
          {eyebrow && (
            <span className="text-kicker">
              {eyebrow}
            </span>
          )}
        </div>
      )}

      {/* Cinematic Display Title */}
      <HeadingTag className="heading-section text-white max-w-3xl">
        {title}
      </HeadingTag>

      {/* Subdued Editorial Description */}
      {description && (
        <p className={`mt-4 text-base md:text-lg text-[#A5A5A5] leading-relaxed max-w-2xl font-light ${descAlign}`}>
          {description}
        </p>
      )}
    </header>
  );
};
