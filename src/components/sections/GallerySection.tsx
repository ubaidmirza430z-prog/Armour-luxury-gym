import React, { useState, useEffect, useRef } from 'react';
import { Camera, Sparkles, Layers } from 'lucide-react';

export type GalleryCategory =
  | 'All'
  | 'Strength'
  | 'Cardio'
  | 'Training Floor'
  | 'Personal Training'
  | 'Recovery'
  | 'Interior';

export interface GalleryItem {
  id: string;
  category: Exclude<GalleryCategory, 'All'>;
  title: string;
  specs: string;
  gridSpan: string; // for asymmetric editorial grid layout
  aspectRatio: string;
  accentCode: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-strength',
    category: 'Strength',
    title: 'Precision Strength Apparatus',
    specs: 'Eleiko calibrated steel racks, competition barbells, custom billet iron',
    gridSpan: 'lg:col-span-8 lg:row-span-2',
    aspectRatio: 'aspect-[16/10] lg:aspect-[16/9]',
    accentCode: 'SECTOR // 01-STR',
  },
  {
    id: 'g-cardio',
    category: 'Cardio',
    title: 'Metabolic Conditioning Deck',
    specs: 'Curved woodway non-motorized runners, Concept2 fleet & dynamic airflow',
    gridSpan: 'lg:col-span-4 lg:row-span-1',
    aspectRatio: 'aspect-[4/3]',
    accentCode: 'SECTOR // 02-CRD',
  },
  {
    id: 'g-training-floor',
    category: 'Training Floor',
    title: 'Kinetic Movement & Turf Corridor',
    specs: '30m high-velocity sprint turf with integrated linear velocity tracking',
    gridSpan: 'lg:col-span-4 lg:row-span-1',
    aspectRatio: 'aspect-[4/3]',
    accentCode: 'SECTOR // 03-FLR',
  },
  {
    id: 'g-personal-training',
    category: 'Personal Training',
    title: 'Private Coaching Sanctuary',
    specs: 'Isolated biomechanical assessment bay and dedicated movement screening',
    gridSpan: 'lg:col-span-4 lg:row-span-1',
    aspectRatio: 'aspect-[4/3]',
    accentCode: 'SECTOR // 04-COACH',
  },
  {
    id: 'g-recovery',
    category: 'Recovery',
    title: 'Contrast Hydro & Infrared Suite',
    specs: 'Nordic cedar infrared saunas, cryo immersion baths & percussive lounge',
    gridSpan: 'lg:col-span-4 lg:row-span-1',
    aspectRatio: 'aspect-[4/3]',
    accentCode: 'SECTOR // 05-RCV',
  },
  {
    id: 'g-interior',
    category: 'Interior',
    title: 'Architectural Sanctum & Vault',
    specs: 'Low-glare warm gold indirect lighting, basalt stone and acoustic quiet',
    gridSpan: 'lg:col-span-4 lg:row-span-1',
    aspectRatio: 'aspect-[4/3]',
    accentCode: 'SECTOR // 06-INT',
  },
];

const CATEGORIES: GalleryCategory[] = [
  'All',
  'Strength',
  'Cardio',
  'Training Floor',
  'Personal Training',
  'Recovery',
  'Interior',
];

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('All');
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setInView(true);
      return;
    }

    const fallbackTimer = setTimeout(() => {
      setInView(true);
    }, 150);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, []);

  const filteredItems =
    activeCategory === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      aria-label="The Armour Experience Gallery"
      className="relative z-10 w-full overflow-hidden bg-[#080808] border-b border-[#292929] py-16 md:py-24 lg:py-28"
    >
      {/* Anchor for navigation */}
      <span id="experience" className="absolute -top-24 pointer-events-none" aria-hidden="true" />

      {/* Background Architectural Grid Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      {/* Ambient radial gold illumination */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-br from-[#D4AF37]/5 via-transparent to-transparent rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ===================================================================
            SECTION HEADER
            =================================================================== */}
        <header
          className={`flex flex-col mb-10 md:mb-14 text-left items-start transition-all duration-700 ease-out motion-reduce:transition-none ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-90 translate-y-3'
          }`}
          style={{ transitionDelay: '0ms' }}
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-2.5 mb-4">
            <span className="w-4 h-[1.5px] bg-[#D4AF37]" aria-hidden="true" />
            <span className="text-[11px] sm:text-xs font-mono tracking-widest text-[#D4AF37] uppercase font-semibold">
              GYM EXPERIENCE // GALLERY
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="heading-section text-white max-w-3xl leading-[1.14] tracking-tight">
            THE ARMOUR EXPERIENCE.
          </h2>

          {/* Subtitle */}
          <p className="mt-4 text-base sm:text-lg md:text-xl text-[#A5A5A5] font-light max-w-2xl font-sans leading-relaxed">
            An environment engineered for focus, performance and progression.
          </p>
        </header>

        {/* ===================================================================
            CATEGORY FILTER TABS
            - Mobile-friendly scroll/wrap
            =================================================================== */}
        <div className="mb-8 md:mb-12 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-2 p-1.5 bg-[#0C0C0C] border border-[#202020] rounded-[3px] w-max">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 sm:px-4 py-2 text-xs font-mono tracking-wider uppercase rounded-[2px] transition-all duration-200 cursor-pointer min-h-[38px] flex items-center whitespace-nowrap ${
                    isActive
                      ? 'bg-[#D4AF37] text-black font-semibold shadow-sm'
                      : 'text-[#A5A5A5] hover:text-white hover:bg-[#141414]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* ===================================================================
            ASYMMETRIC LUXURY EDITORIAL GALLERY GRID
            - Desktop: Asymmetric multi-span layout
            - Tablet: 2 columns
            - Mobile: 1-column or 2-column clean layout, zero overflow
            =================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
          {filteredItems.map((item, idx) => (
            <article
              key={item.id}
              className={`group relative flex flex-col justify-between bg-[#0B0B0B] border border-[#292929] hover:border-[#D4AF37]/60 rounded-[4px] overflow-hidden transition-all duration-500 ease-out hover:shadow-[0_16px_40px_rgba(0,0,0,0.85),0_0_24px_rgba(212,175,55,0.06)] motion-reduce:transition-none ${
                activeCategory === 'All' ? item.gridSpan : 'lg:col-span-6'
              } ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-90 translate-y-3'
              }`}
              style={{
                transitionDelay: inView ? `${100 + (idx % 6) * 60}ms` : '0ms',
              }}
            >
              {/* Corner Hairline Bracket */}
              <div
                className="absolute top-0 right-0 w-3.5 h-3.5 border-t border-r border-[#292929] group-hover:border-[#D4AF37]/80 transition-colors duration-300 z-20 pointer-events-none"
                aria-hidden="true"
              />

              {/* High-End Architectural Visual Container */}
              <div
                className={`w-full ${item.aspectRatio} bg-[#121212] relative flex flex-col items-center justify-center p-6 text-center overflow-hidden border-b border-[#1C1C1C]`}
              >
                {/* Subtle Geometric Blueprint Vector Lines */}
                <div
                  className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
                  aria-hidden="true"
                >
                  <svg
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out motion-reduce:transform-none"
                    viewBox="0 0 400 300"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect x="20" y="20" width="360" height="260" stroke="#D4AF37" strokeWidth="0.75" strokeDasharray="3 3" />
                    <line x1="20" y1="150" x2="380" y2="150" stroke="#D4AF37" strokeWidth="0.5" />
                    <line x1="200" y1="20" x2="200" y2="280" stroke="#D4AF37" strokeWidth="0.5" />
                    <circle cx="200" cy="150" r="60" stroke="#D4AF37" strokeWidth="0.75" />
                    <circle cx="200" cy="150" r="100" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="4 4" />
                  </svg>
                </div>

                {/* Subtle hover zoom layer */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none" />

                {/* Center Content Placeholder Emblem */}
                <div className="relative z-10 flex flex-col items-center max-w-sm px-4 transform group-hover:scale-[1.02] transition-transform duration-500 ease-out motion-reduce:transform-none">
                  <div className="w-12 h-12 rounded-[2px] border border-[#292929] bg-[#0E0E0E] flex items-center justify-center text-[#A5A5A5] mb-3 group-hover:border-[#D4AF37] group-hover:text-[#D4AF37] transition-colors shadow-inner">
                    <Camera size={20} />
                  </div>
                  <span className="text-[11px] font-mono tracking-widest text-[#D4AF37] uppercase font-semibold">
                    {item.accentCode}
                  </span>
                  <span className="text-xs font-mono text-[#777777] mt-1 uppercase tracking-wider">
                    {item.category} Visual Slot
                  </span>
                </div>

                {/* Bottom Left Architectural Specs Tag */}
                <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 bg-[#080808]/90 border border-[#202020] px-2.5 py-1 rounded-[2px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" aria-hidden="true" />
                  <span className="text-[9.5px] font-mono tracking-wider text-[#A5A5A5] uppercase">
                    4K EDITORIAL ASSET READY
                  </span>
                </div>
              </div>

              {/* Editorial Caption Bar */}
              <div className="p-5 sm:p-6 bg-[#0B0B0B] flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-white uppercase tracking-wide group-hover:text-[#D4AF37] transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#A5A5A5] leading-relaxed font-light font-sans">
                    {item.specs}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-[#1C1C1C] flex items-center justify-between">
                  <span className="font-mono text-[9px] tracking-widest text-[#666666] uppercase">
                    ARMOUR PHYSICAL FACILITY
                  </span>
                  <div
                    className="h-[1.5px] w-5 bg-[#D4AF37]/40 group-hover:w-10 group-hover:bg-[#D4AF37] transition-all duration-300"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
