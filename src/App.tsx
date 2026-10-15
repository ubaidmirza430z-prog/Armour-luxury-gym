/**
 * ============================================================================
 * ARMOUR LUXURY GYM - MAIN APPLICATION ENTRY
 * ============================================================================
 * 
 * FOUNDATION ARCHITECTURE:
 * This component orchestrates the 12 primary sections of the website.
 * Each section is modular, self-contained in `/src/components/sections/`,
 * and built to be expanded step-by-step as real content is added.
 * 
 * SECTIONS IN ORDER:
 * 1.  Navbar                 - Fixed top bar with AL monogram & navigation
 * 2.  HeroSection            - Cinematic visual anchor and primary statement
 * 3.  WhyArmourSection       - 4 core architectural pillars & standards
 * 4.  ThreeExperienceSection - Three.js WebGL canvas architecture & model slot
 * 5.  ServicesSection        - Training disciplines & biomechanical services
 * 6.  TrainersSection        - Master coaching staff slots & credentials
 * 7.  GallerySection         - Lazy-loading visual archive & facility slots
 * 8.  MembershipSection      - Curated membership tiers & private tariffs
 * 9.  TestimonialsSection    - Verified member case study framework
 * 10. LocationSection        - Flagship details & validated inquiry capture form
 * 11. FinalCtaSection        - Closing high-conversion enrollment call
 * 12. Footer                 - Quiet brand footer & directory navigation
 * ============================================================================
 */

import React from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { ThreeExperienceSection } from './components/sections/ThreeExperienceSection';
import { TheArmourStandardSection } from './components/sections/TheArmourStandardSection';
import { TrainingProgramsSection } from './components/sections/TrainingProgramsSection';
import { TheArmourFacilitySection } from './components/sections/TheArmourFacilitySection';
import { ServicesSection } from './components/sections/ServicesSection';
import { TrainersSection } from './components/sections/TrainersSection';
import { MemberTestimonialsSection } from './components/sections/MemberTestimonialsSection';
import { GallerySection } from './components/sections/GallerySection';
import { MembershipSection } from './components/sections/MembershipSection';
import { ResultsTestimonialsSection } from './components/sections/ResultsTestimonialsSection';
import { LocationSection } from './components/sections/LocationSection';
import { FinalCtaSection } from './components/sections/FinalCtaSection';

export default function App() {
  const handleScrollToInquiry = () => {
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToMembership = () => {
    const membershipElement = document.getElementById('membership');
    if (membershipElement) {
      membershipElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#080808] text-white flex flex-col selection:bg-[#D4AF37] selection:text-black">
      {/* 01. NAVIGATION */}
      <Navbar onInquireClick={handleScrollToInquiry} />

      {/* MAIN CONTENT LANDMARKS */}
      <main id="main-content" className="flex-grow">
        {/* 02. HERO SECTION */}
        <HeroSection onInquireClick={handleScrollToInquiry} />

        {/* 03. 3D SPATIAL DUMBBELL & ARCHITECTURAL VIEWPORT */}
        <ThreeExperienceSection />

        {/* 04. THE ARMOUR STANDARD */}
        <TheArmourStandardSection />

        {/* 05. TRAINING PROGRAMS */}
        <TrainingProgramsSection />

        {/* 06. THE ARMOUR FACILITY */}
        <TheArmourFacilitySection />

        {/* 07. MEMBERSHIP */}
        <MembershipSection onInquireClick={handleScrollToInquiry} onSelectTier={handleScrollToInquiry} />

        {/* 08. RESULTS & TESTIMONIALS (05 // MEMBER RESULTS) */}
        <ResultsTestimonialsSection />

        {/* 09. SERVICES & DISCIPLINES */}
        <ServicesSection />

        {/* 10. MASTER TRAINERS */}
        <TrainersSection />

        {/* 11. MEMBER TESTIMONIALS (PROVEN BY PERFORMANCE) */}
        <MemberTestimonialsSection />

        {/* 12. GALLERY & TRANSFORMATIONS (THE ARMOUR EXPERIENCE) */}
        <GallerySection />

        {/* 13. LOCATION & CONTACT INQUIRY (YOUR NEXT SESSION STARTS HERE) */}
        <LocationSection />

        {/* 14. FINAL CTA (READY TO RAISE YOUR STANDARD?) */}
        <FinalCtaSection
          onInquireClick={handleScrollToInquiry}
          onRequestMembership={handleScrollToMembership}
        />
      </main>

      {/* 12. QUIET FOOTER */}
      <Footer />
    </div>
  );
}
