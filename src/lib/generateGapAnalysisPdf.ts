import type { BlueprintData, Assessments } from "@/types";
import { LAYER_NAMES, STAGE_NAMES } from "@/lib/constants";

interface LayerAssessment {
  title: string;
  avg: string;
  capabilities: string[][];
  keyFinding: string;
}

interface Priority {
  title: string;
  gap: string;
  impact: string;
  recommendation: string;
}

interface GapAnalysisContent {
  clientName: string;
  overallAvg: string;
  stageCounts: { stage: string; count: number; pct: string }[];
  summaryParagraph: string;
  strengthsLine: string;
  gapsLine: string;
  architectureStack: string[][];
  layerAssessments: LayerAssessment[];
  functionalPillarsSummary: string[];
  priorities: Priority[];
  roadmap: string[][];
  disclaimer: string;
}

function computeContent(data: BlueprintData, assessments: Assessments): GapAnalysisContent {
  let totalAssessed = 0;
  let totalScore = 0;
  const counts: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 };

  for (const layer of data.layers) {
    for (const l1 of layer.l1_components) {
      for (const l2 of l1.l2_capabilities) {
        const a = assessments[l2.id];
        if (a?.current != null) {
          totalAssessed++;
          totalScore += a.current;
          counts[a.current] = (counts[a.current] || 0) + 1;
        }
      }
    }
  }

  const overallAvg = totalAssessed > 0 ? (totalScore / totalAssessed).toFixed(1) : "0.0";

  const stageCounts = [0, 1, 2, 3, 4]
    .filter((s) => counts[s] > 0)
    .map((s) => ({
      stage: `Stage ${s}: ${STAGE_NAMES[s]}`,
      count: counts[s],
      pct: totalAssessed > 0 ? `${Math.round((counts[s] / totalAssessed) * 100)}%` : "0%",
    }));

  const layerAssessments: LayerAssessment[] = [];
  for (const layer of data.layers) {
    if (layer.id === "functional_pillars") continue;
    let ls = 0, lc = 0;
    const caps: string[][] = [];
    for (const l1 of layer.l1_components) {
      for (const l2 of l1.l2_capabilities) {
        const a = assessments[l2.id];
        const stage = a?.current != null ? a.current : -1;
        if (stage >= 0) { ls += stage; lc++; }
        caps.push([
          l2.name,
          stage >= 0 ? `Stage ${stage}` : "-",
          a?.notes?.replace(/\u2014/g, " - ").replace(/\u2013/g, "-").replace(/\u2192/g, "->").replace(/\u2019/g, "'") || "-",
        ]);
      }
    }
    const avg = lc > 0 ? (ls / lc).toFixed(1) : "0.0";
    const layerName = LAYER_NAMES[layer.id] || layer.name;

    const keyFindings: Record<string, string> = {
      experience: "CCEX and Apigee provide the web/API backbone, but Marketo email is fragmented across 6 instances with no cross-SBG measurement. Adobe Analytics is non-functional, leaving marketers blind on content engagement and lead intent. Gaps remain in conversational, agentic, and advanced paid media channels.",
      orchestration_aeo: "The single largest gap area. 6 Marketo instances and 4–5 SFDC instances mean no unified customer journey exists. Without a CDP or identity layer, orchestration across touchpoints is impossible. Every cross-system, cross-SBG interaction is manual or hard-coded.",
      content_operations_ico: "Largely greenfield. AEM and Marketo provide starting points, but sales enablement content is siloed by SBG — no cross-portfolio selling material. Content production bottlenecks any personalization or multi-channel strategy.",
      commercial_brain: "The entire AI/ML infrastructure layer needs to be established. With 38 integrations at risk in the S/4 migration, the integration layer itself needs to be re-architected before AI capabilities can be layered on top.",
      enterprise_data: "Strong plumbing (Informatica, Apigee) but the critical gap is customer data unification. No CDP or identity layer — data fragmented across 4–5 SFDC instances, 6 Marketo instances, SAP ECC, and Hybris. E-commerce blocked by disparate entitlements.",
      governance_trust: "Basic platform-level governance exists but nothing AI or agent-specific. Governance will need to be stood up in parallel with AI/agent deployment.",
    };

    layerAssessments.push({
      title: layerName,
      avg,
      capabilities: caps,
      keyFinding: keyFindings[layer.id] || "",
    });
  }

  const functionalPillarsSummary = [
    "Marketing (Avg: 0.7) — 6 Marketo instances at varying maturity; campaigns can't be consolidated or measured cross-SBG. Adobe Analytics broken — no person-centric tracking. No CDP, no unified lead scoring, no cross-SBG attribution.",
    "Sales (Avg: 1.3) — 4–5 CRM instances with no unified customer record. No enterprise CPQ — reps in some SBGs manually build quotes in Excel. Pricing rules in spreadsheets. No shared forecasting or cross-SBG pipeline visibility.",
    "Commerce (Avg: 1.6) — Functional B2B/B2C storefronts, but 52+ friction points from inquiry to order. Manual order re-entry across ERP, CRM, and portal. Account hierarchy disconnected.",
    "Service (Avg: 1.3) — Stage 2 routing and case management, but agents open 3 tabs to answer one question. Returns and warranty fully manual. No renewal or expansion triggers across SBG portfolio.",
    "Pricing (Avg: 2.2) — Strongest area. ML-driven dynamic pricing (Stage 3). CPQ and subscription billing at Stage 2. One of the few capabilities approaching unified maturity.",
  ];

  const priorities: Priority[] = [
    {
      title: "Customer Data Unification",
      gap: "Customer data fragmented across 4–5 CRM instances, 6 marketing automation instances, ERP, and commerce platforms with no unified view. No CDP or identity layer. E-commerce blocked by disparate customer entitlements.",
      impact: "Blocks personalization, segmentation, journey orchestration, cross-SBG selling, and any agentic use case that needs customer context. Referenced as the root cause across nearly every pain point.",
      recommendation: "Deploy a customer data platform (CDP) as the near-term unification hub — enabling data consolidation without dependency on the S/4HANA migration timeline. Establish a unified identity graph and consent framework.",
    },
    {
      title: "Marketing & Analytics Stabilization",
      gap: "6 marketing automation instances at varying maturity that cannot be consolidated or measured. Web analytics is non-functional — no hit-level data, no person-centric tracking, browser-level only.",
      impact: "Marketers are blind on content engagement and lead intent. No cross-SBG campaign attribution, audience measurement, or lead scoring. Cannot measure marketing ROI.",
      recommendation: "Stabilize the analytics platform as a foundational prerequisite (audit and remediate tracking rules). Consolidate marketing automation into a unified instance with common lead scoring connected to the CDP.",
    },
    {
      title: "Sales Process Unification & CPQ",
      gap: "4–5 CRM instances with no unified customer record. No enterprise CPQ — reps manually build quotes in Excel. Pricing rules in spreadsheets per SBG. Quote approvals routed by email with no status visibility.",
      impact: "52+ friction points from inquiry to order. Reps can't self-serve accurate pricing. No cross-SBG pipeline visibility or shared forecasting. Credit issues surface at order stage.",
      recommendation: "Consolidate CRM toward a unified pipeline with shared forecasting. Deploy guided CPQ to replace manual quoting. Standardize pricing playbooks and commercial policies. Automate credit checks at account creation.",
    },
    {
      title: "Integration Re-architecture",
      gap: "38 cataloged integrations, many siloed and undocumented. ECC → S/4HANA migration will break critical front-office connections. Business partner model changes ripple across all downstream systems.",
      impact: "Lift-and-shift will replicate today's failure modes into S/4. Point-to-point rebuild perpetuates fragmentation.",
      recommendation: "Re-architect and consolidate integrations into a unified API layer aligned to the business partner model. Design integration patterns for all SBGs so the architecture scales.",
    },
    {
      title: "AI/Agent Foundation & Experience Modernization",
      gap: "No GenAI, ML, or agent infrastructure. 25 of 26 Commercial Brain capabilities are Stage 0. No conversational channels or agentic touchpoints.",
      impact: "Cannot deploy any agentic use cases. Customer experience limited to web portal and API.",
      recommendation: "Start with a managed AI platform leveraging existing ecosystem investments. Begin with targeted use cases in Sales and Service where CRM data already exists. Layer conversational AI on existing platforms as initial agentic touchpoints.",
    },
  ];

  const roadmap = [
    ["1 — Fix & Stabilize", "Months 0–12", "Stabilize foundations & unify data", "Analytics remediation, marketing automation consolidation, unified CRM pipeline, CPQ deployment, CDP as data hub, standard commercial policies, S/4 integration assessment"],
    ["2 — Modernize", "Months 12–36", "Connect systems & enable intelligence", "Unified customer profile via CDP, identity graph and privacy framework, B2B commerce transformation, integration re-architecture, customer health scoring, proactive service"],
    ["3 — Scale Agentic", "Months 36–60", "Progressive autonomy & AI-driven ops", "AI sales coaching, predictive segmentation, agentic orchestration (touchless quote-to-cash), connected asset telemetry, outcome-based agreements"],
  ];

  const architectureStack = [
    ["SAP ECC", "System of record (SD, Billing, FI/CO)", "All", "Enterprise Data, Pricing, Commerce"],
    ["SAP Hybris", "B2B/B2C digital commerce storefronts", "SPS, HPS", "Experience, Commerce"],
    ["Adobe Experience Manager", "Web content management", "SPS", "Experience, ICO"],
    ["Adobe Analytics", "Web analytics (currently broken)", "All", "Marketing, AEO"],
    ["Marketo", "Marketing automation (6 instances, varying maturity)", "SPS, HPS, HCE", "Marketing, AEO, Experience"],
    ["PROS", "ML-driven dynamic pricing", "SPS, HPS", "Pricing"],
    ["Salesforce CRM", "Lead, opportunity, account mgmt (4–5 instances)", "SPS, HPS, HCE", "Sales"],
    ["Salesforce CPQ (Steelbrick)", "Configure-price-quote", "SPS", "Sales, Pricing"],
    ["SAP CPQ", "Complex configuration with engineering rules", "SPS, HPS, HCE", "Sales, Pricing"],
    ["Salesforce Service Cloud", "Case management, service contracts", "All", "Service"],
    ["Salesforce Field Service", "Work orders, scheduling, dispatching", "All", "Service"],
    ["SalesLogix", "Legacy CRM", "HCE", "Sales"],
    ["Informatica IICS", "Data integration, MDM, data governance", "All", "Enterprise Data"],
    ["Google Apigee", "API management, gateway, security", "All", "Enterprise Data, Experience"],
    ["Zuora", "Subscription billing, rate plans", "SPS, HPS", "Pricing"],
    ["Honeywell CCEX", "Custom unified portal, micro frontends", "All", "Experience"],
    ["SAP BW / S4HANA", "Reporting, analytics", "All", "Enterprise Data"],
  ];

  return {
    clientName: "Honeywell",
    overallAvg,
    stageCounts,
    summaryParagraph: "Honeywell's front office operates across three distinct tech stacks — SPS, HPS, and legacy HCE — with significant fragmentation: 4–5 CRM instances, 6 marketing automation instances at varying maturity, and broken web analytics (no person-centric tracking). A value stream mapping exercise identified 52+ friction points from customer inquiry to order fulfillment, and 38 cataloged integrations are at risk in the upcoming ECC → S/4HANA migration. No agentic, GenAI, or AI-native capabilities are deployed.",
    strengthsLine: "Strongest: Enterprise Data Foundation (integration infrastructure), Pricing (ML-driven dynamic pricing + CPQ + subscription billing), and Commerce (functional B2B/B2C storefronts).",
    gapsLine: "Largest gaps: Customer data unification (no CDP), Agentic Orchestration, Commercial Brain, and fragmented marketing/sales systems across SBGs.",
    architectureStack,
    layerAssessments,
    functionalPillarsSummary,
    priorities,
    roadmap,
    disclaimer: "This assessment is based on the Enterprise Context architecture diagram, the HON IA-HPS Commercial System Landscape diagram, and the Executive Briefing deck. Ratings should be validated during facilitated assessment workshops with Honeywell stakeholders.",
  };
}

export async function generateGapAnalysisPdf(data: BlueprintData, assessments: Assessments) {
  const { jsPDF } = await import("jspdf");
  const autoTable = (await import("jspdf-autotable")).default;
  const content = computeContent(data, assessments);

  const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
  const pw = doc.internal.pageSize.getWidth();
  const ph = doc.internal.pageSize.getHeight();
  const m = 40;
  const cw = pw - m * 2;
  const textW = cw - 20; // safe text width with buffer

  const honRed = "#CF202F";
  const honRedRgb: [number, number, number] = [207, 32, 47];
  const darkText: [number, number, number] = [26, 26, 24];
  const mutedText: [number, number, number] = [120, 120, 120];
  const bgCard: [number, number, number] = [245, 245, 245];

  function toTitleCase(str: string) {
    return str.replace(/\b\w/g, (c) => c.toUpperCase());
  }

  function sanitize(str: string) {
    return str
      .replace(/\u2014/g, " - ")   // em-dash
      .replace(/\u2013/g, "-")     // en-dash
      .replace(/\u2019/g, "'")     // right single quote
      .replace(/\u2018/g, "'")     // left single quote
      .replace(/\u201C/g, '"')     // left double quote
      .replace(/\u201D/g, '"')     // right double quote
      .replace(/\u2192/g, "->")    // right arrow
      .replace(/\u2190/g, "<-")    // left arrow
      .replace(/\u2026/g, "...");  // ellipsis
  }

  function drawHeader(title: string, subtitle?: string) {
    doc.setFillColor(honRed);
    doc.rect(0, 0, pw, 56, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    doc.text(toTitleCase(title), m, 36);
    if (subtitle) {
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(subtitle, pw - m, 36, { align: "right" });
    }
  }

  function drawFooter() {
    const pages = doc.getNumberOfPages();
    for (let i = 1; i <= pages; i++) {
      doc.setPage(i);
      doc.setFontSize(7);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(170, 170, 170);
      const fy = ph - 20;
      doc.text(
        `Confidential — prepared for ${content.clientName}`,
        pw / 2, fy, { align: "center" }
      );
      doc.text(`Page ${i} of ${pages}`, pw - m, fy, { align: "right" });
    }
  }

  // ─── COVER PAGE ───
  doc.setFillColor(0, 0, 0);
  doc.rect(0, 0, pw, ph, "F");

  // Red accent bar at top
  doc.setFillColor(...honRedRgb);
  doc.rect(0, 0, pw, 8, "F");

  // White content card
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(m + 40, m + 40, cw - 80, ph - m * 2 - 80, 4, 4, "F");

  let y = ph * 0.3;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(32);
  doc.setTextColor(...honRedRgb);
  doc.text("AFO Capability", pw / 2, y, { align: "center" });
  y += 40;
  doc.setTextColor(...darkText);
  doc.text("Gap Analysis", pw / 2, y, { align: "center" });

  y += 50;
  doc.setFillColor(...honRedRgb);
  doc.rect(pw / 2 - 30, y, 60, 3, "F");
  y += 30;

  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...darkText);
  doc.text(content.clientName, pw / 2, y, { align: "center" });

  y += 50;
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...mutedText);
  doc.text(
    `Prepared by PwC Agentic Front Office Practice`,
    pw / 2, y, { align: "center" }
  );
  y += 18;
  doc.text(
    new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    pw / 2, y, { align: "center" }
  );

  y = ph - m - 60;
  doc.setFontSize(8);
  doc.setTextColor(170, 170, 170);
  doc.text("Confidential", pw / 2, y, { align: "center" });

  // ─── EXECUTIVE SUMMARY ───
  doc.addPage();
  drawHeader("Executive Summary", content.clientName);
  y = 80;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(...darkText);
  const summaryLines = doc.splitTextToSize(sanitize(content.summaryParagraph), textW);
  doc.text(summaryLines, m, y, { lineHeightFactor: 1.5 });
  y += summaryLines.length * 14.5 + 20;

  // Maturity distribution bar
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Maturity Distribution", m, y);
  y += 14;

  const barH = 28;
  const totalCaps = content.stageCounts.reduce((s, c) => s + c.count, 0);
  const stageColors: Record<string, [number, number, number]> = {
    "Stage 0": [207, 32, 47],
    "Stage 1": [160, 160, 160],
    "Stage 2": [80, 80, 80],
    "Stage 3": [26, 26, 24],
    "Stage 4": [0, 0, 0],
  };
  let barX = m;
  for (const sc of content.stageCounts) {
    const w = (sc.count / totalCaps) * cw;
    const stageKey = sc.stage.split(":")[0];
    const color = stageColors[stageKey] || [136, 135, 128];
    doc.setFillColor(...color);
    doc.rect(barX, y, w, barH, "F");
    if (w > 40) {
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(255, 255, 255);
      doc.text(`${sc.count} (${sc.pct})`, barX + w / 2, y + barH / 2 + 3, { align: "center" });
    }
    barX += w;
  }
  y += barH + 8;

  // Legend
  doc.setFontSize(7);
  let legX = m;
  for (const sc of content.stageCounts) {
    const stageKey = sc.stage.split(":")[0];
    const color = stageColors[stageKey] || [136, 135, 128];
    doc.setFillColor(...color);
    doc.rect(legX, y, 8, 8, "F");
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...darkText);
    doc.text(sc.stage, legX + 12, y + 7);
    legX += doc.getTextWidth(sc.stage) + 22;
  }
  y += 24;

  // Summary stats
  const summaryCards = [
    { value: content.overallAvg, label: "Overall avg. maturity" },
    { value: String(totalCaps), label: "Capabilities assessed" },
    { value: String(123 - totalCaps), label: "Remaining" },
  ];
  const scW = (cw - 16) / 3;
  summaryCards.forEach((card, i) => {
    const cx = m + i * (scW + 8);
    doc.setFillColor(...bgCard);
    doc.roundedRect(cx, y, scW, 44, 4, 4, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(...darkText);
    doc.text(card.value, cx + scW / 2, y + 20, { align: "center" });
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...mutedText);
    doc.text(card.label, cx + scW / 2, y + 34, { align: "center" });
  });
  y += 62;

  // Strengths and gaps
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...darkText);
  doc.text("Key takeaways", m, y);
  y += 14;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  const sLines = doc.splitTextToSize(sanitize(content.strengthsLine), textW - 10);
  doc.text(sLines, m + 10, y);
  y += sLines.length * 12 + 6;
  const gLines = doc.splitTextToSize(sanitize(content.gapsLine), textW - 10);
  doc.text(gLines, m + 10, y);

  // ─── ARCHITECTURE STACK ───
  doc.addPage();
  drawHeader("Current Architecture Stack", content.clientName);
  y = 80;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...darkText);
  doc.text("Platform Landscape", m, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...mutedText);
  doc.text("Platforms identified across SPS, HPS, and HCE tech stacks", m, y + 10);
  y += 24;

  autoTable(doc, {
    startY: y,
    margin: { left: m, right: m },
    head: [["Platform", "Role", "Stacks", "Layers Served"]],
    body: content.architectureStack,
    styles: { fontSize: 7.5, cellPadding: 5, textColor: darkText, overflow: "linebreak" },
    headStyles: { fillColor: honRedRgb, textColor: [255, 255, 255], fontStyle: "bold", fontSize: 7.5 },
    alternateRowStyles: { fillColor: bgCard },
    columnStyles: {
      0: { cellWidth: cw * 0.18, fontStyle: "bold" },
      1: { cellWidth: cw * 0.35 },
      2: { cellWidth: cw * 0.15, halign: "center" },
      3: { cellWidth: cw * 0.32 },
    },
  });

  // ─── LAYER ASSESSMENTS ───
  for (const la of content.layerAssessments) {
    doc.addPage();
    drawHeader(`${toTitleCase(la.title)} Layer`, content.clientName);
    y = 80;

    // Layer avg badge
    doc.setFillColor(...bgCard);
    doc.roundedRect(m, y - 6, 100, 24, 4, 4, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...darkText);
    doc.text(`Avg: ${la.avg}`, m + 50, y + 10, { align: "center" });
    y += 30;

    autoTable(doc, {
      startY: y,
      margin: { left: m, right: m },
      head: [["Capability", "Stage", "Notes"]],
      body: la.capabilities,
      styles: { fontSize: 7.5, cellPadding: 5, textColor: darkText, overflow: "linebreak" },
      headStyles: { fillColor: honRedRgb, textColor: [255, 255, 255], fontStyle: "bold", fontSize: 7.5 },
      alternateRowStyles: { fillColor: bgCard },
      columnStyles: {
        0: { cellWidth: cw * 0.25 },
        1: { cellWidth: cw * 0.1, halign: "center" },
        2: { cellWidth: cw * 0.65 },
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    y = (doc as any).lastAutoTable.finalY + 16;

    if (la.keyFinding) {
      // Check if we need to stay on same page
      if (y + 80 > ph - 40) {
        doc.addPage();
        drawHeader(`${toTitleCase(la.title)} Layer (cont.)`, content.clientName);
        y = 80;
      }
      doc.setFillColor(255, 245, 245);
      doc.setDrawColor(...honRedRgb);
      const findingLines = doc.splitTextToSize(sanitize(la.keyFinding), cw - 40);
      const boxH = findingLines.length * 11 + 24;
      doc.roundedRect(m, y, cw, boxH, 4, 4, "FD");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(...honRedRgb);
      doc.text("Key Finding", m + 12, y + 14);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(...darkText);
      doc.text(findingLines, m + 12, y + 26);
    }
  }

  // ─── FUNCTIONAL PILLARS ───
  doc.addPage();
  drawHeader("Functional Pillars", content.clientName);
  y = 80;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...darkText);
  doc.text("Pillar Summary — Avg: 1.2", m, y);
  y += 18;

  const pillarColors: [number, number, number][] = [
    [207, 32, 47],
    [140, 30, 40],
    [80, 80, 80],
    [50, 50, 50],
    [26, 26, 24],
  ];

  for (let i = 0; i < content.functionalPillarsSummary.length; i++) {
    const text = content.functionalPillarsSummary[i];
    const pillarName = text.split("—")[0].split("(")[0].trim();
    const lines = doc.splitTextToSize(sanitize(text), cw - 40);
    const bh = lines.length * 11 + 18;

    if (y + bh > ph - 50) {
      doc.addPage();
      drawHeader("Functional Pillars (cont.)", content.clientName);
      y = 80;
    }

    doc.setFillColor(...bgCard);
    doc.roundedRect(m, y, cw, bh, 4, 4, "F");
    doc.setFillColor(...pillarColors[i]);
    doc.rect(m, y, 4, bh, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...pillarColors[i]);
    doc.text(pillarName, m + 14, y + 13);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...darkText);
    const bodyText = text.substring(text.indexOf("\u2014") + 2);
    const bodyLines = doc.splitTextToSize(sanitize(bodyText), cw - 50);
    doc.text(bodyLines, m + 14, y + 13 + (bodyLines.length > 1 ? 12 : 12));

    y += bh + 8;
  }

  // ─── PRIORITIES ───
  doc.addPage();
  drawHeader("Top Gaps & Opportunities", content.clientName);
  y = 80;

  const labelX = m + 30;
  const bodyX = m + 30 + 50;
  const bodyW = cw - 120;

  for (let i = 0; i < content.priorities.length; i++) {
    const p = content.priorities[i];
    const gapBody = doc.splitTextToSize(sanitize(p.gap), bodyW);
    const impBody = doc.splitTextToSize(sanitize(p.impact), bodyW);
    const recBody = doc.splitTextToSize(sanitize(p.recommendation), bodyW);
    const totalH = (gapBody.length + impBody.length + recBody.length) * 11 + 60;

    if (y + totalH > ph - 50) {
      doc.addPage();
      drawHeader("Top Gaps & Opportunities (cont.)", content.clientName);
      y = 80;
    }

    // Priority number circle
    doc.setFillColor(...honRedRgb);
    doc.circle(m + 12, y + 12, 10, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(255, 255, 255);
    doc.text(String(i + 1), m + 12, y + 16, { align: "center" });

    // Priority title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...darkText);
    doc.text(p.title, m + 30, y + 16);

    // Separator line under title
    y += 26;
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.5);
    doc.line(labelX, y, m + cw - 10, y);
    y += 14;

    // Gap
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...honRedRgb);
    doc.text("Gap:", labelX, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...darkText);
    doc.text(gapBody, bodyX, y);
    y += gapBody.length * 11 + 8;

    // Impact
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...honRedRgb);
    doc.text("Impact:", labelX, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...darkText);
    doc.text(impBody, bodyX, y);
    y += impBody.length * 11 + 8;

    // Action
    doc.setFont("helvetica", "bold");
    doc.setTextColor(40, 40, 40);
    doc.text("Action:", labelX, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...darkText);
    doc.text(recBody, bodyX, y);
    y += recBody.length * 11 + 24;
  }

  // ─── ROADMAP ───
  doc.addPage();
  drawHeader("Recommended Roadmap", content.clientName);
  y = 80;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...darkText);
  doc.text("Transformation Roadmap — Three Horizons", m, y);
  y += 18;

  // Visual timeline
  const phaseW = (cw - 16) / 3;
  const phaseH = 120;
  const phaseColors: [number, number, number][] = [
    [207, 32, 47],
    [80, 80, 80],
    [26, 26, 24],
  ];

  for (let i = 0; i < content.roadmap.length; i++) {
    const [phase, timeframe, theme, focus] = content.roadmap[i];
    const px = m + i * (phaseW + 8);

    doc.setFillColor(...phaseColors[i]);
    doc.roundedRect(px, y, phaseW, 28, 4, 4, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text(`Phase ${phase.charAt(0)}`, px + phaseW / 2, y + 12, { align: "center" });
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.text(timeframe, px + phaseW / 2, y + 22, { align: "center" });

    doc.setFillColor(...bgCard);
    doc.roundedRect(px, y + 32, phaseW, phaseH - 32, 4, 4, "F");
    doc.setFillColor(...phaseColors[i]);
    doc.rect(px, y + 32, phaseW, 3, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...phaseColors[i]);
    const themeLines = doc.splitTextToSize(sanitize(theme), phaseW - 24);
    doc.text(themeLines, px + 8, y + 48);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(...darkText);
    const focusLines = doc.splitTextToSize(sanitize(focus), phaseW - 24);
    doc.text(focusLines, px + 8, y + 48 + themeLines.length * 10 + 6);
  }

  y += phaseH + 30;

  // Disclaimer
  doc.setFont("helvetica", "italic");
  doc.setFontSize(7);
  doc.setTextColor(...mutedText);
  const discLines = doc.splitTextToSize(sanitize(content.disclaimer), textW);
  doc.text(discLines, m, y);

  // Draw footers on all pages
  drawFooter();

  doc.save(`${content.clientName}_AFO_Gap_Analysis.pdf`);
}
