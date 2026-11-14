import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { validateContent, safeContentUrl } from '../src/data/validation.ts';
const seed = () => JSON.parse(readFileSync(new URL('../src/data/content.json', import.meta.url), 'utf8'));
test('actual portfolio and a profile with an empty catalog are valid', () => {
  assert.equal(validateContent(seed()).ok, true);
  const content = seed();
  content.talents = []; content.releases = []; content.works = [];
  assert.equal(validateContent(content).ok, true);
});
test('malformed shapes return errors rather than crashing', () => {
  for (const bad of [null, [], { ...seed(), talents: [null] }, { ...seed(), works: [{ talentIds: 'wrong' }] }]) assert.equal(validateContent(bad).ok, false);
});
test('rejects missing media sources, broken references, and malformed repeater data', () => {
  const content = seed(); content.works[0].kind = 'video';
  assert.equal(validateContent(content).ok, false);
  const broken = seed(); broken.releases[0].workIds = ['missing'];
  assert.equal(validateContent(broken).ok, false);
  const wrongProject = seed(); wrongProject.releases[0].workIds = [wrongProject.releases[1].workIds[0]];
  assert.equal(validateContent(wrongProject).ok, false);
  const tags = seed(); tags.profile.tags = [{ value: 'Not normalized' }];
  assert.equal(validateContent(tags).ok, false);
  const links = seed(); links.profile.links = ['https://example.com'];
  assert.equal(validateContent(links).ok, false);
});
test('content links only allow safe web and root-relative URLs', () => {
  for (const url of ['/media/image.webp', 'https://example.com/image.webp']) assert.equal(safeContentUrl(url), true);
  for (const url of ['javascript:alert(1)', '//example.com', '/\\example.com', 'https://user:pass@example.com', 'https://example.com/a\nb']) assert.equal(safeContentUrl(url), false);
});
