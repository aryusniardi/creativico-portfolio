import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import type { Work, Release, Talent } from '../../types/content';
import { WORKS, RELEASES, TALENTS } from '../../data/mock';

type PlayerContextType = {
  currentWork: Work | null;
  isPlaying: boolean;
  isNowShowingOpen: boolean;
  currentTime: number;
  duration: number;
  isMuted: boolean;
  playWork: (work: Work) => void;
  togglePlay: () => void;
  openNowShowing: () => void;
  closeNowShowing: () => void;
  toggleMute: () => void;
  seekTo: (seconds: number) => void;
  activeRelease: Release | null;
  activeTalents: Talent[];
  getTalentById: (id: string) => Talent | undefined;
  getReleaseById: (id: string) => Release | undefined;
};

const PlayerContext = createContext<PlayerContextType | null>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [currentWork, setCurrentWork] = useState<Work | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isNowShowingOpen, setIsNowShowingOpen] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Hidden audio/video sync element
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const getTalentById = (id: string) => TALENTS.find(t => t.id === id);
  const getReleaseById = (id: string) => RELEASES.find(r => r.id === id);

  const activeRelease = currentWork ? getReleaseById(currentWork.releaseId) || null : null;
  const activeTalents = currentWork
    ? (currentWork.talentIds.map(id => getTalentById(id)).filter(Boolean) as Talent[])
    : [];

  const playWork = (work: Work) => {
    setCurrentWork(work);
    setIsPlaying(true);
    setIsNowShowingOpen(true);
  };

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  const openNowShowing = () => {
    if (currentWork) setIsNowShowingOpen(true);
  };

  const closeNowShowing = () => {
    setIsNowShowingOpen(false);
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  const seekTo = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      setCurrentTime(seconds);
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        currentWork,
        isPlaying,
        isNowShowingOpen,
        currentTime,
        duration,
        isMuted,
        playWork,
        togglePlay,
        openNowShowing,
        closeNowShowing,
        toggleMute,
        seekTo,
        activeRelease,
        activeTalents,
        getTalentById,
        getReleaseById
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}
