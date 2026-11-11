/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { initialArtistProfile, initialProjects, initialDesignProjects, initialPhotoVideoProjects } from './data/portfolioData';
import { initialVideos } from './data/videoData';
import { ArtistProfile, ProjectItem, PhotoVideoItem } from './types/portfolio';
import { VideoProject } from './utils/videoMath';
import { HeaderNav } from './components/HeaderNav';
import { HeroReference } from './components/HeroReference';
import { CardDeck } from './components/CardDeck';
import { WorksGrid } from './components/WorksGrid';
import { VideoSection } from './components/VideoSection';
import { PhotoVideoSection } from './components/PhotoVideoSection';
import { ServicesView } from './components/ServicesView';
import { AddVideoModal } from './components/AddVideoModal';
import { AddDesignModal } from './components/AddDesignModal';
import { ProjectModal } from './components/ProjectModal';
import { AboutDrawer } from './components/AboutDrawer';
import { ContactModal } from './components/ContactModal';
import { CustomizeDrawer } from './components/CustomizeDrawer';
import { KineticTicker } from './components/KineticTicker';
import { SlidersHorizontal, ArrowUpRight, Sparkles } from 'lucide-react';
import { wrapIndex } from './utils/deckMath';

export default function App() {
  // Artist profile state with localStorage persistence (Defaulting to Omaima Benssifi)
  const [artist, setArtist] = useState<ArtistProfile>(() => {
    try {
      const saved = localStorage.getItem('omaima_portfolio_artist');
      if (saved) {
        const parsed = JSON.parse(saved);
        const res: ArtistProfile = {
          ...initialArtistProfile,
          ...parsed,
          name: 'OmaimaBENSSIFI',
          roleTitle: initialArtistProfile.roleTitle,
          bio: initialArtistProfile.bio,
          skills: initialArtistProfile.skills,
          education: initialArtistProfile.education,
          experiences: initialArtistProfile.experiences,
          // Ensure the 3 user-specified Google Drive links are used
          videoDriveUrl: parsed.videoDriveUrl || initialArtistProfile.videoDriveUrl,
          designDriveUrl: parsed.designDriveUrl || initialArtistProfile.designDriveUrl,
          photoDriveUrl: parsed.photoDriveUrl || initialArtistProfile.photoDriveUrl,
        };
        return res;
      }
      return initialArtistProfile;
    } catch {
      return initialArtistProfile;
    }
  });

  // Color accent state (Defaulting to #75030C)
  const [accentColor, setAccentColor] = useState<string>(() => {
    try {
      return localStorage.getItem('omaima_portfolio_accent') || '#75030C';
    } catch {
      return '#75030C';
    }
  });

  // Projects for the Hero Fanned Card Deck
  const [deckProjects, setDeckProjects] = useState<ProjectItem[]>(() => {
    try {
      const saved = localStorage.getItem('omaima_portfolio_deck_cards_v4');
      if (saved) {
        return JSON.parse(saved);
      }
      return initialProjects;
    } catch {
      return initialProjects;
    }
  });

  // Dedicated Visual Design Systems (3 graphic design cards created by Omaima)
  const [designProjects, setDesignProjects] = useState<ProjectItem[]>(() => {
    try {
      const saved = localStorage.getItem('omaima_portfolio_design_systems_v4');
      if (saved) {
        return JSON.parse(saved);
      }
      return initialDesignProjects;
    } catch {
      return initialDesignProjects;
    }
  });

  // Videos state with localStorage persistence (Defaulting to the 3 real video projects)
  const [videos, setVideos] = useState<VideoProject[]>(() => {
    try {
      const saved = localStorage.getItem('omaima_portfolio_videos_v4');
      if (saved) {
        return JSON.parse(saved);
      }
      return initialVideos;
    } catch {
      return initialVideos;
    }
  });

  // Photography & Videography projects state
  const [photoVideoItems] = useState<PhotoVideoItem[]>(initialPhotoVideoProjects);

  // Deck carousel state: index 2 is the center artist card in the Pinterest reference
  const [activeIndex, setActiveIndex] = useState<number>(2);

  // Modals & Navigation state
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState<boolean>(false);
  const [isAddVideoOpen, setIsAddVideoOpen] = useState<boolean>(false);
  const [isAddDesignOpen, setIsAddDesignOpen] = useState<boolean>(false);

  const [activeView, setActiveView] = useState<'deck' | 'services' | 'about' | 'contact'>('deck');

  // Persistence handlers
  const handleUpdateArtist = (updated: ArtistProfile) => {
    setArtist(updated);
    try {
      localStorage.setItem('omaima_portfolio_artist', JSON.stringify(updated));
    } catch {}
  };

  const handleUpdateAccentColor = (color: string) => {
    setAccentColor(color);
    try {
      localStorage.setItem('omaima_portfolio_accent', color);
    } catch {}
  };

  const handleAddVideo = (newVideo: VideoProject) => {
    const updated = [newVideo, ...videos];
    setVideos(updated);
    try {
      localStorage.setItem('omaima_portfolio_videos_v4', JSON.stringify(updated));
    } catch {}
  };

  const handleDeleteVideo = (id: string) => {
    const updated = videos.filter((v) => v.id !== id);
    setVideos(updated);
    try {
      localStorage.setItem('omaima_portfolio_videos_v4', JSON.stringify(updated));
    } catch {}
  };

  const handleAddDesign = (newDesign: ProjectItem) => {
    const updated = [newDesign, ...designProjects];
    setDesignProjects(updated);
    try {
      localStorage.setItem('omaima_portfolio_design_systems_v4', JSON.stringify(updated));
    } catch {}
  };

  const handleDeleteDesign = (id: string) => {
    const updated = designProjects.filter((p) => p.id !== id);
    setDesignProjects(updated);
    try {
      localStorage.setItem('omaima_portfolio_design_systems_v4', JSON.stringify(updated));
    } catch {}
  };

  const handlePrevCard = () => {
    setActiveIndex((prev) => wrapIndex(prev - 1, deckProjects.length));
  };

  const handleNextCard = () => {
    setActiveIndex((prev) => wrapIndex(prev + 1, deckProjects.length));
  };

  const handleSelectProject = (project: ProjectItem) => {
    setSelectedProject(project);
  };

  const handleNextProjectModal = () => {
    if (!selectedProject) return;
    const currentList = designProjects.some((p) => p.id === selectedProject.id)
      ? designProjects
      : deckProjects;
    const currIdx = currentList.findIndex((p) => p.id === selectedProject.id);
    const nextIdx = wrapIndex(currIdx + 1, currentList.length);
    setSelectedProject(currentList[nextIdx]);
  };

  const handlePrevProjectModal = () => {
    if (!selectedProject) return;
    const currentList = designProjects.some((p) => p.id === selectedProject.id)
      ? designProjects
      : deckProjects;
    const currIdx = currentList.findIndex((p) => p.id === selectedProject.id);
    const prevIdx = wrapIndex(currIdx - 1, currentList.length);
    setSelectedProject(currentList[prevIdx]);
  };

  const handleNavigate = (view: 'deck' | 'services' | 'about' | 'contact') => {
    setActiveView(view);
    if (view === 'about') {
      setIsAboutOpen(true);
    } else if (view === 'contact') {
      setIsContactOpen(true);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#F3F3F3] text-[#1B1B1B] font-sans selection:bg-[#75030C] selection:text-white flex flex-col">
      {/* 3-Zone Top Navigation Bar */}
      <HeaderNav
        artist={artist}
        activeView={activeView}
        onNavigate={handleNavigate}
        onOpenCustomize={() => setIsCustomizeOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden flex flex-col items-center pt-16 sm:pt-20">
        {/* VIEW 1: Pinterest Pin Copy-Paste Deck View */}
        {activeView === 'deck' && (
          <div className="w-full max-w-full overflow-x-hidden flex flex-col items-center">
            {/* The Pinterest Reference Hero Header with Red Pillar & Brutalist PORTFOLIO */}
            <HeroReference
              artist={artist}
              accentColor={accentColor}
              onPrev={handlePrevCard}
              onNext={handleNextCard}
              activeCardIndex={activeIndex}
            />

            {/* The Pinterest Reference Fanned Card Deck with Rotary Dial */}
            <CardDeck
              projects={deckProjects}
              activeIndex={activeIndex}
              onSelectProject={handleSelectProject}
              onChangeActiveIndex={setActiveIndex}
              onOpenAbout={() => setIsAboutOpen(true)}
              accentColor={accentColor}
            />

            {/* GSAP Scroll Parallax Kinetic Divider */}
            <KineticTicker accentColor={accentColor} />

            {/* Dedicated Video Editing Showreel & Vault Section */}
            <VideoSection
              videos={videos}
              onDeleteVideo={handleDeleteVideo}
              accentColor={accentColor}
              driveUrl={artist.videoDriveUrl}
            />

            {/* Dedicated Graphic Design Systems Archive with GSAP Parallax */}
            <WorksGrid
              projects={designProjects}
              onSelectProject={handleSelectProject}
              onDeleteDesign={handleDeleteDesign}
              accentColor={accentColor}
              driveUrl={artist.designDriveUrl}
            />

            {/* Dedicated Photography and Videography Section */}
            <PhotoVideoSection
              items={photoVideoItems}
              accentColor={accentColor}
              driveUrl={artist.photoDriveUrl}
            />
          </div>
        )}

        {/* VIEW 2: Dedicated Services Page */}
        {activeView === 'services' && (
          <ServicesView
            artist={artist}
            accentColor={accentColor}
            onOpenContact={() => setIsContactOpen(true)}
          />
        )}

        {/* VIEW 5: About View (fallback if modal closed) */}
        {activeView === 'about' && (
          <div className="w-full max-w-5xl mx-auto px-4 py-16 text-center">
            <h1 className="font-syncopate text-3xl font-black uppercase mb-4">
              About {artist.name}
            </h1>
            <p className="max-w-2xl mx-auto text-neutral-600 mb-8 font-sans leading-relaxed">
              {artist.bio}
            </p>
            <button
              onClick={() => setIsAboutOpen(true)}
              className="px-6 py-3 bg-[#1B1B1B] text-[#F3F3F3] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#75030C] transition-colors cursor-pointer"
            >
              Open Full Profile Experience
            </button>
          </div>
        )}

        {/* VIEW 5: Contact View (fallback if modal closed) */}
        {activeView === 'contact' && (
          <div className="w-full max-w-3xl mx-auto px-4 py-16 text-center">
            <h1 className="font-syncopate text-3xl font-black uppercase mb-4">
              Get In Touch
            </h1>
            <p className="text-neutral-600 mb-8 font-sans">
              Currently accepting selected commercial video editing and brand design direction projects.
            </p>
            <button
              onClick={() => setIsContactOpen(true)}
              className="px-6 py-3 bg-[#1B1B1B] text-[#F3F3F3] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#75030C] transition-colors cursor-pointer"
            >
              Open Commission Form
            </button>
          </div>
        )}
      </main>

      {/* Floating Instant Customize Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsCustomizeOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 bg-[#1B1B1B] text-[#F3F3F3] rounded-full shadow-2xl hover:bg-[#75030C] transition-all duration-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-black border border-white/20"
          aria-label="Customize profile and content"
          title="Modify text, name, title or accent colors"
        >
          <SlidersHorizontal className="w-4 h-4 text-[#75030C] group-hover:text-white transition-colors" />
          <span className="font-syncopate text-[11px] font-bold tracking-wider uppercase">
            Modify Content
          </span>
        </button>
      </div>

      {/* Clean Footer (Anti-Slop Compliant) */}
      <footer className="w-full border-t border-[#1B1B1B]/10 bg-[#e8e8e8] py-8 text-[#1B1B1B]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium">
          <div className="flex items-center gap-3">
            <span className="font-syncopate font-bold text-neutral-900 tracking-wider">
              {artist.name}
            </span>
            <span aria-hidden="true" className="text-neutral-400">·</span>
            <span className="font-mono text-neutral-500">
              © {new Date().getFullYear()} Studio All Rights Reserved
            </span>
          </div>

          <div className="flex items-center gap-6 font-semibold uppercase tracking-wider text-[11px]">
            {artist.socials.map((soc, idx) => (
              <a
                key={idx}
                href={soc.url}
                target="_blank"
                rel="noreferrer"
                className="hover:text-black transition-colors"
              >
                {soc.platform}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onNext={handleNextProjectModal}
        onPrev={handlePrevProjectModal}
        onOpenContact={() => setIsContactOpen(true)}
        accentColor={accentColor}
      />

      <AboutDrawer
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        artist={artist}
        onOpenContact={() => setIsContactOpen(true)}
        accentColor={accentColor}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        artist={artist}
      />

      <CustomizeDrawer
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        artist={artist}
        onUpdateArtist={handleUpdateArtist}
        accentColor={accentColor}
        onUpdateAccentColor={handleUpdateAccentColor}
      />

      <AddVideoModal
        isOpen={isAddVideoOpen}
        onClose={() => setIsAddVideoOpen(false)}
        onAddVideo={handleAddVideo}
        accentColor={accentColor}
      />

      <AddDesignModal
        isOpen={isAddDesignOpen}
        onClose={() => setIsAddDesignOpen(false)}
        onAddDesign={handleAddDesign}
        accentColor={accentColor}
      />
    </div>
  );
}
