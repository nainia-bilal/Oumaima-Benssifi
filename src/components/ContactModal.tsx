import React, { useState } from 'react';
import { X, Send, CheckCircle, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { ArtistProfile, ContactFormData } from '../types/portfolio';
import { validateContactForm } from '../utils/deckMath';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  artist: ArtistProfile;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  artist,
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    projectType: 'motion',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateContactForm(formData);
    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate reliable state update & dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 400);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      projectType: 'motion',
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#f2f2f4] text-neutral-900 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 border border-black/10 max-h-[90vh] overflow-y-auto no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-black/5 hover:bg-black/10 text-neutral-800 transition-colors cursor-pointer"
          aria-label="Close contact dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-12 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-[#75030C]" />
            </div>
            <h3 className="font-syncopate text-xl font-black uppercase text-neutral-900">
              Message Transmitted
            </h3>
            <p className="text-sm text-neutral-600 max-w-md font-sans leading-relaxed">
              Thank you, <span className="font-semibold text-neutral-900">{formData.name}</span>. Your brief has been routed directly to {artist.name}'s studio inbox. Expected response within 24–48 hours.
            </p>
            <button
              onClick={handleReset}
              className="mt-4 px-6 py-2.5 text-xs font-bold uppercase tracking-wider bg-black text-white rounded-xl hover:bg-[#75030C] transition-colors cursor-pointer"
            >
              Send Another Note
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="font-mono text-xs text-[#75030C] font-bold tracking-widest uppercase">
                COMMISSION INQUIRY
              </span>
              <h2
                id="contact-title"
                className="font-syncopate text-xl sm:text-2xl font-black tracking-tight text-neutral-900 mt-1 uppercase"
              >
                Let's Build Something Bold
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1 font-sans">
                Direct inquiries for motion direction, 3D design systems, or creative collaborations.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5 font-syncopate">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name"
                    className={`w-full px-4 py-2.5 bg-white rounded-xl border text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black transition-all ${
                      errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-black/15'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-[11px] text-red-600 font-medium mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5 font-syncopate">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Your email@gmail.com"
                    className={`w-full px-4 py-2.5 bg-white rounded-xl border text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black transition-all ${
                      errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-black/15'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-red-600 font-medium mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5 font-syncopate">
                    Discipline
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white rounded-xl border border-black/15 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="motion">Motion Graphics & Animation</option>
                    <option value="3d">3D & Industrial Visualization</option>
                    <option value="brand">Brand Identity & Typography</option>
                    <option value="editorial">Editorial & Art Direction</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5 font-syncopate">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project Brief / Timeline"
                    className="w-full px-4 py-2.5 bg-white rounded-xl border border-black/15 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black"
                  >
                  </input>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5 font-syncopate">
                  Project Vision & Scope *
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your brand, deliverables, timeline, and vision..."
                  className={`w-full px-4 py-2.5 bg-white rounded-xl border text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black transition-all ${
                    errors.message ? 'border-red-500 ring-1 ring-red-500' : 'border-black/15'
                  }`}
                />
                {errors.message && (
                  <p className="text-[11px] text-red-600 font-medium mt-1">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 text-xs font-bold tracking-wider uppercase text-white bg-black hover:bg-[#75030C] rounded-xl transition-colors shadow-sm cursor-pointer disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Transmitting...' : 'Send Commission Request'}</span>
                <Send className="w-4 h-4" />
              </button>
            </form>

            {/* Direct Studio Details */}
            <div className="mt-6 pt-5 border-t border-black/10 flex flex-wrap items-center justify-between text-xs text-neutral-600 gap-4">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#75030C]" />
                <a href={`mailto:${artist.email}`} className="font-mono hover:text-black">
                  {artist.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                {artist.socials.slice(0, 3).map((soc, i) => (
                  <a
                    key={i}
                    href={soc.url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-black font-semibold uppercase tracking-wider text-[11px]"
                  >
                    {soc.platform}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
