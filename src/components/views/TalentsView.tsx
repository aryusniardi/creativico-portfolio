import React from 'react';
import { Users, ChevronRight, Sparkles } from 'lucide-react';
import { TALENTS, RELEASES } from '../../data/mock';

interface TalentsViewProps {
  onSelectTalent: (talentId: string) => void;
}

export function TalentsView({ onSelectTalent }: TalentsViewProps) {
  return (
    <div className="space-y-6 pb-36 pt-4 animate-in fade-in duration-300">
      <div className="px-5">
        <h1 className="text-2xl font-black tracking-tight text-white">
          Talent Roster
        </h1>
        <p className="text-xs text-zinc-400 mt-0.5">
          Creators, performers, and artists with directed digital narratives.
        </p>
      </div>

      <div className="px-5 space-y-3.5">
        {TALENTS.map(talent => {
          const associatedReleases = RELEASES.filter(r => r.talentIds.includes(talent.id));
          return (
            <div
              key={talent.id}
              onClick={() => onSelectTalent(talent.id)}
              className="glass-panel p-4 rounded-3xl border border-white/10 hover:border-white/25 cursor-pointer transition-all duration-200 hover:scale-[1.01] flex items-center justify-between group shadow-lg"
            >
              <div className="flex items-center space-x-3.5 overflow-hidden">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/15 flex-shrink-0">
                  <img
                    src={talent.portraitUrl}
                    alt={talent.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="text-left overflow-hidden">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-sm font-bold text-white tracking-tight truncate group-hover:text-[#ff597d] transition-colors">
                      {talent.name}
                    </h3>
                    <span className="glass-pill px-2 py-0.5 rounded-full text-[9px] uppercase font-semibold text-zinc-300">
                      {talent.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
                    {talent.bio}
                  </p>
                  <p className="text-[10px] text-zinc-500 font-medium mt-1">
                    {associatedReleases.length} collaborative releases
                  </p>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full glass-pill flex items-center justify-center text-zinc-400 group-hover:text-white flex-shrink-0 ml-2">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
