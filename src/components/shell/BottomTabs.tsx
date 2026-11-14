import React from 'react';
import { Home, Users, Library, Info } from 'lucide-react';

interface BottomTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomTabs({ activeTab, onTabChange }: BottomTabsProps) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'talents', label: 'Talents', icon: Users },
    { id: 'library', label: 'Library', icon: Library },
    { id: 'about', label: 'About', icon: Info },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-6 pt-2 pointer-events-auto">
      <div className="glass-panel mx-auto max-w-[400px] h-16 rounded-full flex items-center justify-around px-2 shadow-2xl border border-white/10">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center w-16 h-12 rounded-full transition-all duration-200 ${
                isActive
                  ? 'text-[#ff597d] scale-105 font-medium'
                  : 'text-zinc-400 hover:text-zinc-200 active:scale-95'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" strokeWidth={isActive ? 2.5 : 1.8} />
              <span className="text-[10px] tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
