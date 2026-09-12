"use client";

import { Layer } from "@/types";

interface Props {
  layers: Layer[];
  selectedLayerId: string;
  onSelectLayer: (layer: Layer) => void;
}

const PWC_ORANGE = "#C74E23";
const INACTIVE_BAR = "#D4CFC6";

export default function LayerSidebar({ layers, selectedLayerId, onSelectLayer }: Props) {
  return (
    <aside className="w-[240px] flex-shrink-0 sticky top-[52px] max-h-[calc(100vh-80px)] overflow-y-auto">
      <div className="space-y-1">
        {layers.map((layer, i) => {
          const isActive = layer.id === selectedLayerId;
          const barColor = isActive ? PWC_ORANGE : INACTIVE_BAR;

          return (
            <button
              key={layer.id}
              onClick={() => onSelectLayer(layer)}
              className={`w-full text-left rounded-xl px-4 py-3 cursor-pointer transition-all duration-200 group flex items-center gap-3 ${
                isActive
                  ? "bg-accent-subtle border border-accent/15"
                  : "border border-transparent hover:bg-bg2"
              }`}
            >
              <div
                className="w-[3px] h-8 rounded-full flex-shrink-0 transition-all duration-200"
                style={{
                  background: barColor,
                  opacity: isActive ? 1 : 0.6,
                }}
              />
              <div className="flex-1 min-w-0">
                <div
                  className={`text-[15px] font-semibold leading-snug transition-colors ${
                    isActive ? "text-tx" : "text-tx2 group-hover:text-tx"
                  }`}
                  style={{ fontFamily: "var(--font-source-serif), 'Source Serif 4', Georgia, serif" }}
                >
                  {layer.name}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
