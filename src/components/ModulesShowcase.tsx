import React, { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { PROPOSAL_MODULES, WorkspaceTabId } from '../data/proposalData';

interface ModulesShowcaseProps {
  onOpenPortal: (tab: WorkspaceTabId) => void;
}

export const ModulesShowcase: React.FC<ModulesShowcaseProps> = ({ onOpenPortal }) => {
  const [filter, setFilter] = useState<'All' | 'Operations' | 'Guest Experience' | 'Intelligence'>('All');
  const scrollRef = useRef<HTMLDivElement>(null);

  const filtered =
    filter === 'All'
      ? PROPOSAL_MODULES
      : PROPOSAL_MODULES.filter((m) => m.category === filter);

  const scrollByCards = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const offset = direction === 'left' ? -360 : 360;
    scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <section id="modules" className="relative overflow-hidden bg-[#161513] py-20 text-white lg:py-28">
      {/* Atmospheric dark backdrop matching screenshot Section 4 */}
      <img
        src="/images/hero-resort.jpg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#151412]/90 via-[#151412]/75 to-[#151412]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Bar with Square White & Bronze Prev/Next Controls (exact screenshot signature) */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#C6A97B]">
              Proposed System Features · 3.1 to 3.10
            </p>
            <h2 className="mt-2 font-editorial text-4xl font-medium text-white sm:text-5xl">
              Our Signature Smart Modules
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Ten deeply integrated hospitality modules engineered to cut manual work, prevent
              avoidable downtime, and elevate guest transparency across Sri Lanka.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 rounded-full border border-white/15 bg-white/5 p-1 backdrop-blur-sm">
              {(['All', 'Operations', 'Guest Experience', 'Intelligence'] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilter(cat)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition cursor-pointer ${
                    filter === cat
                      ? 'bg-[#A88758] text-white'
                      : 'text-white/75 hover:text-white'
                  }`}
                >
                  {cat === 'All' ? 'All 10' : cat}
                </button>
              ))}
            </div>

            {/* Exact Screenshot Square White & Bronze Nav Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollByCards('left')}
                aria-label="Scroll modules left"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[#151412] transition hover:bg-[#F2EDE4] cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollByCards('right')}
                aria-label="Scroll modules right"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#A88758] text-white transition hover:bg-[#937345] cursor-pointer"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Card Deck (matching screenshot room showcase cards: photo top, crisp white bottom, dark footer CTA) */}
        <div
          ref={scrollRef}
          className="luxury-scroll mt-10 flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory"
        >
          {filtered.map((mod) => (
            <article
              key={mod.id}
              className="group flex w-[310px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-white/10 bg-white text-[#1C1B19] shadow-2xl transition hover:-translate-y-1 sm:w-[340px]"
            >
              {/* Card Image Top */}
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={mod.image}
                  alt={mod.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20" />
                <span className="absolute left-3.5 top-3.5 rounded-md bg-[#A88758] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow">
                  {mod.badge}
                </span>
                <span className="absolute right-3.5 top-3.5 font-editorial text-2xl font-semibold text-white/90">
                  {mod.number}
                </span>
              </div>

              {/* Crisp White Editorial Body */}
              <div className="flex flex-1 flex-col p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A88758]">
                  {mod.category}
                </p>
                <h3 className="mt-1 font-editorial text-2xl font-semibold leading-snug text-[#1C1B19]">
                  {mod.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#6E6A63]">{mod.purpose}</p>

                <ul className="mt-4 space-y-1.5 border-t border-[#EFEAE1] pt-3">
                  {mod.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-[11px] text-[#3E3B36]">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#A88758]" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 rounded-xl bg-[#FAF8F5] p-3 text-[11px] text-[#5B564E]">
                  <span className="font-semibold text-[#A88758]">KPI Measure: </span>
                  {mod.measures}
                </div>
              </div>

              {/* Dark Charcoal Card Footer matching screenshot */}
              <button
                type="button"
                onClick={() => onOpenPortal(mod.workspaceTab)}
                className="flex items-center justify-between bg-[#181715] px-5 py-3.5 text-xs font-semibold tracking-wide text-white transition hover:bg-[#A88758] cursor-pointer"
              >
                <span>Try {mod.shortTitle} Live</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
