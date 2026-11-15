import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Work } from "../../types/content";
import { useContent } from "../content/ContentContext";
import { mediaKind, projectMedia } from "../../data/media";

function usePlayerState() {
  const { works: WORKS, releases: RELEASES, talents: TALENTS } = useContent();
  const [currentWork, setCurrentWork] = useState<Work | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isNowShowingOpen, setIsNowShowingOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const activeRelease = RELEASES.find((release) => release.id === currentWork?.releaseId) || null;
  const activeTalents = TALENTS.filter((talent) => currentWork?.talentIds.includes(talent.id));
  const queue = activeRelease ? projectMedia(activeRelease, WORKS) : [];
  const index = queue.findIndex((work) => work.id === currentWork?.id);
  const selectWork = (work: Work) => {
    setCurrentWork(work);
    setIsPlaying(mediaKind(work) === "video");
  };
  const playWork = (work: Work) => {
    selectWork(work);
    setIsNowShowingOpen(true);
  };
  return {
    currentWork,
    isPlaying,
    setIsPlaying,
    isNowShowingOpen,
    isMuted,
    activeRelease,
    activeTalents,
    queue,
    index,
    playWork,
    togglePlay: () => {
      if (currentWork && mediaKind(currentWork) === "video") setIsPlaying((playing) => !playing);
    },
    openNowShowing: () => setIsNowShowingOpen(true),
    closeNowShowing: () => setIsNowShowingOpen(false),
    toggleMute: () => setIsMuted((muted) => !muted),
    previous: () => {
      if (index > 0) selectWork(queue[index - 1]);
    },
    next: () => {
      if (index >= 0 && index < queue.length - 1) selectWork(queue[index + 1]);
    },
  };
}
const PlayerContext = createContext<ReturnType<typeof usePlayerState> | null>(null);
export function PlayerProvider({ children }: { children: ReactNode }) {
  const player = usePlayerState();
  return <PlayerContext.Provider value={player}>{children}</PlayerContext.Provider>;
}
export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) throw new Error("usePlayer must be used within PlayerProvider");
  return context;
}
