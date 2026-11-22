import React from 'react';
import { ArrowRight, CheckCircle2, CloudOff, Layers, Shield, Sparkles } from 'lucide-react';
import { WorkspaceTabId } from '../data/proposalData';

interface WelcomeAndMarqueeProps {
  onOpenPortal: (tab?: WorkspaceTabId) => void;
}

const MARQUEE_ITEMS = [
  'Predictive Maintenance & Equipment History',
  'Smart Sustainability & Utility-Cost Manager',
  'Local Experience Marketplace',
  'Guest Complaint Prevention & Service Recovery',
  'Multi-Property Owner & Caretaker Control',
  'Sinhala · Tamil · English AI Voice Assistant',
  'Offline-First Operations & Auto-Sync',
  'In-App Purchasing & Supplier Management',
  'QR-Based Guest Spending & Available Balance',
  'Multilingual In-App Digital Menu',
];

export const WelcomeAndMarquee: React.FC<WelcomeAndMarqueeProps> = ({ onOpenPortal }) => {
  return (
    <>
      {/* Section 2: Welcome Split (Exact match to screenshot white split section) */}
      <section id="overview" className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            {/* Left Photography Card */}
            <div className="relative lg:col-span-5">
              <div className="overflow-hidden rounded-2xl shadow-2xl shadow-black/10">
                <img
                  src="/images/welcome-reception.jpg"
                  alt="Sri Lankan boutique hotel concierge using rooomy.lk on tablet"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              {/* Floating Luxury Status Card */}
              <div className="absolute -bottom-5 left-5 right-5 flex items-center justify-between rounded-xl border border-[#A88758]/25 bg-[#151412]/95 px-4 py-3 text-white shadow-xl backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#A88758]/20 text-[#C6A97B]">
                    <CloudOff className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-wide">Connected Workflows</p>
                    <p className="text-[11px] text-white/65">
                      Mobile-first · Offline-ready · Role-secured
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-[#A88758] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider">
                  Sri Lanka
                </span>
              </div>
            </div>

            {/* Right Editorial Copy */}
            <div className="pt-4 lg:col-span-7 lg:pl-6 lg:pt-0">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#A88758]">
                Executive Summary · Concept Platform
              </p>
              <h2 className="mt-3 font-editorial text-4xl font-semibold leading-[1.12] text-[#1C1B19] sm:text-5xl">
                Welcome to Connected Smart Hospitality in Sri Lanka
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-[#6E6A63]">
                <strong className="font-semibold text-[#1C1B19]">rooomy.lk</strong> goes beyond
                isolated booking tools. Designed specifically for Sri Lanka’s small and medium
                hotels, boutique villas, guesthouses, and residences, it weaves maintenance,
                utility monitoring, purchasing, digital dining, local experiences, and AI-assisted
                guest service into coordinated workflows—so a single guest report automatically
                links to a maintenance ticket, room readiness, and service recovery.
              </p>

              {/* 2x2 Bronze Checkmark Highlights matching screenshot */}
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    icon: Layers,
                    title: 'Zero Duplicate Data Entry',
                    desc: 'Complaints, maintenance, stock & QR folios share one permission-controlled record.',
                  },
                  {
                    icon: Shield,
                    title: 'Human Approval Gates',
                    desc: 'Costly repairs, purchase orders, refunds & sensitive AI replies require staff approval.',
                  },
                  {
                    icon: CheckCircle2,
                    title: 'Separated Multi-Property Ledgers',
                    desc: 'Owners compare every villa while caretakers see only their assigned property.',
                  },
                  {
                    icon: Sparkles,
                    title: 'Sinhala, Tamil & English Ready',
                    desc: 'Voice and text concierge tailored for Sri Lankan teams and international guests.',
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#A88758]/15 text-[#A88758]">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#1C1B19]">{item.title}</p>
                        <p className="mt-0.5 text-xs leading-relaxed text-[#6E6A63]">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Signature Rounded Bronze-to-Espresso CTA Bar matching screenshot #2 */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-[#2A231B] via-[#3A2E21] to-[#171513] p-3 pl-5 text-white shadow-lg">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onOpenPortal('overview')}
                    className="rounded-full bg-[#A88758] px-5 py-2.5 text-xs font-semibold tracking-wide text-white transition hover:bg-[#B99664] cursor-pointer"
                  >
                    Open Live HMS Portal
                  </button>
                  <span className="hidden text-xs text-white/75 sm:inline">
                    Test all 10 proposal features interactively
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenPortal('folio')}
                  aria-label="Jump to Live Portal"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#151412] transition hover:bg-[#DFC498] cursor-pointer"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Dark Luxury Ticker Strip (matches thin dark horizontal strip in screenshot) */}
      <div className="overflow-hidden border-y border-[#A88758]/25 bg-[#151412] py-3.5 text-white">
        <div className="animate-marquee flex items-center gap-8">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
            <div key={idx} className="flex items-center gap-8 whitespace-nowrap">
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/85">
                {item}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#A88758]" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
