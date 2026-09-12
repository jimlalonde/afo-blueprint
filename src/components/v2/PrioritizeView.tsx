"use client";

import { useState, useMemo } from "react";
import { BlueprintData, Layer, L1Component, L2Capability } from "@/types";
import { USE_CASE_TEMPLATES } from "@/lib/use-case-templates";
import { matchKeywords, KEYWORD_SUGGESTIONS } from "@/lib/keyword-map";

const PWC_EMBER = "#C74E23";

type EntryMode = "usecase" | "manual" | "describe" | null;

interface Props {
  data: BlueprintData;
  prioritizedCapIds: Set<string>;
  onSetPrioritizedCapIds: (ids: Set<string>) => void;
  onBeginAssessment: () => void;
}

export default function PrioritizeView({
  data,
  prioritizedCapIds,
  onSetPrioritizedCapIds,
  onBeginAssessment,
}: Props) {
  const [entryMode, setEntryMode] = useState<EntryMode>(null);
  const [selectedUseCaseIds, setSelectedUseCaseIds] = useState<Set<string>>(new Set());
  const [searchText, setSearchText] = useState("");
  const [expandedLayer, setExpandedLayer] = useState<string | null>(null);
  const [expandedL1, setExpandedL1] = useState<string | null>(null);

  // All capability IDs for reference
  const allCapIds = useMemo(() => {
    const ids = new Set<string>();
    data.layers.forEach((l) =>
      l.l1_components.forEach((c) =>
        c.l2_capabilities.forEach((cap) => ids.add(cap.id))
      )
    );
    return ids;
  }, [data]);

  // Keyword match results
  const keywordMatchIds = useMemo(() => {
    if (!searchText || searchText.length < 2) return [];
    return matchKeywords(searchText);
  }, [searchText]);

  // Determine which layers are touched by the current selection
  const selectedLayerInfo = useMemo(() => {
    const info: { layer: Layer; count: number; total: number }[] = [];
    data.layers.forEach((layer) => {
      let count = 0;
      let total = 0;
      layer.l1_components.forEach((c) =>
        c.l2_capabilities.forEach((cap) => {
          total++;
          if (prioritizedCapIds.has(cap.id)) count++;
        })
      );
      if (count > 0) info.push({ layer, count, total });
    });
    return info;
  }, [data, prioritizedCapIds]);

  // ── Handlers ──

  const handleToggleUseCase = (id: string) => {
    const next = new Set(selectedUseCaseIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedUseCaseIds(next);

    // Union all capability IDs from selected templates
    const merged = new Set<string>();
    next.forEach((ucId) => {
      const template = USE_CASE_TEMPLATES.find((t) => t.id === ucId);
      if (template) {
        template.capabilityIds.forEach((cid) => {
          if (allCapIds.has(cid)) merged.add(cid);
        });
      }
    });
    onSetPrioritizedCapIds(merged);
  };

  const handleApplyKeywordMatch = () => {
    onSetPrioritizedCapIds(new Set(keywordMatchIds.filter((cid) => allCapIds.has(cid))));
  };

  const toggleAllInLayer = (layer: Layer) => {
    const layerIds = layer.l1_components.flatMap((c) => c.l2_capabilities.map((cap) => cap.id));
    const allChecked = layerIds.every((id) => prioritizedCapIds.has(id));
    const next = new Set(prioritizedCapIds);
    layerIds.forEach((id) => (allChecked ? next.delete(id) : next.add(id)));
    onSetPrioritizedCapIds(next);
  };

  const toggleAllInL1 = (comp: L1Component) => {
    const compIds = comp.l2_capabilities.map((cap) => cap.id);
    const allChecked = compIds.every((id) => prioritizedCapIds.has(id));
    const next = new Set(prioritizedCapIds);
    compIds.forEach((id) => (allChecked ? next.delete(id) : next.add(id)));
    onSetPrioritizedCapIds(next);
  };

  const toggleCap = (capId: string) => {
    const next = new Set(prioritizedCapIds);
    if (next.has(capId)) next.delete(capId);
    else next.add(capId);
    onSetPrioritizedCapIds(next);
  };

  const clearAll = () => {
    onSetPrioritizedCapIds(new Set());
    setSelectedUseCaseIds(new Set());
    setSearchText("");
  };

  const totalCaps = allCapIds.size;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h2
          className="text-[26px] font-semibold tracking-tight mb-2"
          style={{ fontFamily: "var(--font-source-serif), 'Source Serif 4', Georgia, serif" }}
        >
          Focus Your Assessment
        </h2>
        <p className="text-[16px] text-tx2">
          {totalCaps} capabilities is a lot. Pick a starting point to narrow down to what matters most.
        </p>
      </div>

      {/* Three entry point cards */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <EntryCard
          active={entryMode === "usecase"}
          onClick={() => setEntryMode(entryMode === "usecase" ? null : "usecase")}
          title="Start from a Use Case"
          subtitle="Pre-built templates for common transformation goals"
          icon={
            <svg width={22} height={22} viewBox="0 0 20 20" fill="none">
              <path
                d="M4 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4zm1 4h10v2H5V6zm0 4h7v2H5v-2z"
                fill="currentColor"
              />
            </svg>
          }
        />
        <EntryCard
          active={entryMode === "manual"}
          onClick={() => setEntryMode(entryMode === "manual" ? null : "manual")}
          title="Pick by Layer"
          subtitle="Choose specific layers, components, or capabilities"
          icon={
            <svg width={22} height={22} viewBox="0 0 20 20" fill="none">
              <path d="M3 3h18v2H3V3zm0 4h18v2H3V7zm0 4h12v2H3v-2zm0 4h8v2H3v-2z" fill="currentColor" />
            </svg>
          }
        />
        <EntryCard
          active={entryMode === "describe"}
          onClick={() => setEntryMode(entryMode === "describe" ? null : "describe")}
          title="Describe Your Focus"
          subtitle="Tell us what you're trying to achieve in plain language"
          icon={
            <svg width={22} height={22} viewBox="0 0 20 20" fill="none">
              <path
                d="M10 2a8 8 0 1 0 5.29 14.71l3 3a1 1 0 0 0 1.42-1.42l-3-3A8 8 0 0 0 10 2zm0 2a6 6 0 1 1 0 12 6 6 0 0 1 0-12z"
                fill="currentColor"
              />
            </svg>
          }
        />
      </div>

      {/* Entry mode panels */}
      {entryMode === "usecase" && (
        <UseCasePanel
          selectedIds={selectedUseCaseIds}
          allCapIds={allCapIds}
          onToggle={handleToggleUseCase}
        />
      )}

      {entryMode === "manual" && (
        <ManualPickerPanel
          data={data}
          prioritizedCapIds={prioritizedCapIds}
          expandedLayer={expandedLayer}
          expandedL1={expandedL1}
          onExpandLayer={(id) => setExpandedLayer(expandedLayer === id ? null : id)}
          onExpandL1={(id) => setExpandedL1(expandedL1 === id ? null : id)}
          onToggleLayer={toggleAllInLayer}
          onToggleL1={toggleAllInL1}
          onToggleCap={toggleCap}
        />
      )}

      {entryMode === "describe" && (
        <DescribeFocusPanel
          searchText={searchText}
          onSearchChange={setSearchText}
          keywordMatchIds={keywordMatchIds}
          onApply={handleApplyKeywordMatch}
        />
      )}

      {/* Selection summary */}
      {prioritizedCapIds.size > 0 && (
        <div className="mt-8 border-t border-bd pt-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[20px] font-bold">
                {prioritizedCapIds.size} capabilities selected
              </div>
              <div className="text-[14px] text-tx3 mt-1">
                across {selectedLayerInfo.length} layers
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={clearAll}
                className="text-[14px] text-tx3 hover:text-tx2 cursor-pointer transition-colors"
              >
                Clear all
              </button>
              <button
                onClick={onBeginAssessment}
                className="px-5 py-2.5 rounded-lg text-[15px] font-semibold text-white cursor-pointer transition-all hover:opacity-90"
                style={{ background: PWC_EMBER }}
              >
                Begin Assessment
              </button>
            </div>
          </div>

          {/* Layer pills */}
          <div className="flex flex-wrap gap-2">
            {selectedLayerInfo.map(({ layer, count, total }) => (
              <span
                key={layer.id}
                className="px-3 py-1.5 rounded-lg text-[13px] font-medium bg-accent-light text-accent border border-accent/20"
              >
                {layer.name} ({count}/{total})
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Entry Card ──

function EntryCard({
  active,
  onClick,
  title,
  subtitle,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-left rounded-xl p-5 border cursor-pointer transition-all duration-200 ${
        active
          ? "border-accent bg-accent-light border-l-[3px] border-l-accent"
          : "border-bd bg-surface hover:border-bd2"
      }`}
    >
      <div className={`mb-3 ${active ? "text-accent" : "text-tx3"}`}>{icon}</div>
      <div
        className={`text-[15px] font-semibold mb-1 ${active ? "text-accent" : "text-tx"}`}
        style={{ fontFamily: "var(--font-source-serif), 'Source Serif 4', Georgia, serif" }}
      >
        {title}
      </div>
      <div className="text-[13px] text-tx2 leading-snug">{subtitle}</div>
    </button>
  );
}

// ── Use Case Panel ──

function UseCasePanel({
  selectedIds,
  allCapIds,
  onToggle,
}: {
  selectedIds: Set<string>;
  allCapIds: Set<string>;
  onToggle: (id: string) => void;
}) {
  return (
    <div className="animate-fade-in">
      <h3
        className="text-[18px] font-semibold mb-2"
        style={{ fontFamily: "var(--font-source-serif), 'Source Serif 4', Georgia, serif" }}
      >
        Choose one or more use cases
      </h3>
      <p className="text-[14px] text-tx3 mb-4">
        Select multiple templates to combine their capabilities into a single assessment scope.
      </p>

      <div className="grid grid-cols-2 gap-3">
        {USE_CASE_TEMPLATES.map((uc) => {
          const isSelected = selectedIds.has(uc.id);
          const validCount = uc.capabilityIds.filter((id) => allCapIds.has(id)).length;

          return (
            <button
              key={uc.id}
              onClick={() => onToggle(uc.id)}
              className={`text-left rounded-xl px-5 py-4 border cursor-pointer transition-all duration-200 ${
                isSelected
                  ? "border-accent bg-accent-light"
                  : "border-bd bg-surface hover:border-bd2"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`text-[15px] font-semibold ${isSelected ? "text-accent" : "text-tx"}`}
                >
                  {uc.name}
                </span>
                <span className="text-[12px] font-semibold text-tx3 bg-bg3 px-2 py-0.5 rounded-full">
                  {validCount} caps
                </span>
              </div>
              <div className="text-[13px] text-tx3 leading-snug">{uc.description}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Manual Picker Panel ──

function ManualPickerPanel({
  data,
  prioritizedCapIds,
  expandedLayer,
  expandedL1,
  onExpandLayer,
  onExpandL1,
  onToggleLayer,
  onToggleL1,
  onToggleCap,
}: {
  data: BlueprintData;
  prioritizedCapIds: Set<string>;
  expandedLayer: string | null;
  expandedL1: string | null;
  onExpandLayer: (id: string) => void;
  onExpandL1: (id: string) => void;
  onToggleLayer: (layer: Layer) => void;
  onToggleL1: (comp: L1Component) => void;
  onToggleCap: (capId: string) => void;
}) {
  const totalSelected = prioritizedCapIds.size;

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3
          className="text-[18px] font-semibold"
          style={{ fontFamily: "var(--font-source-serif), 'Source Serif 4', Georgia, serif" }}
        >
          Select layers, components, or capabilities
        </h3>
        <span className="text-[14px] text-tx3">
          {totalSelected} of {data.metadata.total_l2_capabilities} selected
        </span>
      </div>

      <div className="space-y-1.5">
        {data.layers.map((layer) => {
          const layerIds = layer.l1_components.flatMap((c) => c.l2_capabilities.map((cap) => cap.id));
          const checkedCount = layerIds.filter((id) => prioritizedCapIds.has(id)).length;
          const allChecked = checkedCount === layerIds.length;
          const someChecked = checkedCount > 0 && !allChecked;
          const isExpanded = expandedLayer === layer.id;

          return (
            <div key={layer.id}>
              {/* Layer row */}
              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 ${
                  allChecked
                    ? "border-accent bg-accent-light"
                    : someChecked
                    ? "border-accent/40 bg-accent-light/50"
                    : "border-bd bg-surface hover:border-bd2"
                } ${isExpanded ? "rounded-b-none" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={allChecked}
                  ref={(el) => { if (el) el.indeterminate = someChecked; }}
                  onChange={() => onToggleLayer(layer)}
                  className="w-4 h-4 rounded accent-accent cursor-pointer"
                />
                <div
                  className="flex-1 cursor-pointer"
                  onClick={() => onExpandLayer(layer.id)}
                >
                  <div className="text-[15px] font-semibold">{layer.name}</div>
                  {someChecked && (
                    <div className="text-[12px] text-accent mt-0.5">
                      {checkedCount} of {layerIds.length} selected
                    </div>
                  )}
                </div>
                <span className="text-[12px] text-tx3 bg-bg3 px-2 py-0.5 rounded-full">
                  {layerIds.length} caps
                </span>
                <button
                  onClick={() => onExpandLayer(layer.id)}
                  className={`text-[10px] text-tx3 transition-transform duration-200 cursor-pointer ${
                    isExpanded ? "rotate-90" : ""
                  }`}
                >
                  ▶
                </button>
              </div>

              {/* Expanded L1 components */}
              {isExpanded && (
                <div className="border border-t-0 border-bd rounded-b-xl overflow-hidden">
                  {layer.l1_components.map((comp) => {
                    const compIds = comp.l2_capabilities.map((cap) => cap.id);
                    const compChecked = compIds.filter((id) => prioritizedCapIds.has(id)).length;
                    const compAllChecked = compChecked === compIds.length;
                    const compSomeChecked = compChecked > 0 && !compAllChecked;
                    const isL1Expanded = expandedL1 === comp.id;

                    return (
                      <div key={comp.id}>
                        {/* L1 row */}
                        <div
                          className={`flex items-center gap-3 px-4 py-2.5 pl-9 border-b border-bd last:border-b-0 ${
                            compChecked > 0 ? "bg-accent-light/30" : ""
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={compAllChecked}
                            ref={(el) => { if (el) el.indeterminate = compSomeChecked; }}
                            onChange={() => onToggleL1(comp)}
                            className="w-4 h-4 rounded accent-accent cursor-pointer"
                          />
                          <div
                            className="flex-1 cursor-pointer"
                            onClick={() => onExpandL1(comp.id)}
                          >
                            <div className="text-[14px] font-medium">{comp.name}</div>
                            {compSomeChecked && (
                              <div className="text-[11px] text-accent">
                                {compChecked} of {compIds.length}
                              </div>
                            )}
                          </div>
                          <span className="text-[11px] text-tx3">{compIds.length}</span>
                          <button
                            onClick={() => onExpandL1(comp.id)}
                            className={`text-[9px] text-tx3 transition-transform duration-200 cursor-pointer ${
                              isL1Expanded ? "rotate-90" : ""
                            }`}
                          >
                            ▶
                          </button>
                        </div>

                        {/* L2 capabilities */}
                        {isL1Expanded && comp.l2_capabilities.map((cap) => (
                          <div
                            key={cap.id}
                            className={`flex items-center gap-3 px-4 py-2 pl-14 border-b border-bd last:border-b-0 ${
                              prioritizedCapIds.has(cap.id) ? "bg-accent-light/20" : ""
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={prioritizedCapIds.has(cap.id)}
                              onChange={() => onToggleCap(cap.id)}
                              className="w-3.5 h-3.5 rounded accent-accent cursor-pointer"
                            />
                            <span className="text-[13px] text-tx2">{cap.name}</span>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Describe Focus Panel ──

function DescribeFocusPanel({
  searchText,
  onSearchChange,
  keywordMatchIds,
  onApply,
}: {
  searchText: string;
  onSearchChange: (v: string) => void;
  keywordMatchIds: string[];
  onApply: () => void;
}) {
  return (
    <div className="animate-fade-in">
      <h3
        className="text-[18px] font-semibold mb-2"
        style={{ fontFamily: "var(--font-source-serif), 'Source Serif 4', Georgia, serif" }}
      >
        What are you trying to achieve?
      </h3>
      <p className="text-[14px] text-tx3 mb-4">
        Describe your business goal or area of focus. We&rsquo;ll suggest relevant capabilities to assess.
      </p>

      <input
        type="text"
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="e.g., We want to improve our lead-to-close cycle using AI agents"
        className="w-full text-[15px] bg-bg2 border border-bd rounded-xl px-4 py-3 focus:outline-none focus:border-accent/40 transition-colors mb-4"
      />

      {/* Suggestion chips */}
      <div className="mb-4">
        <div className="text-[12px] font-medium text-tx3 uppercase tracking-wide mb-2">
          Or try a quick topic
        </div>
        <div className="flex flex-wrap gap-2">
          {KEYWORD_SUGGESTIONS.map((term) => (
            <button
              key={term}
              onClick={() => onSearchChange(term)}
              className={`px-3 py-1.5 rounded-full text-[13px] font-medium border cursor-pointer transition-all ${
                searchText === term
                  ? "bg-accent text-white border-accent"
                  : "bg-surface border-bd text-tx2 hover:border-bd2"
              }`}
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Match result */}
      {keywordMatchIds.length > 0 && (
        <div className="bg-surface border border-bd rounded-xl px-5 py-4 flex items-center justify-between">
          <div>
            <div className="text-[15px] font-semibold">
              Found {keywordMatchIds.length} relevant capabilities
            </div>
            <div className="text-[13px] text-tx3 mt-0.5">
              Based on keyword matching against the capability blueprint
            </div>
          </div>
          <button
            onClick={onApply}
            className="px-4 py-2 rounded-lg text-[14px] font-semibold text-white cursor-pointer transition-all hover:opacity-90"
            style={{ background: PWC_EMBER }}
          >
            Apply selection
          </button>
        </div>
      )}
    </div>
  );
}
