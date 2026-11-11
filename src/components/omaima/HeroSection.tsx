import React from 'react';
import { Play, Sparkles, ArrowRight, Download } from 'lucide-react';
import { OmaimaProfile } from '../../types/omaima';

interface HeroSectionProps {
  profile: OmaimaProfile;
  onNavigate: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ profile, onNavigate }) => {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] pt-32 pb-20 flex items-center justify-center bg-gradient-to-b from-[#1a1a1a] via-[#1a1a1a] to-[#2b2b2b] overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#e63946]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#c1121f]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1200px] w-full mx-auto px-5 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Left Column: Text & CTAs */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-white leading-tight mb-3">
              Hi, I'm{' '}
              <span className="text-[#e63946] font-extrabold drop-shadow-[0_0_25px_rgba(230,57,70,0.5)]">
                {profile.name}
              </span>
            </h1>

            <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-semibold text-neutral-300 mb-6">
              {profile.title}
            </h2>

            <p className="text-base sm:text-lg text-neutral-300 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed font-sans">
              {profile.bio}
            </p>

            {/* CTAs matching Omaima Benssifi button designs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => onNavigate('contact')}
                className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-white bg-[#e63946] hover:bg-[#c1121f] transition-all duration-300 transform hover:-translate-y-1 shadow-[0_10px_25px_rgba(230,57,70,0.35)] cursor-pointer overflow-hidden"
              >
                <span className="relative z-10">Let's Connect</span>
                <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
                <span className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>

              <button
                onClick={() => onNavigate('videos')}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-[#e63946] hover:text-white bg-transparent hover:bg-[#e63946] border-2 border-[#e63946] transition-all duration-300 transform hover:-translate-y-1 shadow-[0_5px_15px_rgba(0,0,0,0.3)] cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Watch Showreel</span>
              </button>

              <button
                onClick={() => onNavigate('designs')}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-neutral-300 hover:text-white bg-[#2b2b2b] hover:bg-[#333] border border-white/10 transition-all duration-300 cursor-pointer"
              >
                <span>View Designs</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Image with glowing red ring animation */}
          <div className="flex-1 flex justify-center items-center">
            <div className="relative">
              {/* Outer pulsing red accent ring */}
              <div className="absolute -inset-3 rounded-full border-2 border-[#e63946] avatar-ring pointer-events-none" />

              {/* Glowing container */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden avatar-glow border-4 border-[#e63946]/80 bg-[#2b2b2b]">
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  onError={(e) => {
                    // Fallback to local asset
                    e.currentTarget.src = '//Oumaima.jpg';
                  }}
                  className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                />
              </div>

              {/* Floating verified badge */}
              <div className="absolute bottom-4 right-4 bg-[#2b2b2b]/95 border border-[#e63946] px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-2 text-xs font-semibold text-white">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4caf50] animate-pulse" />
                <span>Available for Projects</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
