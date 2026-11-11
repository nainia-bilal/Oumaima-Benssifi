import React, { useState } from 'react';
import { X, Plus, Film, Video, Link, Sparkles } from 'lucide-react';
import { VideoProject } from '../../types/omaima';
import { parseVideoUrl, validateVideoSubmission } from '../../utils/videoMath';

interface AddVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddVideo: (video: VideoProject) => void;
}

export const AddVideoModal: React.FC<AddVideoModalProps> = ({
  isOpen,
  onClose,
  onAddVideo,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    category: 'commercial' as VideoProject['category'],
    client: '',
    duration: '01:30',
    aspectRatio: '16:9' as VideoProject['aspectRatio'],
    tools: 'Premiere Pro, DaVinci Resolve Studio',
    thumbnailUrl: '/src/assets/images/card_editorial_typography_1794227416883.jpg',
    description: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const presets = [
    {
      title: 'CASABLANCA COUTURE FASHION REEL',
      client: 'Maison Casablanca',
      category: 'fashion' as const,
      duration: '01:45',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      thumb: '/src/assets/images/card_fashion_noir_1794227398159.jpg',
      tools: 'DaVinci Resolve Studio, Film Emulation, Premiere Pro',
    },
    {
      title: 'MODIKS AUTOMOTIVE 3D TEASER',
      client: 'MODIKS Electric',
      category: 'motion' as const,
      duration: '00:55',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      thumb: '/src/assets/images/card_polestar_auto_1794227398555.jpg',
      tools: 'After Effects, Cinema 4D, Premiere Pro',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = validateVideoSubmission({
      title: formData.title,
      videoUrl: formData.videoUrl,
      duration: formData.duration,
    });

    if (!val.isValid) {
      setErrors(val.errors);
      return;
    }

    const parsed = parseVideoUrl(formData.videoUrl);

    const categoryLabels: Record<VideoProject['category'], string> = {
      commercial: 'Commercial Cut',
      fashion: 'Fashion & Noir',
      motion: 'Motion Graphics & 3D',
      music_video: 'Music & Visuals',
      reel: 'Social Reel',
    };

    const newVideo: VideoProject = {
      id: `vid-${Date.now()}`,
      title: formData.title.trim().toUpperCase(),
      category: formData.category,
      categoryLabel: categoryLabels[formData.category] || 'Commercial Cut',
      videoUrl: parsed.embedUrl,
      embedType: parsed.type === 'direct' ? 'mp4' : parsed.type,
      thumbnailUrl: formData.thumbnailUrl.trim() || '/src/assets/images/card_cosmic_energy_1794227399139.jpg',
      client: formData.client.trim() || 'Independent Studio',
      duration: formData.duration.trim() || '01:00',
      aspectRatio: formData.aspectRatio,
      tools: formData.tools.split(',').map((t) => t.trim()).filter(Boolean),
      description: formData.description.trim() || 'High-impact video editing project featuring custom color grading, sound design, and rhythm-driven pacing.',
      year: new Date().getFullYear().toString(),
    };

    onAddVideo(newVideo);
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
            <Video className="w-4 h-4 text-[#e63946]" />
            <span className="text-xs font-mono font-bold tracking-widest text-[#e63946] uppercase">
              VIDEO SHOWREEL VAULT
            </span>
          </div>
          <h2 className="font-heading text-2xl font-bold text-white">
            Add Video Editing Project
          </h2>
          <p className="text-sm text-neutral-400 mt-1 font-sans">
            Add your commercial cuts, fashion films, music videos, or social motion reels (YouTube, Vimeo, MP4 direct).
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
                    client: p.client,
                    category: p.category,
                    duration: p.duration,
                    videoUrl: p.url,
                    thumbnailUrl: p.thumb,
                    tools: p.tools,
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
                Video Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. CASABLANCA FASHION NOIR"
                className={`w-full px-4 py-2.5 bg-[#1a1a1a] rounded-lg border text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#e63946] transition-all ${
                  errors.title ? 'border-red-500' : 'border-white/10'
                }`}
                required
              />
              {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                Client / Brand
              </label>
              <input
                type="text"
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                placeholder="e.g. Maison Casablanca"
                className="w-full px-4 py-2.5 bg-[#1a1a1a] rounded-lg border border-white/10 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#e63946]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
              Video URL (YouTube, Vimeo, MP4 direct) *
            </label>
            <input
              type="text"
              value={formData.videoUrl}
              onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
              placeholder="https://... .mp4 or youtube.com/watch?v=..."
              className={`w-full px-4 py-2.5 bg-[#1a1a1a] rounded-lg border text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#e63946] transition-all ${
                errors.videoUrl ? 'border-red-500' : 'border-white/10'
              }`}
              required
            />
            {errors.videoUrl && <p className="text-xs text-red-500 mt-1">{errors.videoUrl}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value as VideoProject['category'] })
                }
                className="w-full px-4 py-2.5 bg-[#1a1a1a] rounded-lg border border-white/10 text-sm text-white focus:outline-none focus:border-[#e63946]"
              >
                <option value="commercial">Commercial Cut</option>
                <option value="fashion">Fashion & Noir</option>
                <option value="motion">Motion & 3D</option>
                <option value="music_video">Music Video</option>
                <option value="reel">Social Reel</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                Duration (MM:SS)
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="01:30"
                className="w-full px-4 py-2.5 bg-[#1a1a1a] rounded-lg border border-white/10 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#e63946]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                Aspect Ratio
              </label>
              <select
                value={formData.aspectRatio}
                onChange={(e) =>
                  setFormData({ ...formData, aspectRatio: e.target.value as VideoProject['aspectRatio'] })
                }
                className="w-full px-4 py-2.5 bg-[#1a1a1a] rounded-lg border border-white/10 text-sm text-white focus:outline-none focus:border-[#e63946]"
              >
                <option value="16:9">16:9 Cinema</option>
                <option value="9:16">9:16 Social Reel</option>
                <option value="2.39:1">2.39:1 Anamorphic</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
              Tools & Software Used
            </label>
            <input
              type="text"
              value={formData.tools}
              onChange={(e) => setFormData({ ...formData, tools: e.target.value })}
              placeholder="Premiere Pro, DaVinci Resolve Studio, After Effects"
              className="w-full px-4 py-2.5 bg-[#1a1a1a] rounded-lg border border-white/10 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#e63946]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
              Thumbnail URL or Asset Path
            </label>
            <input
              type="text"
              value={formData.thumbnailUrl}
              onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
              placeholder="/src/assets/images/... or image URL"
              className="w-full px-4 py-2.5 bg-[#1a1a1a] rounded-lg border border-white/10 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#e63946]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
              Description / Editing Notes
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Pacing breakdown, sound design details, color grading approach..."
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
              <span>Add To Video Showreels</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
