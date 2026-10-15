import React from 'react';
import { ButtonVariant, ButtonSize } from '../../types';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  isExternal?: boolean;
  children: React.ReactNode;
  className?: string;
}

/**
 * ============================================================================
 * PREMIUM REUSABLE BUTTON SYSTEM FOR ARMOUR LUXURY GYM
 * ============================================================================
 * 
 * SPECIFICATION:
 * - Primary button: Gold background (#D4AF37), dark text (#080808), bold weight.
 * - Secondary / Outline button: Dark or transparent background, white text,
 *   subtle #292929 border with restrained gold hover tone.
 * - Interaction: Restrained, subtle premium luxury interaction.
 *   NO bouncing, NO excessive scaling, NO flashy neon glows.
 * - Mobile Touch Target: Guaranteed minimum 44px height across sizes for touch ergonomics.
 * - Focus ring: High-contrast gold accessibility outline (:focus-visible).
 * ============================================================================
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  href,
  isExternal,
  children,
  className = '',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-sans font-semibold tracking-[0.14em] uppercase transition-colors duration-200 cursor-pointer select-none whitespace-nowrap text-center disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-[#D4AF37] focus-visible:outline-offset-2';

  // Strict minimum 44px height for mobile touch targets across buttons
  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'text-xs px-4 py-2.5 rounded-xs gap-1.5 min-h-[44px]',
    md: 'text-xs md:text-sm px-5 py-3 rounded-xs gap-2 min-h-[46px]',
    lg: 'text-xs md:text-sm px-7 py-3.5 rounded-xs gap-2.5 min-h-[50px] tracking-[0.16em]',
  };

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      'bg-[#D4AF37] text-[#080808] hover:bg-[#E5C358] active:bg-[#C29E2E] shadow-xs border border-[#D4AF37]',
    secondary:
      'bg-[#111111] text-white hover:bg-[#181818] border border-[#292929] hover:border-[#D4AF37]/50 active:bg-[#0c0c0c]',
    outline:
      'bg-transparent text-white border border-[#292929] hover:border-[#D4AF37] hover:text-[#D4AF37] hover:bg-[#D4AF37]/5 active:bg-[#D4AF37]/10',
    ghost:
      'bg-transparent text-[#A5A5A5] hover:text-white hover:bg-white/5 active:bg-white/10 border border-transparent',
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`.trim();

  if (href) {
    return (
      <a
        href={href}
        className={combinedClasses}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        <span className="truncate flex items-center gap-2">{children}</span>
      </a>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      <span className="truncate flex items-center gap-2">{children}</span>
    </button>
  );
};
