import test from 'node:test';
import assert from 'node:assert/strict';
import { formatTimecode, parseVideoUrl, validateVideoSubmission } from './videoMath';

test('formatTimecode formats seconds into MM:SS and HH:MM:SS', () => {
  assert.equal(formatTimecode(0), '00:00');
  assert.equal(formatTimecode(45), '00:45');
  assert.equal(formatTimecode(125), '02:05');
  assert.equal(formatTimecode(3665), '01:01:05');
  assert.equal(formatTimecode(-5), '00:00');
});

test('parseVideoUrl identifies YouTube and Vimeo links accurately', () => {
  const yt = parseVideoUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  assert.equal(yt.type, 'youtube');
  assert.equal(yt.isValid, true);
  assert.ok(yt.embedUrl.includes('youtube.com/embed/dQw4w9WgXcQ'));

  const vimeo = parseVideoUrl('https://vimeo.com/76979871');
  assert.equal(vimeo.type, 'vimeo');
  assert.equal(vimeo.isValid, true);
  assert.ok(vimeo.embedUrl.includes('player.vimeo.com/video/76979871'));

  const direct = parseVideoUrl('https://assets.mixkit.co/videos/preview/mixkit-fashion-model-398.mp4');
  assert.equal(direct.type, 'direct');
  assert.equal(direct.isValid, true);

  const invalid = parseVideoUrl('not-a-link');
  assert.equal(invalid.isValid, false);
});

test('validateVideoSubmission detects missing or invalid fields', () => {
  const invalid = validateVideoSubmission({
    title: '',
    videoUrl: 'invalid-url',
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.title);
  assert.ok(invalid.errors.videoUrl);

  const valid = validateVideoSubmission({
    title: 'Autumn Fashion Showreel 2026',
    videoUrl: 'https://vimeo.com/123456789',
    category: 'fashion',
  });
  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});
