import React, { useState } from 'react';
import {
  ArrowUp,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Cpu,
  CreditCard,
  Gauge,
  Globe2,
  MapPin,
  MessageCircle,
  Quote,
  Shield,
  Star,
} from 'lucide-react';
import {
  IMPLEMENTATION_PHASES,
  SUCCESS_MEASURES,
  TESTIMONIALS,
} from '../data/proposalData';
import { RooomyLogo } from './RooomyLogo';

const GALLERY_STRIP = [
  { src: '/images/hero-resort.jpg', label: 'Southern Coast Villas' },
  { src: '/images/welcome-reception.jpg', label: 'Smart Concierge Desk' },
  { src: '/images/villa-suite.jpg', label: 'Boutique Ocean Suites' },
  { src: '/images/dining-srilanka.jpg', label: 'Digital Menu Dining' },
  { src: '/images/experience-surf.jpg', label: 'Local Surf & Tours' },
  { src: '/images/operations-villa.jpg', label: 'Seamless Guest Arrival' },
];

const INTEGRATIONS = [
  { icon: CreditCard, name: 'Sri Lanka Payments', sub: 'PayHere · Cards · LKR' },
  { icon: Gauge, name: 'Smart Utility Meters', sub: 'Water & kWh Sensors' },
  { icon: MessageCircle, name: 'WhatsApp & SMS', sub: 'Pre-Arrival Concierge' },
  { icon: Globe2, name: 'Tourism Partners', sub: 'Verified Local Guides' },
  { icon: Cpu, name: 'Offline Edge Sync', sub: 'Encrypted Local Store' },
  { icon: Shield, name: 'RBAC & Audit', sub: 'Zero Record Mixing' },
];

export const TestimonialsRoadmapFooter: React.FC = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [roadmapTab, setRoadmapTab] = useState<'phases' | 'measures'>('phases');
  const [pilotEmail, setPilotEmail] = useState('');
  const [pilotSubmitted, setPilotSubmitted] = useState(false);

  const currentQuote = TESTIMONIALS[activeTestimonial];

  const handlePilotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pilotEmail.trim()) return;
    setPilotSubmitted(true);
    setPilotEmail('');
  };

  return (
    <>
      {/* Section 9: Dark Testimonials & 6-Image Gallery Strip (Exact Screenshot #9) */}
      <section className="relative overflow-hidden bg-[#0E1C16] py-20 text-white lg:py-28">
        <img
          src="/images/hero-resort.jpg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-15"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0E1C16]/90 via-[#0E1C16]/85 to-[#0E1C16]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            {/* Left Crisp White Testimonial Card matching screenshot */}
            <div className="rounded-3xl bg-white p-7 text-[#102019] shadow-2xl sm:p-9 lg:col-span-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-[#2D6A4F]">
                  {Array.from({ length: currentQuote.rating }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-[#2D6A4F]/35" />
              </div>

              <p className="mt-5 font-editorial text-2xl font-medium leading-relaxed text-[#102019]">
                “{currentQuote.quote}”
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-[#DCE9E1] pt-4">
                <div>
                  <p className="text-sm font-semibold text-[#102019]">{currentQuote.author}</p>
                  <p className="text-xs text-[#52695D]">{currentQuote.role}</p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#F4F8F5] px-3 py-1 text-[11px] font-medium text-[#1E4D38]">
                  <MapPin className="h-3 w-3" />
                  {currentQuote.location}
                </span>
              </div>
            </div>

            {/* Right Heading + Switcher */}
            <div className="lg:col-span-6 lg:pl-6">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#95D5B2]">
                Designed With Sri Lankan Hospitality Teams
              </p>
              <h2 className="mt-2 font-editorial text-4xl font-medium text-white sm:text-5xl">
                What Sri Lankan Hoteliers Say
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/75">
                From coastal boutique villas in Galle to misty hillside residences in Ella,
                rooomy.lk replaces scattered chats and paper ledgers with calm, measurable control.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                {TESTIMONIALS.map((t, idx) => (
                  <button
                    key={t.author}
                    type="button"
                    onClick={() => setActiveTestimonial(idx)}
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition cursor-pointer ${
                      idx === activeTestimonial
                        ? 'bg-[#2D6A4F] text-white'
                        : 'border border-white/20 bg-white/5 text-white/75 hover:bg-white/15'
                    }`}
                  >
                    {t.author.split(' ')[0]} · {t.location.split(',')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 6-Image Horizontal Property Showcase Strip directly beneath (matching screenshot #9 bottom) */}
          <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {GALLERY_STRIP.map((item) => (
              <div
                key={item.label}
                className="group relative overflow-hidden rounded-2xl border border-white/10"
              >
                <img
                  src={item.src}
                  alt={item.label}
                  className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <span className="absolute bottom-2.5 left-3 text-[11px] font-medium text-white/95">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 10: Phased Implementation Roadmap & Success Measures (Exact Screenshot #10 Editorial Split) */}
      <section id="roadmap" className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="font-editorial text-4xl font-semibold text-[#102019] sm:text-5xl">
                Phased Delivery & Success Measures
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setRoadmapTab('phases')}
                className={`rounded-full px-5 py-2 text-xs font-semibold transition cursor-pointer ${
                  roadmapTab === 'phases'
                    ? 'bg-[#2D6A4F] text-white'
                    : 'border border-[#C4D9CC] bg-[#F4F8F5] text-[#3A5045]'
                }`}
              >
                4 Implementation Phases
              </button>
              <button
                type="button"
                onClick={() => setRoadmapTab('measures')}
                className={`inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-xs font-semibold transition cursor-pointer ${
                  roadmapTab === 'measures'
                    ? 'bg-[#2D6A4F] text-white'
                    : 'border border-[#C4D9CC] bg-[#F4F8F5] text-[#3A5045]'
                }`}
              >
                <BarChart3 className="h-3.5 w-3.5" />
                Success Measures (KPIs)
              </button>
            </div>
          </div>

          <div className="mt-12 grid items-start gap-12 lg:grid-cols-12">
            {/* Left Clean Horizontal-Divided List (exact match to screenshot #10 left column) */}
            <div className="lg:col-span-6">
              {roadmapTab === 'phases' ? (
                <div className="divide-y divide-[#D4E3DA] border-y border-[#D4E3DA]">
                  {IMPLEMENTATION_PHASES.map((p) => (
                    <div key={p.phase} className="py-5 first:pt-4 last:pb-4">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-editorial text-2xl font-semibold text-[#102019]">
                          {p.title}
                        </h3>
                        <span className="shrink-0 rounded-full bg-[#F4F8F5] px-2.5 py-0.5 text-[10px] font-semibold text-[#445B50] border border-[#D4E3DA]">
                          Milestone
                        </span>
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-[#445B50]">{p.scope}</p>
                      <p className="mt-2 text-[11px] font-medium text-[#1E4D38]">
                        Why first: {p.reason}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="divide-y divide-[#D4E3DA] border-y border-[#D4E3DA]">
                  {SUCCESS_MEASURES.map((m) => (
                    <div
                      key={m.area}
                      className="flex flex-col justify-between gap-2 py-4 sm:flex-row sm:items-center"
                    >
                      <div>
                        <p className="font-editorial text-xl font-semibold text-[#102019]">
                          {m.area}
                        </p>
                        <p className="text-xs text-[#52695D]">{m.measure}</p>
                      </div>
                      <span className="w-fit shrink-0 rounded-full bg-[#2D6A4F]/15 px-3 py-1 text-[11px] font-semibold text-[#1E4D38]">
                        {m.target}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Warm Hospitality Arrival Photo (exact match to screenshot #10 right image) */}
            <div className="lg:col-span-6">
              <div className="overflow-hidden rounded-3xl shadow-2xl shadow-black/10">
                <img
                  src="/images/operations-villa.jpg"
                  alt="Guests arriving warmly at a Sri Lankan boutique hotel managed with rooomy.lk"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <div className="mt-5 rounded-2xl border border-[#D4E3DA] bg-[#F4F8F5] p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#2D6A4F]">
                  Proposal Guiding Principle · Section 8
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-[#3A5045]">
                  Build reliable core records, clear role-based permissions, privacy controls, and
                  human approval gates before introducing autonomous actions—evaluated by real
                  operational outcomes with hotel, villa, and guesthouse operators across Sri Lanka.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 11: Monochrome Integration & Ecosystem Trust Strip (Exact Screenshot #11) */}
      <section className="border-y border-[#D4E3DA] bg-[#E8F1EC] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {INTEGRATIONS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.name}
                  className="flex flex-col items-center justify-center text-center opacity-80 transition hover:opacity-100"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#C4D9CC] bg-white text-[#2A3F35]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-2.5 text-xs font-semibold text-[#102019]">{item.name}</p>
                  <p className="text-[10px] text-[#52695D]">{item.sub}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 12: Warm Bronze Pilot CTA Card + Deep Charcoal Footer (Exact Screenshot #12) */}
      <footer className="bg-[#0B1712] pt-14 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Warm Bronze Rounded Newsletter / Pilot Request Card */}
          <div id="pilot" className="rounded-3xl bg-[#2D6A4F] px-6 py-8 text-white shadow-2xl sm:px-10 lg:flex lg:items-center lg:justify-between lg:gap-8">
            <div className="max-w-lg">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80">
                Early Pilot Program · Sri Lanka Hospitality
              </p>
              <h3 className="mt-1 font-editorial text-3xl font-semibold text-white sm:text-4xl">
                Bring rooomy.lk to Your Hotel or Villa
              </h3>
              <p className="mt-1.5 text-xs text-white/90">
                Request a tailored requirements walkthrough for your hotel, villa, guesthouse, or
                multi-property portfolio.
              </p>
            </div>

            <div className="mt-6 w-full max-w-md lg:mt-0">
              {pilotSubmitted ? (
                <div className="flex items-center gap-2.5 rounded-2xl bg-[#0E1C16]/25 px-5 py-3.5 text-xs font-semibold text-white backdrop-blur-sm">
                  <CheckCircle2 className="h-5 w-5 text-white shrink-0" />
                  Thank you! Our Sri Lanka onboarding team will reach out shortly.
                </div>
              ) : (
                <form
                  onSubmit={handlePilotSubmit}
                  className="flex flex-col gap-2 rounded-2xl bg-white p-1.5 sm:flex-row sm:rounded-full"
                >
                  <input
                    type="email"
                    required
                    value={pilotEmail}
                    onChange={(e) => setPilotEmail(e.target.value)}
                    placeholder="Enter property email or WhatsApp contact..."
                    className="flex-1 rounded-full px-4 py-2.5 text-xs text-[#102019] placeholder:text-[#627A6E] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#102019] px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-[#1B382B] cursor-pointer"
                  >
                    Request Pilot <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* 4-Column Dark Luxury Footer */}
          <div className="mt-14 grid gap-10 border-b border-white/10 pb-12 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <RooomyLogo size="sm" showTagline />
              <p className="mt-3 text-xs leading-relaxed text-white/65">
                A mobile-first Smart Hospitality Management System connecting property operations,
                guest services, predictive maintenance, sustainability, offline sync, and trilingual
                AI workflows across Sri Lanka.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#74C69D]">
                Core Modules
              </p>
              <ul className="mt-3 space-y-2 text-xs text-white/70">
                <li>
                  <a href="#foundations" className="hover:text-white">
                    Role-Based Access & Audit
                  </a>
                </li>
                <li>
                  <a href="#experiences" className="hover:text-white">
                    Local Experience Marketplace
                  </a>
                </li>
                <li>
                  <a href="#roadmap" className="hover:text-white">
                    Phased Implementation
                  </a>
                </li>
                <li>
                  <a href="#team" className="hover:text-white">
                    Project Team
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#74C69D]">
                Built For Sri Lanka
              </p>
              <ul className="mt-3 space-y-2 text-xs text-white/70">
                <li>Small & Medium Hotels</li>
                <li>Boutique Coastal & Hill Villas</li>
                <li>Guesthouses & Residences</li>
                <li>Local Experience Operators</li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#74C69D]">
                Contact & Governance
              </p>
              <ul className="mt-3 space-y-2 text-xs text-white/70">
                <li>Colombo & Galle, Sri Lanka</li>
                <li>hello@rooomy.lk</li>
                <li>Role-Based Access & Audit History</li>
                <li>Human-Approved High-Impact Actions</li>
              </ul>
            </div>
          </div>

          {/* Bottom Brand Logo & Back-to-Top */}
          <div className="flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
            <p className="text-[11px] text-white/50">
              © {new Date().getFullYear()} rooomy.lk — Smart Hospitality Management System Proposal Platform.
            </p>
            <RooomyLogo size="sm" />
            <a
              href="#top"
              aria-label="Back to top"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2D6A4F] text-white transition hover:bg-[#1E4D38]"
            >
              <ArrowUp className="h-4 w-4" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};
