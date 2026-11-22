import React, { useState } from 'react';
import {
  CheckCircle2,
  ClipboardList,
  CloudOff,
  Globe,
  Lock,
  ShieldCheck,
  UserCheck,
  Users,
} from 'lucide-react';
import { CROSS_CUTTING_PILLARS } from '../data/proposalData';

const PILLAR_ICONS = [Users, ClipboardList, Lock, UserCheck, CloudOff, Globe];

export const AmenitiesPillars: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = CROSS_CUTTING_PILLARS[activeIdx];

  return (
    <section className="bg-[#FAF8F5] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Exact screenshot Section 5 layout: 3x2 alternating white/bronze icon tiles on left, editorial detail on right */}
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left 3x2 Checkerboard Grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:col-span-6">
            {CROSS_CUTTING_PILLARS.map((pillar, idx) => {
              const Icon = PILLAR_ICONS[idx] || ShieldCheck;
              const isSelected = idx === activeIdx;
              const isBronze = pillar.accent;

              return (
                <button
                  key={pillar.id}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`group flex aspect-square flex-col items-center justify-center rounded-2xl p-5 text-center transition duration-300 cursor-pointer ${
                    isSelected
                      ? 'ring-2 ring-[#1C1B19] ring-offset-2 ring-offset-[#FAF8F5] scale-[1.02]'
                      : 'hover:-translate-y-1'
                  } ${
                    isBronze
                      ? 'bg-[#A88758] text-white shadow-lg shadow-[#A88758]/20'
                      : 'border border-[#E7E0D4] bg-white text-[#1C1B19] shadow-sm'
                  }`}
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl transition ${
                      isBronze
                        ? 'bg-white/15 text-white'
                        : 'bg-[#FAF8F5] text-[#A88758] group-hover:bg-[#A88758]/15'
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="mt-3.5 text-xs font-semibold tracking-wide sm:text-sm">
                    {pillar.short}
                  </p>
                  <span
                    className={`mt-1 text-[10px] uppercase tracking-[0.18em] ${
                      isBronze ? 'text-white/75' : 'text-[#8C6E43]'
                    }`}
                  >
                    0{idx + 1} · Pillar
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Editorial Detail Panel */}
          <div className="lg:col-span-6 lg:pl-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#A88758]">
              Cross-Cutting Foundations · Section 6
            </p>
            <h2 className="mt-2 font-editorial text-4xl font-semibold leading-tight text-[#1C1B19] sm:text-5xl">
              Architecture & Trust Built for Hospitality
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#6E6A63]">
              Select any capability tile to explore how <strong className="text-[#1C1B19]">rooomy.lk</strong>{' '}
              protects guest privacy, enforces human approval, and stays reliable in real Sri Lankan
              operating conditions.
            </p>

            {/* Dynamic Detail Card */}
            <div className="mt-7 rounded-2xl border border-[#E7E0D4] bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-[#A88758]/15 px-3 py-1 text-[11px] font-semibold text-[#8C6E43]">
                  Foundation 0{activeIdx + 1} of 06
                </span>
                <span className="text-[11px] font-medium text-[#6E6A63]">
                  Mandatory Core Requirement
                </span>
              </div>
              <h3 className="mt-3 font-editorial text-3xl font-semibold text-[#1C1B19]">
                {active.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5E5A53]">{active.description}</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                {active.highlights.map((h) => (
                  <div
                    key={h}
                    className="flex items-start gap-2 rounded-xl bg-[#FAF8F5] p-3 text-xs text-[#2E2C28]"
                  >
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#A88758]" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Users Strip (Proposal Section 2) */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-[#6E6A63]">
                Built For:
              </span>
              {[
                'Villa & Hotel Owners',
                'Caretakers & Reception',
                'Housekeeping & Maintenance',
                'In-House Guests',
                'Local Experience Partners',
              ].map((role) => (
                <span
                  key={role}
                  className="rounded-full border border-[#DFD6C7] bg-white px-3 py-1 text-xs font-medium text-[#3E3B36]"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
