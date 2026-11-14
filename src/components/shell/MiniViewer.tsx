import React from 'react';
import { Play, Pause, Maximize2 } from 'lucide-react';
import { usePlayer } from '../video/PlayerContext';

export function MiniViewer() {
  const { currentWork, isPlaying, togglePlay, openNowShowing, activeTalents } = usePlayer();

  if (!currentWork) return null;

  const talentName = activeTalents.length > 0 ? activeTalents[0].name : 'Creativico Talent';

  return (
    <div className="fixed bottom-24 left-0 right-0 z-30 px-4 pointer-events-auto">
      <div 
        onClick={openNowShowing}
        className="glass-panel mx-auto max-w-[400px] h-14 rounded-2xl flex items-center justify-between px-3 cursor-pointer shadow-lg hover:border-white/25 transition-all duration-200 group border border-white/15"
      >
        <div className="flex items-center space-x-3 overflow-hidden">
          <img 
            src={currentWork.thumbnailUrl} 
            alt={currentWork.title} 
            className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-white/10"
          />
          <div className="flex flex-col text-left truncate">
            <span className="text-xs font-semibold text-zinc-100 truncate group-hover:text-white">
              {currentWork.title}
            </span>
            <span className="text-[10px] text-zinc-400 truncate">
              {talentName} • {currentWork.myRoles.slice(0, 2).join(', ')}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-1 pl-2 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={togglePlay}
            className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-200 hover:text-white hover:bg-white/10 active:scale-90 transition-all"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
          </button>
          <button
            onClick={openNowShowing}
            className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-200 hover:bg-white/10 active:scale-90 transition-all"
            aria-label="Expand"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
