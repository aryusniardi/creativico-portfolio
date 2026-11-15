import { PortfolioImage } from "./PortfolioImage";
import { ChevronRight, Image as ImageIcon, Play, ExternalLink } from "lucide-react";
import type { Release, Work } from "../../types/content";
import { mediaDescription, mediaKind, youtubeEmbedUrl } from "../../data/media";

export function ProjectCard({
  release,
  onSelect,
}: {
  release: Release;
  onSelect: (release: Release) => void;
}) {
  return (
    <button className="project-card" onClick={() => onSelect(release)}>
      <PortfolioImage src={release.coverUrl} alt="" className="cover-art" loading="lazy" />
      <span className="card-title">{release.title}</span>
      <span className="secondary card-subtitle">{release.brand || release.year}</span>
    </button>
  );
}

export function MediaRow({
  work,
  index,
  onSelect,
}: {
  work: Work;
  index?: number;
  onSelect: (work: Work) => void;
}) {
  const kind = mediaKind(work);
  return (
    <button className="media-row" onClick={() => onSelect(work)}>
      {index !== undefined && <span className="row-number">{index + 1}</span>}
      <PortfolioImage size={128} src={work.thumbnailUrl} alt="" loading="lazy" />
      <span className="row-copy">
        <span>{work.title}</span>
        <small className="secondary">{mediaDescription(work)}</small>
      </span>
      {kind === "video" || (kind === "external" && youtubeEmbedUrl(work.externalUrl)) ? (
        <Play size={19} fill="currentColor" />
      ) : kind === "external" ? (
        <ExternalLink size={19} />
      ) : (
        <ImageIcon size={19} />
      )}
    </button>
  );
}

export function ProjectRow({
  release,
  onSelect,
}: {
  release: Release;
  onSelect: (release: Release) => void;
}) {
  return (
    <button className="project-row" onClick={() => onSelect(release)}>
      <PortfolioImage size={128} src={release.coverUrl} alt="" loading="lazy" />
      <span className="row-copy">
        <span>{release.title}</span>
        <small className="secondary">{release.brand || release.year}</small>
      </span>
      <ChevronRight size={18} className="secondary" />
    </button>
  );
}
