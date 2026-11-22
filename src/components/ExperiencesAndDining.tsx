import React, { useState } from 'react';
import {
  ArrowUpRight,
  BadgeCheck,
  Calendar,
  Clock,
  MapPin,
  QrCode,
  ShieldCheck,
  UtensilsCrossed,
  X,
} from 'lucide-react';
import {
  DIGITAL_MENU_ITEMS,
  ExperienceItem,
  LOCAL_EXPERIENCES,
} from '../data/proposalData';

export const ExperiencesAndDining: React.FC = () => {
  const [activeExpIdx, setActiveExpIdx] = useState(2); // Center card expanded by default — matching screenshot!
  const [activeDishIdx, setActiveDishIdx] = useState(0);
  const [bookingExp, setBookingExp] = useState<ExperienceItem | null>(null);
  const featuredDishes = DIGITAL_MENU_ITEMS.slice(0, 4);
  const activeDish = featuredDishes[activeDishIdx] || featuredDishes[0];
  const [guestName, setGuestName] = useState('');
  const [guestRoom, setGuestRoom] = useState('Ocean Suite 04');
  const [guestCount, setGuestCount] = useState(2);
  const [bookingConfirmed, setBookingConfirmed] = useState<string | null>(null);

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingExp) return;
    setBookingConfirmed(
      `Booking request sent to ${bookingExp.provider} for ${guestCount} guest(s) in ${guestRoom}. Confirmation & LKR ${(
        bookingExp.priceLkr * guestCount
      ).toLocaleString()} summary logged to guest stay.`
    );
  };

  return (
    <>
      {/* Section 7: Local Experience Marketplace — Exact Screenshot 5-Column Expanding Cards */}
      <section id="experiences" className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#2D6A4F]">
              Local Experience Marketplace · Section 3.3
            </p>
            <h2 className="mt-2 font-editorial text-4xl font-semibold text-[#102019] sm:text-5xl">
              Explore Verified Sri Lankan Experiences
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#52695D]">
              Guests discover and book vetted local guides, surf lessons, cooking classes, and
              private transfers directly through your property—complete with safety verification,
              cancellation rules, and commission tracking.
            </p>
          </div>

          {/* 5-Column Expanding Gallery (Exact visual signature from screenshot Section 7) */}
          <div className="mt-12 flex flex-col gap-3 lg:h-[470px] lg:flex-row">
            {LOCAL_EXPERIENCES.map((exp, idx) => {
              const isExpanded = idx === activeExpIdx;
              return (
                <div
                  key={exp.id}
                  onMouseEnter={() => setActiveExpIdx(idx)}
                  onClick={() => setActiveExpIdx(idx)}
                  className={`relative overflow-hidden rounded-2xl bg-[#102019] transition-all duration-500 cursor-pointer ${
                    isExpanded
                      ? 'min-h-[380px] lg:flex-[2.6]'
                      : 'min-h-[120px] lg:flex-[0.85] hover:opacity-95'
                  }`}
                >
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className={`absolute inset-0 h-full w-full object-cover transition duration-700 ${
                      isExpanded ? 'scale-105 opacity-95' : 'scale-100 opacity-65'
                    }`}
                  />
                  <div
                    className={`absolute inset-0 transition ${
                      isExpanded
                        ? 'bg-gradient-to-t from-black/75 via-black/25 to-black/20'
                        : 'bg-gradient-to-t from-[#0E1C16]/95 via-[#0E1C16]/65 to-[#0E1C16]/40'
                    }`}
                  />

                  {/* Collapsed Vertical Spine Label (matching screenshot side cards) */}
                  {!isExpanded && (
                    <div className="relative z-10 flex h-full flex-col justify-between p-5 text-white">
                      <span className="inline-flex w-fit rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-sm">
                        0{idx + 1}
                      </span>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#95D5B2]">
                          {exp.category}
                        </p>
                        <h3 className="mt-1 font-editorial text-xl font-medium leading-snug text-white">
                          {exp.title}
                        </h3>
                        <p className="mt-1 text-xs text-white/75">
                          LKR {exp.priceLkr.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Expanded Center Card with Crisp White Bottom Overlay (exact screenshot match) */}
                  {isExpanded && (
                    <div className="relative z-10 flex h-full flex-col justify-between p-5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0E1C16]/80 px-3 py-1 text-[11px] font-semibold text-[#95D5B2] backdrop-blur-md">
                          <BadgeCheck className="h-3.5 w-3.5 text-emerald-400" />
                          Verified Partner · {exp.commissionPct}% Property Commission
                        </span>
                        <span className="rounded-full bg-[#2D6A4F] px-3 py-1 text-xs font-semibold text-white">
                          LKR {exp.priceLkr.toLocaleString()} (${exp.priceUsd})
                        </span>
                      </div>

                      <div className="rounded-2xl bg-white/95 p-5 text-[#102019] shadow-2xl backdrop-blur-md">
                        <div className="flex flex-wrap items-center gap-3 text-[11px] font-medium text-[#52695D]">
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5 text-[#2D6A4F]" />
                            {exp.location}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-[#2D6A4F]" />
                            {exp.duration}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5 text-[#2D6A4F]" />
                            {exp.availability}
                          </span>
                        </div>

                        <h3 className="mt-2 font-editorial text-2xl font-semibold text-[#102019]">
                          {exp.title}
                        </h3>
                        <p className="mt-1.5 text-xs leading-relaxed text-[#445B50]">
                          {exp.description}
                        </p>

                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#DCE9E1] pt-3">
                          <div className="text-[11px] text-[#52695D]">
                            <span className="font-semibold text-[#102019]">{exp.provider}</span> ·{' '}
                            {exp.cancellation}
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setBookingConfirmed(null);
                              setBookingExp(exp);
                            }}
                            className="inline-flex items-center gap-1.5 rounded-full bg-[#102019] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#2D6A4F] cursor-pointer"
                          >
                            Request Booking
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 8: Warm Bronze & Gourmet Dining Split (Exact screenshot Section 8) */}
      <section className="bg-[#F4F8F5] py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Left Warm Bronze Highlight Panel with 4 Dish Thumbnails */}
            <div className="flex flex-col justify-between rounded-3xl bg-[#2D6A4F] p-8 text-white shadow-xl lg:col-span-5 lg:p-10">
              <div>
                <h2 className="font-editorial text-4xl font-semibold leading-tight text-white">
                  Signature Digital Menu & QR Folio
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-white/90">
                  Guests scan their authenticated room QR code to browse multilingual menus with
                  accurate dietary & allergen info, track kitchen status in real time, and review
                  their exact itemised charges & remaining balance.
                </p>

                {/* 4 Unique Culinary Thumbnail Strip */}
                <div className="mt-6 grid grid-cols-4 gap-2.5">
                  {featuredDishes.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveDishIdx(idx)}
                      title={item.name}
                      className={`group overflow-hidden rounded-xl border bg-black/20 transition cursor-pointer ${
                        idx === activeDishIdx
                          ? 'border-white ring-2 ring-white/80 scale-[1.03]'
                          : 'border-white/30 opacity-85 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="aspect-square w-full object-cover transition duration-300 group-hover:scale-110"
                      />
                    </button>
                  ))}
                </div>

                <div className="mt-6 space-y-2 text-xs text-white/90">
                  <div className="flex items-center gap-2">
                    <UtensilsCrossed className="h-4 w-4 text-white/85" />
                    <span>Instant kitchen routing + live sold-out & price updates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <QrCode className="h-4 w-4 text-white/85" />
                    <span>Expiring, revocable room QR protecting guest financial privacy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-white/85" />
                    <span>Clear split of Deposit, Spending Limit, Paid & Disputed Queries</span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href="#pilot"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-semibold tracking-wide text-[#0E1C16] shadow transition hover:bg-[#0E1C16] hover:text-white"
                >
                  Request Digital Menu Demo
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Right Full-Bleed Gourmet Sri Lankan Photography */}
            <div className="relative overflow-hidden rounded-3xl shadow-xl lg:col-span-7">
              <img
                src={activeDish.image}
                alt={activeDish.name}
                className="h-full min-h-[360px] w-full object-cover transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/15 bg-[#0E1C16]/80 px-5 py-4 text-white backdrop-blur-md">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#95D5B2]">
                    Live Room 04 Digital Order Example
                  </p>
                  <p className="font-editorial text-xl font-medium">
                    {activeDish.name} · LKR {activeDish.priceLkr.toLocaleString()}
                  </p>
                  <p className="text-[11px] text-white/75">
                    Dietary: {activeDish.dietary.join(', ')} · Allergens:{' '}
                    {activeDish.allergens.join(', ')} · Auto-posts to QR Folio
                  </p>
                </div>
                <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-400/30">
                  Kitchen Synced
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal for Local Experience Marketplace */}
      {bookingExp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="relative h-40 w-full">
              <img
                src={bookingExp.image}
                alt={bookingExp.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <button
                type="button"
                onClick={() => setBookingExp(null)}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-white hover:bg-black cursor-pointer"
                aria-label="Close booking dialog"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="absolute bottom-4 left-5 text-white">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#95D5B2]">
                  Verified Local Partner · {bookingExp.provider}
                </p>
                <h3 className="font-editorial text-2xl font-semibold">{bookingExp.title}</h3>
              </div>
            </div>

            <div className="p-6">
              {bookingConfirmed ? (
                <div className="space-y-4">
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
                    <p className="font-semibold">Experience Request Confirmed</p>
                    <p className="mt-1 text-xs leading-relaxed">{bookingConfirmed}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setBookingExp(null)}
                      className="rounded-full bg-[#102019] px-5 py-2.5 text-xs font-semibold text-white cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleBookSubmit} className="space-y-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-semibold text-[#2A3F35]">Guest Name</label>
                      <input
                        type="text"
                        required
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="e.g. Elena Lindqvist"
                        className="mt-1 w-full rounded-xl border border-[#C4D9CC] px-3.5 py-2.5 text-sm focus:border-[#2D6A4F] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#2A3F35]">Room / Villa</label>
                      <input
                        type="text"
                        required
                        value={guestRoom}
                        onChange={(e) => setGuestRoom(e.target.value)}
                        className="mt-1 w-full rounded-xl border border-[#C4D9CC] px-3.5 py-2.5 text-sm focus:border-[#2D6A4F] focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-[#F4F8F5] p-3.5 text-xs">
                    <div>
                      <p className="font-semibold text-[#102019]">Guests</p>
                      <p className="text-[#52695D]">{bookingExp.cancellation}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setGuestCount((c) => Math.max(1, c - 1))}
                        className="h-8 w-8 rounded-full border border-[#C4D9CC] bg-white font-bold cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-6 text-center font-semibold">{guestCount}</span>
                      <button
                        type="button"
                        onClick={() => setGuestCount((c) => c + 1)}
                        className="h-8 w-8 rounded-full border border-[#C4D9CC] bg-white font-bold cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-[#DCE9E1] pt-3">
                    <div>
                      <p className="text-[11px] text-[#52695D]">Estimated Total (incl. tracking)</p>
                      <p className="font-editorial text-2xl font-semibold text-[#102019]">
                        LKR {(bookingExp.priceLkr * guestCount).toLocaleString()}
                      </p>
                    </div>
                    <button
                      type="submit"
                      className="rounded-full bg-[#2D6A4F] px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-[#1E4D38] cursor-pointer"
                    >
                      Confirm Request
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
