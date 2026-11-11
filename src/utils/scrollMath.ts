/**
 * Pure calculations for parallax and scroll animations
 */

/**
 * Calculates a bounded parallax offset based on scroll progress (0 to 1) or pixel scroll
 */
export function calculateParallaxOffset(
  progress: number,
  speed: number = 50,
  direction: 'up' | 'down' = 'up'
): number {
  const clampedProgress = Math.max(0, Math.min(1, progress));
  const multiplier = direction === 'up' ? -1 : 1;
  const val = Math.round(clampedProgress * speed * multiplier * 10) / 10;
  return Object.is(val, -0) ? 0 : val;
}

/**
 * Calculates alternating column stagger for masonry parallax feel
 */
export function calculateColumnParallax(
  columnIndex: number,
  scrollProgress: number,
  staggerIntensity: number = 30
): number {
  const isOdd = columnIndex % 2 !== 0;
  const factor = isOdd ? 1 : 0.4;
  const val = Math.round((scrollProgress - 0.5) * staggerIntensity * factor * 10) / 10;
  return Object.is(val, -0) ? 0 : val;
}
