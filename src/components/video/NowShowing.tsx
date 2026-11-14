import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import { usePlayer } from "./PlayerContext";
import { mediaKind, platformName } from "../../data/media";

export function NowShowing() {
  const {
    currentWork,
    isPlaying,
    setIsPlaying,
    togglePlay,
    isNowShowingOpen,
    closeNowShowing,
    isMuted,
    toggleMute,
    activeRelease,
    activeTalents,
    previous,
    next,
    queue,
    index,
  } = usePlayer();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const layoutRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [failedId, setFailedId] = useState<string | null>(null);
  const failed = failedId === currentWork?.id;
  const kind = currentWork ? mediaKind(currentWork) : null;
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isNowShowingOpen && !dialog.open) dialog.showModal();
    if (!isNowShowingOpen && dialog.open) dialog.close();
  }, [isNowShowingOpen, currentWork]);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) video.play().catch(() => setIsPlaying(false));
    else video.pause();
  }, [isPlaying, currentWork, setIsPlaying]);
  useEffect(() => {
    setTime(0);
    setDuration(0);
    if (layoutRef.current) layoutRef.current.scrollTop = 0;
  }, [currentWork?.id]);
  if (!currentWork) return null;
  const showVideo = kind === "video" && Boolean(currentWork.videoUrl) && !failed;
  const showImage = !showVideo && kind === "image" && !failed;
  const showExternal = !showVideo && !showImage;
  const formatTime = (value: number) =>
    `${Math.floor(value / 60)}:${String(Math.floor(value % 60)).padStart(2, "0")}`;
  return (
    <dialog
      ref={dialogRef}
      className="media-dialog"
      aria-labelledby="viewer-title"
      onCancel={closeNowShowing}
      onClose={closeNowShowing}
    >
      <div ref={layoutRef} className="viewer-layout">
        <header className="viewer-header">
          <button
            autoFocus
            className="icon-button glass"
            onClick={closeNowShowing}
            aria-label="Close media viewer"
          >
            <ChevronDown />
          </button>
          <div>
            <span className="metadata">Now Showing</span>
            <p>{activeRelease?.title}</p>
          </div>
          {kind === "video" ? (
            <button
              className="icon-button glass"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX /> : <Volume2 />}
            </button>
          ) : (
            <span className="toolbar-spacer" />
          )}
        </header>
        <div className="viewer-stage">
          {showVideo && (
            <video
              key={currentWork.id}
              ref={videoRef}
              src={currentWork.videoUrl}
              poster={currentWork.posterUrl || currentWork.thumbnailUrl}
              muted={isMuted}
              playsInline
              preload="metadata"
              onLoadedMetadata={(event) =>
                setDuration(
                  Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : 0,
                )
              }
              onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
              onEnded={() => setIsPlaying(false)}
              onError={() => {
                setFailedId(currentWork.id);
                setIsPlaying(false);
              }}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              controls
            >
              {currentWork.captionsUrl && (
                <track
                  kind="captions"
                  src={currentWork.captionsUrl}
                  srcLang="en"
                  label="English"
                  default
                />
              )}
            </video>
          )}
          {showImage && (
            <img
              key={currentWork.id}
              src={currentWork.imageUrl || currentWork.thumbnailUrl}
              alt={currentWork.alt || currentWork.title}
              onError={() => setFailedId(currentWork.id)}
            />
          )}
          {showExternal && (
            <div className="external-preview">
              {!failed && <img src={currentWork.posterUrl || currentWork.thumbnailUrl} alt="" />}
              <p className="secondary" role={failed ? "status" : undefined}>
                {failed || (kind === "video" && !currentWork.videoUrl)
                  ? "This media could not be loaded."
                  : "Watch the original release."}
              </p>
              {currentWork.externalUrl && (
                <a
                  className="primary-button"
                  href={currentWork.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open {platformName(currentWork.platform)}
                  <ExternalLink size={17} />
                </a>
              )}
            </div>
          )}
        </div>
        <div className="viewer-footer">
          <div className="viewer-title-row">
            <div>
              <h1 id="viewer-title">{currentWork.title}</h1>
              <p className="secondary">{activeTalents.map((talent) => talent.name).join(", ")}</p>
            </div>
          </div>
          {showVideo && (
            <div className="scrubber">
              <input
                type="range"
                aria-label="Playback position"
                min="0"
                max={duration || 0}
                step="0.1"
                value={Math.min(time, duration)}
                disabled={!duration}
                onChange={(event) => {
                  const value = Number(event.target.value);
                  if (videoRef.current) videoRef.current.currentTime = value;
                  setTime(value);
                }}
              />
              <div className="time-labels">
                <span>{formatTime(time)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          )}
          <div className="viewer-controls">
            <button
              className="icon-button"
              disabled={index <= 0}
              onClick={previous}
              aria-label="Previous media"
            >
              <ChevronLeft size={30} />
            </button>
            {showVideo && (
              <button
                className="icon-button playback-button"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause size={34} fill="currentColor" />
                ) : (
                  <Play size={34} fill="currentColor" />
                )}
              </button>
            )}
            <span className="secondary media-position">
              {index + 1} of {queue.length}
            </span>
            <button
              className="icon-button"
              disabled={index >= queue.length - 1}
              onClick={next}
              aria-label="Next media"
            >
              <ChevronRight size={30} />
            </button>
          </div>
          <section className="viewer-notes">
              <h2>Creative Notes</h2>
              {currentWork.description && <p className="body-copy">{currentWork.description}</p>}
              {currentWork.myRoles.length > 0 && (
                <p className="secondary">{currentWork.myRoles.join(" · ")}</p>
              )}
          </section>
        </div>
      </div>
    </dialog>
  );
}
