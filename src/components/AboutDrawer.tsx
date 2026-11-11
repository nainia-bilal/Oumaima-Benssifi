import React from 'react';
import { X, ArrowUpRight, Award, Mail, MapPin, GraduationCap, Briefcase, Sparkles, CheckCircle2 } from 'lucide-react';
import { ArtistProfile } from '../types/portfolio';

interface AboutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  artist: ArtistProfile;
  onOpenContact: () => void;
  accentColor: string;
}

export const AboutDrawer: React.FC<AboutDrawerProps> = ({
  isOpen,
  onClose,
  artist,
  onOpenContact,
  accentColor,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] bg-[#f2f2f4] text-neutral-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-black/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/60 hover:bg-black text-white transition-colors cursor-pointer"
          aria-label="Close profile drawer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Portrait & Badge */}
        <div className="w-full md:w-5/12 relative min-h-[280px] md:min-h-full bg-neutral-900 overflow-hidden shrink-0">
  <img
    src={artist.avatarImage || '/Omaimajpg'}
    alt={artist.name}
    referrerPolicy="no-referrer"
    className="w-full h-full object-cover object-top filter contrast-105"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30" />

          {/* Badge at top left */}
          <div className="absolute top-5 left-5">
            <span className="font-syncopate text-[10px] font-bold tracking-widest text-white/90 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-sm border border-white/20 uppercase">
              ME • DVS X2K4
            </span>
          </div>

          {/* Bottom tag info */}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h3 className="font-syncopate text-lg font-black tracking-tight uppercase">
              {artist.name}
            </h3>
            <p className="font-mono text-xs text-neutral-300 mt-1 uppercase tracking-wider">
              {artist.roleTitle}
            </p>
            <div className="flex items-center gap-2 mt-2 text-xs text-neutral-400">
              <MapPin className="w-3.5 h-3.5 text-[#75030C]" />
              <span>{artist.location}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Bio, Skills, Education & Experience */}
        <div className="w-full md:w-7/12 p-6 sm:p-8 overflow-y-auto max-h-[60vh] md:max-h-[92vh] flex flex-col justify-between">
          <div className="space-y-6">
            {/* Header / Intro */}
            <div>
              <span className="font-mono text-xs text-[#75030C] font-bold tracking-widest uppercase">
                ABOUT ME
              </span>
              <h2
                id="about-title"
                className="font-syncopate text-lg sm:text-xl font-black tracking-tight text-neutral-900 mt-1 uppercase"
              >
                {artist.roleTitle}
              </h2>
            </div>

            {/* Formatted Bio Paragraphs */}
            <div className="space-y-3 text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans">
              <p>
                I am <strong className="text-neutral-900 font-semibold">OmaimaBenssifi</strong>, a Junior Digital Marketer and Content Creator specializing in Social Media Management, Graphic Design, Video Editing, Photography and Videography.
              </p>
              <p>
                I am passionate about digital communication, creative storytelling and visual content. I enjoy transforming ideas into engaging content and creating visual experiences that connect brands with their audiences.
              </p>
              <p className="text-neutral-800 font-medium italic">
                "My goal is to combine creativity and strategy to deliver meaningful digital experiences."
              </p>
            </div>

            {/* 03. Skills */}
            <div className="pt-4 border-t border-black/10">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-syncopate text-xs font-bold text-[#75030C]">03.</span>
                <h4 className="font-syncopate text-xs font-bold uppercase tracking-wider text-neutral-900">
                  Skills
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  'Social Media Management',
                  'Digital Marketing Strategy',
                  'Content Creation',
                  'Graphic Design',
                  'Photography & Videography',
                  'Video Editing',
                ].map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-black/10 shadow-2xs text-xs font-medium text-neutral-800"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#75030C] shrink-0" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 04. Education & Training */}
            <div className="pt-4 border-t border-black/10">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-syncopate text-xs font-bold text-[#75030C]">04.</span>
                <h4 className="font-syncopate text-xs font-bold uppercase tracking-wider text-neutral-900">
                  Education & Training
                </h4>
              </div>
              <div className="space-y-2.5">
                {[
                  {
                    title: 'Baccalaureate (High School Diploma)',
                    place: 'Bouskoura, Morocco',
                  },
                  {
                    title: 'University Studies – Economics (1 Year)',
                    place: 'Casablanca, Morocco',
                  },
                  {
                    title: 'Technician Diploma in Accounting (2 Years)',
                    place: 'OFPPT, Casablanca, Morocco',
                  },
                  {
                    title: 'Digital Marketing & Content Creation',
                    place: 'Nouaceur Wings Tech, Jadara Foundation, Casablanca, Morocco',
                  },
                ].map((edu, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white rounded-xl border border-black/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs"
                  >
                    <div className="flex items-start gap-2.5">
                      <GraduationCap className="w-4 h-4 text-[#75030C] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-neutral-900 block sm:inline">
                          {edu.title}
                        </span>
                        <span className="text-neutral-500 text-[11px] block sm:inline sm:ml-2">
                          — {edu.place}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 05. Professional Experience */}
            <div className="pt-4 border-t border-black/10">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-syncopate text-xs font-bold text-[#75030C]">05.</span>
                <h4 className="font-syncopate text-xs font-bold uppercase tracking-wider text-neutral-900">
                  Professional Experience
                </h4>
              </div>
              <div className="space-y-2.5">
                {[
                  {
                    role: 'Administrative & Accounting Assistant Intern',
                    company: 'Coselec',
                    duration: '1 Month',
                  },
                  {
                    role: 'Administrative & Accounting Assistant Intern',
                    company: 'Gillmann',
                    duration: '2 Months',
                  },
                  {
                    role: 'Social Media Manager Intern',
                    company: 'Jadara Foundation',
                    duration: '3 Months',
                  },
                ].map((exp, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white rounded-xl border border-black/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs"
                  >
                    <div className="flex items-start gap-2.5">
                      <Briefcase className="w-4 h-4 text-[#75030C] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-neutral-900 block sm:inline">
                          {exp.role}
                        </span>
                        <span className="text-neutral-600 font-semibold block sm:inline sm:ml-2">
                          {exp.company}
                        </span>
                      </div>
                    </div>
                    <span className="font-mono text-[11px] font-bold text-[#75030C] bg-[#75030C]/10 px-2 py-0.5 rounded shrink-0 self-start sm:self-auto">
                      {exp.duration}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="p-3.5 rounded-xl bg-black/5 border border-black/10 text-xs text-neutral-700 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <span>{artist.availability}</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-8 pt-4 border-t border-black/10 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold tracking-wider uppercase text-white bg-black hover:bg-[#75030C] rounded-xl transition-colors cursor-pointer"
            >
              <span>Get In Touch</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <a
              href={`mailto:${artist.email}`}
              className="flex items-center gap-2 py-3 px-4 text-xs font-bold tracking-wider uppercase text-neutral-800 bg-white hover:bg-neutral-100 border border-black/15 rounded-xl transition-colors cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Direct Email</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
