import { PortfolioImage } from "../content/PortfolioImage";
import { ChevronLeft } from "lucide-react";
import { useContent } from "../content/ContentContext";
import { ProjectRow } from "../content/ContentItems";
import type { Release } from "../../types/content";

export function TalentDetailView({
  talentId,
  onBack,
  onSelectRelease,
}: {
  talentId: string;
  onBack: () => void;
  onSelectRelease: (release: Release) => void;
}) {
  const { talents: TALENTS, releases: RELEASES } = useContent();
  const talent = TALENTS.find((item) => item.id === talentId);
  if (!talent)
    return (
      <div className="page">
        <button className="text-button" onClick={onBack}>
          Back
        </button>
        <p>Talent not found.</p>
      </div>
    );
  const releases = RELEASES.filter((release) => release.talentIds.includes(talent.id));
  return (
    <div className="page detail-page">
      <header className="detail-toolbar">
        <button className="icon-button glass" aria-label="Back" onClick={onBack}>
          <ChevronLeft />
        </button>
        <span>Talent Dossier</span>
      </header>
      <div className="artist-header">
        <PortfolioImage size={384} src={talent.portraitUrl} alt={talent.name} />
        <div>
          <p className="metadata">{talent.category}</p>
          <h1>{talent.name}</h1>
          <p className="body-copy">{talent.bio}</p>
        </div>
      </div>
      <section>
        <h2>
          Collaborative Projects <span className="secondary count">{releases.length}</span>
        </h2>
        {releases.length ? (
          <div className="track-list">
            {releases.map((release) => (
              <ProjectRow key={release.id} release={release} onSelect={onSelectRelease} />
            ))}
          </div>
        ) : (
          <p className="empty-state">No projects yet.</p>
        )}
      </section>
    </div>
  );
}
