import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Sparkles, ExternalLink } from 'lucide-react';
import { ProjectItem } from '../types/portfolio';
import { calculateCardTransform, wrapIndex } from '../utils/deckMath';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CardDeckProps {
  projects: ProjectItem[];
  activeIndex: number;
  onSelectProject: (project: ProjectItem) => void;
  onChangeActiveIndex: (index: number) => void;
  onOpenAbout: () => void;
  accentColor: string;
}

export const CardDeck: React.FC<CardDeckProps> = ({
  projects,
  activeIndex,
  onSelectProject,
  onChangeActiveIndex,
  onOpenAbout,
  accentColor,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Drag interaction state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentDragDelta = useRef(0);

  const total = projects.length;

  const handlePrev = useCallback(() => {
    onChangeActiveIndex(wrapIndex(activeIndex - 1, total));
  }, [activeIndex, total, onChangeActiveIndex]);

  const handleNext = useCallback(() => {
    onChangeActiveIndex(wrapIndex(activeIndex + 1, total));
  }, [activeIndex, total, onChangeActiveIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  // GSAP Smooth Scroll Parallax between Hero/CardDeck and Next Section
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current || !stageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(stageRef.current, {
        y: 65,
        scale: 0.93,
        opacity: 0.8,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top+=60',
          end: 'bottom top-=100',
          scrub: 1.2,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Mouse / Touch drag to spin dial
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    currentDragDelta.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const delta = e.clientX - startX.current;
    currentDragDelta.current = delta;
  };

  const handlePointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (currentDragDelta.current > 40) {
      handlePrev();
    } else if (currentDragDelta.current < -40) {
      handleNext();
    }
    currentDragDelta.current = 0;
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className="relative w-full max-w-full select-none mt-4 sm:mt-6 pb-6 flex flex-col items-center justify-center overflow-x-clip sm:overflow-visible z-20"
      aria-label="Interactive Card Deck Showcase"
    >
      {/* Cards Stage Container with GSAP parallax ref */}
      <div
        ref={stageRef}
        className="relative w-full max-w-4xl h-[330px] sm:h-[370px] md:h-[405px] flex items-center justify-center perspective-[1200px] will-change-transform overflow-x-clip sm:overflow-visible"
      >
        {projects.map((project, index) => {
          const transform = calculateCardTransform(index, activeIndex, total, 13, 350);
          const isActive = index === activeIndex;
          const isHovered = hoveredIndex === index;
          const isArtistCard = project.id === 'proj-artist';

          // When hovered, lift the card smoothly
          const hoverLift = isHovered && !isActive ? -22 : 0;
          const activeLift = isActive ? -12 : 0;
          const yPos = transform.translateY + activeLift + hoverLift;

          return (
            <div
              key={project.id}
              onClick={(e) => {
                e.stopPropagation();
                if (!isActive) {
                  onChangeActiveIndex(index);
                } else {
                  if (isArtistCard) {
                    onOpenAbout();
                  } else {
                    onSelectProject(project);
                  }
                }
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                transform: `translateX(${transform.translateX}px) translateY(${yPos}px) rotateZ(${transform.rotateZ}deg) scale(${transform.scale})`,
                zIndex: isHovered ? 50 : transform.zIndex,
                opacity: transform.opacity,
                transition: isDragging.current
                  ? 'none'
                  : 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, z-index 0.1s ease',
              }}
              className={`absolute top-4 w-[180px] h-[270px] sm:w-[215px] sm:h-[320px] md:w-[245px] md:h-[360px] rounded-3xl overflow-hidden cursor-pointer shadow-xl transition-all duration-300 ${
                isActive
                  ? 'ring-2 ring-black/40 shadow-2xl shadow-black/25'
                  : 'hover:shadow-2xl hover:shadow-black/20'
              }`}
              role="button"
              tabIndex={0}
              aria-label={`View project: ${project.title}`}
              aria-current={isActive ? 'true' : undefined}
            >
              {/* Card Face: High-Fidelity Photography & Editorial Styling */}
              <div
                className="w-full h-full relative overflow-hidden group bg-[#111111]"
                style={{ backgroundColor: project.id === 'proj-artist' ? accentColor : '#111111' }}
              >
                <img
                  src={project.coverImage}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                    project.id === 'proj-artist' ? 'object-[center_12%]' : 'object-center'
                  }`}
                />

                {/* Subtle dark gradient overlay for photographic contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Badge Tag Top Right: Exactly matching Pinterest style */}
                <div className="absolute top-3.5 right-3.5 pointer-events-none z-20">
                  <div className="bg-[#1B1B1B]/85 backdrop-blur-xs px-2.5 py-1 rounded-[6px] border border-white/30 shadow-md">
                    <span className="font-mono text-[9px] sm:text-[10px] font-bold tracking-widest text-white block">
                      {project.badgeCode || '01 / WORK'}
                    </span>
                  </div>
                </div>

                  {/* Bottom Vignette & Title */}
                  {project.id === 'proj-artist' ? (
                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 bg-gradient-to-t from-[#1B1B1B]/95 via-[#1B1B1B]/60 to-transparent text-white flex flex-col justify-end z-20 pointer-events-none">
                      <span className="font-mono text-[8.5px] sm:text-[9.5px] uppercase font-bold tracking-[0.2em] text-white/80 mb-0.5">
                        CREATIVE DIRECTION
                      </span>
                      <h3 className="font-syncopate text-xs sm:text-sm font-black tracking-tight uppercase text-white">
                        ME / ART...
                      </h3>
                    </div>
                  ) : (
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/85 via-black/40 to-transparent text-white flex items-end justify-between transition-opacity duration-200">
                      <div>
                        <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-300">
                          {project.categoryLabel}
                        </span>
                        <h3 className="font-syncopate text-xs sm:text-sm font-bold tracking-wide uppercase line-clamp-1">
                          {project.title}
                        </h3>
                      </div>

                      <span className="p-1.5 rounded-full bg-white/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  )}
                </div>
              </div>
          );
        })}
      </div>

      {/* Rotary Dial / Curved Guide matching Pinterest Reference */}
      <div className="relative -mt-10 sm:-mt-14 flex flex-col items-center pointer-events-none z-10">
        {/* SVG Arc with Rotating Text */}
        <div className="w-[320px] sm:w-[420px] md:w-[480px] h-[90px] overflow-hidden flex items-center justify-center">
          <svg
            viewBox="0 0 500 150"
            className="w-full h-full text-neutral-400 font-mono tracking-widest text-[9px] uppercase"
          >
            {/* Guide arc curve */}
            <path
              id="portfolioCurve"
              d="M 30,140 A 240,110 0 0,1 470,140"
              fill="none"
              stroke="rgba(0, 0, 0, 0.15)"
              strokeDasharray="4 4"
              strokeWidth="1.2"
            />
            {/* Repeated text along curve */}
            <text fill="#666666" className="text-[10px] font-syncopate font-bold">
              <textPath
                href="#portfolioCurve"
                startOffset="50%"
                textAnchor="middle"
              >
                PORTFOLIO • PORTFOLIO • PORTFOLIO • PORTFOLIO • PORTFOLIO
              </textPath>
            </text>
          </svg>
        </div>

        {/* Center Indicator "▲ ME" from Reference */}
        <button
          onClick={onOpenAbout}
          className="pointer-events-auto -mt-6 group flex flex-col items-center gap-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B1B1B] px-4 py-2 rounded-full hover:bg-black/5 transition-all"
          aria-label="View artist profile and about me"
        >
          <span className="text-[10px] text-[#1B1B1B] transition-transform group-hover:-translate-y-1">
            ▲
          </span>
          <span className="font-syncopate text-xs font-black tracking-widest text-[#1B1B1B] group-hover:text-[#75030C] transition-colors">
            ME
          </span>
        </button>
      </div>

      {/* Dial Controls & Keyboard Navigation Guide */}
      <div className="mt-4 flex items-center gap-6 z-20">
        <button
          onClick={handlePrev}
          className="flex items-center justify-center w-10 h-10 rounded-full border border-[#1B1B1B]/15 bg-white/80 hover:bg-[#1B1B1B] hover:text-[#F3F3F3] text-[#1B1B1B] transition-all shadow-xs cursor-pointer focus-visible:ring-2 focus-visible:ring-[#1B1B1B]"
          aria-label="Previous showcase card"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Card Dots Indicator */}
        <div className="flex items-center gap-2">
          {projects.map((p, i) => (
            <button
              key={p.id}
              onClick={() => onChangeActiveIndex(i)}
              style={{
                backgroundColor: i === activeIndex ? accentColor : undefined,
              }}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                i === activeIndex
                  ? 'w-7'
                  : 'w-2 bg-neutral-300 hover:bg-neutral-500'
              }`}
              aria-label={`Jump to card ${i + 1}: ${p.title}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="flex items-center justify-center w-10 h-10 rounded-full border border-[#1B1B1B]/15 bg-white/80 hover:bg-[#1B1B1B] hover:text-[#F3F3F3] text-[#1B1B1B] transition-all shadow-xs cursor-pointer focus-visible:ring-2 focus-visible:ring-[#1B1B1B]"
          aria-label="Next showcase card"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
