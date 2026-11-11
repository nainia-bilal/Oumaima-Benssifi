import React, { useState, useRef, useEffect } from 'react';
import { ProjectItem } from '../types/portfolio';
import { filterProjects } from '../utils/deckMath';
import { Trash2, Maximize2, ArrowUpRight, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface WorksGridProps {
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
  onAddDesignClick?: () => void;
  onDeleteDesign?: (id: string) => void;
  accentColor: string;
  driveUrl?: string;
}

export const WorksGrid: React.FC<WorksGridProps> = ({
  projects,
  onSelectProject,
  onDeleteDesign,
  accentColor,
  driveUrl = 'https://drive.google.com/drive/folders/omaima-benssifi-design-archive',
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'all', label: 'All Designs' },
    { id: 'brand', label: 'Brand & Campaigns' },
    { id: 'poster', label: 'Social & Posters' },
  ];

  const filtered = filterProjects(projects, activeCategory);
  const displayItems = filtered.length > 0 ? filtered : projects;

  // GSAP ScrollTrigger for Parallax Entrance & Staggered Cards
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Header fade-up with parallax momentum
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 2. Parallax column drift across the grid as user scrolls (Desktop only to prevent mobile lag)
      if (window.innerWidth >= 768 && gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.parallax-card');
        cards.forEach((card, i) => {
          // Columns 0, 1, 2 have distinct subtle parallax scroll velocities
          const col = i % 3;
          const yShift = col === 1 ? -35 : col === 2 ? 30 : -10;

          gsap.fromTo(
            card,
            { y: col === 1 ? 25 : col === 2 ? -20 : 0 },
            {
              y: yShift,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <section
      id="design-archive"
      ref={sectionRef}
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20"
      aria-label="Graphic Design and Visual Identity Archive"
    >
      {/* Section Header with GSAP Ref */}
      <div
        ref={headerRef}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-[#1B1B1B]/10 will-change-transform"
      >
        <div>
          <span
            className="font-mono text-xs font-bold tracking-widest uppercase"
            style={{ color: accentColor }}
          >
            GRAPHIC DESIGNER ARCHIVE
          </span>
          <h2 className="font-syncopate text-2xl sm:text-4xl font-black tracking-tight text-[#1B1B1B] mt-1 uppercase">
            VISUAL DESIGN SYSTEMS
          </h2>
        </div>
      </div>

      {/* Categories Filter Tabs */}
      <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
        <div className="flex items-center gap-1.5 p-1 bg-black/5 rounded-xl flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-[#1B1B1B] text-[#F3F3F3] shadow-xs'
                  : 'text-[#1B1B1B]/70 hover:text-[#1B1B1B] hover:bg-black/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <span className="text-xs font-mono text-neutral-500">
          Showing {Math.min(displayItems.length, 3)} Designs + Google Drive Archive
        </span>
      </div>

      {/* Projects Grid with GSAP Parallax Ref: 3 Projects + 1 Google Drive Card */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {displayItems.slice(0, 3).map((project) => (
          <div
            key={project.id}
            onClick={() => onSelectProject(project)}
            className="parallax-card will-change-transform group relative bg-white/70 hover:bg-white rounded-2xl overflow-hidden border border-black/10 hover:border-black/30 transition-shadow duration-300 shadow-xs hover:shadow-xl cursor-pointer flex flex-col"
          >
            {/* Project Media Container - 4:5 vertical poster format with object-top */}
            <div className="relative aspect-[4/5] w-full bg-neutral-900 overflow-hidden">
              {project.coverImage ? (
                <img
                  src={project.coverImage}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                /* Emblem vector container */
                <div
                  className="w-full h-full flex flex-col items-center justify-center p-6"
                  style={{ backgroundColor: accentColor }}
                >
                  <svg
                    viewBox="0 0 100 100"
                    className="w-24 h-24 drop-shadow-md"
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
                </div>
              )}

              {/* Top Left Badge code */}
              {project.badgeCode && (
                <div className="absolute top-3 left-3 pointer-events-none z-10">
                  <span className="font-mono text-[9px] font-bold text-white bg-black/75 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/20 shadow-xs">
                    {project.badgeCode}
                  </span>
                </div>
              )}

              {/* Hover Badge */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="p-2 rounded-full bg-black/70 backdrop-blur-xs text-white flex items-center justify-center">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                {/* Metadata: Clean unboxed text with dot separator */}
                <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono uppercase tracking-wider mb-2">
                  <span>{project.categoryLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.year}</span>
                </div>

                <h3 className="font-syncopate text-base font-black tracking-tight text-[#1B1B1B] group-hover:text-[#75030C] transition-colors line-clamp-1 uppercase">
                  {project.title}
                </h3>

                <p className="font-heading text-xs text-neutral-600 font-semibold mt-1">
                  {project.subtitle}
                </p>

                <p className="text-xs text-neutral-600 mt-2 line-clamp-2 leading-relaxed">
                  {project.summary}
                </p>
              </div>

              {/* Bottom Tools Tag */}
              <div className="mt-4 pt-3 border-t border-[#1B1B1B]/5 flex items-center justify-between text-xs text-neutral-500 font-mono">
                <span className="line-clamp-1">{project.tools.slice(0, 2).join(' · ')}</span>
                <span className="font-bold text-[#1B1B1B]">{project.client}</span>
              </div>
            </div>
          </div>
        ))}

        {/* 4th Card: Dedicated Google Drive Design & Visual Systems Vault Card */}
        <div className="parallax-card will-change-transform group relative bg-[#1B1B1B] text-[#F3F3F3] rounded-2xl overflow-hidden border border-[#75030C]/40 hover:border-[#75030C] transition-all duration-300 shadow-lg hover:shadow-2xl flex flex-col justify-between">
          {/* Visual Header Banner - 4:5 aspect ratio */}
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
                {/* Modernist Duo-Tone Google Drive Shapes */}
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
                GOOGLE DRIVE DESIGN VAULT
              </span>
            </div>
          </div>

          {/* Info Body */}
          <div className="p-5 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-[#F3F3F3]/60 uppercase tracking-widest mb-1.5">
                <span>BRAND ARCHIVE</span>
                <span aria-hidden="true">·</span>
                <span className="text-white font-bold">+24 MORE DESIGNS</span>
              </div>

              <h3 className="font-syncopate text-sm sm:text-base font-black tracking-tight text-white group-hover:text-[#F3F3F3] transition-colors uppercase">
                COMPLETE DESIGN ARCHIVE
              </h3>

              <p className="font-heading text-xs text-neutral-300 font-semibold mt-1">
                Vector Systems & Guidelines
              </p>

              <p className="text-xs text-[#F3F3F3]/80 mt-2 leading-relaxed">
                Full repository containing editable Figma design systems, Illustrator (.ai) vector assets, brand guidelines PDF, and print-ready packages.
              </p>

              {/* Deliverable Tags */}
              <div className="mt-3 flex flex-wrap gap-1 text-[10px] font-mono text-[#F3F3F3]/70">
                <span className="px-1.5 py-0.5 rounded bg-white/10">Vector .AI / .EPS</span>
                <span className="px-1.5 py-0.5 rounded bg-white/10">Figma UI Systems</span>
                <span className="px-1.5 py-0.5 rounded bg-white/10">Brand Book PDF</span>
              </div>
            </div>

            {/* Call to action button */}
            <div className="mt-4 pt-3 border-t border-white/10">
              <a
                href={driveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-[#75030C] hover:bg-[#8F0410] active:scale-[0.98] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md group/btn cursor-pointer"
                aria-label="Open Omaima's complete design Google Drive archive"
              >
                <span>Open Design Drive</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
