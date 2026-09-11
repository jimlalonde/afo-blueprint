"use client";

import { useState, useCallback, useMemo } from "react";
import { BlueprintData, Assessments, Layer, L1Component, L2Capability } from "@/types";
import HeroHeader from "./v2/HeroHeader";
import ViewTabs from "./v2/ViewTabs";
import ExploreView from "./v2/ExploreView";
import CoverageView from "./v2/CoverageView";
import AssessView from "./v2/AssessView";
import ScorecardView from "./v2/ScorecardView";

export type ViewMode = "explore" | "coverage" | "assess" | "scorecard";

interface Props {
  data: BlueprintData;
}

export default function BlueprintV2({ data }: Props) {
  const [activeView, setActiveView] = useState<ViewMode>("explore");
  const [assessments, setAssessments] = useState<Assessments>({});

  const allCapabilities = useMemo(() => {
    const caps: { cap: L2Capability; l1: L1Component; layer: Layer }[] = [];
    data.layers.forEach((layer) =>
      layer.l1_components.forEach((l1) =>
        l1.l2_capabilities.forEach((cap) => caps.push({ cap, l1, layer }))
      )
    );
    return caps;
  }, [data]);

  const handleSetStage = useCallback(
    (capId: string, type: "current" | "target", stage: number) => {
      setAssessments((prev) => {
        const entry = prev[capId] || { current: null, target: null, notes: "" };
        const newVal = entry[type] === stage ? null : stage;
        return { ...prev, [capId]: { ...entry, [type]: newVal } };
      });
    },
    []
  );

  const handleSetNotes = useCallback(
    (capId: string, notes: string) => {
      setAssessments((prev) => {
        const entry = prev[capId] || { current: null, target: null, notes: "" };
        return { ...prev, [capId]: { ...entry, notes } };
      });
    },
    []
  );

  const stats = {
    layers: data.layers.length,
    l1: data.metadata.total_l1_components,
    l2: data.metadata.total_l2_capabilities,
    version: data.metadata.version,
  };

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-[1400px] mx-auto">
        <HeroHeader stats={stats} activeView={activeView} onChangeView={setActiveView} />

        <ViewTabs activeView={activeView} onChangeView={setActiveView} />

        <main className="px-6 pb-16">
          {activeView === "explore" && (
            <ExploreView data={data} />
          )}
          {activeView === "coverage" && (
            <CoverageView data={data} allCapabilities={allCapabilities} />
          )}
          {activeView === "assess" && (
            <AssessView
              data={data}
              assessments={assessments}
              onSetStage={handleSetStage}
              onSetNotes={handleSetNotes}
            />
          )}
          {activeView === "scorecard" && (
            <ScorecardView data={data} assessments={assessments} />
          )}
        </main>

        <footer className="border-t border-bd px-6 py-8 text-center">
          <p className="text-[13px] text-tx3 leading-relaxed">
            &copy; {new Date().getFullYear()} PwC. All rights reserved. PwC refers to the PwC network and/or one or more of its member firms, each of which is a separate legal entity.
          </p>
          <p className="text-[11px] text-tx3 mt-2 opacity-60">
            This tool is proprietary to PwC and intended for internal and client use only.
          </p>
        </footer>
      </div>
    </div>
  );
}
