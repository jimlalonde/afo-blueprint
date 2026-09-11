"use client";

import { ViewMode } from "../BlueprintV2";

interface Props {
  stats: { layers: number; l1: number; l2: number; version: string };
  activeView: ViewMode;
  onChangeView: (v: ViewMode) => void;
}

const MODE_CARDS: {
  key: ViewMode;
  title: string;
  description: string;
  icon: string;
}[] = [
  {
    key: "explore",
    title: "Explore",
    description: "Browse the reference architecture",
    icon: "◎",
  },
  {
    key: "coverage",
    title: "Coverage",
    description: "Analyze platform fit & gaps",
    icon: "◧",
  },
  {
    key: "assess",
    title: "Assess",
    description: "Rate your current maturity",
    icon: "◈",
  },
  {
    key: "scorecard",
    title: "Scorecard",
    description: "Review assessment results",
    icon: "◉",
  },
];

export default function HeroHeader({ stats, activeView, onChangeView }: Props) {
  return (
    <header className="px-6 pt-12 pb-6">
      {/* Title block */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <span className="text-white text-sm font-bold">P</span>
          </div>
          <span className="text-[13px] text-tx3 font-medium tracking-wide uppercase">
            PwC Capability Blueprint
          </span>
        </div>
        <h1
          className="text-[40px] leading-[1.1] tracking-[-0.02em] font-bold mb-3"
          style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}
        >
          <span className="bg-[linear-gradient(135deg,var(--color-accent)_0%,var(--color-tx)_40%)] bg-clip-text text-transparent">
            Intelligent Customer Edge
          </span>
        </h1>
        <p className="text-[17px] text-tx2 max-w-[600px] leading-relaxed">
          Explore, assess, and plan your agentic front office capabilities across{" "}
          <span className="text-tx font-medium">{stats.layers} layers</span>,{" "}
          <span className="text-tx font-medium">{stats.l1} components</span>, and{" "}
          <span className="text-tx font-medium">{stats.l2} capabilities</span>.
        </p>
      </div>

      {/* Mode cards */}
      <div className="grid grid-cols-4 gap-3">
        {MODE_CARDS.map((card) => {
          const isActive = activeView === card.key;
          return (
            <button
              key={card.key}
              onClick={() => onChangeView(card.key)}
              className={`text-left rounded-xl px-5 py-4 border cursor-pointer transition-all duration-200 ${
                isActive
                  ? "bg-accent-light border-accent/20 shadow-sm"
                  : "bg-surface border-bd hover:border-bd2 hover:bg-bg2"
              }`}
            >
              <div className={`text-2xl mb-2 ${isActive ? "text-accent" : "text-tx3"}`}>
                {card.icon}
              </div>
              <div className={`text-[15px] font-semibold mb-0.5 ${isActive ? "text-accent" : "text-tx"}`}>
                {card.title}
              </div>
              <div className="text-[13px] text-tx3 leading-snug">
                {card.description}
              </div>
            </button>
          );
        })}
      </div>
    </header>
  );
}
