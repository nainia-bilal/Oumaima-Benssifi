import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Instagram,
  Send,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { OmaimaProfile } from '../../types/omaima';

interface ContactSectionProps {
  profile: OmaimaProfile;
  onShowToast: (message: string, isSuccess?: boolean) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  profile,
  onShowToast,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      onShowToast('Please fill in all required fields.', false);
      return;
    }

    setIsSubmitting(true);
    // Simulate instantaneous graceful dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      onShowToast(`Thank you ${formData.name}! Your message was sent to Omaima.`, true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    }, 600);
  };

  return (
    <section id="contact" className="py-24 bg-[#1a1a1a] text-white">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-white mb-3">
            Get In <span className="text-[#e63946] relative inline-block">
              Touch
              <span className="absolute -bottom-1.5 left-0 w-full h-[3px] bg-gradient-to-r from-[#e63946] to-transparent" />
            </span>
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto text-base sm:text-lg">
            Ready to elevate your video production and brand visual identity? Let's discuss your next project.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column: Contact Details */}
          <div>
            <h3 className="font-heading text-2xl font-bold text-white mb-4">
              Contact Information
            </h3>
            <p className="text-neutral-400 text-base leading-relaxed mb-8 font-sans">
              Feel free to reach out for commercial video editing commissions, color grading, brand identity design, or collaborative creative direction.
            </p>

            <div className="space-y-4">
              {/* Email */}
              <a
                href={`mailto:${profile.email}`}
                className="group flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] hover:bg-[#e63946]/10 transition-all duration-300 border border-white/5 hover:border-[#e63946]/30"
              >
                <div className="w-12 h-12 rounded-full bg-[#c1121f] group-hover:bg-[#e63946] flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-[0_0_15px_rgba(230,57,70,0.3)]">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-heading text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                    Email
                  </h4>
                  <p className="text-white font-medium text-base group-hover:text-[#e63946] transition-colors">
                    {profile.email}
                  </p>
                </div>
              </a>

              {/* Phone */}
              <a
                href={`tel:${profile.phone.replace(/\s+/g, '')}`}
                className="group flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] hover:bg-[#e63946]/10 transition-all duration-300 border border-white/5 hover:border-[#e63946]/30"
              >
                <div className="w-12 h-12 rounded-full bg-[#c1121f] group-hover:bg-[#e63946] flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-[0_0_15px_rgba(230,57,70,0.3)]">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-heading text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                    Phone
                  </h4>
                  <p className="text-white font-medium text-base group-hover:text-[#e63946] transition-colors">
                    {profile.phone}
                  </p>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="w-12 h-12 rounded-full bg-[#c1121f] flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(230,57,70,0.3)]">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-heading text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                    Location
                  </h4>
                  <p className="text-white font-medium text-base">
                    {profile.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links matching Omaima Benssifi icons */}
            <div className="mt-8 flex items-center gap-4">
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-full bg-[#2b2b2b] hover:bg-[#e63946] text-white flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1.5 hover:scale-110 shadow-md border border-white/10"
                aria-label="LinkedIn profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>

              <a
                href={profile.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-full bg-[#2b2b2b] hover:bg-[#e63946] text-white flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1.5 hover:scale-110 shadow-md border border-white/10"
                aria-label="Instagram profile"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href={`mailto:${profile.email}`}
                className="w-11 h-11 rounded-full bg-[#2b2b2b] hover:bg-[#e63946] text-white flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1.5 hover:scale-110 shadow-md border border-white/10"
                aria-label="Direct email"
              >
                <Mail className="w-5 h-5" />
              </a>

              <a
                href={`tel:${profile.phone.replace(/\s+/g, '')}`}
                className="w-11 h-11 rounded-full bg-[#2b2b2b] hover:bg-[#e63946] text-white flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1.5 hover:scale-110 shadow-md border border-white/10"
                aria-label="Call phone"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="bg-[#2b2b2b] p-8 sm:p-10 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] border border-white/5">
            <h3 className="font-heading text-2xl font-bold text-white mb-6">
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 bg-[#333] border-2 border-[#444] rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#e63946] focus:bg-[#3a3a3a] transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-3 bg-[#333] border-2 border-[#444] rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#e63946] focus:bg-[#3a3a3a] transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Video project / Brand design inquiry"
                  className="w-full px-4 py-3 bg-[#333] border-2 border-[#444] rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#e63946] focus:bg-[#3a3a3a] transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Message *
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your video requirements, deliverables, or brand identity goals..."
                  required
                  className="w-full px-4 py-3 bg-[#333] border-2 border-[#444] rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#e63946] focus:bg-[#3a3a3a] transition-all duration-200 resize-y"
                />
              </div>

              {/* Submit button with sweep shine */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="relative overflow-hidden group/btn w-full py-4 px-6 rounded-lg font-bold text-white bg-[#e63946] hover:bg-[#c1121f] transition-all duration-300 transform hover:-translate-y-1 shadow-[0_10px_20px_rgba(230,57,70,0.3)] cursor-pointer flex items-center justify-center gap-2"
              >
                <span className="relative z-10">
                  {isSubmitting ? 'Sending Message...' : 'Send Message'}
                </span>
                <Send className="w-4 h-4 relative z-10" />
                <span className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
