import React from 'react';
import { Logo } from '../ui/Logo';
import { Instagram, MessageSquare, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-[#080808] border-t border-[#292929] pt-16 pb-12 text-[#A5A5A5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-[#292929]/70">
          {/* Column 1: Brand & Identity (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-4">
            <Logo monogramSize={36} />
            <p className="text-sm text-[#888888] max-w-sm leading-relaxed font-light mt-2">
              An architectural sanctum of strength, conditioning and physical discipline. Engineered for those who demand more from their training.
            </p>
            <div className="pt-2">
              <span className="inline-block text-[10px] font-mono tracking-widest text-[#D4AF37] px-2.5 py-1 border border-[#D4AF37]/30 bg-[#D4AF37]/5 rounded-[2px]">
                HIGH-PERFORMANCE LUXURY FITNESS
              </span>
            </div>
          </div>

          {/* Column 2: Navigation (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col space-y-3">
            <h3 className="text-xs font-mono font-semibold tracking-[0.2em] text-white uppercase mb-2">
              NAVIGATION
            </h3>
            <ul className="space-y-2.5 text-sm font-sans">
              <li>
                <button
                  type="button"
                  onClick={() => handleScrollTo('hero')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleScrollTo('why-armour')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleScrollTo('experience')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
                >
                  Experience
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleScrollTo('membership')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
                >
                  Membership
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleScrollTo('contact')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Social & Direct Dispatch (3 Cols) */}
          <div className="lg:col-span-3 flex flex-col space-y-3">
            <h3 className="text-xs font-mono font-semibold tracking-[0.2em] text-white uppercase mb-2">
              CONNECT
            </h3>
            <div className="space-y-2.5 text-sm font-sans">
              <a
                href="https://instagram.com/armourluxurgym"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors group cursor-pointer"
              >
                <Instagram size={15} className="text-[#D4AF37]" />
                <span>Instagram</span>
                <ArrowUpRight size={13} className="text-[#666666] group-hover:text-[#D4AF37] transition-colors" />
              </a>

              <a
                href="https://wa.me/?text=Hello%20Armour%20Luxury%20Gym"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors group cursor-pointer"
              >
                <MessageSquare size={15} className="text-[#D4AF37]" />
                <span>WhatsApp</span>
                <ArrowUpRight size={13} className="text-[#666666] group-hover:text-[#D4AF37] transition-colors" />
              </a>
            </div>

            <div className="pt-4">
              <span className="text-[10px] font-mono tracking-widest text-[#666666] uppercase block">
                FLAGSHIP DISCRETION
              </span>
              <span className="text-xs text-[#888888] font-light mt-0.5 block">
                Access granted strictly via vetted accreditation.
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#666666] font-sans">
          <p>© 2026 Armour Luxury Gym. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px] font-mono text-[#555555]">
            <span>STRENGTH</span>
            <span>·</span>
            <span>CONDITIONING</span>
            <span>·</span>
            <span>RECOVERY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
