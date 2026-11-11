import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateCardTransform,
  calculateDialAngle,
  wrapIndex,
  filterProjects,
  validateContactForm,
  validateDesignSubmission,
} from './deckMath';
import { ProjectItem } from '../types/portfolio';

test('calculateCardTransform returns center elevation for active card', () => {
  const transform = calculateCardTransform(2, 2, 5, 14, 350);
  assert.equal(transform.translateX, 0);
  assert.equal(transform.translateY, 0);
  assert.equal(transform.rotateZ, 0);
  assert.equal(transform.scale, 1);
  assert.equal(transform.zIndex, 20);
  assert.equal(transform.opacity, 1);
});

test('calculateCardTransform applies symmetric fanned rotations for left and right cards', () => {
  const activeIndex = 2;
  const leftCard = calculateCardTransform(1, activeIndex, 5, 14, 350);
  const rightCard = calculateCardTransform(3, activeIndex, 5, 14, 350);

  // Left card has negative rotation and negative X offset
  assert.ok(leftCard.rotateZ < 0);
  assert.ok(leftCard.translateX < 0);

  // Right card has positive rotation and positive X offset
  assert.ok(rightCard.rotateZ > 0);
  assert.ok(rightCard.translateX > 0);

  // Magnitudes should match
  assert.equal(Math.abs(leftCard.rotateZ), Math.abs(rightCard.rotateZ));
  assert.equal(Math.abs(leftCard.translateX), Math.abs(rightCard.translateX));

  // Both should have lower z-index than center card
  assert.ok(leftCard.zIndex < 20);
  assert.ok(rightCard.zIndex < 20);
});

test('wrapIndex handles circular bounds correctly', () => {
  assert.equal(wrapIndex(0, 5), 0);
  assert.equal(wrapIndex(4, 5), 4);
  assert.equal(wrapIndex(5, 5), 0);
  assert.equal(wrapIndex(-1, 5), 4);
  assert.equal(wrapIndex(-6, 5), 4);
});

test('calculateDialAngle calculates rotational degrees matching index step', () => {
  assert.equal(calculateDialAngle(0, 4), 0);
  assert.equal(calculateDialAngle(1, 4), -90);
  assert.equal(calculateDialAngle(2, 4), -180);
});

test('filterProjects filters correctly by category', () => {
  const sample: ProjectItem[] = [
    {
      id: 'p1',
      title: 'Cosmos',
      subtitle: 'Motion',
      category: 'motion',
      categoryLabel: 'Motion Graphics',
      year: '2026',
      client: 'Act',
      role: 'Art Director',
      tools: ['After Effects'],
      summary: 'Cosmic motion piece',
      description: 'Long description',
      coverImage: '/img.jpg',
      features: ['Feature 1'],
    },
    {
      id: 'p2',
      title: 'Polestar',
      subtitle: 'Automotive 3D',
      category: '3d',
      categoryLabel: '3D & Industrial',
      year: '2026',
      client: 'Polestar',
      role: '3D Designer',
      tools: ['Blender'],
      summary: 'Car 3D render',
      description: 'Long description',
      coverImage: '/img2.jpg',
      features: ['Feature 2'],
    },
  ];

  assert.equal(filterProjects(sample, 'all').length, 2);
  assert.equal(filterProjects(sample, 'motion').length, 1);
  assert.equal(filterProjects(sample, 'motion')[0].id, 'p1');
  assert.equal(filterProjects(sample, '3d').length, 1);
  assert.equal(filterProjects(sample, 'identity').length, 0);
});

test('validateContactForm checks required fields', () => {
  const invalid = validateContactForm({
    name: '',
    email: 'not-an-email',
    subject: '',
    message: 'short',
    projectType: 'motion',
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.message);

  const valid = validateContactForm({
    name: 'Sarah Connor',
    email: 'sarah@example.com',
    subject: 'Brand Motion Commission',
    message: 'Hello, we would love to collaborate with you on our upcoming fashion motion campaign.',
    projectType: 'motion',
  });
  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});

test('validateDesignSubmission validates minimum title length', () => {
  const invalid = validateDesignSubmission({ title: '' });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.title);

  const valid = validateDesignSubmission({ title: 'Vogue Autumn Brand System' });
  assert.equal(valid.isValid, true);
});
