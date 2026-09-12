"use client";

import { useState, useMemo } from "react";
import { BlueprintData, Layer, L1Component, L2Capability } from "@/types";
import { VENDORS } from "@/lib/constants";

const PWC_EMBER = "#C74E23";
const PWC_INK = "#1C1A17";
const PWC_DEEP = "#14110F";
const PWC_CREAM = "#F2EEE8";
const PWC_PEACH = "#FBEDE6";
const PWC_PEACH_BORDER = "#E9C4B4";
const PWC_LINE = "#E3DFD8";

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
              color="#FFFFFF"
              bgColor={PWC_EMBER}
              isDark
            />
            <StatCard
              value={analysis.partials.length}
              total={totalCaps}
              label="Partial coverage"
              color={PWC_INK}
              bgColor={PWC_PEACH}
              borderColor={PWC_PEACH_BORDER}
            />
            <StatCard
              value={analysis.gaps.length}
              total={totalCaps}
              label="Coverage gaps"
              color={PWC_CREAM}
              bgColor={PWC_DEEP}
              isDark
            />
          </div>

          {/* Coverage criteria legend */}
          <CriteriaLegend />

          {/* Layer health gauges */}
          <LayerHealthGauges
            layers={data.layers}
            gaps={analysis.gaps}
            partials={analysis.partials}
            strong={analysis.strong}
          />
        </>
      )}

      {/* Vendor comparison bars */}
      <section>
        <h3 className="text-[18px] font-semibold mb-4" style={{ fontFamily: "var(--font-source-serif), 'Source Serif 4', Georgia, serif" }}>Vendor Comparison</h3>

        {/* Legend */}
        <div className="flex items-center gap-5 mb-4 text-[12px]">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm" style={{ background: PWC_EMBER }} />
            <span className="text-tx2">Strong</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm" style={{ background: PWC_PEACH, border: `1.5px solid ${PWC_PEACH_BORDER}` }} />
            <span className="text-tx2">Partial</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm" style={{ background: PWC_DEEP }} />
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
                  <span className="flex items-center gap-1.5" style={{ color: PWC_EMBER }}>
                    <span className="w-2 h-2 rounded-full" style={{ background: PWC_EMBER }} />
                    {v.strong}
                  </span>
                  <span className="flex items-center gap-1.5" style={{ color: PWC_PEACH_BORDER }}>
                    <span className="w-2 h-2 rounded-full" style={{ background: PWC_PEACH, border: `1.5px solid ${PWC_PEACH_BORDER}` }} />
                    {v.partial}
                  </span>
                  <span className="flex items-center gap-1.5" style={{ color: PWC_INK }}>
                    <span className="w-2 h-2 rounded-full" style={{ background: PWC_DEEP }} />
                    {v.gap}
                  </span>
                </div>
              </div>
              <div className="flex h-2.5 rounded-full overflow-hidden" style={{ background: PWC_DEEP }}>
                <div
                  className="transition-all duration-500"
                  style={{
                    width: `${v.strongPct}%`,
                    background: PWC_EMBER,
                  }}
                />
                <div
                  className="transition-all duration-500"
                  style={{
                    width: `${v.partialPct}%`,
                    background: PWC_PEACH_BORDER,
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
  borderColor,
  isDark = false,
}: {
  value: number;
  total: number;
  label: string;
  color: string;
  bgColor: string;
  borderColor?: string;
  isDark?: boolean;
}) {
  const pct = Math.round((value / total) * 100);
  const subColor = isDark ? "rgba(255,255,255,0.7)" : undefined;
  const subColorMuted = isDark ? "rgba(255,255,255,0.5)" : undefined;
  return (
    <div
      className={`rounded-xl p-5 ${!isDark && !borderColor ? "border border-bd" : ""}`}
      style={{ background: bgColor, border: borderColor ? `1.5px solid ${borderColor}` : undefined }}
    >
      <div className="text-[32px] font-bold" style={{ color }}>{value}</div>
      <div className={`text-[15px] mt-0.5 ${isDark || borderColor ? "" : "text-tx2"}`} style={subColor ? { color: subColor } : undefined}>{label}</div>
      <div className={`text-[14px] mt-1 ${isDark || borderColor ? "" : "text-tx3"}`} style={subColorMuted ? { color: subColorMuted } : undefined}>{pct}% of {total} capabilities</div>
    </div>
  );
}

function LayerHealthGauges({
  layers,
  gaps,
  partials,
  strong,
}: {
  layers: Layer[];
  gaps: CapEntry[];
  partials: CapEntry[];
  strong: CapEntry[];
}) {
  const [expandedLayer, setExpandedLayer] = useState<string | null>(null);

  // Build per-layer stats from the three arrays
  const layerStats = useMemo(() => {
    const stats = new Map<string, { gaps: CapEntry[]; partials: CapEntry[]; strong: CapEntry[] }>();
    layers.forEach((l) => stats.set(l.id, { gaps: [], partials: [], strong: [] }));
    gaps.forEach((e) => stats.get(e.layer.id)?.gaps.push(e));
    partials.forEach((e) => stats.get(e.layer.id)?.partials.push(e));
    strong.forEach((e) => stats.get(e.layer.id)?.strong.push(e));
    return stats;
  }, [layers, gaps, partials, strong]);

  const toggleLayer = (id: string) => {
    setExpandedLayer((prev) => (prev === id ? null : id));
  };

  return (
    <div className="mb-10">
      <h3
        className="text-[18px] font-semibold mb-4"
        style={{ fontFamily: "var(--font-source-serif), 'Source Serif 4', Georgia, serif" }}
      >
        Coverage by Layer
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {layers.map((layer) => {
          const data = layerStats.get(layer.id);
          if (!data) return null;
          const gapCount = data.gaps.length;
          const partialCount = data.partials.length;
          const strongCount = data.strong.length;
          const total = gapCount + partialCount + strongCount;
          if (total === 0) return null;

          const coveragePct = Math.round(((strongCount + partialCount * 0.5) / total) * 100);
          const isExpanded = expandedLayer === layer.id;
          const hasIssues = gapCount > 0 || partialCount > 0;

          // Gauge color based on coverage health
          const gaugeColor = coveragePct >= 80 ? PWC_EMBER : coveragePct >= 50 ? PWC_PEACH_BORDER : PWC_DEEP;

          // SVG gauge dimensions
          const radius = 32;
          const circumference = 2 * Math.PI * radius;
          const dashOffset = circumference * (1 - coveragePct / 100);

          return (
            <div key={layer.id}>
              <button
                onClick={() => hasIssues && toggleLayer(layer.id)}
                className={`w-full text-left rounded-xl border transition-all duration-200 ${
                  isExpanded ? "border-accent bg-bg2" : "border-bd hover:border-bd2"
                } ${hasIssues ? "cursor-pointer" : "cursor-default"}`}
                style={{ padding: "16px" }}
              >
                <div className="flex items-center gap-4">
                  {/* Circular gauge */}
                  <svg width={76} height={76} viewBox="0 0 76 76" className="flex-shrink-0">
                    <circle cx={38} cy={38} r={radius} fill="none" stroke={PWC_LINE} strokeWidth={6} />
                    <circle
                      cx={38}
                      cy={38}
                      r={radius}
                      fill="none"
                      stroke={gaugeColor}
                      strokeWidth={6}
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={dashOffset}
                      transform="rotate(-90 38 38)"
                      className="transition-all duration-500"
                    />
                    <text
                      x={38}
                      y={34}
                      textAnchor="middle"
                      className="fill-current"
                      style={{ fontSize: 16, fontWeight: 700 }}
                    >
                      {coveragePct}%
                    </text>
                    <text
                      x={38}
                      y={48}
                      textAnchor="middle"
                      className="text-tx3 fill-current"
                      style={{ fontSize: 9 }}
                    >
                      covered
                    </text>
                  </svg>

                  {/* Layer info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[15px] font-semibold">{layer.name}</span>
                      {hasIssues && (
                        <span
                          className={`text-[10px] text-tx3 transition-transform duration-200 ${
                            isExpanded ? "rotate-90" : ""
                          }`}
                        >
                          ▶
                        </span>
                      )}
                    </div>

                    {/* Breakdown bar */}
                    <div className="flex h-2 rounded-full overflow-hidden mb-2">
                      {strongCount > 0 && (
                        <div
                          className="transition-all duration-500"
                          style={{ width: `${(strongCount / total) * 100}%`, background: PWC_EMBER }}
                        />
                      )}
                      {partialCount > 0 && (
                        <div
                          className="transition-all duration-500"
                          style={{ width: `${(partialCount / total) * 100}%`, background: PWC_PEACH, borderRight: gapCount > 0 ? `1px solid ${PWC_PEACH_BORDER}` : undefined }}
                        />
                      )}
                      {gapCount > 0 && (
                        <div
                          className="transition-all duration-500"
                          style={{ width: `${(gapCount / total) * 100}%`, background: PWC_DEEP }}
                        />
                      )}
                    </div>

                    {/* Counts */}
                    <div className="flex gap-3 text-[11px] text-tx3">
                      <span>{strongCount} strong</span>
                      <span>{partialCount} partial</span>
                      <span>{gapCount} gaps</span>
                    </div>
                  </div>
                </div>
              </button>

              {/* Expanded capability details */}
              {isExpanded && hasIssues && (
                <div className="mt-1 rounded-xl border border-bd overflow-hidden">
                  <div className="grid grid-cols-1 sm:grid-cols-2 divide-x divide-bd">
                    {/* Partials column */}
                    {partialCount > 0 && (
                      <div className="p-4">
                        <div className="text-[10px] font-semibold tracking-wider text-tx3 mb-3">
                          PARTIAL ({partialCount})
                        </div>
                        <div className="space-y-1.5">
                          {data.partials.map((e) => (
                            <div
                              key={e.cap.id}
                              className="rounded-lg px-3 py-2.5"
                              style={{ background: PWC_PEACH, border: `1px solid ${PWC_PEACH_BORDER}` }}
                            >
                              <div className="text-[13px] font-medium" style={{ color: PWC_INK }}>
                                {e.cap.name}
                              </div>
                              <div className="text-[11px] mt-0.5" style={{ color: "rgba(28,26,23,0.5)" }}>
                                {e.l1.name}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Gaps column */}
                    {gapCount > 0 && (
                      <div className="p-4">
                        <div className="text-[10px] font-semibold tracking-wider text-tx3 mb-3">
                          GAPS ({gapCount})
                        </div>
                        <div className="space-y-1.5">
                          {data.gaps.map((e) => (
                            <div
                              key={e.cap.id}
                              className="rounded-lg px-3 py-2.5"
                              style={{ background: PWC_DEEP, border: `1px solid #333` }}
                            >
                              <div className="text-[13px] font-medium" style={{ color: PWC_CREAM }}>
                                {e.cap.name}
                              </div>
                              <div className="text-[11px] mt-0.5" style={{ color: "rgba(242,238,232,0.5)" }}>
                                {e.l1.name}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const CRITERIA_ITEMS = [
  {
    label: "Strong",
    definition: "Vendor offers a native, production-ready capability that covers the full scope with minimal configuration or custom build.",
    bg: PWC_EMBER,
    border: PWC_EMBER,
  },
  {
    label: "Partial",
    definition: "Vendor addresses some aspects but requires supplemental tooling, significant configuration, or only covers a subset of the scope.",
    bg: PWC_PEACH,
    border: PWC_PEACH_BORDER,
  },
  {
    label: "Gap",
    definition: "Vendor does not offer this capability. Requires custom build, third-party integration, or an additional platform to address.",
    bg: PWC_DEEP,
    border: "#333",
  },
];

function CriteriaLegend() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-[15px] font-medium text-tx3 hover:text-tx2 transition-colors cursor-pointer"
      >
        <span
          className="text-[11px] transition-transform duration-200 inline-block"
          style={{ transform: isOpen ? "rotate(90deg)" : "none" }}
        >
          ▶
        </span>
        How we rate coverage
      </button>

      {isOpen && (
        <div
          className="mt-3 flex gap-8 rounded-xl border border-bd px-6 py-5"
          style={{ background: "var(--color-bg2)" }}
        >
          {CRITERIA_ITEMS.map((item) => (
            <div key={item.label} className="flex-1 flex items-start gap-3">
              <div
                className="w-4 h-4 rounded flex-shrink-0 mt-1"
                style={{ background: item.bg, border: `1px solid ${item.border}` }}
              />
              <div>
                <div className="text-[15px] font-semibold">{item.label}</div>
                <div className="text-[14px] text-tx3 leading-relaxed mt-1">{item.definition}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
