import React, { useRef, useState, useEffect } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  ChevronDown, 
  Share2, 
  Sparkles,
  Info,
  Clock,
  Layers
} from 'lucide-react';
import { usePlayer } from './PlayerContext';

export function NowShowing() {
  const { 
    currentWork, 
    isPlaying, 
    togglePlay, 
    isNowShowingOpen, 
    closeNowShowing, 
    isMuted, 
    toggleMute,
    activeRelease,
    activeTalents
  } = usePlayer();

  const [showNotes, setShowNotes] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, currentWork]);

  if (!isNowShowingOpen || !currentWork) return null;

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const cur = videoRef.current.currentTime;
      const dur = videoRef.current.duration || currentWork.durationSeconds || 60;
      setCurrentTimeSec(Math.floor(cur));
      setProgress((cur / dur) * 100);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickPos = (e.clientX - rect.left) / rect.width;
      const dur = videoRef.current.duration || currentWork.durationSeconds || 60;
      videoRef.current.currentTime = clickPos * dur;
    }
  };

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainingSecs = Math.floor(sec % 60);
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  return (
    <div className="absolute inset-0 z-50 bg-[#0b0b0f] flex flex-col justify-between overflow-hidden animate-in fade-in zoom-in-95 duration-200">
      {/* Ambient Glow */}
      <div 
        className="absolute inset-0 opacity-40 blur-3xl pointer-events-none scale-125"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 30%, #ff597d 0%, #17171e 65%, #0b0b0f 100%)`
        }}
      />

      {/* Top Header bar */}
      <div className="relative z-10 flex items-center justify-between px-5 pt-12 pb-3">
        <button 
          onClick={closeNowShowing}
          className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-zinc-300 hover:text-white active:scale-95 transition-all"
          aria-label="Close"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
        <div className="flex flex-col items-center text-center">
          <span className="text-[10px] tracking-widest uppercase font-semibold text-zinc-400">
            NOW SHOWING
          </span>
          <span className="text-xs font-medium text-zinc-200 truncate max-w-[180px]">
            {activeRelease?.title || 'Release Single'}
          </span>
        </div>
        <button 
          onClick={toggleMute}
          className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-zinc-300 hover:text-white active:scale-95 transition-all"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Video Content Canvas (9:16 Aspect ratio container) */}
      <div className="relative flex-1 flex items-center justify-center px-4 my-auto overflow-hidden">
        <div className="relative w-full max-w-[320px] aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-zinc-950 flex items-center justify-center group">
          {currentWork.videoUrl ? (
            <video
              ref={videoRef}
              src={currentWork.videoUrl}
              poster={currentWork.thumbnailUrl}
              muted={isMuted}
              loop
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onClick={togglePlay}
              className="w-full h-full object-cover cursor-pointer"
            />
          ) : (
            <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center">
              <img 
                src={currentWork.thumbnailUrl} 
                alt={currentWork.title} 
                className="absolute inset-0 w-full h-full object-cover opacity-60 filter blur-sm"
              />
              <div className="relative z-10 glass-panel p-5 rounded-2xl border border-white/20 max-w-[240px]">
                <Sparkles className="w-8 h-8 text-[#ff597d] mx-auto mb-2" />
                <p className="text-xs font-semibold text-zinc-100">Official Social Reel</p>
                <p className="text-[10px] text-zinc-400 mt-1">Available via original platform release</p>
              </div>
            </div>
          )}

          {/* Central Play/Pause Watermark on hover/tap */}
          {!isPlaying && (
            <button 
              onClick={togglePlay}
              className="absolute z-20 w-16 h-16 rounded-full glass-panel flex items-center justify-center text-white shadow-2xl backdrop-blur-md hover:scale-105 active:scale-95 transition-all border border-white/30"
            >
              <Play className="w-7 h-7 fill-current ml-1 text-white" />
            </button>
          )}
        </div>
      </div>

      {/* Bottom Track Controls & Rationale trigger */}
      <div className="relative z-10 px-6 pb-10 pt-2 space-y-4">
        {/* Scrubber Progress Bar */}
        <div className="space-y-1">
          <div 
            onClick={handleSeek}
            className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden cursor-pointer relative group"
          >
            <div 
              className="h-full bg-[#ff597d] rounded-full transition-all duration-100 relative"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-zinc-400 font-medium px-0.5">
            <span>{formatTime(currentTimeSec)}</span>
            <span>{formatTime(currentWork.durationSeconds || 60)}</span>
          </div>
        </div>

        {/* Title, Talent, Roles */}
        <div className="flex items-center justify-between">
          <div className="overflow-hidden pr-3">
            <h2 className="text-lg font-bold text-white tracking-tight truncate">
              {currentWork.title}
            </h2>
            <p className="text-xs text-zinc-300 font-medium truncate mt-0.5">
              {activeTalents.map(t => t.name).join(', ')}
            </p>
            <div className="flex flex-wrap gap-1 mt-2">
              {currentWork.myRoles.map((role, idx) => (
                <span 
                  key={idx}
                  className="px-2 py-0.5 rounded-full text-[9px] font-medium bg-white/10 text-zinc-300 border border-white/10"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={() => setShowNotes(true)}
            className="flex-shrink-0 px-3 py-2 rounded-xl glass-panel text-xs font-semibold text-zinc-200 hover:text-white flex items-center space-x-1.5 border border-white/20 active:scale-95 transition-all"
          >
            <Info className="w-3.5 h-3.5 text-[#ff597d]" />
            <span>Notes</span>
          </button>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center justify-center space-x-8 pt-2">
          <button 
            onClick={togglePlay}
            className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-current" />
            ) : (
              <Play className="w-6 h-6 fill-current ml-1" />
            )}
          </button>
        </div>
      </div>

      {/* Expandable Creative Notes Drawer / Sheet */}
      {showNotes && (
        <div className="absolute inset-0 z-50 bg-black/70 backdrop-blur-md flex flex-col justify-end animate-in fade-in duration-200">
          <div className="glass-panel w-full max-h-[85%] rounded-t-[32px] p-6 pb-12 overflow-y-auto no-scrollbar border-t border-white/20 space-y-5 animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-[#ff597d]" />
                <h3 className="text-sm font-bold text-white tracking-wide uppercase">
                  Creative Notes
                </h3>
              </div>
              <button 
                onClick={() => setShowNotes(false)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-zinc-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                Content Context
              </h4>
              <p className="text-xs text-zinc-200 leading-relaxed">
                {currentWork.description || activeRelease?.summary}
              </p>
            </div>

            {/* Rationale Breakdown if Release linked */}
            {activeRelease && (
              <div className="space-y-4 pt-2">
                {activeRelease.objective && (
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-[10px] font-bold text-[#ff597d] uppercase tracking-wider block mb-1">
                      Objective
                    </span>
                    <p className="text-xs text-zinc-300 leading-relaxed">{activeRelease.objective}</p>
                  </div>
                )}

                {activeRelease.insight && (
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block mb-1">
                      Audience Insight
                    </span>
                    <p className="text-xs text-zinc-300 leading-relaxed">{activeRelease.insight}</p>
                  </div>
                )}

                {activeRelease.concept && (
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                      Creative Concept
                    </span>
                    <p className="text-xs text-zinc-300 leading-relaxed">{activeRelease.concept}</p>
                  </div>
                )}

                {activeRelease.outcome && (
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                      Outcome & Metrics
                    </span>
                    <p className="text-xs text-zinc-300 leading-relaxed">{activeRelease.outcome}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
