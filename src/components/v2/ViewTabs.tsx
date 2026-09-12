"use client";

import { ViewMode } from "../BlueprintV2";

interface Props {
  activeView: ViewMode;
  onChangeView: (v: ViewMode) => void;
}

const TABS: { key: ViewMode; label: string }[] = [
  { key: "explore", label: "Explore" },
  { key: "coverage", label: "Coverage" },
  { key: "prioritize", label: "Prioritize" },
  { key: "assess", label: "Assess" },
];

export default function ViewTabs({ activeView, onChangeView }: Props) {
  return (
    <nav className="sticky top-0 z-40 bg-bg/80 backdrop-blur-lg border-b border-bd px-6">
      <div className="flex items-center gap-1">
        {TABS.map((tab) => {
          const isActive = activeView === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => onChangeView(tab.key)}
              className={`relative px-4 py-3 text-[14px] font-medium cursor-pointer transition-colors ${
                isActive ? "text-accent" : "text-tx3 hover:text-tx2"
              }`}
            >
              {tab.label}
              {isActive && (
                <div className="absolute bottom-0 left-4 right-4 h-[2px] bg-accent rounded-t-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
