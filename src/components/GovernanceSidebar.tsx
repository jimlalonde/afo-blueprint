"use client";

import { useState, useEffect } from "react";
import { Layer, AssessmentEntry } from "@/types";
import L2Card from "./L2Card";

interface Props {
  layer: Layer;
  forceOpen: boolean;
  navigateTarget: string | null;
  onNavigateComplete: () => void;
  covVisible: boolean;
  assessVisible: boolean;
  assessments: Record<string, AssessmentEntry>;
  onSetStage: (capId: string, type: "current" | "target", stage: number) => void;
  onSetNotes: (capId: string, notes: string) => void;
}

function GovL1({
  comp,
  forceOpen,
  navigateTarget,
  onNavigateComplete,
  covVisible,
  assessVisible,
  assessments,
  onSetStage,
  onSetNotes,
}: {
  comp: Props["layer"]["l1_components"][0];
  forceOpen: boolean;
  navigateTarget: string | null;
  onNavigateComplete: () => void;
  covVisible: boolean;
  assessVisible: boolean;
  assessments: Record<string, AssessmentEntry>;
  onSetStage: Props["onSetStage"];
  onSetNotes: Props["onSetNotes"];
}) {
  const [open, setOpen] = useState(false);

  const hasTarget = navigateTarget
    ? comp.l2_capabilities.some((cap) => cap.id === navigateTarget)
    : false;

  useEffect(() => {
    if (forceOpen) setOpen(true);
    else setOpen(false);
  }, [forceOpen]);

  useEffect(() => {
    if (hasTarget) setOpen(true);
  }, [hasTarget]);

  return (
    <div className="border-b border-bd last:border-b-0">
      <div
        className="py-2.5 px-3.5 cursor-pointer flex items-center gap-2 select-none transition-colors hover:bg-bg2"
        onClick={() => setOpen(!open)}
      >
        <span
          className={`text-[10px] text-tx3 transition-transform ${open ? "rotate-90" : ""}`}
        >
          &#9654;
        </span>
        <span className="text-xs font-medium flex-1">{comp.name}</span>
        <span className="text-[10px] text-tx3">
          {comp.l2_capabilities.length} L2
        </span>
      </div>
      {open && (
        <div className="bg-bg2">
          {comp.l2_capabilities.map((cap) => (
            <L2Card
              key={cap.id}
              cap={cap}
              variant="governance"
              singleColumnMaturity
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

function layerContainsCap(layer: Props["layer"], capId: string): boolean {
  return layer.l1_components.some((c) =>
    c.l2_capabilities.some((cap) => cap.id === capId)
  );
}

export default function GovernanceSidebar({
  layer,
  forceOpen,
  navigateTarget,
  onNavigateComplete,
  covVisible,
  assessVisible,
  assessments,
  onSetStage,
  onSetNotes,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const l1Count = layer.l1_components.length;
  const l2Count = layer.l1_components.reduce(
    (s, c) => s + c.l2_capabilities.length,
    0
  );

  const hasTarget = navigateTarget
    ? layerContainsCap(layer, navigateTarget)
    : false;

  useEffect(() => {
    if (forceOpen) setExpanded(true);
    else setExpanded(false);
  }, [forceOpen]);

  useEffect(() => {
    if (hasTarget) setExpanded(true);
  }, [hasTarget]);

  if (!expanded) {
    return (
      <div className="flex items-stretch">
        <div
          className="w-11 rounded-lg bg-[#D04A02] cursor-pointer select-none flex flex-col items-center justify-center gap-1.5 transition-opacity hover:opacity-90"
          onClick={() => setExpanded(true)}
        >
          <span className="text-[10px] text-[#FDDCC8]">&#9654;</span>
          <span className="[writing-mode:vertical-lr] [text-orientation:mixed] text-[11px] font-medium tracking-wider uppercase text-[#FFF1E8]">
            Governance &amp; trust
          </span>
          <span className="[writing-mode:vertical-lr] [text-orientation:mixed] text-[9px] text-[#FDDCC8]">
            {l1Count} L1 / {l2Count} L2
          </span>
          <span className="text-[10px] text-[#FDDCC8]">&#9654;</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[340px] flex-shrink-0 flex flex-col">
      <div className="rounded-lg border border-[#D04A02] overflow-hidden flex flex-col flex-1">
        <div
          className="bg-[#D04A02] text-[#FFF1E8] py-3 px-3.5 flex items-center gap-2 cursor-pointer select-none hover:bg-[#B03E02]"
          onClick={() => setExpanded(false)}
        >
          <span className="text-[11px] opacity-70">&#9664;</span>
          <span className="text-[13px] font-medium flex-1">
            Governance &amp; trust
          </span>
          <span className="text-[10px] opacity-70">
            {l1Count} L1, {l2Count} L2
          </span>
        </div>
        <div className="flex-1 overflow-y-auto bg-bg">
          {layer.l1_components.map((comp) => (
            <GovL1
              key={comp.id}
              comp={comp}
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
      </div>
    </div>
  );
}
