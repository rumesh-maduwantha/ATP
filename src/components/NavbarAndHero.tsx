import React, { useState } from 'react';
import { ArrowUpRight, Globe, Menu, Sparkles, X, ShieldCheck, Wifi } from 'lucide-react';
import { LangCode, PROPERTIES, WorkspaceTabId } from '../data/proposalData';

interface NavbarAndHeroProps {
  lang: LangCode;
  setLang: (lang: LangCode) => void;
  onOpenPortal: (tab?: WorkspaceTabId, propertyId?: string) => void;
}

const HERO_COPY: Record<
  LangCode,
  {
    eyebrow: string;
    intro: string;
    ctaTop: string;
    headlineTop: string;
    headlineBottom: string;
    subtitle: string;
    exploreLabel: string;
  }
> = {
  en: {
    eyebrow: 'Sri Lanka Smart Hospitality Platform',
    intro:
      'One mobile-first platform uniting property operations, predictive maintenance, utility intelligence, offline sync, and trilingual guest services.',
    ctaTop: 'Launch Live HMS',
    headlineTop: 'rooomy.lk',
    headlineBottom: 'Smart Hotel Management',
    subtitle: 'Built for Small & Medium Hotels, Villas, Guesthouses & Residences in Sri Lanka',
    exploreLabel: 'Explore Live Properties',
  },
  si: {
    eyebrow: 'ශ්‍රී ලංකාවේ ස්මාර්ට් හෝටල් කළමනාකරණ පද්ධතිය',
    intro:
      'හෝටල් මෙහෙයුම්, නඩත්තු කටයුතු, විදුලි හා ජල කළමනාකරණය, නොබැඳි සමමුහුර්තකරණය සහ ත්‍රිභාෂා ආගන්තුක සේවා එකම වේදිකාවකින්.',
    ctaTop: 'සජීවී පද්ධතිය බලන්න',
    headlineTop: 'rooomy.lk',
    headlineBottom: 'ස්මාර්ට් හෝටල් කළමනාකරණය',
    subtitle: 'ශ්‍රී ලංකාවේ කුඩා හා මධ්‍යම හෝටල්, විලා සහ නිවාඩු නිකේතන සඳහා විශේෂයෙන් නිර්මාණය කළා',
    exploreLabel: 'සජීවී නිකේතන පරීක්ෂා කරන්න',
  },
  ta: {
    eyebrow: 'இலங்கை ஸ்மார்ட் விருந்தோம்பல் மேலாண்மை தளம்',
    intro:
      'விடுதி செயல்பாடுகள், முன்னறிவிப்பு பராமரிப்பு, மின்சாரம் & நீர் கண்காணிப்பு, ஆஃப்லைன் ஒத்திசைவு மற்றும் மும்மொழி விருந்தினர் சேவைகள் அனைத்தும் ஒரே தளத்தில்.',
    ctaTop: 'நேரடி தளத்தை திறக்க',
    headlineTop: 'rooomy.lk',
    headlineBottom: 'ஸ்மார்ட் ஹோட்டல் மேலாண்மை',
    subtitle: 'இலங்கையின் சிறிய மற்றும் நடுத்தர ஹோட்டல்கள், வில்லாக்கள் மற்றும் விருந்தினர் இல்லங்களுக்காக',
    exploreLabel: 'நேரடி விடுதிகளை பார்க்க',
  },
};

export const NavbarAndHero: React.FC<NavbarAndHeroProps> = ({ lang, setLang, onOpenPortal }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const copy = HERO_COPY[lang];

  const navItems = [
    { label: 'Overview', href: '#overview' },
    { label: '10 Modules', href: '#modules' },
    { label: 'Workflows', href: '#workflows' },
    { label: 'Live HMS', href: '#live-portal' },
    { label: 'Experiences', href: '#experiences' },
    { label: 'Roadmap', href: '#roadmap' },
    { label: 'Team', href: '#team' },
  ];

  return (
    <section id="top" className="relative min-h-[92vh] w-full overflow-hidden bg-[#141311] text-white">
      {/* Full-bleed dusk resort hero image */}
      <img
        src="/images/hero-resort.jpg"
        alt="Sri Lankan luxury boutique resort powered by rooomy.lk"
        className="absolute inset-0 h-full w-full object-cover object-center scale-[1.02]"
      />
      {/* Editorial dark warm gradient scrims matching luxury screenshot */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#141311]/75 via-[#141311]/35 to-[#141311]/92" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#141311]/75 via-transparent to-[#141311]/55" />

      {/* Top Floating Navbar */}
      <header className="relative z-30 mx-auto max-w-7xl px-4 pt-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Brand */}
          <a href="#top" className="group flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C6A97B]/50 bg-[#151412]/70 backdrop-blur-md transition group-hover:border-[#C6A97B]">
              <span className="font-editorial text-lg font-semibold text-[#C6A97B]">r</span>
            </div>
            <div className="leading-tight">
              <span className="font-editorial text-2xl font-semibold tracking-wide text-white">
                rooomy<span className="text-[#C6A97B]">.lk</span>
              </span>
              <span className="block text-[9px] uppercase tracking-[0.26em] text-white/65">
                Smart Hospitality
              </span>
            </div>
          </a>

          {/* Center Glassmorphic Pill Nav (matching screenshot top bar) */}
          <nav className="hidden items-center gap-1 rounded-full border border-white/15 bg-[#151412]/55 px-2 py-1.5 backdrop-blur-md lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-white/85 transition hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Controls: Language Pill + Gold CTA */}
          <div className="hidden items-center gap-2.5 md:flex">
            <div className="flex items-center rounded-full border border-white/15 bg-[#151412]/60 p-1 backdrop-blur-md">
              <Globe className="ml-2 mr-1 h-3.5 w-3.5 text-[#C6A97B]" />
              {(['en', 'si', 'ta'] as LangCode[]).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition cursor-pointer ${
                    lang === code
                      ? 'bg-[#A88758] text-white'
                      : 'text-white/75 hover:text-white'
                  }`}
                >
                  {code === 'en' ? 'EN' : code === 'si' ? 'සිං' : 'தமி'}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => onOpenPortal('overview')}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#A88758] px-4 py-2 text-xs font-semibold tracking-wide text-white shadow-lg shadow-[#A88758]/20 transition hover:bg-[#937345] cursor-pointer"
            >
              {copy.ctaTop}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[#151412]/70 text-white backdrop-blur-md lg:hidden"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="mt-3 rounded-2xl border border-white/15 bg-[#151412]/95 p-4 backdrop-blur-xl lg:hidden">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm font-medium text-white/90 hover:bg-white/10"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
              <div className="flex gap-1.5">
                {(['en', 'si', 'ta'] as LangCode[]).map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setLang(code)}
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      lang === code ? 'bg-[#A88758] text-white' : 'bg-white/10 text-white/75'
                    }`}
                  >
                    {code === 'en' ? 'EN' : code === 'si' ? 'සිංහල' : 'தமிழ்'}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenPortal('overview');
                }}
                className="rounded-full bg-[#A88758] px-4 py-2 text-xs font-semibold text-white"
              >
                Live HMS
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Hero Canvas */}
      <div className="relative z-20 mx-auto flex min-h-[calc(92vh-80px)] max-w-7xl flex-col justify-between px-4 pb-10 pt-10 sm:px-6 lg:px-8">
        {/* Upper-left intro block (matches screenshot top-left copy + CTA) */}
        <div className="max-w-md pt-4 sm:pt-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C6A97B]/40 bg-[#151412]/55 px-3.5 py-1 text-[11px] font-medium tracking-wider text-[#E2CCA5] backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-[#C6A97B]" />
            {copy.eyebrow}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/85 sm:text-[15px]">
            {copy.intro}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onOpenPortal('overview')}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-semibold tracking-wide text-[#151412] transition hover:bg-[#F2EDE4] cursor-pointer"
            >
              Try Interactive Demo
              <ArrowUpRight className="h-3.5 w-3.5 text-[#A88758]" />
            </button>
            <a
              href="#modules"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-5 py-2.5 text-xs font-medium text-white backdrop-blur-sm transition hover:bg-white/15"
            >
              10 Proposal Features
            </a>
          </div>
        </div>

        {/* Iconic Script Overlay matching "Signature" in uploaded theme screenshot */}
        <div className="pointer-events-none my-4 flex justify-center select-none lg:my-0">
          <span className="font-script-accent text-[74px] leading-none text-[#E9D7B9]/80 drop-shadow-[0_6px_28px_rgba(0,0,0,0.45)] sm:text-[116px] lg:text-[148px]">
            Signature
          </span>
        </div>

        {/* Bottom Split: Left Large Serif Headline + Right Frosted 3-Property Card */}
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="mb-3 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-[#D8BE94]">
              <span className="inline-flex items-center gap-1.5">
                <Wifi className="h-3.5 w-3.5" /> Offline-First Sync
              </span>
              <span className="text-white/30">•</span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" /> Role-Based & Human-Approved AI
              </span>
            </div>
            <h1 className="font-editorial text-4xl font-medium leading-[1.03] tracking-tight text-white sm:text-6xl lg:text-[66px]">
              {copy.headlineTop}
              <span className="block text-[#DFC498]">{copy.headlineBottom}</span>
            </h1>
            <p className="mt-3 max-w-xl text-sm text-white/80 sm:text-base">
              {copy.subtitle}
            </p>
          </div>

          {/* Bottom-Right Frosted Dark Card with 3 Thumbnail Previews (exact screenshot layout) */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-white/15 bg-[#151412]/70 p-4 backdrop-blur-xl shadow-2xl">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#C6A97B]">
                    Multi-Property Sandbox
                  </p>
                  <p className="font-editorial text-lg font-medium text-white">
                    {copy.exploreLabel}
                  </p>
                </div>
                <span className="rounded-full border border-emerald-400/30 bg-emerald-500/15 px-2.5 py-1 text-[10px] font-semibold text-emerald-300">
                  3 Villas Live
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {PROPERTIES.map((prop) => (
                  <button
                    key={prop.id}
                    type="button"
                    onClick={() => onOpenPortal('overview', prop.id)}
                    className="group relative overflow-hidden rounded-xl border border-white/15 text-left transition hover:border-[#C6A97B] cursor-pointer"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden">
                      <img
                        src={prop.image}
                        alt={prop.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="bg-[#1B1917]/95 p-2">
                      <p className="truncate text-[11px] font-semibold text-white">
                        {prop.name}
                      </p>
                      <p className="truncate text-[10px] text-[#C6A97B]">
                        {prop.occupied}/{prop.rooms} occupied
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
