import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { PopularCities } from '../components/PopularCities';
import { FeaturedProperties } from '../components/FeaturedProperties';
import { PropertyTypesSection } from '../components/PropertyTypesSection';
import { NewProjectsSection } from '../components/NewProjectsSection';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { BuyRentCTA } from '../components/BuyRentCTA';
import { SellPropertyCTA } from '../components/SellPropertyCTA';
import { AgentsSection } from '../components/AgentsSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { FinalCTA } from '../components/FinalCTA';

export const HomePage: React.FC = () => {
  return (
    <main className="w-full">
      {/* 1. Hero Search Engine with Autocomplete & Trending tags */}
      <HeroSection />

      {/* 2. Popular Indian Cities */}
      <PopularCities />

      {/* 3. Featured Verified Properties */}
      <FeaturedProperties />

      {/* 4. Browse by Property Type */}
      <PropertyTypesSection />

      {/* 5. Direct Builder Launches / New Projects */}
      <NewProjectsSection />

      {/* 6. Why Choose PropertyDekhey Trust Pillars */}
      <WhyChooseUs />

      {/* 7. Dual Action: Buy vs Rent */}
      <BuyRentCTA />

      {/* 8. Post Property / Sell Faster CTA */}
      <SellPropertyCTA />

      {/* 9. Verified RERA Real Estate Agents */}
      <AgentsSection />

      {/* 10. Customer Stories & Testimonials */}
      <TestimonialsSection />

      {/* 11. Final Conversion CTA Banner */}
      <FinalCTA />
    </main>
  );
};
