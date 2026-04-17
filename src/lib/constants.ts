import { Vendor } from "@/types";

export const LAYER_COLORS: Record<string, string> = {
  experience: "#534AB7",
  orchestration_aeo: "#7F77DD",
  functional_pillars: "#D85A30",
  content_operations_ico: "#0F6E56",
  commercial_brain: "#185FA5",
  enterprise_data: "#888780",
  governance_trust: "#993556",
};

export const PILLAR_COLORS: Record<string, string> = {
  pillar_marketing: "#534AB7",
  pillar_sales: "#185FA5",
  pillar_commerce: "#0F6E56",
  pillar_service: "#D85A30",
  pillar_pricing: "#BA7517",
};

export const LAYER_NAMES: Record<string, string> = {
  experience: "Experience",
  orchestration_aeo: "AEO",
  functional_pillars: "Functional pillars",
  content_operations_ico: "ICO",
  commercial_brain: "Commercial Brain",
  enterprise_data: "Enterprise data",
  governance_trust: "Governance & trust",
};

export const VENDORS: Vendor[] = [
  { key: "adobe", name: "Adobe" },
  { key: "salesforce", name: "Salesforce" },
  { key: "aws", name: "AWS" },
  { key: "google", name: "Google" },
  { key: "microsoft", name: "Microsoft" },
  { key: "nvidia", name: "NVIDIA", overlay: true },
];

export const STAGE_NAMES: Record<number, string> = {
  1: "Distributed",
  2: "Functional",
  3: "Unified",
  4: "Autonomous",
};

export const STAGE_COLORS: Record<number, string> = {
  1: "var(--color-tx3)",
  2: "#534AB7",
  3: "#0F6E56",
  4: "#185FA5",
};

export const STAGE_LABELS = [
  { key: "stage_1", label: "Stage 1: Distributed", cls: "s1" },
  { key: "stage_2", label: "Stage 2: Functional", cls: "s2" },
  { key: "stage_3", label: "Stage 3: Unified (target)", cls: "s3" },
  { key: "stage_4", label: "Stage 4: Autonomous", cls: "s4" },
] as const;
