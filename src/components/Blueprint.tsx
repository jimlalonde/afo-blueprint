"use client";

import { useState, useCallback } from "react";
import { BlueprintData, Assessments } from "@/types";
import Header from "./Header";
import Toolbar from "./Toolbar";
import LayerLegend from "./LayerLegend";
import Scorecard from "./Scorecard";
import CoverageSummary from "./CoverageSummary";
import PlatformFitAnalysis from "./PlatformFitAnalysis";
import LayerAccordion from "./LayerAccordion";
import FunctionalPillars from "./FunctionalPillars";
import GovernanceSidebar from "./GovernanceSidebar";

interface Props {
  data: BlueprintData;
}

export default function Blueprint({ data }: Props) {
  const [allExpanded, setAllExpanded] = useState(false);
  const [covVisible, setCovVisible] = useState(false);
  const [assessVisible, setAssessVisible] = useState(false);
  const [assessments, setAssessments] = useState<Assessments>({});
  const [navigateTarget, setNavigateTarget] = useState<string | null>(null);

  const govLayer = data.layers.find((l) => l.id === "governance_trust")!;
  const horizontalLayers = data.layers.filter(
    (l) => l.id !== "governance_trust"
  );

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

  const handleNavigateToCapability = useCallback((capId: string) => {
    setNavigateTarget(capId);
  }, []);

  const handleNavigateComplete = useCallback(() => {
    setNavigateTarget(null);
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto bg-bg rounded-xl py-7 px-6">
      <Header metadata={data.metadata} layerCount={data.layers.length} />

      <Scorecard data={data} assessments={assessments} />
      <CoverageSummary data={data} />
      <PlatformFitAnalysis data={data} onNavigate={handleNavigateToCapability} />
      <LayerLegend />

      <Toolbar
        allExpanded={allExpanded}
        covVisible={covVisible}
        assessVisible={assessVisible}
        onToggleAll={() => setAllExpanded(!allExpanded)}
        onToggleCoverage={() => setCovVisible(!covVisible)}
        onToggleAssessment={() => setAssessVisible(!assessVisible)}
      />

      <div className="flex gap-1.5 items-stretch">
        <div className="flex-1 min-w-0">
          {horizontalLayers.map((layer, li) =>
            layer.id === "functional_pillars" ? (
              <FunctionalPillars
                key={layer.id}
                layer={layer}
                forceOpen={allExpanded}
                navigateTarget={navigateTarget}
                onNavigateComplete={handleNavigateComplete}
                covVisible={covVisible}
                assessVisible={assessVisible}
                assessments={assessments}
                onSetStage={handleSetStage}
                onSetNotes={handleSetNotes}
              />
            ) : (
              <LayerAccordion
                key={layer.id}
                layer={layer}
                layerIndex={li}
                forceOpen={allExpanded}
                navigateTarget={navigateTarget}
                onNavigateComplete={handleNavigateComplete}
                covVisible={covVisible}
                assessVisible={assessVisible}
                assessments={assessments}
                onSetStage={handleSetStage}
                onSetNotes={handleSetNotes}
              />
            )
          )}
        </div>
        <GovernanceSidebar
          layer={govLayer}
          forceOpen={allExpanded}
          navigateTarget={navigateTarget}
          onNavigateComplete={handleNavigateComplete}
          covVisible={covVisible}
          assessVisible={assessVisible}
          assessments={assessments}
          onSetStage={handleSetStage}
          onSetNotes={handleSetNotes}
        />
      </div>
    </div>
  );
}
