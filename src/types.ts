export interface PlatformCoverage {
  rating: "strong" | "partial" | "gap";
  products: string[];
  notes: string;
}

export interface MaturityIndicators {
  stage_1: string;
  stage_2: string;
  stage_3: string;
  stage_4: string;
}

export interface ClientAssessment {
  current_stage: number | null;
  target_stage: number | null;
  notes: string;
  assessed: boolean;
}

export interface L2Capability {
  id: string;
  name: string;
  description: string;
  platform_coverage: Record<string, PlatformCoverage>;
  maturity_indicators: MaturityIndicators;
  client_assessment: ClientAssessment;
}

export interface L1Component {
  id: string;
  name: string;
  description: string;
  l2_capabilities: L2Capability[];
}

export interface Layer {
  id: string;
  name: string;
  design_question: string;
  design_principle: string;
  l1_components: L1Component[];
}

export interface AssessmentSchema {
  description: string;
  fields: Record<string, string>;
  stages: Record<string, string>;
}

export interface BlueprintMetadata {
  title: string;
  version: string;
  status: string;
  description: string;
  total_l1_components: number;
  total_l2_capabilities: number;
  assessment_schema: AssessmentSchema;
}

export interface BlueprintData {
  metadata: BlueprintMetadata;
  layers: Layer[];
}

export interface AssessmentEntry {
  current: number | null;
  target: number | null;
  notes: string;
}

export type Assessments = Record<string, AssessmentEntry>;

export interface Vendor {
  key: string;
  name: string;
  overlay?: boolean;
}
