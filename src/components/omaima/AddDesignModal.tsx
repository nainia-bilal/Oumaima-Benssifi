import React, { useState } from 'react';
import { X, Plus, Palette, Sparkles, Image as ImageIcon } from 'lucide-react';
import { DesignProject } from '../../types/omaima';
import { validateDesignSubmission } from '../../utils/deckMath';

interface AddDesignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDesign: (design: DesignProject) => void;
}

export const AddDesignModal: React.FC<AddDesignModalProps> = ({
  isOpen,
  onClose,
  onAddDesign,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    category: 'brand' as DesignProject['category'],
    client: '',
    skills: 'Branding, Vector Design, Canva, Figma',
    tools: 'Illustrator, Figma, Photoshop',
    coverImage: '/src/assets/images/card_editorial_typography_1794227416883.jpg',
    description: '',
    highlights: 'Complete vector identity, 40+ social templates, brand book guidelines',
    externalUrl: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const presets = [
    {
      title: 'CASABLANCA COUTURE BRAND KIT',
      subtitle: 'Luxury Fashion Brand Architecture',
      category: 'brand' as const,
      img: '/src/assets/images/card_fashion_noir_1794227398159.jpg',
      tools: 'Illustrator, InDesign, Canva',
      skills: 'Brand Identity, Editorial, Luxury',
    },
    {
      title: 'MODIKS PROMOTIONAL POSTERS',
      subtitle: 'Multi-Channel Event Campaign',
      category: 'poster' as const,
      img: '/src/assets/images/card_polestar_auto_1794227398555.jpg',
      tools: 'Photoshop, Figma, Canva',
      skills: 'Marketing Kit, Posters, Social Design',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = validateDesignSubmission({ title: formData.title });
    if (!val.isValid) {
      setErrors(val.errors);
      return;
    }

    const categoryLabels: Record<DesignProject['category'], string> = {
      brand: 'Brand Identity',
      poster: 'Posters & Marketing Kits',
      editorial: 'Editorial & Publishing',
      '3d': '3D & Motion Graphics',
      packaging: 'Packaging Design',
    };

    const newDesign: DesignProject = {
      id: `des-${Date.now()}`,
      title: formData.title.trim().toUpperCase(),
      subtitle: formData.subtitle.trim() || 'Visual Design System',
      category: formData.category,
      categoryLabel: categoryLabels[formData.category] || 'Graphic Design',
      client: formData.client.trim() || 'Studio Client',
      year: new Date().getFullYear().toString(),
      coverImage: formData.coverImage.trim() || '/src/assets/images/card_cosmic_energy_1794227399139.jpg',
      skills: formData.skills.split(',').map((s) => s.trim()).filter(Boolean),
      tools: formData.tools.split(',').map((t) => t.trim()).filter(Boolean),
      description: formData.description.trim() || 'Comprehensive graphic design solution featuring bespoke typography scales, print assets, and modular social media templates.',
      highlights: formData.highlights.split(',').map((h) => h.trim()).filter(Boolean),
      externalUrl: formData.externalUrl.trim(),
    };

    onAddDesign(newDesign);
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
            <Palette className="w-4 h-4 text-[#e63946]" />
            <span className="text-xs font-mono font-bold tracking-widest text-[#e63946] uppercase">
              GRAPHIC DESIGN ARCHIVE
            </span>
          </div>
          <h2 className="font-heading text-2xl font-bold text-white">
            Add Graphic Design Project
          </h2>
          <p className="text-sm text-neutral-400 mt-1 font-sans">
            Add your brand identity kits, posters, Canva campaigns, editorial publications, or vector systems.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="mb-6 p-4 bg-[#1a1a1a] rounded-xl border border-white/5">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2 font-mono">
            Quick preset:
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
                    skills: p.skills,
                  }));
                }}
                className="px-3 py-1.5 text-xs font-medium bg-[#2b2b2b] hover:bg-[#e63946] text-white rounded-lg border border-white/10 transition-colors cursor-pointer"
              >
                {p.title}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                Design Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. MOODA FIT BRAND SYSTEM"
                className={`w-full px-4 py-2.5 bg-[#1a1a1a] rounded-lg border text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#e63946] transition-all ${
                  errors.title ? 'border-red-500' : 'border-white/10'
                }`}
                required
              />
              {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                Subtitle / Project Type
              </label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="e.g. Identity & Promotional Assets"
                className="w-full px-4 py-2.5 bg-[#1a1a1a] rounded-lg border border-white/10 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#e63946]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value as DesignProject['category'] })
                }
                className="w-full px-4 py-2.5 bg-[#1a1a1a] rounded-lg border border-white/10 text-sm text-white focus:outline-none focus:border-[#e63946]"
              >
                <option value="brand">Brand Identity</option>
                <option value="poster">Marketing Kits & Posters</option>
                <option value="editorial">Editorial & Publishing</option>
                <option value="3d">3D Art & Motion</option>
                <option value="packaging">Packaging Design</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                Client / Company
              </label>
              <input
                type="text"
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                placeholder="e.g. MOODA FIT / Studio"
                className="w-full px-4 py-2.5 bg-[#1a1a1a] rounded-lg border border-white/10 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#e63946]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
              Skill Tags (Comma separated)
            </label>
            <input
              type="text"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              placeholder="Branding, Canva, Typography, Social Design"
              className="w-full px-4 py-2.5 bg-[#1a1a1a] rounded-lg border border-white/10 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#e63946]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
              Software / Tools
            </label>
            <input
              type="text"
              value={formData.tools}
              onChange={(e) => setFormData({ ...formData, tools: e.target.value })}
              placeholder="Illustrator, Figma, Photoshop, Canva"
              className="w-full px-4 py-2.5 bg-[#1a1a1a] rounded-lg border border-white/10 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#e63946]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                Cover Image URL or Path
              </label>
              <input
                type="text"
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                placeholder="/src/assets/images/... or URL"
                className="w-full px-4 py-2.5 bg-[#1a1a1a] rounded-lg border border-white/10 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#e63946]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                External Link (Canva, Behance, Drive)
              </label>
              <input
                type="text"
                value={formData.externalUrl}
                onChange={(e) => setFormData({ ...formData, externalUrl: e.target.value })}
                placeholder="https://www.canva.com/design/..."
                className="w-full px-4 py-2.5 bg-[#1a1a1a] rounded-lg border border-white/10 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#e63946]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
              Project Description
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Visual strategy, design execution, deliverables summary..."
              className="w-full px-4 py-2.5 bg-[#1a1a1a] rounded-lg border border-white/10 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#e63946]"
            />
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-white bg-[#1a1a1a] rounded-lg border border-white/10 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 py-3 px-6 text-xs font-bold tracking-wider uppercase text-white bg-[#e63946] hover:bg-[#c1121f] rounded-lg transition-colors shadow-md cursor-pointer"
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
