import { PortfolioImage } from "../content/PortfolioImage";
import { ChevronRight } from "lucide-react";
import { useContent } from "../content/ContentContext";

export function TalentsView({ onSelectTalent }: { onSelectTalent: (id: string) => void }) {
  const { talents: TALENTS, releases: RELEASES } = useContent();
  return (
    <div className="page">
      <header className="page-header">
        <h1>Talent Roster</h1>
      </header>
      <div className="talent-list">
        {TALENTS.map((talent) => {
          const count = RELEASES.filter((release) => release.talentIds.includes(talent.id)).length;
          return (
            <button
              key={talent.id}
              className="talent-row"
              onClick={() => onSelectTalent(talent.id)}
            >
              <PortfolioImage size={128} src={talent.portraitUrl} alt="" loading="lazy" />
              <span className="row-copy">
                <span>{talent.name}</span>
                <small className="secondary">
                  {talent.category} · {count} {count === 1 ? "project" : "projects"}
                </small>
              </span>
              <ChevronRight size={19} className="secondary" />
            </button>
          );
        })}
      </div>
      {TALENTS.length === 0 && <p className="empty-state">No talents yet.</p>}
    </div>
  );
}
