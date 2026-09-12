"use client";

import { useState } from "react";
import { BlueprintData, Layer, L1Component, L2Capability } from "@/types";
import LayerSidebar from "./LayerSidebar";
import L1CardGrid from "./L1CardGrid";
import L2DetailPanel from "./L2DetailPanel";

interface Props {
  data: BlueprintData;
}

export default function ExploreView({ data }: Props) {
  const [selectedLayer, setSelectedLayer] = useState<Layer>(data.layers[0]);
  const [selectedL1, setSelectedL1] = useState<L1Component | null>(null);
  const [selectedL2, setSelectedL2] = useState<L2Capability | null>(null);

  const handleSelectLayer = (layer: Layer) => {
    setSelectedLayer(layer);
    setSelectedL1(null);
    setSelectedL2(null);
  };

  const handleSelectL1 = (l1: L1Component) => {
    setSelectedL1(l1);
    setSelectedL2(null);
  };

  const handleSelectL2 = (cap: L2Capability) => {
    setSelectedL2(cap);
  };

  const handleBack = () => {
    if (selectedL2) {
      setSelectedL2(null);
    } else if (selectedL1) {
      setSelectedL1(null);
    }
  };

  // Breadcrumb
  const crumbs: { label: string; onClick?: () => void }[] = [
    { label: selectedLayer.name, onClick: () => { setSelectedL1(null); setSelectedL2(null); } },
  ];
  if (selectedL1) {
    crumbs.push({ label: selectedL1.name, onClick: () => setSelectedL2(null) });
  }
  if (selectedL2) {
    crumbs.push({ label: selectedL2.name });
  }

  return (
    <div className="animate-fade-in">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 mb-5 text-[15px]">
        {crumbs.map((c, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-tx3">›</span>}
            {c.onClick ? (
              <button
                onClick={c.onClick}
                className="text-tx3 hover:text-accent cursor-pointer transition-colors"
              >
                {c.label}
              </button>
            ) : (
              <span className="text-tx font-medium">{c.label}</span>
            )}
          </span>
        ))}
      </div>

      <div className="flex gap-5 items-start">
        {/* Layer sidebar */}
        <LayerSidebar
          layers={data.layers}
          selectedLayerId={selectedLayer.id}
          onSelectLayer={handleSelectLayer}
        />

        {/* Main content area */}
        <div className="flex-1 min-w-0">
          {!selectedL1 ? (
            <L1CardGrid
              layer={selectedLayer}
              onSelectL1={handleSelectL1}
            />
          ) : !selectedL2 ? (
            <div className="animate-fade-in">
              {/* L1 header */}
              <div className="mb-5">
                <button
                  onClick={handleBack}
                  className="text-[15px] text-tx3 hover:text-accent mb-3 cursor-pointer flex items-center gap-1 transition-colors"
                >
                  ← Back to {selectedLayer.name}
                </button>
                <h2 className="text-[26px] font-semibold tracking-tight" style={{ fontFamily: "var(--font-source-serif), 'Source Serif 4', Georgia, serif" }}>{selectedL1.name}</h2>
                <p className="text-[16px] text-tx2 mt-1">{selectedL1.description}</p>
              </div>

              {/* L2 capability list */}
              <div className="space-y-2">
                {selectedL1.l2_capabilities.map((cap) => (
                  <button
                    key={cap.id}
                    onClick={() => handleSelectL2(cap)}
                    className="w-full text-left bg-surface border border-bd rounded-xl px-5 py-4 hover:border-bd2 hover:shadow-sm cursor-pointer transition-all duration-200 group"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="text-[17px] font-medium group-hover:text-accent transition-colors">
                          {cap.name}
                        </div>
                        <div className="text-[15px] text-tx2 mt-1 leading-relaxed">
                          {cap.description}
                        </div>
                      </div>
                      <span className="text-[18px] text-tx3 group-hover:text-accent transition-colors flex-shrink-0">›</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="animate-slide-in">
              <button
                onClick={handleBack}
                className="text-[15px] text-tx3 hover:text-accent mb-4 cursor-pointer flex items-center gap-1 transition-colors"
              >
                ← Back to {selectedL1.name}
              </button>
              <L2DetailPanel cap={selectedL2} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

