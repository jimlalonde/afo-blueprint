# Honeywell — AFO Capability Gap Analysis

**Date:** May 4, 2026
**Prepared by:** PwC Agentic Front Office Practice
**Assessment basis:** Enterprise Context architecture diagram + HON IA-HPS Commercial System Landscape (current state)

---

## Executive Summary

Honeywell's current commercial technology architecture spans **three distinct tech stacks** — SPS (~$1.5B), HPS (~$6.0B), and legacy HCE (~$0.2B) — built around SAP ECC as the system of record, Salesforce as the CRM layer, and Informatica as the integration backbone. The Commercial System Landscape reveals a richer platform footprint than initially assessed: **Marketo** is deployed across all three stacks for marketing automation, **PROS** provides ML-driven dynamic pricing in SPS and HPS, and **Adobe Experience Manager** powers the SPS Automation Site. Despite this depth, the architecture has **no agentic, GenAI, or AI-native capabilities** deployed, and the multi-stack fragmentation creates significant complexity.

**Overall current-state maturity: 0.9 avg (Stage 0–1)**

Of 123 L2 capabilities assessed:
- **56 (46%)** rated Stage 0 — Not established
- **36 (29%)** rated Stage 1 — Distributed
- **30 (24%)** rated Stage 2 — Functional
- **1 (1%)** rated Stage 3 — Unified (PROS dynamic pricing)

The strongest capabilities are in **Enterprise Data Foundation** (integration infrastructure, data management), **Pricing** (PROS + CPQ + Zuora), and **Functional Pillars** (Sales, Commerce, Service) where established platforms are operational. The largest gaps are in **Agentic Orchestration**, **Commercial Brain**, **Intelligent Content Operations**, and **Governance** — all of which have minimal or no platform coverage. Marketing, previously identified as a critical gap, is now understood to have a **Marketo foundation** that elevates several marketing capabilities to Stage 1–2.

---

## Current Architecture Stack

| Platform | Role | Stacks | Layers Served |
|---|---|---|---|
| **SAP ECC** | System of record (SD, MM/LE, PP/QM, Billing, FI/CO, QM/PM) | All | Enterprise Data, Pricing, Commerce |
| **SAP Hybris Commerce Cloud** | B2B/B2C digital commerce storefronts | SPS, HPS | Experience, Commerce |
| **Adobe Experience Manager** | Web content management (Automation Site) | SPS | Experience, ICO |
| **Marketo** | Marketing automation, campaigns, nurtures | SPS, HPS, HCE | Marketing, AEO, Experience |
| **PROS** | ML-driven dynamic pricing optimization | SPS, HPS | Pricing |
| **Salesforce CRM (Sales Cloud)** | Lead, opportunity, and account management | SPS, HPS, HCE | Sales |
| **Salesforce CPQ (Steelbrick)** | Configure-price-quote | SPS | Sales, Pricing |
| **SAP CPQ** | Complex configuration with engineering rules | SPS, HPS, HCE | Sales, Pricing |
| **Salesforce Service Cloud** | Case management, entitlements, service contracts | All | Service |
| **Salesforce Field Service** | Work orders, scheduling, dispatching, parts | All | Service |
| **SalesLogix** | Legacy CRM | HCE | Sales |
| **Informatica IICS** | Data integration, app integration, data quality, MDM, data governance | All | Enterprise Data, Commercial Brain (integration only) |
| **Google Apigee** | API management, gateway, security, traffic management | All | Enterprise Data, Experience (APIs) |
| **Zuora** | Subscription billing, rate plans, invoicing | SPS, HPS | Pricing |
| **Honeywell CCEX** | Custom unified portal, micro frontends, self-service | All | Experience |
| **SAP BW / S4HANA** | Reporting, analytics | All | Enterprise Data |
| **Sparta + Matrikon Sites** | Legacy web properties (Apache-based) | HCE | Experience |

---

## Layer-by-Layer Assessment

### 1. Experience Layer — Avg: 0.7

| Capability | Stage | Platform | Notes |
|---|---|---|---|
| Multi-modal experience agent | 0 | — | No conversational AI |
| Conversational commerce agent | 0 | — | No conversational commerce |
| Autonomous service agent | 0 | — | Cases are human-handled |
| Machine workflow agent | 0 | — | No agentic automation |
| Web | **2** | CCEX + AEM | Unified portal + Adobe AEM (SPS Automation Site) + SAP Hybris storefronts |
| Email | **2** | Marketo | Marketo provides triggered emails with dynamic content and segmentation across all stacks |
| SMS / Push | 1 | Marketo | Marketo provides basic SMS/push alongside email campaigns |
| Paid media | 1 | Marketo | Basic audience syndication and ad network integration via Marketo |
| Search & display | 0 | — | Not present |
| Events & experiential | 0 | — | Not present |
| Print & physical | 0 | — | Not present |
| API commerce endpoints | **2** | Apigee | Experience APIs/Gateway documented |
| Agent protocol endpoints | 0 | — | No A2A/MCP support |

**Key finding:** The experience layer is stronger than initially assessed. CCEX and Apigee provide the web/API backbone, but **Marketo across all three stacks** adds email automation, basic SMS/push, and paid media syndication. Adobe AEM in SPS adds content-managed web experiences. The remaining gaps are in conversational, agentic, and advanced paid media channels.

### 2. Autonomous Experience Orchestration (AEO) — Avg: 0.4

| Capability | Stage | Notes |
|---|---|---|
| Multi-agent coordination | 0 | No agents deployed |
| Agentic conversation pattern | 0 | Direct API calls only |
| Agentic process flow | 0 | Manual workflows |
| Human-AI balance | 0 | Fully human-driven |
| Event-driven routing | 1 | Informatica provides basic event integration |
| Journey orchestration | 1 | Marketo provides campaign-based journey sequences across email and web channels |
| Dynamic segmentation | 1 | Marketo provides static rule-based segments updated periodically from CRM and web activity |
| Personalization & NBA | 1 | Marketo + Salesforce CRM provide basic rule-based recommendations and lead scoring |
| Offer optimization | 1 | Marketo provides basic promotional calendar and rule-based offer selection |
| Experience optimization | 1 | Marketo provides manual A/B testing on email subject lines and landing pages |
| Product recommendation | 1 | Hybris basic rules |
| AI workbench | 0 | Separate admin consoles |

**Key finding:** Still a major gap area, but Marketo provides a **Stage 1 baseline** for journey orchestration, segmentation, and A/B testing that was previously invisible. No true AI-driven orchestration exists, but the Marketo foundation means journey and segmentation capabilities don't need to start from zero.

### 3. Functional Pillars — Avg: 1.5

**Marketing (Avg: 1.1)** — Elevated from initial assessment. **Marketo across all three stacks** provides campaign execution (Stage 2), account-based marketing (Stage 2), multi-touch attribution (Stage 2), and basic audience segmentation (Stage 1). Remaining gaps: no CDP for unified customer data (Stage 1), no AI-driven intent signals, and budget optimization is manual.

**Sales (Avg: 1.5)** — Moderate maturity. Salesforce CRM + Steelbrick CPQ (SPS) + SAP CPQ (HPS/HCE) provide Stage 2 lead management, deal execution, and forecasting. The multi-CPQ landscape across stacks adds complexity.

**Commerce (Avg: 1.6)** — Moderate maturity. SAP Hybris provides functional B2B/B2C storefronts. Gap on agent-to-agent commerce readiness (Stage 0).

**Service (Avg: 1.4)** — Moderate maturity. Salesforce Service Cloud + Field Service provide Stage 2 routing and case management. Knowledge management and proactive service are Stage 1.

**Pricing (Avg: 2.2)** — Strongest functional area. **PROS ML-driven dynamic pricing** (Stage 3) in SPS and HPS elevates this beyond rule-based. Salesforce/SAP CPQ and Zuora subscription billing provide Stage 2 quote management and billing. PROS is a standout platform — one of the few capabilities approaching unified maturity.

### 4. Intelligent Content Operations (ICO) — Avg: 0.3

11 of 14 capabilities are Stage 0. **Adobe AEM in SPS** provides basic content authoring and template-based creation (Stage 1), and **Marketo** adds email content creation capabilities. Basic digital asset management exists within AEM for the Automation Site. No DAM enterprise-wide, no creative tools, no content governance, no content strategy tooling.

**Key finding:** ICO is largely greenfield, but the AEM and Marketo foundations provide a starting point for content creation and web content management. A comprehensive content operations capability still needs to be established.

### 5. Commercial Brain — Avg: 0.1

25 of 26 capabilities are Stage 0. Only integration protocol management reaches Stage 2 (via Informatica + Apigee). No knowledge graphs, no RAG, no model infrastructure, no agent framework, no GenAI services, no responsible AI.

**Key finding:** The entire AI/ML infrastructure layer needs to be established. This is expected given the traditional architecture, but it means the path to Stage 3 (Unified) will require foundational investments in model infrastructure, agent development, and GenAI operations before any agentic use cases can be deployed.

### 6. Enterprise Data Foundation — Avg: 1.6

The strongest layer. Informatica IICS provides Stage 2 data management (quality, standardization, schemas, syndication) and Stage 2 integration infrastructure (streaming, batch, API management, orchestration). SAP BW provides Stage 2 analytics. Apigee provides Stage 2 API management.

**Gaps:** No CDP (customer 360 is Stage 1, fragmented across CRM/ECC/Hybris), no real-time experience profile (Stage 0), and basic identity resolution (Stage 1).

**Key finding:** The data foundation is the most mature layer and provides a solid base for building upward. The critical gap is customer data unification — a CDP would bridge Salesforce, SAP, and Hybris customer data.

### 7. Governance & Trust — Avg: 0.5

Mostly Stage 0-1. Basic platform-level governance exists (Salesforce audit logs, SAP ECC SOX compliance, Apigee API security), but nothing AI or agent-specific. This is expected since no AI agents are deployed.

**Key finding:** Governance will need to be stood up in parallel with AI/agent deployment. The existing platform-level controls (Apigee security, SAP authorization, Informatica data governance) provide a foundation to build on.

---

## Top Gaps and Opportunities (Prioritized)

### Priority 1: Customer Data Unification
**Gap:** Customer data fragmented across Salesforce CRM, SAP ECC, and Hybris with no unified view.
**Impact:** Blocks personalization, segmentation, journey orchestration, and any agentic use case that needs customer context.
**Recommendation:** Deploy a CDP (e.g., Salesforce Data Cloud or SAP CDP) to create a unified customer 360 profile. This is the foundational enabler for nearly everything else.

### Priority 2: Marketing Platform Consolidation & Elevation
**Gap:** Marketo provides a solid Stage 1–2 foundation, but it is deployed **independently across three stacks** with no unified customer data layer. No CDP, no AI-driven intent modeling, no cross-stack campaign orchestration.
**Impact:** Marketing operates in silos per business unit. Campaign insights and audience segments are not shared across SPS, HPS, and HCE. Cannot deliver unified customer journeys.
**Recommendation:** Unify Marketo instances or migrate to a consolidated platform (e.g., Marketo Engage with unified instance, Adobe Marketing Cloud, or Salesforce Marketing Cloud) connected to the CDP. Layer AI-driven intent signals and predictive segmentation on top of the existing Marketo campaign infrastructure.

### Priority 3: Intelligent Content Operations
**Gap:** Adobe AEM exists in SPS only, and Marketo handles email content. 11 of 14 ICO capabilities are Stage 0. No enterprise DAM, no creative tools, no content governance.
**Impact:** Content is produced in silos — AEM for SPS web, Marketo for email, ad hoc for everything else. This bottlenecks personalization and multi-channel strategy.
**Recommendation:** Extend Adobe AEM across stacks and stand up an enterprise DAM. Establish content governance workflows to support both human-authored and future AI-generated content.

### Priority 4: AI/Agent Foundation
**Gap:** No GenAI, ML, or agent infrastructure. 25 of 26 Commercial Brain capabilities are Stage 0.
**Impact:** Cannot deploy any agentic use cases without foundational AI infrastructure.
**Recommendation:** Start with a managed AI platform (e.g., Salesforce Einstein/Agentforce, SAP Joule/AI Core, or hyperscaler AI services). Begin with targeted use cases in Sales (deal coaching, forecasting) and Service (case deflection, knowledge RAG) where the CRM data already exists.

### Priority 5: Experience Modernization
**Gap:** CCEX is custom-built. No conversational channels, no agentic touchpoints, narrow channel mix.
**Impact:** Customer experience is limited to web portal and API. No ability to meet customers in conversational or agentic channels.
**Recommendation:** Layer conversational AI on top of existing Service Cloud (service agent) and Hybris (commerce agent) as initial use cases. The custom CCEX portal can be extended with embedded AI assistants.

---

## Recommended Roadmap Themes

| Phase | Timeframe | Theme | Focus Areas |
|---|---|---|---|
| **1 — Foundation** | Months 0–6 | Data unification & marketing activation | CDP deployment, marketing automation, customer 360, consent management |
| **2 — Intelligence** | Months 6–12 | AI foundation & content operations | AI platform selection, first agent use cases (Sales/Service), content platform, DAM |
| **3 — Orchestration** | Months 12–18 | Agentic orchestration & experience expansion | Journey orchestration, multi-agent coordination, conversational channels, responsible AI framework |
| **4 — Autonomy** | Months 18–24 | Progressive autonomy & optimization | Autonomous agents, dynamic pricing optimization, predictive service, GEO readiness |

---

*This assessment is based on the Enterprise Context architecture diagram and the HON IA-HPS Commercial System Landscape diagram. It represents an initial current-state evaluation. Ratings should be validated and refined during facilitated assessment workshops with Honeywell stakeholders.*
