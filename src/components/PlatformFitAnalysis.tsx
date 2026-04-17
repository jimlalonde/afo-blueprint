"use client";

import { useState, useMemo } from "react";
import { BlueprintData } from "@/types";
import { VENDORS, LAYER_COLORS, LAYER_NAMES } from "@/lib/constants";

interface Props {
  data: BlueprintData;
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

interface GapCapability {
  id: string;
  name: string;
}

interface GapGroup {
  layerId: string;
  layerName: string;
  capabilities: GapCapability[];
}

export default function PlatformFitAnalysis({ data }: Props) {
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
    const gaps: GapGroup[] = [];

    for (const layer of data.layers) {
      const layerGaps: GapCapability[] = [];

      for (const comp of layer.l1_components) {
        for (const cap of comp.l2_capabilities) {
          total++;
          const ratings: string[] = [];
          for (const vKey of selected) {
            const cov = cap.platform_coverage?.[vKey];
            if (cov) ratings.push(cov.rating);
          }

          const combined = bestRating(ratings);
          if (combined === "strong") strong++;
          else if (combined === "partial") partial++;
          else {
            gap++;
            layerGaps.push({ id: cap.id, name: cap.name });
          }
        }
      }

      if (layerGaps.length > 0) {
        gaps.push({
          layerId: layer.id,
          layerName: LAYER_NAMES[layer.id] || layer.name,
          capabilities: layerGaps,
        });
      }
    }

    const addressed = strong + partial;
    const pctAddressed = total > 0 ? Math.round((addressed / total) * 100) : 0;

    return { strong, partial, gap, total, addressed, pctAddressed, gaps };
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
                <span className="font-medium text-tx">{analysis.strong}</span>{" "}
                at production strength).{" "}
                <span className="font-medium text-tx">{analysis.gap}</span>{" "}
                capabilities require additional solutions.
              </p>

              {/* Gap list */}
              {analysis.gaps.length > 0 && (
                <div className="border-t border-bd pt-2">
                  <div className="text-[11px] font-medium mb-1.5">
                    Gap capabilities ({analysis.gap})
                  </div>
                  <div className="max-h-[240px] overflow-y-auto space-y-2">
                    {analysis.gaps.map((group) => (
                      <div key={group.layerId}>
                        <div
                          className="text-[10px] font-medium mb-0.5"
                          style={{
                            color: LAYER_COLORS[group.layerId] || "#888",
                          }}
                        >
                          {group.layerName} ({group.capabilities.length})
                        </div>
                        <div className="space-y-px">
                          {group.capabilities.map((cap) => (
                            <div
                              key={cap.id}
                              className="flex items-baseline gap-1.5 py-0.5 px-2"
                            >
                              <span className="text-[9px] text-tx3 font-mono shrink-0">
                                {cap.id}
                              </span>
                              <span className="text-[10px] text-tx2">
                                {cap.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
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
