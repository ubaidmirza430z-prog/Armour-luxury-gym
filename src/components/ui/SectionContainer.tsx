import React from 'react';

export interface SectionContainerProps {
  id?: string;
  className?: string;
  containerClassName?: string;
  background?: 'canvas' | 'surface' | 'tertiary';
  hasBorderBottom?: boolean;
  hasBorderTop?: boolean;
  children: React.ReactNode;
  'aria-label'?: string;
}

/**
 * Standard responsive section wrapper for Armour Luxury Gym.
 * Enforces zero horizontal overflow, consistent vertical rhythm,
 * and maximum content width boundaries.
 */
export const SectionContainer: React.FC<SectionContainerProps> = ({
  id,
  className = '',
  containerClassName = '',
  background = 'canvas',
  hasBorderBottom = true,
  hasBorderTop = false,
  children,
  'aria-label': ariaLabel,
}) => {
  const bgClasses = {
    canvas: 'bg-[#080808]',
    surface: 'bg-[#111111]',
    tertiary: 'bg-[#161616]',
  }[background];

  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`relative w-full overflow-hidden ${bgClasses} ${
        hasBorderTop ? 'border-t border-[#292929]' : ''
      } ${hasBorderBottom ? 'border-b border-[#292929]' : ''} py-16 md:py-24 lg:py-28 ${className}`}
    >
      {/* Maximum Content Width Container with Responsive Horizontal Padding */}
      <div
        className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${containerClassName}`}
      >
        {children}
      </div>
    </section>
  );
};
