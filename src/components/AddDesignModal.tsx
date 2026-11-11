import React, { useState } from 'react';
import { X, Plus, Palette, Sparkles, Image as ImageIcon } from 'lucide-react';
import { ProjectItem } from '../types/portfolio';
import { validateDesignSubmission } from '../utils/deckMath';

interface AddDesignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDesign: (design: ProjectItem) => void;
  accentColor: string;
}

export const AddDesignModal: React.FC<AddDesignModalProps> = ({
  isOpen,
  onClose,
  onAddDesign,
  accentColor,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    category: 'brand' as ProjectItem['category'],
    client: '',
    tools: 'Illustrator, Figma, Photoshop',
    coverImage: '/src/assets/images/card_editorial_typography_1794227416883.jpg',
    summary: '',
    description: '',
    highlights: 'Swiss architectural grid layout, Custom bespoke glyphs',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ProjectItem, string>>>({});

  if (!isOpen) return null;

  const presets = [
    {
      title: 'KINETIC EDITORIAL BOOK',
      subtitle: 'Modernist Typography Monograph',
      category: 'editorial' as const,
      img: '/src/assets/images/card_editorial_typography_1794227416883.jpg',
      tools: 'InDesign, Illustrator',
    },
    {
      title: 'POLESTAR 1:1 INDUSTRIAL DESIGN',
      subtitle: 'Aerodynamic EV Prototype',
      category: '3d' as const,
      img: '/src/assets/images/card_polestar_auto_1794227398555.jpg',
      tools: 'Blender, CAD, Photoshop',
    },
    {
      title: 'CASINO ROYALE LACE CAMEO',
      subtitle: 'Vintage Espionage Monograph',
      category: 'poster' as const,
      img: '/src/assets/images/card_fashion_noir_1794227398159.jpg',
      tools: 'Photoshop, Lightroom, InDesign',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = validateDesignSubmission({ title: formData.title });
    if (!val.isValid) {
      setErrors(val.errors);
      return;
    }

    const categoryLabels: Record<ProjectItem['category'], string> = {
      brand: 'Brand Identity',
      identity: 'Brand Identity',
      editorial: 'Editorial & Typography',
      '3d': '3D & Motion',
      poster: 'Poster & Print',
      motion: 'Motion Graphics',
      photography: 'Photography & Stills',
      videography: 'Videography & Cinema',
    };

    const newDesign: ProjectItem = {
      id: `design-${Date.now()}`,
      title: formData.title.trim().toUpperCase(),
      subtitle: formData.subtitle.trim() || 'Visual Design System',
      category: formData.category,
      categoryLabel: categoryLabels[formData.category] || 'Graphic Design',
      year: new Date().getFullYear().toString(),
      client: formData.client.trim() || 'Studio Commission',
      role: 'Lead Visual Designer',
      tools: formData.tools.split(',').map((t) => t.trim()).filter(Boolean),
      summary: formData.summary.trim() || 'Bespoke graphic design identity developed with modernist Swiss typography and minimal framing.',
      description: formData.description.trim() || 'Developed comprehensive visual assets, typography scales, print collateral, and interactive design tokens.',
      coverImage: formData.coverImage.trim(),
      features: formData.highlights.split(',').map((h) => h.trim()).filter(Boolean),
    };

    onAddDesign(newDesign);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-design-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#f2f2f4] text-neutral-900 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 border border-black/10 max-h-[92vh] overflow-y-auto no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-black/5 hover:bg-black/10 text-neutral-800 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="font-mono text-xs text-[#75030C] font-bold tracking-widest uppercase">
            GRAPHIC DESIGN ARCHIVE
          </span>
          <h2
            id="add-design-title"
            className="font-syncopate text-xl sm:text-2xl font-black uppercase text-neutral-900 mt-1"
          >
            Add Design Project
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1 font-sans">
            Add your brand identity systems, editorial book covers, posters, and 3D visual designs.
          </p>
        </div>

        {/* Presets */}
        <div className="mb-6 p-3.5 bg-black/5 rounded-2xl border border-black/10">
          <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 font-syncopate mb-2">
            Quick artwork preset:
          </p>
          <div className="flex flex-wrap gap-2">
            {presets.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    title: p.title,
                    subtitle: p.subtitle,
                    category: p.category,
                    coverImage: p.img,
                    tools: p.tools,
                  }));
                }}
                className="px-2.5 py-1 text-[11px] font-semibold bg-white hover:bg-black hover:text-white rounded-lg border border-black/10 transition-colors cursor-pointer"
              >
                {p.title}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5 font-syncopate">
                Project Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. OCHRE PARIS BRAND SYSTEM"
                className={`w-full px-4 py-2.5 bg-white rounded-xl border text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black transition-all ${
                  errors.title ? 'border-red-500 ring-1 ring-red-500' : 'border-black/15'
                }`}
                required
              />
              {errors.title && (
                <p className="text-[11px] text-red-600 font-medium mt-1">{errors.title}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5 font-syncopate">
                Subtitle / Type
              </label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="e.g. Visual Identity & Packaging"
                className="w-full px-4 py-2.5 bg-white rounded-xl border border-black/15 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5 font-syncopate">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value as ProjectItem['category'] })
                }
                className="w-full px-4 py-2.5 bg-white rounded-xl border border-black/15 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="brand">Brand Identity</option>
                <option value="editorial">Editorial & Typography</option>
                <option value="3d">3D Art & Industrial</option>
                <option value="poster">Poster & Print Systems</option>
                <option value="motion">Motion Graphics</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5 font-syncopate">
                Client / Studio
              </label>
              <input
                type="text"
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                placeholder="e.g. Studio Ochre / Independent"
                className="w-full px-4 py-2.5 bg-white rounded-xl border border-black/15 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5 font-syncopate">
              Design Software / Tools
            </label>
            <input
              type="text"
              value={formData.tools}
              onChange={(e) => setFormData({ ...formData, tools: e.target.value })}
              placeholder="Illustrator, Figma, Photoshop, InDesign"
              className="w-full px-4 py-2.5 bg-white rounded-xl border border-black/15 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5 font-syncopate">
              Cover Image URL or Path
            </label>
            <input
              type="text"
              value={formData.coverImage}
              onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
              placeholder="/src/assets/images/... or image URL"
              className="w-full px-4 py-2.5 bg-white rounded-xl border border-black/15 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5 font-syncopate">
              Project Summary
            </label>
            <textarea
              rows={2}
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              placeholder="Brief summary of the visual design solution..."
              className="w-full px-4 py-2.5 bg-white rounded-xl border border-black/15 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="pt-4 border-t border-black/10 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-700 hover:text-black bg-white hover:bg-neutral-100 border border-black/15 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-6 text-xs font-bold tracking-wider uppercase text-[#F3F3F3] bg-[#1B1B1B] hover:bg-[#75030C] rounded-xl transition-colors shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add To Design Archive</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
