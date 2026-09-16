/**
 * Static keyword-to-capability mapping for the "Describe Your Focus" text
 * matching engine. Each keyword maps to an array of capability IDs that are
 * relevant when a user mentions that term.
 */

export const KEYWORD_MAP: Record<string, string[]> = {
  // Sales terms
  lead: ["sales_02", "sales_04", "mktg_01", "aeo_exp_03"],
  pipeline: ["sales_02", "sales_07"],
  crm: ["sales_02", "sales_04", "sales_05", "data_cust_01"],
  forecast: ["sales_07", "data_ana_01", "data_ana_02"],
  quota: ["sales_01", "sales_07"],
  deal: ["sales_04", "sales_05", "price_02"],
  territory: ["sales_01"],
  account: ["sales_03", "mktg_06", "sales_05"],
  retention: ["sales_05", "svc_04", "svc_05"],
  upsell: ["sales_05", "aeo_exp_04", "aeo_exp_06"],
  proposal: ["sales_04", "price_02", "ico_create_02"],
  capacity: ["sales_01"],
  incentive: ["sales_07"],
  stakeholder: ["sales_03"],
  whitespace: ["sales_03", "sales_05"],
  coaching: ["sales_06"],
  enablement: ["sales_06"],
  onboarding: ["sales_06"],
  playbook: ["sales_06"],
  // Marketing terms
  campaign: ["mktg_03", "mktg_07", "aeo_exp_01", "aeo_core_01"],
  audience: ["mktg_01", "aeo_exp_02", "data_cust_01"],
  brand: ["mktg_02", "mktg_10", "ico_gov_01"],
  seo: ["mktg_08", "ico_strat_03"],
  attribution: ["mktg_09", "data_ana_02"],
  abm: ["mktg_06", "sales_03"],
  persona: ["mktg_05", "mktg_01"],
  sentiment: ["mktg_10", "svc_02"],
  engagement: ["mktg_03", "aeo_exp_01", "aeo_exp_05"],
  media: ["mktg_07", "exp_trad_04", "exp_trad_05"],
  event: ["mktg_03", "exp_trad_06"],
  social: ["mktg_10", "exp_trad_04"],

  // Commerce terms
  commerce: ["comm_01", "comm_02", "comm_03", "comm_04", "comm_05", "exp_conv_02"],
  checkout: ["comm_03"],
  catalog: ["comm_02"],
  merchandise: ["comm_04", "aeo_exp_06"],
  storefront: ["comm_01", "exp_trad_01"],
  fulfillment: ["comm_03"],
  marketplace: ["brain_an_04", "comm_05"],

  // Pricing terms
  pricing: ["price_01", "price_02", "price_03", "price_04", "price_05"],
  promotion: ["price_05", "aeo_exp_04"],
  discount: ["price_03"],
  revenue: ["price_04", "sales_07"],
  quote: ["price_02", "sales_04"],

  // Service terms
  service: ["svc_01", "svc_02", "svc_03", "svc_04", "svc_05"],
  support: ["svc_01", "svc_02", "svc_03", "exp_conv_03"],
  ticket: ["svc_01", "svc_02"],
  chatbot: ["exp_conv_01", "exp_conv_03", "brain_gs_01"],
  resolution: ["svc_01", "svc_03", "data_cust_03"],
  feedback: ["svc_02", "brain_mh_03"],
  knowledge: ["svc_03", "brain_ke_01", "brain_ke_03", "brain_ke_04"],
  escalation: ["gov_auto_02", "svc_01"],

  // Content terms
  content: ["ico_create_01", "ico_create_02", "ico_create_03", "ico_ops_01", "ico_strat_01", "ico_strat_02"],
  creative: ["ico_create_01", "ico_create_02", "ico_ops_01"],
  copy: ["ico_create_02", "brain_gs_01"],
  dam: ["ico_ops_02"],
  asset: ["ico_ops_02", "ico_create_01"],
  localization: ["ico_create_03"],
  compliance: ["ico_gov_01", "ico_gov_02", "gov_audit_02"],
  approval: ["ico_gov_03"],
  video: ["ico_create_01", "exp_conv_01"],

  // AI / Agent terms
  agent: ["brain_an_01", "brain_an_02", "brain_an_03", "brain_an_04", "aeo_core_01", "exp_conv_01", "exp_conv_03"],
  ai: ["brain_gs_01", "brain_gs_04", "brain_mh_01", "brain_rai_01", "brain_rai_02", "aeo_wb_01"],
  model: ["brain_mh_01", "brain_mh_02", "brain_mh_03", "brain_mh_04", "brain_mh_05"],
  llm: ["brain_mh_01", "brain_mh_02", "brain_mh_05", "brain_ops_01"],
  prompt: ["brain_gs_01", "brain_gs_02"],
  rag: ["brain_ke_03", "brain_ke_04", "brain_ke_02"],
  reasoning: ["brain_ke_05", "brain_ke_06", "brain_ke_07"],
  embedding: ["brain_ke_02", "brain_gs_04"],
  fine: ["brain_mh_02", "brain_mh_03"],
  tuning: ["brain_mh_02", "brain_mh_03"],
  inference: ["brain_mh_05", "brain_ops_01"],
  orchestration: ["aeo_core_01", "aeo_core_03", "aeo_core_05"],
  copilot: ["exp_conv_01", "aeo_wb_01"],
  multimodal: ["brain_gs_04", "exp_conv_01"],

  // Data terms
  data: ["data_mgmt_01", "data_mgmt_02", "data_mgmt_03", "data_mgmt_04", "data_cust_01"],
  cdp: ["data_cust_01", "data_cust_02"],
  identity: ["data_cust_03", "gov_sec_01"],
  analytics: ["data_ana_01", "data_ana_02", "data_ana_03"],
  dashboard: ["data_ana_03"],
  integration: ["data_int_01", "data_int_02", "data_int_03", "data_int_04", "brain_ops_03"],
  api: ["data_int_03", "exp_a2a_01", "brain_ops_03"],
  streaming: ["data_int_01", "data_mgmt_04"],
  consent: ["data_mgmt_05", "aeo_exp_05"],
  profile: ["data_cust_01", "data_cust_02"],
  quality: ["data_mgmt_01", "gov_cost_03"],

  // Governance terms
  governance: ["gov_auto_01", "gov_audit_01", "gov_audit_02", "gov_cost_01", "gov_sec_01", "gov_sec_02"],
  audit: ["gov_audit_01", "gov_audit_02", "brain_ke_07", "brain_rai_03"],
  bias: ["brain_rai_01", "brain_rai_04"],
  ethics: ["brain_rai_02", "brain_rai_01"],
  explainability: ["brain_rai_03", "brain_ke_07"],
  security: ["gov_sec_01", "gov_sec_02", "gov_sec_03"],
  cost: ["brain_ops_02", "gov_cost_01", "gov_cost_02"],
  sla: ["gov_cost_03"],
  guardrails: ["brain_rai_02", "gov_auto_01"],
  regulatory: ["gov_audit_02", "ico_gov_02"],

  // Personalization terms
  personalization: ["aeo_exp_03", "aeo_exp_01", "mktg_05"],
  recommendation: ["aeo_exp_06", "aeo_exp_03"],
  journey: ["aeo_exp_01", "mktg_05", "data_ana_02"],
  segmentation: ["aeo_exp_02", "mktg_01", "sales_01"],
  testing: ["aeo_exp_05"],
  experimentation: ["aeo_exp_05"],
  optimization: ["aeo_exp_05", "ico_ops_04", "price_01"],
};

/**
 * Match free text against the keyword map and return a deduplicated set of
 * capability IDs. Words are lowercased and matched against map keys.
 */
export function matchKeywords(text: string): string[] {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter(Boolean);

  const ids = new Set<string>();
  for (const word of words) {
    const mapped = KEYWORD_MAP[word];
    if (mapped) mapped.forEach((id) => ids.add(id));
  }
  return [...ids];
}

/** Suggestion chips shown below the text input */
export const KEYWORD_SUGGESTIONS = [
  "lead scoring",
  "content generation",
  "chatbot",
  "pricing optimization",
  "agent orchestration",
  "identity resolution",
  "campaign automation",
  "compliance & governance",
  "personalization",
  "data unification",
];
