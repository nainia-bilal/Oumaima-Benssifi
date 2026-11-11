import React from 'react';
import {
  Film,
  Palette,
  Camera,
  Compass,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  Clock,
  Sparkles,
  Layers,
  Sliders,
  Send,
  Download,
  FolderOpen,
} from 'lucide-react';
import { ArtistProfile } from '../types/portfolio';

interface ServicesViewProps {
  artist: ArtistProfile;
  accentColor: string;
  onOpenContact: () => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({
  artist,
  accentColor,
  onOpenContact,
}) => {
  const services = [
    {
      id: 'video-editing',
      number: '01',
      title: 'CINEMATIC VIDEO EDITING & REELS',
      category: 'POST-PRODUCTION & COLOR',
      icon: Film,
      summary:
        'High-retention commercial spots, social 9:16 reels, fashion films, and music videos. Built with frame-accurate pacing, custom sound design, and DaVinci Resolve color grading.',
      deliverables: [
        '16:9 DCI 4K Commercial Master Cuts (.MOV ProRes / H.265)',
        '9:16 Vertical High-Retention Social Reels & TikTok Cuts',
        'Advanced DaVinci Resolve Color Grading (Log / RAW Kodachrome LUTs)',
        'Bespoke Sound Design, Foley Stems & Audio Normalization',
        'Project Timelines & Archives (.drp / Premiere .prproj / XML)',
      ],
      software: ['Premiere Pro', 'DaVinci Resolve Studio', 'After Effects', 'Final Cut Pro'],
      turnaround: '3–5 Business Days',
      driveUrl: artist.videoDriveUrl || 'https://drive.google.com/drive/folders/19_fjUGQFFMsMGWJJIxu80ObI9m0M2TMf',
      driveLabel: 'Video & Reels Drive Vault',
    },
    {
      id: 'graphic-design',
      number: '02',
      title: 'VISUAL DESIGN & BRAND SYSTEMS',
      category: 'IDENTITY & EDITORIAL',
      icon: Palette,
      summary:
        'Modernist, brutalist, and minimalist brand systems engineered for timeless impact. From geometric identity totems to comprehensive Figma design libraries and print packaging.',
      deliverables: [
        'Complete Brand Identity Guidelines Book (PDF & Figma)',
        'Scalable Vector Emblem & Logo Packages (AI, SVG, EPS, PDF)',
        'Modernist Typography Hierarchies & Layout Grids',
        'Lookbooks, Monograph Books & Editorial Print Collateral',
        'Digital Social Media Toolkits & High-Res Brand Templates',
      ],
      software: ['Adobe Illustrator', 'Figma', 'Adobe InDesign', 'Canva Pro', 'Photoshop'],
      turnaround: '5–10 Business Days',
      driveUrl: artist.designDriveUrl || 'https://drive.google.com/drive/folders/1CxPOrgybiVb_2jDhFJA9WOmLSdo_6QHy',
      driveLabel: 'Design & Vector Drive Vault',
    },
    {
      id: 'photography-videography',
      number: '03',
      title: 'PHOTOGRAPHY & VIDEOGRAPHY',
      category: 'ON-LOCATION & STUDIO PRODUCTION',
      icon: Camera,
      summary:
        'On-location cinematic captures, natural light fashion portraiture, High Atlas mountain expeditions, and controlled studio still-life lighting for global visual campaigns.',
      deliverables: [
        'Full-Resolution 14-Bit Uncompressed RAW DNG Master Captures',
        '16-Bit Master Color-Graded TIFFs & Calibrated High-Res JPEGs',
        '4K / 8K RAW Cinema Takes & Anamorphic B-Roll Rushes',
        'Aerial & Drone High-Altitude Cinematography (10-bit D-Log)',
        'Macro Studio Lighting & Tactile Stills under Precision Fresnels',
      ],
      software: ['Sony FX3', 'DJI Inspire 3 8K', 'Hasselblad X2D 100C', '85mm f/1.4 GM', 'DaVinci RAW'],
      turnaround: '4–7 Business Days',
      driveUrl: artist.photoDriveUrl || 'https://drive.google.com/drive/folders/1G0wPH9P9sbOtdCVS3DwDKe0XBB5UvZoa',
      driveLabel: 'Photo & Video RAW Drive Vault',
    },
    {
      id: 'creative-direction',
      number: '04',
      title: 'CREATIVE DIRECTION & CURATION',
      category: 'STRATEGY & ART DIRECTION',
      icon: Compass,
      summary:
        'Holistic artistic guidance, pacing supervision, moodboard sequencing, and visual consistency direction across digital platforms and physical activations.',
      deliverables: [
        'Visual Direction Treatments & Moodboard Curation',
        'Pacing & Editing Shotlist Architecture',
        'Cross-Platform Visual Brand Cohesion Audits',
        'Asset Master Formatting & Archive Management',
      ],
      software: ['Creative Strategy', 'Treatment Decks', 'Color Theory', 'Frame Timing'],
      turnaround: 'Custom Timeline',
      driveUrl: artist.videoDriveUrl || 'https://drive.google.com/drive/folders/19_fjUGQFFMsMGWJJIxu80ObI9m0M2TMf',
      driveLabel: 'Creative Portfolio Archive',
    },
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'DISCOVERY & VISION',
      desc: 'Initial brief, creative references, technical specs (resolution, frame rate, aspect ratio), and project roadmap alignment.',
    },
    {
      step: '02',
      title: 'ASSEMBLY & DRAFT',
      desc: 'First assembly cut, vector geometry layout, or lighting treatment provided for rapid collaborative feedback.',
    },
    {
      step: '03',
      title: 'COLOR & POLISH',
      desc: 'Fine-tuning rhythm, DaVinci Resolve color grading, audio foley mixing, typographic kerning, and micro-animations.',
    },
    {
      step: '04',
      title: 'MASTER ARCHIVE',
      desc: 'Uncompressed ProRes/RAW masters, editable source files, and web-ready assets uploaded directly to your dedicated Google Drive.',
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-in fade-in duration-300">
      {/* Top Banner Header */}
      <div className="mb-14 pb-8 border-b border-[#1B1B1B]/10">
        <div className="flex items-center gap-2 mb-3">
          <span
            className="font-mono text-xs font-bold tracking-widest uppercase flex items-center gap-2"
            style={{ color: accentColor }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>COMMISSION OFFERINGS & DISCIPLINARY CATALOG</span>
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <h1 className="font-syncopate text-3xl sm:text-5xl font-black tracking-tight text-[#1B1B1B] uppercase leading-tight">
              SERVICES & DISCIPLINES
            </h1>
            <p className="text-sm sm:text-base text-neutral-600 max-w-3xl mt-3 font-sans leading-relaxed">
              End-to-end creative post-production, modernist graphic design systems, and on-location photography & videography. Specialized in delivering uncompressed master deliverables with speed, precision, and cinematic distinction.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenContact}
              className="flex items-center gap-2 px-5 py-3 bg-[#1B1B1B] hover:bg-[#75030C] text-[#F3F3F3] rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
            >
              <span>Book A Service</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Services Grid (4 Pillars) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {services.map((srv) => {
          const Icon = srv.icon;
          return (
            <div
              key={srv.id}
              className="group relative bg-white/80 hover:bg-white rounded-3xl p-6 sm:p-8 border border-black/10 hover:border-[#75030C] transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Top Strip */}
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm"
                      style={{ backgroundColor: '#1B1B1B' }}
                    >
                      <Icon className="w-5 h-5 group-hover:text-[#75030C] transition-colors" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-neutral-400 tracking-widest uppercase block">
                        {srv.category}
                      </span>
                      <span className="font-mono text-xs font-bold text-[#75030C]">
                        SERVICE {srv.number}
                      </span>
                    </div>
                  </div>

                  <span className="font-mono text-[11px] text-neutral-500 bg-black/5 px-2.5 py-1 rounded-md">
                    {srv.turnaround}
                  </span>
                </div>

                {/* Service Title & Summary */}
                <h2 className="font-syncopate text-base sm:text-lg font-black tracking-tight text-[#1B1B1B] group-hover:text-[#75030C] transition-colors uppercase mb-2.5">
                  {srv.title}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6 font-sans">
                  {srv.summary}
                </p>

                {/* Deliverables Checklist */}
                <div className="mb-6">
                  <span className="font-mono text-[11px] font-bold text-neutral-700 tracking-wider uppercase block mb-3">
                    Key Deliverables:
                  </span>
                  <ul className="space-y-2">
                    {srv.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#75030C] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Footer: Tools & Drive Vault Link */}
              <div className="pt-4 border-t border-black/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1 text-[10px] font-mono text-neutral-500">
                  {srv.software.map((tool, idx) => (
                    <span key={idx} className="bg-black/5 px-2 py-0.5 rounded">
                      {tool}
                    </span>
                  ))}
                </div>

                <a
                  href={srv.driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#75030C] hover:text-black transition-colors shrink-0 group/link"
                >
                  <FolderOpen className="w-3.5 h-3.5" />
                  <span>{srv.driveLabel}</span>
                  <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Collaboration Workflow: 4-Step Process */}
      <div className="bg-[#1B1B1B] text-[#F3F3F3] rounded-3xl p-8 sm:p-12 mb-16 shadow-xl border border-white/10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="font-mono text-xs font-bold text-[#75030C] tracking-widest uppercase">
            COLLABORATION PROTOCOL
          </span>
          <h2 className="font-syncopate text-2xl sm:text-3xl font-black tracking-tight text-white uppercase mt-1">
            HOW WE WORK TOGETHER
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2 font-sans">
            A frictionless, milestone-driven production pipeline that guarantees creative accuracy, rapid iterations, and pristine master deliverables.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {workflowSteps.map((ws, idx) => (
            <div
              key={idx}
              className="relative p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between"
            >
              <div>
                <span className="font-syncopate text-xl font-black text-[#75030C] block mb-2">
                  {ws.step}
                </span>
                <h3 className="font-syncopate text-xs font-bold text-white tracking-wider uppercase mb-2">
                  {ws.title}
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                  {ws.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA Card */}
      <div className="bg-gradient-to-r from-[#1B1B1B] via-[#240306] to-[#1B1B1B] text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-[#75030C]/40 shadow-xl">
        <div>
          <span className="font-mono text-xs text-[#75030C] font-bold tracking-widest uppercase">
            COMMISSIONS & INQUIRIES
          </span>
          <h2 className="font-syncopate text-xl sm:text-3xl font-black tracking-tight text-white uppercase mt-1">
            HAVE A PROJECT IN MIND?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 mt-2 max-w-xl font-sans">
            Available for selected freelance video editing, brand identity design systems, and photography shoots across Morocco and international clients.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <button
            onClick={onOpenContact}
            className="w-full sm:w-auto px-6 py-3.5 bg-[#75030C] hover:bg-[#8F0410] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg cursor-pointer"
          >
            Start A Commission
          </button>
          <a
            href={`mailto:${artist.email}`}
            className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all border border-white/20 text-center"
          >
            Direct Email
          </a>
        </div>
      </div>
    </div>
  );
};
