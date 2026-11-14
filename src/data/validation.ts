import type { Release, Talent, Work } from '../types/content';

export type ProfileAward = { title: string; issuer: string; desc: string };
export type ProfileDiscipline = { title: string; label?: string; description: string };
export type ProfileLink = { label: string; url: string };
export type EditableProfile = {
  name: string; nickname: string; headline: string; bioHeadline: string; bio: string;
  location: string; email: string; phone: string; linkedin: string; portraitUrl: string;
  tags: string[]; awards: ProfileAward[]; disciplines: ProfileDiscipline[]; links?: ProfileLink[];
};
export type ContentDocument = { profile: EditableProfile; talents: Talent[]; releases: Release[]; works: Work[] };
export type ContentValidation = { ok: true; data: ContentDocument } | { ok: false; errors: string[] };
const record = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null && !Array.isArray(value);
const strings = (value: unknown): value is string[] => Array.isArray(value) && value.every(item => typeof item === 'string');
export function safeContentUrl(value: unknown): value is string {
  if (typeof value !== 'string' || /[\\\s\u0000-\u001f]/.test(value)) return false;
  if (value.startsWith('/') && !value.startsWith('//')) return true;
  try { const url = new URL(value); return ['http:', 'https:'].includes(url.protocol) && !url.username && !url.password; } catch { return false; }
}

export function validateContent(input: unknown): ContentValidation {
  const errors: string[] = [];
  if (!record(input)) return { ok: false, errors: ['Content must be an object.'] };
  function text(item: Record<string, unknown>, fields: string[], path: string, required = false) {
    for (const field of fields) if (typeof item[field] !== 'string' || (required && !String(item[field]).trim())) errors.push(`${path}.${field} must be ${required ? 'nonempty ' : ''}text.`);
  }
  function url(item: Record<string, unknown>, field: string, path: string, required = false) {
    const value = item[field];
    if ((!required && (value === undefined || value === '')) || safeContentUrl(value)) return;
    errors.push(`${path}.${field} must be an http(s) or root-relative URL.`);
  }
  function stringList(item: Record<string, unknown>, fields: string[], path: string) {
    for (const field of fields) if (!strings(item[field])) errors.push(`${path}.${field} must be an array of text.`);
  }
  function nested(value: unknown, fields: string[], path: string) {
    if (!Array.isArray(value)) { errors.push(`${path} must be an array.`); return; }
    value.forEach((item, index) => {
      if (!record(item)) errors.push(`${path}[${index}] must be an object.`);
      else text(item, fields, `${path}[${index}]`);
    });
  }
  const profile = input.profile;
  if (!record(profile)) errors.push('Profile must be an object.');
  else {
    text(profile, ['name'], 'profile', true);
    text(profile, ['nickname', 'headline', 'bioHeadline', 'bio', 'location', 'email', 'phone', 'linkedin'], 'profile');
    url(profile, 'portraitUrl', 'profile', true);
    url(profile, 'linkedin', 'profile');
    stringList(profile, ['tags'], 'profile');
    nested(profile.awards, ['title', 'issuer', 'desc'], 'profile.awards');
    nested(profile.disciplines, ['title', 'description'], 'profile.disciplines');
    if (profile.links !== undefined) {
      nested(profile.links, ['label', 'url'], 'profile.links');
      if (Array.isArray(profile.links)) profile.links.forEach((link, index) => { if (record(link)) url(link, 'url', `profile.links[${index}]`, true); });
    }
  }
  for (const name of ['talents', 'releases', 'works']) {
    if (!Array.isArray(input[name])) { errors.push(`${name} must be an array.`); continue; }
    (input[name] as unknown[]).forEach((item, index) => {
      const path = `${name}[${index}]`;
      if (!record(item)) { errors.push(`${path} must be an object.`); return; }
      text(item, ['id', 'slug', name === 'talents' ? 'name' : 'title'], path, true);
      if (name === 'talents') {
        if (!['creator', 'musician', 'actor', 'other'].includes(String(item.category))) errors.push(`${path}.category is invalid.`);
        url(item, 'portraitUrl', path, true); url(item, 'coverUrl', path);
        stringList(item, ['projectIds'], path);
      } else if (name === 'releases') {
        if (!['campaign', 'series', 'brand-collab', 'bts'].includes(String(item.category))) errors.push(`${path}.category is invalid.`);
        url(item, 'coverUrl', path, true);
        text(item, ['summary'], path);
        stringList(item, ['talentIds', 'workIds', 'myRoles'], path);
        if (!Number.isInteger(item.year)) errors.push(`${path}.year must be an integer.`);
        if (item.featured !== undefined && typeof item.featured !== 'boolean') errors.push(`${path}.featured must be a boolean.`);
        if (item.publishedAt !== undefined && (typeof item.publishedAt !== 'string' || !/^\d{4}-\d{2}-\d{2}/.test(item.publishedAt))) errors.push(`${path}.publishedAt must be a date.`);
        if (item.credits !== undefined) nested(item.credits, ['name', 'role'], `${path}.credits`);
        if (item.metrics !== undefined) {
          nested(item.metrics, ['label', 'value'], `${path}.metrics`);
          if (Array.isArray(item.metrics)) item.metrics.forEach((metric, i) => { if (record(metric) && metric.context !== undefined) text(metric, ['context'], `${path}.metrics[${i}]`); });
        }
      } else {
        text(item, ['releaseId'], path, true);
        stringList(item, ['talentIds', 'myRoles'], path);
        url(item, 'thumbnailUrl', path, true);
        for (const field of ['videoUrl', 'imageUrl', 'posterUrl', 'externalUrl', 'captionsUrl']) url(item, field, path);
        if (item.kind !== undefined && !['image', 'video', 'external'].includes(String(item.kind))) errors.push(`${path}.kind is invalid.`);
        if (item.kind === 'video') url(item, 'videoUrl', path, true);
        if (item.kind === 'external') url(item, 'externalUrl', path, true);
        if (item.durationSeconds !== undefined && (typeof item.durationSeconds !== 'number' || !Number.isFinite(item.durationSeconds) || item.durationSeconds < 0)) errors.push(`${path}.durationSeconds is invalid.`);
        if (item.platform !== undefined && !['instagram', 'youtube', 'tiktok', 'other'].includes(String(item.platform))) errors.push(`${path}.platform is invalid.`);
      }
      for (const field of ['bio', 'brand', 'objective', 'insight', 'concept', 'execution', 'outcome', 'alt', 'description']) if (item[field] !== undefined) text(item, [field], path);
    });
  }
  // Only traverse references after the shape is valid, so malformed editor input returns errors.
  if (errors.length) return { ok: false, errors };
  const content = input as ContentDocument;
  const idSet = (items: { id: string }[], label: string) => {
    const ids = new Set(items.map(item => item.id));
    if (ids.size !== items.length) errors.push(`${label} contains duplicate IDs.`);
    return ids;
  };
  const talents = idSet(content.talents, 'Talents');
  const releases = idSet(content.releases, 'Projects');
  const works = idSet(content.works, 'Media');
  for (const talent of content.talents) for (const id of talent.projectIds) if (!releases.has(id)) errors.push(`${talent.id} references missing project ${id}.`);
  for (const release of content.releases) {
    for (const id of release.talentIds) if (!talents.has(id)) errors.push(`${release.id} references missing talent ${id}.`);
    if (new Set(release.workIds).size !== release.workIds.length) errors.push(`${release.id} contains duplicate media.`);
    for (const id of release.workIds) {
      if (!works.has(id)) errors.push(`${release.id} references missing media ${id}.`);
      else if (content.works.find(work => work.id === id)?.releaseId !== release.id) errors.push(`${id} belongs to a different project.`);
    }
  }
  for (const work of content.works) {
    if (!releases.has(work.releaseId)) errors.push(`${work.id} references missing project ${work.releaseId}.`);
    for (const id of work.talentIds) if (!talents.has(id)) errors.push(`${work.id} references missing talent ${id}.`);
  }
  return errors.length ? { ok: false, errors } : { ok: true, data: content };
}
export function assertValidContent(input: unknown): ContentDocument {
  const result = validateContent(input);
  if (!result.ok) throw new Error(result.errors.join('\n'));
  return result.data;
}
