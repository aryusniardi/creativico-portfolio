import { GlassNav } from "@zakisheriff/liquid-glass";
import { House, Users, Library, UserRound } from "lucide-react";

export function BottomTabs({
  activeTab,
  onTabChange,
}: {
  activeTab: string;
  onTabChange: (tab: string) => void;
}) {
  const tabs = [
    { id: "home", label: "Home", icon: House },
    { id: "talents", label: "Talents", icon: Users },
    { id: "library", label: "Campaigns", icon: Library },
    { id: "about", label: "About", icon: UserRound },
  ];
  return (
    <nav className="app-navigation" aria-label="Main navigation">
      <GlassNav
        className="tab-bar"
        aria-label="Portfolio sections"
        items={tabs.map(tab => ({ label: tab.label, icon: <tab.icon size={24} strokeWidth={1.8} /> }))}
        activeIndex={Math.max(0, tabs.findIndex(tab => tab.id === activeTab))}
        onChange={index => onTabChange(tabs[index].id)}
        intensity={5}
      />
    </nav>
  );
}
