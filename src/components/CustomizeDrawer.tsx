import React, { useState } from 'react';
import { X, Check, RotateCcw, Palette, User, Sparkles } from 'lucide-react';
import { ArtistProfile } from '../types/portfolio';
import { initialArtistProfile } from '../data/portfolioData';

interface CustomizeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  artist: ArtistProfile;
  onUpdateArtist: (updated: ArtistProfile) => void;
  accentColor: string;
  onUpdateAccentColor: (color: string) => void;
}

export const CustomizeDrawer: React.FC<CustomizeDrawerProps> = ({
  isOpen,
  onClose,
  artist,
  onUpdateArtist,
  accentColor,
  onUpdateAccentColor,
}) => {
  const [formData, setFormData] = useState<ArtistProfile>({ ...artist });
  const [selectedColor, setSelectedColor] = useState<string>(accentColor);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const colorPresets = [
    { label: 'Signature Crimson (Default)', hex: '#75030C' },
    { label: 'Obsidian Jet', hex: '#1B1B1B' },
    { label: 'Platinum Light', hex: '#F3F3F3' },
    { label: 'Deep Wine', hex: '#520208' },
    { label: 'Electric Cobalt', hex: '#2563eb' },
    { label: 'Cyber Violet', hex: '#7c3aed' },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateArtist(formData);
    onUpdateAccentColor(selectedColor);
    setToastMessage('Modifications applied successfully!');
    setTimeout(() => {
      setToastMessage(null);
      onClose();
    }, 600);
  };

  const handleReset = () => {
    setFormData({ ...initialArtistProfile });
    setSelectedColor('#75030C');
    onUpdateArtist({ ...initialArtistProfile });
    onUpdateAccentColor('#75030C');
    setToastMessage('Restored to default palette!');
    setTimeout(() => setToastMessage(null), 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="customize-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-[#f2f2f4] text-neutral-900 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 border border-black/10 max-h-[90vh] overflow-y-auto no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-black/10">
          <div>
            <span className="font-mono text-xs text-[#75030C] font-bold tracking-widest uppercase">
              PORTFOLIO CUSTOMIZER
            </span>
            <h2
              id="customize-title"
              className="font-syncopate text-lg sm:text-xl font-black uppercase text-neutral-900 mt-0.5"
            >
              Modify Portfolio Details
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-black/5 hover:bg-black/10 text-neutral-800 transition-colors cursor-pointer"
            aria-label="Close customizer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {toastMessage && (
          <div className="mt-4 p-3 bg-black text-white text-xs font-semibold rounded-xl flex items-center gap-2">
            <Check className="w-4 h-4 text-[#75030C]" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Edit Form */}
        <form onSubmit={handleSave} className="space-y-4 mt-6">
          {/* Accent Color Preset Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2 font-syncopate flex items-center gap-2">
              <Palette className="w-3.5 h-3.5" />
              <span>Hero Accent Color</span>
            </label>
            <div className="flex items-center gap-2.5 flex-wrap">
              {colorPresets.map((preset) => (
                <button
                  type="button"
                  key={preset.hex}
                  onClick={() => setSelectedColor(preset.hex)}
                  title={preset.label}
                  className={`w-8 h-8 rounded-full border-2 transition-transform cursor-pointer flex items-center justify-center ${
                    selectedColor === preset.hex
                      ? 'scale-115 border-black shadow-md'
                      : 'border-white hover:scale-105'
                  }`}
                  style={{ backgroundColor: preset.hex }}
                >
                  {selectedColor === preset.hex && (
                    <Check className="w-4 h-4 text-white drop-shadow-xs" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Artist Name & Role Title */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5 font-syncopate">
                Artist Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. YASMINA BENALI"
                className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-black/15 text-sm text-neutral-900 font-syncopate font-bold focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5 font-syncopate">
                Role / Title
              </label>
              <input
                type="text"
                value={formData.roleTitle}
                onChange={(e) => setFormData({ ...formData, roleTitle: e.target.value })}
                placeholder="e.g. MULTIMEDIA DESIGNER"
                className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-black/15 text-sm text-neutral-900 font-syncopate font-bold focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>
          </div>

          {/* Tagline / Subtitle */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5 font-syncopate">
              Tagline / Subtitle
            </label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              placeholder="e.g. ART DIRECTOR & MOTION GRAPHICS"
              className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-black/15 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Location & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5 font-syncopate">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Casablanca & Paris"
                className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-black/15 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5 font-syncopate">
                Contact Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="studio@example.com"
                className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-black/15 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          {/* Google Drive Archive Links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5 font-syncopate">
                Video Drive Link
              </label>
              <input
                type="url"
                value={formData.videoDriveUrl || ''}
                onChange={(e) => setFormData({ ...formData, videoDriveUrl: e.target.value })}
                placeholder="https://drive.google.com/drive/folders/..."
                className="w-full px-3 py-2 bg-white rounded-xl border border-black/15 text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-black font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5 font-syncopate">
                Design Drive Link
              </label>
              <input
                type="url"
                value={formData.designDriveUrl || ''}
                onChange={(e) => setFormData({ ...formData, designDriveUrl: e.target.value })}
                placeholder="https://drive.google.com/drive/folders/..."
                className="w-full px-3 py-2 bg-white rounded-xl border border-black/15 text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-black font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5 font-syncopate">
                Photo & Video Drive Link
              </label>
              <input
                type="url"
                value={formData.photoDriveUrl || ''}
                onChange={(e) => setFormData({ ...formData, photoDriveUrl: e.target.value })}
                placeholder="https://drive.google.com/drive/folders/..."
                className="w-full px-3 py-2 bg-white rounded-xl border border-black/15 text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-black font-mono"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5 font-syncopate">
              Bio Summary
            </label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-black/15 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-black/10 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-700 hover:text-black bg-white hover:bg-neutral-100 border border-black/15 rounded-xl transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-6 text-xs font-bold tracking-wider uppercase text-[#F3F3F3] bg-[#1B1B1B] hover:bg-[#75030C] rounded-xl transition-colors shadow-sm cursor-pointer"
            >
              <span>Apply Changes</span>
              <Check className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
