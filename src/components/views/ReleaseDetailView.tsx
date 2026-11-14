import React from 'react';
import { 
  ArrowLeft, 
  Play, 
  Sparkles, 
  CheckCircle, 
  Clock, 
  Share2, 
  ExternalLink,
  Target,
  Lightbulb,
  Zap
} from 'lucide-react';
import { WORKS, TALENTS } from '../../data/mock';
import { usePlayer } from '../video/PlayerContext';
import type { Release, Work } from '../../types/content';

interface ReleaseDetailViewProps {
  release: Release;
  onBack: () => void;
  onSelectTalent: (talentId: string) => void;
}

export function ReleaseDetailView({ release, onBack, onSelectTalent }: ReleaseDetailViewProps) {
  const { playWork } = usePlayer();
  const releaseWorks = WORKS.filter(w => release.workIds.includes(w.id));
  const talents = TALENTS.filter(t => release.talentIds.includes(t.id));

  return (
    <div className="pb-36 animate-in fade-in duration-300">
      {/* Sticky Navigation Bar */}
      <div className="sticky top-0 z-30 px-5 pt-12 pb-3 flex items-center justify-between glass-panel border-b border-white/10 backdrop-blur-md">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full glass-pill flex items-center justify-center text-zinc-300 hover:text-white"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="text-xs font-bold text-zinc-200 tracking-wide uppercase truncate max-w-[200px]">
          {release.title}
        </span>
        <div className="w-10" />
      </div>

      {/* Hero Album Cover */}
      <div className="px-5 pt-4">
        <div className="relative aspect-square w-full rounded-3xl overflow-hidden glass-panel border border-white/20 shadow-2xl">
          <img
            src={release.coverUrl}
            alt={release.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
          
          <div className="absolute bottom-4 left-4 right-4 space-y-1">
            <span className="glass-pill px-2.5 py-1 rounded-full text-[10px] font-semibold text-zinc-200 uppercase">
              {release.category} • {release.year}
            </span>
            <h1 className="text-xl font-extrabold text-white tracking-tight pt-1">
              {release.title}
            </h1>
            <p className="text-xs text-zinc-300 font-medium">
              {talents.map(t => t.name).join(', ')} {release.brand ? `• ${release.brand}` : ''}
            </p>
          </div>
        </div>
      </div>

      <div className="px-5 pt-6 space-y-6">
        {/* My Role Callout */}
        <div className="p-4 rounded-2xl glass-panel border border-white/15 space-y-2">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#ff597d] block">
            MY SPECIFIC ROLE & CONTRIBUTION
          </span>
          <div className="flex flex-wrap gap-1.5">
            {release.myRoles.map((role, idx) => (
              <span 
                key={idx}
                className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/10 text-zinc-100 border border-white/10"
              >
                {role}
              </span>
            ))}
          </div>
        </div>

        {/* Tracklist (Individual Social Cuts) */}
        <div className="space-y-3">
          <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 flex items-center justify-between">
            <span>TRACKLIST / CONTENT PIECES ({releaseWorks.length})</span>
            <span>TAP TO PLAY</span>
          </div>

          <div className="space-y-2.5">
            {releaseWorks.map((work, idx) => (
              <div
                key={work.id}
                onClick={() => playWork(work)}
                className="glass-panel p-3 rounded-2xl flex items-center justify-between border border-white/10 hover:border-white/25 cursor-pointer active:scale-[0.98] transition-all group"
              >
                <div className="flex items-center space-x-3 overflow-hidden">
                  <span className="text-xs font-mono font-bold text-zinc-500 w-4 text-center">
                    0{idx + 1}
                  </span>
                  <img
                    src={work.thumbnailUrl}
                    alt={work.title}
                    className="w-12 h-14 rounded-xl object-cover border border-white/10 flex-shrink-0"
                  />
                  <div className="overflow-hidden text-left">
                    <h4 className="text-xs font-semibold text-zinc-100 truncate group-hover:text-white">
                      {work.title}
                    </h4>
                    <p className="text-[10px] text-zinc-400 truncate mt-0.5">
                      {work.durationSeconds}s • {work.platform?.toUpperCase()}
                    </p>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full glass-pill flex items-center justify-center text-zinc-300 group-hover:text-white flex-shrink-0">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5 text-[#ff597d]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Creative Notes: Strategic Rationale */}
        <div className="space-y-3">
          <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#ff597d]" />
            <span>CREATIVE NOTES (THE STORY BEHIND)</span>
          </div>

          <div className="space-y-3">
            {release.objective && (
              <div className="p-4 rounded-2xl glass-panel border border-white/10 space-y-1">
                <span className="text-[10px] font-bold text-[#ff597d] uppercase tracking-wider block">
                  The Objective
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed">{release.objective}</p>
              </div>
            )}

            {release.insight && (
              <div className="p-4 rounded-2xl glass-panel border border-white/10 space-y-1">
                <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block">
                  Cultural / Audience Insight
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed">{release.insight}</p>
              </div>
            )}

            {release.concept && (
              <div className="p-4 rounded-2xl glass-panel border border-white/10 space-y-1">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                  The Concept
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed">{release.concept}</p>
              </div>
            )}

            {release.execution && (
              <div className="p-4 rounded-2xl glass-panel border border-white/10 space-y-1">
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block">
                  Execution & Craft
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed">{release.execution}</p>
              </div>
            )}
          </div>
        </div>

        {/* Verified Results */}
        {release.metrics && release.metrics.length > 0 && (
          <div className="space-y-3">
            <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
              VERIFIED IMPACT & ENGAGEMENT
            </div>
            <div className="grid grid-cols-2 gap-3">
              {release.metrics.map((metric, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl glass-panel border border-white/10 space-y-0.5">
                  <span className="text-[10px] text-zinc-400 font-medium block">
                    {metric.label}
                  </span>
                  <div className="text-lg font-black text-white">{metric.value}</div>
                  {metric.context && (
                    <span className="text-[9px] text-zinc-500 block">{metric.context}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Team Credits */}
        {release.credits && (
          <div className="space-y-2 pt-2">
            <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
              CREDITS & COLLABORATORS
            </div>
            <div className="glass-panel p-3.5 rounded-2xl border border-white/10 space-y-2">
              {release.credits.map((c, i) => (
                <div key={i} className="flex justify-between text-xs py-1 border-b border-white/5 last:border-0">
                  <span className="text-zinc-200 font-medium">{c.name}</span>
                  <span className="text-zinc-400 text-[11px]">{c.role}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
