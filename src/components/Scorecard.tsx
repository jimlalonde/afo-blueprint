"use client";

import { useState, useMemo, useCallback } from "react";
import { BlueprintData, Assessments } from "@/types";
import { LAYER_COLORS, LAYER_NAMES, STAGE_NAMES } from "@/lib/constants";

interface Props {
  data: BlueprintData;
  assessments: Assessments;
}

interface Stats {
  assessed: number;
  avgScore: number;
  gapCount: number;
  layerScores: Record<string, { score: number; assessed: number; total: number }>;
}

async function generatePdf(data: BlueprintData, assessments: Assessments, stats: Stats) {
  const { jsPDF } = await import("jspdf");
  const autoTable = (await import("jspdf-autotable")).default;

  const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 40;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const pwcOrange = "#D04A02";

  // Header bar
  doc.setFillColor(pwcOrange);
  doc.rect(0, 0, pageWidth, 56, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text("AFO Capability Blueprint", margin, 36);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Assessment Report", pageWidth - margin, 36, { align: "right" });

  y = 76;

  // Date
  doc.setFontSize(9);
  doc.setTextColor(136, 135, 128);
  doc.text(
    `Generated ${new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}`,
    margin, y
  );
  y += 24;

  // Summary cards
  const cardData = [
    { value: stats.avgScore.toFixed(1), label: "Avg. current stage" },
    { value: String(stats.assessed), label: "Assessed" },
    { value: String(123 - stats.assessed), label: "Remaining" },
    { value: String(stats.gapCount), label: "Gaps" },
  ];
  const cardW = (contentWidth - 18) / 4;
  const cardH = 48;
  cardData.forEach((card, i) => {
    const x = margin + i * (cardW + 6);
    doc.setFillColor(245, 244, 240);
    doc.roundedRect(x, y, cardW, cardH, 4, 4, "F");
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(26, 26, 24);
    doc.text(card.value, x + cardW / 2, y + 22, { align: "center" });
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(136, 135, 128);
    doc.text(card.label, x + cardW / 2, y + 36, { align: "center" });
  });
  y += cardH + 20;

  // Layer breakdown section
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(26, 26, 24);
  doc.text("Assessment by layer", margin, y);
  y += 14;

  const layerTableBody: string[][] = [];
  for (const layer of data.layers) {
    const ls = stats.layerScores[layer.id];
    const layerName = LAYER_NAMES[layer.id] || layer.name;
    layerTableBody.push([
      layerName,
      ls.assessed > 0 ? ls.score.toFixed(1) : "—",
      `${ls.assessed} / ${ls.total}`,
    ]);
  }

  autoTable(doc, {
    startY: y,
    margin: { left: margin, right: margin },
    head: [["Layer", "Avg. stage", "Assessed / Total"]],
    body: layerTableBody,
    styles: { fontSize: 8, cellPadding: 5, textColor: [26, 26, 24] },
    headStyles: { fillColor: [208, 74, 2], textColor: [255, 255, 255], fontStyle: "bold", fontSize: 8 },
    alternateRowStyles: { fillColor: [245, 244, 240] },
    columnStyles: {
      0: { cellWidth: contentWidth * 0.5 },
      1: { cellWidth: contentWidth * 0.25, halign: "center" },
      2: { cellWidth: contentWidth * 0.25, halign: "center" },
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  y = (doc as any).lastAutoTable.finalY + 20;

  // Capability details
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(26, 26, 24);
  doc.text("Capability details", margin, y);
  y += 14;

  const capTableBody: string[][] = [];
  for (const layer of data.layers) {
    const layerName = LAYER_NAMES[layer.id] || layer.name;
    for (const l1 of layer.l1_components) {
      for (const l2 of l1.l2_capabilities) {
        const a = assessments[l2.id];
        if (!a?.current && !a?.target) continue;
        const current = a?.current ? `${a.current} - ${STAGE_NAMES[a.current]}` : "—";
        const target = a?.target ? `${a.target} - ${STAGE_NAMES[a.target]}` : "—";
        const gap = a?.current && a?.target && a.target > a.current ? `+${a.target - a.current}` : "";
        capTableBody.push([layerName, l2.name, current, target, gap, a?.notes || ""]);
      }
    }
  }

  if (capTableBody.length > 0) {
    autoTable(doc, {
      startY: y,
      margin: { left: margin, right: margin },
      head: [["Layer", "Capability", "Current", "Target", "Gap", "Notes"]],
      body: capTableBody,
      styles: { fontSize: 7, cellPadding: 4, textColor: [26, 26, 24], overflow: "linebreak" },
      headStyles: { fillColor: [208, 74, 2], textColor: [255, 255, 255], fontStyle: "bold", fontSize: 7 },
      alternateRowStyles: { fillColor: [245, 244, 240] },
      columnStyles: {
        0: { cellWidth: 70 },
        1: { cellWidth: 120 },
        2: { cellWidth: 65, halign: "center" },
        3: { cellWidth: 65, halign: "center" },
        4: { cellWidth: 30, halign: "center" },
        5: { cellWidth: contentWidth - 350 },
      },
    });
  }

  // Footer on every page
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(170, 170, 170);
    const footerY = doc.internal.pageSize.getHeight() - 20;
    doc.text(
      `© ${new Date().getFullYear()} PwC. All rights reserved. This report was generated from the AFO Capability Blueprint tool.`,
      pageWidth / 2,
      footerY,
      { align: "center" }
    );
    doc.text(`Page ${i} of ${pageCount}`, pageWidth - margin, footerY, { align: "right" });
  }

  doc.save("AFO_Assessment_Report.pdf");
}

export default function Scorecard({ data, assessments }: Props) {
  const [open, setOpen] = useState(false);
  const [generating, setGenerating] = useState(false);

  const handleCreateReport = useCallback(async (s: Stats) => {
    setGenerating(true);
    try {
      await generatePdf(data, assessments, s);
    } finally {
      setGenerating(false);
    }
  }, [data, assessments]);

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

          <div className="mt-3.5 pt-3 border-t border-bd flex items-center gap-2">
            <span className="text-[11px] text-tx3 flex-1">
              Download assessment results as a PDF report
            </span>
            <button
              onClick={() => handleCreateReport(stats)}
              disabled={generating}
              className="text-xs font-medium px-4 py-1.5 rounded-md border bg-bg2 text-tx border-bd hover:border-bd2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {generating ? "Creating..." : "Create report"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
