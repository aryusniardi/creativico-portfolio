import React from 'react';
import { 
  Sparkles, 
  Mail, 
  ExternalLink, 
  Phone, 
  FileText,
  CheckCircle,
  Video,
  PenTool,
  Film,
  Globe,
  Award,
  Layers,
  HeartHandshake
} from 'lucide-react';
import { PROFILE } from '../../data/mock';

export function AboutView() {
  return (
    <div className="space-y-6 pb-36 pt-4 animate-in fade-in duration-300">
      <div className="px-5">
        <h1 className="text-2xl font-black tracking-tight text-white">
          About & Profile
        </h1>
        <p className="text-xs text-zinc-400 mt-0.5">
          {PROFILE.headline}
        </p>
      </div>

      {/* Creator Profile Card */}
      <div className="px-5">
        <div className="glass-panel p-5 rounded-3xl border border-white/15 space-y-4 shadow-xl">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/20 flex-shrink-0 bg-zinc-800">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
                alt={PROFILE.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">
                  Open for Collaborations
                </span>
              </div>
              <h2 className="text-base font-extrabold text-white">
                {PROFILE.name} ({PROFILE.nickname})
              </h2>
              <p className="text-xs text-[#ff375f] font-medium">
                {PROFILE.headline}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {PROFILE.tags.map((tag, idx) => (
              <span key={idx} className="text-[9px] uppercase tracking-wider font-semibold text-zinc-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          <div className="pt-2 border-t border-white/10 space-y-2">
            <p className="text-xs font-semibold text-zinc-200 leading-snug">
              "{PROFILE.bioHeadline}"
            </p>
            <p className="text-xs text-zinc-400 leading-relaxed font-normal">
              {PROFILE.bio}
            </p>
          </div>
        </div>
      </div>

      {/* Five Disciplines / Creative DNA */}
      <div className="px-5 space-y-3">
        <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
          MY CREATIVE DNA (FIVE DISCIPLINES)
        </div>
        <div className="grid grid-cols-2 gap-2 text-left">
          <div className="p-3.5 rounded-2xl glass-panel border border-white/10 space-y-1">
            <span className="text-[10px] text-[#ff375f] font-mono font-bold">01. RESEARCH</span>
            <p className="text-xs font-semibold text-zinc-200">Critical Observation</p>
            <p className="text-[10px] text-zinc-400">Deep veterinary-honed research rigor.</p>
          </div>
          <div className="p-3.5 rounded-2xl glass-panel border border-white/10 space-y-1">
            <span className="text-[10px] text-[#ff375f] font-mono font-bold">02. HUMAN</span>
            <p className="text-xs font-semibold text-zinc-200">Human-First Empathy</p>
            <p className="text-[10px] text-zinc-400">Understanding audience emotional triggers.</p>
          </div>
          <div className="p-3.5 rounded-2xl glass-panel border border-white/10 space-y-1">
            <span className="text-[10px] text-[#ff375f] font-mono font-bold">03. BUSINESS</span>
            <p className="text-xs font-semibold text-zinc-200">Strategic Alignment</p>
            <p className="text-[10px] text-zinc-400">Bridging brand brief with creator voice.</p>
          </div>
          <div className="p-3.5 rounded-2xl glass-panel border border-white/10 space-y-1">
            <span className="text-[10px] text-[#ff375f] font-mono font-bold">04. PRODUCTION</span>
            <p className="text-xs font-semibold text-zinc-200">Execution Discipline</p>
            <p className="text-[10px] text-zinc-400">Leading 20+ crew up to Rp200M+ budgets.</p>
          </div>
        </div>
      </div>

      {/* Awards & Recognition */}
      <div className="px-5 space-y-3">
        <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
          HONORS & CERTIFICATION
        </div>
        <div className="space-y-2">
          {PROFILE.awards.map((award, i) => (
            <div key={i} className="p-3.5 rounded-2xl glass-panel border border-white/10 flex items-start space-x-3">
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mt-0.5 flex-shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div className="space-y-0.5 text-left flex-1">
                <span className="text-xs font-bold text-zinc-100">{award.title}</span>
                <p className="text-[10px] font-semibold text-[#ff375f]">{award.issuer}</p>
                <p className="text-[10px] text-zinc-400">{award.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Direct Contact Channels */}
      <div className="px-5 space-y-3">
        <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
          DIRECT CONNECT
        </div>

        <div className="space-y-2">
          <a
            href={`mailto:${PROFILE.email}`}
            className="p-3.5 rounded-2xl glass-panel border border-white/15 flex items-center justify-between hover:border-white/30 transition-all text-xs font-semibold text-zinc-100"
          >
            <div className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-[#ff375f]" />
              <span>{PROFILE.email}</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
          </a>

          <a
            href="https://wa.me/6281233516479"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-2xl glass-panel border border-white/15 flex items-center justify-between hover:border-white/30 transition-all text-xs font-semibold text-zinc-100"
          >
            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>{PROFILE.phone} (WhatsApp)</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
          </a>

          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-2xl glass-panel border border-white/15 flex items-center justify-between hover:border-white/30 transition-all text-xs font-semibold text-zinc-100"
          >
            <div className="flex items-center space-x-3">
              <Globe className="w-4 h-4 text-sky-400" />
              <span>LinkedIn Profile (victordechaz)</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
          </a>
        </div>
      </div>
    </div>
  );
}
