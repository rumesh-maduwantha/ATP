import React, { useState } from 'react';
import { ArrowUpRight, Menu, Sparkles, X, ShieldCheck, Wifi } from 'lucide-react';
import { PROPERTIES } from '../data/proposalData';
import { RooomyLogo } from './RooomyLogo';
import { MarketingInquiryModal } from './MarketingInquiryModal';

export const NavbarAndHero: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);

  const navItems = [
    { label: 'Overview', href: '#overview' },
    { label: 'Experiences', href: '#experiences' },
    { label: 'Roadmap', href: '#roadmap' },
    { label: 'Team', href: '#team' },
  ];

  return (
    <section
      id="top"
      className="relative flex min-h-dvh w-full flex-col overflow-hidden bg-[#0B1712] text-white lg:h-dvh"
    >
      {/* Full-bleed dusk resort hero image */}
      <img
        src="/images/hero-resort.jpg"
        alt="Sri Lankan luxury boutique resort powered by rooomy.lk"
        className="absolute inset-0 h-full w-full object-cover object-center scale-[1.02]"
      />
      {/* Editorial dark warm gradient scrims matching luxury theme */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1712]/75 via-[#0B1712]/35 to-[#0B1712]/92" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B1712]/75 via-transparent to-[#0B1712]/55" />

      {/* Top Floating Navbar */}
      <header className="relative z-30 mx-auto w-full max-w-7xl shrink-0 px-4 pt-4 sm:px-6 lg:px-8 lg:pt-5">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <a href="#top" className="group inline-flex items-center" aria-label="rooomy.lk Home">
            <RooomyLogo size="md" showTagline />
          </a>

          {/* Center Glassmorphic Pill Nav */}
          <nav className="hidden items-center gap-1 rounded-full border border-white/15 bg-[#0E1C16]/55 px-2 py-1.5 backdrop-blur-md lg:flex">
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

          {/* Right CTA */}
          <div className="hidden items-center gap-2.5 md:flex">
            <a
              href="#pilot"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#2D6A4F] px-4 py-2 text-xs font-semibold tracking-wide text-white shadow-lg shadow-[#2D6A4F]/20 transition hover:bg-[#1E4D38]"
            >
              Request Pilot
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[#0E1C16]/70 text-white backdrop-blur-md lg:hidden"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="mt-3 rounded-2xl border border-white/15 bg-[#0E1C16]/95 p-4 backdrop-blur-xl lg:hidden">
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
            <div className="mt-4 flex items-center justify-end border-t border-white/10 pt-3">
              <a
                href="#pilot"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#2D6A4F] px-4 py-2 text-xs font-semibold text-white"
              >
                Request Pilot
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Hero Canvas */}
      <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between px-4 pb-6 pt-6 sm:px-6 sm:pb-8 lg:px-8 lg:pb-10 lg:pt-6">
        {/* Upper-left intro block */}
        <div className="max-w-md pt-2 sm:pt-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#74C69D]/40 bg-[#0E1C16]/55 px-3.5 py-1 text-[11px] font-medium tracking-wider text-[#B7E4C7] backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-[#74C69D]" />
            Sri Lanka Smart Hospitality Platform
          </div>
          <p className="mt-3 text-sm leading-relaxed text-white/85 sm:text-[15px]">
            One mobile-first platform uniting property operations, predictive maintenance, utility
            intelligence, offline sync, and trilingual guest services.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setInquiryOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-semibold tracking-wide text-[#0E1C16] transition hover:bg-[#E6F0EA] cursor-pointer"
            >
              Get Started · Inquiry
              <ArrowUpRight className="h-3.5 w-3.5 text-[#2D6A4F]" />
            </button>
            <a
              href="#experiences"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-5 py-2.5 text-xs font-medium text-white backdrop-blur-sm transition hover:bg-white/15"
            >
              Explore Experiences
            </a>
          </div>
        </div>

        {/* Bottom Split: Left Large Serif Headline + Right Frosted 3-Property Card */}
        <div className="mt-8 grid items-end gap-6 lg:mt-auto lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <div className="mb-3 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-[#95D5B2]">
              <span className="inline-flex items-center gap-1.5">
                <Wifi className="h-3.5 w-3.5" /> Offline-First Sync
              </span>
              <span className="text-white/30">•</span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" /> Role-Based & Human-Approved AI
              </span>
            </div>
            <h1 className="font-editorial text-4xl font-medium leading-[1.03] tracking-tight text-white sm:text-6xl lg:text-[66px]">
              rooomy.lk
              <span className="block text-[#95D5B2]">Smart Hotel Management</span>
            </h1>
            <p className="mt-3 max-w-xl text-sm text-white/80 sm:text-base">
              Built for Small & Medium Hotels, Villas, Guesthouses & Residences in Sri Lanka
            </p>
          </div>

          {/* Bottom-Right Frosted Dark Card with 3 Thumbnail Previews */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-white/15 bg-[#0E1C16]/70 p-4 backdrop-blur-xl shadow-2xl">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#74C69D]">
                    Multi-Property Showcase
                  </p>
                  <p className="font-editorial text-lg font-medium text-white">
                    Explore Featured Properties
                  </p>
                </div>
                <span className="rounded-full border border-emerald-400/30 bg-emerald-500/15 px-2.5 py-1 text-[10px] font-semibold text-emerald-300">
                  3 Villas Live
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {PROPERTIES.map((prop) => (
                  <a
                    key={prop.id}
                    href="#experiences"
                    className="group relative overflow-hidden rounded-xl border border-white/15 text-left transition hover:border-[#74C69D]"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden">
                      <img
                        src={prop.image}
                        alt={prop.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="bg-[#13261E]/95 p-2">
                      <p className="truncate text-[11px] font-semibold text-white">
                        {prop.name}
                      </p>
                      <p className="truncate text-[10px] text-[#74C69D]">
                        {prop.occupied}/{prop.rooms} occupied
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Details & Marketing Mailto Modal */}
      <MarketingInquiryModal isOpen={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </section>
  );
};
