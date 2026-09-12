"use client";

import { L2Capability } from "@/types";
import { VENDORS, STAGE_NAMES } from "@/lib/constants";

interface Props {
  cap: L2Capability;
}

export default function L2DetailPanel({ cap }: Props) {
  const stages = [
    { key: "stage_1" as const, num: 1 },
    { key: "stage_2" as const, num: 2 },
    { key: "stage_3" as const, num: 3 },
    { key: "stage_4" as const, num: 4 },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-[28px] font-semibold tracking-tight mb-2" style={{ fontFamily: "var(--font-source-serif), 'Source Serif 4', Georgia, serif" }}>{cap.name}</h2>
        <p className="text-[17px] text-tx2 leading-relaxed">{cap.description}</p>
      </div>

      {/* Maturity stages */}
      <section className="mb-8">
        <div className="eyebrow mb-4">Maturity Stages</div>
        <div className="grid grid-cols-2 gap-3">
          {stages.map(({ key, num }) => {
            const text = cap.maturity_indicators[key];

            return (
              <div
                key={key}
                className="rounded-xl px-5 py-4 border border-bd bg-surface transition-all"
              >
                <div className="flex items-center gap-3 mb-1.5">
                  <div className="text-[14px] font-bold rounded-full w-7 h-7 flex items-center justify-center bg-bg3 text-tx3">
                    {num}
                  </div>
                  <span className="text-[16px] font-medium text-tx">
                    {STAGE_NAMES[num]}
                  </span>
                </div>
                <p className="text-[15px] text-tx2 leading-relaxed pl-10">{text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Platform coverage — vendor tile grid */}
      <section>
        <div className="eyebrow mb-4">Platform Coverage</div>
        <div className="grid grid-cols-3 gap-2">
          {sortedVendors(cap).map(({ vendor, cov }) => {
            const isStrong = cov.rating === "strong";
            const isPartial = cov.rating === "partial";

            const tileBg = isStrong ? "#C74E23" : isPartial ? "#FBEDE6" : "#14110F";
            const tileBorder = isStrong ? "#C74E23" : isPartial ? "#E9C4B4" : "#14110F";
            const titleColor = isStrong ? "#fff" : isPartial ? "#1C1A17" : "#F2EEE8";
            const labelColor = isStrong ? "rgba(255,255,255,0.8)" : isPartial ? "#C74E23" : "#E9C4B4";
            const productColor = isStrong ? "rgba(255,255,255,0.7)" : isPartial ? "#6B6560" : "#9A9188";

            return (
              <div
                key={vendor.key}
                className="rounded-xl p-3.5 border transition-all"
                style={{ borderColor: tileBorder, background: tileBg }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[15px] font-semibold" style={{ color: titleColor }}>{vendor.name}</span>
                  <span
                    className="text-[12px] font-semibold uppercase tracking-wide"
                    style={{ color: labelColor }}
                  >
                    {cov.rating}
                  </span>
                </div>
                {cov.products.length > 0 && (
                  <div className="text-[13px] leading-snug" style={{ color: productColor }}>
                    {cov.products.join(" · ")}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

const RATING_ORDER: Record<string, number> = { strong: 0, partial: 1, gap: 2 };

function sortedVendors(cap: L2Capability) {
  return VENDORS
    .map((vendor) => ({ vendor, cov: cap.platform_coverage[vendor.key] }))
    .filter((entry): entry is { vendor: typeof VENDORS[number]; cov: NonNullable<typeof entry.cov> } => !!entry.cov)
    .sort((a, b) => {
      const ratingDiff = (RATING_ORDER[a.cov.rating] ?? 9) - (RATING_ORDER[b.cov.rating] ?? 9);
      if (ratingDiff !== 0) return ratingDiff;
      return a.vendor.name.localeCompare(b.vendor.name);
    });
}
