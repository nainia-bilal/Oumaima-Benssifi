import React, { useState, useEffect, useRef } from 'react';
import { calculateCharStagger, tokenizeTextForFlip, StaggerFrom } from '../../utils/textFlipMath';

export interface Text3DFlipProps {
  children: string;
  className?: string;
  textClassName?: string;
  flipTextClassName?: string;
  rotateDirection?: 'top' | 'bottom' | 'left' | 'right';
  staggerDuration?: number;
  staggerFrom?: StaggerFrom;
  transition?: {
    type?: string;
    damping?: number;
    stiffness?: number;
    duration?: number;
  };
  triggerKey?: number | string;
  style?: React.CSSProperties;
}

export const Text3DFlip: React.FC<Text3DFlipProps> = ({
  children,
  className = '',
  textClassName = '',
  flipTextClassName = '',
  rotateDirection = 'top',
  staggerDuration = 0.03,
  staggerFrom = 'first',
  triggerKey,
  style,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const isFirstRender = useRef(true);
  const tokens = tokenizeTextForFlip(children);

  // Trigger flip wave on triggerKey update (e.g. arrow click or card navigation)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (triggerKey !== undefined) {
      setIsFlipped(true);
      const timer = setTimeout(() => {
        setIsFlipped(false);
      }, 750);
      return () => clearTimeout(timer);
    }
  }, [triggerKey]);

  // Spring transition curve mimicking damping: 25, stiffness: 160
  const springEasing = 'cubic-bezier(0.175, 0.885, 0.32, 1.2)';
  const transitionDuration = '550ms';

  const getFaceTransform = (isFront: boolean, flipped: boolean) => {
    switch (rotateDirection) {
      case 'bottom':
        if (isFront) {
          return {
            transform: flipped ? 'translateY(100%) rotateX(-90deg)' : 'translateY(0%) rotateX(0deg)',
            opacity: flipped ? 0 : 1,
            transformOrigin: '50% 0%',
          };
        } else {
          return {
            transform: flipped ? 'translateY(0%) rotateX(0deg)' : 'translateY(-100%) rotateX(90deg)',
            opacity: flipped ? 1 : 0,
            transformOrigin: '50% 100%',
          };
        }
      case 'left':
        if (isFront) {
          return {
            transform: flipped ? 'translateX(-100%) rotateY(-90deg)' : 'translateX(0%) rotateY(0deg)',
            opacity: flipped ? 0 : 1,
            transformOrigin: '100% 50%',
          };
        } else {
          return {
            transform: flipped ? 'translateX(0%) rotateY(0deg)' : 'translateX(100%) rotateY(90deg)',
            opacity: flipped ? 1 : 0,
            transformOrigin: '0% 50%',
          };
        }
      case 'right':
        if (isFront) {
          return {
            transform: flipped ? 'translateX(100%) rotateY(90deg)' : 'translateX(0%) rotateY(0deg)',
            opacity: flipped ? 0 : 1,
            transformOrigin: '0% 50%',
          };
        } else {
          return {
            transform: flipped ? 'translateX(0%) rotateY(0deg)' : 'translateX(-100%) rotateY(-90deg)',
            opacity: flipped ? 1 : 0,
            transformOrigin: '100% 50%',
          };
        }
      case 'top':
      default:
        if (isFront) {
          return {
            transform: flipped ? 'translateY(-100%) rotateX(90deg)' : 'translateY(0%) rotateX(0deg)',
            opacity: flipped ? 0 : 1,
            transformOrigin: '50% 100%',
          };
        } else {
          return {
            transform: flipped ? 'translateY(0%) rotateX(0deg)' : 'translateY(100%) rotateX(-90deg)',
            opacity: flipped ? 1 : 0,
            transformOrigin: '50% 0%',
          };
        }
    }
  };

  return (
    <span
      className={`inline-flex items-center justify-center cursor-pointer select-none ${className}`}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped((prev) => !prev)}
      style={{
        perspective: '1200px',
        ...style,
      }}
      role="button"
      tabIndex={0}
      aria-label={children}
    >
      {tokens.map((token, index) => {
        const delay = calculateCharStagger(index, tokens.length, staggerDuration, staggerFrom);
        const frontStyle = getFaceTransform(true, isFlipped);
        const backStyle = getFaceTransform(false, isFlipped);

        return (
          <span
            key={token.key}
            className="relative inline-block overflow-hidden will-change-transform"
            style={{
              perspective: '1000px',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Front character face */}
            <span
              className={`inline-block ${textClassName}`}
              style={{
                ...frontStyle,
                transition: `transform ${transitionDuration} ${springEasing} ${delay}s, opacity 350ms ease ${delay}s`,
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              {token.char}
            </span>

            {/* Flipped character face */}
            <span
              className={`absolute inset-0 inline-block pointer-events-none ${flipTextClassName || textClassName}`}
              style={{
                ...backStyle,
                transition: `transform ${transitionDuration} ${springEasing} ${delay}s, opacity 350ms ease ${delay}s`,
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
              aria-hidden="true"
            >
              {token.char}
            </span>
          </span>
        );
      })}
    </span>
  );
};

export default Text3DFlip;
