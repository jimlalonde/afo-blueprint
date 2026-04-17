"use client";

import { useState, useEffect } from "react";
import { L1Component, AssessmentEntry } from "@/types";
import L2Card from "./L2Card";

interface Props {
  comp: L1Component;
  layerIndex: number;
  compIndex: number;
  forceOpen: boolean;
  navigateTarget: string | null;
  onNavigateComplete: () => void;
  covVisible: boolean;
  assessVisible: boolean;
  assessments: Record<string, AssessmentEntry>;
  onSetStage: (capId: string, type: "current" | "target", stage: number) => void;
  onSetNotes: (capId: string, notes: string) => void;
}

export default function L1Accordion({
  comp,
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

  const hasTarget = navigateTarget
    ? comp.l2_capabilities.some((cap) => cap.id === navigateTarget)
    : false;

  useEffect(() => {
    if (forceOpen) setOpen(true);
  }, [forceOpen]);

  useEffect(() => {
    if (hasTarget) setOpen(true);
  }, [hasTarget]);

  return (
    <div className="border-b border-bd last:border-b-0">
      <div
        className="py-2.5 px-4 pl-9 cursor-pointer flex items-center gap-2 select-none transition-colors hover:bg-bg2"
        onClick={() => setOpen(!open)}
      >
        <span
          className={`text-[10px] text-tx3 transition-transform ${open ? "rotate-90" : ""}`}
        >
          &#9654;
        </span>
        <span className="text-[13px] font-medium flex-1">{comp.name}</span>
        <span className="text-[11px] text-tx3 flex-[2]">
          {comp.description}
        </span>
        <span className="text-[11px] text-tx3 whitespace-nowrap">
          {comp.l2_capabilities.length} L2
        </span>
      </div>
      {open && (
        <div className="bg-bg2">
          {comp.l2_capabilities.map((cap) => (
            <L2Card
              key={cap.id}
              cap={cap}
              covVisible={covVisible}
              assessVisible={assessVisible}
              assessment={
                assessments[cap.id] || { current: null, target: null, notes: "" }
              }
              onSetStage={onSetStage}
              onSetNotes={onSetNotes}
              isNavigateTarget={navigateTarget === cap.id}
              onNavigateComplete={onNavigateComplete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
