import React, { useState } from 'react';
import { Plus, ArrowUpRight, ExternalLink, Sparkles, Eye, Layers } from 'lucide-react';
import { DesignProject } from '../../types/omaima';

interface DesignArchiveSectionProps {
  designs: DesignProject[];
  onSelectDesign: (design: DesignProject) => void;
  onAddDesignClick: () => void;
  onDeleteDesign?: (id: string) => void;
}

export const DesignArchiveSection: React.FC<DesignArchiveSectionProps> = ({
  designs,
  onSelectDesign,
  onAddDesignClick,
  onDeleteDesign,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Designs' },
    { id: 'brand', label: 'Brand Identity' },
    { id: 'poster', label: 'Marketing Kits & Posters' },
    { id: 'editorial', label: 'Editorial & Campaigns' },
  ];

  const filtered =
    activeCategory === 'all'
      ? designs
      : designs.filter((d) => d.category === activeCategory);

  return (
    <section id="designs" className="py-24 bg-[#2b2b2b] text-white">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-[#3a3a3a]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#e63946] animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-widest text-[#e63946] uppercase">
                GRAPHIC DESIGN & VISUAL SYSTEMS
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-white mb-2">
              Graphic <span className="text-[#e63946]">Design Archive</span>
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base max-w-xl font-sans">
              Bespoke brand identity architectures, high-impact marketing kits, editorial typography monographs, and multi-channel campaign collateral.
            </p>
          </div>

          {/* Action: Add Design */}
          <button
            onClick={onAddDesignClick}
            className="group flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-[#e63946] hover:bg-[#c1121f] text-white transition-all shadow-[0_5px_20px_rgba(230,57,70,0.35)] hover:-translate-y-0.5 cursor-pointer self-start md:self-end"
          >
            <Plus className="w-4 h-4" />
            <span>Add Design Project</span>
          </button>
        </div>

        {/* Categories Filter Tabs */}
        <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
          <div className="flex items-center gap-2 p-1.5 bg-[#1a1a1a] rounded-xl flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-[#e63946] text-white shadow-md'
                    : 'text-neutral-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <span className="text-xs font-mono text-neutral-400">
            Showing {filtered.length} Design Systems
          </span>
        </div>

        {/* Design Cards Grid styled strictly like omaimabenssifi.vercel.app .project-card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="group bg-[#1a1a1a] rounded-xl p-6 sm:p-8 border-l-4 border-[#e63946] shadow-[0_5px_15px_rgba(0,0,0,0.25)] hover:shadow-[0_15px_30px_rgba(230,57,70,0.25)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Media Image Banner */}
                <div
                  onClick={() => onSelectDesign(project)}
                  className="relative aspect-16/9 w-full rounded-lg overflow-hidden bg-neutral-900 mb-6 cursor-pointer"
                >
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 rounded-full bg-[#e63946] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Case Study</span>
                    </span>
                  </div>
                </div>

                {/* Project Header */}
                <div className="mb-3">
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-1 group-hover:text-[#e63946] transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-heading text-sm font-semibold text-[#e63946]">
                    {project.subtitle}
                  </p>
                </div>

                {/* Project Description */}
                <p className="text-neutral-300 text-sm leading-relaxed mb-6 font-sans">
                  {project.description}
                </p>

                {/* Skill Tags matching .skill-tag */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3 py-1 rounded-md text-xs font-semibold bg-[#2b2b2b] text-neutral-200 border border-[#e63946]/30 group-hover:border-[#e63946] group-hover:bg-[#e63946]/15 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons (.project-btn) */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <button
                  onClick={() => onSelectDesign(project)}
                  className="relative overflow-hidden group/btn flex-1 py-3 px-5 rounded-lg text-center font-semibold text-sm text-white bg-[#e63946] hover:bg-transparent hover:text-[#e63946] border-2 border-[#e63946] transition-all duration-300 shadow-[0_5px_15px_rgba(230,57,70,0.3)] cursor-pointer"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span>View Project</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                  <span className="absolute inset-0 bg-white/15 transform -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                </button>

                {project.externalUrl && (
                  <a
                    href={project.externalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-lg bg-[#2b2b2b] hover:bg-[#333] text-neutral-300 hover:text-white border border-white/10 transition-colors"
                    title="Open external project link"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
