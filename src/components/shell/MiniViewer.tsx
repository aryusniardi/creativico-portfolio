import React from 'react';
import { Play, Pause, SkipForward } from 'lucide-react';
import { usePlayer } from '../video/PlayerContext';
import { GlassCard } from '@zakisheriff/liquid-glass';

export function MiniViewer() {
  const { currentWork, isPlaying, togglePlay, openNowShowing } = usePlayer();

  if (!currentWork) {
    return null;
  }

  return (
    <div className="absolute bottom-[76px] left-0 right-0 z-30 px-3.5 pointer-events-auto flex justify-center">
      <div 
        onClick={openNowShowing}
        className="w-full max-w-[390px] cursor-pointer group"
      >
        <GlassCard 
          padding="8px 12px"
          radius="18px"
          intensity={6}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 12px 32px rgba(0,0,0,0.6)'
          }}
        >
          {/* Track Info */}
          <div className="flex items-center space-x-3 overflow-hidden min-w-0">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 shadow-md">
              <img 
                src={currentWork.thumbnailUrl} 
                alt={currentWork.title}
                className="w-full h-full object-cover"
              />
              {isPlaying && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-[#ff375f] animate-ping" />
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="text-[13px] font-bold text-white truncate leading-snug">
                {currentWork.title}
              </h4>
              <p className="text-[11px] text-zinc-400 truncate">
                {currentWork.description || 'Victor Decha Zhevanya'}
              </p>
            </div>
          </div>

          {/* Quick Controls: Apple Music style Play + Skip */}
          <div className="flex items-center space-x-1 pl-2 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={togglePlay}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white hover:text-[#ff375f] active:scale-90 transition-all"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>
            <button
              onClick={openNowShowing}
              className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-300 hover:text-white active:scale-90 transition-all"
              aria-label="Next track"
            >
              <SkipForward className="w-5 h-5 fill-current" />
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
