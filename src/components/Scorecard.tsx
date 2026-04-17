"use client";

import { useState, useMemo } from "react";
import { BlueprintData, Assessments } from "@/types";
import { LAYER_COLORS, LAYER_NAMES } from "@/lib/constants";

interface Props {
  data: BlueprintData;
  assessments: Assessments;
}

export default function Scorecard({ data, assessments }: Props) {
  const [open, setOpen] = useState(false);

  const stats = useMemo(() => {
    let assessed = 0;
    let totalScore = 0;
    let gapCount = 0;
    const layerScores: Record<
      string,
      { score: number; assessed: number; total: number }
    > = {};

    for (const layer of data.layers) {
      let ls = 0,
        lc = 0,
        lt = 0;
      for (const comp of layer.l1_components) {
        for (const cap of comp.l2_capabilities) {
          lt++;
          const a = assessments[cap.id];
          if (a?.current) {
            assessed++;
            totalScore += a.current;
            ls += a.current;
            lc++;
          }
          if (a?.current && a?.target && a.target > a.current) {
            gapCount++;
          }
        }
      }
      layerScores[layer.id] = {
        score: lc > 0 ? ls / lc : 0,
        assessed: lc,
        total: lt,
      };
    }

    return {
      assessed,
      avgScore: assessed > 0 ? totalScore / assessed : 0,
      gapCount,
      layerScores,
    };
  }, [data, assessments]);

  if (stats.assessed === 0) return null;

  return (
    <div className="mb-3 border border-bd rounded-lg overflow-hidden">
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
          Assessment scorecard
        </span>
        <span className="text-[10px] text-tx3">
          {stats.assessed} of 123 assessed
        </span>
      </div>
      {open && (
        <div className="p-3.5">
          <div className="grid grid-cols-4 gap-2 mb-3.5">
            <div className="bg-bg2 rounded-md py-2 px-2.5 text-center">
              <div className="text-xl font-medium">
                {stats.avgScore.toFixed(1)}
              </div>
              <div className="text-[10px] text-tx3 mt-0.5">
                Avg. current stage
              </div>
            </div>
            <div className="bg-bg2 rounded-md py-2 px-2.5 text-center">
              <div className="text-xl font-medium">{stats.assessed}</div>
              <div className="text-[10px] text-tx3 mt-0.5">
                Capabilities assessed
              </div>
            </div>
            <div className="bg-bg2 rounded-md py-2 px-2.5 text-center">
              <div className="text-xl font-medium">
                {123 - stats.assessed}
              </div>
              <div className="text-[10px] text-tx3 mt-0.5">Remaining</div>
            </div>
            <div className="bg-bg2 rounded-md py-2 px-2.5 text-center">
              <div className="text-xl font-medium">{stats.gapCount}</div>
              <div className="text-[10px] text-tx3 mt-0.5">
                Gaps (current &lt; target)
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            {data.layers.map((layer) => {
              const ls = stats.layerScores[layer.id];
              const pct = (ls.score / 4) * 100;
              const color = LAYER_COLORS[layer.id] || "#888";
              return (
                <div key={layer.id} className="flex items-center gap-2">
                  <div
                    className="text-[11px] font-medium min-w-[100px]"
                    style={{ color }}
                  >
                    {LAYER_NAMES[layer.id]}
                  </div>
                  <div className="flex-1 h-4 bg-bg2 rounded-sm overflow-hidden flex relative">
                    <div
                      className="h-full transition-all duration-300"
                      style={{
                        width: `${pct}%`,
                        background: color,
                        opacity: 0.7,
                      }}
                    />
                  </div>
                  <div className="text-[10px] font-medium min-w-[32px] text-right">
                    {ls.score.toFixed(1)}
                  </div>
                  <div className="text-[9px] text-tx3 min-w-[60px]">
                    {ls.assessed}/{ls.total}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
