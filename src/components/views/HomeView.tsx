import { PortfolioImage } from "../content/PortfolioImage";
import { useContent } from "../content/ContentContext";
import { usePlayer } from "../video/PlayerContext";
import { ProjectCard, MediaRow } from "../content/ContentItems";
import type { Release } from "../../types/content";

interface HomeViewProps {
  onSelectRelease: (release: Release) => void;
  onSelectTalent: (talentId: string) => void;
  onAbout: () => void;
}

export function HomeView({ onSelectRelease, onSelectTalent, onAbout }: HomeViewProps) {
  const { profile: PROFILE, releases: RELEASES, talents: TALENTS, works: WORKS } = useContent();
  const { playWork } = usePlayer();
  const recent = [...RELEASES].sort((a, b) =>
    (b.publishedAt || String(b.year)).localeCompare(a.publishedAt || String(a.year)),
  );
  const featured = recent.filter((release) => release.featured);
  return (
    <div className="page home-page">
      <header className="page-header">
        <div>
          <h1>Portfolio</h1>
          <p className="secondary">{PROFILE.name}</p>
        </div>
        <button className="account-button" onClick={onAbout} aria-label={`About ${PROFILE.name}`}>
          <PortfolioImage size={96} src={PROFILE.portraitUrl} alt="" />
        </button>
      </header>
      {featured.length > 0 && (
        <section>
          <h2>Featured Projects</h2>
          <div className="featured-rail">
            {featured.map((release) => (
              <button className="project-card" key={release.id} onClick={() => onSelectRelease(release)}>
                <PortfolioImage className="cover-art" src={release.coverUrl} alt="" />
                <span className="card-subtitle secondary">{release.brand || release.year}</span>
                <span className="card-title">{release.title}</span>
                <span className="featured-summary">{release.summary}</span>
              </button>
            ))}
          </div>
        </section>
      )}
      <section>
        <h2>Recent Projects</h2>
        {recent.length ? (
          <div className="artwork-rail">
            {recent.map((release) => (
              <ProjectCard key={release.id} release={release} onSelect={onSelectRelease} />
            ))}
          </div>
        ) : (
          <p className="empty-state">No projects yet.</p>
        )}
      </section>
      {WORKS.length > 0 && (
        <section>
          <h2>Selected Work</h2>
          <div className="track-list">
            {WORKS.slice(0, 4).map((work) => (
              <MediaRow key={work.id} work={work} onSelect={playWork} />
            ))}
          </div>
        </section>
      )}
      {TALENTS.length > 0 && (
        <section>
          <h2>Talents &amp; Collaborators</h2>
          <div className="talent-rail">
            {TALENTS.map((talent) => (
              <button
                key={talent.id}
                className="talent-card"
                onClick={() => onSelectTalent(talent.id)}
              >
                <PortfolioImage size={192} src={talent.portraitUrl} alt="" loading="lazy" />
                <span>{talent.name}</span>
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
