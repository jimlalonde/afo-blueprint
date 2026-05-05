# Honeywell — AFO Capability Gap Analysis

**Date:** May 2026
**Prepared by:** PwC Agentic Front Office Practice
**Assessment basis:** Enterprise Context architecture diagram, HON IA-HPS Commercial System Landscape, and Executive Briefing deck (current state)

---

## Executive Summary

Honeywell's front office operates across **three distinct tech stacks** — SPS, HPS, and legacy HCE — with significant fragmentation: **4–5 Salesforce instances**, **6 Marketo instances** at varying maturity, and **broken Adobe Analytics** (hit-level data missing, no person-centric tracking). A value stream mapping exercise identified **52+ friction points** from customer inquiry to order fulfillment, and **38 cataloged integrations are at risk** in the upcoming ECC → S/4HANA migration.

Despite this complexity, the architecture is not without depth. Marketo provides marketing automation foundations (though fragmented), PROS delivers ML-driven dynamic pricing in SPS and HPS, and Adobe Experience Manager powers the SPS Automation Site. However, **no agentic, GenAI, or AI-native capabilities** are deployed, and the multi-instance fragmentation directly contradicts the "One Honeywell, One Customer Experience" vision articulated in the LTC guiding principles.

**Overall current-state maturity: 0.7 avg (Stage 0–1)**

Of 123 L2 capabilities assessed:
- **62 (50%)** rated Stage 0 — Not established
- **37 (30%)** rated Stage 1 — Distributed
- **23 (19%)** rated Stage 2 — Functional
- **1 (1%)** rated Stage 3 — Unified (PROS dynamic pricing)

The strongest capabilities are in **Enterprise Data Foundation** (integration infrastructure, data management) and **Pricing** (PROS + CPQ + Zuora). The largest gaps are in **Agentic Orchestration**, **Commercial Brain**, **Intelligent Content Operations**, and **customer data unification** — the absence of a CDP or identity layer blocks personalization, segmentation, and any agentic use case requiring customer context.

---

## The Problem: Fragmented, Manual, and Misaligned

The executive presentation frames the current state through five systemic failures:

| Dimension | Key Pain Points |
|---|---|
| **Fragmented Data & Systems** | 4–5 Salesforce instances with no unified customer record across SBGs. 6 Marketo instances at varying maturity — campaigns can't be consolidated or measured. No CDP. Swivel-chair activities across ERP, CRM, and portals. |
| **Broken Integration Architecture** | 38 cataloged integrations, many siloed and undocumented. ECC → S/4HANA migration will break critical front-office connections. Business partner model changes ripple across all front-office systems. |
| **Customer Experience Failures** | Credit limits not set at onboarding create downstream order blocks. No touchless process flow from inquiry to fulfillment. Account hierarchy disconnected — manual patching at order time. |
| **Commercial Misalignment** | SBGs operating in silos — competing rather than cross-selling. No pull-through incentive model. Adobe Analytics broken: no person-centric analytics, browser-level tracking only. |
| **Post-Purchase Gaps** | No single customer record — agents open 3 tabs to answer one question. Returns and warranty fully manual. No renewal or expansion triggers across SBG portfolio. |

---

## Current Architecture Stack

| Platform | Role | Stacks | Layers Served |
|---|---|---|---|
| **SAP ECC** | System of record (SD, MM/LE, PP/QM, Billing, FI/CO, QM/PM) | All | Enterprise Data, Pricing, Commerce |
| **SAP Hybris Commerce Cloud** | B2B/B2C digital commerce storefronts | SPS, HPS | Experience, Commerce |
| **Adobe Experience Manager** | Web content management (Automation Site) | SPS | Experience, ICO |
| **Adobe Analytics** | Web analytics (currently broken — hit-level data missing) | All | Marketing, AEO |
| **Marketo** | Marketing automation (6 instances, varying maturity) | SPS, HPS, HCE | Marketing, AEO, Experience |
| **PROS** | ML-driven dynamic pricing optimization | SPS, HPS | Pricing |
| **Salesforce CRM** | Lead, opportunity, account management (4–5 instances) | SPS, HPS, HCE | Sales |
| **Salesforce CPQ (Steelbrick)** | Configure-price-quote | SPS | Sales, Pricing |
| **SAP CPQ** | Complex configuration with engineering rules | SPS, HPS, HCE | Sales, Pricing |
| **Salesforce Service Cloud** | Case management, entitlements, service contracts | All | Service |
| **Salesforce Field Service** | Work orders, scheduling, dispatching, parts | All | Service |
| **SalesLogix** | Legacy CRM | HCE | Sales |
| **Informatica IICS** | Data integration, app integration, data quality, MDM, data governance | All | Enterprise Data |
| **Google Apigee** | API management, gateway, security, traffic management | All | Enterprise Data, Experience |
| **Zuora** | Subscription billing, rate plans, invoicing | SPS, HPS | Pricing |
| **Honeywell CCEX** | Custom unified portal, micro frontends, self-service | All | Experience |
| **SAP BW / S4HANA** | Reporting, analytics | All | Enterprise Data |
| **Sparta + Matrikon Sites** | Legacy web properties (Apache-based) | HCE | Experience |

---

## Layer-by-Layer Assessment

### 1. Experience Layer — Avg: 0.6

| Capability | Stage | Platform | Notes |
|---|---|---|---|
| Multi-modal experience agent | 0 | — | No conversational AI |
| Conversational commerce agent | 0 | — | No conversational commerce |
| Autonomous service agent | 0 | — | Cases are human-handled |
| Machine workflow agent | 0 | — | No agentic automation |
| Web | **2** | CCEX + AEM | Unified portal + Adobe AEM (SPS) + SAP Hybris storefronts |
| Email | 1 | Marketo | 6 instances at varying maturity; campaigns can't be consolidated or measured cross-SBG |
| SMS / Push | 1 | Marketo | Basic SMS/push alongside email campaigns |
| Paid media | 1 | Marketo | Basic audience syndication and ad network integration |
| Search & display | 0 | — | Not present |
| Events & experiential | 0 | — | Not present |
| Print & physical | 0 | — | Not present |
| API commerce endpoints | **2** | Apigee | Experience APIs/Gateway documented |
| Agent protocol endpoints | 0 | — | No A2A/MCP support |

**Key finding:** CCEX and Apigee provide the web/API backbone, but Marketo email is fragmented across 6 instances with no cross-SBG measurement. Adobe Analytics is non-functional, leaving marketers blind on content engagement and lead intent. The remaining gaps are in conversational, agentic, and advanced paid media channels.

### 2. Autonomous Experience Orchestration (AEO) — Avg: 0.3

| Capability | Stage | Notes |
|---|---|---|
| Multi-agent coordination | 0 | No agents deployed |
| Agentic conversation pattern | 0 | Direct API calls only |
| Agentic process flow | 0 | Manual workflows |
| Human-AI balance | 0 | Fully human-driven |
| Event-driven routing | 1 | Informatica provides basic event integration |
| Journey orchestration | 0 | 6 separate Marketo instances — journey orchestration siloed per SBG, no cross-SBG coordination |
| Dynamic segmentation | 0 | No CDP or identity layer; segmentation fragmented across 6 Marketo + 4–5 SFDC instances |
| Personalization & NBA | 1 | Basic CRM recommendations within individual SFDC instances |
| Offer optimization | 1 | Marketo provides basic promotional calendar per SBG |
| Experience optimization | 0 | Adobe Analytics broken — A/B testing unreliable without valid data |
| Product recommendation | 1 | Hybris basic rules |
| AI workbench | 0 | Separate admin consoles |

**Key finding:** This is the single largest gap area. The fragmentation of 6 Marketo instances and 4–5 Salesforce instances means no unified customer journey exists. Every cross-system, cross-SBG interaction is either manual or hard-coded in integration logic. Without a CDP or identity layer, orchestration across touchpoints is impossible.

### 3. Functional Pillars — Avg: 1.2

**Marketing (Avg: 0.7)** — Marketo exists across all stacks but is deployed as **6 separate instances at varying maturity**. Campaigns can't be consolidated or measured cross-SBG. Adobe Analytics is broken — no person-centric tracking, browser-level only. No CDP, no unified lead scoring, no cross-SBG attribution. Marketing budget allocation is manual and siloed.

**Sales (Avg: 1.3)** — 4–5 Salesforce instances with no unified customer record. SQLs arrive without account context or intent signals. No enterprise CPQ — reps in some SBGs manually build quotes in Excel. Pricing rules maintained in spreadsheets per SBG. No shared forecasting, no cross-SBG pipeline visibility. No pull-through incentive model.

**Commerce (Avg: 1.6)** — SAP Hybris provides functional B2B/B2C storefronts, but 52+ friction points exist from inquiry to order. Manual order re-entry across SAP, SFDC, and portal. Account hierarchy disconnected. Gap on agent-to-agent commerce readiness (Stage 0).

**Service (Avg: 1.3)** — Salesforce Service Cloud + Field Service provide Stage 2 routing and case management. However, agents open 3 tabs to answer one question. Returns and warranty fully manual with no case tracking or SLA visibility. No renewal or expansion triggers.

**Pricing (Avg: 2.2)** — Strongest functional area. PROS ML-driven dynamic pricing (Stage 3) in SPS and HPS. Salesforce/SAP CPQ and Zuora subscription billing at Stage 2. PROS is one of the few capabilities approaching unified maturity.

### 4. Intelligent Content Operations (ICO) — Avg: 0.3

11 of 14 capabilities are Stage 0. Adobe AEM in SPS provides basic content authoring and template-based creation (Stage 1), and Marketo adds email content creation. Basic digital asset management exists within AEM for the Automation Site. No enterprise DAM, no creative tools, no content governance, no content strategy tooling. Sales enablement content is siloed by SBG — no cross-portfolio selling material.

**Key finding:** ICO is largely greenfield. AEM and Marketo provide starting points, but content for sales enablement, product configuration, and marketing is produced in silos. This bottlenecks any personalization or multi-channel strategy.

### 5. Commercial Brain — Avg: 0.1

25 of 26 capabilities are Stage 0. Only integration protocol management reaches Stage 2 (via Informatica + Apigee). No knowledge graphs, no RAG, no model infrastructure, no agent framework, no GenAI services, no responsible AI.

**Key finding:** The entire AI/ML infrastructure layer needs to be established. This is expected given the traditional architecture, but with 38 integrations at risk in the S/4 migration, the integration layer itself needs to be re-architected before any AI capabilities can be layered on top.

### 6. Enterprise Data Foundation — Avg: 1.4

Informatica IICS provides Stage 2 data management and integration infrastructure. SAP BW provides Stage 2 analytics. Apigee provides Stage 2 API management.

**Critical gap:** No CDP or identity layer. Customer data is fragmented across 4–5 SFDC instances, 6 Marketo instances, SAP ECC, and Hybris. No unified customer record exists. E-commerce is blocked by disparate customer entitlements. This is the single most referenced pain point across the executive presentation.

**Key finding:** The data foundation has strong plumbing (Informatica, Apigee) but the critical gap is customer data unification. Without a CDP, personalization, segmentation, journey orchestration, and any agentic use case requiring customer context are blocked.

### 7. Governance & Trust — Avg: 0.5

Mostly Stage 0–1. Basic platform-level governance exists (SFDC audit logs, SAP ECC SOX compliance, Apigee API security), but nothing AI or agent-specific. This is expected since no AI agents are deployed.

**Key finding:** Governance will need to be stood up in parallel with AI/agent deployment. The existing platform-level controls provide a foundation to build on.

---

## Top Gaps and Opportunities (Prioritized)

### Priority 1: Customer Data Unification
**Gap:** Customer data fragmented across 4–5 CRM instances, 6 marketing automation instances, ERP, and commerce platforms with no unified view. No CDP or identity layer. E-commerce blocked by disparate customer entitlements.
**Impact:** Blocks personalization, segmentation, journey orchestration, cross-SBG selling, and any agentic use case that needs customer context. This is referenced as the root cause across nearly every pain point in the current state.
**Recommendation:** Deploy a customer data platform (CDP) as the near-term unification hub — enabling data consolidation without dependency on the S/4HANA migration timeline. Establish a unified identity graph and consent framework.

### Priority 2: Marketing & Analytics Stabilization
**Gap:** 6 marketing automation instances at varying maturity that cannot be consolidated or measured. Web analytics platform is non-functional — no hit-level data, no person-centric tracking, browser-level only. Marketers are blind on content engagement and lead intent.
**Impact:** Marketing operates in silos per SBG. No cross-SBG campaign attribution, audience measurement, or lead scoring. Cannot measure marketing ROI or optimize investment.
**Recommendation:** Stabilize the analytics platform as a foundational prerequisite (audit and remediate tracking rules and data collection). Consolidate marketing automation into a unified instance with common lead scoring and MQL routing connected to the CDP.

### Priority 3: Sales Process Unification & CPQ
**Gap:** 4–5 CRM instances with no unified customer record. No enterprise CPQ — reps manually build quotes in Excel. Pricing rules in spreadsheets per SBG. Quote approvals routed by email with no visibility into status.
**Impact:** 52+ friction points from inquiry to order. Reps can't self-serve accurate pricing. No cross-SBG pipeline visibility or shared forecasting. Credit limit issues surface at order stage, causing blocks.
**Recommendation:** Consolidate CRM toward a unified pipeline with shared forecasting. Deploy guided CPQ to replace Excel-based quoting. Standardize pricing playbooks and commercial policies across SBGs. Automate credit limit checks at account creation.

### Priority 4: Integration Re-architecture
**Gap:** 38 cataloged integrations, many siloed and undocumented. ECC → S/4HANA migration will break critical front-office connections. Business partner model changes ripple across all downstream systems.
**Impact:** Lift-and-shift will replicate today's failure modes into S/4. Point-to-point rebuild is faster short-term but perpetuates fragmentation.
**Recommendation:** Re-architect and consolidate integrations into a unified API layer aligned to the business partner model. Design integration patterns for all SBGs — not just the first-mover — so the architecture scales.

### Priority 5: AI/Agent Foundation & Experience Modernization
**Gap:** No GenAI, ML, or agent infrastructure. 25 of 26 Commercial Brain capabilities are Stage 0. No conversational channels, no agentic touchpoints.
**Impact:** Cannot deploy any agentic use cases. Customer experience limited to web portal and API.
**Recommendation:** Start with a managed AI platform leveraging existing ecosystem investments. Begin with targeted use cases in Sales (deal coaching, forecasting) and Service (case deflection, knowledge retrieval) where CRM data already exists. Layer conversational AI on top of the existing CRM and commerce platforms as initial agentic touchpoints.

---

## Recommended Roadmap

| Phase | Timeframe | Theme | Focus Areas |
|---|---|---|---|
| **1 — Fix & Stabilize** | Months 0–12 | Stabilize foundations & unify data | Analytics remediation, marketing automation consolidation, unified CRM pipeline, CPQ deployment, CDP deployment as data hub, standard commercial policies, S/4 integration impact assessment |
| **2 — Modernize & Connect** | Months 12–36 | Connect systems & enable intelligence | Unified customer profile via CDP, identity graph and privacy framework, B2B commerce transformation, integration re-architecture for S/4, customer health scoring, installed base tracking, proactive service |
| **3 — Scale the Agentic Front Office** | Months 36–60 | Progressive autonomy & AI-driven operations | AI sales coaching and next-best-action, predictive segmentation and audience activation, agentic orchestration (touchless quote-to-cash), connected asset telemetry, outcome-based agreements |

---

*This assessment is based on the Enterprise Context architecture diagram, the HON IA-HPS Commercial System Landscape diagram, and the Executive Briefing deck. It represents an initial current-state evaluation. Ratings should be validated and refined during facilitated assessment workshops with Honeywell stakeholders.*
