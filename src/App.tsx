import React from 'react';
import { MouseAnimation } from './components/MouseAnimation';
import { NavbarAndHero } from './components/NavbarAndHero';
import { WelcomeAndMarquee } from './components/WelcomeAndMarquee';
import { AmenitiesPillars } from './components/AmenitiesPillars';
import { ExperiencesAndDining } from './components/ExperiencesAndDining';
import { TeamSection } from './components/TeamSection';
import { TestimonialsRoadmapFooter } from './components/TestimonialsRoadmapFooter';

export function App() {
  return (
    <div className="min-h-screen bg-[#F4F8F5] text-[#102019]">
      <MouseAnimation />
      <NavbarAndHero />

      <main>
        <WelcomeAndMarquee />
        <AmenitiesPillars />
        <ExperiencesAndDining />
        <TeamSection />
      </main>

      <TestimonialsRoadmapFooter />
    </div>
  );
}

export default App;
