"use client";

import Toggle from "./Toggle";

interface ToolbarProps {
  allExpanded: boolean;
  covVisible: boolean;
  assessVisible: boolean;
  onToggleAll: () => void;
  onToggleCoverage: () => void;
  onToggleAssessment: () => void;
}

export default function Toolbar({
  allExpanded,
  covVisible,
  assessVisible,
  onToggleAll,
  onToggleCoverage,
  onToggleAssessment,
}: ToolbarProps) {
  return (
    <div className="flex gap-4 items-center mb-3 flex-wrap">
      <button
        className="text-xs text-tx3 cursor-pointer underline bg-transparent border-none"
        onClick={onToggleAll}
      >
        {allExpanded ? "Collapse all layers" : "Expand all layers"}
      </button>
      <Toggle
        label="Show platform coverage on capabilities"
        enabled={covVisible}
        onToggle={onToggleCoverage}
      />
      <Toggle
        label="Assessment mode"
        enabled={assessVisible}
        onToggle={onToggleAssessment}
      />
    </div>
  );
}
