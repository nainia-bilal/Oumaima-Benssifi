import React, { useEffect } from 'react';
import { X, ExternalLink, ArrowRight, CheckCircle2, Palette } from 'lucide-react';
import { DesignProject } from '../../types/omaima';

interface DesignDetailModalProps {
  design: DesignProject | null;
  onClose: () => void;
  onOpenContact: () => void;
}

export const DesignDetailModal: React.FC<DesignDetailModalProps> = ({
  design,
  onClose,
  onOpenContact,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!design) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#2b2b2b] text-white rounded-2xl overflow-hidden shadow-2xl border border-white/10 max-h-[90vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Preview Pane */}
        <div className="w-full md:w-1/2 relative bg-neutral-900 flex items-center justify-center overflow-hidden min-h-[250px] md:min-h-full">
          <img
            src={design.coverImage}
            alt={design.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details Pane */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-[85vh]">
          <div className="space-y-4">
            <div>
              <span className="font-mono text-xs font-bold text-[#e63946] uppercase">
                {design.categoryLabel} · {design.year}
              </span>
              <h3 className="font-heading text-2xl font-bold text-white mt-1">
                {design.title}
              </h3>
              <p className="font-heading text-sm font-semibold text-[#e63946] mt-0.5">
                {design.subtitle}
              </p>
            </div>

            <p className="text-neutral-300 text-sm leading-relaxed font-sans">
              {design.description}
            </p>

            {/* Highlights */}
            {design.highlights && design.highlights.length > 0 && (
              <div className="pt-2 border-t border-white/10">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2 font-heading">
                  Project Highlights
                </h4>
                <ul className="space-y-1.5 text-xs text-neutral-300">
                  {design.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#e63946] font-bold mt-0.5">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tools Stack */}
            <div className="pt-2 border-t border-white/10">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1 font-heading">
                Tools & Technologies
              </h4>
              <p className="text-xs text-neutral-400 font-mono">
                {design.tools.join('  ·  ')}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-3">
            {design.externalUrl && (
              <a
                href={design.externalUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-xs font-bold tracking-wider uppercase text-white bg-[#e63946] hover:bg-[#c1121f] transition-colors shadow-md"
              >
                <span>Open in Canva / Project</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            <button
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              className="py-3 px-4 rounded-lg text-xs font-bold tracking-wider uppercase text-neutral-300 hover:text-white bg-[#1a1a1a] hover:bg-[#333] border border-white/10 transition-colors cursor-pointer"
            >
              Inquire
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
