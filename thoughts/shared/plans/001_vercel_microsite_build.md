---
title: AFO Capability Blueprint — Vercel Microsite Build
date: 2026-04-17
status: in-progress
research: []
---

# AFO Capability Blueprint — Vercel Microsite Build

## Phase 1: Project Scaffold
**Objective:** Initialize Next.js + Tailwind + TypeScript project

### Tasks
- [x] Create Next.js app with TypeScript, Tailwind, ESLint, App Router
- [x] Define TypeScript interfaces for the full JSON data model (types.ts)
- [x] Configure Tailwind with spec color tokens (light + dark mode CSS vars)
- [x] Set up DM Sans font via next/font/google
- [x] Import afo_capability_blueprint.json as static data source

### Success Criteria
- [x] `npm run build` compiles with zero errors
- [x] Dev server starts and renders the page

### Files Created
- `src/types.ts` — BlueprintData, Layer, L1Component, L2Capability, etc.
- `src/lib/constants.ts` — LAYER_COLORS, PILLAR_COLORS, VENDORS, STAGE_NAMES
- `src/app/globals.css` — CSS custom properties for light/dark mode
- `src/app/layout.tsx` — Root layout with DM Sans font

---

## Phase 2: Core Components
**Objective:** Port all prototype features to React components

### Tasks
- [x] Header — title, subtitle, stat cards
- [x] Toolbar — expand/collapse all, coverage toggle, assessment toggle
- [x] LayerLegend — color dots for each layer
- [x] LayerAccordion — standard layer with L1/L2 drill-down
- [x] FunctionalPillars — special 5-card horizontal layout
- [x] GovernanceSidebar — collapsed bar / expanded panel
- [x] L2Card — capability card (ID, name, description)
- [x] MaturityIndicators — stage 1-4 grid with colored left borders
- [x] CoveragePills — vendor pills with tooltips
- [x] AssessmentControls — current/target stage buttons + notes
- [x] CoverageSummary — collapsible aggregate bar charts
- [x] Scorecard — assessment dashboard with real-time stats
- [x] Blueprint — top-level client component orchestrating state

### Success Criteria
- [x] All 6 horizontal layers render with correct colors
- [x] Functional pillars render as 5 cards, click to expand
- [x] Governance sidebar collapses/expands
- [x] Coverage toggle shows/hides pills on all capabilities
- [x] Assessment mode shows stage buttons and notes
- [x] Scorecard auto-appears when assessments exist

### Files Created
- `src/components/Blueprint.tsx`
- `src/components/Header.tsx`
- `src/components/Toolbar.tsx`
- `src/components/Toggle.tsx`
- `src/components/LayerLegend.tsx`
- `src/components/LayerAccordion.tsx`
- `src/components/L1Accordion.tsx`
- `src/components/FunctionalPillars.tsx`
- `src/components/GovernanceSidebar.tsx`
- `src/components/L2Card.tsx`
- `src/components/MaturityIndicators.tsx`
- `src/components/CoveragePills.tsx`
- `src/components/AssessmentControls.tsx`
- `src/components/CoverageSummary.tsx`
- `src/components/Scorecard.tsx`

---

## Phase 3: Platform Fit Analysis (deferred)
**Objective:** Build the multi-select platform fit diagnostic

### Tasks
- [ ] Platform checkbox selector (5 main platforms)
- [ ] Combined coverage calculation (best rating across selected)
- [ ] Aggregate stats + stacked bar
- [ ] Gap list grouped by layer

---

## Phase 4: Data Persistence (deferred)
**Objective:** Persist assessment data beyond browser memory

### Tasks
- [ ] LocalStorage persistence for assessments
- [ ] URL-based engagement ID
- [ ] Export assessment as JSON/PDF
- [ ] Consider database backend for multi-user scenarios

---

## Phase 5: Vercel Deployment (pending)
**Objective:** Deploy to Vercel

### Tasks
- [ ] Configure vercel.json if needed
- [ ] Deploy via Vercel CLI or GitHub integration
- [ ] Verify production build and performance
