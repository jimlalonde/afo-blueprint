export type Engine = "ICO" | "AEO" | "ICO+AEO";

export interface Metric {
  value: string;
  label: string;
}

export interface EngagementStep {
  phase: "Sprint" | "Scale" | "Enterprise";
  duration: string;
  detail: string;
  investment: string;
}

export interface MicroJourney {
  id: string;
  sector: string;
  sectorKey: string;
  engine: Engine;
  title: string;
  subtitle: string;
  metrics: Metric[];
  problem: string;
  outcome: string;
  howItWorks: string;
  pwcRole: string;
  engagementPath: EngagementStep[];
  commercialNote: string;
}

export interface Sector {
  key: string;
  name: string;
  description: string;
  journeyCount: number;
}

export const sectors: Sector[] = [
  {
    key: "insurance",
    name: "Insurance",
    description:
      "Regulatory complexity creates massive content operations burden. Predictable renewal cycles create the cleanest environment for signal-driven retention orchestration.",
    journeyCount: 2,
  },
  {
    key: "mmb",
    name: "Mid-Market Banks",
    description:
      "Same competitive pressures as the largest institutions, a fraction of the marketing resources. Efficiency gains from ICO and AEO are proportionally larger.",
    journeyCount: 2,
  },
  {
    key: "tmt",
    name: "Telecom & Technology (B2B)",
    description:
      "Massive content fragmentation, complex enterprise sales cycles, and net revenue retention as the metric that drives valuation.",
    journeyCount: 3,
  },
  {
    key: "industrial",
    name: "Industrial Products",
    description:
      "Massive, technically complex product portfolios. Content fragmented across dealer networks, distributor channels, and direct sales.",
    journeyCount: 3,
  },
  {
    key: "hls",
    name: "Healthcare, Life Sciences & Pharma",
    description:
      "The most complex content and engagement challenge of any sector. Regulatory requirements make every piece of content a compliance event.",
    journeyCount: 3,
  },
];

export const microJourneys: MicroJourney[] = [
  {
    id: "INS-01",
    sector: "Insurance",
    sectorKey: "insurance",
    engine: "ICO",
    title: "Cut Compliance Content Cycles from Weeks to Days",
    subtitle:
      "Modular content architecture for multi-product, multi-jurisdiction insurance operations",
    metrics: [
      { value: "60-70%", label: "Faster Compliance Content Production" },
      { value: "3-5x", label: "Variant Output Without Adding Headcount" },
      { value: "30-40%", label: "Reduction in Cost Per Compliant Asset" },
    ],
    problem:
      "Carriers produce thousands of content variants annually across product lines, state jurisdictions, and distribution channels. Each variant requires legal and compliance review, creating production cycles measured in weeks. Marketing teams spend more time managing the variant production process than driving customer engagement.",
    outcome:
      "One high-volume content stream is restructured into modular, reusable components with compliance rules encoded at the component level. Production time drops dramatically. Compliance review cycles shrink because only new or modified components enter the review queue.",
    howItWorks:
      "ARIA Sprint uses GenStudio and AEM Assets in a trial environment to build the modular content hub with compliance-aware metadata. PwC's Regulated Content Orchestrator (RCO) governs the compliance workflow. Firefly Custom Models accelerate variant generation within brand and compliance guardrails.",
    pwcRole:
      "Insurance regulatory expertise ensures the compliance encoding is accurate and defensible. This is compliance operations modernization with marketing efficiency as a co-benefit.",
    engagementPath: [
      { phase: "Sprint", duration: "8-12 Weeks", detail: "Prove on one content stream. Trial environment. Live prototype with compliance team validation.", investment: "$0-$1M" },
      { phase: "Scale", duration: "12-16 Weeks", detail: "All product lines. Full GenStudio + AEM licensing. Compliance workflow integration.", investment: "$5-$10M" },
      { phase: "Enterprise", duration: "Multi-Year", detail: "Full content ops transformation across all distribution channels. Managed services.", investment: "$15M+" },
    ],
    commercialNote:
      "Compliance content pain is acute enough that the business case for Scale typically writes itself from Sprint findings. Consider outcome-based pricing tied to production cycle reduction.",
  },
  {
    id: "INS-02",
    sector: "Insurance",
    sectorKey: "insurance",
    engine: "AEO",
    title: "Recover At-Risk Renewals 90 Days Before the Decision Window",
    subtitle:
      "Signal-driven retention orchestration aligned to predictable policy renewal cycles",
    metrics: [
      { value: "90 Days", label: "Earlier Identification of At-Risk Renewals" },
      { value: "10-15%", label: "Retention Improvement for Flagged Cohort" },
      { value: "$$$", label: "Retained Premium Revenue, Quantified" },
    ],
    problem:
      "Renewal dates are known in advance, yet most carriers still rely on batch renewal campaigns sent at fixed intervals. Behavioral indicators like engagement decay and quote-shopping behavior are scattered across systems. By the time someone flags the risk, the policyholder has already started shopping.",
    outcome:
      "A behavioral early warning system identifies at-risk policies based on engagement signal patterns, not just renewal proximity. Tiered retention journeys are triggered when behavior matches historical churn patterns. The 90-day outcome is retained premium revenue measured in dollars.",
    howItWorks:
      "ARIA Sprint uses AEP in a sandbox or limited deployment to ingest behavioral signals and build the risk score. AJO orchestrates retention journeys. Marketo handles execution where an existing instance is available.",
    pwcRole:
      "Insurance domain expertise to interpret behavioral signals in the context of policy economics and distribution dynamics. The risk score reflects how policyholders actually behave before lapsing.",
    engagementPath: [
      { phase: "Sprint", duration: "8-12 Weeks", detail: "Prove risk score and retention model on one policy book. Limited AEP deployment.", investment: "$0-$1M" },
      { phase: "Scale", duration: "12-16 Weeks", detail: "Full book. AEP + AJO + Real-Time CDP. Agency management and claims integration.", investment: "$5-$12M" },
      { phase: "Enterprise", duration: "Multi-Year", detail: "Full customer lifecycle: acquisition, servicing, renewal. Managed services.", investment: "$15M+" },
    ],
    commercialNote:
      "Strongest candidate for gain-sharing. Retained premium revenue is directly measurable. Consider a base fee plus performance component tied to retention rate improvement.",
  },
  {
    id: "MMB-01",
    sector: "Mid-Market Banks",
    sectorKey: "mmb",
    engine: "ICO",
    title: "Make a 10-Person Team Produce Like a 40-Person Team",
    subtitle:
      "Modular content operations for resource-constrained bank marketing teams",
    metrics: [
      { value: "3-5x", label: "Content Output Increase" },
      { value: "50%", label: "Reduction in Per-Campaign Production Cost" },
      { value: "40%", label: "Faster Time-to-Market" },
    ],
    problem:
      "Marketing teams manage content across deposit products, lending, wealth, commercial banking, and community engagement with fewer than 20 people. Every campaign starts from scratch. Your team spends its time on production, not strategy. You're not losing on strategy. You're losing on capacity.",
    outcome:
      "One product line's content operations transforms from campaign-by-campaign production to modular, component-based assembly. The team produces 3-5x the output without adding headcount, at roughly half the per-campaign cost.",
    howItWorks:
      "ARIA Sprint uses GenStudio and AEM Assets in a trial configuration to build the modular content hub. Firefly accelerates variant generation. PwC's Regulated Content Orchestrator (RCO) manages compliance workflows for deposit disclosures and lending materials.",
    pwcRole:
      "Operating model design: not just the tools, but how the team's roles and workflows change to sustain the new model. A 10-person team can't absorb a complex technology deployment. The operating model has to be right-sized.",
    engagementPath: [
      { phase: "Sprint", duration: "8-12 Weeks", detail: "Prove the model on one product line. Trial environment. Measurable output and cost improvement.", investment: "$250K-$500K" },
      { phase: "Scale", duration: "12-16 Weeks", detail: "All product lines and channels. Full licensing. Core banking content integration.", investment: "$3-$8M" },
      { phase: "Enterprise", duration: "Multi-Year", detail: "Full marketing ops transformation. Managed services.", investment: "$10M+" },
    ],
    commercialNote:
      "Mid-market banks are cost-sensitive. Right-size the Sprint to $250K-$500K with a clear self-funding path. Consider subscription-based managed services for Scale.",
  },
  {
    id: "MMB-02",
    sector: "Mid-Market Banks",
    sectorKey: "mmb",
    engine: "AEO",
    title: "Detect Cross-Sell Signals and Act on Them in Real Time",
    subtitle:
      "Signal-driven lifecycle orchestration for deposit deepening and lending growth",
    metrics: [
      { value: "10-20%", label: "Cross-Sell Conversion Improvement" },
      { value: "Real-Time", label: "Signal Detection Replaces Batch Targeting" },
      { value: "$$$", label: "Incremental Revenue From Activated Signals" },
    ],
    problem:
      "You sit on a goldmine of behavioral signals you can't act on. A checking customer increases their direct deposit. A business client's transaction volume spikes. These signals indicate readiness for the next product, but your team is running quarterly campaigns targeting static segments defined months ago.",
    outcome:
      "For one product pairing, a signal-driven system detects behavioral readiness and triggers personalized outreach in real time. The 90-day outcome is a measurable increase in cross-sell conversion, backed by clear data.",
    howItWorks:
      "ARIA Sprint uses AEP in a limited deployment to ingest behavioral signals from available sources. AJO or Marketo orchestrates signal-driven journeys. Target optimizes digital touchpoints. Sprint works with available data; full Real-Time CDP deployment at Scale.",
    pwcRole:
      "Signal model and journey logic design based on banking domain expertise. Which transaction patterns actually predict product readiness? This is commercial intelligence design grounded in how mid-market banking customers actually behave.",
    engagementPath: [
      { phase: "Sprint", duration: "8-12 Weeks", detail: "Prove on one product pairing. Limited AEP. Head-to-head vs. batch campaigns.", investment: "$250K-$500K" },
      { phase: "Scale", duration: "12-16 Weeks", detail: "Full product portfolio. AEP + AJO + Real-Time CDP. Core banking and CRM integration.", investment: "$5-$10M" },
      { phase: "Enterprise", duration: "Multi-Year", detail: "Full lifecycle orchestration. Predictive models. Managed services.", investment: "$10M+" },
    ],
    commercialNote:
      "Incremental cross-sell revenue is directly measurable. Strong candidate for performance-linked pricing where a portion of the fee is tied to conversion improvement.",
  },
  {
    id: "TMT-01",
    sector: "Telecom & Technology (B2B)",
    sectorKey: "tmt",
    engine: "ICO",
    title: "End the Content Fragmentation Tax",
    subtitle:
      "Unified content operations across product lines, verticals, and buyer personas",
    metrics: [
      { value: "40-60%", label: "Reduction in Content Duplication" },
      { value: "50%", label: "Faster Time-to-Market" },
      { value: "3-4x", label: "Variant Output Per Content Investment" },
    ],
    problem:
      "You accumulate content debt the way engineering accumulates technical debt. Every product launch, vertical campaign, and partner program produces its own content. The cost isn't just production. It's brand inconsistency, slow time-to-market, and an inability to personalize at the account level.",
    outcome:
      "One product line or vertical's content is restructured from campaign-specific assets into a modular, component-based architecture. Duplication is identified and eliminated. Production workflow redesigned for assembly rather than creation.",
    howItWorks:
      "ARIA Sprint uses GenStudio and AEM Assets in a trial environment. Firefly Custom Models generate brand-consistent variants. Workfront orchestrates production. Many B2B tech companies have partial Adobe deployments. Sprint leverages existing licenses where possible.",
    pwcRole:
      "Content strategy and operating model design that turns a technology deployment into a sustainable capability. Content architecture, taxonomy design, team restructuring, and workflow redesign.",
    engagementPath: [
      { phase: "Sprint", duration: "8-12 Weeks", detail: "Prove on one product line or vertical. Trial environment. Duplication audit + modular prototype.", investment: "$0-$1M" },
      { phase: "Scale", duration: "12-16 Weeks", detail: "Enterprise-wide. Full GenStudio + AEM + Workfront licensing.", investment: "$5-$12M" },
      { phase: "Enterprise", duration: "Multi-Year", detail: "Global content ops. AI-driven creation. Managed services.", investment: "$15M+" },
    ],
    commercialNote:
      "Production cost reduction and time-to-market improvement are directly measurable. Sprint should leverage existing licenses where possible and demonstrate incremental value.",
  },
  {
    id: "TMT-02",
    sector: "Telecom & Technology (B2B)",
    sectorKey: "tmt",
    engine: "AEO",
    title: "Replace Batch ABM with Signal-Driven Account Engagement",
    subtitle:
      "Real-time orchestration for enterprise accounts with complex buying committees",
    metrics: [
      { value: "25-35%", label: "Engagement Lift Over Batch ABM" },
      { value: "20-30%", label: "Faster Buying Stage Progression" },
      { value: "Pipeline", label: "Measurable Deal Velocity Improvement" },
    ],
    problem:
      "You've invested heavily in ABM, but it still operates in batch mode. The committee has 6-12 members with different roles and concerns. A batch campaign treats the account as a monolith. Sales can't tell which accounts are genuinely in-market.",
    outcome:
      "For 15-25 target accounts, ABM shifts from batch to signal-driven. Individual buying committee members receive engagement tailored to their role, triggered by behavior rather than calendar. The 90-day outcome is measurable engagement lift and pipeline acceleration.",
    howItWorks:
      "ARIA Sprint uses AEP (limited deployment) for account and individual behavioral signals. AJO orchestrates role-specific journeys. Marketo handles execution. Analytics closes the loop.",
    pwcRole:
      "Signal model and buying committee engagement architecture based on B2B sales cycle expertise. This is an engagement architecture built on how enterprise deals actually unfold.",
    engagementPath: [
      { phase: "Sprint", duration: "8-12 Weeks", detail: "Prove on 15-25 accounts. Limited AEP. Head-to-head vs. batch ABM.", investment: "$0-$1M" },
      { phase: "Scale", duration: "12-16 Weeks", detail: "Full target account portfolio. AEP + AJO + Real-Time CDP. CRM and intent data integration.", investment: "$8-$15M" },
      { phase: "Enterprise", duration: "Multi-Year", detail: "Full account-based revenue orchestration. Managed services.", investment: "$15M+" },
    ],
    commercialNote:
      "Pipeline acceleration resonates with both CMO and CRO. Consider a performance component tied to engagement lift or pipeline velocity.",
  },
  {
    id: "TMT-03",
    sector: "Telecom & Technology (B2B)",
    sectorKey: "tmt",
    engine: "AEO",
    title: "Turn Retention from a Renewal Campaign into a Continuous System",
    subtitle:
      "Signal-driven churn detection and orchestrated retention for B2B subscriptions and contracts",
    metrics: [
      { value: "15-20%", label: "Net Revenue Retention Improvement" },
      { value: "60-90 Days", label: "Earlier Churn Risk Detection" },
      { value: "$$$", label: "ARR Preserved, Quantified" },
    ],
    problem:
      "Net revenue retention drives your valuation. Despite this, retention efforts concentrate in the final 90 days before renewal. Disengagement signals were visible months earlier. Nobody synthesizes them into a real-time picture of account health.",
    outcome:
      "A behavioral early warning system detects disengagement 60-90 days before your current process would flag a risk. Automated retention plays intervene at the moment of signal detection. The 90-day outcome is a measurable improvement and quantified ARR preserved.",
    howItWorks:
      "ARIA Sprint uses AEP (sandbox/limited) to ingest marketing and engagement signals. AJO orchestrates tiered retention journeys. Marketo handles execution. Scale integrates product usage and support data through full AEP deployment.",
    pwcRole:
      "Retention economics modeling and intervention design based on B2B SaaS lifecycle expertise. The health score reflects how B2B customers actually disengage: gradually, across multiple channels, often invisible until it's too late.",
    engagementPath: [
      { phase: "Sprint", duration: "8-12 Weeks", detail: "Prove on one segment. Marketing-owned signals. Limited AEP. Measurable ARR impact.", investment: "$0-$1M" },
      { phase: "Scale", duration: "12-16 Weeks", detail: "Full customer base. AEP + AJO + Real-Time CDP. Product usage integration.", investment: "$5-$12M" },
      { phase: "Enterprise", duration: "Multi-Year", detail: "Full lifecycle orchestration. Predictive churn models. Expansion detection.", investment: "$15M+" },
    ],
    commercialNote:
      "ARR preserved is the clearest outcome metric in B2B tech. Strongest candidate for gain-sharing: base fee plus a percentage of ARR preserved above historical baseline.",
  },
  {
    id: "IND-01",
    sector: "Industrial Products",
    sectorKey: "industrial",
    engine: "ICO",
    title: "Unify the Technical Content Chaos Across Your Product Portfolio",
    subtitle:
      "Modular content operations for specs, configurators, and dealer/distributor enablement",
    metrics: [
      { value: "50-60%", label: "Faster Technical Content Updates" },
      { value: "70%+", label: "Reduction in Cross-Channel Inconsistency" },
      { value: "3x", label: "Dealer-Ready Content Output" },
    ],
    problem:
      "Your product portfolio generates thousands of technical assets produced in silos by product line. When a product changes, the update cascade takes weeks. Dealers work with outdated materials. The cost is brand inconsistency and slow time-to-market.",
    outcome:
      "One product family's technical content is restructured into modular, component-based architecture. A single source update cascades automatically across all formats and channels. Production time drops by half.",
    howItWorks:
      "ARIA Sprint uses GenStudio and AEM Assets in a trial environment. Workfront orchestrates production workflows. PwC's Regulated Content Orchestrator (RCO) provides compliance-aware governance for safety documentation.",
    pwcRole:
      "Industrial product expertise to design content architecture that accounts for technical specifications, regulatory requirements, and multi-tier channel distribution. Operating model, not just technology.",
    engagementPath: [
      { phase: "Sprint", duration: "8-12 Weeks", detail: "Prove on one product family. Trial environment. Live prototype with real data.", investment: "$0-$1M" },
      { phase: "Scale", duration: "12-16 Weeks", detail: "Full portfolio. AEM + GenStudio licensing. PIM/PLM integration.", investment: "$5-$10M" },
      { phase: "Enterprise", duration: "Multi-Year", detail: "Global technical content ops. AI-driven generation. Commerce integration.", investment: "$15M+" },
    ],
    commercialNote:
      "Often the strongest door opener where no Adobe Experience Cloud exists. Anchor value on update cycle time and dealer satisfaction.",
  },
  {
    id: "IND-02",
    sector: "Industrial Products",
    sectorKey: "industrial",
    engine: "ICO+AEO",
    title: "Arm Your Channel Partners to Sell Like Your Best Direct Team",
    subtitle:
      "Personalized dealer and distributor enablement with intelligent content delivery",
    metrics: [
      { value: "20-30%", label: "Increase in Partner Content Engagement" },
      { value: "Personalized", label: "Content by Partner Segment & Focus" },
      { value: "Real-Time", label: "Partners Always Access Current Content" },
    ],
    problem:
      "Your dealers and distributors sell your products, but they're working with outdated, generic materials. Every partner gets the same content regardless of segment or specialization. Your strongest dealers figure it out on their own. The rest default to price competition.",
    outcome:
      "For one partner segment, enablement shifts from batch distribution to personalized, signal-responsive delivery. Partners receive content tailored to their product focus, market, and selling patterns.",
    howItWorks:
      "ARIA Sprint combines AEM Assets (modular content hub) with AJO or Marketo (personalized delivery) in a trial environment. Partner portal integrates with existing platforms.",
    pwcRole:
      "Partner segmentation and enablement architecture informed by how industrial distribution actually works. Channel strategy, content mapping, and engagement design.",
    engagementPath: [
      { phase: "Sprint", duration: "8-12 Weeks", detail: "Prove personalized enablement on one partner segment. Real engagement data.", investment: "$0-$1M" },
      { phase: "Scale", duration: "12-16 Weeks", detail: "All partner segments. Full licensing. Partner management and CRM integration.", investment: "$5-$8M" },
      { phase: "Enterprise", duration: "Multi-Year", detail: "Full partner experience platform. AI content recommendations. Managed services.", investment: "$15M+" },
    ],
    commercialNote:
      "ROI measured through partner engagement and partner-attributed revenue. Consider co-funding the Sprint with the channel organization.",
  },
  {
    id: "IND-03",
    sector: "Industrial Products",
    sectorKey: "industrial",
    engine: "AEO",
    title: "Turn Long-Cycle B2B Sales from Quarterly Check-Ins to Continuous Engagement",
    subtitle:
      "Signal-driven account orchestration for complex, multi-stakeholder industrial deals",
    metrics: [
      { value: "15-25%", label: "Reduction in Sales Cycle Length" },
      { value: "30%+", label: "Increase in Multi-Stakeholder Engagement" },
      { value: "Pipeline", label: "Measurable Deal Velocity Improvement" },
    ],
    problem:
      "Sales cycles run 6-18 months with engineering, procurement, operations, finance, and executive stakeholders. Between quarterly reviews and trade shows, the account goes dark. No visibility into whether the committee is evaluating, stalled, or talking to your competitor.",
    outcome:
      "For 10-20 target accounts, engagement shifts from episodic to continuous. Individual stakeholders receive content matched to their role. Sales gets real-time intelligence. The 90-day outcome is measurable cycle time reduction.",
    howItWorks:
      "ARIA Sprint uses AEP (limited deployment) for account and stakeholder signals. AJO orchestrates role-specific journeys. Marketo handles execution. Analytics closes the loop.",
    pwcRole:
      "Signal models that reflect how complex B2B decisions actually unfold in industrial markets. Multi-stakeholder buying committee dynamics and relationship-driven selling patterns.",
    engagementPath: [
      { phase: "Sprint", duration: "8-12 Weeks", detail: "Prove on 10-20 accounts. Limited AEP. Real-time intelligence dashboards for sales.", investment: "$0-$1M" },
      { phase: "Scale", duration: "12-16 Weeks", detail: "Full target portfolio. AEP + AJO + Real-Time CDP. CRM and intent data integration.", investment: "$8-$15M" },
      { phase: "Enterprise", duration: "Multi-Year", detail: "Full account-based revenue orchestration. Predictive scoring. Commerce integration.", investment: "$15M+" },
    ],
    commercialNote:
      "Deal velocity is directly measurable and high-impact where individual deals are worth millions. Modest Sprint fee with Scale including a performance component.",
  },
  {
    id: "HLS-01",
    sector: "Healthcare, Life Sciences & Pharma",
    sectorKey: "hls",
    engine: "ICO",
    title: "Cut HCP Content Production Cycles by 60% Without Compromising Compliance",
    subtitle:
      "Modular, compliance-governed content operations for multi-therapeutic, multi-jurisdiction HCP engagement",
    metrics: [
      { value: "60%", label: "Faster HCP Content Production" },
      { value: "4-6x", label: "Compliant Variant Output" },
      { value: "Zero", label: "Increase in Compliance Exceptions" },
    ],
    problem:
      "You produce thousands of HCP-facing assets annually across therapeutic areas. Every asset requires MLR review, adding weeks or months. HCPs expect personalized content. You deliver generic assets on a quarterly cycle. Competitors who solve this first will command disproportionate attention.",
    outcome:
      "One therapeutic area's HCP content is restructured into modular, compliance-governed components. MLR-approved elements assemble into compliant variants without re-reviewing the entire asset. Speed and governance improve simultaneously.",
    howItWorks:
      "ARIA Sprint uses GenStudio and AEM Assets in trial environment. PwC's Regulated Content Orchestrator (RCO) governs the MLR workflow with automated routing, approval stage management, and variant-level compliance tracking. Firefly generates compliant variants.",
    pwcRole:
      "Deep healthcare regulatory expertise ensures compliance encoding is rigorous and defensible. Position this as compliance modernization with marketing efficiency as a co-benefit.",
    engagementPath: [
      { phase: "Sprint", duration: "8-12 Weeks", detail: "Prove on one TA. Trial environment. Compliance team validation.", investment: "$0-$1M" },
      { phase: "Scale", duration: "12-16 Weeks", detail: "All TAs and geographies. Full GenStudio + AEM with RCO. Veeva/PromoMats integration.", investment: "$8-$15M" },
      { phase: "Enterprise", duration: "Multi-Year", detail: "Global HCP content ops. AI-driven generation. Omnichannel orchestration.", investment: "$15M+" },
    ],
    commercialNote:
      "The compliance angle opens doors beyond the CMO. CFOs and CCOs care about risk reduction. Position Sprint as compliance modernization to secure multi-stakeholder sponsorship.",
  },
  {
    id: "HLS-02",
    sector: "Healthcare, Life Sciences & Pharma",
    sectorKey: "hls",
    engine: "AEO",
    title: "From Batch HCP Campaigns to Signal-Driven Engagement That Respects the Rules",
    subtitle:
      "Compliant, personalized HCP journey orchestration across channels and therapeutic areas",
    metrics: [
      { value: "20-35%", label: "HCP Engagement Lift" },
      { value: "Compliant", label: "Full Regulatory Governance Maintained" },
      { value: "Real-Time", label: "Signal-Driven Replaces Batch Cadence" },
    ],
    problem:
      "Regulatory complexity has pushed most pharma organizations toward batch engagement: scheduled campaigns, fixed cadences. The result is compliant but generic and increasingly ineffective as HCPs are overwhelmed by volume from multiple companies.",
    outcome:
      "For one TA and one HCP segment, engagement shifts from batch to signal-driven with compliance governance built into the journey architecture. Measurable engagement lift with zero increase in compliance exceptions.",
    howItWorks:
      "ARIA Sprint uses AEP (limited deployment) for HCP engagement signals. AJO orchestrates signal-driven journeys. PwC's RCO governs the content compliance layer. Sprint proves on narrow scope; Scale deploys full AEP + AJO.",
    pwcRole:
      "Compliance-governed journey architectures that satisfy medical affairs and legal requirements. This is a compliant engagement system with marketing intelligence built in.",
    engagementPath: [
      { phase: "Sprint", duration: "8-12 Weeks", detail: "Prove on one TA, one HCP segment. Limited AEP. Head-to-head vs. batch.", investment: "$0-$1M" },
      { phase: "Scale", duration: "12-16 Weeks", detail: "Full therapeutic portfolio. AEP + AJO + Real-Time CDP. CRM integration.", investment: "$8-$15M" },
      { phase: "Enterprise", duration: "Multi-Year", detail: "Full omnichannel HCP engagement. AI-driven personalization. Managed services.", investment: "$15M+" },
    ],
    commercialNote:
      "Pharma requires rigorous proof before scaling. Position Sprint as a joint PwC-Adobe investment to reduce client risk and accelerate the path to Scale licensing.",
  },
  {
    id: "HLS-03",
    sector: "Healthcare, Life Sciences & Pharma",
    sectorKey: "hls",
    engine: "AEO",
    title: "Orchestrate Patient and Member Journeys That Actually Drive Outcomes",
    subtitle:
      "Signal-driven engagement for adherence, onboarding, and wellness programs",
    metrics: [
      { value: "15-25%", label: "Engagement & Completion Rate Improvement" },
      { value: "Personalized", label: "Journeys Adapted to Individual Behavior" },
      { value: "Outcomes", label: "Measurable Health or Utilization Impact" },
    ],
    problem:
      "You invest heavily in patient and member programs: medication adherence, post-discharge follow-up, chronic condition management. Most run on fixed schedules with generic content. Engagement rates are low and declining. Patients who need the most support are often the least engaged.",
    outcome:
      "One program transforms from fixed-schedule to signal-driven. The journey adapts to individual behavior. Patients showing disengagement get proactive intervention. HIPAA governance is embedded in the architecture.",
    howItWorks:
      "ARIA Sprint uses AEP (limited, HIPAA-compliant deployment) for behavioral signals. AJO orchestrates adaptive journeys with compliance governance embedded. Scale deploys full AEP + AJO with EHR and claims integration.",
    pwcRole:
      "Journeys aligned with clinical protocols and regulatory requirements. Framed as a clinical engagement improvement initiative to secure sponsorship from clinical and operations leadership.",
    engagementPath: [
      { phase: "Sprint", duration: "8-12 Weeks", detail: "Prove on one program or condition. Limited AEP. Measurable completion rate improvement.", investment: "$0-$1M" },
      { phase: "Scale", duration: "12-16 Weeks", detail: "Full program portfolio. AEP + AJO + Real-Time CDP. EHR and claims integration.", investment: "$8-$15M" },
      { phase: "Enterprise", duration: "Multi-Year", detail: "Full patient/member engagement platform. Predictive models. Managed services.", investment: "$15M+" },
    ],
    commercialNote:
      "Frame around health outcomes and utilization impact, not marketing metrics. Payer and provider buyers respond to clinical and financial outcome framing.",
  },
];

export const pillars = [
  {
    id: "co-invest",
    title: "Co-Invest",
    subtitle: "Sprint Infrastructure",
    color: "teal" as const,
    description:
      "Pre-wired foundations per sector fusing PwC assets with Adobe's platform: AEP schemas, GenStudio configurations, PwC's Regulated Content Orchestrator (RCO), integration adapters, and journey templates.",
    value: "Eliminates cold-start friction. Clients see value faster. Sprints convert to license commitments at a higher rate.",
    investment: "Recurring investment per sector",
  },
  {
    id: "co-innovate",
    title: "Co-Innovate",
    subtitle: "Product Intelligence",
    color: "purple" as const,
    description:
      "Every ARIA Sprint generates enterprise deployment data: how AEP performs in regulated environments, where Agent Orchestrator lands with clients, and what patterns drive adoption.",
    value: "Quarterly insight reports give Adobe's product team a direct line to enterprise reality as these offerings mature.",
    investment: "Joint insight program",
  },
  {
    id: "co-deliver",
    title: "Co-Deliver",
    subtitle: "Client Conversion",
    color: "orange" as const,
    description:
      "A jointly-funded Value Architect in each Sprint builds the CFO-grade business case that drives the client's license decision.",
    value: "The Scale Investment Brief is the document that turns a successful prototype into a signed license agreement.",
    investment: "Per-Sprint joint funding",
  },
];

export const revenueMetrics = [
  { value: "15-25", label: "ARIA Sprints\nYear 1" },
  { value: "$2-5M", label: "Net-New ARR\nPer Scale Conversion" },
  { value: "75-85%", label: "Sprint-to-Scale\nConversion Target" },
  { value: "$50-60M", label: "Projected Net-New\nARR (Year 1)" },
];

export const growthData = [
  { year: "Year 1", arr: "$50-60M net-new ARR", sprints: "15-25", scale: "8-15", enterprise: "" },
  { year: "Year 2", arr: "$80-110M cumulative ARR", sprints: "20-30", scale: "12-20", enterprise: "2-4" },
  { year: "Year 3", arr: "$130-180M cumulative ARR", sprints: "25-35", scale: "18-28", enterprise: "5-10" },
];
