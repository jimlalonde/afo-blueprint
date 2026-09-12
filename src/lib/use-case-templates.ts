export interface UseCaseTemplate {
  id: string;
  name: string;
  description: string;
  capabilityIds: string[];
}

export const USE_CASE_TEMPLATES: UseCaseTemplate[] = [
  {
    id: "sales-ai",
    name: "AI-Powered Sales Acceleration",
    description: "Supercharge pipeline velocity with predictive scoring, AI agents, and intelligent knowledge retrieval.",
    capabilityIds: [
      // Sales
      "sales_01", "sales_02", "sales_03", "sales_04", "sales_05", "sales_06",
      // Knowledge Engine
      "brain_ke_04", "brain_ke_01", "brain_ke_02", "brain_ke_03", "brain_ke_06", "brain_ke_05", "brain_ke_07",
      // Agent Network
      "brain_an_01", "brain_an_02", "brain_an_03", "brain_an_04",
      // GenAI Services
      "brain_gs_01", "brain_gs_02", "brain_gs_03", "brain_gs_04", "brain_gs_05",
      // Orchestration Core
      "aeo_core_01", "aeo_core_02", "aeo_core_03", "aeo_core_04", "aeo_core_05",
      // Experience Composition
      "aeo_exp_03",
    ],
  },
  {
    id: "omni-service",
    name: "Omnichannel Customer Service",
    description: "Unify service across voice, chat, email, and agent handoffs with AI-first resolution.",
    capabilityIds: [
      // Service
      "svc_01", "svc_02", "svc_03", "svc_04", "svc_05",
      // Conversational Touchpoints
      "exp_conv_01", "exp_conv_02", "exp_conv_03", "exp_conv_04",
      // Traditional Channels
      "exp_trad_01", "exp_trad_02", "exp_trad_03",
      // Agent Network
      "brain_an_01", "brain_an_02", "brain_an_03",
      // GenAI Services
      "brain_gs_01", "brain_gs_02",
      // Knowledge Engine
      "brain_ke_03", "brain_ke_06", "brain_ke_07",
      // Orchestration
      "aeo_core_01", "aeo_core_02", "aeo_core_04",
    ],
  },
  {
    id: "content-supply",
    name: "Content Supply Chain Modernization",
    description: "Modernize content creation, governance, and distribution with generative AI at scale.",
    capabilityIds: [
      // Content Creation & Generation
      "ico_create_01", "ico_create_02", "ico_create_03", "ico_create_04",
      // Content Governance
      "ico_gov_01", "ico_gov_02", "ico_gov_03",
      // Content Operations
      "ico_ops_01", "ico_ops_02", "ico_ops_03", "ico_ops_04",
      // Content Strategy
      "ico_strat_01", "ico_strat_02", "ico_strat_03",
      // GenAI Services
      "brain_gs_01", "brain_gs_04", "brain_gs_05",
      // Marketing (content-related)
      "mktg_02", "mktg_03",
    ],
  },
  {
    id: "commerce-pricing",
    name: "Commerce & Pricing Intelligence",
    description: "Optimize pricing, promotions, and digital commerce with real-time analytics and AI decisioning.",
    capabilityIds: [
      // Commerce
      "comm_01", "comm_02", "comm_03", "comm_04", "comm_05",
      // Pricing
      "price_01", "price_02", "price_03", "price_04", "price_05",
      // Knowledge Engine
      "brain_ke_03", "brain_ke_05", "brain_ke_06",
      // Analytics & Insights
      "data_ana_01", "data_ana_02", "data_ana_03",
      // Data Management
      "data_mgmt_01", "data_mgmt_02", "data_mgmt_04",
      // Experience Composition
      "aeo_exp_04", "aeo_exp_06",
    ],
  },
  {
    id: "data-unify",
    name: "Customer Data Unification",
    description: "Build a unified customer view with identity resolution, data quality, and integration pipelines.",
    capabilityIds: [
      // Data Management
      "data_mgmt_01", "data_mgmt_02", "data_mgmt_03", "data_mgmt_04", "data_mgmt_05",
      // Customer Data
      "data_cust_01", "data_cust_02", "data_cust_03",
      // Analytics
      "data_ana_01", "data_ana_02", "data_ana_03",
      // Integration Infrastructure
      "data_int_01", "data_int_02", "data_int_03", "data_int_04",
      // Security & Access
      "gov_sec_01", "gov_sec_02",
      // Marketing (audience)
      "mktg_01",
    ],
  },
  {
    id: "responsible-ai",
    name: "Responsible AI & Governance",
    description: "Establish AI guardrails, decision auditability, and compliance frameworks across the enterprise.",
    capabilityIds: [
      // Responsible AI
      "brain_rai_01", "brain_rai_02", "brain_rai_03", "brain_rai_04",
      // Autonomy & Escalation
      "gov_auto_01", "gov_auto_02", "gov_auto_03",
      // Decision Audit
      "gov_audit_01", "gov_audit_02", "gov_audit_03",
      // Cost & Performance
      "gov_cost_01", "gov_cost_02", "gov_cost_03",
      // Security
      "gov_sec_01", "gov_sec_02", "gov_sec_03",
      // Knowledge Engine (audit trail)
      "brain_ke_07",
    ],
  },
  {
    id: "marketing-effectiveness",
    name: "Marketing Effectiveness & Attribution",
    description: "Drive attribution, audience optimization, and campaign performance with data-driven decisioning.",
    capabilityIds: [
      // Marketing
      "mktg_01", "mktg_02", "mktg_03", "mktg_04", "mktg_05", "mktg_06", "mktg_07", "mktg_08", "mktg_09", "mktg_10",
      // Orchestration Core
      "aeo_core_01", "aeo_core_02", "aeo_core_03", "aeo_core_05",
      // Experience Composition
      "aeo_exp_01", "aeo_exp_02", "aeo_exp_03", "aeo_exp_05",
      // Analytics
      "data_ana_01", "data_ana_02", "data_ana_03",
      // Customer Data
      "data_cust_01",
    ],
  },
  {
    id: "agent-first",
    name: "Agent-First Architecture",
    description: "Design an AI-native agent mesh with model routing, orchestration, and human-in-the-loop controls.",
    capabilityIds: [
      // Agent Network
      "brain_an_01", "brain_an_02", "brain_an_03", "brain_an_04",
      // Model Hub
      "brain_mh_01", "brain_mh_02", "brain_mh_03", "brain_mh_04", "brain_mh_05",
      // GenAI Services
      "brain_gs_01", "brain_gs_02", "brain_gs_03", "brain_gs_04", "brain_gs_05",
      // Operations & Integration
      "brain_ops_01", "brain_ops_02", "brain_ops_03", "brain_ops_04",
      // AI Workbench
      "aeo_wb_01",
      // Autonomy
      "gov_auto_01", "gov_auto_02",
      // Agent Interfaces
      "exp_a2a_01", "exp_a2a_02",
    ],
  },
];
