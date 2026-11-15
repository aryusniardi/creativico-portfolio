const keys: Record<string, string> = {
  bio_headline: 'bioHeadline', portrait_url: 'portraitUrl', project_ids: 'projectIds', cover_url: 'coverUrl',
  talent_ids: 'talentIds', my_roles: 'myRoles', work_ids: 'workIds', published_on: 'publishedAt', release_id: 'releaseId',
  thumbnail_url: 'thumbnailUrl', image_url: 'imageUrl', video_url: 'videoUrl', poster_url: 'posterUrl', external_url: 'externalUrl',
  duration_seconds: 'durationSeconds', captions_url: 'captionsUrl',
};
const mediaFields = new Set(['portraitUrl', 'coverUrl', 'thumbnailUrl', 'imageUrl', 'videoUrl', 'posterUrl', 'captionsUrl']);

export function normalizeCmsData(data: Record<string, unknown>, id: string): Record<string, unknown> {
  const normalized: Record<string, unknown> = {};
  for (const [key, raw] of Object.entries(data)) {
    if (key === 'publishedAt') continue;
    if (raw === null || raw === undefined || raw === '') continue;
    const field = keys[key] || key;
    let value: unknown = raw;
    if (['tags', 'myRoles'].includes(field) && Array.isArray(value)) value = value.map(item => typeof item === 'object' && item !== null && 'value' in item ? item.value : item);
    if (mediaFields.has(field) && typeof value === 'object' && value !== null) {
      const media = value as { src?: string; url?: string; meta?: { storageKey?: string } };
      value = media.src || media.url || (media.meta?.storageKey ? `/_emdash/api/media/file/${encodeURIComponent(media.meta.storageKey)}` : value);
    }
    if (field === 'publishedAt' && value instanceof Date) value = value.toISOString();
    if (field === 'featured') value = value === true || value === 1;
    normalized[field] = value;
  }
  normalized.id = typeof data.source_id === 'string' && data.source_id ? data.source_id : typeof data.slug === 'string' && data.slug ? data.slug : id;
  normalized.slug = typeof data.slug === 'string' && data.slug ? data.slug : id;
  delete normalized.source_id;
  return normalized;
}

export function linkWorksToProjects(
  projects: Record<string, unknown>[],
  works: Record<string, unknown>[],
): Record<string, unknown>[] {
  const projectByWork = new Map<string, string>();
  for (const project of projects) {
    if (!Array.isArray(project.workIds)) continue;
    for (const id of project.workIds) projectByWork.set(String(id), String(project.id));
  }
  return works.flatMap(work => {
    const releaseId = work.releaseId || projectByWork.get(String(work.id));
    return typeof releaseId === 'string' && projects.some(project => project.id === releaseId)
      ? [{ ...work, releaseId }]
      : [];
  });
}
