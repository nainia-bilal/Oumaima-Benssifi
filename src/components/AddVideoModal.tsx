import React, { useState } from 'react';
import { X, Film, Check, AlertCircle, Plus, Play, Sparkles } from 'lucide-react';
import { VideoProject, parseVideoUrl, validateVideoSubmission } from '../utils/videoMath';

interface AddVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddVideo: (video: VideoProject) => void;
  accentColor: string;
}

export const AddVideoModal: React.FC<AddVideoModalProps> = ({
  isOpen,
  onClose,
  onAddVideo,
  accentColor,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    category: 'commercial' as VideoProject['category'],
    duration: '01:30',
    role: 'Lead Video Editor & Colorist',
    software: 'Premiere Pro, DaVinci Resolve',
    videoUrl: '',
    thumbnail: '',
    description: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof VideoProject, string>>>({});
  const [previewInfo, setPreviewInfo] = useState<{ type: string; embedUrl: string; isValid: boolean } | null>(null);

  if (!isOpen) return null;

  const handleUrlChange = (url: string) => {
    setFormData((prev) => ({ ...prev, videoUrl: url }));
    if (url.trim()) {
      const parsed = parseVideoUrl(url);
      setPreviewInfo(parsed);
      if (errors.videoUrl) {
        setErrors((prev) => ({ ...prev, videoUrl: undefined }));
      }
    } else {
      setPreviewInfo(null);
    }
  };

  const handlePresetSelect = (presetUrl: string, sampleTitle: string, category: VideoProject['category']) => {
    setFormData((prev) => ({
      ...prev,
      videoUrl: presetUrl,
      title: sampleTitle,
      category,
    }));
    setPreviewInfo(parseVideoUrl(presetUrl));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateVideoSubmission({
      title: formData.title,
      videoUrl: formData.videoUrl,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const categoryLabels: Record<VideoProject['category'], string> = {
      showreel: 'Official Reel',
      commercial: 'Commercial Spot',
      music_video: 'Music Video',
      fashion: 'Fashion & Luxury',
      social: 'Social 9:16 Cuts',
    };

    const newVideo: VideoProject = {
      id: `vid-${Date.now()}`,
      title: formData.title.trim(),
      client: formData.client.trim() || 'Independent / Spec',
      category: formData.category,
      categoryLabel: categoryLabels[formData.category],
      duration: formData.duration.trim() || '01:00',
      year: new Date().getFullYear().toString(),
      role: formData.role.trim() || 'Video Editor',
      software: formData.software.split(',').map((s) => s.trim()).filter(Boolean),
      videoUrl: formData.videoUrl.trim(),
      thumbnail: formData.thumbnail.trim() || '/src/assets/images/card_artist_portrait_1794227396467.jpg',
      description: formData.description.trim() || 'Edited and graded using professional editing timeline with precision cut points and sound master.',
      aspectRatio: '16:9',
    };

    onAddVideo(newVideo);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-video-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#f2f2f4] text-neutral-900 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 border border-black/10 max-h-[92vh] overflow-y-auto no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-black/5 hover:bg-black/10 text-neutral-800 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="font-mono text-xs text-[#75030C] font-bold tracking-widest uppercase">
            VIDEO VAULT MANAGER
          </span>
          <h2
            id="add-video-title"
            className="font-syncopate text-xl sm:text-2xl font-black uppercase text-neutral-900 mt-1"
          >
            Add New Video Project
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1 font-sans">
            Paste your Vimeo, YouTube, or direct MP4 video URL to showcase your video editing cuts.
          </p>
        </div>

        {/* Quick Link Presets */}
        <div className="mb-6 p-3.5 bg-black/5 rounded-2xl border border-black/10">
          <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 font-syncopate mb-2">
            Or test with a sample video:
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() =>
                handlePresetSelect(
                  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
                  'CYBERPUNK SCI-FI VFX CUT',
                  'commercial'
                )
              }
              className="px-2.5 py-1 text-[11px] font-semibold bg-white hover:bg-black hover:text-white rounded-lg border border-black/10 transition-colors cursor-pointer"
            >
              Sci-Fi Commercial (MP4)
            </button>
            <button
              type="button"
              onClick={() =>
                handlePresetSelect(
                  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
                  'KINETIC 3D MOTION TRAILER',
                  'music_video'
                )
              }
              className="px-2.5 py-1 text-[11px] font-semibold bg-white hover:bg-black hover:text-white rounded-lg border border-black/10 transition-colors cursor-pointer"
            >
              3D Animation Reel (MP4)
            </button>
            <button
              type="button"
              onClick={() =>
                handlePresetSelect(
                  'https://player.vimeo.com/video/76979871',
                  'AVANT-GARDE EDITORIAL SHOWREEL',
                  'showreel'
                )
              }
              className="px-2.5 py-1 text-[11px] font-semibold bg-white hover:bg-black hover:text-white rounded-lg border border-black/10 transition-colors cursor-pointer"
            >
              Vimeo Showcase Link
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Video URL Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5 font-syncopate flex items-center justify-between">
              <span>Video Link (URL / Embed) *</span>
              {previewInfo && (
                <span className="text-[10px] text-emerald-600 font-mono font-bold lowercase">
                  ✓ detected {previewInfo.type}
                </span>
              )}
            </label>
            <input
              type="text"
              value={formData.videoUrl}
              onChange={(e) => handleUrlChange(e.target.value)}
              placeholder="e.g. https://vimeo.com/123456789 or https://youtu.be/... or .mp4 URL"
              className={`w-full px-4 py-2.5 bg-white rounded-xl border text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black transition-all ${
                errors.videoUrl ? 'border-red-500 ring-1 ring-red-500' : 'border-black/15'
              }`}
              required
            />
            {errors.videoUrl && (
              <p className="text-[11px] text-red-600 font-medium mt-1">{errors.videoUrl}</p>
            )}
          </div>

          {/* Title & Client */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5 font-syncopate">
                Video Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. SAINT LAURENT — WINTER REEL"
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
                Client / Brand
              </label>
              <input
                type="text"
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                placeholder="e.g. Vogue Paris / Independent"
                className="w-full px-4 py-2.5 bg-white rounded-xl border border-black/15 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          {/* Category & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5 font-syncopate">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value as VideoProject['category'] })
                }
                className="w-full px-4 py-2.5 bg-white rounded-xl border border-black/15 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="showreel">Official Showreel</option>
                <option value="commercial">Commercial Spot</option>
                <option value="music_video">Music Video</option>
                <option value="fashion">Fashion & Editorial Film</option>
                <option value="social">Social Vertical 9:16 Cuts</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5 font-syncopate">
                Duration (MM:SS)
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="01:45"
                className="w-full px-4 py-2.5 bg-white rounded-xl border border-black/15 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black font-mono"
              />
            </div>
          </div>

          {/* Software Tools & Role */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5 font-syncopate">
                Your Role
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="e.g. Lead Video Editor & Colorist"
                className="w-full px-4 py-2.5 bg-white rounded-xl border border-black/15 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5 font-syncopate">
                Editing Software
              </label>
              <input
                type="text"
                value={formData.software}
                onChange={(e) => setFormData({ ...formData, software: e.target.value })}
                placeholder="Premiere Pro, DaVinci Resolve, After Effects"
                className="w-full px-4 py-2.5 bg-white rounded-xl border border-black/15 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5 font-syncopate">
              Editorial Notes / Cut Breakdown
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Pacing breakdown, sound design choices, color grading details..."
              className="w-full px-4 py-2.5 bg-white rounded-xl border border-black/15 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Actions */}
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
              <span>Add To Video Vault</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
