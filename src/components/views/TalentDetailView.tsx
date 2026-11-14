import React from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  Layers, 
  ExternalLink, 
  Award,
  CheckCircle2,
  Calendar,
  Briefcase
} from 'lucide-react';
import { TALENTS, RELEASES } from '../../data/mock';
import type { Release } from '../../types/content';

interface TalentDetailViewProps {
  talentId: string;
  onBack: () => void;
  onSelectRelease: (release: Release) => void;
}

export function TalentDetailView({ talentId, onBack, onSelectRelease }: TalentDetailViewProps) {
  const talent = TALENTS.find(t => t.id === talentId);
  const releases = RELEASES.filter(r => r.talentIds.includes(talentId));

  if (!talent) return null;

  return (
    <div className="pb-36 animate-in fade-in duration-300">
      {/* Top Bar */}
      <div className="sticky top-0 z-30 px-5 pt-12 pb-3 flex items-center justify-between glass-panel border-b border-white/10 backdrop-blur-md">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full glass-pill flex items-center justify-center text-zinc-300 hover:text-white"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="text-xs font-bold text-zinc-200 tracking-wide uppercase">
          Talent Dossier
        </span>
        <div className="w-10" />
      </div>

      {/* Hero Cover Banner */}
      <div className="relative w-full h-56 overflow-hidden">
        <img
          src={talent.coverUrl || talent.portraitUrl}
          alt={talent.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0f] via-transparent to-black/30" />
      </div>

      {/* Talent Info Header */}
      <div className="px-5 -mt-14 relative z-10 space-y-4">
        <div className="w-24 h-24 rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl p-0.5 glass-panel">
          <img
            src={talent.portraitUrl}
            alt={talent.name}
            className="w-full h-full object-cover rounded-[22px]"
          />
        </div>

        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black text-white tracking-tight">
              {talent.name}
            </h1>
            <span className="glass-pill px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-[#ff597d] uppercase">
              {talent.category}
            </span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed pt-1">
            {talent.bio}
          </p>
        </div>

        {/* Releases Collaborated */}
        <div className="pt-4 space-y-3">
          <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
            COLLABORATIVE RELEASES ({releases.length})
          </div>

          <div className="space-y-3">
            {releases.map(rel => (
              <div
                key={rel.id}
                onClick={() => onSelectRelease(rel)}
                className="glass-panel p-3.5 rounded-2xl border border-white/10 hover:border-white/25 cursor-pointer flex items-center space-x-3.5 group transition-all"
              >
                <img
                  src={rel.coverUrl}
                  alt={rel.title}
                  className="w-14 h-14 rounded-xl object-cover border border-white/10 flex-shrink-0"
                />
                <div className="overflow-hidden text-left flex-1">
                  <h4 className="text-xs font-bold text-white truncate group-hover:text-[#ff597d]">
                    {rel.title}
                  </h4>
                  <p className="text-[10px] text-zinc-400 truncate mt-0.5">
                    {rel.brand ? `${rel.brand} • ` : ''}{rel.category}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {rel.myRoles.slice(0, 2).map((r, i) => (
                      <span key={i} className="text-[8px] px-1.5 py-0.5 rounded bg-white/10 text-zinc-300">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
