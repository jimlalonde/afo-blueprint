"use client";

import { useState, useEffect } from "react";
import { Layer, AssessmentEntry } from "@/types";
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

function GovL1({
  comp,
  forceOpen,
  covVisible,
  assessVisible,
  assessments,
  onSetStage,
  onSetNotes,
}: {
  comp: Props["layer"]["l1_components"][0];
  forceOpen: boolean;
  covVisible: boolean;
  assessVisible: boolean;
  assessments: Record<string, AssessmentEntry>;
  onSetStage: Props["onSetStage"];
  onSetNotes: Props["onSetNotes"];
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (forceOpen) setOpen(true);
    else setOpen(false);
  }, [forceOpen]);

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
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function GovernanceSidebar({
  layer,
  forceOpen,
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

  useEffect(() => {
    if (forceOpen) setExpanded(true);
    else setExpanded(false);
  }, [forceOpen]);

  if (!expanded) {
    return (
      <div className="flex items-stretch">
        <div
          className="w-11 rounded-lg bg-[#993556] cursor-pointer select-none flex flex-col items-center justify-center gap-1.5 transition-opacity hover:opacity-90"
          onClick={() => setExpanded(true)}
        >
          <span className="text-[10px] text-[#F4C0D1]">&#9654;</span>
          <span className="[writing-mode:vertical-lr] [text-orientation:mixed] text-[11px] font-medium tracking-wider uppercase text-[#FBEAF0]">
            Governance &amp; trust
          </span>
          <span className="[writing-mode:vertical-lr] [text-orientation:mixed] text-[9px] text-[#F4C0D1]">
            {l1Count} L1 / {l2Count} L2
          </span>
          <span className="text-[10px] text-[#F4C0D1]">&#9654;</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[340px] flex-shrink-0 flex flex-col">
      <div className="rounded-lg border border-[#993556] overflow-hidden flex flex-col flex-1">
        <div
          className="bg-[#993556] text-[#FBEAF0] py-3 px-3.5 flex items-center gap-2 cursor-pointer select-none hover:bg-[#7a2a45]"
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
          {layer.l1_components.map((comp, ci) => (
            <GovL1
              key={comp.id}
              comp={comp}
              forceOpen={forceOpen}
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
