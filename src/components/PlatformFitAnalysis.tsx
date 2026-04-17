"use client";

import { useState, useMemo } from "react";
import { BlueprintData } from "@/types";
import { VENDORS, LAYER_COLORS, LAYER_NAMES } from "@/lib/constants";

interface Props {
  data: BlueprintData;
  onNavigate?: (capId: string) => void;
}

const MAIN_VENDORS = VENDORS.filter((v) => !v.overlay);

const RATING_RANK: Record<string, number> = {
  strong: 3,
  partial: 2,
  gap: 1,
};

function bestRating(ratings: string[]): "strong" | "partial" | "gap" | null {
  if (ratings.length === 0) return null;
  let best = 0;
  for (const r of ratings) {
    best = Math.max(best, RATING_RANK[r] || 0);
  }
  if (best === 3) return "strong";
  if (best === 2) return "partial";
  return "gap";
}

interface CapRef {
  id: string;
  name: string;
}

interface LayerGroup {
  layerId: string;
  layerName: string;
  capabilities: CapRef[];
}

function CollapsibleLayerGroup({
  group,
  onNavigate,
}: {
  group: LayerGroup;
  onNavigate?: (capId: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div
        className="flex items-center gap-1 cursor-pointer select-none"
        onClick={() => setOpen(!open)}
      >
        <span
          className={`text-[9px] text-tx3 transition-transform ${open ? "rotate-90" : ""}`}
        >
          &#9654;
        </span>
        <span
          className="text-[10px] font-medium"
          style={{ color: LAYER_COLORS[group.layerId] || "#888" }}
        >
          {group.layerName} ({group.capabilities.length})
        </span>
      </div>
      {open && (
        <div className="space-y-px mt-0.5 ml-3">
          {group.capabilities.map((cap) => (
            <div
              key={cap.id}
              className="flex items-baseline gap-1.5 py-0.5 px-2"
            >
              <span className="text-[9px] text-tx3 font-mono shrink-0">
                {cap.id}
              </span>
              <button
                className="text-[10px] text-tx2 hover:text-tx hover:underline cursor-pointer text-left bg-transparent border-none p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate?.(cap.id);
                }}
              >
                {cap.name}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function PlatformFitAnalysis({ data, onNavigate }: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggleVendor = (key: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const analysis = useMemo(() => {
    if (selected.size === 0) return null;

    let strong = 0;
    let partial = 0;
    let gap = 0;
    let total = 0;
    const gaps: LayerGroup[] = [];
    const partials: LayerGroup[] = [];

    for (const layer of data.layers) {
      const layerGaps: CapRef[] = [];
      const layerPartials: CapRef[] = [];

      for (const comp of layer.l1_components) {
        for (const cap of comp.l2_capabilities) {
          total++;
          const ratings: string[] = [];
          for (const vKey of selected) {
            const cov = cap.platform_coverage?.[vKey];
            if (cov) ratings.push(cov.rating);
          }

          const combined = bestRating(ratings);
          if (combined === "strong") {
            strong++;
          } else if (combined === "partial") {
            partial++;
            layerPartials.push({ id: cap.id, name: cap.name });
          } else {
            gap++;
            layerGaps.push({ id: cap.id, name: cap.name });
          }
        }
      }

      const layerName = LAYER_NAMES[layer.id] || layer.name;
      if (layerGaps.length > 0) {
        gaps.push({ layerId: layer.id, layerName, capabilities: layerGaps });
      }
      if (layerPartials.length > 0) {
        partials.push({
          layerId: layer.id,
          layerName,
          capabilities: layerPartials,
        });
      }
    }

    const addressed = strong + partial;
    const pctAddressed =
      total > 0 ? Math.round((addressed / total) * 100) : 0;

    return {
      strong,
      partial,
      gap,
      total,
      addressed,
      pctAddressed,
      gaps,
      partials,
    };
  }, [data, selected]);

  return (
    <div className="mb-2 border border-bd rounded-lg overflow-hidden">
      <div
        className="py-2.5 px-3.5 cursor-pointer flex items-center gap-2 select-none bg-bg2"
        onClick={() => setOpen(!open)}
      >
        <span
          className={`text-[10px] text-tx3 transition-transform ${open ? "rotate-90" : ""}`}
        >
          &#9654;
        </span>
        <span className="text-xs font-medium text-tx flex-1">
          Platform fit analysis
        </span>
        <span className="text-[10px] text-tx3">
          Does our current stack cover what we need?
        </span>
      </div>
      {open && (
        <div className="py-3 px-3.5">
          <div className="flex gap-3 mb-3 flex-wrap">
            {MAIN_VENDORS.map((v) => (
              <label
                key={v.key}
                className="flex items-center gap-1.5 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={selected.has(v.key)}
                  onChange={() => toggleVendor(v.key)}
                  className="w-3.5 h-3.5 rounded accent-[#0F6E56]"
                />
                <span className="text-[11px] font-medium">{v.name}</span>
              </label>
            ))}
          </div>

          {analysis && (
            <>
              {/* Stacked bar */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex h-2 rounded-full overflow-hidden flex-1 max-w-[400px]">
                  <div
                    className="bg-cov-strong-dot"
                    style={{
                      width: `${(analysis.strong / Math.max(analysis.total, 1)) * 100}%`,
                    }}
                  />
                  <div
                    className="bg-cov-partial-dot"
                    style={{
                      width: `${(analysis.partial / Math.max(analysis.total, 1)) * 100}%`,
                    }}
                  />
                  <div
                    className="bg-cov-gap-dot"
                    style={{
                      width: `${(analysis.gap / Math.max(analysis.total, 1)) * 100}%`,
                    }}
                  />
                </div>
                <div className="text-[11px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cov-strong-dot" />
                  <span className="font-medium">{analysis.strong}</span>
                  <span className="text-tx3">strong</span>
                </div>
                <div className="text-[11px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cov-partial-dot" />
                  <span className="font-medium">{analysis.partial}</span>
                  <span className="text-tx3">partial</span>
                </div>
                <div className="text-[11px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cov-gap-dot" />
                  <span className="font-medium">{analysis.gap}</span>
                  <span className="text-tx3">gap</span>
                </div>
              </div>

              {/* Summary text */}
              <p className="text-[11px] text-tx2 leading-relaxed mb-3">
                Combined coverage addresses{" "}
                <span className="font-medium text-tx">
                  {analysis.pctAddressed}%
                </span>{" "}
                of capabilities (
                <span className="font-medium text-tx">
                  {analysis.strong}
                </span>{" "}
                at production strength).{" "}
                <span className="font-medium text-tx">
                  {analysis.partial}
                </span>{" "}
                require deeper evaluation.{" "}
                <span className="font-medium text-tx">{analysis.gap}</span>{" "}
                capabilities require additional solutions.
              </p>

              {/* Two-column: Gaps + Partials */}
              {(analysis.gaps.length > 0 || analysis.partials.length > 0) && (
                <div className="border-t border-bd pt-2 grid grid-cols-2 gap-4">
                  {/* Gap column */}
                  <div>
                    <div className="text-[11px] font-medium mb-1.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cov-gap-dot" />
                      Gap capabilities ({analysis.gap})
                    </div>
                    {analysis.gaps.length > 0 ? (
                      <div className="max-h-[280px] overflow-y-auto space-y-1.5">
                        {analysis.gaps.map((group) => (
                          <CollapsibleLayerGroup
                            key={group.layerId}
                            group={group}
                            onNavigate={onNavigate}
                          />
                        ))}
                      </div>
                    ) : (
                      <p className="text-[10px] text-tx3 italic">
                        No gaps with selected platforms.
                      </p>
                    )}
                  </div>

                  {/* Partial column */}
                  <div>
                    <div className="text-[11px] font-medium mb-1.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cov-partial-dot" />
                      Partial capabilities ({analysis.partial})
                    </div>
                    {analysis.partials.length > 0 ? (
                      <div className="max-h-[280px] overflow-y-auto space-y-1.5">
                        {analysis.partials.map((group) => (
                          <CollapsibleLayerGroup
                            key={group.layerId}
                            group={group}
                            onNavigate={onNavigate}
                          />
                        ))}
                      </div>
                    ) : (
                      <p className="text-[10px] text-tx3 italic">
                        No partial capabilities with selected platforms.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {!analysis && (
            <p className="text-[11px] text-tx3 italic">
              Select one or more platforms above to see combined coverage
              analysis.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
