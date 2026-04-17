"use client";

import { PlatformCoverage } from "@/types";
import { VENDORS } from "@/lib/constants";

interface Props {
  coverage: Record<string, PlatformCoverage>;
  visible: boolean;
  inGovPanel?: boolean;
}

const RATING_STYLES: Record<
  string,
  { pill: string; dot: string }
> = {
  strong: {
    pill: "bg-cov-strong-bg text-cov-strong-text border-cov-strong-border",
    dot: "bg-cov-strong-dot",
  },
  partial: {
    pill: "bg-cov-partial-bg text-cov-partial-text border-cov-partial-border",
    dot: "bg-cov-partial-dot",
  },
  gap: {
    pill: "bg-cov-gap-bg text-cov-gap-text border-cov-gap-border",
    dot: "bg-cov-gap-dot",
  },
};

export default function CoveragePills({ coverage, visible, inGovPanel }: Props) {
  if (!visible || !coverage || Object.keys(coverage).length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-[3px] mt-1.5 ${inGovPanel ? "relative" : ""}`}>
      {VENDORS.map((v) => {
        const cov = coverage[v.key];
        if (!cov) return null;
        const styles = RATING_STYLES[cov.rating];
        const label = cov.rating.charAt(0).toUpperCase() + cov.rating.slice(1);
        const prods = cov.products?.length ? cov.products.join(", ") : "";
        const tip = [prods, cov.notes].filter(Boolean).join("\n");

        return (
          <span
            key={v.key}
            className={`group relative text-[9px] font-medium py-0.5 px-[7px] rounded-sm inline-flex items-center gap-[3px] border cursor-default ${styles.pill} ${inGovPanel ? "static" : ""}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
            {v.name}: {label}
            {tip && (
              <span
                className={`hidden group-hover:block absolute bottom-full mb-1 bg-tx text-bg text-[10px] font-normal py-1.5 px-2.5 rounded-md leading-snug z-10 pointer-events-none whitespace-pre-line ${
                  inGovPanel
                    ? "left-1/2 -translate-x-1/2 w-[280px]"
                    : "left-0 w-[260px]"
                }`}
              >
                {tip}
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}
