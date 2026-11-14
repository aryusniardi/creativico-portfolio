import React, { useState } from 'react';
import { Search, Sparkles, Filter, ChevronRight, Play } from 'lucide-react';
import { RELEASES, WORKS } from '../../data/mock';
import { usePlayer } from '../video/PlayerContext';
import type { Release, Work } from '../../types/content';

interface LibraryViewProps {
  onSelectRelease: (release: Release) => void;
}

export function LibraryView({ onSelectRelease }: LibraryViewProps) {
  const { playWork } = usePlayer();
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filterChips = [
    { id: 'all', label: 'All Catalog' },
    { id: 'campaign', label: 'Campaigns' },
    { id: 'series', label: 'Series' },
    { id: 'brand-collab', label: 'Brand Collabs' },
    { id: 'bts', label: 'BTS Confessions' },
  ];

  const filteredReleases = RELEASES.filter(rel => {
    const matchesFilter = filter === 'all' || rel.category === filter;
    const matchesSearch = rel.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rel.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (rel.brand && rel.brand.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-36 pt-4 animate-in fade-in duration-300">
      {/* Title */}
      <div className="px-5">
        <h1 className="text-2xl font-black tracking-tight text-white">
          Creative Library
        </h1>
        <p className="text-xs text-zinc-400 mt-0.5">
          Complete discography of releases, formats, and video assets.
        </p>
      </div>

      {/* Search Input */}
      <div className="px-5">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search campaigns, brands, or insights..."
            className="w-full h-11 pl-10 pr-4 rounded-2xl glass-panel text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#ff597d]/60 border border-white/10 transition-all"
          />
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex space-x-2 overflow-x-auto px-5 no-scrollbar pb-1">
        {filterChips.map(chip => (
          <button
            key={chip.id}
            onClick={() => setFilter(chip.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              filter === chip.id
                ? 'bg-white text-black font-semibold'
                : 'glass-pill text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Releases Grid */}
      <div className="px-5 space-y-4">
        <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 flex items-center justify-between">
          <span>RELEASES & CAMPAIGNS ({filteredReleases.length})</span>
          <span>SORT: NEWEST</span>
        </div>

        {filteredReleases.length === 0 ? (
          <div className="text-center py-12 glass-panel rounded-3xl p-6 border border-white/10">
            <p className="text-xs text-zinc-400">No campaigns found matching your criteria.</p>
            <button 
              onClick={() => { setFilter('all'); setSearchQuery(''); }}
              className="mt-3 text-xs text-[#ff597d] font-semibold underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3.5">
            {filteredReleases.map(rel => (
              <div
                key={rel.id}
                onClick={() => onSelectRelease(rel)}
                className="group glass-panel rounded-2xl overflow-hidden border border-white/10 hover:border-white/25 cursor-pointer flex flex-col justify-between transition-all duration-200 hover:scale-[1.02]"
              >
                <div className="aspect-square w-full relative overflow-hidden">
                  <img
                    src={rel.coverUrl}
                    alt={rel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="glass-pill px-2 py-0.5 rounded-full text-[9px] font-mono text-zinc-200">
                      {rel.year}
                    </span>
                  </div>
                </div>

                <div className="p-3 space-y-1">
                  <h3 className="text-xs font-bold text-zinc-100 truncate group-hover:text-white">
                    {rel.title}
                  </h3>
                  <p className="text-[10px] text-zinc-400 truncate">
                    {rel.brand || rel.category}
                  </p>
                  <p className="text-[9px] text-[#ff597d] font-medium pt-0.5">
                    {rel.workIds.length} video tracks
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Standalone Short-form tracks catalog */}
      <div className="px-5 space-y-3 pt-2">
        <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
          ALL INDIVIDUAL TRACKS ({WORKS.length})
        </div>

        <div className="space-y-2">
          {WORKS.map((work) => (
            <div
              key={work.id}
              onClick={() => playWork(work)}
              className="glass-panel p-2.5 rounded-xl flex items-center justify-between border border-white/10 hover:border-white/20 cursor-pointer active:scale-[0.98] transition-all group"
            >
              <div className="flex items-center space-x-3 overflow-hidden">
                <img
                  src={work.thumbnailUrl}
                  alt={work.title}
                  className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-white/10"
                />
                <div className="truncate text-left">
                  <span className="text-xs font-medium text-zinc-200 block truncate group-hover:text-white">
                    {work.title}
                  </span>
                  <span className="text-[10px] text-zinc-400">
                    {work.platform?.toUpperCase()} • {work.durationSeconds}s
                  </span>
                </div>
              </div>

              <div className="w-7 h-7 rounded-full glass-pill flex items-center justify-center text-zinc-300 group-hover:text-white">
                <Play className="w-3 h-3 fill-current ml-0.5 text-[#ff597d]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
