"use client";

import { Layer, L1Component } from "@/types";

interface Props {
  layer: Layer;
  onSelectL1: (l1: L1Component) => void;
}

const PWC_ORANGE = "#C74E23";

export default function L1CardGrid({ layer, onSelectL1 }: Props) {
  const isPillars = layer.id === "functional_pillars";

  return (
    <div className="animate-fade-in">
      {/* Layer header */}
      <div className="mb-6">
        <h2 className="text-[28px] font-semibold tracking-tight" style={{ fontFamily: "var(--font-source-serif), 'Source Serif 4', Georgia, serif" }}>{layer.name}</h2>
        <p className="text-[16px] text-tx2 mt-2" style={{ fontFamily: "var(--font-source-serif), 'Source Serif 4', Georgia, serif", fontStyle: "italic" }}>{layer.design_question}</p>
        <p className="text-[15px] text-tx3 mt-1">{layer.design_principle}</p>
      </div>

      {/* L1 component cards */}
      <div className={`grid gap-3 ${
        isPillars ? "grid-cols-3 sm:grid-cols-5" : "grid-cols-2 lg:grid-cols-3"
      }`}>
        {layer.l1_components.map((comp, ci) => {
          const cardColor = PWC_ORANGE;


          return (
            <button
              key={comp.id}
              onClick={() => onSelectL1(comp)}
              className="text-left bg-surface border border-bd border-l-[3px] rounded-lg p-5 hover:border-bd2 hover:shadow-sm cursor-pointer transition-all duration-200 group"
              style={{ borderLeftColor: cardColor }}
            >
              <div className="text-[17px] font-semibold mb-1.5 group-hover:text-accent transition-colors" style={{ fontFamily: "var(--font-source-serif), 'Source Serif 4', Georgia, serif" }}>
                {comp.name}
              </div>
              <div className="text-[15px] text-tx2 leading-relaxed line-clamp-2 mb-4">
                {comp.description}
              </div>
              <div className="text-[14px] text-tx3">
                {comp.l2_capabilities.length} capabilities
              </div>
              <div className="flex justify-center mt-3">
                <span className="text-[18px] text-tx3 group-hover:text-accent transition-colors" style={{ transform: "rotate(90deg)" }}>›</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
