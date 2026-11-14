import type { Talent, Release, Work } from '../types/content';

export const TALENTS: Talent[] = [
  {
    id: 'talent-1',
    slug: 'maya-aditya',
    name: 'Maya Aditya',
    category: 'creator',
    portraitUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
    bio: 'Cultural lifestyle storyteller & digital tastemaker with 1.8M audience focusing on urban youth narratives.',
    projectIds: ['rel-1', 'rel-3']
  },
  {
    id: 'talent-2',
    slug: 'rio-satria',
    name: 'Rio Satria',
    category: 'musician',
    portraitUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    bio: 'Indie-R&B artist and multi-instrumentalist crafting sonic identities for live music sessions.',
    projectIds: ['rel-2']
  },
  {
    id: 'talent-3',
    slug: 'chelsea-tan',
    name: 'Chelsea Tan',
    category: 'actor',
    portraitUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    bio: 'Method actress & theater performer bridging cinematic authenticity into high-tempo digital skits.',
    projectIds: ['rel-4']
  }
];

export const RELEASES: Release[] = [
  {
    id: 'rel-1',
    slug: 'after-hours-echo',
    title: 'After Hours Echo',
    year: 2026,
    talentIds: ['talent-1'],
    brand: 'Monochrome Audio Lab',
    category: 'campaign',
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    summary: 'A 4-part nocturnal episodic series exploring Tokyo & Jakarta soundscapes during dawn hours.',
    objective: 'Position premium noise-canceling headphones as an essential sanctuary for urban night creators.',
    insight: 'Creators do their deepest, most honest work between 1 AM and 4 AM when city notifications die out.',
    concept: 'Replay the silence: cinematic raw-footage cut to ASMR audio captures and stream-of-consciousness scripts.',
    execution: 'Filmed on anamorphic lenses in 9:16 vertical cinema format with spatial ambient binaural audio design.',
    outcome: 'Generated 4.2M views across vertical channels and 18% lift in brand sentiment among sound professionals.',
    myRoles: ['Creative Direction', 'Scriptwriting', 'Vertical Cinematography', 'Lead Editor'],
    credits: [
      { name: 'Arief Rahman', role: 'Creative Director / Writer' },
      { name: 'Dimas Wicaksono', role: 'Sound Engineer' },
      { name: 'Monochrome Team', role: 'Brand Partner' }
    ],
    metrics: [
      { label: 'Organic Views', value: '4.2M', context: 'TikTok & Reels' },
      { label: 'Avg Watch Time', value: '84%', context: '1:15 average duration' },
      { label: 'Shares', value: '38K', context: 'Direct message sends' }
    ],
    workIds: ['work-1', 'work-2'],
    featured: true,
    publishedAt: '2026-02-14'
  },
  {
    id: 'rel-2',
    slug: 'midnight-frequencies',
    title: 'Midnight Frequencies (Live Studio)',
    year: 2026,
    talentIds: ['talent-2'],
    category: 'series',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    summary: 'Intimate one-take live acoustic studio sessions capturing unfiltered emotional hooks.',
    objective: 'Build anticipation for the upcoming EP release with zero marketing gimmicks.',
    insight: 'Music fans connect with the physical struggle and breath between notes rather than polished playback.',
    concept: 'One take, 360-degree rotating camera track, dynamic lighting synchronized with guitar loops.',
    execution: 'Live recorded in one afternoon at Rekam Studio Cilandak; mixed and cut for instant vertical release.',
    outcome: 'Track pre-saves increased by 310% within 48 hours of Episode 1 premiere.',
    myRoles: ['Visual Producer', 'Lighting Director', 'Color Grading'],
    credits: [
      { name: 'Arief Rahman', role: 'Visual Director' },
      { name: 'Rio Satria', role: 'Artist / Performer' },
      { name: 'Studio Cilandak', role: 'Audio Facility' }
    ],
    metrics: [
      { label: 'Pre-saves', value: '+310%', context: 'Spotify / Apple Music' },
      { label: 'Completion Rate', value: '78%', context: 'IG Reels' }
    ],
    workIds: ['work-3', 'work-4'],
    featured: false,
    publishedAt: '2026-01-28'
  },
  {
    id: 'rel-3',
    slug: 'solitude-in-motion',
    title: 'Solitude in Motion',
    year: 2025,
    talentIds: ['talent-1'],
    brand: 'Aethel Apparel',
    category: 'brand-collab',
    coverUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    summary: 'A poetic movement campaign merging seasonal technical outerwear with high-speed commuter rituals.',
    objective: 'Demonstrate movement elasticity without appearing like a standard gym or sports commercial.',
    insight: 'Commuters crave garments that shield them from sensory overload during brutal public transit rides.',
    concept: 'Fluid slow-motion choreography woven between harsh MRT train cuts and architectural glass.',
    execution: 'Captured on RED V-Raptor cropped for native 9:16 vertical distribution, colored in moody cool cyan.',
    outcome: 'Sold out 1,200 capsule pieces within 72 hours of digital release.',
    myRoles: ['Concept Ideation', 'Choreography Direction', 'Post-Production'],
    credits: [
      { name: 'Arief Rahman', role: 'Creative Director' },
      { name: 'Maya Aditya', role: 'Talent & Movement' },
      { name: 'Aethel Studio', role: 'Wardrobe & Client' }
    ],
    metrics: [
      { label: 'Capsule Sellout', value: '72 Hrs', context: '1,200 units' },
      { label: 'Re-share Index', value: '4.8x', context: 'Over industry benchmark' }
    ],
    workIds: ['work-5', 'work-6'],
    featured: false,
    publishedAt: '2025-11-19'
  },
  {
    id: 'rel-4',
    slug: 'unrehearsed-monologues',
    title: 'Unrehearsed Monologues',
    year: 2025,
    talentIds: ['talent-3'],
    category: 'bts',
    coverUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80',
    summary: 'Raw, unscripted backstage confessions of an actor transitioning between stage and screen.',
    objective: 'Humanize talent vulnerable process to deepen audience loyalty beyond characters.',
    insight: 'People love seeing actors break composure and articulate their creative doubts.',
    concept: 'Dressing-room mirror handheld camera, unedited pauses, micro-expressions preserved.',
    execution: 'Single continuous handheld shot with minimal fill light, direct dialogue into the camera lens.',
    outcome: 'Over 25,000 saves on TikTok and featured in Cinema Asia editorial newsletter.',
    myRoles: ['Interviewer', 'Director', 'Sound Design'],
    credits: [
      { name: 'Arief Rahman', role: 'Director' },
      { name: 'Chelsea Tan', role: 'Actor' }
    ],
    metrics: [
      { label: 'Saves', value: '25.4K', context: 'TikTok bookmark index' },
      { label: 'Comments', value: '1,840', context: 'Active discussions' }
    ],
    workIds: ['work-7', 'work-8'],
    featured: false,
    publishedAt: '2025-10-05'
  }
];

export const WORKS: Work[] = [
  {
    id: 'work-1',
    slug: 'shibuya-rain-echo',
    title: 'Episode 01: The Sound of Shibuya Rain',
    releaseId: 'rel-1',
    talentIds: ['talent-1'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-tokyo-crosswalk-in-the-rain-at-night-42526-large.mp4',
    durationSeconds: 58,
    platform: 'tiktok',
    description: 'A 58-second immersive audio journey following footsteps across neon-lit intersections.',
    myRoles: ['Directing', 'Sound Capture', 'Colorist']
  },
  {
    id: 'work-2',
    slug: 'jakarta-dawn-ascent',
    title: 'Episode 02: Jakarta Dawn Ascent',
    releaseId: 'rel-1',
    talentIds: ['talent-1'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-car-traffic-at-night-in-a-big-city-42636-large.mp4',
    durationSeconds: 65,
    platform: 'instagram',
    description: 'Chasing the sunrise from rooftop parking lots down to foggy thoroughfares.',
    myRoles: ['Scriptwriter', 'Cinematography', 'Editing']
  },
  {
    id: 'work-3',
    slug: 'rio-fender-acoustic',
    title: 'Take 01: Fender Jazzmaster Loop',
    releaseId: 'rel-2',
    talentIds: ['talent-2'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-playing-a-guitar-in-a-studio-43180-large.mp4',
    durationSeconds: 74,
    platform: 'youtube',
    description: 'Uncut single take of harmonic building blocks using pedalboard loops.',
    myRoles: ['Visual Producer', 'Camera Operator']
  },
  {
    id: 'work-4',
    slug: 'rio-vocal-harmony',
    title: 'Take 02: Midnight Vocal Harmonies',
    releaseId: 'rel-2',
    talentIds: ['talent-2'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-musician-singing-into-a-microphone-in-a-studio-43178-large.mp4',
    durationSeconds: 60,
    platform: 'tiktok',
    description: 'Layering three distinct vocal tones on top of live rhodes piano chords.',
    myRoles: ['Lighting Design', 'Live Switcher']
  },
  {
    id: 'work-5',
    slug: 'mrt-velocity-cut',
    title: 'Look 01: MRT Station Velocity',
    releaseId: 'rel-3',
    talentIds: ['talent-1'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-underground-train-arriving-at-a-station-at-night-42635-large.mp4',
    durationSeconds: 42,
    platform: 'instagram',
    description: 'Extreme speed-ramped transitions following the wind draft of arriving commuter trains.',
    myRoles: ['Concept Lead', 'Directing']
  },
  {
    id: 'work-6',
    slug: 'escalator-silhouette',
    title: 'Look 02: Glass Escalator Silhouette',
    releaseId: 'rel-3',
    talentIds: ['talent-1'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-walking-in-a-city-at-night-42637-large.mp4',
    durationSeconds: 38,
    platform: 'tiktok',
    description: 'Silhouette lighting against glass skywalks highlighting garment contours.',
    myRoles: ['Cinematography', 'Colorist']
  },
  {
    id: 'work-7',
    slug: 'mirror-rehearsal',
    title: 'Fragment 01: The Mirror Rehearsal',
    releaseId: 'rel-4',
    talentIds: ['talent-3'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-looking-in-a-mirror-with-lights-42523-large.mp4',
    durationSeconds: 88,
    platform: 'tiktok',
    description: 'A quiet preparation ritual 10 minutes prior to walking onto the stage.',
    myRoles: ['Director', 'Sound Design']
  },
  {
    id: 'work-8',
    slug: 'post-stage-exhale',
    title: 'Fragment 02: Post-Stage Exhale',
    releaseId: 'rel-4',
    talentIds: ['talent-3'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-actress-backstage-laughing-with-colleagues-43179-large.mp4',
    durationSeconds: 52,
    platform: 'instagram',
    description: 'The adrenaline letdown right after the curtain closes and lights dim down.',
    myRoles: ['Handheld Camera', 'Editor']
  }
];
