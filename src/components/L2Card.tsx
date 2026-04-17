"use client";

import { L2Capability, AssessmentEntry } from "@/types";
import MaturityIndicators from "./MaturityIndicators";
import CoveragePills from "./CoveragePills";
import AssessmentControls from "./AssessmentControls";

interface Props {
  cap: L2Capability;
  covVisible: boolean;
  assessVisible: boolean;
  assessment: AssessmentEntry;
  onSetStage: (capId: string, type: "current" | "target", stage: number) => void;
  onSetNotes: (capId: string, notes: string) => void;
  variant?: "standard" | "governance" | "pillar";
  singleColumnMaturity?: boolean;
}

const VARIANT_CLASSES = {
  standard: "py-2.5 px-4 pl-[52px] border-t border-bd",
  governance: "py-2 px-3.5 border-t border-bd",
  pillar: "py-2.5 px-3.5 border-b border-bd last:border-b-0",
};

export default function L2Card({
  cap,
  covVisible,
  assessVisible,
  assessment,
  onSetStage,
  onSetNotes,
  variant = "standard",
  singleColumnMaturity,
}: Props) {
  return (
    <div id={`cap-${cap.id}`} className={VARIANT_CLASSES[variant]}>
      <div className="text-[10px] text-tx3 font-mono mb-0.5">{cap.id}</div>
      <div className={`font-medium ${variant === "governance" ? "text-[11px]" : "text-xs"}`}>
        {cap.name}
      </div>
      <div
        className={`text-tx2 mt-[3px] leading-[1.45] ${variant === "governance" ? "text-[10px]" : "text-[11px]"}`}
      >
        {cap.description}
      </div>
      <MaturityIndicators
        indicators={cap.maturity_indicators}
        singleColumn={singleColumnMaturity}
      />
      <CoveragePills
        coverage={cap.platform_coverage}
        visible={covVisible}
        inGovPanel={variant === "governance"}
      />
      <AssessmentControls
        capId={cap.id}
        assessment={assessment}
        visible={assessVisible}
        onSetStage={onSetStage}
        onSetNotes={onSetNotes}
      />
    </div>
  );
}
