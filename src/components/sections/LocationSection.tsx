import React, { useState } from 'react';
import { MapPin, Phone, Clock, MessageSquare, Instagram, ExternalLink, Send, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

/**
 * ============================================================================
 * EDITABLE GYM LOCATION & CONTACT CONSTANTS
 * ============================================================================
 * Centralized place for the gym owner to update their real address,
 * phone number, WhatsApp link, Instagram handle, and opening hours.
 */
export const GYM_CONTACT_INFO = {
  address: '[GYM ADDRESS]',
  addressSub: 'Flagship Sanctum · Private Valet Entrance',
  phone: '[PHONE NUMBER]',
  phoneDisplay: '+91 [PHONE NUMBER]',
  instagramHandle: '@ARMOURLUXURGYM',
  instagramUrl: 'https://instagram.com/armourluxurgym',
  whatsappNumber: '1234567890',
  whatsappUrl: 'https://wa.me/?text=Hello%20Armour%20Luxury%20Gym,%20I%20would%20like%20to%20inquire%20about%20membership.',
  googleMapsQueryUrl: 'https://maps.google.com/?q=[GYM+ADDRESS]',
  openingHours: '[OPENING HOURS]',
  openingHoursDetailed: 'Mon – Fri: 05:30 – 23:00 / Sat – Sun: 07:00 – 21:00',
};

export const LocationSection: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [discipline, setDiscipline] = useState('Strength & Conditioning');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<{ fullName?: string; phone?: string }>({});

  const validateForm = (): boolean => {
    const errors: { fullName?: string; phone?: string } = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      errors.fullName = 'Full Name is required (minimum 2 characters).';
    }
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    if (!phone.trim()) {
      errors.phone = 'Phone number is required.';
    } else if (cleanPhone.length < 10) {
      errors.phone = 'Please provide a valid phone number (10+ digits).';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate brief latency for polished UI feedback
    await new Promise((resolve) => setTimeout(resolve, 400));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleResetForm = () => {
    setFullName('');
    setPhone('');
    setEmail('');
    setMessage('');
    setIsSubmitted(false);
    setFormErrors({});
  };

  return (
    <section
      id="contact"
      aria-label="Location and Contact Section"
      className="relative z-10 w-full overflow-hidden bg-[#080808] border-b border-[#292929] py-16 md:py-24 lg:py-28"
    >
      {/* Background Architectural Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      {/* Radial Gold Ambient Glow */}
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-br from-[#D4AF37]/5 via-transparent to-transparent rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ===================================================================
            SECTION HEADER
            =================================================================== */}
        <header className="flex flex-col mb-12 md:mb-16 text-left items-start">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="w-4 h-[1.5px] bg-[#D4AF37]" aria-hidden="true" />
            <span className="text-[11px] sm:text-xs font-mono tracking-widest text-[#D4AF37] uppercase font-semibold">
              LOCATION & CONTACT
            </span>
          </div>

          <h2 className="heading-section text-white max-w-3xl leading-[1.14] tracking-tight">
            YOUR NEXT SESSION STARTS HERE.
          </h2>

          <p className="mt-4 text-sm sm:text-base md:text-lg text-[#A5A5A5] font-light max-w-2xl font-sans leading-relaxed">
            Private walkthroughs and founding enrollment consultations are scheduled strictly by appointment to maintain focus and discretion.
          </p>
        </header>

        {/* ===================================================================
            MAIN 2-COLUMN LAYOUT
            - Left: Flagship Information, Actions & Interactive Map
            - Right: Private Consultation Dispatch Form
            =================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* LEFT COLUMN: CONTACT DETAILS & MAP (7 COLS) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Contact Information Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Address */}
              <div className="p-5 bg-[#0B0B0B] border border-[#292929] rounded-[4px] relative">
                <div className="w-9 h-9 rounded-[2px] bg-[#141414] border border-[#292929] flex items-center justify-center text-[#D4AF37] mb-3">
                  <MapPin size={17} />
                </div>
                <div className="text-[10px] font-mono tracking-widest text-[#666666] uppercase mb-1">
                  VENUE ADDRESS
                </div>
                <div className="font-serif text-base font-bold text-white tracking-wide">
                  {GYM_CONTACT_INFO.address}
                </div>
                <div className="text-xs text-[#888888] font-light mt-1">
                  {GYM_CONTACT_INFO.addressSub}
                </div>
              </div>

              {/* Phone */}
              <div className="p-5 bg-[#0B0B0B] border border-[#292929] rounded-[4px] relative">
                <div className="w-9 h-9 rounded-[2px] bg-[#141414] border border-[#292929] flex items-center justify-center text-[#D4AF37] mb-3">
                  <Phone size={17} />
                </div>
                <div className="text-[10px] font-mono tracking-widest text-[#666666] uppercase mb-1">
                  CONCIERGE LINE
                </div>
                <div className="font-mono text-base font-semibold text-white tracking-wide">
                  {GYM_CONTACT_INFO.phone}
                </div>
                <div className="text-xs text-[#888888] font-light mt-1">
                  Dedicated member liaison available
                </div>
              </div>

              {/* Opening Hours */}
              <div className="p-5 bg-[#0B0B0B] border border-[#292929] rounded-[4px] relative sm:col-span-2">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-[2px] bg-[#141414] border border-[#292929] flex items-center justify-center text-[#D4AF37] shrink-0">
                    <Clock size={17} />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono tracking-widest text-[#666666] uppercase mb-1">
                      FACILITY ACCESS HOURS
                    </div>
                    <div className="font-serif text-base font-bold text-white tracking-wide">
                      {GYM_CONTACT_INFO.openingHours}
                    </div>
                    <div className="text-xs text-[#888888] font-light mt-1">
                      {GYM_CONTACT_INFO.openingHoursDetailed}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Channels: WhatsApp & Instagram & Google Maps */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* WhatsApp Button */}
              <a
                href={GYM_CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[46px] p-3.5 bg-[#0B0B0B] border border-[#292929] hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 transition-colors rounded-[3px] flex items-center justify-center gap-2 group text-white text-xs font-mono tracking-wider uppercase cursor-pointer"
              >
                <MessageSquare size={15} className="text-[#D4AF37]" />
                <span>WHATSAPP</span>
                <ExternalLink size={12} className="text-[#666666] group-hover:text-[#D4AF37]" />
              </a>

              {/* Instagram Button */}
              <a
                href={GYM_CONTACT_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[46px] p-3.5 bg-[#0B0B0B] border border-[#292929] hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 transition-colors rounded-[3px] flex items-center justify-center gap-2 group text-white text-xs font-mono tracking-wider uppercase cursor-pointer"
              >
                <Instagram size={15} className="text-[#D4AF37]" />
                <span>{GYM_CONTACT_INFO.instagramHandle}</span>
                <ExternalLink size={12} className="text-[#666666] group-hover:text-[#D4AF37]" />
              </a>

              {/* Google Maps Button */}
              <a
                href={GYM_CONTACT_INFO.googleMapsQueryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[46px] p-3.5 bg-[#0B0B0B] border border-[#292929] hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 transition-colors rounded-[3px] flex items-center justify-center gap-2 group text-white text-xs font-mono tracking-wider uppercase cursor-pointer"
              >
                <MapPin size={15} className="text-[#D4AF37]" />
                <span>MAPS</span>
                <ExternalLink size={12} className="text-[#666666] group-hover:text-[#D4AF37]" />
              </a>
            </div>

            {/* Premium Map Placeholder Card with CTA */}
            <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] bg-[#0E0E0E] border border-[#292929] rounded-[4px] overflow-hidden flex flex-col items-center justify-center text-center p-6">
              {/* Architectural Grid & Radar Pattern */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at center, #D4AF37 1px, transparent 1px),
                    linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
                  `,
                  backgroundSize: '24px 24px, 48px 48px, 48px 48px',
                }}
                aria-hidden="true"
              />

              {/* Subtle Concentric Rings */}
              <div
                className="absolute w-56 h-56 rounded-full border border-[#D4AF37]/20 pointer-events-none animate-pulse"
                aria-hidden="true"
              />
              <div
                className="absolute w-80 h-80 rounded-full border border-[#D4AF37]/10 pointer-events-none"
                aria-hidden="true"
              />

              <div className="relative z-10 flex flex-col items-center max-w-sm">
                <div className="w-12 h-12 rounded-full bg-[#141414] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mb-3 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                  <MapPin size={22} />
                </div>
                <h3 className="font-serif text-lg font-bold text-white uppercase tracking-wider mb-1">
                  ARMOUR SANCTUM MAP
                </h3>
                <p className="text-xs text-[#888888] font-mono uppercase tracking-widest mb-4">
                  {GYM_CONTACT_INFO.address}
                </p>

                <a
                  href={GYM_CONTACT_INFO.googleMapsQueryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] py-2.5 px-6 bg-[#D4AF37] hover:bg-[#E5C358] text-black font-sans font-semibold text-xs tracking-[0.16em] uppercase rounded-[2px] transition-colors flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <span>OPEN IN GOOGLE MAPS →</span>
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: CONSULTATION FORM (5 COLS) */}
          <div className="lg:col-span-5 p-7 sm:p-9 bg-[#0B0B0B] border border-[#292929] rounded-[4px] relative">
            {/* Corner Hairlines */}
            <div
              className="absolute top-0 right-0 w-3.5 h-3.5 border-t border-r border-[#D4AF37]/60 pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b border-l border-[#D4AF37]/60 pointer-events-none"
              aria-hidden="true"
            />

            {isSubmitted ? (
              /* Success State */
              <div className="py-8 text-center animate-fade-in">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
                  <CheckCircle2 size={28} />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white uppercase tracking-wider mb-2">
                  INQUIRY RECEIVED
                </h3>
                <p className="text-sm text-[#A5A5A5] leading-relaxed font-light mb-6">
                  Thank you, <span className="text-white font-medium">{fullName}</span>. An Armour membership liaison will review your objectives and contact you at <span className="text-[#D4AF37] font-mono">{phone}</span> within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="w-full py-3.5 px-6 bg-[#141414] hover:bg-[#202020] text-white border border-[#292929] hover:border-[#D4AF37] font-sans font-semibold text-xs tracking-[0.16em] uppercase rounded-[2px] transition-colors cursor-pointer"
                >
                  TRANSMIT ANOTHER INQUIRY
                </button>
              </div>
            ) : (
              /* Inquiry Form */
              <div>
                <div className="mb-6">
                  <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase font-semibold block mb-1">
                    PRIVATE INQUIRY
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white uppercase tracking-wide">
                    SCHEDULE A VISIT
                  </h3>
                  <p className="text-xs text-[#888888] font-light mt-1">
                    Complete the form below to coordinate your initial facility tour.
                  </p>
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="contact-full-name"
                      className="block text-[11px] font-mono tracking-widest uppercase text-[#A5A5A5] mb-1.5"
                    >
                      Full Name <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      id="contact-full-name"
                      type="text"
                      required
                      placeholder="e.g. Jonathan Vance"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (formErrors.fullName) setFormErrors((prev) => ({ ...prev, fullName: undefined }));
                      }}
                      className={`w-full px-4 py-3 bg-[#111111] text-white text-sm border rounded-[2px] placeholder:text-[#555555] transition-colors focus:outline-none ${
                        formErrors.fullName ? 'border-red-500' : 'border-[#292929] focus:border-[#D4AF37]'
                      }`}
                    />
                    {formErrors.fullName && (
                      <p className="mt-1 text-xs text-red-400 font-sans">{formErrors.fullName}</p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-[11px] font-mono tracking-widest uppercase text-[#A5A5A5] mb-1.5"
                    >
                      Phone Number <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (formErrors.phone) setFormErrors((prev) => ({ ...prev, phone: undefined }));
                      }}
                      className={`w-full px-4 py-3 bg-[#111111] text-white text-sm border rounded-[2px] placeholder:text-[#555555] transition-colors focus:outline-none ${
                        formErrors.phone ? 'border-red-500' : 'border-[#292929] focus:border-[#D4AF37]'
                      }`}
                    />
                    {formErrors.phone && (
                      <p className="mt-1 text-xs text-red-400 font-sans">{formErrors.phone}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-[11px] font-mono tracking-widest uppercase text-[#A5A5A5] mb-1.5"
                    >
                      Email Address <span className="text-[#666666] font-normal">(Optional)</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="client@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-[#111111] text-white text-sm border border-[#292929] rounded-[2px] placeholder:text-[#555555] focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>

                  {/* Training Discipline Preference */}
                  <div>
                    <label
                      htmlFor="contact-discipline"
                      className="block text-[11px] font-mono tracking-widest uppercase text-[#A5A5A5] mb-1.5"
                    >
                      Primary Training Focus
                    </label>
                    <select
                      id="contact-discipline"
                      value={discipline}
                      onChange={(e) => setDiscipline(e.target.value)}
                      className="w-full px-4 py-3 bg-[#111111] text-white text-sm border border-[#292929] rounded-[2px] focus:outline-none focus:border-[#D4AF37] cursor-pointer"
                    >
                      <option value="Strength & Conditioning">Strength & Conditioning</option>
                      <option value="One-on-One Coaching">One-on-One Personal Coaching</option>
                      <option value="Body Transformation">Body Transformation Protocol</option>
                      <option value="Performance Recovery">Performance & Contrast Recovery</option>
                      <option value="General Facility Access">General Facility Access</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-[11px] font-mono tracking-widest uppercase text-[#A5A5A5] mb-1.5"
                    >
                      Message or Preferred Schedule
                    </label>
                    <textarea
                      id="contact-message"
                      rows={3}
                      placeholder="Specify preferred day, time or specific training history..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#111111] text-white text-sm border border-[#292929] rounded-[2px] placeholder:text-[#555555] focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-1 text-[11px] text-[#666666]">
                    <ShieldCheck size={13} className="text-[#D4AF37] shrink-0" />
                    <span>Your confidentiality is strictly guarded by Armour Concierge.</span>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full min-h-[48px] py-3.5 px-6 bg-[#D4AF37] text-black font-sans font-semibold text-xs tracking-[0.16em] uppercase hover:bg-[#E5C358] active:bg-[#C29E2E] transition-all rounded-[2px] cursor-pointer flex items-center justify-center gap-2 group disabled:opacity-60"
                    >
                      <span>{isSubmitting ? 'DISPATCHING...' : 'DISPATCH INQUIRY →'}</span>
                      {!isSubmitting && (
                        <ArrowRight
                          size={14}
                          className="group-hover:translate-x-1 transition-transform duration-200"
                        />
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
