/**
 * Stagger and transform calculations for 3D Text Flip animations
 */

export type StaggerFrom = 'first' | 'last' | 'center' | number;

/**
 * Calculates animation delay for character at given index
 */
export function calculateCharStagger(
  index: number,
  totalChars: number,
  staggerDuration: number = 0.03,
  staggerFrom: StaggerFrom = 'first'
): number {
  if (totalChars <= 1) return 0;

  if (typeof staggerFrom === 'number') {
    return Math.round(Math.abs(index - staggerFrom) * staggerDuration * 1000) / 1000;
  }

  switch (staggerFrom) {
    case 'last':
      return Math.round((totalChars - 1 - index) * staggerDuration * 1000) / 1000;
    case 'center': {
      const center = (totalChars - 1) / 2;
      return Math.round(Math.abs(index - center) * staggerDuration * 1000) / 1000;
    }
    case 'first':
    default:
      return Math.round(index * staggerDuration * 1000) / 1000;
  }
}

/**
 * Splits text into individual character tokens while preserving non-breaking spaces
 */
export function tokenizeTextForFlip(text: string): { char: string; isSpace: boolean; key: string }[] {
  return Array.from(text).map((char, idx) => ({
    char: char === ' ' ? '\u00A0' : char,
    isSpace: char === ' ',
    key: `${char}-${idx}`,
  }));
}
