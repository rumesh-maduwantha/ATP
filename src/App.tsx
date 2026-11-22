import React, { useState } from 'react';
import { LangCode, WorkspaceTabId } from './data/proposalData';
import { NavbarAndHero } from './components/NavbarAndHero';
import { WelcomeAndMarquee } from './components/WelcomeAndMarquee';
import { ModulesShowcase } from './components/ModulesShowcase';
import { AmenitiesPillars } from './components/AmenitiesPillars';
import { ConnectedWorkflows } from './components/ConnectedWorkflows';
import { LiveHmsPortal } from './components/LiveHmsPortal';
import { ExperiencesAndDining } from './components/ExperiencesAndDining';
import { TeamSection } from './components/TeamSection';
import { TestimonialsRoadmapFooter } from './components/TestimonialsRoadmapFooter';

export function App() {
  const [lang, setLang] = useState<LangCode>('en');
  const [activePortalTab, setActivePortalTab] = useState<WorkspaceTabId>('overview');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('all');

  const handleOpenPortal = (tab: WorkspaceTabId = 'overview', propertyId?: string) => {
    setActivePortalTab(tab);
    if (propertyId) {
      setSelectedPropertyId(propertyId);
    }
    const el = document.getElementById('live-portal');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1B19]">
      <NavbarAndHero lang={lang} setLang={setLang} onOpenPortal={handleOpenPortal} />

      <main>
        <WelcomeAndMarquee onOpenPortal={handleOpenPortal} />
        <ModulesShowcase onOpenPortal={handleOpenPortal} />
        <AmenitiesPillars />
        <ConnectedWorkflows onOpenPortal={handleOpenPortal} />
        <LiveHmsPortal
          activeTab={activePortalTab}
          setActiveTab={setActivePortalTab}
          selectedPropertyId={selectedPropertyId}
          setSelectedPropertyId={setSelectedPropertyId}
          lang={lang}
        />
        <ExperiencesAndDining onOpenPortal={handleOpenPortal} />
        <TeamSection />
      </main>

      <TestimonialsRoadmapFooter onOpenPortal={handleOpenPortal} />
    </div>
  );
}

export default App;
