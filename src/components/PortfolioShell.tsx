import { useDragScroll } from "../hooks/useDragScroll";
import { ContentProvider } from "./content/ContentContext";
import type { ContentDocument } from "../data/validation";
import { useLayoutEffect, useRef, useState } from "react";
import { PlayerProvider } from "./video/PlayerContext";
import { BottomTabs } from "./shell/BottomTabs";
import { MiniViewer } from "./shell/MiniViewer";
import { NowShowing } from "./video/NowShowing";
import { HomeView } from "./views/HomeView";
import { LibraryView } from "./views/LibraryView";
import { TalentsView } from "./views/TalentsView";
import { TalentDetailView } from "./views/TalentDetailView";
import { ReleaseDetailView } from "./views/ReleaseDetailView";
import { AboutView } from "./views/AboutView";
import type { Release } from "../types/content";

type Screen = { kind: "release"; release: Release } | { kind: "talent"; id: string };

export default function PortfolioShell({ content }: { content: ContentDocument }) {
  const appRef = useDragScroll();
  const [activeTab, setActiveTab] = useState("home");
  const [history, setHistory] = useState<Screen[]>([]);
  const contentRef = useRef<HTMLElement>(null);
  const scrollPositions = useRef<number[]>([]);
  const restoring = useRef(false);
  const screen = history.at(-1);
  const selectScreen = (next: Screen) => {
    scrollPositions.current.push(contentRef.current?.scrollTop || 0);
    setHistory((previous) => [...previous, next]);
  };
  const goBack = () => {
    restoring.current = true;
    setHistory((previous) => previous.slice(0, -1));
  };
  const changeTab = (tab: string) => {
    scrollPositions.current = [];
    setHistory([]);
    setActiveTab(tab);
  };
  useLayoutEffect(() => {
    if (!contentRef.current) return;
    contentRef.current.scrollTop = restoring.current ? scrollPositions.current.pop() || 0 : 0;
    restoring.current = false;
    contentRef.current.focus({ preventScroll: true });
  }, [activeTab, history]);
  const selectRelease = (release: Release) => selectScreen({ kind: "release", release });
  const selectTalent = (id: string) => selectScreen({ kind: "talent", id });
  const renderScreen = () => {
    if (screen?.kind === "release") {
      return (
        <ReleaseDetailView release={screen.release} onBack={goBack} onSelectTalent={selectTalent} />
      );
    }
    if (screen?.kind === "talent") {
      return (
        <TalentDetailView talentId={screen.id} onBack={goBack} onSelectRelease={selectRelease} />
      );
    }
    if (activeTab === "home") {
      return (
        <HomeView
          onSelectRelease={selectRelease}
          onSelectTalent={selectTalent}
          onAbout={() => changeTab("about")}
        />
      );
    }
    if (activeTab === "talents") return <TalentsView onSelectTalent={selectTalent} />;
    if (activeTab === "library") return <LibraryView onSelectRelease={selectRelease} />;
    return <AboutView />;
  };
  return (
    <ContentProvider content={content}>
      <PlayerProvider>
        <div className="portfolio-stage">
        <div ref={appRef} className="music-app" data-theme="dark">
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <BottomTabs activeTab={activeTab} onTabChange={changeTab} />
          <main ref={contentRef} id="main-content" className="main-content" tabIndex={-1}>
            {renderScreen()}
          </main>
          <MiniViewer />
          <NowShowing />
          <div className="home-indicator" aria-hidden="true" />
        </div>
        </div>
      </PlayerProvider>
    </ContentProvider>
  );
}
