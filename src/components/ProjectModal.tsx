import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { ProjectItem } from '../types/portfolio';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onOpenContact: () => void;
  accentColor: string;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onNext,
  onPrev,
  onOpenContact,
  accentColor,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#f2f2f4] text-neutral-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-black/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/60 hover:bg-black text-white transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-black"
          aria-label="Close modal (Esc)"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Visual Media Pane */}
        <div className="w-full md:w-1/2 relative min-h-[280px] sm:min-h-[360px] md:min-h-full bg-neutral-950 flex items-center justify-center overflow-hidden">
          {project.coverImage ? (
            <img
              src={project.coverImage}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          ) : (
            /* Vector Emblem View for Vermilion Totem */
            <div
              className="w-full h-full flex flex-col items-center justify-center p-8"
              style={{ backgroundColor: accentColor }}
            >
              <svg
                viewBox="0 0 100 100"
                className="w-48 h-48 drop-shadow-xl"
                fill="none"
              >
                <path
                  d="M50 12 C60 12 68 20 68 30 C78 30 86 38 86 48 C86 58 78 66 68 66 C68 76 60 84 50 84 C40 84 32 76 32 66 C22 66 14 58 14 48 C14 38 22 30 32 30 C32 20 40 12 50 12 Z"
                  fill="#111111"
                />
                <path
                  d="M30 48 Q50 32 70 48 Q50 64 30 48 Z"
                  fill={accentColor}
                />
                <circle cx="50" cy="48" r="7" fill="#111111" />
                <circle cx="50" cy="48" r="3" fill="#ffffff" />
              </svg>
              <span className="mt-4 font-syncopate text-xs font-bold tracking-widest text-black">
                {project.badgeCode}
              </span>
            </div>
          )}

          {/* Quick Prev / Next overlay arrows on media */}
          <div className="absolute inset-x-0 bottom-4 px-4 flex items-center justify-between pointer-events-none">
            <button
              onClick={onPrev}
              className="pointer-events-auto p-2 rounded-full bg-black/60 hover:bg-black text-white transition-colors cursor-pointer"
              aria-label="Previous case study"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={onNext}
              className="pointer-events-auto p-2 rounded-full bg-black/60 hover:bg-black text-white transition-colors cursor-pointer"
              aria-label="Next case study"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content & Case Study Details Pane */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[55vh] md:max-h-[85vh] no-scrollbar">
          <div className="space-y-6">
            {/* Metadata (Clean unboxed text, Zero-Pill rule compliance) */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              <span>{project.categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span>{project.year}</span>
              <span aria-hidden="true">·</span>
              <span>{project.client}</span>
            </div>

            {/* Title & Subtitle */}
            <div>
              <h2
                id="modal-title"
                className="font-syncopate text-xl sm:text-2xl font-black tracking-tight text-neutral-900"
              >
                {project.title}
              </h2>
              <p className="font-heading text-sm text-neutral-600 mt-1 font-semibold">
                {project.subtitle}
              </p>
            </div>

            {/* Summary */}
            <p className="text-sm text-neutral-700 leading-relaxed font-sans">
              {project.summary}
            </p>

            {/* In-Depth Overview */}
            <div className="pt-2 border-t border-black/10">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-2 font-syncopate">
                Design & Execution
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
                {project.description}
              </p>
            </div>

            {/* Key Deliverables / Features */}
            {project.features && project.features.length > 0 && (
              <div className="pt-2 border-t border-black/10">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-2 font-syncopate">
                  Highlights
                </h4>
                <ul className="space-y-1.5 text-xs text-neutral-700 font-sans">
                  {project.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#75030C] font-bold mt-0.5">•</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tools Stack (Clean unboxed text) */}
            <div className="pt-2 border-t border-black/10">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-1 font-syncopate">
                Tools Used
              </h4>
              <p className="text-xs text-neutral-600 font-mono">
                {project.tools.join('  ·  ')}
              </p>
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-8 pt-4 border-t border-black/10 flex items-center justify-between gap-4">
            <button
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold tracking-wider uppercase text-[#F3F3F3] bg-[#1B1B1B] hover:bg-[#75030C] rounded-xl transition-colors cursor-pointer"
            >
              <span>Inquire For Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
