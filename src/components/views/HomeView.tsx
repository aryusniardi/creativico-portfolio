import React from 'react';
import { Play, Sparkles, ChevronRight, TrendingUp } from 'lucide-react';
import { RELEASES, TALENTS, WORKS } from '../../data/mock';
import { usePlayer } from '../video/PlayerContext';
import type { Release, Work } from '../../types/content';

interface HomeViewProps {
  onSelectRelease: (release: Release) => void;
  onSelectTalent: (talentId: string) => void;
  onNavigateTab: (tab: string) => void;
}

export function HomeView({ onSelectRelease, onSelectTalent, onNavigateTab }: HomeViewProps) {
  const { playWork, getTalentById } = usePlayer();

  const featuredRelease = RELEASES.find(r => r.featured) || RELEASES[0];
  const featuredTalents = featuredRelease.talentIds.map(id => getTalentById(id)).filter(Boolean);
  const onRepeatWorks = WORKS.slice(0, 3);
  const recentlyDropped = RELEASES.slice(0, 4);

  return (
    <div className="space-y-7 pb-36 pt-4 animate-in fade-in duration-300">
      {/* Intro Header */}
      <div className="px-5 space-y-1">
        <div className="flex items-center space-x-2 text-[10px] tracking-widest uppercase font-semibold text-zinc-400">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff597d] animate-pulse" />
          <span>CREATIVE PORTFOLIO / 2026</span>
        </div>
        <h1 className="text-2xl font-black tracking-tight text-white leading-tight">
          Made to be seen.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-400">
            Worth replaying.
          </span>
        </h1>
        <p className="text-xs text-zinc-400 pt-1 leading-relaxed">
          Curated creative content discography for top talents, artists & cultural entertainment brands.
        </p>
      </div>

      {/* Featured Release Hero Card */}
      <div className="px-5">
        <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 mb-2.5 flex items-center justify-between">
          <span>FEATURED RELEASE</span>
          <span className="text-[#ff597d] font-semibold text-[10px]">NEW SINGLE</span>
        </div>

        <div 
          onClick={() => onSelectRelease(featuredRelease)}
          className="group relative rounded-3xl overflow-hidden glass-panel border border-white/20 cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:border-white/30 shadow-2xl"
        >
          {/* Cover Art with Vignette */}
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <img 
              src={featuredRelease.coverUrl} 
              alt={featuredRelease.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0f] via-transparent to-black/30" />
            
            {/* Top Badges */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <span className="glass-pill px-3 py-1 rounded-full text-[10px] font-semibold text-zinc-100 uppercase tracking-wider">
                {featuredRelease.category}
              </span>
              <span className="glass-pill px-2.5 py-1 rounded-full text-[10px] font-mono text-zinc-300">
                {featuredRelease.year}
              </span>
            </div>

            {/* Bottom Details Overlay */}
            <div className="absolute bottom-4 left-4 right-4 space-y-2">
              <div className="space-y-0.5">
                <span className="text-[10px] text-zinc-300 uppercase tracking-widest font-medium">
                  {featuredTalents.map(t => t?.name).join(', ')}
                </span>
                <h3 className="text-xl font-extrabold text-white tracking-tight leading-snug">
                  {featuredRelease.title}
                </h3>
              </div>

              <p className="text-[11px] text-zinc-300 line-clamp-2 leading-relaxed">
                {featuredRelease.summary}
              </p>

              {/* Roles Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {featuredRelease.myRoles.slice(0, 3).map((role, idx) => (
                  <span 
                    key={idx}
                    className="px-2 py-0.5 rounded-full text-[9px] font-medium bg-black/40 text-zinc-200 border border-white/15"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* On Repeat: Top Short-Form Tracks */}
      <div className="space-y-3">
        <div className="px-5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-[#ff597d]" />
            <h2 className="text-sm font-bold text-white tracking-wide uppercase">
              On Repeat (Top Cuts)
            </h2>
          </div>
          <span className="text-[10px] text-zinc-400">9:16 Vertical</span>
        </div>

        <div className="px-5 space-y-2.5">
          {onRepeatWorks.map((work, idx) => {
            const rel = RELEASES.find(r => r.id === work.releaseId);
            return (
              <div
                key={work.id}
                onClick={() => playWork(work)}
                className="glass-panel p-2.5 rounded-2xl flex items-center justify-between border border-white/10 hover:border-white/25 cursor-pointer active:scale-[0.98] transition-all group"
              >
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div className="relative w-12 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
                    <img 
                      src={work.thumbnailUrl} 
                      alt={work.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-4 h-4 text-white fill-current ml-0.5" />
                    </div>
                  </div>
                  <div className="flex flex-col text-left truncate">
                    <span className="text-xs font-semibold text-zinc-100 truncate group-hover:text-white">
                      {work.title}
                    </span>
                    <span className="text-[10px] text-zinc-400 truncate">
                      {rel?.title} • {work.durationSeconds}s
                    </span>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full glass-pill flex items-center justify-center text-zinc-300 group-hover:text-white flex-shrink-0 ml-2">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5 text-[#ff597d]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recently Dropped Releases Carousel */}
      <div className="space-y-3">
        <div className="px-5 flex items-center justify-between">
          <h2 className="text-sm font-bold text-white tracking-wide uppercase">
            Recently Dropped
          </h2>
          <button 
            onClick={() => onNavigateTab('library')}
            className="text-[10px] text-zinc-400 hover:text-white flex items-center space-x-0.5"
          >
            <span>See all</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="flex space-x-3 overflow-x-auto px-5 no-scrollbar pb-2">
          {recentlyDropped.map((rel) => (
            <div
              key={rel.id}
              onClick={() => onSelectRelease(rel)}
              className="flex-shrink-0 w-36 space-y-2 cursor-pointer group"
            >
              <div className="aspect-square w-full rounded-2xl overflow-hidden glass-panel border border-white/10 group-hover:border-white/30 transition-all duration-300">
                <img 
                  src={rel.coverUrl} 
                  alt={rel.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-semibold text-zinc-100 truncate group-hover:text-white">
                  {rel.title}
                </h4>
                <p className="text-[10px] text-zinc-400 truncate">
                  {rel.brand || `${rel.year} • ${rel.category}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Talents Avatar Strip */}
      <div className="space-y-3">
        <div className="px-5 flex items-center justify-between">
          <h2 className="text-sm font-bold text-white tracking-wide uppercase">
            Collaborating Talents
          </h2>
          <button 
            onClick={() => onNavigateTab('talents')}
            className="text-[10px] text-zinc-400 hover:text-white flex items-center space-x-0.5"
          >
            <span>Roster</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="flex space-x-4 overflow-x-auto px-5 no-scrollbar pb-2">
          {TALENTS.map((talent) => (
            <div 
              key={talent.id}
              onClick={() => onSelectTalent(talent.id)}
              className="flex flex-col items-center flex-shrink-0 cursor-pointer space-y-1.5 group"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/15 group-hover:border-[#ff597d] transition-all p-0.5">
                <img 
                  src={talent.portraitUrl} 
                  alt={talent.name} 
                  className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="text-[11px] font-medium text-zinc-200 group-hover:text-white text-center w-16 truncate">
                {talent.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Contact Teaser Banner */}
      <div className="px-5">
        <div 
          onClick={() => onNavigateTab('about')}
          className="glass-panel p-5 rounded-3xl border border-white/15 text-center space-y-2 cursor-pointer hover:border-[#ff597d]/50 transition-all"
        >
          <Sparkles className="w-5 h-5 text-[#ff597d] mx-auto" />
          <h3 className="text-sm font-bold text-white tracking-tight">
            Let's make something people replay.
          </h3>
          <p className="text-[11px] text-zinc-400 max-w-[240px] mx-auto">
            Available for selected talent creative direction, episodic scripting, and social production.
          </p>
          <div className="pt-2">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white text-black font-semibold text-xs active:scale-95 transition-all">
              Connect / Discuss
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
