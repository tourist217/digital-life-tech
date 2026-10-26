import React from 'react';
import Hero from '@/components/Hero';
import InteractiveClicker from '@/components/InteractiveClicker';
import ServicesSection from '@/components/ServicesSection';
import CasesSection from '@/components/CasesSection';
import ProjectCalculator from '@/components/ProjectCalculator';
import ManifestoSection from '@/components/ManifestoSection';
import BlogSection from '@/components/BlogSection';
import FaqSection from '@/components/FaqSection';
import ContactSection from '@/components/ContactSection';

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Interactive Vibe-Coding Live Showcase (Playable Clicker) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto -mt-10 sm:-mt-16 relative z-20">
        <InteractiveClicker />
      </section>

      {/* 3. Core Services & Process */}
      <ServicesSection />

      {/* 4. Cases Showcase */}
      <CasesSection />

      {/* 5. Interactive Cost & Timeline Calculator */}
      <ProjectCalculator />

      {/* 6. Manifesto & Philosophy of Vibe Coding */}
      <ManifestoSection />

      {/* 7. Blog, News & Author Notes */}
      <BlogSection />

      {/* 8. FAQ Accordion */}
      <FaqSection />

      {/* 9. Contact / Lead Form */}
      <ContactSection />
    </>
  );
}
