# Honeywell — AFO Capability Gap Analysis

**Date:** May 4, 2026
**Prepared by:** PwC Agentic Front Office Practice
**Assessment basis:** Enterprise Context architecture diagram (current state)

---

## Executive Summary

Honeywell's current commercial technology architecture is anchored on a **traditional, ERP-centric stack** built around SAP ECC as the system of record, Salesforce as the CX engagement layer, and Informatica as the integration backbone. The architecture effectively supports three well-defined process views — Quote-to-Cash, Service Lifecycle, and Commerce — but has **no agentic, GenAI, or AI-native capabilities** deployed.

**Overall current-state maturity: 0.7 avg (Stage 0–1)**

Of 123 L2 capabilities assessed:
- **70 (57%)** rated Stage 0 — Not established
- **26 (21%)** rated Stage 1 — Distributed
- **27 (22%)** rated Stage 2 — Functional
- **0** rated Stage 3 or 4

The strongest capabilities are in **Enterprise Data Foundation** (integration infrastructure, data management) and **Functional Pillars** (Sales, Commerce, Service, Pricing) where established platforms are operational. The largest gaps are in **Agentic Orchestration**, **Commercial Brain**, **Intelligent Content Operations**, and **Marketing** — all of which have minimal or no platform coverage.

---

## Current Architecture Stack

| Platform | Role | Layers Served |
|---|---|---|
| **SAP ECC** | System of record (SD, MM/LE, PP/QM, Billing, FI/CO, QM/PM) | Enterprise Data, Pricing, Commerce |
| **SAP Hybris Commerce Cloud** | B2B/B2C digital commerce | Experience, Commerce |
| **Salesforce CRM (Sales Cloud)** | Lead, opportunity, and account management | Sales |
| **Salesforce CPQ** | Configure-price-quote | Sales, Pricing |
| **SAP CPQ (optional)** | Complex configuration with engineering rules | Sales, Pricing |
| **Salesforce Service Cloud** | Case management, entitlements, service contracts | Service |
| **Salesforce Field Service** | Work orders, scheduling, dispatching, parts | Service |
| **Informatica IICS** | Data integration, app integration, data quality, MDM, data governance | Enterprise Data, Commercial Brain (integration only) |
| **Google Apigee** | API management, gateway, security, traffic management | Enterprise Data, Experience (APIs) |
| **Zuora** | Subscription billing, rate plans, invoicing | Pricing |
| **Honeywell CCEX** | Custom unified portal, micro frontends, self-service | Experience |
| **SAP BW / S4HANA** | Reporting, analytics | Enterprise Data |

---

## Layer-by-Layer Assessment

### 1. Experience Layer — Avg: 0.5

| Capability | Stage | Platform | Notes |
|---|---|---|---|
| Multi-modal experience agent | 0 | — | No conversational AI |
| Conversational commerce agent | 0 | — | No conversational commerce |
| Autonomous service agent | 0 | — | Cases are human-handled |
| Machine workflow agent | 0 | — | No agentic automation |
| Web | **2** | CCEX | Unified portal with micro frontends |
| Email | 1 | Salesforce (basic) | No marketing automation |
| SMS / Push | 0 | — | Not present |
| Paid media | 0 | — | Not present |
| Search & display | 0 | — | Not present |
| Events & experiential | 0 | — | Not present |
| Print & physical | 0 | — | Not present |
| API commerce endpoints | **2** | Apigee | Experience APIs/Gateway documented |
| Agent protocol endpoints | 0 | — | No A2A/MCP support |

**Key finding:** The experience layer is built around a custom portal (CCEX) and API gateway (Apigee). There are no conversational, agentic, or multi-channel marketing touchpoints. The channel mix is narrow — essentially web, email, and APIs.

### 2. Autonomous Experience Orchestration (AEO) — Avg: 0.2

| Capability | Stage | Notes |
|---|---|---|
| Multi-agent coordination | 0 | No agents deployed |
| Agentic conversation pattern | 0 | Direct API calls only |
| Agentic process flow | 0 | Manual workflows |
| Human-AI balance | 0 | Fully human-driven |
| Event-driven routing | 1 | Informatica provides basic event integration |
| Journey orchestration | 0 | No marketing automation |
| Dynamic segmentation | 0 | No CDP |
| Personalization & NBA | 1 | Basic CRM recommendations |
| Offer optimization | 0 | Static promotions |
| Experience optimization | 0 | No experimentation platform |
| Product recommendation | 1 | Hybris basic rules |
| AI workbench | 0 | Separate admin consoles |

**Key finding:** This is the single largest gap area. No orchestration layer exists between the customer touchpoints and the functional platforms. This means every cross-system journey is either manual or hard-coded in integration logic.

### 3. Functional Pillars — Avg: 1.2

**Marketing (Avg: 0.2)** — Critical gap. No marketing automation, no CDP, no campaign orchestration, no attribution. Only basic CRM account data provides any marketing-adjacent capability.

**Sales (Avg: 1.5)** — Moderate maturity. Salesforce CRM + CPQ provide Stage 2 lead management, deal execution, and forecasting. Weaker on retention/expansion and account-based selling (Stage 1).

**Commerce (Avg: 1.6)** — Moderate maturity. SAP Hybris provides a functional B2B/B2C storefront with catalog, checkout, and merchandising. Gap on agent-to-agent commerce readiness (Stage 0).

**Service (Avg: 1.4)** — Moderate maturity. Salesforce Service Cloud + Field Service provide Stage 2 routing and case management. Knowledge management and proactive service are Stage 1.

**Pricing (Avg: 2.0)** — Strongest functional area. SAP ECC pricing conditions, Salesforce/SAP CPQ, and Zuora subscription billing provide end-to-end pricing governance at Stage 2 across all capabilities.

### 4. Intelligent Content Operations (ICO) — Avg: 0.1

13 of 14 capabilities are Stage 0 (Not established). Only basic product content tagging in Hybris (Stage 1). No DAM, no creative tools, no content governance, no content strategy tooling. Content is likely produced ad hoc through agencies.

**Key finding:** ICO is an almost complete greenfield. Any agentic front office strategy will require standing up a content operations capability from scratch.

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

### Priority 2: Marketing Automation
**Gap:** No marketing automation platform. 8 of 10 marketing capabilities are Stage 0.
**Impact:** No campaign orchestration, no audience segmentation, no channel attribution, no journey automation.
**Recommendation:** Deploy a marketing automation platform (e.g., Salesforce Marketing Cloud, SAP Emarsys, or Adobe) connected to the CDP. This unlocks the entire marketing pillar and journey orchestration layer.

### Priority 3: Intelligent Content Operations
**Gap:** No content platform, DAM, or creative tooling. 13 of 14 ICO capabilities are Stage 0.
**Impact:** Content is likely the bottleneck for any personalization or multi-channel strategy.
**Recommendation:** Stand up a content operations stack (Adobe Experience Manager or equivalent) with DAM, content authoring, and governance workflows.

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

*This assessment is based on the Enterprise Context architecture diagram and represents an initial current-state evaluation. Ratings should be validated and refined during facilitated assessment workshops with Honeywell stakeholders.*
