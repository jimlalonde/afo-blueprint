"use client";

import { Layer, L1Component } from "@/types";
import { LAYER_COLORS, PILLAR_COLORS } from "@/lib/constants";

interface Props {
  layer: Layer;
  onSelectL1: (l1: L1Component) => void;
}

export default function L1CardGrid({ layer, onSelectL1 }: Props) {
  const color = LAYER_COLORS[layer.id] || "#888";
  const isPillars = layer.id === "functional_pillars";

  return (
    <div className="animate-fade-in">
      {/* Layer header */}
      <div className="mb-6">
        <h2 className="text-[24px] font-semibold tracking-tight">{layer.name}</h2>
        <p className="text-[14px] text-tx2 mt-1 italic">{layer.design_question}</p>
        <p className="text-[13px] text-tx3 mt-1">{layer.design_principle}</p>
      </div>

      {/* L1 component cards */}
      <div className={`grid gap-3 ${
        isPillars ? "grid-cols-3 sm:grid-cols-5" : "grid-cols-2 lg:grid-cols-3"
      }`}>
        {layer.l1_components.map((comp) => {
          const cardColor = isPillars
            ? PILLAR_COLORS[comp.id] || color
            : color;

          const strongCount = comp.l2_capabilities.filter((c) =>
            Object.values(c.platform_coverage).some((p) => p.rating === "strong")
          ).length;
          const gapCount = comp.l2_capabilities.filter((c) =>
            Object.values(c.platform_coverage).every((p) => p.rating === "gap")
          ).length;

          return (
            <button
              key={comp.id}
              onClick={() => onSelectL1(comp)}
              className="text-left bg-surface border border-bd rounded-xl p-5 hover:border-bd2 hover:shadow-md cursor-pointer transition-all duration-200 group"
            >
              <div
                className="w-full h-[3px] rounded-full mb-4"
                style={{ background: cardColor }}
              />
              <div className="text-[15px] font-semibold mb-1.5 group-hover:text-accent transition-colors">
                {comp.name}
              </div>
              <div className="text-[13px] text-tx2 leading-relaxed line-clamp-2 mb-4">
                {comp.description}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-tx3">
                  {comp.l2_capabilities.length} capabilities
                </span>
                <div className="flex items-center gap-2 text-[11px]">
                  {strongCount > 0 && (
                    <span className="flex items-center gap-1">
                      <span className="cov-dot cov-dot-strong" />
                      <span className="text-tx3">{strongCount}</span>
                    </span>
                  )}
                  {gapCount > 0 && (
                    <span className="flex items-center gap-1">
                      <span className="cov-dot cov-dot-gap" />
                      <span className="text-tx3">{gapCount}</span>
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
