"use client";

import { useState, useMemo } from "react";
import { BlueprintData, Layer, L1Component, Assessments, AssessmentEntry } from "@/types";
import { STAGE_NAMES } from "@/lib/constants";

const PWC_ORANGE = "#C74E23";
const PWC_GOLD = "#FFB600";
const PWC_BLACK = "#2D2D2D";
const LAYER_BAR_COLORS = [PWC_ORANGE, PWC_GOLD, PWC_BLACK, PWC_ORANGE, PWC_GOLD, PWC_BLACK, PWC_ORANGE];

interface Props {
  data: BlueprintData;
  assessments: Assessments;
  onSetStage: (capId: string, type: "current" | "target", stage: number) => void;
  onSetNotes: (capId: string, notes: string) => void;
}

export default function AssessView({ data, assessments, onSetStage, onSetNotes }: Props) {
  const [selectedLayerId, setSelectedLayerId] = useState<string>(data.layers[0].id);
  const [selectedL1Id, setSelectedL1Id] = useState<string | null>(null);

  const selectedLayer = data.layers.find((l) => l.id === selectedLayerId)!;

  // Count assessed capabilities
  const assessedCount = Object.values(assessments).filter(
    (a) => a.current !== null || a.target !== null
  ).length;
  const totalCaps = data.metadata.total_l2_capabilities;

  const selectLayer = (id: string) => {
    setSelectedLayerId(id);
    setSelectedL1Id(null);
  };

  const selectedL1 = selectedL1Id
    ? selectedLayer.l1_components.find((c) => c.id === selectedL1Id)
    : null;

  return (
    <div className="animate-fade-in">
      {/* Progress header */}
      <div className="mb-8">
        <div className="eyebrow mb-3">Assess</div>
        <h2 className="text-[26px] font-semibold tracking-tight mb-2" style={{ fontFamily: "var(--font-source-serif), 'Source Serif 4', Georgia, serif" }}>Maturity Assessment</h2>
        <p className="text-[16px] text-tx2 mb-4">
          Rate current and target maturity for each capability.
        </p>

        {/* Progress bar */}
        <div className="bg-surface border border-bd rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[15px] text-tx2">Assessment progress</span>
            <span className="text-[16px] font-semibold text-accent">
              {assessedCount} / {totalCaps}
            </span>
          </div>
          <div className="h-2 rounded-full bg-bg3 overflow-hidden">
            <div
              className="h-full rounded-full bg-accent transition-all duration-500"
              style={{ width: `${(assessedCount / totalCaps) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-5 items-start">
        {/* Layer/L1 picker sidebar */}
        <aside className="w-[240px] flex-shrink-0 sticky top-[52px]">
          <div className="space-y-1">
            {data.layers.map((layer) => {
              const isActive = layer.id === selectedLayerId;
              const layerIdx = data.layers.findIndex((l) => l.id === layer.id);
              const color = LAYER_BAR_COLORS[layerIdx % LAYER_BAR_COLORS.length];
              const layerAssessed = layer.l1_components.reduce(
                (s, c) =>
                  s +
                  c.l2_capabilities.filter(
                    (cap) => {
                      const a = assessments[cap.id];
                      return a && (a.current !== null || a.target !== null);
                    }
                  ).length,
                0
              );
              const layerTotal = layer.l1_components.reduce(
                (s, c) => s + c.l2_capabilities.length,
                0
              );

              return (
                <button
                  key={layer.id}
                  onClick={() => selectLayer(layer.id)}
                  className={`w-full text-left rounded-xl px-4 py-3 cursor-pointer transition-all duration-200 flex items-center gap-3 ${
                    isActive
                      ? "bg-accent-subtle border border-accent/15"
                      : "border border-transparent hover:bg-bg2"
                  }`}
                >
                  <div
                    className="w-[3px] h-8 rounded-full flex-shrink-0"
                    style={{ background: color, opacity: isActive ? 1 : 0.4 }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className={`text-[15px] font-medium ${isActive ? "text-tx" : "text-tx2"}`}>
                      {layer.name}
                    </div>
                    <div className="text-[13px] text-tx3 mt-0.5">
                      {layerAssessed}/{layerTotal} assessed
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Main assessment area */}
        <div className="flex-1 min-w-0">
          {/* L1 selector tabs */}
          <div className="flex flex-wrap gap-2 mb-5">
            <button
              onClick={() => setSelectedL1Id(null)}
                className={`px-3.5 py-1.5 rounded-lg text-[15px] font-medium cursor-pointer transition-all border ${
                !selectedL1Id
                  ? "bg-accent text-white border-accent"
                  : "bg-surface border-bd text-tx2 hover:border-bd2"
              }`}
            >
              All components
            </button>
            {selectedLayer.l1_components.map((comp) => (
              <button
                key={comp.id}
                onClick={() => setSelectedL1Id(comp.id)}
                className={`px-3.5 py-1.5 rounded-lg text-[15px] font-medium cursor-pointer transition-all border ${
                  selectedL1Id === comp.id
                    ? "bg-accent text-white border-accent"
                    : "bg-surface border-bd text-tx2 hover:border-bd2"
                }`}
              >
                {comp.name}
              </button>
            ))}
          </div>

          {/* Capability assessment cards */}
          <div className="space-y-3">
            {(selectedL1 ? [selectedL1] : selectedLayer.l1_components).map((comp) => (
              <div key={comp.id}>
                {!selectedL1 && (
                  <h3 className="text-[17px] font-semibold mb-2 mt-4 first:mt-0">{comp.name}</h3>
                )}
                <div className="space-y-2">
                  {comp.l2_capabilities.map((cap) => {
                    const a = assessments[cap.id] || {
                      current: null,
                      target: null,
                      notes: "",
                    };
                    return (
                      <AssessmentCard
                        key={cap.id}
                        cap={cap}
                        assessment={a}
                        onSetStage={onSetStage}
                        onSetNotes={onSetNotes}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AssessmentCard({
  cap,
  assessment,
  onSetStage,
  onSetNotes,
}: {
  cap: import("@/types").L2Capability;
  assessment: AssessmentEntry;
  onSetStage: (capId: string, type: "current" | "target", stage: number) => void;
  onSetNotes: (capId: string, notes: string) => void;
}) {
  const [showNotes, setShowNotes] = useState(false);
  const stages = [1, 2, 3, 4];

  return (
    <div className="bg-surface border border-bd rounded-xl p-5 transition-all hover:border-bd2">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <div className="text-[16px] font-medium">{cap.name}</div>
          <div className="text-[14px] text-tx3 mt-0.5 line-clamp-1">{cap.description}</div>
        </div>
        <button
          onClick={() => setShowNotes(!showNotes)}
          className="text-[13px] text-tx3 hover:text-accent cursor-pointer flex-shrink-0 transition-colors"
        >
          {showNotes ? "Hide notes" : "Notes"}
        </button>
      </div>

      {/* Stage selectors */}
      <div className="grid grid-cols-2 gap-4">
        <StageSelector
          label="Current state"
          selected={assessment.current}
          onChange={(s) => onSetStage(cap.id, "current", s)}
          stages={stages}
        />
        <StageSelector
          label="Target state"
          selected={assessment.target}
          onChange={(s) => onSetStage(cap.id, "target", s)}
          stages={stages}
          isTarget
        />
      </div>

      {/* Visual gap indicator */}
      {assessment.current !== null && assessment.target !== null && (
        <div className="mt-3 flex items-center gap-2">
          <div className="flex-1 h-1.5 rounded-full bg-bg3 overflow-hidden relative">
            <div
              className="absolute h-full bg-tx3/30 rounded-full"
              style={{
                left: `${((assessment.current - 1) / 3) * 100}%`,
                width: `${(Math.abs(assessment.target - assessment.current) / 3) * 100}%`,
              }}
            />
            <div
              className="absolute h-full w-2 rounded-full bg-tx3"
              style={{ left: `${((assessment.current - 1) / 3) * 100}%` }}
            />
            <div
              className="absolute h-full w-2 rounded-full bg-accent"
              style={{ left: `${((assessment.target - 1) / 3) * 100}%` }}
            />
          </div>
          <span className="text-[11px] text-tx3 flex-shrink-0">
            {assessment.target - assessment.current > 0 ? "+" : ""}
            {assessment.target - assessment.current} stage{Math.abs(assessment.target - assessment.current) !== 1 ? "s" : ""}
          </span>
        </div>
      )}

      {/* Notes */}
      {showNotes && (
        <div className="mt-3 animate-fade-in">
          <textarea
            value={assessment.notes}
            onChange={(e) => onSetNotes(cap.id, e.target.value)}
            placeholder="Add notes about this capability..."
            className="w-full text-[13px] bg-bg2 border border-bd rounded-lg px-3 py-2 resize-none h-20 focus:outline-none focus:border-accent/30 transition-colors"
          />
        </div>
      )}
    </div>
  );
}

function StageSelector({
  label,
  selected,
  onChange,
  stages,
  isTarget,
}: {
  label: string;
  selected: number | null;
  onChange: (s: number) => void;
  stages: number[];
  isTarget?: boolean;
}) {
  return (
    <div>
      <div className="text-[11px] text-tx3 mb-1.5 font-medium uppercase tracking-wide">
        {label}
      </div>
      <div className="flex gap-1.5">
        {stages.map((s) => {
          const isSelected = selected === s;
          return (
            <button
              key={s}
              onClick={() => onChange(s)}
              className={`flex-1 py-1.5 rounded-lg text-[14px] font-medium cursor-pointer transition-all border ${
                isSelected
                  ? isTarget
                    ? "bg-accent text-white border-accent"
                    : "bg-tx text-bg border-tx"
                  : "bg-surface border-bd text-tx3 hover:border-bd2 hover:text-tx2"
              }`}
              title={STAGE_NAMES[s]}
            >
              {s}
            </button>
          );
        })}
      </div>
    </div>
  );
}
