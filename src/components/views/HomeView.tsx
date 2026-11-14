import React from 'react';
import { ChevronRight, Play, Sparkles } from 'lucide-react';
import { PROFILE, RELEASES, TALENTS, WORKS } from '../../data/mock';
import { usePlayer } from '../video/PlayerContext';
import { GlassCard } from '@zakisheriff/liquid-glass';

interface HomeViewProps {
  onSelectRelease: (releaseId: string) => void;
  onSelectTalent: (talentId: string) => void;
}

export function HomeView({ onSelectRelease, onSelectTalent }: HomeViewProps) {
  const { playWork } = usePlayer();

  const featuredRelease = RELEASES[0]; // Sitha Marino
  const topTracks = WORKS.slice(0, 4);

  return (
    <div className="space-y-6 pb-28 text-white">
      {/* 1. APPLE MUSIC LARGE TITLE HEADER */}
      <header className="px-5 pt-2 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#ff375f]">
            CREATIVE PORTFOLIO 2026
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-white font-sans mt-0.5">
            Listen Now
          </h1>
        </div>
        {/* User Account Avatar with profile link affordance */}
        <div className="relative group cursor-pointer">
          <div className="w-9 h-9 rounded-full overflow-hidden border border-white/20 shadow-md bg-zinc-800 flex items-center justify-center p-0.5">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" 
              alt="Victor Decha Zhevanya"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
      </header>

      {/* 2. SECTION 1: FEATURED RELEASES (Curated Stories) */}
      <section className="space-y-3">
        <div className="px-5">
          <h2 className="text-xl font-bold tracking-tight text-white">
            Featured Projects
          </h2>
        </div>

        {/* Carousel */}
        <div className="flex space-x-4 overflow-x-auto no-scrollbar px-5 snap-x snap-mandatory">
          {/* Card 1: Featured Story (Favorite Songs style from screenshot) */}
          <div 
            onClick={() => onSelectRelease(featuredRelease.id)}
            className="flex-shrink-0 w-[280px] snap-center cursor-pointer group"
          >
            <GlassCard
              padding="16px"
              radius="24px"
              intensity={7}
              style={{
                background: 'linear-gradient(145deg, rgba(255,55,95,0.25) 0%, rgba(30,20,40,0.65) 100%)',
                border: '0.5px solid rgba(255,255,255,0.3)',
                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.7)'
              }}
            >
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-3 shadow-lg bg-zinc-900">
                <img 
                  src={featuredRelease.coverUrl} 
                  alt={featuredRelease.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                
                {/* Badge Overlay */}
                <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-wider text-[#ff375f]">
                  Featured Release
                </div>

                <div className="absolute bottom-2.5 right-2.5 w-10 h-10 rounded-full bg-[#ff375f] flex items-center justify-center text-white shadow-xl group-hover:scale-110 active:scale-95 transition-all">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
              </div>

              <div className="space-y-0.5">
                <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wide">
                  Creative Direction & Strategy
                </span>
                <h3 className="text-lg font-bold text-white leading-tight truncate">
                  {featuredRelease.title}
                </h3>
                <p className="text-xs text-zinc-300 line-clamp-1">
                  {featuredRelease.summary}
                </p>
              </div>
            </GlassCard>
          </div>

          {/* Card 2: Second Big Project (HITAM Music Video) */}
          {RELEASES[1] && (
            <div 
              onClick={() => onSelectRelease(RELEASES[1].id)}
              className="flex-shrink-0 w-[280px] snap-center cursor-pointer group"
            >
              <GlassCard
                padding="16px"
                radius="24px"
                intensity={7}
                style={{
                  background: 'linear-gradient(145deg, rgba(40,40,55,0.6) 0%, rgba(15,15,22,0.8) 100%)',
                  border: '0.5px solid rgba(255,255,255,0.25)',
                  boxShadow: '0 20px 40px -10px rgba(0,0,0,0.7)'
                }}
              >
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-3 shadow-lg bg-zinc-900">
                  <img 
                    src={RELEASES[1].coverUrl} 
                    alt={RELEASES[1].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                  
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-wider text-purple-400">
                    Official Music Video
                  </div>

                  <div className="absolute bottom-2.5 right-2.5 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-xl group-hover:scale-110 active:scale-95 transition-all">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>

                <div className="space-y-0.5">
                  <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wide">
                    Director · Blok M Exterior
                  </span>
                  <h3 className="text-lg font-bold text-white leading-tight truncate">
                    {RELEASES[1].title}
                  </h3>
                  <p className="text-xs text-zinc-300 line-clamp-1">
                    {RELEASES[1].summary}
                  </p>
                </div>
              </GlassCard>
            </div>
          )}
        </div>
      </section>

      {/* 3. SECTION 2: RECENT RELEASES */}
      <section className="space-y-3">
        <div className="px-5 flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center space-x-1">
            <span>Recent Releases</span>
            <ChevronRight className="w-5 h-5 text-zinc-400" />
          </h2>
        </div>

        <div className="flex space-x-3.5 overflow-x-auto no-scrollbar px-5 snap-x">
          {RELEASES.map((rel) => (
            <div 
              key={rel.id}
              onClick={() => onSelectRelease(rel.id)}
              className="flex-shrink-0 w-36 snap-start cursor-pointer group"
            >
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-2 shadow-md bg-zinc-900 border border-white/10 group-hover:border-white/30 transition-all">
                <img 
                  src={rel.coverUrl} 
                  alt={rel.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                />
              </div>
              <h4 className="text-xs font-bold text-white truncate leading-snug">
                {rel.title}
              </h4>
              <p className="text-[11px] text-zinc-400 truncate">
                {rel.brand || 'Victor Decha Zhevanya'}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SECTION 3: ON REPEAT (Top Vertical Video Tracks) */}
      <section className="space-y-3 px-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-white">
            On Repeat
          </h2>
        </div>

        <div className="space-y-2">
          {topTracks.map((work, idx) => (
            <div
              key={work.id}
              onClick={() => playWork(work)}
              className="p-2.5 rounded-2xl flex items-center justify-between cursor-pointer active:scale-[0.98] transition-all group"
            >
              <GlassCard
                padding="8px 12px"
                radius="16px"
                intensity={5}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.4)'
                }}
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <span className="text-sm font-semibold text-zinc-500 w-4 text-center">
                    {idx + 1}
                  </span>
                  
                  <div className="relative w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
                    <img 
                      src={work.thumbnailUrl} 
                      alt={work.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="min-w-0">
                    <h4 className="text-xs font-semibold text-white truncate">
                      {work.title}
                    </h4>
                    <p className="text-[11px] text-zinc-400 truncate">
                      {work.myRoles.join(' · ')}
                    </p>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 group-hover:text-white flex-shrink-0 ml-2">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </section>

      {/* 5. ARTISTS / TALENTS ROSTER */}
      <section className="space-y-3 px-5">
        <h2 className="text-xl font-bold tracking-tight text-white">
          Talents & Collaborators
        </h2>

        <div className="flex space-x-4 overflow-x-auto no-scrollbar py-1">
          {TALENTS.map((talent) => (
            <div
              key={talent.id}
              onClick={() => onSelectTalent(talent.id)}
              className="flex flex-col items-center space-y-1.5 flex-shrink-0 cursor-pointer group"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden border border-white/10 group-hover:border-white/30 transition-all shadow-lg p-0.5 bg-zinc-800">
                <img 
                  src={talent.portraitUrl} 
                  alt={talent.name}
                  className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="text-[11px] font-medium text-zinc-300 group-hover:text-white truncate max-w-[70px] text-center">
                {talent.name.split(' ')[0]}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
