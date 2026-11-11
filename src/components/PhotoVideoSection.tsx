import React, { useState, useEffect } from 'react';
import { Camera, Film, ExternalLink, MapPin, Sliders, ArrowUpRight, X } from 'lucide-react';
import { PhotoVideoItem } from '../types/portfolio';

interface PhotoVideoSectionProps {
  items: PhotoVideoItem[];
  accentColor: string;
  driveUrl?: string;
}

export const PhotoVideoSection: React.FC<PhotoVideoSectionProps> = ({
  items,
  accentColor,
  driveUrl = 'https://drive.google.com/drive/folders/1G0wPH9P9sbOtdCVS3DwDKe0XBB5UvZoa',
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [activeItemModal, setActiveItemModal] = useState<PhotoVideoItem | null>(null);

  useEffect(() => {
    if (activeItemModal) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [activeItemModal]);

  const filters = [
    { id: 'all', label: 'All Shoots' },
    { id: 'photography', label: 'Photography' },
    { id: 'videography', label: 'Videography' },
    { id: 'hybrid', label: 'Hybrid & Macro' },
  ];

  const filteredItems =
    activeFilter === 'all'
      ? items
      : items.filter((item) => item.type === activeFilter || (activeFilter === 'hybrid' && item.type === 'hybrid'));

  const displayedItems = filteredItems.slice(0, 3);

  return (
    <section
      id="photo-video"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20"
      aria-label="Photography and Videography Shoots Archive"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-[#1B1B1B]/10">
        <div>
          <span
            className="font-mono text-xs font-bold tracking-widest uppercase flex items-center gap-2"
            style={{ color: accentColor }}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>LENS & CINEMA ARCHIVE</span>
          </span>
          <h2 className="font-syncopate text-2xl sm:text-4xl font-black tracking-tight text-[#1B1B1B] mt-1 uppercase">
            PHOTOGRAPHY & VIDEOGRAPHY
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={driveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 bg-[#1B1B1B] hover:bg-[#75030C] text-[#F3F3F3] rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer group"
          >
            <span>Open Full Drive Vault</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* Filter Tabs & Counter */}
      <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
        <div className="flex items-center gap-1.5 p-1 bg-black/5 rounded-xl flex-wrap">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeFilter === f.id
                  ? 'bg-[#1B1B1B] text-[#F3F3F3] shadow-xs'
                  : 'text-[#1B1B1B]/70 hover:text-[#1B1B1B] hover:bg-black/5'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <span className="text-xs font-mono text-neutral-500">
          Showing {Math.min(filteredItems.length, 3)} Shoots + Google Drive Vault
        </span>
      </div>

      {/* 4-Card Responsive Grid: 3 Showcase Shoots + 1 Google Drive Vault Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveItemModal(item)}
            className="group relative bg-white/70 hover:bg-white rounded-2xl overflow-hidden border border-black/10 hover:border-black/30 transition-all duration-300 shadow-xs hover:shadow-xl cursor-pointer flex flex-col justify-between"
          >
            {/* Visual Media Container */}
            <div className="relative aspect-[4/5] w-full bg-neutral-900 overflow-hidden">
              <img
                src={item.coverImage}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors" />

              {/* Type Badge Top Left */}
              <div className="absolute top-3 left-3 z-10">
                <span className="font-mono text-[10px] font-bold text-white bg-black/80 backdrop-blur-xs px-2.5 py-1 rounded-sm uppercase tracking-wider flex items-center gap-1.5 border border-white/10">
                  {item.type === 'videography' ? (
                    <Film className="w-3 h-3 text-[#75030C]" />
                  ) : (
                    <Camera className="w-3 h-3 text-[#75030C]" />
                  )}
                  <span>{item.typeLabel}</span>
                </span>
              </div>

              {/* Hover Inspect Indicator Top Right */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="p-2 rounded-full bg-black/70 backdrop-blur-xs text-white flex items-center justify-center">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>

              {/* Location Badge Bottom Left */}
              <div className="absolute bottom-3 left-3 z-10">
                <span className="font-mono text-[10px] text-white/90 bg-black/75 backdrop-blur-xs px-2 py-0.5 rounded-sm flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-neutral-400" />
                  <span>{item.location}</span>
                </span>
              </div>
            </div>

            {/* Info Body */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-500 uppercase tracking-wider mb-1.5">
                  <span>{item.typeLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.year}</span>
                </div>

                <h3 className="font-syncopate text-xs sm:text-sm font-bold uppercase tracking-tight text-[#1B1B1B] group-hover:text-[#75030C] transition-colors line-clamp-1">
                  {item.title}
                </h3>

                <p className="font-heading text-xs text-neutral-600 font-semibold mt-1">
                  {item.subtitle}
                </p>

                <p className="text-xs text-neutral-600 mt-2 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom Gear Specs */}
              <div className="mt-4 pt-3 border-t border-[#1B1B1B]/5">
                <div className="flex items-center justify-between text-xs text-neutral-500 font-mono">
                  <span className="line-clamp-1 text-[11px]">{item.gear.slice(0, 2).join(' · ')}</span>
                  <span className="font-bold text-[#1B1B1B] text-[11px]">{item.year}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* 4th Card: Dedicated Google Drive Photography & Videography Vault Card */}
        <div className="group relative bg-[#1B1B1B] text-[#F3F3F3] rounded-2xl overflow-hidden border border-[#75030C]/40 hover:border-[#75030C] transition-all duration-300 shadow-lg hover:shadow-2xl flex flex-col justify-between">
          {/* Visual Header Banner */}
          <div className="relative aspect-[4/5] w-full bg-gradient-to-br from-[#240306] via-[#1B1B1B] to-[#0D0D0D] overflow-hidden flex flex-col items-center justify-center p-4 border-b border-white/10">
            {/* Background ambient crimson radial glow */}
            <div
              className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity"
              style={{
                background: 'radial-gradient(circle at center, rgba(117, 3, 12, 0.7) 0%, transparent 70%)',
              }}
            />

            {/* Google Drive Iconic Triangle Duo-Tone Logo */}
            <div className="relative z-10 w-12 h-12 mb-2 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <svg viewBox="0 0 87.3 78" className="w-11 h-11 drop-shadow-md">
                <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#75030C" />
                <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44c-.8 1.4-1.2 2.95-1.2 4.5h27.5z" fill="#A8121E" />
                <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75c.8-1.4 1.2-2.95 1.2-4.5h-27.5l5.65 9.8c.8.45 1.7.75 2.65.75z" fill="#F3F3F3" />
                <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#F3F3F3" />
                <path d="m59.8 53h27.5c0-1.55-.4-3.1-1.2-4.5l-25.4-44c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8z" fill="#E0E0E0" />
                <path d="m73.55 76.8-13.75-23.8h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.4 4.5-1.2z" fill="#75030C" />
              </svg>
            </div>

            {/* Status Pill */}
            <div className="relative z-10">
              <span className="font-mono text-[10px] font-bold text-white bg-[#75030C] px-2.5 py-0.5 rounded-full tracking-wider uppercase shadow-xs flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                GOOGLE DRIVE PHOTO & VIDEO
              </span>
            </div>
          </div>

          {/* Info Body */}
          <div className="p-5 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-[#F3F3F3]/60 uppercase tracking-widest mb-1.5">
                <span>LENS REPOSITORY</span>
                <span aria-hidden="true">·</span>
                <span className="text-white font-bold">+650 RAW CAPTURES</span>
              </div>

              <h3 className="font-syncopate text-xs sm:text-sm font-bold uppercase tracking-tight text-white group-hover:text-[#F3F3F3] transition-colors">
                COMPLETE PHOTO & VIDEO ARCHIVE
              </h3>

              <p className="font-heading text-xs text-neutral-300 font-semibold mt-1">
                Full-Res RAW & Anamorphic Dailies
              </p>

              <p className="text-xs text-[#F3F3F3]/80 mt-2 leading-relaxed">
                Direct access to high-resolution 14-bit RAW DNGs, 16-bit TIFFs, uncompressed camera rushes, BTS footage, and calibrated stills.
              </p>

              {/* Deliverable Tags */}
              <div className="mt-3 flex flex-wrap gap-1 text-[10px] font-mono text-[#F3F3F3]/70">
                <span className="px-1.5 py-0.5 rounded bg-white/10">14-Bit RAW .DNG</span>
                <span className="px-1.5 py-0.5 rounded bg-white/10">16-Bit TIFF</span>
                <span className="px-1.5 py-0.5 rounded bg-white/10">4K D-Log Takes</span>
              </div>
            </div>

            {/* Call to action button with user's specific Drive link */}
            <div className="mt-4 pt-3 border-t border-white/10">
              <a
                href={driveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-[#75030C] hover:bg-[#8F0410] active:scale-[0.98] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md group/btn cursor-pointer"
                aria-label="Open Omaima's complete photography and videography Google Drive vault"
              >
                <span>Open Photo & Video Drive</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Shoot Detail Lightbox Modal */}
      {activeItemModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="photo-modal-title"
          onClick={() => setActiveItemModal(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[88vh] sm:max-h-[85vh] bg-[#1B1B1B] text-[#F3F3F3] rounded-2xl sm:rounded-3xl border border-white/15 shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Header: Category Tag & Pinned Close Button */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-3.5 border-b border-white/10 bg-[#1B1B1B] shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#75030C]" />
                <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider text-neutral-300">
                  {activeItemModal.typeLabel} · {activeItemModal.year}
                </span>
              </div>
              <button
                onClick={() => setActiveItemModal(null)}
                className="p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-[#75030C] text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Scrollable Modal Content */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
              {/* Media Image Showcase */}
              <div className="max-h-[34vh] sm:max-h-[44vh] w-full rounded-xl overflow-hidden bg-neutral-950 flex items-center justify-center p-1.5 sm:p-2 border border-white/10 shrink-0">
                <img
                  src={activeItemModal.coverImage}
                  alt={activeItemModal.title}
                  className="max-h-[32vh] sm:max-h-[42vh] w-auto max-w-full object-contain rounded-lg shadow-md"
                />
              </div>

              {/* Subtitle / Metadata row */}
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] sm:text-xs font-mono text-neutral-400 uppercase tracking-wider">
                <span className="text-white font-semibold">{activeItemModal.typeLabel}</span>
                <span aria-hidden="true" className="text-neutral-600">·</span>
                <span>{activeItemModal.location}</span>
                <span aria-hidden="true" className="text-neutral-600">·</span>
                <span className="text-[#75030C] font-bold">{activeItemModal.year}</span>
              </div>

              {/* Modal Heading */}
              <h3
                id="photo-modal-title"
                className="font-syncopate text-sm sm:text-lg font-bold uppercase tracking-tight text-white leading-snug"
              >
                {activeItemModal.title}
              </h3>

              {/* Subtitle */}
              <p className="font-heading text-xs sm:text-sm font-semibold text-neutral-300 -mt-2">
                {activeItemModal.subtitle}
              </p>

              {/* Description */}
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {activeItemModal.description}
              </p>

              {/* Camera & Lens Specs */}
              <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="block text-[10px] sm:text-[11px] font-mono text-neutral-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-[#75030C]" />
                  <span>Camera & Lens Specifications:</span>
                </span>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {activeItemModal.gear.map((g, idx) => (
                    <span
                      key={idx}
                      className="px-2 sm:px-2.5 py-1 bg-black/60 text-[11px] sm:text-xs font-mono text-neutral-200 rounded-md border border-white/10"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Pinned Bottom CTA Action Bar */}
            <div className="px-4 sm:px-6 py-3 sm:py-3.5 bg-[#1B1B1B] border-t border-white/10 shrink-0">
              <a
                href={driveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 bg-[#75030C] hover:bg-[#8F0410] active:scale-[0.98] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
              >
                <span>View Full RAW Shoot On Drive</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
