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
          />
        );
      case 'new':
      case 'talents':
        return <TalentsView onSelectTalent={handleSelectTalent} />;
      case 'radio':
      case 'about':
        return <AboutView />;
      case 'library':
        return <LibraryView onSelectRelease={handleSelectRelease} />;
      case 'search':
        return <LibraryView onSelectRelease={handleSelectRelease} />;
      default:
        return (
          <HomeView
            onSelectRelease={handleSelectRelease}
            onSelectTalent={handleSelectTalent}
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
          className="absolute inset-0 opacity-40 filter blur-[120px] pointer-events-none scale-125 transition-all duration-700"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 30%, #ff375f 0%, #30122e 40%, #030305 80%)`
          }}
        />
        {/* Subtle noise/vignette overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,#030305_90%)] pointer-events-none" />

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
        <div className="relative w-full h-[100dvh] md:w-[414px] md:h-[852px] md:max-h-[calc(100vh-48px)] bg-[#07070a] md:rounded-[50px] md:border-[4px] md:border-[#262630] phone-bezel overflow-hidden flex flex-col z-20">
          
          {/* Native iOS Status Bar Simulation (Desktop only) */}
          <div className="hidden md:flex absolute top-0 left-0 right-0 h-11 items-center justify-between px-7 z-40 text-white select-none pointer-events-none">
            <span className="text-[12px] font-semibold tracking-tight">9:41</span>
            {/* Dynamic Island */}
            <div className="w-24 h-6 bg-black rounded-full flex items-center justify-between px-2.5 border border-white/10 shadow-inner">
              <div className="w-2 h-2 rounded-full bg-zinc-900 border border-zinc-700" />
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
            </div>
            <div className="flex items-center space-x-1.5 text-zinc-300">
              <span className="text-[10px] font-semibold">5G</span>
              <div className="w-4 h-2.5 border border-current rounded-xs p-0.5 flex items-center">
                <div className="w-full h-full bg-current rounded-2xs" />
              </div>
            </div>
          </div>

          {/* Internal Scrollable Content Stage */}
          <div className="flex-1 overflow-y-auto no-scrollbar relative z-10 pt-4 md:pt-11 pb-24 overscroll-contain">
            {renderActiveScreen()}
          </div>

          {/* Persistent Mini-Viewer */}
          <MiniViewer />

          {/* Bottom Tabs */}
          <BottomTabs activeTab={activeTab} onTabChange={handleTabChange} />

          {/* iOS Home Indicator Bar */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full z-50 pointer-events-none" />

          {/* Full Screen Now Showing Modal Overlay */}
          <NowShowing />
        </div>
      </div>
    </PlayerProvider>
  );
}
