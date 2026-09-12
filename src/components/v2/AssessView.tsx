"use client";

import { useState, useMemo } from "react";
import { BlueprintData, Layer, L1Component, Assessments, AssessmentEntry } from "@/types";
import { STAGE_NAMES } from "@/lib/constants";

const PWC_ORANGE = "#C74E23";
const INACTIVE_BAR = "#D4CFC6";

interface Props {
  data: BlueprintData;
  assessments: Assessments;
  onSetStage: (capId: string, type: "current" | "target", stage: number) => void;
  onSetNotes: (capId: string, notes: string) => void;
  prioritizedCapIds: Set<string>;
}

export default function AssessView({ data, assessments, onSetStage, onSetNotes, prioritizedCapIds }: Props) {
  const [selectedLayerId, setSelectedLayerId] = useState<string>(data.layers[0].id);
  const [selectedL1Id, setSelectedL1Id] = useState<string | null>(null);
  const [showScorecard, setShowScorecard] = useState(false);

  const hasPrioritized = prioritizedCapIds.size > 0;

  const selectedLayer = data.layers.find((l) => l.id === selectedLayerId)!;

  // Filter layers/components based on prioritization
  const filteredLayers = useMemo(() => {
    if (!hasPrioritized) return data.layers;
    return data.layers
      .map((layer) => ({
        ...layer,
        l1_components: layer.l1_components
          .map((comp) => ({
            ...comp,
            l2_capabilities: comp.l2_capabilities.filter((cap) => prioritizedCapIds.has(cap.id)),
          }))
          .filter((comp) => comp.l2_capabilities.length > 0),
      }))
      .filter((layer) => layer.l1_components.length > 0);
  }, [data, prioritizedCapIds, hasPrioritized]);

  // Count assessed capabilities (only within prioritized scope)
  const scopeCapIds = useMemo(() => {
    if (!hasPrioritized) {
      const ids = new Set<string>();
      data.layers.forEach((l) => l.l1_components.forEach((c) => c.l2_capabilities.forEach((cap) => ids.add(cap.id))));
      return ids;
    }
    return prioritizedCapIds;
  }, [data, prioritizedCapIds, hasPrioritized]);

  const assessedCount = [...scopeCapIds].filter((id) => {
    const a = assessments[id];
    return a && (a.current !== null || a.target !== null);
  }).length;
  const totalCaps = scopeCapIds.size;

  // Scorecard summary data
  const scorecardSummary = useMemo(() => {
    let assessed = 0;
    let currentSum = 0;
    let targetSum = 0;
    let maxGap = 0;

    scopeCapIds.forEach((capId) => {
      const a = assessments[capId];
      if (a && a.current !== null && a.target !== null) {
        assessed++;
        currentSum += a.current;
        targetSum += a.target;
        const gap = a.target - a.current;
        if (gap > maxGap) maxGap = gap;
      }
    });

    return {
      assessed,
      total: totalCaps,
      avgCurrent: assessed > 0 ? currentSum / assessed : 0,
      avgTarget: assessed > 0 ? targetSum / assessed : 0,
      avgGap: assessed > 0 ? (targetSum - currentSum) / assessed : 0,
      maxGap,
    };
  }, [assessments, scopeCapIds, totalCaps]);

  // Ensure selectedLayerId is valid for filtered layers
  const activeLayerId = filteredLayers.find((l) => l.id === selectedLayerId)
    ? selectedLayerId
    : filteredLayers[0]?.id || data.layers[0].id;

  const activeLayer = filteredLayers.find((l) => l.id === activeLayerId) || filteredLayers[0];

  const selectLayer = (id: string) => {
    setSelectedLayerId(id);
    setSelectedL1Id(null);
  };

  const selectedL1 = selectedL1Id
    ? activeLayer?.l1_components.find((c) => c.id === selectedL1Id)
    : null;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-[26px] font-semibold tracking-tight mb-2" style={{ fontFamily: "var(--font-source-serif), 'Source Serif 4', Georgia, serif" }}>Maturity Assessment</h2>
        <p className="text-[16px] text-tx2 mb-4">
          {hasPrioritized
            ? `Assessing ${totalCaps} prioritized capabilities. Rate current and target maturity.`
            : "Rate current and target maturity for each capability."}
        </p>

        {/* Scorecard summary (collapsible) */}
        {scorecardSummary.assessed > 0 && (
          <div className="mb-4">
            <button
              onClick={() => setShowScorecard(!showScorecard)}
              className="flex items-center gap-2 text-[14px] font-medium text-tx3 hover:text-tx2 transition-colors cursor-pointer mb-3"
            >
              <span
                className="text-[10px] transition-transform duration-200 inline-block"
                style={{ transform: showScorecard ? "rotate(90deg)" : "none" }}
              >
                ▶
              </span>
              Assessment Summary
            </button>

            {showScorecard && (
              <div className="grid grid-cols-4 gap-3 mb-4 animate-fade-in">
                <ScorecardCard
                  label="Assessed"
                  value={`${scorecardSummary.assessed}/${scorecardSummary.total}`}
                  detail={`${Math.round((scorecardSummary.assessed / scorecardSummary.total) * 100)}% complete`}
                />
                <ScorecardCard
                  label="Avg. Current"
                  value={scorecardSummary.avgCurrent.toFixed(1)}
                  detail={STAGE_NAMES[Math.round(scorecardSummary.avgCurrent)] || "—"}
                />
                <ScorecardCard
                  label="Avg. Target"
                  value={scorecardSummary.avgTarget.toFixed(1)}
                  detail={STAGE_NAMES[Math.round(scorecardSummary.avgTarget)] || "—"}
                  valueColor="var(--color-accent)"
                />
                <ScorecardCard
                  label="Avg. Gap"
                  value={`+${scorecardSummary.avgGap.toFixed(1)}`}
                  detail={`Max gap: +${scorecardSummary.maxGap}`}
                  valueColor="var(--color-cov-partial)"
                />
              </div>
            )}
          </div>
        )}

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
              style={{ width: `${totalCaps > 0 ? (assessedCount / totalCaps) * 100 : 0}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-5 items-start">
        {/* Layer/L1 picker sidebar */}
        <aside className="w-[240px] flex-shrink-0 sticky top-[52px]">
          <div className="space-y-1">
            {filteredLayers.map((layer) => {
              const isActive = layer.id === activeLayerId;
              const barColor = isActive ? PWC_ORANGE : INACTIVE_BAR;
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
                    className="w-[3px] h-8 rounded-full flex-shrink-0 transition-all duration-200"
                    style={{ background: barColor, opacity: isActive ? 1 : 0.6 }}
                  />
                  <div className="flex-1 min-w-0">
                    <div
                      className={`text-[15px] font-semibold ${isActive ? "text-tx" : "text-tx2"}`}
                      style={{ fontFamily: "var(--font-source-serif), 'Source Serif 4', Georgia, serif" }}
                    >
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
            {activeLayer?.l1_components.map((comp) => (
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
            {(selectedL1 ? [selectedL1] : activeLayer?.l1_components || []).map((comp) => (
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
  const [showGuide, setShowGuide] = useState(false);
  const stages = [1, 2, 3, 4];

  return (
    <div className="bg-surface border border-bd rounded-xl p-5 transition-all hover:border-bd2">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <div className="text-[16px] font-medium">{cap.name}</div>
          <div className="text-[14px] text-tx3 mt-0.5 line-clamp-1">{cap.description}</div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={() => setShowGuide(!showGuide)}
            className="text-[13px] text-tx3 hover:text-accent cursor-pointer transition-colors"
          >
            {showGuide ? "Hide maturity stages" : "View maturity stages"}
          </button>
          <button
            onClick={() => setShowNotes(!showNotes)}
            className="text-[13px] text-tx3 hover:text-accent cursor-pointer transition-colors"
          >
            {showNotes ? "Hide notes" : "Notes"}
          </button>
        </div>
      </div>

      {/* Expandable maturity guide */}
      {showGuide && (
        <div className="grid grid-cols-2 gap-2 mb-4 animate-fade-in">
          {stages.map((num) => {
            const key = `stage_${num}` as keyof typeof cap.maturity_indicators;
            const text = cap.maturity_indicators[key];
            const isCurrent = assessment.current === num;
            const isTarget = assessment.target === num;

            let cardStyle = "border-[#E9C4B4] bg-[#FBEDE6]";
            let badgeStyle = "bg-[#E9C4B4]/40 text-[#C74E23]";
            let titleStyle = "text-[#1C1A17]";
            let label = "";

            if (isCurrent) {
              cardStyle = "border-[#14110F]/20 bg-[#14110F]";
              badgeStyle = "bg-white/20 text-white";
              titleStyle = "text-[#F2EEE8]";
              label = "(Current)";
            } else if (isTarget) {
              cardStyle = "border-[#C74E23]/30 bg-[#C74E23]";
              badgeStyle = "bg-white/20 text-white";
              titleStyle = "text-white";
              label = "(Target)";
            }

            return (
              <div
                key={num}
                className={`rounded-lg px-4 py-3 border transition-all ${cardStyle}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[12px] font-bold w-5 h-5 rounded-full flex items-center justify-center ${badgeStyle}`}>
                    {num}
                  </span>
                  <span className={`text-[13px] font-semibold ${titleStyle}`}>
                    {STAGE_NAMES[num]}
                    {label && <span className="ml-1.5">{label}</span>}
                  </span>
                </div>
                <p className={`text-[12px] leading-relaxed pl-7 ${isCurrent ? "text-[#B0A99E]" : isTarget ? "text-white/80" : "text-[#6B6560]"}`}>{text}</p>
              </div>
            );
          })}
        </div>
      )}

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

function ScorecardCard({
  label,
  value,
  detail,
  valueColor,
}: {
  label: string;
  value: string;
  detail: string;
  valueColor?: string;
}) {
  return (
    <div className="bg-surface border border-bd rounded-xl p-5">
      <div className="text-[13px] text-tx3 font-medium uppercase tracking-wide mb-2">
        {label}
      </div>
      <div className="text-[32px] font-bold" style={{ color: valueColor }}>
        {value}
      </div>
      <div className="text-[14px] text-tx3 mt-1">{detail}</div>
    </div>
  );
}
