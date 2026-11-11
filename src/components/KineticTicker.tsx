import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface KineticTickerProps {
  accentColor: string;
}

export const KineticTicker: React.FC<KineticTickerProps> = ({ accentColor }) => {
  const tickerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !tickerRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      // Scrub horizontal movement linked directly to scroll position
      gsap.to(textRef.current, {
        x: '-18%',
        ease: 'none',
        scrollTrigger: {
          trigger: tickerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
    }, tickerRef);

    return () => ctx.revert();
  }, []);

  const phrases = [
    'SELECTED WORKS',
    'MOTION SYSTEMS',
    '3D VISUALIZATION',
    'BRUTALIST TYPOGRAPHY',
    'ART DIRECTION',
    'AVANT-GARDE',
  ];

  return (
    <div
      ref={tickerRef}
      className="relative w-full max-w-full overflow-x-clip overflow-y-hidden py-4 border-y border-[#1B1B1B]/10 bg-white/60 backdrop-blur-xs select-none my-4"
      aria-hidden="true"
    >
      <div
        ref={textRef}
        className="flex items-center gap-8 whitespace-nowrap will-change-transform font-syncopate text-xs font-black tracking-widest text-[#1B1B1B]"
      >
        {[...phrases, ...phrases, ...phrases].map((item, idx) => (
          <div key={idx} className="flex items-center gap-8 shrink-0">
            <span>{item}</span>
            <span
              className="w-1.5 h-1.5 rounded-full inline-block"
              style={{ backgroundColor: accentColor }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
