import React from 'react';
import { ArtistProfile } from '../types/portfolio';
import Text3DFlip from '@/registry/magicui/text-3d-flip';

interface HeroReferenceProps {
  artist: ArtistProfile;
  accentColor: string;
  onPrev: () => void;
  onNext: () => void;
  activeCardIndex?: number;
}

export const HeroReference: React.FC<HeroReferenceProps> = ({
  artist,
  accentColor,
  onPrev,
  onNext,
  activeCardIndex,
}) => {
  return (
    <section className="relative w-full overflow-hidden pt-8 pb-4 text-neutral-900 select-none">
      {/* Precision Crosshair Grid Markers (+) matching reference layout */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Row 1 (+) */}
        <span className="absolute top-6 left-6 sm:left-12 text-neutral-400 font-mono text-xs select-none">
          +
        </span>
        <span className="absolute top-6 left-[35%] text-neutral-400 font-mono text-xs select-none">
          +
        </span>
        <span className="absolute top-6 left-[65%] text-neutral-400 font-mono text-xs select-none">
          +
        </span>
        <span className="absolute top-6 right-6 sm:right-12 text-neutral-400 font-mono text-xs select-none">
          +
        </span>

        {/* Row 2 (+) */}
        <span className="absolute top-[280px] sm:top-[310px] left-6 sm:left-12 text-neutral-400 font-mono text-xs select-none">
          +
        </span>
        <span className="absolute top-[280px] sm:top-[310px] left-[35%] text-neutral-400 font-mono text-xs select-none">
          +
        </span>
        <span className="absolute top-[280px] sm:top-[310px] left-[65%] text-neutral-400 font-mono text-xs select-none">
          +
        </span>
        <span className="absolute top-[280px] sm:top-[310px] right-6 sm:right-12 text-neutral-400 font-mono text-xs select-none">
          +
        </span>
      </div>

      {/* Top Header Bar: WELCOME TO MY & Modernist Eye Icon */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-start justify-between relative z-10">
        {/* Top-Left: WELCOME TO MY */}
        <div className="text-left font-syncopate font-bold text-xs sm:text-sm tracking-widest leading-snug">
          <p>WELCOME</p>
          <p>TO MY</p>
        </div>

        {/* Top-Right: Eye Symbol from reference */}
        <div className="relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10">
          <svg
            viewBox="0 0 40 40"
            className="w-full h-full text-neutral-900"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer eye hexagon / circle */}
            <circle
              cx="20"
              cy="20"
              r="17"
              stroke="currentColor"
              strokeWidth="2"
            />
            {/* Middle target ring */}
            <circle
              cx="20"
              cy="20"
              r="10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="2 2"
            />
            {/* Pupil aperture */}
            <circle cx="20" cy="20" r="5" fill="currentColor" />
            <circle cx="20" cy="20" r="2" fill="#ffffff" />
            {/* Crosshair ticks */}
            <line x1="20" y1="0" x2="20" y2="4" stroke="currentColor" strokeWidth="2" />
            <line x1="20" y1="36" x2="20" y2="40" stroke="currentColor" strokeWidth="2" />
            <line x1="0" y1="20" x2="4" y2="20" stroke="currentColor" strokeWidth="2" />
            <line x1="36" y1="20" x2="40" y2="20" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* Centerpiece Hero Title with Red Column and Layered Brutalist Typography */}
      <div className="relative mt-4 sm:mt-6 max-w-7xl mx-auto px-4 sm:px-8 flex flex-col items-center justify-center">
        {/* Navigation Arrows */}
        <button
          onClick={onPrev}
          className="absolute left-1 sm:left-4 top-[40%] -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-[#1B1B1B] hover:text-[#75030C] hover:bg-black/5 transition-all cursor-pointer z-30 select-none"
          aria-label="Previous project card"
        >
          <span className="text-xs sm:text-sm font-bold">◀</span>
        </button>

        <button
          onClick={onNext}
          className="absolute right-1 sm:right-4 top-[40%] -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-[#1B1B1B] hover:text-[#75030C] hover:bg-black/5 transition-all cursor-pointer z-30 select-none"
          aria-label="Next project card"
        >
          <span className="text-xs sm:text-sm font-bold">▶</span>
        </button>

        {/* Title Block with 3-Layer Brutalist Typography and Bounded Red Pillar */}
        <div className="relative w-full max-w-5xl py-1.5 sm:py-4 flex flex-col items-center justify-center select-none">
          {/* Central Red Vertical Rectangle - bounded strictly to title text height */}
          <div
            className="absolute -top-1 -bottom-1 sm:-top-2 sm:-bottom-2 w-20 xs:w-24 sm:w-44 md:w-56 lg:w-64 rounded-none z-0 shadow-sm pointer-events-none transition-colors duration-500 overflow-hidden"
            style={{ backgroundColor: accentColor }}
          >
            {/* Lower White Ghost Wireframe Reflection (visible only within the red column) */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none select-none translate-y-[30%] sm:translate-y-[34%]"
              aria-hidden="true"
            >
              <span
                className="font-syncopate font-black text-[17px] xs:text-xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tighter whitespace-nowrap leading-none"
                style={{
                  WebkitTextStroke: '1.2px #ffffff',
                  color: 'transparent',
                  opacity: 0.9,
                }}
              >
                OMAIMA BENSSIFI
              </span>
            </div>
          </div>

          {/* Typography Wrapper */}
          <div className="relative z-10 w-full flex justify-center items-center leading-none">
            {/* Layer 1: Top Outlined Echo Wireframe Layer (peeks above solid text) */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none select-none -translate-y-[26%] sm:-translate-y-[28%] z-10"
              aria-hidden="true"
            >
              <span
                className="font-syncopate font-black text-[17px] xs:text-xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tighter whitespace-nowrap leading-none opacity-60"
                style={{
                  WebkitTextStroke: '1px #111111',
                  color: 'transparent',
                  transform: 'translateX(-1px)',
                }}
              >
                OMAIMA BENSSIFI
              </span>
            </div>

            {/* Layer 2: Main Solid Black Layer with 3D Flip Effect */}
            <div className="relative z-20 font-syncopate font-black text-[17px] xs:text-xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tighter text-black select-none flex justify-center whitespace-nowrap leading-none">
              <Text3DFlip
                className="text-black inline-flex justify-center"
                textClassName="text-black inline-block"
                flipTextClassName="text-black inline-block"
                rotateDirection="top"
                staggerDuration={0.025}
                staggerFrom="first"
                transition={{ type: 'spring', damping: 25, stiffness: 160 }}
                triggerKey={activeCardIndex}
              >
                OMAIMA BENSSIFI
              </Text3DFlip>
            </div>
          </div>
        </div>

        {/* Bottom Subtitle Row: Left Portfolio Label & Right Designer Title */}
        <div className="w-full max-w-5xl flex flex-row items-center justify-between text-[7px] xs:text-[8px] sm:text-xs font-syncopate font-bold tracking-wider sm:tracking-widest text-neutral-800 px-2 sm:px-6 relative z-20 mt-3 sm:mt-5">
          <span className="uppercase text-left shrink-0">PORTFOLIO · 2026</span>
          <span className="uppercase text-right shrink-0">{artist.roleTitle}</span>
        </div>
      </div>
    </section>
  );
};
