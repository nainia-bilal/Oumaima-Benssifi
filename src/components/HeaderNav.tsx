import React, { useState, useEffect } from 'react';
import { SlidersHorizontal, ArrowUpRight, Menu, X, ChevronRight, Mail, Phone } from 'lucide-react';
import { ArtistProfile } from '../types/portfolio';

interface HeaderNavProps {
  artist: ArtistProfile;
  activeView: 'deck' | 'services' | 'about' | 'contact';
  onNavigate: (view: 'deck' | 'services' | 'about' | 'contact') => void;
  onOpenCustomize: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  artist,
  activeView,
  onNavigate,
  onOpenCustomize,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Throttled passive scroll listener to avoid layout thrashing
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 20;
          setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-collapse when resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isExpanded) {
        setIsExpanded(false);
      }
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [isExpanded]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExpanded) {
        setIsExpanded(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded]);

  const handleNavClick = (view: 'deck' | 'services' | 'about' | 'contact') => {
    onNavigate(view);
    setIsExpanded(false);
  };

  const navItems: { id: 'deck' | 'services' | 'about' | 'contact'; label: string; num: string }[] = [
    { id: 'deck', label: 'Deck View', num: '01' },
    { id: 'services', label: 'Services', num: '02' },
    { id: 'about', label: 'About Me', num: '03' },
    { id: 'contact', label: 'Contact', num: '04' },
  ];

  return (
    <>
      {/* Dynamic Island Floating Fixed Capsule */}
      <header
        className="fixed top-2.5 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.25rem)] sm:w-auto max-w-md md:max-w-fit transform-gpu will-change-transform"
        aria-label="Dynamic Island Navigation"
      >
        <div
          className={`relative bg-[#1B1B1B]/98 text-[#F3F3F3] border border-white/15 transition-all duration-200 ease-out ${
            scrolled
              ? 'shadow-[0_12px_40px_rgba(0,0,0,0.55)] border-white/20'
              : 'shadow-[0_8px_30px_rgba(0,0,0,0.35)]'
          } ${
            isExpanded
              ? 'rounded-2xl sm:rounded-3xl p-3.5 sm:p-4'
              : 'rounded-full px-3 py-2 sm:px-4 sm:py-2.5'
          }`}
        >
          {/* Top Bar Row (Always visible, smoothly anchored) */}
          <div className="flex items-center justify-between gap-2 sm:gap-4 w-full">
            {/* Brand Wordmark & Avatar Pill */}
            <button
              onClick={() => handleNavClick('deck')}
              className="flex items-center gap-2 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-full pr-1 shrink-0"
              aria-label="Go to portfolio deck home"
            >
              {/* Mini Portrait Avatar */}
              <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden bg-neutral-800 ring-1 ring-white/30 shrink-0">
                <img
                  src={artist.avatarImage || '/Omaimajpg'}
                  alt={artist.name}
                  className="w-full h-full object-cover object-[center_12%]"
                  loading="eager"
                />
                {/* Active glowing green status dot */}
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 ring-1 ring-[#1B1B1B]" />
              </div>

              <div className="flex flex-col text-left">
                <span className="font-syncopate text-[10px] sm:text-xs font-bold tracking-widest text-[#F3F3F3] group-hover:text-white transition-colors whitespace-nowrap">
                  {artist.name.split(' ')[0]}
                  <span className="hidden lg:inline"> {artist.name.split(' ').slice(1).join(' ')}</span>
                </span>
                <span className="hidden sm:block font-mono text-[8px] text-neutral-400 uppercase tracking-widest leading-none">
                  PORTFOLIO
                </span>
              </div>
            </button>

            {/* Center Hairline Divider (Desktop) */}
            <div className="hidden md:block w-px h-5 bg-white/15 shrink-0" aria-hidden="true" />

            {/* Desktop Segmented Pill Navigation */}
            <nav
              className="hidden md:flex items-center gap-1 text-[11px] font-semibold tracking-wider uppercase"
              aria-label="Main Navigation"
            >
              {navItems.map((item) => {
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`relative px-3 py-1.5 rounded-full transition-colors duration-150 cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-[#75030C] text-white font-bold shadow-xs'
                        : 'text-neutral-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right Hairline Divider (Desktop) */}
            <div className="hidden md:block w-px h-5 bg-white/15 shrink-0" aria-hidden="true" />

            {/* Actions Row */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Desktop Quick Customize Button */}
              <button
                onClick={onOpenCustomize}
                className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase text-neutral-300 hover:text-white bg-white/5 hover:bg-white/15 border border-white/10 rounded-full transition-colors cursor-pointer"
                title="Edit profile & customize information"
                aria-label="Customize portfolio content"
              >
                <SlidersHorizontal className="w-3 h-3 text-[#75030C]" />
                <span>Modify</span>
              </button>

              {/* Let's Talk Pill Button (visible on desktop or collapsed mobile) */}
              {(!isExpanded || window.innerWidth >= 768) && (
                <button
                  onClick={() => handleNavClick('contact')}
                  className="flex items-center gap-1 px-2.5 sm:px-3.5 py-1.5 text-[10px] sm:text-xs font-bold tracking-wider uppercase text-white bg-[#75030C] hover:bg-[#8F0410] active:scale-95 rounded-full transition-transform whitespace-nowrap shadow-xs cursor-pointer"
                  aria-label="Open contact dialog"
                >
                  <span>Let's Talk</span>
                  <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </button>
              )}

              {/* Mobile Dynamic Island Expansion Toggle Button */}
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className={`md:hidden flex items-center justify-center w-8 h-8 rounded-full transition-colors cursor-pointer ${
                  isExpanded
                    ? 'bg-[#75030C] text-white hover:bg-[#8F0410]'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
                aria-expanded={isExpanded}
                aria-label={isExpanded ? 'Collapse Navigation Menu' : 'Expand Navigation Menu'}
              >
                {isExpanded ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Smooth Hardware-Accelerated Dropdown for Mobile */}
          <div
            className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out md:hidden ${
              isExpanded ? 'grid-rows-[1fr] opacity-100 mt-3 pt-3 border-t border-white/10' : 'grid-rows-[0fr] opacity-0 overflow-hidden'
            }`}
          >
            <div className="overflow-hidden flex flex-col gap-3">
              {/* Mini Profile Status */}
              <div className="flex items-center justify-between pb-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[9px] text-neutral-300 tracking-wider uppercase">
                    Available for commissions · 2026
                  </span>
                </div>
                <span className="font-mono text-[9px] text-neutral-400 uppercase">Casablanca, MA</span>
              </div>

              {/* Nav Items */}
              <nav className="flex flex-col gap-1.5" aria-label="Expanded Mobile Navigation">
                {navItems.map((item) => {
                  const isActive = activeView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#75030C] text-white font-bold shadow-xs'
                          : 'bg-white/5 hover:bg-white/10 text-neutral-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`font-mono text-xs ${
                            isActive ? 'text-white/80' : 'text-neutral-500'
                          }`}
                        >
                          {item.num}
                        </span>
                        <span className="font-syncopate text-xs tracking-wider uppercase">
                          {item.label}
                        </span>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${
                          isActive ? 'text-white translate-x-0.5' : 'text-neutral-500'
                        }`}
                      />
                    </button>
                  );
                })}
              </nav>

              {/* Action Buttons in Expanded Island */}
              <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
                <button
                  onClick={() => handleNavClick('contact')}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#75030C] hover:bg-[#8F0410] active:scale-98 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
                >
                  <span>Start a Project · Contact</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => {
                    setIsExpanded(false);
                    onOpenCustomize();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-white/10 hover:bg-white/15 text-neutral-200 rounded-xl text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#75030C]" />
                  <span>Modify Content</span>
                </button>
              </div>

              {/* Quick Contact Footer Info */}
              <div className="pt-2 border-t border-white/10 flex flex-col gap-1.5 font-mono text-[10px] text-neutral-300">
                <a
                  href={`mailto:${artist.email || 'bnsomaima7@gmail.com'}`}
                  className="flex items-center gap-2 hover:text-white transition-colors py-0.5"
                >
                  <Mail className="w-3.5 h-3.5 text-[#75030C] shrink-0" />
                  <span className="truncate">{artist.email || 'bnsomaima7@gmail.com'}</span>
                </a>
                <a
                  href={`tel:${artist.phone || '+212603736222'}`}
                  className="flex items-center gap-2 hover:text-white transition-colors py-0.5"
                >
                  <Phone className="w-3.5 h-3.5 text-[#75030C] shrink-0" />
                  <span>{artist.phone || '+212 603-736222'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Lightweight Backdrop overlay when expanded on mobile (Zero GPU blur overhead) */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden transition-opacity duration-200"
          onClick={() => setIsExpanded(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};
