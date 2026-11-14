import React from 'react';
import { 
  Sparkles, 
  Mail, 
  ExternalLink, 
  Camera, 
  FileText,
  CheckCircle,
  Video,
  PenTool,
  Film,
  Globe
} from 'lucide-react';

export function AboutView() {
  const capabilities = [
    { title: 'Talent Narrative Ideation', desc: 'Crafting genuine personal storytelling arcs tailored for digital audiences.' },
    { title: 'Episodic Series Scripting', desc: 'Structuring episodic hooks and pacing that retain viewers across multiple drops.' },
    { title: 'Vertical Cinematography', desc: 'Native 9:16 mobile composition with high-end camera packages and lighting.' },
    { title: 'Sound Design & Post-Production', desc: 'ASMR, binaural audio, and dynamic rhythm editing that elevates engagement.' }
  ];

  return (
    <div className="space-y-6 pb-36 pt-4 animate-in fade-in duration-300">
      <div className="px-5">
        <h1 className="text-2xl font-black tracking-tight text-white">
          About & Studio
        </h1>
        <p className="text-xs text-zinc-400 mt-0.5">
          Creative direction and production behind the talent discography.
        </p>
      </div>

      {/* Creator Profile Card */}
      <div className="px-5">
        <div className="glass-panel p-5 rounded-3xl border border-white/15 space-y-4 shadow-xl">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/20 flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                alt="Creativico Director"
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
                Arief Rahman
              </h2>
              <p className="text-xs text-zinc-400">
                Creative Director & Talent Storyteller
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 space-y-2">
            <p className="text-xs text-zinc-300 leading-relaxed">
              I turn talent personalities into stories people want to watch and replay. Focused on humanizing cultural icons, musicians, and creators through cinematic vertical short-form productions.
            </p>
          </div>
        </div>
      </div>

      {/* Core Capabilities */}
      <div className="px-5 space-y-3">
        <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
          CORE CRAFT & SERVICES
        </div>
        <div className="space-y-2.5">
          {capabilities.map((cap, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl glass-panel border border-white/10 space-y-1">
              <h4 className="text-xs font-bold text-zinc-100 flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff597d]" />
                <span>{cap.title}</span>
              </h4>
              <p className="text-[11px] text-zinc-400 pl-3.5 leading-relaxed">
                {cap.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Channels */}
      <div className="px-5 space-y-3">
        <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
          START A PROJECT
        </div>

        <div className="space-y-2">
          <a
            href="mailto:contact@creativico.studio"
            className="p-3.5 rounded-2xl glass-panel border border-white/15 flex items-center justify-between hover:border-white/30 transition-all text-xs font-semibold text-zinc-100"
          >
            <div className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-[#ff597d]" />
              <span>contact@creativico.studio</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-2xl glass-panel border border-white/15 flex items-center justify-between hover:border-white/30 transition-all text-xs font-semibold text-zinc-100"
          >
            <div className="flex items-center space-x-3">
              <Camera className="w-4 h-4 text-purple-400" />
              <span>@creativico.studio</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-2xl glass-panel border border-white/15 flex items-center justify-between hover:border-white/30 transition-all text-xs font-semibold text-zinc-100"
          >
            <div className="flex items-center space-x-3">
              <Globe className="w-4 h-4 text-sky-400" />
              <span>LinkedIn Profile</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
          </a>
        </div>
      </div>
    </div>
  );
}
