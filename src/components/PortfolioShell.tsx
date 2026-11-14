import React, { useState } from 'react';
import { PlayerProvider } from './video/PlayerContext';
import { BottomTabs } from './shell/BottomTabs';
import { MiniViewer } from './shell/MiniViewer';
import { NowShowing } from './video/NowShowing';
import { HomeView } from './views/HomeView';
import { LibraryView } from './views/LibraryView';
import { TalentsView } from './views/TalentsView';
import { TalentDetailView } from './views/TalentDetailView';
import { ReleaseDetailView } from './views/ReleaseDetailView';
import { AboutView } from './views/AboutView';
import type { Release } from '../types/content';

export default function PortfolioShell() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);
  const [selectedTalentId, setSelectedTalentId] = useState<string | null>(null);

  const handleSelectRelease = (release: Release) => {
    setSelectedRelease(release);
  };

  const handleSelectTalent = (talentId: string) => {
    setSelectedTalentId(talentId);
  };

  const handleTabChange = (tab: string) => {
    // Reset nested views when switching main tabs
    setSelectedRelease(null);
    setSelectedTalentId(null);
    setActiveTab(tab);
  };

  const renderActiveScreen = () => {
    if (selectedRelease) {
      return (
        <ReleaseDetailView
          release={selectedRelease}
          onBack={() => setSelectedRelease(null)}
          onSelectTalent={handleSelectTalent}
        />
      );
    }

    if (selectedTalentId) {
      return (
        <TalentDetailView
          talentId={selectedTalentId}
          onBack={() => setSelectedTalentId(null)}
          onSelectRelease={handleSelectRelease}
        />
      );
    }

    switch (activeTab) {
      case 'home':
        return (
          <HomeView
            onSelectRelease={handleSelectRelease}
            onSelectTalent={handleSelectTalent}
            onNavigateTab={handleTabChange}
          />
        );
      case 'talents':
        return <TalentsView onSelectTalent={handleSelectTalent} />;
      case 'library':
        return <LibraryView onSelectRelease={handleSelectRelease} />;
      case 'about':
        return <AboutView />;
      default:
        return (
          <HomeView
            onSelectRelease={handleSelectRelease}
            onSelectTalent={handleSelectTalent}
            onNavigateTab={handleTabChange}
          />
        );
    }
  };

  return (
    <PlayerProvider>
      {/* Outer Desktop Canvas / Ambient Stage */}
      <div className="relative min-h-screen w-full bg-[#060609] flex items-center justify-center p-0 md:p-6 overflow-hidden">
        {/* Subtle Ambient Background Gradient derived from artwork */}
        <div 
          className="absolute inset-0 opacity-25 filter blur-[100px] pointer-events-none scale-110"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 40%, #ff597d 0%, #1a1024 45%, #060609 85%)`
          }}
        />

        {/* Desktop Helper text */}
        <div className="hidden lg:block absolute left-8 top-8 text-left space-y-1 z-10 pointer-events-none">
          <span className="text-[10px] tracking-widest uppercase font-mono text-zinc-500">
            CREATIVICO / ON REPEAT
          </span>
          <p className="text-xs text-zinc-400">
            Explore the portfolio inside the mobile frame
          </p>
        </div>

        {/* Main Phone Shell Container */}
        <div className="relative w-full h-[100dvh] md:w-[430px] md:h-[860px] md:max-h-[calc(100vh-48px)] bg-[#0b0b0f] md:rounded-[48px] md:border-[6px] md:border-[#22222a] md:shadow-[0_25px_80px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col z-20">
          {/* iOS Dynamic Island Simulation (Desktop only) */}
          <div className="hidden md:flex absolute top-3 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-40 items-center justify-between px-3 border border-white/5">
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-800" />
            <div className="w-2 h-2 rounded-full bg-blue-950/60" />
          </div>

          {/* Internal Scrollable Content Stage */}
          <div className="flex-1 overflow-y-auto no-scrollbar relative z-10 pt-4 md:pt-8 overscroll-contain">
            {renderActiveScreen()}
          </div>

          {/* Persistent Mini-Viewer */}
          <MiniViewer />

          {/* Bottom Tabs */}
          <BottomTabs activeTab={activeTab} onTabChange={handleTabChange} />

          {/* Full Screen Now Showing Modal Overlay */}
          <NowShowing />
        </div>
      </div>
    </PlayerProvider>
  );
}
