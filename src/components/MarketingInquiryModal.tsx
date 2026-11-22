import React, { useEffect, useState } from 'react';
import {
  Building2,
  Check,
  CheckCircle2,
  Copy,
  Mail,
  MapPin,
  Phone,
  Send,
  Sparkles,
  User,
  X,
} from 'lucide-react';
import { RooomyLogo } from './RooomyLogo';

interface MarketingInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientEmail?: string;
}

const INTEREST_OPTIONS = [
  'Multi-Property Control',
  'QR Guest Folio & Digital Menu',
  'Predictive Maintenance & Utilities',
  'Trilingual AI Assistant (EN/SI/TA)',
  'Offline-First Caretaker Sync',
  'Local Experience Marketplace',
];

export const MarketingInquiryModal: React.FC<MarketingInquiryModalProps> = ({
  isOpen,
  onClose,
  recipientEmail = 'hello@rooomy.lk',
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [propertyName, setPropertyName] = useState('');
  const [propertyType, setPropertyType] = useState('Boutique Hotel');
  const [location, setLocation] = useState('');
  const [roomCount, setRoomCount] = useState('6–15 Rooms');
  const [interests, setInterests] = useState<string[]>([
    'Multi-Property Control',
    'QR Guest Folio & Digital Menu',
  ]);
  const [notes, setNotes] = useState('');
  const [marketingConsent, setMarketingConsent] = useState(true);
  const [submittedMailto, setSubmittedMailto] = useState<string | null>(null);
  const [submittedSummary, setSubmittedSummary] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleInterest = (item: string) => {
    setInterests((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = `rooomy.lk Marketing Inquiry — ${propertyName.trim() || fullName.trim()}`;
    const bodyLines = [
      'New Customer & Marketing Inquiry (rooomy.lk)',
      '============================================',
      `Full Name: ${fullName.trim()}`,
      `Email Address: ${email.trim()}`,
      `Phone / WhatsApp: ${phone.trim()}`,
      `Property Name: ${propertyName.trim() || 'Not specified'}`,
      `Property Type: ${propertyType}`,
      `Location / City: ${location.trim() || 'Sri Lanka'}`,
      `Room Count: ${roomCount}`,
      `Interested Features: ${interests.length > 0 ? interests.join(', ') : 'General Platform Overview'}`,
      `Marketing Updates Opt-In: ${marketingConsent ? 'Yes — opted in for updates & offers' : 'No'}`,
      '',
      'Additional Notes:',
      notes.trim() || 'None',
    ];

    const plainBody = bodyLines.join('\n');
    const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(plainBody)}`;

    setSubmittedSummary(plainBody);
    setSubmittedMailto(mailtoUrl);
    setCopied(false);

    // Open user's default email client with pre-filled details
    window.location.href = mailtoUrl;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(submittedSummary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Ignore clipboard permission errors
    }
  };

  const handleReset = () => {
    setSubmittedMailto(null);
    setFullName('');
    setEmail('');
    setPhone('');
    setPropertyName('');
    setLocation('');
    setNotes('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1712]/75 p-4 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="marketing-modal-title"
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-[#74C69D]/30 bg-white text-[#102019] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Forest Green Header */}
        <div className="relative bg-gradient-to-r from-[#0E1C16] via-[#173326] to-[#2D6A4F] px-6 py-5 text-white sm:px-8">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close customer inquiry form"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-3">
            <RooomyLogo size="sm" />
            <span className="hidden rounded-full border border-[#95D5B2]/35 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B7E4C7] sm:inline-flex items-center gap-1.5">
              <Sparkles className="h-3 w-3" /> Marketing & Pilot Registration
            </span>
          </div>

          <h2
            id="marketing-modal-title"
            className="mt-3 font-editorial text-3xl font-semibold text-white sm:text-4xl"
          >
            Connect With rooomy.lk
          </h2>
          <p className="mt-1 text-xs text-white/80 sm:text-sm">
            Share your property & contact details to receive exclusive pilot offers, product
            updates, and a tailored hospitality demo via email.
          </p>
        </div>

        {/* Scrollable Body */}
        <div className="luxury-scroll overflow-y-auto px-6 py-6 sm:px-8">
          {submittedMailto ? (
            <div className="space-y-5 py-2">
              <div className="rounded-2xl border border-[#2D6A4F]/30 bg-[#F4F8F5] p-5">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-[#2D6A4F]" />
                  <div>
                    <h3 className="font-editorial text-2xl font-semibold text-[#102019]">
                      Email Draft Ready to Send!
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-[#445B50]">
                      Your default email app was triggered with all your customer details addressed
                      to <strong className="text-[#102019]">{recipientEmail}</strong>. If your mail
                      app didn’t open automatically, click the button below or copy your details.
                    </p>
                  </div>
                </div>
              </div>

              <pre className="luxury-scroll max-h-48 overflow-auto rounded-2xl border border-[#D4E3DA] bg-[#F4F8F5] p-4 font-sans text-xs leading-relaxed text-[#2A3F35] whitespace-pre-wrap">
                {submittedSummary}
              </pre>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-full border border-[#C4D9CC] px-4 py-2.5 text-xs font-semibold text-[#3A5045] hover:bg-[#F4F8F5] cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#2D6A4F] px-4 py-2.5 text-xs font-semibold text-[#2D6A4F] transition hover:bg-[#F4F8F5] cursor-pointer"
                  >
                    {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? 'Copied!' : 'Copy Details'}
                  </button>
                  <a
                    href={submittedMailto}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#2D6A4F] px-5 py-2.5 text-xs font-semibold text-white shadow transition hover:bg-[#1E4D38]"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    Open Email App
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: Full Name + Email */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold text-[#2A3F35]">
                    Full Name <span className="text-[#2D6A4F]">*</span>
                  </label>
                  <div className="relative mt-1">
                    <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#52695D]" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Dinesh Perera"
                      className="w-full rounded-xl border border-[#C4D9CC] bg-[#F4F8F5]/60 py-2.5 pl-9 pr-3.5 text-xs text-[#102019] focus:border-[#2D6A4F] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#2A3F35]">
                    Email Address <span className="text-[#2D6A4F]">*</span>
                  </label>
                  <div className="relative mt-1">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#52695D]" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="owner@yourvilla.lk"
                      className="w-full rounded-xl border border-[#C4D9CC] bg-[#F4F8F5]/60 py-2.5 pl-9 pr-3.5 text-xs text-[#102019] focus:border-[#2D6A4F] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Phone/WhatsApp + Property Name */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold text-[#2A3F35]">
                    Phone / WhatsApp <span className="text-[#2D6A4F]">*</span>
                  </label>
                  <div className="relative mt-1">
                    <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#52695D]" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+94 77 123 4567"
                      className="w-full rounded-xl border border-[#C4D9CC] bg-[#F4F8F5]/60 py-2.5 pl-9 pr-3.5 text-xs text-[#102019] focus:border-[#2D6A4F] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#2A3F35]">Property / Hotel Name</label>
                  <div className="relative mt-1">
                    <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#52695D]" />
                    <input
                      type="text"
                      value={propertyName}
                      onChange={(e) => setPropertyName(e.target.value)}
                      placeholder="e.g. Cinnamon Cliff Villa"
                      className="w-full rounded-xl border border-[#C4D9CC] bg-[#F4F8F5]/60 py-2.5 pl-9 pr-3.5 text-xs text-[#102019] focus:border-[#2D6A4F] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Property Type + Location + Room Count */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="text-xs font-semibold text-[#2A3F35]">Property Type</label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-[#C4D9CC] bg-[#F4F8F5]/60 px-3 py-2.5 text-xs text-[#102019] focus:border-[#2D6A4F] focus:bg-white focus:outline-none"
                  >
                    <option>Boutique Hotel</option>
                    <option>Villa</option>
                    <option>Guesthouse</option>
                    <option>Residence / Homestay</option>
                    <option>Multi-Property Group</option>
                    <option>Local Experience Partner</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#2A3F35]">Location / City</label>
                  <div className="relative mt-1">
                    <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#52695D]" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Galle, Ella, Kandy..."
                      className="w-full rounded-xl border border-[#C4D9CC] bg-[#F4F8F5]/60 py-2.5 pl-9 pr-3 text-xs text-[#102019] focus:border-[#2D6A4F] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#2A3F35]">Room Count</label>
                  <select
                    value={roomCount}
                    onChange={(e) => setRoomCount(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-[#C4D9CC] bg-[#F4F8F5]/60 px-3 py-2.5 text-xs text-[#102019] focus:border-[#2D6A4F] focus:bg-white focus:outline-none"
                  >
                    <option>1–5 Rooms</option>
                    <option>6–15 Rooms</option>
                    <option>16–40 Rooms</option>
                    <option>40+ Rooms</option>
                  </select>
                </div>
              </div>

              {/* Feature Interests Pills */}
              <div>
                <label className="text-xs font-semibold text-[#2A3F35]">
                  Features You Are Interested In
                </label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {INTEREST_OPTIONS.map((item) => {
                    const selected = interests.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleInterest(item)}
                        className={`rounded-full px-3 py-1.5 text-[11px] font-medium transition cursor-pointer ${
                          selected
                            ? 'bg-[#2D6A4F] text-white shadow-xs'
                            : 'border border-[#C4D9CC] bg-[#F4F8F5] text-[#3A5045] hover:border-[#2D6A4F]'
                        }`}
                      >
                        {selected ? '✓ ' : '+ '}
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="text-xs font-semibold text-[#2A3F35]">
                  Additional Notes or Requirements (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell us about your daily operational challenges or pilot timeline..."
                  className="mt-1 w-full rounded-xl border border-[#C4D9CC] bg-[#F4F8F5]/60 px-3.5 py-2.5 text-xs text-[#102019] focus:border-[#2D6A4F] focus:bg-white focus:outline-none"
                />
              </div>

              {/* Marketing Consent Checkbox */}
              <label className="flex items-start gap-2.5 rounded-xl border border-[#D4E3DA] bg-[#F4F8F5] p-3 text-xs text-[#3A5045] cursor-pointer">
                <input
                  type="checkbox"
                  checked={marketingConsent}
                  onChange={(e) => setMarketingConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded accent-[#2D6A4F]"
                />
                <span>
                  I agree to share my details with <strong>rooomy.lk</strong> to receive product
                  updates, pilot invitations, and Sri Lanka hospitality marketing offers.
                </span>
              </label>

              {/* Footer Submit Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#DCE9E1] pt-4">
                <p className="text-[11px] text-[#52695D]">
                  Sends directly via email to{' '}
                  <strong className="text-[#102019]">{recipientEmail}</strong>
                </p>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-full border border-[#C4D9CC] px-5 py-2.5 text-xs font-semibold text-[#3A5045] hover:bg-[#F4F8F5] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full bg-[#2D6A4F] px-6 py-2.5 text-xs font-semibold text-white shadow-lg shadow-[#2D6A4F]/25 transition hover:bg-[#1E4D38] cursor-pointer"
                  >
                    <Send className="h-3.5 w-3.5" />
                    Send via Email
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
