"use client";

import { Layer } from "@/types";
import { LAYER_COLORS } from "@/lib/constants";

interface Props {
  layers: Layer[];
  selectedLayerId: string;
  onSelectLayer: (layer: Layer) => void;
}

export default function LayerSidebar({ layers, selectedLayerId, onSelectLayer }: Props) {
  return (
    <aside className="w-[240px] flex-shrink-0 sticky top-[52px] max-h-[calc(100vh-80px)] overflow-y-auto">
      <div className="space-y-1">
        {layers.map((layer) => {
          const isActive = layer.id === selectedLayerId;
          const color = LAYER_COLORS[layer.id] || "#888";
          const l2Count = layer.l1_components.reduce(
            (s, c) => s + c.l2_capabilities.length,
            0
          );

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
                className="w-[3px] h-8 rounded-full flex-shrink-0 transition-opacity"
                style={{
                  background: color,
                  opacity: isActive ? 1 : 0.4,
                }}
              />
              <div className="flex-1 min-w-0">
                <div
                  className={`text-[13px] font-medium leading-snug transition-colors ${
                    isActive ? "text-tx" : "text-tx2 group-hover:text-tx"
                  }`}
                >
                  {layer.name}
                </div>
                <div className="text-[11px] text-tx3 mt-0.5">
                  {layer.l1_components.length} components · {l2Count} capabilities
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
