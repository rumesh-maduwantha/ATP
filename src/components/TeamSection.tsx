import React from 'react';
import { Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import { TEAM_MEMBERS } from '../data/proposalData';

export const TeamSection: React.FC = () => {
  return (
    <section id="team" className="bg-[#FAF8F5] py-20 lg:py-28 border-t border-[#EAE2D6]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header matching luxury editorial styling */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#A88758]/30 bg-white px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8C6E43]">
              <Sparkles className="h-3.5 w-3.5 text-[#A88758]" />
              Project Team · 05 Builders
            </div>
            <h2 className="mt-3 font-editorial text-4xl font-semibold text-[#1C1B19] sm:text-5xl">
              Meet Our Team Behind rooomy.lk
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-[#6E6A63]">
              The five-member team engineering Sri Lanka’s connected smart hospitality platform—from
              predictive maintenance and offline-first sync to trilingual AI concierge workflows.
            </p>
          </div>
          <span className="w-fit rounded-full bg-[#181715] px-4 py-2 text-xs font-semibold text-[#DFC498]">
            Sri Lanka · Smart HMS Team
          </span>
        </div>

        {/* 5 Team Member Luxury Cards */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {TEAM_MEMBERS.map((member) => (
            <article
              key={member.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[#E6DEC9] bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-[#A88758] hover:shadow-xl hover:shadow-[#A88758]/10"
            >
              {/* Portrait Photo */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#1C1B19]">
                <img
                  src={member.image}
                  alt={`${member.name} — ${member.role}`}
                  className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151412]/80 via-transparent to-black/15" />

                {/* Member Number Badge */}
                <span className="absolute right-3 top-3 rounded-full border border-white/25 bg-[#151412]/70 px-2.5 py-0.5 font-editorial text-sm font-semibold text-[#DFC498] backdrop-blur-md">
                  {member.number}
                </span>

                {/* Bottom Module Focus Pill */}
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="inline-block rounded-full bg-[#A88758] px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white shadow">
                    {member.focusModule}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                  <h3 className="font-editorial text-2xl font-semibold leading-tight text-[#1C1B19]">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#A88758]">
                    {member.role}
                  </p>
                  <p className="mt-2.5 text-xs leading-relaxed text-[#6E6A63]">{member.bio}</p>
                </div>

                {/* Social / Contact Bar */}
                <div className="mt-4 flex items-center gap-2 border-t border-[#EFEAE1] pt-3">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member.name} LinkedIn`}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E6DEC9] bg-[#FAF8F5] text-[#3E3B36] transition hover:border-[#A88758] hover:bg-[#A88758] hover:text-white"
                  >
                    <Linkedin className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member.name} GitHub`}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E6DEC9] bg-[#FAF8F5] text-[#3E3B36] transition hover:border-[#A88758] hover:bg-[#A88758] hover:text-white"
                  >
                    <Github className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href={member.email}
                    aria-label={`Email ${member.name}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E6DEC9] bg-[#FAF8F5] text-[#3E3B36] transition hover:border-[#A88758] hover:bg-[#A88758] hover:text-white"
                  >
                    <Mail className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
