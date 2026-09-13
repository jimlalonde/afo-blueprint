"use client";

import React from "react";
import { BlueprintData, Layer, L1Component } from "@/types";

interface Props {
  data: BlueprintData;
  expandedLayers: Set<string>;
  setExpandedLayers: React.Dispatch<React.SetStateAction<Set<string>>>;
  expandedL1s: Set<string>;
  setExpandedL1s: React.Dispatch<React.SetStateAction<Set<string>>>;
  govExpanded: Set<string>;
  setGovExpanded: React.Dispatch<React.SetStateAction<Set<string>>>;
  onNavigateToCapability?: (layerId: string, l1Id: string, capId: string) => void;
}

const PWC_EMBER = "#C74E23";
const PWC_DEEP = "#14110F";
const PWC_INK = "#1C1A17";
const PWC_CREAM = "#F2EEE8";
const PWC_PEACH = "#FBEDE6";
const PWC_PEACH_BORDER = "#E9C4B4";

interface BandStyle {
  bg: string;
  fg: string;
  accent: string;
}

const BAND_STYLES: Record<string, BandStyle> = {
  experience: { bg: PWC_EMBER, fg: "#FFFFFF", accent: "#FFFFFF" },
  orchestration_aeo: { bg: PWC_PEACH, fg: PWC_DEEP, accent: PWC_EMBER },
  functional_pillars: { bg: PWC_EMBER, fg: "#FFFFFF", accent: "#FFFFFF" },
  content_operations_ico: { bg: PWC_PEACH, fg: PWC_DEEP, accent: PWC_EMBER },
  commercial_brain: { bg: PWC_EMBER, fg: "#FFFFFF", accent: "#FFFFFF" },
  enterprise_data: { bg: PWC_PEACH, fg: PWC_DEEP, accent: PWC_EMBER },
  governance_trust: { bg: PWC_DEEP, fg: PWC_CREAM, accent: PWC_EMBER },
};

const DEFAULT_BAND: BandStyle = { bg: PWC_DEEP, fg: PWC_CREAM, accent: PWC_EMBER };

const MINOR_WORDS = new Set(["and", "or", "the", "a", "an", "of", "in", "for", "on", "at", "by", "to", "but", "&"]);
const SERIF = "var(--font-source-serif), 'Source Serif 4', Georgia, serif";

function toTitleCase(str: string): string {
  return str.replace(/\b\w+/g, (word, index) => {
    if (index > 0 && MINOR_WORDS.has(word.toLowerCase())) return word.toLowerCase();
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
}

export default function BlueprintView({
  data,
  expandedLayers,
  setExpandedLayers,
  expandedL1s,
  setExpandedL1s,
  govExpanded,
  setGovExpanded,
  onNavigateToCapability,
}: Props) {
  const govLayer = data.layers.find((l) => l.id === "governance_trust");
  const horizontalLayers = data.layers.filter((l) => l.id !== "governance_trust");

  const allExpanded = expandedLayers.size === horizontalLayers.length;

  const toggleLayer = (id: string) => {
    setExpandedLayers((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleL1 = (key: string) => {
    setExpandedL1s((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const toggleGovL1 = (key: string) => {
    setGovExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const toggleAll = () => {
    if (allExpanded) {
      setExpandedLayers(new Set());
      setExpandedL1s(new Set());
      setGovExpanded(new Set());
    } else {
      setExpandedLayers(new Set(horizontalLayers.map((l) => l.id)));
      const allL1Keys: string[] = [];
      horizontalLayers.forEach((l) =>
        l.l1_components.forEach((c) => allL1Keys.push(`${l.id}-${c.id}`))
      );
      setExpandedL1s(new Set(allL1Keys));
      if (govLayer) {
        setGovExpanded(new Set(govLayer.l1_components.map((c) => c.id)));
      }
    }
  };

  const totalL1 = data.layers.reduce((s, l) => s + l.l1_components.length, 0);
  const totalL2 = data.layers.reduce(
    (s, l) => s + l.l1_components.reduce((s2, c) => s2 + c.l2_capabilities.length, 0),
    0
  );

  return (
    <section className="pb-6 w-full px-2 animate-fade-in">
      {/* Section heading */}
      <div className="mb-8">
        <h2
          className="text-[26px] font-semibold tracking-tight mb-2"
          style={{ fontFamily: SERIF }}
        >
          The Model
        </h2>
        <p className="text-[16px] text-tx2 mb-5">
          Navigate the full blueprint. Expand layers to see components and capabilities.
        </p>
      </div>

      {/* Controls row */}
      <div className="mb-6">
        <button
          onClick={toggleAll}
          className="text-[15px] font-semibold px-5 py-2.5 rounded-lg cursor-pointer transition-all duration-200"
          style={{
            background: allExpanded ? PWC_EMBER : "transparent",
            color: allExpanded ? "#FFFFFF" : PWC_EMBER,
            border: `2px solid ${PWC_EMBER}`,
            fontFamily: SERIF,
          }}
        >
          {allExpanded ? "Collapse All" : "Expand All"}
        </button>
      </div>

      {/* Main layout: horizontal layers + governance sidebar */}
      <div className="flex gap-[3px] items-stretch">
        {/* Horizontal layers */}
        <div className="flex-1 min-w-0 flex flex-col gap-[2px]">
          {horizontalLayers.map((layer, li) => (
            <LayerAccordion
              key={layer.id}
              layer={layer}
              style={BAND_STYLES[layer.id] || DEFAULT_BAND}
              isFirst={li === 0}
              isLast={li === horizontalLayers.length - 1}
              isExpanded={expandedLayers.has(layer.id)}
              expandedL1s={expandedL1s}
              onToggleLayer={() => toggleLayer(layer.id)}
              onToggleL1={toggleL1}
              onNavigateToCapability={onNavigateToCapability}
            />
          ))}
        </div>

        {/* Governance sidebar */}
        {govLayer && (
          <GovernanceSidebar
            layer={govLayer}
            govExpanded={govExpanded}
            onToggleGovL1={toggleGovL1}
            onNavigateToCapability={onNavigateToCapability}
          />
        )}
      </div>
    </section>
  );
}

/* ─── Layer Accordion ─── */

function LayerAccordion({
  layer,
  style: s,
  isFirst,
  isLast,
  isExpanded,
  expandedL1s,
  onToggleLayer,
  onToggleL1,
  onNavigateToCapability,
}: {
  layer: Layer;
  style: BandStyle;
  isFirst: boolean;
  isLast: boolean;
  isExpanded: boolean;
  expandedL1s: Set<string>;
  onToggleLayer: () => void;
  onToggleL1: (key: string) => void;
  onNavigateToCapability?: (layerId: string, l1Id: string, capId: string) => void;
}) {
  const isFP = layer.id === "functional_pillars";
  const totalCaps = layer.l1_components.reduce(
    (sum, c) => sum + c.l2_capabilities.length,
    0
  );

  const borderRadius = isFirst
    ? "12px 0 0 0"
    : isLast
      ? "0 0 0 12px"
      : "0";

  const isPeach = s.bg === PWC_PEACH;

  return (
    <div style={{
      borderRadius,
      overflow: "hidden",
      border: isPeach ? `1px solid ${PWC_EMBER}30` : undefined,
    }}>
      {/* Layer header */}
      <div
        onClick={onToggleLayer}
        className="cursor-pointer select-none transition-opacity hover:opacity-90"
        style={{
          background: s.bg,
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span
          className="transition-transform duration-200 inline-block"
          style={{
            fontSize: 13,
            color: s.accent,
            transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
          }}
        >
          &#9654;
        </span>
        <span style={{ fontSize: 18, fontWeight: 600, color: s.fg, fontFamily: SERIF }}>
          {toTitleCase(layer.name)}
        </span>
        <span className="flex-1" />
        <span style={{ fontSize: 14, color: s.fg, opacity: 0.45 }}>
          {layer.l1_components.length} L1 · {totalCaps} L2
        </span>
      </div>

      {/* Expanded content */}
      {isExpanded && (
        <div style={{ background: s.bg, padding: "0 20px 14px" }}>
          {isFP ? (
            <FunctionalPillarsGrid
              layer={layer}
              style={s}
              expandedL1s={expandedL1s}
              onToggleL1={onToggleL1}
              onNavigateToCapability={onNavigateToCapability}
            />
          ) : (
            <StandardL1List
              layer={layer}
              style={s}
              expandedL1s={expandedL1s}
              onToggleL1={onToggleL1}
              onNavigateToCapability={onNavigateToCapability}
            />
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Functional Pillars: 5-column grid ─── */

function FunctionalPillarsGrid({
  layer,
  style: s,
  expandedL1s,
  onToggleL1,
  onNavigateToCapability,
}: {
  layer: Layer;
  style: BandStyle;
  expandedL1s: Set<string>;
  onToggleL1: (key: string) => void;
  onNavigateToCapability?: (layerId: string, l1Id: string, capId: string) => void;
}) {
  return (
    <div className="grid grid-cols-5 gap-1">
      {layer.l1_components.map((comp) => {
        const l1Key = `${layer.id}-${comp.id}`;
        const l1Open = expandedL1s.has(l1Key);
        return (
          <div
            key={comp.id}
            className="transition-all duration-150"
            style={{
              borderRadius: 8,
              border: `1px solid ${s.accent}${l1Open ? "50" : "30"}`,
              background: l1Open ? `${s.accent}15` : `${s.accent}08`,
              overflow: "hidden",
            }}
          >
            <div
              onClick={() => onToggleL1(l1Key)}
              className="cursor-pointer select-none"
              style={{
                padding: "8px 10px",
                display: "flex",
                alignItems: "center",
                gap: 5,
                borderBottom: l1Open ? `1px solid ${s.accent}25` : "none",
              }}
            >
              <span
                className="transition-transform duration-200 inline-block"
                style={{
                  fontSize: 11,
                  color: s.accent,
                  transform: l1Open ? "rotate(90deg)" : "rotate(0deg)",
                }}
              >
                &#9654;
              </span>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: s.fg,
                  flex: 1,
                  textAlign: "center",
                  fontFamily: SERIF,
                }}
              >
                {toTitleCase(comp.name)}
              </span>
              <span style={{ fontSize: 12, color: s.fg, opacity: 0.5 }}>
                {comp.l2_capabilities.length}
              </span>
            </div>
            {l1Open && (
              <div style={{ padding: "5px 10px 8px" }}>
                {comp.l2_capabilities.map((cap) => (
                  <CapLink
                    key={cap.id}
                    name={cap.name}
                    onClick={() => onNavigateToCapability?.(layer.id, comp.id, cap.id)}
                    style={{
                      fontSize: 13,
                      color: s.fg,
                      padding: "3px 6px",
                      lineHeight: 1.5,
                      borderLeft: `2px solid ${s.accent}30`,
                      paddingLeft: 8,
                      marginBottom: 2,
                    }}
                    hoverBg={`${s.accent}25`}
                    chevronSize={10}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Standard L1 list (non-pillars) ─── */

function StandardL1List({
  layer,
  style: s,
  expandedL1s,
  onToggleL1,
  onNavigateToCapability,
}: {
  layer: Layer;
  style: BandStyle;
  expandedL1s: Set<string>;
  onToggleL1: (key: string) => void;
  onNavigateToCapability?: (layerId: string, l1Id: string, capId: string) => void;
}) {
  return (
    <div className="flex flex-col gap-[5px]">
      {layer.l1_components.map((comp) => {
        const l1Key = `${layer.id}-${comp.id}`;
        const l1Open = expandedL1s.has(l1Key);
        return (
          <div
            key={comp.id}
            className="transition-all duration-150"
            style={{
              borderRadius: 8,
              border: `1px solid ${s.accent}${l1Open ? "40" : "20"}`,
              background: `${s.accent}${l1Open ? "10" : "05"}`,
              overflow: "hidden",
            }}
          >
            {/* L1 header */}
            <div
              onClick={() => onToggleL1(l1Key)}
              className="cursor-pointer select-none"
              style={{
                padding: "8px 14px",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span
                className="transition-transform duration-200 inline-block"
                style={{
                  fontSize: 11,
                  color: s.accent,
                  transform: l1Open ? "rotate(90deg)" : "rotate(0deg)",
                }}
              >
                &#9654;
              </span>
              <span style={{ fontSize: 15, fontWeight: 600, color: s.fg, fontFamily: SERIF }}>
                {toTitleCase(comp.name)}
              </span>
              <span className="flex-1" />
              {!l1Open && (
                <span
                  style={{
                    fontSize: 13,
                    padding: "3px 10px",
                    borderRadius: 10,
                    background: `${s.accent}15`,
                    color: s.fg,
                    opacity: 0.6,
                  }}
                >
                  {comp.l2_capabilities.length} capabilities
                </span>
              )}
            </div>
            {/* L2 capabilities */}
            {l1Open && (
              <div
                style={{
                  padding: "4px 14px 12px 34px",
                  borderTop: `1px solid ${s.accent}15`,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 6,
                }}
              >
                {comp.l2_capabilities.map((cap) => (
                  <CapLink
                    key={cap.id}
                    name={cap.name}
                    onClick={() => onNavigateToCapability?.(layer.id, comp.id, cap.id)}
                    style={{
                      fontSize: 14,
                      color: s.fg,
                      padding: "5px 12px",
                      borderRadius: 6,
                      background: `${s.accent}12`,
                      border: `1px solid ${s.accent}18`,
                    }}
                    hoverBg={`${s.accent}30`}
                    hoverBorder={`${s.accent}45`}
                    scale
                    chevronSize={11}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Governance Sidebar ─── */

function GovernanceSidebar({
  layer,
  govExpanded,
  onToggleGovL1,
  onNavigateToCapability,
}: {
  layer: Layer;
  govExpanded: Set<string>;
  onToggleGovL1: (key: string) => void;
  onNavigateToCapability?: (layerId: string, l1Id: string, capId: string) => void;
}) {
  return (
    <div
      className="flex-shrink-0 flex flex-col"
      style={{
        width: 320,
        background: PWC_DEEP,
        borderRadius: "0 12px 12px 0",
        padding: "18px 18px",
      }}
    >
      <div
        className="text-center font-bold mb-3 pb-2"
        style={{
          fontSize: 18,
          color: PWC_CREAM,
          letterSpacing: "0.04em",
          fontFamily: SERIF,
          borderBottom: `1px solid ${PWC_EMBER}40`,
        }}
      >
        Governance & Trust
      </div>

      <div className="flex-1 flex flex-col gap-[6px]">
        {layer.l1_components.map((comp) => {
          const isOpen = govExpanded.has(comp.id);
          return (
            <div
              key={comp.id}
              className="transition-all duration-150"
              style={{
                borderRadius: 6,
                border: `1px solid ${PWC_EMBER}${isOpen ? "40" : "20"}`,
                overflow: "hidden",
              }}
            >
              <div
                onClick={() => onToggleGovL1(comp.id)}
                className="cursor-pointer select-none"
                style={{
                  padding: "10px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: isOpen ? `${PWC_EMBER}10` : "transparent",
                }}
              >
                <span
                  className="transition-transform duration-200 inline-block"
                  style={{
                    fontSize: 9,
                    color: PWC_EMBER,
                    transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                  }}
                >
                  &#9654;
                </span>
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: PWC_CREAM,
                    flex: 1,
                    fontFamily: SERIF,
                  }}
                >
                  {toTitleCase(comp.name)}
                </span>
                <span style={{ fontSize: 13, color: `${PWC_CREAM}66` }}>
                  {comp.l2_capabilities.length}
                </span>
              </div>
              {isOpen && (
                <div style={{ padding: "4px 14px 10px" }}>
                  {comp.l2_capabilities.map((cap) => (
                    <CapLink
                      key={cap.id}
                      name={cap.name}
                      onClick={() => onNavigateToCapability?.(layer.id, comp.id, cap.id)}
                      style={{
                        fontSize: 14,
                        color: `${PWC_CREAM}AA`,
                        padding: "4px 6px",
                        lineHeight: 1.5,
                        borderLeft: `2px solid ${PWC_EMBER}30`,
                        paddingLeft: 10,
                        marginBottom: 2,
                      }}
                      hoverBg={`${PWC_EMBER}20`}
                      hoverColor={PWC_CREAM}
                      chevronSize={10}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Shared clickable L2 capability link ─── */

function CapLink({
  name,
  onClick,
  style,
  hoverBg,
  hoverBorder,
  hoverColor,
  scale,
  chevronSize = 10,
}: {
  name: string;
  onClick: () => void;
  style: React.CSSProperties;
  hoverBg: string;
  hoverBorder?: string;
  hoverColor?: string;
  scale?: boolean;
  chevronSize?: number;
}) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <span
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="cursor-pointer"
      style={{
        ...style,
        display: "inline-block",
        borderRadius: style.borderRadius || 4,
        background: hovered ? hoverBg : (style.background as string) || "transparent",
        border: hoverBorder && hovered ? `1px solid ${hoverBorder}` : (style.border as string) || undefined,
        color: hoverColor && hovered ? hoverColor : (style.color as string),
        opacity: hovered ? 1 : 0.85,
        transform: scale && hovered ? "scale(1.03)" : undefined,
        transition: "all 0.15s ease",
      }}
    >
      {toTitleCase(name)}
      <span style={{ fontSize: chevronSize, marginLeft: 4, opacity: hovered ? 0.7 : 0.35 }}>›</span>
    </span>
  );
}
