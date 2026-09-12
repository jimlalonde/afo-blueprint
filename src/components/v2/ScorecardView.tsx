"use client";

import { useMemo } from "react";
import { BlueprintData, Assessments } from "@/types";
import { STAGE_NAMES } from "@/lib/constants";

const PWC_ORANGE = "#C74E23";
const PWC_GOLD = "#FFB600";
const PWC_BLACK = "#2D2D2D";
const LAYER_BAR_COLORS = [PWC_ORANGE, PWC_GOLD, PWC_BLACK, PWC_ORANGE, PWC_GOLD, PWC_BLACK, PWC_ORANGE];

interface Props {
  data: BlueprintData;
  assessments: Assessments;
}

export default function ScorecardView({ data, assessments }: Props) {
  const summary = useMemo(() => {
    let assessed = 0;
    let totalGap = 0;
    let maxGap = 0;
    let currentSum = 0;
    let targetSum = 0;

    const layerSummaries = data.layers.map((layer) => {
      let lAssessed = 0;
      let lCurrentSum = 0;
      let lTargetSum = 0;
      let lTotal = 0;

      layer.l1_components.forEach((comp) =>
        comp.l2_capabilities.forEach((cap) => {
          lTotal++;
          const a = assessments[cap.id];
          if (a && a.current !== null && a.target !== null) {
            lAssessed++;
            lCurrentSum += a.current;
            lTargetSum += a.target;
            const gap = a.target - a.current;
            totalGap += gap;
            if (gap > maxGap) maxGap = gap;
            assessed++;
            currentSum += a.current;
            targetSum += a.target;
          }
        })
      );

      return {
        layer,
        assessed: lAssessed,
        total: lTotal,
        avgCurrent: lAssessed > 0 ? lCurrentSum / lAssessed : 0,
        avgTarget: lAssessed > 0 ? lTargetSum / lAssessed : 0,
        avgGap: lAssessed > 0 ? (lTargetSum - lCurrentSum) / lAssessed : 0,
      };
    });

    return {
      assessed,
      total: data.metadata.total_l2_capabilities,
      avgCurrent: assessed > 0 ? currentSum / assessed : 0,
      avgTarget: assessed > 0 ? targetSum / assessed : 0,
      avgGap: assessed > 0 ? (targetSum - currentSum) / assessed : 0,
      maxGap,
      layerSummaries,
    };
  }, [data, assessments]);

  const hasData = summary.assessed > 0;

  return (
    <div className="animate-fade-in max-w-[900px]">
      <div className="mb-8">
        <h2 className="text-[26px] font-semibold tracking-tight mb-2" style={{ fontFamily: "var(--font-source-serif), 'Source Serif 4', Georgia, serif" }}>Assessment Scorecard</h2>
        <p className="text-[16px] text-tx2">
          {hasData
            ? `Summary of ${summary.assessed} assessed capabilities across the architecture.`
            : "Complete assessments in the Assess tab to see your scorecard."}
        </p>
      </div>

      {!hasData ? (
        <div className="bg-surface border border-bd rounded-xl p-12 text-center">
          <div className="text-4xl mb-4 opacity-30">◈</div>
          <div className="text-[17px] text-tx2 mb-2">No assessments yet</div>
          <div className="text-[15px] text-tx3">
            Switch to the <strong>Assess</strong> tab to rate your capabilities.
          </div>
        </div>
      ) : (
        <>
          {/* Summary cards */}
          <div className="grid grid-cols-4 gap-3 mb-8">
            <SummaryCard
              label="Assessed"
              value={`${summary.assessed}/${summary.total}`}
              detail={`${Math.round((summary.assessed / summary.total) * 100)}% complete`}
            />
            <SummaryCard
              label="Avg. Current"
              value={summary.avgCurrent.toFixed(1)}
              detail={STAGE_NAMES[Math.round(summary.avgCurrent)] || "—"}
              valueColor="var(--color-tx)"
            />
            <SummaryCard
              label="Avg. Target"
              value={summary.avgTarget.toFixed(1)}
              detail={STAGE_NAMES[Math.round(summary.avgTarget)] || "—"}
              valueColor="var(--color-accent)"
            />
            <SummaryCard
              label="Avg. Gap"
              value={`+${summary.avgGap.toFixed(1)}`}
              detail={`Max gap: +${summary.maxGap}`}
              valueColor="var(--color-cov-partial)"
            />
          </div>

          {/* Layer breakdown */}
          <section>
            <div className="eyebrow mb-3">By Layer</div>
            <h3 className="text-[18px] font-semibold mb-4" style={{ fontFamily: "var(--font-source-serif), 'Source Serif 4', Georgia, serif" }}>Layer Breakdown</h3>
            <div className="space-y-3">
              {summary.layerSummaries.map(({ layer, assessed, total, avgCurrent, avgTarget, avgGap }) => {
                const layerIdx = data.layers.findIndex((l) => l.id === layer.id);
                const color = LAYER_BAR_COLORS[layerIdx % LAYER_BAR_COLORS.length];

                return (
                  <div
                    key={layer.id}
                    className="bg-surface border border-bd rounded-xl px-5 py-4"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-[3px] h-6 rounded-full"
                        style={{ background: color }}
                      />
                      <div className="flex-1">
                        <div className="text-[16px] font-medium">{layer.name}</div>
                        <div className="text-[14px] text-tx3">
                          {assessed}/{total} assessed
                        </div>
                      </div>
                      {assessed > 0 && (
                        <div className="flex items-center gap-4 text-[15px]">
                          <span className="text-tx2">
                            Current: <strong>{avgCurrent.toFixed(1)}</strong>
                          </span>
                          <span className="text-accent">
                            Target: <strong>{avgTarget.toFixed(1)}</strong>
                          </span>
                          <span className="text-tx3">
                            Gap: <strong>+{avgGap.toFixed(1)}</strong>
                          </span>
                        </div>
                      )}
                    </div>

                    {assessed > 0 && (
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 rounded-full bg-bg3 overflow-hidden relative">
                          {/* Current level */}
                          <div
                            className="absolute h-full rounded-full bg-tx3/40 transition-all duration-500"
                            style={{ width: `${(avgCurrent / 4) * 100}%` }}
                          />
                          {/* Target level */}
                          <div
                            className="absolute h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${(avgTarget / 4) * 100}%`,
                              background: "var(--color-accent)",
                              opacity: 0.3,
                            }}
                          />
                        </div>
                        <div className="text-[11px] text-tx3 w-12 text-right">
                          {avgTarget.toFixed(1)}/4
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

function SummaryCard({
  label,
  value,
  detail,
  valueColor,
}: {
  label: string;
  value: string;
  detail: string;
  valueColor?: string;
}) {
  return (
    <div className="bg-surface border border-bd rounded-xl p-5">
      <div className="text-[13px] text-tx3 font-medium uppercase tracking-wide mb-2">
        {label}
      </div>
      <div className="text-[32px] font-bold" style={{ color: valueColor }}>
        {value}
      </div>
      <div className="text-[14px] text-tx3 mt-1">{detail}</div>
    </div>
  );
}
