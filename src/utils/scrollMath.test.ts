import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateParallaxOffset, calculateColumnParallax } from './scrollMath';

test('calculateParallaxOffset clamps progress between 0 and 1 and applies correct direction', () => {
  assert.equal(calculateParallaxOffset(0, 100, 'up'), 0);
  assert.equal(calculateParallaxOffset(0.5, 100, 'up'), -50);
  assert.equal(calculateParallaxOffset(1, 100, 'up'), -100);
  assert.equal(calculateParallaxOffset(1.5, 100, 'up'), -100); // clamped
  assert.equal(calculateParallaxOffset(0.5, 100, 'down'), 50);
});

test('calculateColumnParallax differentiates between odd and even columns', () => {
  const evenOffset = calculateColumnParallax(0, 1.0, 40); // 0.5 * 40 * 0.4 = 8
  const oddOffset = calculateColumnParallax(1, 1.0, 40);  // 0.5 * 40 * 1.0 = 20

  assert.equal(evenOffset, 8);
  assert.equal(oddOffset, 20);
  assert.ok(oddOffset > evenOffset);
});
