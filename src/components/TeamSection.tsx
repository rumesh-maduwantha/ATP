import React from 'react';
import { Sparkles } from 'lucide-react';
import { TEAM_MEMBERS } from '../data/proposalData';

export const TeamSection: React.FC = () => {
  return (
    <section id="team" className="bg-[#F4F8F5] py-20 lg:py-28 border-t border-[#D4E3DA]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header matching luxury editorial styling */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#2D6A4F]/30 bg-white px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1E4D38]">
              <Sparkles className="h-3.5 w-3.5 text-[#2D6A4F]" />
              Project Team · 05 Builders
            </div>
            <h2 className="mt-3 font-editorial text-4xl font-semibold text-[#102019] sm:text-5xl">
              Meet Our Team Behind rooomy.lk
            </h2>
          </div>
          <span className="w-fit rounded-full bg-[#102019] px-4 py-2 text-xs font-semibold text-[#95D5B2]">
            Sri Lanka · Smart HMS Team
          </span>
        </div>

        {/* 5 Clean Luxury Team Member Cards */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {TEAM_MEMBERS.map((member) => (
            <article
              key={member.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[#D4E3DA] bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-[#2D6A4F] hover:shadow-xl hover:shadow-[#2D6A4F]/10"
            >
              {/* Portrait Photo */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#102019]">
                <img
                  src={member.image}
                  alt={`${member.fullName} — ${member.role}`}
                  className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1C16]/45 via-transparent to-black/15" />

                {/* Member Number Badge */}
                <span className="absolute right-3 top-3 rounded-full border border-white/25 bg-[#0E1C16]/70 px-2.5 py-0.5 font-editorial text-sm font-semibold text-[#95D5B2] backdrop-blur-md">
                  {member.number}
                </span>
              </div>

              {/* Clean Minimal Card Body: Label, Role & Member Name */}
              <div className="px-5 py-5">
                <h3 className="font-editorial text-2xl font-semibold leading-tight text-[#102019]">
                  {member.name}
                </h3>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#2D6A4F]">
                  {member.role}
                </p>
                <p className="mt-2.5 border-t border-[#DCE9E1] pt-2.5 text-sm font-medium text-[#1C3127]">
                  {member.fullName}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
