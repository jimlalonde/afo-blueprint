"use client";

import { useState, useEffect } from "react";
import { Layer, AssessmentEntry } from "@/types";
import { LAYER_COLORS } from "@/lib/constants";
import L1Accordion from "./L1Accordion";

interface Props {
  layer: Layer;
  layerIndex: number;
  forceOpen: boolean;
  navigateTarget: string | null;
  onNavigateComplete: () => void;
  covVisible: boolean;
  assessVisible: boolean;
  assessments: Record<string, AssessmentEntry>;
  onSetStage: (capId: string, type: "current" | "target", stage: number) => void;
  onSetNotes: (capId: string, notes: string) => void;
}

function layerContainsCap(layer: Layer, capId: string): boolean {
  return layer.l1_components.some((c) =>
    c.l2_capabilities.some((cap) => cap.id === capId)
  );
}

export default function LayerAccordion({
  layer,
  layerIndex,
  forceOpen,
  navigateTarget,
  onNavigateComplete,
  covVisible,
  assessVisible,
  assessments,
  onSetStage,
  onSetNotes,
}: Props) {
  const [open, setOpen] = useState(false);
  const color = LAYER_COLORS[layer.id] || "#888";
  const l1Count = layer.l1_components.length;
  const l2Count = layer.l1_components.reduce(
    (s, c) => s + c.l2_capabilities.length,
    0
  );

  const hasTarget = navigateTarget ? layerContainsCap(layer, navigateTarget) : false;

  useEffect(() => {
    if (forceOpen) setOpen(true);
    else setOpen(false);
  }, [forceOpen]);

  useEffect(() => {
    if (hasTarget) setOpen(true);
  }, [hasTarget]);

  return (
    <div className="mb-2 border border-bd rounded-lg overflow-hidden">
      <div
        className="py-3 px-4 cursor-pointer flex items-center gap-2.5 select-none transition-colors hover:bg-bg2"
        onClick={() => setOpen(!open)}
      >
        <div
          className="w-1 h-9 rounded-sm flex-shrink-0"
          style={{ background: color }}
        />
        <div className="flex-1">
          <div className="text-sm font-medium">{layer.name}</div>
          <div className="text-[11px] text-tx3 mt-0.5 italic">
            {layer.design_question}
          </div>
        </div>
        <div className="text-right">
          <div className="text-[11px] text-tx2">
            {l1Count} L1 &middot; {l2Count} L2
          </div>
          <div className="text-[10px] text-tx3 mt-px">
            {layer.design_principle}
          </div>
        </div>
        <span
          className={`text-[11px] text-tx3 transition-transform ml-1 ${open ? "rotate-90" : ""}`}
        >
          &#9654;
        </span>
      </div>
      {open && (
        <div className="border-t border-bd">
          {layer.l1_components.map((comp, ci) => (
            <L1Accordion
              key={comp.id}
              comp={comp}
              layerIndex={layerIndex}
              compIndex={ci}
              forceOpen={forceOpen}
              navigateTarget={navigateTarget}
              onNavigateComplete={onNavigateComplete}
              covVisible={covVisible}
              assessVisible={assessVisible}
              assessments={assessments}
              onSetStage={onSetStage}
              onSetNotes={onSetNotes}
            />
          ))}
        </div>
      )}
    </div>
  );
}
