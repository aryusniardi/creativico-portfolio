import React from 'react';
import { Home, Compass, Radio, Library, Search } from 'lucide-react';
import { GlassNav } from '@zakisheriff/liquid-glass';

interface BottomTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomTabs({ activeTab, onTabChange }: BottomTabsProps) {
  const tabKeys = ['home', 'new', 'radio', 'library', 'search'];
  
  const navItems = [
    { label: 'Home', icon: <Home className="w-5 h-5" /> },
    { label: 'New', icon: <Compass className="w-5 h-5" /> },
    { label: 'Radio', icon: <Radio className="w-5 h-5" /> },
    { label: 'Library', icon: <Library className="w-5 h-5" /> },
    { label: 'Search', icon: <Search className="w-5 h-5" /> },
  ];

  const activeIndex = Math.max(0, tabKeys.indexOf(activeTab));

  return (
    <nav className="absolute bottom-2 left-0 right-0 z-40 px-3 pointer-events-auto flex justify-center">
      <div className="w-full max-w-[390px]">
        <GlassNav
          items={navItems}
          activeIndex={activeIndex}
          onChange={(index) => {
            const selectedKey = tabKeys[index] || 'home';
            onTabChange(selectedKey);
          }}
          intensity={6}
          showLabels={true}
          style={{ width: '100%', borderRadius: '999px' }}
        />
      </div>
    </nav>
  );
}
