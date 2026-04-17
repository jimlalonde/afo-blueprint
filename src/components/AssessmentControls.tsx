"use client";

import { AssessmentEntry } from "@/types";
import { STAGE_NAMES } from "@/lib/constants";

interface Props {
  capId: string;
  assessment: AssessmentEntry;
  visible: boolean;
  onSetStage: (capId: string, type: "current" | "target", stage: number) => void;
  onSetNotes: (capId: string, notes: string) => void;
}

const BTN_SELECTED: Record<number, string> = {
  1: "bg-bg3 text-tx border-tx3",
  2: "bg-assess-2-bg text-assess-2 border-assess-2",
  3: "bg-assess-3-bg text-assess-3 border-assess-3",
  4: "bg-assess-4-bg text-assess-4 border-assess-4",
};

function StageRow({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: number | null;
  onSelect: (stage: number) => void;
}) {
  return (
    <div className="flex items-center gap-2 mb-1.5">
      <div className="text-[10px] text-tx3 min-w-[52px]">{label}</div>
      <div className="flex gap-[3px]">
        {[1, 2, 3, 4].map((s) => {
          const isSelected = selected === s;
          return (
            <button
              key={s}
              onClick={() => onSelect(s)}
              className={`w-6 h-6 rounded text-[10px] font-medium flex items-center justify-center transition-all cursor-pointer border ${
                isSelected
                  ? BTN_SELECTED[s]
                  : "bg-bg text-tx3 border-bd hover:border-bd2 hover:text-tx"
              }`}
            >
              {s}
            </button>
          );
        })}
      </div>
      {selected && (
        <span className="text-[9px] text-tx3 ml-1.5">
          {STAGE_NAMES[selected]}
        </span>
      )}
    </div>
  );
}

export default function AssessmentControls({
  capId,
  assessment,
  visible,
  onSetStage,
  onSetNotes,
}: Props) {
  if (!visible) return null;

  return (
    <div className="mt-2 p-2 px-2.5 bg-bg border border-bd rounded-md">
      <StageRow
        label="Current"
        selected={assessment.current}
        onSelect={(s) => onSetStage(capId, "current", s)}
      />
      <StageRow
        label="Target"
        selected={assessment.target}
        onSelect={(s) => onSetStage(capId, "target", s)}
      />
      <input
        type="text"
        className="w-full text-[10px] py-1 px-1.5 border border-bd rounded bg-bg2 text-tx font-[inherit] resize-y min-h-6 mt-1 placeholder:text-tx3"
        placeholder="Notes..."
        value={assessment.notes}
        onChange={(e) => onSetNotes(capId, e.target.value)}
      />
    </div>
  );
}
