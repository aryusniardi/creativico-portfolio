import type { Talent, Release, Work } from '../types/content';

export const PROFILE = {
  name: "Victor Decha Zhevanya",
  nickname: "Vico",
  headline: "Creative Strategist | Creative Producer | Director",
  bioHeadline: "I turn talent personalities into stories people want to watch.",
  bio: "I began in Veterinary Medicine, learning critical thinking, deep observation, and systematic research. Today, I craft high-impact content strategies, direct music videos, and lead creative productions at KITE Entertainment and beyond—connecting People, Story, and Purpose.",
  location: "Jakarta, Indonesia",
  email: "victordechaz@gmail.com",
  phone: "+62 812-3351-6479",
  linkedin: "https://www.linkedin.com/in/victordechaz",
  tags: ["ENFP", "CAPRICORN", "GENERATOR 2/4", "Human-First Creativity"],
  awards: [
    { title: "Most Hardworking Employee", issuer: "WOW Company | H.A.R.V.E.S.T Awards 2024", desc: "Recognized for project ownership and high-tempo execution." },
    { title: "Most Tech-Savvy Employee", issuer: "WOW Company | H.A.R.V.E.S.T Awards 2024", desc: "Awarded for integrating AI workflows and tech into creative production." },
    { title: "BNSP Certified Business Development", issuer: "National Professional Certification Indonesia", desc: "Market analysis, strategic planning, and stakeholder management." },
    { title: "CEFR C1 Advanced English", issuer: "British Council EnglishScore", desc: "International creative collaboration." }
  ]
};

export const TALENTS: Talent[] = [
  {
    id: 'sitha-marino',
    slug: 'sitha-marino',
    name: 'Sitha Marino',
    category: 'creator',
    portraitUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    bio: 'TikTok (2.5M) & Instagram (888k) powerhouse. High-authenticity branded storytelling that turns brand briefs into viral, creator-native content.',
    projectIds: ['rel-sitha-branded']
  },
  {
    id: 'makatita',
    slug: 'makatita',
    name: 'Makatita',
    category: 'musician',
    portraitUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    bio: 'Hip-Hop artist. Collaboration on the visually striking official music video HITAM exploring vulnerability, silence, and the White Supper concept.',
    projectIds: ['rel-hitam-mv']
  },
  {
    id: 'max-huang',
    slug: 'max-huang',
    name: 'Max Huang',
    category: 'actor',
    portraitUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80',
    bio: 'International action actor (Mortal Kombat). Large-scale 3-day production mini docu-drama "Life of Action" with 20+ crew and Rp200M+ budget.',
    projectIds: ['rel-talent-reveal']
  },
  {
    id: 'harry-halim',
    slug: 'harry-halim',
    name: 'Harry Halim',
    category: 'other',
    portraitUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    bio: 'World-renowned fashion designer stepping into his new chapter as an actor. High-fashion cinematic reveal presented at media press conferences.',
    projectIds: ['rel-talent-reveal']
  },
  {
    id: 'fergie-brittany',
    slug: 'fergie-brittany',
    name: 'Fergie Brittany',
    category: 'creator',
    portraitUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
    bio: 'Actress and creator. Midsommar-inspired metaphorical journey through open fields depicting transformation and self-acceptance.',
    projectIds: ['rel-talent-reveal']
  },
  {
    id: 'lutesha',
    slug: 'lutesha',
    name: 'Lutesha',
    category: 'actor',
    portraitUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    bio: 'Acclaimed Indonesian actress. The Unexpected: breaking conventional introduction molds with sharp cinematic timing.',
    projectIds: ['rel-talent-reveal']
  }
];

export const RELEASES: Release[] = [
  {
    id: 'rel-hitam-mv',
    slug: 'hitam-makatita-mv',
    title: 'HITAM — Official Music Video',
    year: 2026,
    talentIds: ['makatita'],
    brand: 'Makatita / Independent',
    category: 'campaign',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    summary: 'Directing the official hip-hop music video HITAM under 1-month compressed timeline, 1-day shoot in Blok M & studio.',
    objective: 'Translate an emotionally complex hip-hop record into a cinematic visual journey without falling into literal cliches of darkness.',
    insight: 'The song is titled HITAM (Black), but the emotional weight was about vulnerability, silence, and guilt hidden beneath the surface.',
    concept: 'White Supper — an inverted surreal visual metaphor of silence and vulnerability juxtaposed against urban Jakarta night streets.',
    execution: 'Split shoot: 1 AM - 4 AM night exterior at Blok M, followed by 9 AM - 9 PM intensive White Supper studio set.',
    outcome: 'Visual feast that elevated the hip-hop single with cinematic praise and solid digital engagement.',
    myRoles: ['Director', 'Creative Direction', 'Visual Treatment', 'Storyboarding', 'On-set Direction'],
    credits: [
      { name: 'Victor Decha (Vico)', role: 'Director & Creative Director' },
      { name: 'Makatita', role: 'Artist / Performer' },
      { name: 'Production Crew', role: 'Camera, Lighting & Grip Team' }
    ],
    metrics: [
      { label: 'Timeline', value: '< 1 Mo', context: 'Concept to release' },
      { label: 'Production', value: '1 Day', context: 'Blok M + Studio' },
      { label: 'Role', value: 'Director', context: 'Official MV' }
    ],
    workIds: ['work-hitam-01', 'work-hitam-02'],
    featured: true,
    publishedAt: '2026-07-08'
  },
  {
    id: 'rel-talent-reveal',
    slug: 'kite-talent-reveal-project',
    title: 'KITE Talent Reveal Project',
    year: 2025,
    talentIds: ['max-huang', 'harry-halim', 'fergie-brittany', 'lutesha'],
    brand: 'KITE Entertainment',
    category: 'series',
    coverUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80',
    summary: 'A 1.5-year creative initiative introducing 6 distinct talents through tailored cinematic narratives ranging from Rp5M to Rp200M+ budgets.',
    objective: 'Introduce new talents joining KITE Entertainment not as generic announcements, but through bespoke stories audiences care about.',
    insight: 'Every talent has different personalities and ambitions. One formula fails; 6 talents demand 6 unique ways of being seen.',
    concept: 'Persona-First Worldbuilding: Midsommar folk aesthetics for Fergie, High-fashion transition for Harry Halim, and Life of Action Mini Docu-Drama for Max Huang.',
    execution: 'Scaled agile productions (5-10 crew) up to 20+ crew multi-department 3-day film production as 1st AD.',
    outcome: 'Introduced 6 major talents to the Indonesian and global market; Harry Halim reveal was screened at his public media press conference.',
    myRoles: ['Creative Lead', 'Creative Director', '1st Assistant Director', 'Persona Insights Architect'],
    credits: [
      { name: 'Victor Decha (Vico)', role: 'Creative Director / 1st AD' },
      { name: 'KITE Entertainment', role: 'Talent Agency & Executive Producer' },
      { name: 'Talent Roster', role: 'Performers & Creators' }
    ],
    metrics: [
      { label: 'Scale', value: 'Rp200M+', context: 'Peak production budget' },
      { label: 'Talents', value: '6 Rosters', context: 'Custom reveals' },
      { label: 'Program', value: '1.5 Yrs', context: 'Evolution of creative system' }
    ],
    workIds: ['work-max-action', 'work-harry-halim', 'work-fergie-midsommar', 'work-lutesha-unexpected'],
    featured: false,
    publishedAt: '2025-11-20'
  },
  {
    id: 'rel-sitha-branded',
    slug: 'sitha-marino-branded-storytelling',
    title: 'Sitha Marino — Branded Storytelling Engine',
    year: 2025,
    talentIds: ['sitha-marino'],
    brand: 'Various Tier-1 FMCG & Lifestyle Brands',
    category: 'brand-collab',
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    summary: 'End-to-end creative strategy and production bridging brand objectives with TikTok-native humor and authentic creator pacing.',
    objective: 'Seamlessly integrate brand briefs into Sitha Marino\'s TikTok (2.5M) and Instagram (888k) without alienating her fanbase.',
    insight: 'People don\'t remember briefs; they remember stories. Great branded content feels like creator content first, and advertising second.',
    concept: 'Hook & Rhythm alignment: adapting the campaign to fit Sitha\'s voice rather than forcing the creator into a corporate script.',
    execution: 'Brief translation, narrative scripting, on-set direction, brand compliance, draft review, and iterative post-performance optimization.',
    outcome: 'Accelerated brand approval cycles, superior retention rates, and sustained partnership renewals across multiple brands.',
    myRoles: ['Creative Strategist', 'Creative Producer', 'On-set Direction', 'Performance Reviewer'],
    credits: [
      { name: 'Victor Decha (Vico)', role: 'Creative Strategist & Producer' },
      { name: 'Sitha Marino', role: 'Creator / Talent' },
      { name: 'KITE Business Team', role: 'Brand & Client Partnerships' }
    ],
    metrics: [
      { label: 'Talent Reach', value: '3.3M+', context: 'Combined TT & IG' },
      { label: 'Efficiency', value: '3x Faster', context: 'Client approval cycle' },
      { label: 'Approach', value: 'Human-First', context: 'Creator-native integration' }
    ],
    workIds: ['work-sitha-01', 'work-sitha-02'],
    featured: false,
    publishedAt: '2025-09-15'
  }
];

export const WORKS: Work[] = [
  {
    id: 'work-hitam-01',
    slug: 'hitam-white-supper-scene',
    title: 'HITAM — The White Supper Scene',
    releaseId: 'rel-hitam-mv',
    talentIds: ['makatita'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-silhouette-of-a-guitarist-playing-guitar-at-night-42485-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    durationSeconds: 195,
    platform: 'youtube',
    description: 'The centerpiece sequence of Makatita\'s HITAM music video. Using white sterile supper imagery to convey vulnerability and psychological tension.',
    myRoles: ['Director', 'Concept Development', 'Lighting Supervision'],
    captionsUrl: undefined
  },
  {
    id: 'work-hitam-02',
    slug: 'hitam-blok-m-night-run',
    title: 'HITAM — Blok M 3 AM Exterior',
    releaseId: 'rel-hitam-mv',
    talentIds: ['makatita'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-neon-lights-of-a-night-city-with-traffic-41551-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    durationSeconds: 120,
    platform: 'youtube',
    description: 'Raw guerrilla aesthetic captured during early morning hours in South Jakarta, reflecting urban loneliness.',
    myRoles: ['Director', 'Location Scouting', 'Camera Direction'],
    captionsUrl: undefined
  },
  {
    id: 'work-max-action',
    slug: 'max-huang-life-of-action',
    title: 'Max Huang: Life of Action (Mini Docu-Drama)',
    releaseId: 'rel-talent-reveal',
    talentIds: ['max-huang'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-dancing-under-the-rain-at-night-41555-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80',
    durationSeconds: 240,
    platform: 'youtube',
    description: 'Rp200M+ high-octane mini docu-drama shot over 3 days with 20+ crew, highlighting Max Huang\'s journey as an international martial arts action star.',
    myRoles: ['1st Assistant Director', 'Creative Lead', 'Production Scheduling'],
    captionsUrl: undefined
  },
  {
    id: 'work-harry-halim',
    slug: 'harry-halim-the-reinvention',
    title: 'Harry Halim — The Reinvention',
    releaseId: 'rel-talent-reveal',
    talentIds: ['harry-halim'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-portrait-of-a-fashion-woman-with-silver-makeup-40015-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    durationSeconds: 65,
    platform: 'instagram',
    description: 'Haute couture meets the silver screen: introducing the Paris/Jakarta fashion icon as a dramatic actor.',
    myRoles: ['Creative Director', 'Visual Language Treatment'],
    captionsUrl: undefined
  },
  {
    id: 'work-fergie-midsommar',
    slug: 'fergie-brittany-becoming-herself',
    title: 'Fergie Brittany — Becoming Herself',
    releaseId: 'rel-talent-reveal',
    talentIds: ['fergie-brittany'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-walking-on-a-rural-field-at-sunset-41484-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
    durationSeconds: 82,
    platform: 'instagram',
    description: 'Metaphorical transformation through an open meadow inspired by Midsommar cinematography, representing self-acceptance and emotional grounding.',
    myRoles: ['Creative Director', 'Storyline Scripting'],
    captionsUrl: undefined
  },
  {
    id: 'work-lutesha-unexpected',
    slug: 'lutesha-the-unexpected',
    title: 'Lutesha — The Unexpected',
    releaseId: 'rel-talent-reveal',
    talentIds: ['lutesha'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-looking-at-the-camera-in-the-street-41552-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    durationSeconds: 58,
    platform: 'tiktok',
    description: 'Subverting the typical talent signing announcement with unexpected comedic deadpan rhythm.',
    myRoles: ['Creative Director', 'Editing Supervision'],
    captionsUrl: undefined
  },
  {
    id: 'work-sitha-01',
    slug: 'sitha-marino-authenticity-first',
    title: 'Sitha Marino — Creator-Native Branded Integration',
    releaseId: 'rel-sitha-branded',
    talentIds: ['sitha-marino'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-neon-light-41549-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    durationSeconds: 60,
    platform: 'tiktok',
    description: 'Seamless product placement retaining Sitha\'s unfiltered vocal delivery and fast cuts, maximizing viewer retention.',
    myRoles: ['Creative Strategist', 'Storyline', 'Brand Alignment'],
    captionsUrl: undefined
  },
  {
    id: 'work-sitha-02',
    slug: 'sitha-marino-daily-hook',
    title: 'Sitha Marino — High-Retention Content Hook',
    releaseId: 'rel-sitha-branded',
    talentIds: ['sitha-marino'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-smiling-at-sunset-in-the-city-41481-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    durationSeconds: 45,
    platform: 'instagram',
    description: 'Engineering the first 3 seconds of social content to capture interest before delivering the brand value proposition.',
    myRoles: ['Creative Producer', 'Post-production Review'],
    captionsUrl: undefined
  }
];
