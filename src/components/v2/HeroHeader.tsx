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
}[] = [
  { key: "explore", title: "Explore", description: "Browse the capability blueprint" },
  { key: "coverage", title: "Coverage", description: "Analyze platform fit & gaps" },
  { key: "prioritize", title: "Prioritize", description: "Focus your assessment scope" },
  { key: "assess", title: "Assess", description: "Rate maturity & view results" },
];

export default function HeroHeader({ stats, activeView, onChangeView }: Props) {
  return (
    <>
      {/* Dark hero banner */}
      <header
        className="relative overflow-hidden"
        style={{
          background: "radial-gradient(120% 140% at 15% 0%, #221C17 0%, #14110F 60%)",
          color: "#F2EEE8",
          padding: "80px 0 70px",
        }}
      >
        {/* Orange radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(120% 95% at 100% -10%, rgba(199,78,35,0.42) 0%, rgba(199,78,35,0.10) 38%, rgba(199,78,35,0) 62%)",
          }}
        />

        {/* Transparent parallelogram marks (top-right) */}
        <svg
          className="absolute pointer-events-none"
          style={{ top: 20, right: 40, width: 420, height: "auto", opacity: 0.07, filter: "brightness(0) invert(1)" }}
          viewBox="260 0 300 75"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path fill="#000" d="M389.24 69.47 266.27 69.47 287.22 34.74 410.19 34.74 389.24 69.47Z" />
          <path fill="#000" d="M554.12 0 431.15 0 410.2 34.73 533.17 34.73 554.12 0Z" />
        </svg>

        <div className="relative z-10 px-10">
          {/* PwC logo */}
          <div className="mb-7">
            <svg viewBox="0 0 555 270" xmlns="http://www.w3.org/2000/svg" style={{ width: 64, height: "auto" }}>
              <path fill="#FFFFFF" d="M410.2 113.89C390.7 117.04 380.74 131.44 380.74 156.78 380.74 182.12 394.02 199.33 414.37 199.33 423.84 199.33 432.45 196.18 450.54 187.31L450.54 207.94C428.83 217.9 416.05 220.98 398.55 220.98 379.61 220.98 366.28 215.95 355.4 204.86 344.25 193.7 338.67 178.97 338.67 162.56 338.67 126.06 365.69 101.37 405.15 101.37 431.36 101.37 449.39 113.35 449.39 130.93 449.39 142.25 441 150.05 428.55 150.05 422.16 150.05 416.91 148.38 410.19 144.48L410.19 113.88ZM313.98 162.57C331.46 140.53 337.63 131.65 337.63 120.83 337.63 110.01 329.08 101.38 317.65 101.38 310.61 101.38 304.28 104.7 301.18 108.16L301.18 153.05 272.54 191.21 272.54 104.2 245.31 104.2 200.04 179.25 200.04 104.2 184.39 104.2 143.3 114.22 143.3 124.72 165.71 126.99 165.71 219.03 194.68 219.03 238.1 147.68 238.1 219.03 269.83 219.03 313.97 162.56ZM56.79 127.6C63.45 126.79 66.75 126.41 69.9 126.41 88.79 126.41 99.03 138.97 99.03 162.58 99.03 190.47 86.52 205.02 63.18 205.02 61.23 205.02 59.88 205.02 56.79 204.87L56.79 127.6ZM56.79 217.91C64.32 218.77 71.62 219.04 76.02 219.04 114.84 219.04 139.47 194.2 139.47 157.27 139.47 125.33 121.01 102.26 95.99 102.26 85.16 102.26 77.9 104.48 56.79 117.05L56.79 101.67 45.09 101.67 0 115.36 0 126.4 18.67 126.4 18.67 255.16 1.87 259.34 1.87 270 75.57 270 75.57 259.34C75.57 259.34 56.78 255.16 56.78 255.16L56.78 217.91Z" />
              <path fill="#C74E23" d="M389.24 69.47 266.27 69.47 287.22 34.74 410.19 34.74 389.24 69.47ZM554.12 0 431.15 0 410.2 34.73 533.17 34.73 554.12 0Z" />
            </svg>
          </div>

          {/* Title */}
          <h1
            className="text-[clamp(40px,6.6vw,78px)] leading-[1.04] tracking-[-0.01em] mb-4"
            style={{ fontFamily: "var(--font-source-serif), 'Source Serif 4', Georgia, serif", color: "#fff", fontWeight: 700, fontOpticalSizing: "auto", fontVariationSettings: "'opsz' 60" }}
          >
            Intelligent{" "}
            <span style={{ color: "#C74E23" }}>Customer Edge</span>
          </h1>
          <p
            className="text-[clamp(18px,2.2vw,26px)] tracking-wide"
            style={{ fontFamily: "var(--font-source-serif), 'Source Serif 4', Georgia, serif", color: "#D8D0C6", fontWeight: 500 }}
          >
            Capability Blueprint
          </p>
        </div>
      </header>

      {/* Mode cards — sits right below hero */}
      <div className="px-8 pt-8 pb-4">
        <div className="grid grid-cols-4 gap-3">
          {MODE_CARDS.map((card) => {
            const isActive = activeView === card.key;
            return (
              <button
                key={card.key}
                onClick={() => onChangeView(card.key)}
                className={`text-left rounded-lg px-5 py-4 border cursor-pointer transition-all duration-200 ${
                  isActive
                    ? "bg-accent-light border-l-[3px] border-l-accent border-accent/25"
                    : "bg-surface border-bd hover:border-bd2"
                }`}
              >
                <div
                  className={`text-[17px] font-semibold mb-1 ${isActive ? "text-accent" : "text-tx"}`}
                  style={{ fontFamily: "var(--font-source-serif), 'Source Serif 4', Georgia, serif" }}
                >
                  {card.title}
                </div>
                <div className="text-[14px] text-tx2 leading-snug">
                  {card.description}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
