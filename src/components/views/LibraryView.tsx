import { useState } from "react";
import { Search, X } from "lucide-react";
import { useContent } from "../content/ContentContext";
import { usePlayer } from "../video/PlayerContext";
import { MediaRow, ProjectCard } from "../content/ContentItems";
import type { Release } from "../../types/content";

export function LibraryView({ onSelectRelease }: { onSelectRelease: (release: Release) => void }) {
  const { releases: RELEASES, works: WORKS } = useContent();
  const { playWork } = usePlayer();
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const filters = [
    { id: "all", label: "All Catalog" },
    { id: "campaign", label: "Campaigns" },
    { id: "series", label: "Series" },
    { id: "brand-collab", label: "Brand Collabs" },
    { id: "bts", label: "BTS Confessions" },
  ];
  const search = query.trim().toLowerCase();
  const releases = [...RELEASES]
    .sort((a, b) =>
      (b.publishedAt || String(b.year)).localeCompare(a.publishedAt || String(a.year)),
    )
    .filter(
      (release) =>
        (filter === "all" || release.category === filter) &&
        `${release.title} ${release.summary} ${release.brand || ""} ${WORKS.filter((work) =>
          release.workIds.includes(work.id),
        )
          .map((work) => `${work.title} ${work.description || ""}`)
          .join(" ")}`
          .toLowerCase()
          .includes(search),
    );
  const works = WORKS.filter(
    (work) =>
      releases.some((release) => release.workIds.includes(work.id)) &&
      `${work.title} ${work.description || ""}`.toLowerCase().includes(search),
  );
  return (
    <div className="page">
      <header className="page-header">
        <h1>Creative Library</h1>
      </header>
      <div className="search-field">
        <Search size={19} aria-hidden="true" />
        <input
          type="search"
          aria-label="Search campaigns, brands, or media"
          placeholder="Search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        {query && (
          <button onClick={() => setQuery("")} aria-label="Clear search">
            <X size={17} />
          </button>
        )}
      </div>
      <div className="filter-rail" aria-label="Project categories">
        {filters.map((item) => (
          <button
            key={item.id}
            aria-pressed={filter === item.id}
            onClick={() => setFilter(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <section>
        <h2>
          Releases &amp; Campaigns <span className="secondary count">{releases.length}</span>
        </h2>
        {releases.length ? (
          <div className="artwork-grid">
            {releases.map((release) => (
              <ProjectCard key={release.id} release={release} onSelect={onSelectRelease} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No matching projects</h3>
            <p>Try another search or category.</p>
            <button
              className="text-button"
              onClick={() => {
                setFilter("all");
                setQuery("");
              }}
            >
              Reset filters
            </button>
          </div>
        )}
      </section>
      {works.length > 0 && (
        <section>
          <h2>All Individual Tracks</h2>
          <div className="track-list">
            {works.map((work) => (
              <MediaRow key={work.id} work={work} onSelect={playWork} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
