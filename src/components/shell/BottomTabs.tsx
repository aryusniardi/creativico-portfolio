import React from 'react';
import { Home, Users, FolderKanban, User } from 'lucide-react';
import { GlassNav } from '@zakisheriff/liquid-glass';

interface BottomTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomTabs({ activeTab, onTabChange }: BottomTabsProps) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'talents', label: 'Talents', icon: Users },
    { id: 'library', label: 'Campaigns', icon: FolderKanban },
    { id: 'about', label: 'About', icon: User },
  ];

  const activeIndex = Math.max(0, tabs.findIndex((t) => t.id === activeTab));

  return (
    <nav className="absolute bottom-0 left-0 right-0 z-40 px-3 pb-4 pt-1 pointer-events-auto">
      <GlassNav
        tabs={tabs.map((tab) => ({
          label: tab.label,
          icon: <tab.icon className="w-5 h-5" />,
          onClick: () => onTabChange(tab.id),
        }))}
        activeIndex={activeIndex}
        intensity={6}
        className="w-full justify-around py-1.5"
      />
    </nav>
  );
}
