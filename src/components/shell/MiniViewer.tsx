import { GlassCard } from "@zakisheriff/liquid-glass";
import { Play, Pause, SkipForward } from "lucide-react";
import { usePlayer } from "../video/PlayerContext";
import { mediaKind } from "../../data/media";

export function MiniViewer() {
  const { currentWork, isPlaying, togglePlay, openNowShowing, next, queue, index, activeRelease } =
    usePlayer();
  if (!currentWork) return null;
  return (
    <GlassCard className="mini-player" role="complementary" aria-label="Current media" variant="clear" radius="999px" padding="8px" intensity={5}>
      <button
        className="mini-info"
        onClick={openNowShowing}
        aria-label={`Open ${currentWork.title}`}
      >
        <img src={currentWork.thumbnailUrl} alt="" />
        <span className="row-copy">
          <span>{currentWork.title}</span>
          <small className="secondary">{activeRelease?.title}</small>
        </span>
      </button>
      {mediaKind(currentWork) === "video" && (
        <button
          className="icon-button"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}
        </button>
      )}
      <button
        className="icon-button"
        disabled={index >= queue.length - 1}
        onClick={next}
        aria-label="Next media"
      >
        <SkipForward fill="currentColor" />
      </button>
    </GlassCard>
  );
}
