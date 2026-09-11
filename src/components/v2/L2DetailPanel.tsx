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
    <div className="max-w-[700px]">
      {/* Header */}
      <div className="mb-8">
        <div className="text-[11px] text-tx3 font-mono mb-1">{cap.id}</div>
        <h2 className="text-[24px] font-semibold tracking-tight mb-2">{cap.name}</h2>
        <p className="text-[15px] text-tx2 leading-relaxed">{cap.description}</p>
      </div>

      {/* Platform coverage section */}
      <section className="mb-8">
        <h3 className="text-[13px] font-semibold text-tx3 uppercase tracking-wider mb-4">
          Platform Coverage
        </h3>
        <div className="space-y-2">
          {VENDORS.map((vendor) => {
            const cov = cap.platform_coverage[vendor.key];
            if (!cov) return null;

            return (
              <div
                key={vendor.key}
                className="flex items-center gap-3 bg-surface border border-bd rounded-lg px-4 py-3"
              >
                <RatingIndicator rating={cov.rating} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-medium">{vendor.name}</span>
                    {vendor.overlay && (
                      <span className="text-[10px] text-tx3 bg-bg2 rounded px-1.5 py-0.5">
                        overlay
                      </span>
                    )}
                  </div>
                  {cov.products.length > 0 && (
                    <div className="text-[12px] text-tx3 mt-0.5 truncate">
                      {cov.products.join(", ")}
                    </div>
                  )}
                </div>
                <span className={`text-[12px] font-medium capitalize ${
                  cov.rating === "strong" ? "text-cov-strong"
                  : cov.rating === "partial" ? "text-cov-partial"
                  : "text-cov-gap"
                }`}>
                  {cov.rating}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Maturity indicators */}
      <section>
        <h3 className="text-[13px] font-semibold text-tx3 uppercase tracking-wider mb-4">
          Maturity Stages
        </h3>
        <div className="space-y-3">
          {stages.map(({ key, num }) => {
            const text = cap.maturity_indicators[key];
            const isTarget = num === 3;

            return (
              <div
                key={key}
                className={`rounded-xl px-5 py-4 border transition-all ${
                  isTarget
                    ? "bg-accent-subtle border-accent/15"
                    : "bg-surface border-bd"
                }`}
              >
                <div className="flex items-center gap-3 mb-1.5">
                  <div className={`text-[12px] font-bold rounded-full w-6 h-6 flex items-center justify-center ${
                    isTarget ? "bg-accent text-white" : "bg-bg3 text-tx3"
                  }`}>
                    {num}
                  </div>
                  <span className={`text-[14px] font-medium ${isTarget ? "text-accent" : "text-tx"}`}>
                    {STAGE_NAMES[num]}
                    {isTarget && <span className="text-[12px] text-tx3 ml-2">(target)</span>}
                  </span>
                </div>
                <p className="text-[13px] text-tx2 leading-relaxed pl-9">{text}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function RatingIndicator({ rating }: { rating: string }) {
  const segments = rating === "strong" ? 3 : rating === "partial" ? 2 : 0;

  return (
    <div className="flex gap-0.5 flex-shrink-0">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-[3px] h-3 rounded-sm"
          style={{
            background:
              i < segments
                ? rating === "strong"
                  ? "var(--color-cov-strong)"
                  : "var(--color-cov-partial)"
                : "var(--color-bd)",
          }}
        />
      ))}
    </div>
  );
}
