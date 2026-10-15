import React, { useState, useEffect, useRef } from 'react';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';
import { NavItem } from '../../types';

export interface NavbarProps {
  onInquireClick?: () => void;
}

/**
 * ============================================================================
 * PROMPT #3 SPECIFICATION: ARMOUR LUXURY GYM NAVIGATION SYSTEM
 * ============================================================================
 * 
 * 1. DESKTOP / TABLET NAVIGATION:
 *    LEFT:  AL monogram + ARMOUR + LUXURY GYM
 *    RIGHT: HOME, ABOUT, EXPERIENCE, SERVICES, CONTACT
 *    CTA:   JOIN NOW
 * 
 * 2. MOBILE NAVIGATION (< 768px):
 *    LEFT:  AL monogram + ARMOUR + LUXURY GYM
 *    RIGHT: Architectural 3-line hamburger button morphing into close 'X' via CSS.
 *    Full-screen luxury architectural mobile overlay with sequential reveals.
 *    Menu items: HOME, ABOUT, EXPERIENCE, SERVICES, CONTACT
 *    CTA:   JOIN NOW
 * 
 * 3. SMOOTH SCROLL NAVIGATION & TARGET MAPPINGS:
 *    - HOME       -> #hero
 *    - ABOUT      -> #why-armour
 *    - EXPERIENCE -> #experience-3d
 *    - SERVICES   -> #services
 *    - CONTACT    -> #contact
 * 
 * 4. ACCESSIBILITY & BEHAVIOR:
 *    - aria-label, aria-expanded, aria-controls on toggle button
 *    - Keyboard accessible with focus management
 *    - Escape key closes menu & returns focus to toggle button
 *    - Outside click closes menu
 *    - Body scroll locked during mobile menu active state
 *    - Subtle active section highlight via IntersectionObserver
 *    - Respects prefers-reduced-motion
 *    - Zero unnecessary libraries or heavy loops
 * ============================================================================
 */

const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'HOME', href: '#hero' },
  { id: 'why-armour', label: 'ABOUT', href: '#why-armour' },
  { id: 'experience-3d', label: 'EXPERIENCE', href: '#experience-3d' },
  { id: 'services', label: 'SERVICES', href: '#services' },
  { id: 'contact', label: 'CONTACT', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onInquireClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstNavLinkRef = useRef<HTMLAnchorElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // 1. Monitor scroll state for subtle elevation & blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Active section tracking with IntersectionObserver
  useEffect(() => {
    const sectionIds = ['hero', 'why-armour', 'experience-3d', 'services', 'contact'];
    const observers: IntersectionObserver[] = [];

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const observer = new IntersectionObserver(handleIntersect, {
          root: null,
          rootMargin: '-20% 0px -60% 0px',
          threshold: 0,
        });
        observer.observe(el);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  // 3. Body scroll locking when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);

  // 4. Focus management & Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
      // Move focus to first nav item on open
      setTimeout(() => {
        firstNavLinkRef.current?.focus();
      }, 50);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  // Handle smooth scroll to section
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }

    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
      menuButtonRef.current?.focus();
    }
  };

  // Handle primary CTA click (JOIN NOW)
  const handleJoinClick = () => {
    if (onInquireClick) {
      onInquireClick();
    } else {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
      menuButtonRef.current?.focus();
    }
  };

  // Handle click outside of mobile menu content
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === mobileMenuRef.current) {
      setMobileMenuOpen(false);
      menuButtonRef.current?.focus();
    }
  };

  return (
    <>
      {/* =====================================================================
          FIXED DESKTOP & MOBILE HEADER
          ===================================================================== */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#080808]/95 backdrop-blur-md border-b border-[#292929] py-3'
            : 'bg-[#080808]/85 backdrop-blur-xs border-b border-[#292929]/60 py-3.5 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* ZONE 1: BRAND LOGO (AL Monogram + ARMOUR + LUXURY GYM) */}
          <div className="flex items-center shrink-0">
            <Logo monogramSize={32} />
          </div>

          {/* ZONE 2: DESKTOP / LAPTOP NAVIGATION LINKS */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-sans font-medium uppercase tracking-[0.16em]"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative py-1.5 transition-colors duration-200 ${
                    isActive
                      ? 'text-[#D4AF37] font-semibold'
                      : 'text-[#A5A5A5] hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {/* Subtle gold indicator dot/hairline for active state */}
                  <span
                    aria-hidden="true"
                    className={`absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#D4AF37] transition-all duration-300 ${
                      isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* ZONE 3: PRIMARY CTA (JOIN NOW) & MOBILE HAMBURGER TOGGLE */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Desktop CTA: JOIN NOW */}
            <div className="hidden md:block">
              <Button
                variant="primary"
                size="sm"
                onClick={handleJoinClick}
                className="text-[11px] tracking-[0.14em]"
              >
                JOIN NOW
              </Button>
            </div>

            {/* Mobile Hamburger Button with Pure CSS 3-Line morph to 'X' */}
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden flex items-center justify-center w-11 h-11 text-white border border-[#292929] hover:border-[#D4AF37] rounded-xs bg-[#111111] transition-colors focus-visible:outline-2 focus-visible:outline-[#D4AF37] cursor-pointer relative z-50 select-none"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-overlay"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {/* Architectural 3-Line Hamburger Icon with CSS Transform to X */}
              <div className="w-5 h-4 relative flex flex-col justify-between" aria-hidden="true">
                {/* Top line */}
                <span
                  className={`block w-full h-[1.5px] bg-current transform transition-all duration-300 origin-center ${
                    mobileMenuOpen
                      ? 'rotate-45 translate-y-[7.5px] bg-[#D4AF37]'
                      : 'rotate-0 translate-y-0'
                  }`}
                />
                {/* Middle line */}
                <span
                  className={`block w-full h-[1.5px] bg-current transition-all duration-200 ${
                    mobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
                  }`}
                />
                {/* Bottom line */}
                <span
                  className={`block w-full h-[1.5px] bg-current transform transition-all duration-300 origin-center ${
                    mobileMenuOpen
                      ? '-rotate-45 -translate-y-[7.5px] bg-[#D4AF37]'
                      : 'rotate-0 translate-y-0'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================================
          FULL-SCREEN LUXURY ARCHITECTURAL MOBILE NAVIGATION OVERLAY
          ===================================================================== */}
      <div
        id="mobile-navigation-overlay"
        ref={mobileMenuRef}
        onClick={handleOverlayClick}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
        className={`fixed inset-0 z-40 md:hidden bg-[#080808]/98 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between pt-24 pb-8 px-6 sm:px-8 ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto visible'
            : 'opacity-0 pointer-events-none invisible'
        }`}
      >
        {/* Architectural hairline pattern accent */}
        <div
          className="absolute inset-0 pointer-events-none opacity-5"
          style={{
            backgroundImage:
              'linear-gradient(to right, #292929 1px, transparent 1px), linear-gradient(to bottom, #292929 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col pt-4">
          {/* Eyebrow / Category Label */}
          <div className="flex items-center gap-2 mb-6">
            <span className="w-4 h-[1px] bg-[#D4AF37]" aria-hidden="true" />
            <span className="text-kicker text-[10px] tracking-[0.24em]">
              Directory Index
            </span>
          </div>

          {/* Sequential Menu Items */}
          <nav className="flex flex-col divide-y divide-[#292929]/50">
            {NAV_ITEMS.map((item, index) => {
              const isActive = activeSection === item.id;
              const delay = `${(index + 1) * 60}ms`;

              return (
                <a
                  key={item.label}
                  ref={index === 0 ? firstNavLinkRef : undefined}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  aria-current={isActive ? 'page' : undefined}
                  style={{
                    transitionDelay: mobileMenuOpen ? delay : '0ms',
                  }}
                  className={`py-4 text-xl sm:text-2xl font-serif tracking-[0.12em] flex items-center justify-between group transition-all duration-300 transform ${
                    mobileMenuOpen
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-3 opacity-0'
                  } ${
                    isActive
                      ? 'text-[#D4AF37] font-bold'
                      : 'text-white hover:text-[#D4AF37]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-[#6B6B6B] group-hover:text-[#D4AF37] transition-colors">
                      0{index + 1}
                    </span>
                    <span>{item.label}</span>
                  </div>

                  {/* Active or hover indicator */}
                  <div className="flex items-center gap-2">
                    {isActive && (
                      <span className="text-[10px] font-mono uppercase text-[#D4AF37] tracking-widest px-2 py-0.5 border border-[#D4AF37]/30 bg-[#D4AF37]/10 rounded-xs">
                        Active
                      </span>
                    )}
                    <span
                      aria-hidden="true"
                      className="text-[#6B6B6B] group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all text-sm font-mono"
                    >
                      →
                    </span>
                  </div>
                </a>
              );
            })}
          </nav>
        </div>

        {/* Bottom Drawer Action Zone: JOIN NOW & Brand Footer */}
        <div
          style={{
            transitionDelay: mobileMenuOpen ? '360ms' : '0ms',
          }}
          className={`relative z-10 pt-6 border-t border-[#292929] flex flex-col gap-4 transform transition-all duration-300 ${
            mobileMenuOpen
              ? 'translate-y-0 opacity-100'
              : 'translate-y-4 opacity-0'
          }`}
        >
          <Button
            variant="primary"
            size="lg"
            onClick={handleJoinClick}
            className="w-full text-xs tracking-[0.18em]"
          >
            JOIN NOW
          </Button>

          <div className="flex items-center justify-between text-[11px] text-[#6B6B6B] pt-1">
            <span>ARMOUR LUXURY GYM</span>
            <span className="font-mono text-[#D4AF37]">FOUNDATION STAGE</span>
          </div>
        </div>
      </div>
    </>
  );
};
