import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle2, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { MembershipPlan, MEMBERSHIP_PLANS_CONFIG } from '../../config/membershipPlans';

export interface MembershipInquiryFormData {
  fullName: string;
  phoneNumber: string;
  preferredMembershipId: string;
  preferredMembershipName: string;
  message: string;
}

export interface MembershipModalProps {
  isOpen: boolean;
  selectedPlan: MembershipPlan | null;
  onClose: () => void;
  onSubmitInquiry?: (data: MembershipInquiryFormData) => Promise<boolean> | boolean | void;
}

export const MembershipModal: React.FC<MembershipModalProps> = ({
  isOpen,
  selectedPlan,
  onClose,
  onSubmitInquiry,
}) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [preferredPlanId, setPreferredPlanId] = useState<string>('');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<{ fullName?: string; phoneNumber?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Sync preferred plan whenever modal opens or selectedPlan changes
  useEffect(() => {
    if (selectedPlan) {
      setPreferredPlanId(selectedPlan.id);
    } else if (MEMBERSHIP_PLANS_CONFIG.length > 0) {
      setPreferredPlanId(MEMBERSHIP_PLANS_CONFIG[0].id);
    }
  }, [selectedPlan, isOpen]);

  // Reset form and focus on open
  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
      setErrors({});
      // Small timeout to focus after mounting
      const timer = setTimeout(() => {
        nameInputRef.current?.focus();
      }, 100);

      // Lock body scroll
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentPlan =
    MEMBERSHIP_PLANS_CONFIG.find((p) => p.id === preferredPlanId) ||
    selectedPlan ||
    MEMBERSHIP_PLANS_CONFIG[0];

  // Validation rules
  const validateForm = (): boolean => {
    const newErrors: { fullName?: string; phoneNumber?: string } = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter at least 2 characters.';
    }

    // Phone format: Allows international or national 10+ digits, optional + prefix, spaces, dashes
    const cleanPhone = phoneNumber.replace(/[\s\-\(\)]/g, '');
    const phoneRegex = /^(\+?\d{1,4})?(\d{10})$/;
    const generalValidPhone = /^\+?[0-9]{10,15}$/;

    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone Number is required.';
    } else if (!generalValidPhone.test(cleanPhone) && !phoneRegex.test(cleanPhone)) {
      newErrors.phoneNumber = 'Please enter a valid phone number (10+ digits).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const formData: MembershipInquiryFormData = {
      fullName: fullName.trim(),
      phoneNumber: phoneNumber.trim(),
      preferredMembershipId: currentPlan.id,
      preferredMembershipName: `${currentPlan.name} (${currentPlan.displayPrice})`,
      message: message.trim(),
    };

    try {
      // Extensible placeholder submission logic:
      // Can effortlessly route to WhatsApp API, webhook, or Firestore/CloudSQL in production
      if (onSubmitInquiry) {
        await onSubmitInquiry(formData);
      } else {
        // Simulated network latency for high-end polish
        await new Promise((resolve) => setTimeout(resolve, 450));
      }
      setIsSuccess(true);
    } catch (err) {
      console.error('Inquiry submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setFullName('');
    setPhoneNumber('');
    setMessage('');
    setIsSuccess(false);
    setErrors({});
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="membership-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleResetAndClose();
        }
      }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-lg bg-[#0C0C0C] border border-[#292929] rounded-[4px] p-6 sm:p-8 shadow-[0_24px_50px_rgba(0,0,0,0.9),0_0_35px_rgba(212,175,55,0.08)] overflow-hidden my-auto"
      >
        {/* Subtle Architectural Corner Accents */}
        <div
          className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#D4AF37]/50 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#D4AF37]/50 pointer-events-none"
          aria-hidden="true"
        />

        {/* Close Button */}
        <button
          type="button"
          onClick={handleResetAndClose}
          aria-label="Close membership inquiry modal"
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center text-[#A5A5A5] hover:text-white bg-[#141414] hover:bg-[#202020] border border-[#292929] hover:border-[#D4AF37]/50 rounded-[2px] transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
        >
          <X size={16} />
        </button>

        {isSuccess ? (
          /* ===============================================================
             SUCCESS CONFIRMATION STATE
             =============================================================== */
          <div className="py-6 text-center animate-fade-in">
            <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
              <CheckCircle2 size={28} />
            </div>

            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="w-3 h-[1px] bg-[#D4AF37]" aria-hidden="true" />
              <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase font-semibold">
                INQUIRY DISPATCHED
              </span>
              <span className="w-3 h-[1px] bg-[#D4AF37]" aria-hidden="true" />
            </div>

            <h3
              id="membership-modal-title"
              className="font-serif text-xl sm:text-2xl font-bold text-white uppercase tracking-wider mb-3"
            >
              MEMBERSHIP CONFIRMED
            </h3>

            <p className="text-sm text-[#A5A5A5] leading-relaxed max-w-sm mx-auto mb-6 font-light">
              Thank you, <span className="text-white font-medium">{fullName}</span>. Our concierge liaison will contact you within 24 hours regarding the{' '}
              <span className="text-[#D4AF37] font-medium">{currentPlan.name}</span> tier ({currentPlan.displayPrice}).
            </p>

            <div className="p-4 bg-[#111111] border border-[#202020] rounded-[2px] mb-8 text-left text-xs space-y-1.5">
              <div className="flex justify-between text-[#888888]">
                <span>Registered Plan:</span>
                <span className="text-white font-mono">{currentPlan.name}</span>
              </div>
              <div className="flex justify-between text-[#888888]">
                <span>Contact Number:</span>
                <span className="text-white font-mono">{phoneNumber}</span>
              </div>
              <div className="flex justify-between text-[#888888]">
                <span>Access Status:</span>
                <span className="text-[#D4AF37] font-mono">PRIORITY INTAKE</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleResetAndClose}
              className="w-full py-3.5 px-6 bg-[#D4AF37] text-black font-sans font-semibold text-xs tracking-[0.16em] uppercase hover:bg-[#E5C358] transition-colors rounded-[2px] cursor-pointer"
            >
              RETURN TO ARMOUR
            </button>
          </div>
        ) : (
          /* ===============================================================
             INQUIRY FORM
             =============================================================== */
          <div>
            {/* Modal Header */}
            <div className="mb-6 pr-8">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-3 h-[1.5px] bg-[#D4AF37]" aria-hidden="true" />
                <span className="text-[10.5px] font-mono tracking-widest text-[#D4AF37] uppercase font-semibold">
                  PRIVATE CONSULTATION
                </span>
              </div>
              <h3
                id="membership-modal-title"
                className="font-serif text-xl sm:text-2xl font-bold text-white uppercase tracking-wider"
              >
                MEMBERSHIP INQUIRY
              </h3>
            </div>

            {/* Automatically display selected plan */}
            <div className="p-3.5 mb-6 bg-[#111111] border border-[#292929] rounded-[2px] flex items-center justify-between">
              <div>
                <span className="text-[9.5px] font-mono tracking-widest text-[#666666] uppercase block">
                  SELECTED PLAN
                </span>
                <span className="text-sm font-serif font-bold text-white tracking-wide">
                  {currentPlan.name}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-semibold text-[#D4AF37]">
                  {currentPlan.displayPrice}
                </span>
                {currentPlan.isPopular && (
                  <span className="block text-[8.5px] font-mono text-[#D4AF37]/80 tracking-widest uppercase">
                    MOST POPULAR
                  </span>
                )}
              </div>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Full Name Field */}
              <div>
                <label
                  htmlFor="inquiry-full-name"
                  className="block text-[11px] font-mono tracking-widest uppercase text-[#A5A5A5] mb-1.5"
                >
                  Full Name <span className="text-[#D4AF37]">*</span>
                </label>
                <input
                  ref={nameInputRef}
                  id="inquiry-full-name"
                  type="text"
                  required
                  placeholder="e.g. Jonathan Vance"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) {
                      setErrors((prev) => ({ ...prev, fullName: undefined }));
                    }
                  }}
                  className={`w-full px-4 py-3 bg-[#111111] text-white text-sm border rounded-[2px] placeholder:text-[#555555] transition-colors focus:outline-none ${
                    errors.fullName
                      ? 'border-red-500 focus:border-red-400'
                      : 'border-[#292929] focus:border-[#D4AF37]'
                  }`}
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-400 font-sans">{errors.fullName}</p>
                )}
              </div>

              {/* Phone Number Field */}
              <div>
                <label
                  htmlFor="inquiry-phone"
                  className="block text-[11px] font-mono tracking-widest uppercase text-[#A5A5A5] mb-1.5"
                >
                  Phone Number <span className="text-[#D4AF37]">*</span>
                </label>
                <input
                  id="inquiry-phone"
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    if (errors.phoneNumber) {
                      setErrors((prev) => ({ ...prev, phoneNumber: undefined }));
                    }
                  }}
                  className={`w-full px-4 py-3 bg-[#111111] text-white text-sm border rounded-[2px] placeholder:text-[#555555] transition-colors focus:outline-none ${
                    errors.phoneNumber
                      ? 'border-red-500 focus:border-red-400'
                      : 'border-[#292929] focus:border-[#D4AF37]'
                  }`}
                />
                {errors.phoneNumber && (
                  <p className="mt-1 text-xs text-red-400 font-sans">{errors.phoneNumber}</p>
                )}
              </div>

              {/* Preferred Membership Selection */}
              <div>
                <label
                  htmlFor="inquiry-plan-select"
                  className="block text-[11px] font-mono tracking-widest uppercase text-[#A5A5A5] mb-1.5"
                >
                  Preferred Membership
                </label>
                <div className="relative">
                  <select
                    id="inquiry-plan-select"
                    value={preferredPlanId}
                    onChange={(e) => setPreferredPlanId(e.target.value)}
                    className="w-full px-4 py-3 bg-[#111111] text-white text-sm border border-[#292929] rounded-[2px] focus:outline-none focus:border-[#D4AF37] appearance-none cursor-pointer"
                  >
                    {MEMBERSHIP_PLANS_CONFIG.map((p) => (
                      <option key={p.id} value={p.id} className="bg-[#111111] text-white">
                        {p.planNumber} — {p.name} ({p.displayPrice})
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#A5A5A5]">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Message (Optional) */}
              <div>
                <label
                  htmlFor="inquiry-message"
                  className="block text-[11px] font-mono tracking-widest uppercase text-[#A5A5A5] mb-1.5"
                >
                  Message <span className="text-[#666666] font-normal">(Optional)</span>
                </label>
                <textarea
                  id="inquiry-message"
                  rows={3}
                  placeholder="Specific training objectives, schedule preferences, or inquiries..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#111111] text-white text-sm border border-[#292929] rounded-[2px] placeholder:text-[#555555] focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                />
              </div>

              {/* Security / Discretion Notice */}
              <div className="flex items-center gap-2 pt-1 text-[11px] text-[#666666]">
                <ShieldCheck size={13} className="text-[#D4AF37] shrink-0" />
                <span>Your details are held in strict discretion by Armour Concierge.</span>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full min-h-[48px] py-3.5 px-6 bg-[#D4AF37] text-black font-sans font-semibold text-xs tracking-[0.16em] uppercase hover:bg-[#E5C358] active:bg-[#C29E2E] transition-all rounded-[2px] cursor-pointer flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span>{isSubmitting ? 'TRANSMITTING...' : 'SEND INQUIRY →'}</span>
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
  );
};
