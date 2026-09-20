import React from 'react';
import { Hero } from '../components/home/Hero';
import { IntroSection } from '../components/home/IntroSection';
import { DesignBuildTransform } from '../components/home/DesignBuildTransform';
import { ServicesPreview } from '../components/home/ServicesPreview';
import { ProjectsPreview } from '../components/home/ProjectsPreview';
import { ConceptToCreation } from '../components/home/ConceptToCreation';
import { TrustSection } from '../components/common/TrustSection';
import { InstagramSection } from '../components/home/InstagramSection';
import { ContactCTA } from '../components/home/ContactCTA';
import { DocumentTitle } from '../components/common/DocumentTitle';

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      <DocumentTitle
        title="Infinity Space Group | Architects, Engineers & Contractors in Ranchi"
        description="Infinity Space Group provides architecture, structural design, civil construction, interior design, renovation and 3D visualization services in Ranchi, Jharkhand."
      />
      {/* 1. HERO */}
      <Hero />

      {/* 2. INTRODUCTION */}
      <IntroSection />

      {/* 3. DESIGN • BUILD • TRANSFORM */}
      <DesignBuildTransform />

      {/* 4. SERVICES */}
      <ServicesPreview />

      {/* 5. SELECTED WORK */}
      <ProjectsPreview />

      {/* 6. PROCESS */}
      <ConceptToCreation />

      {/* 7. TRUST / CREDIBILITY */}
      <TrustSection />

      {/* 8. INSTAGRAM */}
      <InstagramSection />

      {/* 9. CONTACT CTA */}
      <ContactCTA />
    </div>
  );
};
