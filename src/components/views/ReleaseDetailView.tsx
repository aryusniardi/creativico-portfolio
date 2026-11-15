import { PortfolioImage } from "../content/PortfolioImage";
import { ChevronLeft, Play, Image as ImageIcon } from "lucide-react";
import { useContent } from "../content/ContentContext";
import { projectMedia, mediaKind } from "../../data/media";
import { usePlayer } from "../video/PlayerContext";
import { MediaRow } from "../content/ContentItems";
import type { Release } from "../../types/content";

export function ReleaseDetailView({
  release,
  onBack,
  onSelectTalent,
}: {
  release: Release;
  onBack: () => void;
  onSelectTalent: (id: string) => void;
}) {
  const { works: WORKS, talents: TALENTS } = useContent();
  const { playWork } = usePlayer();
  const media = projectMedia(release, WORKS);
  const talents = TALENTS.filter((talent) => release.talentIds.includes(talent.id));
  const notes = [
    ["The Objective", release.objective],
    ["Cultural / Audience Insight", release.insight],
    ["The Concept", release.concept],
    ["Execution & Craft", release.execution],
    ["Outcome", release.outcome],
  ].filter(([, text]) => text);
  return (
    <div className="page detail-page">
      <header className="detail-toolbar">
        <button className="icon-button glass" onClick={onBack} aria-label="Back">
          <ChevronLeft />
        </button>
        <span>{release.title}</span>
      </header>
      <div className="album-header">
        <PortfolioImage className="album-art" src={release.coverUrl} alt={release.title} />
        <div className="album-copy">
          <h1>{release.title}</h1>
          {talents.length > 0 && (
            <p className="artist-links">
              {talents.map((talent) => (
                <button key={talent.id} onClick={() => onSelectTalent(talent.id)}>
                  {talent.name}
                </button>
              ))}
            </p>
          )}
          <p className="secondary">{release.brand}</p>
          <p className="metadata">
            {release.category.replaceAll("-", " ")} · {release.year}
          </p>
          <p className="summary">{release.summary}</p>
          {media.length > 0 && (
            <button className="primary-button" onClick={() => playWork(media[0])}>
              {mediaKind(media[0]) !== "image" ? (
                <Play size={18} fill="currentColor" />
              ) : (
                <ImageIcon size={18} />
              )}
              View project
            </button>
          )}
        </div>
      </div>
      {media.length > 0 ? (
        <section>
          <h2>
            Project Media <span className="secondary count">{media.length}</span>
          </h2>
          <div className="track-list">
            {media.map((work, index) => (
              <MediaRow key={work.id} work={work} index={index} onSelect={playWork} />
            ))}
          </div>
        </section>
      ) : (
        <p className="empty-state">Media will be added to this project.</p>
      )}
      {release.myRoles.length > 0 && (
        <section>
          <h2>My Specific Role &amp; Contribution</h2>
          <p className="body-copy">{release.myRoles.join(" · ")}</p>
        </section>
      )}
      {notes.length > 0 && (
        <section>
          <h2>Creative Notes (The Story Behind)</h2>
          <div className="notes-grid">
            {notes.map(([title, text]) => (
              <div className="note" key={title}>
                <h3>{title}</h3>
                <p className="body-copy">{text}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      {!!release.metrics?.length && (
        <section>
          <h2>Impact &amp; Engagement</h2>
          <dl className="facts-list">
            {release.metrics.map((metric, index) => (
              <div key={index}>
                <dt>{metric.label}</dt>
                <dd>
                  {metric.value}
                  {metric.context && <small className="secondary">{metric.context}</small>}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}
      {!!release.credits?.length && (
        <section>
          <h2>Credits &amp; Collaborators</h2>
          <dl className="facts-list">
            {release.credits.map((credit, index) => (
              <div key={index}>
                <dt>{credit.name}</dt>
                <dd className="secondary">{credit.role}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}
    </div>
  );
}
