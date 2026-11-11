import { ContactFormData, ContactValidationResult, ProjectItem } from '../types/portfolio';

export interface CardTransform {
  translateX: number;
  translateY: number;
  rotateZ: number;
  scale: number;
  zIndex: number;
  opacity: number;
}

/**
 * Calculates smooth fan distribution for 3D card deck layout matching the Pinterest reference
 * In the reference:
 * - Center card (active/featured) sits at top elevation (0 deg, highest z-index)
 * - Left cards fan out with negative rotation and downward curvature
 * - Right cards fan out with positive rotation and downward curvature
 */
export function calculateCardTransform(
  cardIndex: number,
  activeIndex: number,
  totalCards: number,
  spreadAngle: number = 13,
  radius: number = 380
): CardTransform {
  if (totalCards <= 0) {
    return { translateX: 0, translateY: 0, rotateZ: 0, scale: 1, zIndex: 1, opacity: 1 };
  }

  // Calculate shortest directional offset from active card
  const offset = cardIndex - activeIndex;
  const absOffset = Math.abs(offset);

  // Angle in degrees for this card
  const angleDeg = offset * spreadAngle;
  const angleRad = (angleDeg * Math.PI) / 180;

  // Arc physics: center card is elevated, cards arc outward and slightly downward
  // X offset follows sine, Y offset creates a curved fanned deck
  const translateX = Math.sin(angleRad) * radius;
  const translateY = (1 - Math.cos(angleRad)) * radius * 0.45 + absOffset * 6;

  // Center card is slightly larger and fully opaque; edge cards maintain crisp presence
  const scale = Math.max(0.85, 1 - absOffset * 0.04);
  const zIndex = 20 - absOffset * 2;
  const opacity = absOffset > 3 ? 0.3 : 1;

  return {
    translateX: Math.round(translateX * 10) / 10,
    translateY: Math.round(translateY * 10) / 10,
    rotateZ: Math.round(angleDeg * 10) / 10,
    scale: Math.round(scale * 100) / 100,
    zIndex,
    opacity,
  };
}

/**
 * Calculates rotary angle for circular dial text around the cards
 */
export function calculateDialAngle(activeIndex: number, totalCards: number): number {
  if (totalCards <= 1 || activeIndex === 0) return 0;
  const raw = -((activeIndex / totalCards) * 360);
  return raw === 0 ? 0 : raw;
}

/**
 * Wraps index safely within range [0, total - 1]
 */
export function wrapIndex(index: number, total: number): number {
  if (total <= 0) return 0;
  return ((index % total) + total) % total;
}

/**
 * Filters projects based on category selection
 */
export function filterProjects(
  projects: ProjectItem[],
  category: string
): ProjectItem[] {
  if (!category || category === 'all') {
    return projects;
  }
  return projects.filter((item) => item.category === category);
}

/**
 * Validates contact form submission
 */
export function validateContactForm(data: ContactFormData): ContactValidationResult {
  const errors: Partial<Record<keyof ContactFormData, string>> = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Please provide your full name.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'Please provide a valid email address.';
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Please include a message of at least 10 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validates a new design project submission
 */
export function validateDesignSubmission(data: Partial<ProjectItem>): {
  isValid: boolean;
  errors: Partial<Record<keyof ProjectItem, string>>;
} {
  const errors: Partial<Record<keyof ProjectItem, string>> = {};

  if (!data.title || data.title.trim().length < 2) {
    errors.title = 'Title must be at least 2 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

