import seed from './content.json';
import { assertValidContent, type ContentDocument } from './validation';
import { normalizeCmsData } from './cms-normalize';
import type { ContentEntry } from 'emdash';

const localContent = assertValidContent(seed);

/** Production is a static snapshot; local EmDash is the authoring source. */
export async function loadContent(): Promise<ContentDocument> {
  if (!import.meta.env.DEV) return localContent;
  const { getEmDashCollection, getEmDashEntry, getEmDashReferences } = await import(/* @vite-ignore */ 'emdash');
  async function allEntries(collection: string) {
    const entries: ContentEntry[] = [];
    let cursor: string | undefined;
    do {
      const result = await getEmDashCollection(collection, { status: 'published', limit: 100, cursor });
      if (result.error) throw result.error;
      entries.push(...result.entries);
      cursor = result.nextCursor;
    } while (cursor);
    return entries;
  }
  async function collection(collection: string, fields: string[] = []) {
    return Promise.all((await allEntries(collection)).map(async entry => {
      const item = normalizeCmsData(entry.data, entry.id);
      if (!fields.length) return item;
      const loaded = await getEmDashEntry(collection, entry.id, { references: Object.fromEntries(fields.map(field => [field, { limit: 100 }])) });
      if (loaded.error) throw loaded.error;
      for (const field of fields) {
        let page = loaded.entry?.references?.[field];
        const ids: string[] = [];
        while (page) {
          ids.push(...page.entries.map(link => String(normalizeCmsData(link.data, link.id).id)));
          if (!page.nextCursor) break;
          const more = await getEmDashReferences(collection, entry.id, field, { limit: 100, cursor: page.nextCursor });
          if (more.error) throw more.error;
          page = more;
        }
        item[{ project_ids: 'projectIds', talent_ids: 'talentIds', work_ids: 'workIds', release_id: 'releaseId' }[field] || field] = field === 'release_id' ? ids[0] : ids;
      }
      return item;
    }));
  }
  try {
    const [profiles, talents, releases, works] = await Promise.all([
      collection('profiles'), collection('talents'),
      collection('projects', ['talent_ids', 'work_ids']), collection('works', ['talent_ids']),
    ]);
    if (profiles.length > 1) throw new Error('Keep one published profile in EmDash.');
    if (!profiles.length) { console.info('[content] No published EmDash profile yet; using the portfolio seed.'); return localContent; }
    const profile = { nickname: '', headline: '', bioHeadline: '', bio: '', location: '', email: '', phone: '', linkedin: '', tags: [], awards: [], disciplines: [], ...profiles[0] };
    return assertValidContent({
      profile,
      talents: talents.map(item => ({ ...item, projectIds: releases.filter(project => (project.talentIds as string[]).includes(String(item.id))).map(project => project.id) })),
      releases: releases.map(item => ({ summary: '', myRoles: [], ...item })),
      works: works.map(item => ({ myRoles: [], ...item, releaseId: releases.find(project => (project.workIds as string[]).includes(String(item.id)))?.id })),
    });
  } catch (error) {
    // An existing editor dataset must not silently appear to save while the seed is shown.
    console.error('[content] EmDash content could not be loaded. Fix the reported content errors.', error);
    throw error;
  }
}
