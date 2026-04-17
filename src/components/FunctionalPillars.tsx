"use client";

import { useState, useEffect } from "react";
import { Layer, AssessmentEntry } from "@/types";
import { LAYER_COLORS, PILLAR_COLORS } from "@/lib/constants";
import L2Card from "./L2Card";

interface Props {
  layer: Layer;
  forceOpen: boolean;
  covVisible: boolean;
  assessVisible: boolean;
  assessments: Record<string, AssessmentEntry>;
  onSetStage: (capId: string, type: "current" | "target", stage: number) => void;
  onSetNotes: (capId: string, notes: string) => void;
}

export default function FunctionalPillars({
  layer,
  forceOpen,
  covVisible,
  assessVisible,
  assessments,
  onSetStage,
  onSetNotes,
}: Props) {
  const [open, setOpen] = useState(false);
  const [activePillar, setActivePillar] = useState<number>(-1);
  const color = LAYER_COLORS[layer.id] || "#888";
  const l1Count = layer.l1_components.length;
  const l2Count = layer.l1_components.reduce(
    (s, c) => s + c.l2_capabilities.length,
    0
  );

  useEffect(() => {
    if (forceOpen) setOpen(true);
    else setOpen(false);
  }, [forceOpen]);

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
          <div className="grid grid-cols-5 gap-1 p-2">
            {layer.l1_components.map((comp, ci) => {
              const pcolor = PILLAR_COLORS[comp.id] || "#888";
              const isActive = activePillar === ci;
              return (
                <div
                  key={comp.id}
                  className={`rounded-md p-2.5 cursor-pointer select-none transition-all border text-center relative ${
                    isActive
                      ? "border-bd2 bg-bg2"
                      : "border-bd bg-bg hover:bg-bg2"
                  }`}
                  onClick={() =>
                    setActivePillar(isActive ? -1 : ci)
                  }
                >
                  <div
                    className="w-full h-[3px] rounded-sm mb-1.5"
                    style={{ background: pcolor }}
                  />
                  <div className="text-xs font-medium">{comp.name}</div>
                  <div className="text-[9px] text-tx3 mt-[3px] leading-snug">
                    {comp.description.split(",").slice(0, 2).join(",")}
                  </div>
                  <div className="text-[10px] text-tx3 mt-1">
                    {comp.l2_capabilities.length} capabilities
                  </div>
                  {isActive && (
                    <div
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0"
                      style={{
                        borderLeft: "6px solid transparent",
                        borderRight: "6px solid transparent",
                        borderTop: "6px solid var(--color-bd2)",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
          {layer.l1_components.map((comp, ci) => {
            if (activePillar !== ci) return null;
            const pcolor = PILLAR_COLORS[comp.id] || "#888";
            return (
              <div
                key={comp.id}
                className="mx-2 mb-2 rounded-md border border-bd bg-bg overflow-hidden"
              >
                <div
                  className="py-2.5 px-3.5 bg-bg2 border-b border-bd flex items-baseline gap-2"
                  style={{ borderTopWidth: 3, borderTopColor: pcolor }}
                >
                  <div className="text-[13px] font-medium">{comp.name}</div>
                  <div className="text-[11px] text-tx3">
                    {comp.l2_capabilities.length} L2 capabilities
                  </div>
                </div>
                {comp.l2_capabilities.map((cap) => (
                  <L2Card
                    key={cap.id}
                    cap={cap}
                    variant="pillar"
                    covVisible={covVisible}
                    assessVisible={assessVisible}
                    assessment={
                      assessments[cap.id] || {
                        current: null,
                        target: null,
                        notes: "",
                      }
                    }
                    onSetStage={onSetStage}
                    onSetNotes={onSetNotes}
                  />
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
