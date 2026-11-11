import React, { useState } from 'react';
import { X, Save, SlidersHorizontal, RefreshCw } from 'lucide-react';
import { OmaimaProfile } from '../../types/omaima';
import { initialOmaimaProfile } from '../../data/omaimaData';

interface CustomizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: OmaimaProfile;
  onUpdateProfile: (updated: OmaimaProfile) => void;
  onReset: () => void;
}

export const CustomizeModal: React.FC<CustomizeModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile,
  onReset,
}) => {
  const [formData, setFormData] = useState<OmaimaProfile>(profile);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#2b2b2b] text-white rounded-2xl overflow-hidden shadow-2xl p-6 sm:p-8 border border-white/10 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/15 text-neutral-300 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <SlidersHorizontal className="w-4 h-4 text-[#e63946]" />
            <span className="text-xs font-mono font-bold tracking-widest text-[#e63946] uppercase">
              PORTFOLIO CUSTOMIZATION
            </span>
          </div>
          <h2 className="font-heading text-2xl font-bold text-white">
            Modify Profile & Details
          </h2>
          <p className="text-sm text-neutral-400 mt-1 font-sans">
            Customize Omaima's titles, bio, phone number, email, or social media links.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#1a1a1a] rounded-lg border border-white/10 text-sm text-white focus:outline-none focus:border-[#e63946]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                Role / Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#1a1a1a] rounded-lg border border-white/10 text-sm text-white focus:outline-none focus:border-[#e63946]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
              Bio / Story
            </label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#1a1a1a] rounded-lg border border-white/10 text-sm text-white focus:outline-none focus:border-[#e63946]"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#1a1a1a] rounded-lg border border-white/10 text-sm text-white focus:outline-none focus:border-[#e63946]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                Phone Number
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#1a1a1a] rounded-lg border border-white/10 text-sm text-white focus:outline-none focus:border-[#e63946]"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#1a1a1a] rounded-lg border border-white/10 text-sm text-white focus:outline-none focus:border-[#e63946]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                Avatar Image URL / Path
              </label>
              <input
                type="text"
                value={formData.avatarUrl}
                onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#1a1a1a] rounded-lg border border-white/10 text-sm text-white focus:outline-none focus:border-[#e63946]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                LinkedIn Profile URL
              </label>
              <input
                type="text"
                value={formData.linkedinUrl}
                onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#1a1a1a] rounded-lg border border-white/10 text-sm text-white focus:outline-none focus:border-[#e63946]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                Instagram Profile URL
              </label>
              <input
                type="text"
                value={formData.instagramUrl}
                onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#1a1a1a] rounded-lg border border-white/10 text-sm text-white focus:outline-none focus:border-[#e63946]"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onReset}
              className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium text-neutral-400 hover:text-white bg-[#1a1a1a] rounded-lg border border-white/10 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset to Defaults</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-white bg-[#1a1a1a] rounded-lg border border-white/10 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex items-center gap-2 py-2.5 px-6 text-xs font-bold tracking-wider uppercase text-white bg-[#e63946] hover:bg-[#c1121f] rounded-lg transition-colors shadow-md cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
