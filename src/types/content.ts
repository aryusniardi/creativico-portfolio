export type Talent = {
  id: string;
  slug: string;
  name: string;
  category: 'creator' | 'musician' | 'actor' | 'other';
  portraitUrl: string;
  coverUrl?: string;
  bio?: string;
  projectIds: string[];
};

export type Release = {
  id: string;
  slug: string;
  title: string;
  year: number;
  talentIds: string[];
  brand?: string;
  category: 'campaign' | 'series' | 'brand-collab' | 'bts';
  coverUrl: string;
  summary: string;
  objective?: string;
  insight?: string;
  concept?: string;
  execution?: string;
  outcome?: string;
  myRoles: string[];
  credits?: { name: string; role: string }[];
  metrics?: { label: string; value: string; context?: string }[];
  workIds: string[];
  featured?: boolean;
  publishedAt?: string;
};

export type Work = {
  id: string;
  slug: string;
  title: string;
  releaseId: string;
  talentIds: string[];
  thumbnailUrl: string;
  videoUrl?: string;
  posterUrl?: string;
  durationSeconds?: number;
  platform?: 'instagram' | 'tiktok' | 'youtube' | 'other';
  externalUrl?: string;
  description?: string;
  myRoles: string[];
  captionsUrl?: string;
};
