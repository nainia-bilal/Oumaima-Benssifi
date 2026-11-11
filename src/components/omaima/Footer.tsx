import React from 'react';
import { OmaimaProfile } from '../../types/omaima';

interface FooterProps {
  profile: OmaimaProfile;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, onNavigate }) => {
  return (
    <footer className="bg-[#111111] py-10 text-center border-t border-[#333] text-neutral-400 text-sm">
      <div className="max-w-[1200px] mx-auto px-5">
        <p className="mb-2">
          &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <p className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-neutral-500">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-[#e63946] transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>|</span>
          <button
            onClick={() => onNavigate('skills')}
            className="hover:text-[#e63946] transition-colors cursor-pointer"
          >
            Skills
          </button>
          <span>|</span>
          <button
            onClick={() => onNavigate('experiences')}
            className="hover:text-[#e63946] transition-colors cursor-pointer"
          >
            Experiences
          </button>
          <span>|</span>
          <button
            onClick={() => onNavigate('education')}
            className="hover:text-[#e63946] transition-colors cursor-pointer"
          >
            Education
          </button>
          <span>|</span>
          <button
            onClick={() => onNavigate('videos')}
            className="hover:text-[#e63946] transition-colors cursor-pointer"
          >
            Videos
          </button>
          <span>|</span>
          <button
            onClick={() => onNavigate('designs')}
            className="hover:text-[#e63946] transition-colors cursor-pointer"
          >
            Designs
          </button>
          <span>|</span>
          <button
            onClick={() => onNavigate('contact')}
            className="hover:text-[#e63946] transition-colors cursor-pointer"
          >
            Contact
          </button>
        </p>
      </div>
    </footer>
  );
};
