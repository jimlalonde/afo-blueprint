"use client";

import { useState } from "react";
import { BlueprintData } from "@/types";
import { VENDORS } from "@/lib/constants";

interface Props {
  data: BlueprintData;
}

interface VendorCounts {
  strong: number;
  partial: number;
  gap: number;
  mapped: number;
}

function computeCounts(data: BlueprintData): Record<string, VendorCounts> {
  const counts: Record<string, VendorCounts> = {};
  for (const v of VENDORS) {
    counts[v.key] = { strong: 0, partial: 0, gap: 0, mapped: 0 };
  }
  for (const layer of data.layers) {
    for (const comp of layer.l1_components) {
      for (const cap of comp.l2_capabilities) {
        if (!cap.platform_coverage) continue;
        for (const v of VENDORS) {
          const cov = cap.platform_coverage[v.key];
          if (!cov) continue;
          counts[v.key].mapped++;
          if (cov.rating === "strong") counts[v.key].strong++;
          else if (cov.rating === "partial") counts[v.key].partial++;
          else counts[v.key].gap++;
        }
      }
    }
  }
  return counts;
}

export default function CoverageSummary({ data }: Props) {
  const [open, setOpen] = useState(false);
  const counts = computeCounts(data);

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
          Platform coverage summary
        </span>
        <span className="text-[10px] text-tx3">
          Adobe, Salesforce, SAP, AWS, Google, Microsoft + Anthropic, OpenAI, NVIDIA
        </span>
      </div>
      {open && (
        <div className="py-2.5 px-3.5">
          {VENDORS.map((v) => {
            const c = counts[v.key];
            const total = Math.max(c.strong + c.partial + c.gap, 1);

            if (v.overlay) {
              return (
                <div
                  key={v.key}
                  className="border-t border-bd mt-1.5 pt-2"
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="text-[11px] font-medium text-tx min-w-[80px]">
                      {v.name}
                    </div>
                    <div className="text-[10px] text-tx3 flex-1">
                      Compute infrastructure overlay ({c.mapped} of 123
                      capabilities)
                    </div>
                    <div className="text-[11px] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-cov-strong-dot" />
                      <span className="font-medium">{c.strong}</span>
                    </div>
                    <div className="text-[11px] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-cov-partial-dot" />
                      <span className="font-medium">{c.partial}</span>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div key={v.key} className="flex items-center gap-2 mb-1.5 flex-wrap">
                <div className="text-[11px] font-medium text-tx min-w-[80px]">
                  {v.name}
                </div>
                <div className="flex h-1.5 rounded-full overflow-hidden flex-1 min-w-[120px] max-w-[200px]">
                  <div
                    className="bg-cov-strong-dot"
                    style={{ width: `${(c.strong / total) * 100}%` }}
                  />
                  <div
                    className="bg-cov-partial-dot"
                    style={{ width: `${(c.partial / total) * 100}%` }}
                  />
                  <div
                    className="bg-cov-gap-dot"
                    style={{ width: `${(c.gap / total) * 100}%` }}
                  />
                </div>
                <div className="text-[11px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cov-strong-dot" />
                  <span className="font-medium">{c.strong}</span>
                  <span className="text-tx3">strong</span>
                </div>
                <div className="text-[11px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cov-partial-dot" />
                  <span className="font-medium">{c.partial}</span>
                  <span className="text-tx3">partial</span>
                </div>
                <div className="text-[11px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cov-gap-dot" />
                  <span className="font-medium">{c.gap}</span>
                  <span className="text-tx3">gap</span>
                </div>
              </div>
            );
          })}
          <div className="flex gap-3 mt-2 pt-1.5 border-t border-bd">
            <div className="text-[10px] text-tx3 flex items-center gap-[3px]">
              <span className="w-1.5 h-1.5 rounded-full bg-cov-strong-dot" />
              Strong: production-ready
            </div>
            <div className="text-[10px] text-tx3 flex items-center gap-[3px]">
              <span className="w-1.5 h-1.5 rounded-full bg-cov-partial-dot" />
              Partial: addresses some requirements
            </div>
            <div className="text-[10px] text-tx3 flex items-center gap-[3px]">
              <span className="w-1.5 h-1.5 rounded-full bg-cov-gap-dot" />
              Gap: partner or build required
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
