"use client";

import { useState, useMemo } from "react";
import { BlueprintData, Layer, L1Component, L2Capability } from "@/types";
import { VENDORS } from "@/lib/constants";

const PWC_ORANGE = "#C74E23";
const PWC_GOLD = "#FFB600";
const PWC_BLACK = "#2D2D2D";
const LAYER_BAR_COLORS = [PWC_ORANGE, PWC_GOLD, PWC_BLACK, PWC_ORANGE, PWC_GOLD, PWC_BLACK, PWC_ORANGE];

interface CapEntry {
  cap: L2Capability;
  l1: L1Component;
  layer: Layer;
}

interface Props {
  data: BlueprintData;
  allCapabilities: CapEntry[];
}

export default function CoverageView({ data, allCapabilities }: Props) {
  const [selectedVendors, setSelectedVendors] = useState<string[]>(["adobe", "salesforce"]);

  const toggleVendor = (key: string) => {
    setSelectedVendors((prev) =>
      prev.includes(key) ? prev.filter((v) => v !== key) : [...prev, key]
    );
  };

  // Compute best-of coverage across selected vendors
  const analysis = useMemo(() => {
    const gaps: CapEntry[] = [];
    const partials: CapEntry[] = [];
    const strong: CapEntry[] = [];

    allCapabilities.forEach((entry) => {
      if (selectedVendors.length === 0) return;
      let best: "gap" | "partial" | "strong" = "gap";
      for (const vk of selectedVendors) {
        const cov = entry.cap.platform_coverage[vk];
        if (cov?.rating === "strong") { best = "strong"; break; }
        if (cov?.rating === "partial") best = "partial";
      }
      if (best === "gap") gaps.push(entry);
      else if (best === "partial") partials.push(entry);
      else strong.push(entry);
    });

    return { gaps, partials, strong };
  }, [allCapabilities, selectedVendors]);

  // Vendor-level summary bars
  const vendorSummaries = useMemo(() => {
    return VENDORS.map((v) => {
      let s = 0, p = 0, g = 0;
      allCapabilities.forEach((entry) => {
        const cov = entry.cap.platform_coverage[v.key];
        if (!cov || cov.rating === "gap") g++;
        else if (cov.rating === "partial") p++;
        else s++;
      });
      const total = allCapabilities.length;
      return {
        ...v,
        strong: s,
        partial: p,
        gap: g,
        strongPct: (s / total) * 100,
        partialPct: (p / total) * 100,
      };
    });
  }, [allCapabilities]);

  const totalCaps = allCapabilities.length;

  return (
    <div className="animate-fade-in">
      {/* Vendor selector */}
      <div className="mb-8">
        <div className="eyebrow mb-3">What We Cover</div>
        <h2 className="text-[26px] font-semibold tracking-tight mb-2" style={{ fontFamily: "var(--font-source-serif), 'Source Serif 4', Georgia, serif" }}>Platform Coverage Analysis</h2>
        <p className="text-[16px] text-tx2 mb-5">
          Select platforms to analyze combined coverage across all {totalCaps} capabilities.
        </p>
        <div className="flex flex-wrap gap-2">
          {VENDORS.map((v) => {
            const isSelected = selectedVendors.includes(v.key);
            return (
              <button
                key={v.key}
                onClick={() => toggleVendor(v.key)}
                className={`px-4 py-2 rounded-full text-[15px] font-medium border cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? "bg-accent text-white border-accent"
                    : "bg-surface border-bd text-tx2 hover:border-bd2"
                }`}
              >
                {v.name}
              </button>
            );
          })}
        </div>
      </div>

      {selectedVendors.length > 0 && (
        <>
          {/* Summary stats */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            <StatCard
              value={analysis.strong.length}
              total={totalCaps}
              label="Strong coverage"
              color="#C74E23"
              bgColor="#FBEDE6"
            />
            <StatCard
              value={analysis.partials.length}
              total={totalCaps}
              label="Partial coverage"
              color="#BA8D00"
              bgColor="#FFF8E0"
            />
            <StatCard
              value={analysis.gaps.length}
              total={totalCaps}
              label="Coverage gaps"
              color="#1C1A17"
              bgColor="#F0EFED"
            />
          </div>

          {/* Gap & partial details */}
          <div className="grid grid-cols-2 gap-6 mb-10">
            <CapabilityList
              title="Coverage Gaps"
              description="Capabilities not covered by selected platforms"
              entries={analysis.gaps}
              accentColor="#1C1A17"
            />
            <CapabilityList
              title="Partial Coverage"
              description="Capabilities with limited platform support"
              entries={analysis.partials}
              accentColor="#BA8D00"
            />
          </div>
        </>
      )}

      {/* Vendor comparison bars */}
      <section>
        <div className="eyebrow mb-3">Benchmarks</div>
        <h3 className="text-[18px] font-semibold mb-4" style={{ fontFamily: "var(--font-source-serif), 'Source Serif 4', Georgia, serif" }}>Vendor Comparison</h3>

        {/* Legend */}
        <div className="flex items-center gap-5 mb-4 text-[12px]">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm" style={{ background: "#C74E23" }} />
            <span className="text-tx2">Strong</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm" style={{ background: "#FFB600" }} />
            <span className="text-tx2">Partial</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm" style={{ background: "#E8E4DD", border: "1.5px solid #1C1A17" }} />
            <span className="text-tx2">Gap</span>
          </span>
        </div>

        <div className="space-y-3">
          {vendorSummaries.map((v) => (
            <div key={v.key} className="bg-surface border border-bd rounded-xl px-5 py-4">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-[16px] font-medium">{v.name}</span>
                </div>
                <div className="flex items-center gap-4 text-[14px] font-medium">
                  <span className="flex items-center gap-1.5" style={{ color: "#C74E23" }}>
                    <span className="w-2 h-2 rounded-full" style={{ background: "#C74E23" }} />
                    {v.strong}
                  </span>
                  <span className="flex items-center gap-1.5" style={{ color: "#BA8D00" }}>
                    <span className="w-2 h-2 rounded-full" style={{ background: "#FFB600" }} />
                    {v.partial}
                  </span>
                  <span className="flex items-center gap-1.5" style={{ color: "#1C1A17" }}>
                    <span className="w-2 h-2 rounded-full" style={{ background: "#E8E4DD", border: "1.5px solid #1C1A17" }} />
                    {v.gap}
                  </span>
                </div>
              </div>
              <div className="flex h-2.5 rounded-full overflow-hidden" style={{ border: "1.5px solid #1C1A17", background: "#E8E4DD" }}>
                <div
                  className="transition-all duration-500"
                  style={{
                    width: `${v.strongPct}%`,
                    background: "#C74E23",
                  }}
                />
                <div
                  className="transition-all duration-500"
                  style={{
                    width: `${v.partialPct}%`,
                    background: "#FFB600",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function StatCard({
  value,
  total,
  label,
  color,
  bgColor,
}: {
  value: number;
  total: number;
  label: string;
  color: string;
  bgColor: string;
}) {
  const pct = Math.round((value / total) * 100);
  return (
    <div className="rounded-xl p-5 border border-bd" style={{ background: bgColor }}>
      <div className="text-[32px] font-bold" style={{ color }}>{value}</div>
      <div className="text-[15px] text-tx2 mt-0.5">{label}</div>
      <div className="text-[14px] text-tx3 mt-1">{pct}% of {total} capabilities</div>
    </div>
  );
}

function CapabilityList({
  title,
  description,
  entries,
  accentColor,
}: {
  title: string;
  description: string;
  entries: CapEntry[];
  accentColor: string;
}) {
  const [expandedLayers, setExpandedLayers] = useState<Set<string>>(new Set());

  // Group by layer
  const grouped = entries.reduce((acc, e) => {
    if (!acc[e.layer.id]) acc[e.layer.id] = { layer: e.layer, caps: [] };
    acc[e.layer.id].caps.push(e);
    return acc;
  }, {} as Record<string, { layer: Layer; caps: CapEntry[] }>);

  const toggleLayer = (id: string) => {
    setExpandedLayers((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div>
      <h4 className="text-[17px] font-semibold mb-1">{title}</h4>
      <p className="text-[14px] text-tx3 mb-3">{description}</p>

      {entries.length === 0 ? (
        <div className="text-[13px] text-tx3 italic py-4">No items</div>
      ) : (
        <div className="space-y-1.5">
          {Object.values(grouped).map(({ layer, caps }) => {
            const isExpanded = expandedLayers.has(layer.id);
            const layerIndex = Object.keys(grouped).indexOf(layer.id);
            const color = LAYER_BAR_COLORS[layerIndex % LAYER_BAR_COLORS.length];

            return (
              <div key={layer.id} className="border border-bd rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleLayer(layer.id)}
                  className="w-full text-left px-4 py-2.5 flex items-center gap-2 cursor-pointer hover:bg-bg2 transition-colors"
                >
                  <div
                    className="w-[3px] h-4 rounded-full flex-shrink-0"
                    style={{ background: color }}
                  />
                  <span className="text-[15px] font-medium flex-1">{layer.name}</span>
                  <span className="text-[14px] font-medium" style={{ color: accentColor }}>
                    {caps.length}
                  </span>
                  <span className={`text-[10px] text-tx3 transition-transform ${isExpanded ? "rotate-90" : ""}`}>
                    ▶
                  </span>
                </button>
                {isExpanded && (
                  <div className="border-t border-bd">
                    {caps.map((e) => (
                      <div key={e.cap.id} className="px-4 py-2.5 text-[15px] border-b border-bd last:border-b-0">
                        <div className="font-medium">{e.cap.name}</div>
                        <div className="text-[13px] text-tx3 mt-0.5">{e.l1.name}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
