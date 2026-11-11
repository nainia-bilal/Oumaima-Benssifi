import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateCharStagger, tokenizeTextForFlip } from './textFlipMath';

test('calculateCharStagger: staggerFrom first starts at 0 and increments sequentially', () => {
  const delay0 = calculateCharStagger(0, 9, 0.03, 'first');
  const delay1 = calculateCharStagger(1, 9, 0.03, 'first');
  const delay8 = calculateCharStagger(8, 9, 0.03, 'first');

  assert.equal(delay0, 0);
  assert.equal(delay1, 0.03);
  assert.equal(delay8, 0.24);
});

test('calculateCharStagger: staggerFrom last reverses the sequence', () => {
  const delay0 = calculateCharStagger(0, 9, 0.03, 'last');
  const delay8 = calculateCharStagger(8, 9, 0.03, 'last');

  assert.equal(delay0, 0.24);
  assert.equal(delay8, 0);
});

test('calculateCharStagger: staggerFrom center starts from the middle out', () => {
  const centerIndex = 4; // for 9 characters: 0 1 2 3 [4] 5 6 7 8
  const delayCenter = calculateCharStagger(centerIndex, 9, 0.03, 'center');
  const delayLeftEdge = calculateCharStagger(0, 9, 0.03, 'center');
  const delayRightEdge = calculateCharStagger(8, 9, 0.03, 'center');

  assert.equal(delayCenter, 0);
  assert.equal(delayLeftEdge, 0.12);
  assert.equal(delayRightEdge, 0.12);
});

test('tokenizeTextForFlip: parses PORTFOLIO and replaces spaces with non-breaking spaces', () => {
  const tokens = tokenizeTextForFlip('PORT FOLIO');
  assert.equal(tokens.length, 10);
  assert.equal(tokens[0].char, 'P');
  assert.equal(tokens[4].char, '\u00A0');
  assert.equal(tokens[4].isSpace, true);
  assert.equal(tokens[5].char, 'F');
});
