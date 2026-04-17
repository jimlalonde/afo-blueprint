# AFO Capability Blueprint: Cursor Build Spec

## Overview

The AFO Capability Blueprint is an interactive reference, assessment, and platform analysis tool for the Agentic Front Office architecture. It is built from a single JSON data source and supports four modes of use: reference browsing, platform coverage analysis, maturity assessment, and platform fit analysis.

This spec describes the data model, interaction patterns, visual design decisions, and intended features for the Vercel microsite build.

---

## Data model

The JSON file (`afo_capability_blueprint.json`) is the single source of truth. All UI renders from this data.

### Structure

```
metadata
  title, version, status, description
  total_l1_components (29)
  total_l2_capabilities (123)
  assessment_schema (field definitions for client assessments)

layers[] (7 layers)
  id, name, design_question, design_principle
  l1_components[] (29 total across all layers)
    id, name, description
    l2_capabilities[] (123 total)
      id, name, description
      maturity_indicators
        stage_1: "..." (Distributed)
        stage_2: "..." (Functional)
        stage_3: "..." (Unified / target)
        stage_4: "..." (Autonomous)
      platform_coverage
        adobe: { rating, products[], notes }
        salesforce: { rating, products[], notes }
        aws: { rating, products[], notes }
        google: { rating, products[], notes }
        microsoft: { rating, products[], notes }
        nvidia: { rating, products[], notes }  // only 8 capabilities mapped
      client_assessment
        current_stage: 1-4 or null
        target_stage: 1-4 or null
        notes: ""
        assessed: false
```

### Key data notes

- `platform_coverage.rating` values: "strong", "partial", "gap"
- `platform_coverage` for NVIDIA is only populated on 8 of 123 capabilities (Model Hub + select Knowledge Engine/GenAI). NVIDIA is a compute infrastructure overlay, not a full platform.
- `client_assessment` fields are empty in the template JSON. They are populated per client engagement.
- All 123 L2 capabilities have maturity indicators (S1-S4) populated.
- Stage names: Stage 1 = Distributed, Stage 2 = Functional, Stage 3 = Unified (target), Stage 4 = Autonomous

---

## Architecture layout

The layout mirrors the AFO reference architecture diagram:

### Six horizontal layers (stacked vertically, left column)
1. Experience layer (3 L1, 13 L2)
2. Autonomous experience orchestration / AEO (3 L1, 12 L2)
3. Functional pillars (5 L1, 31 L2) -- SPECIAL LAYOUT
4. Intelligent content operations / ICO (4 L1, 14 L2)
5. Commercial Brain (6 L1, 26 L2)
6. Enterprise data foundation (4 L1, 15 L2)

### Governance & trust (vertical sidebar, right column)
- Renders as a vertical bar alongside all six horizontal layers (4 L1, 12 L2)
- When collapsed: thin maroon bar with rotated text, flanking arrows top and bottom, L1/L2 count
- When expanded: 340px panel with L1 accordion inside
- Bar height matches the content height of the horizontal layers (grows/shrinks as layers expand/collapse)

### Functional pillars special layout
When expanded, the 5 pillars render as horizontal cards side by side (matching the reference architecture diagram):
- Marketing (purple, #534AB7)
- Sales (blue, #185FA5)
- Commerce (green, #0F6E56)
- Service (coral, #D85A30)
- Pricing (amber, #BA7517)

Click a pillar card to expand its L2 capabilities in a detail panel below the row. Only one pillar expanded at a time. Click the same pillar to collapse.

### Standard layer layout
All other layers use a vertical accordion: click layer header to expand L1 components, click L1 to expand L2 capabilities.

---

## Color system

### Layer colors
- Experience: #534AB7 (purple)
- AEO: #7F77DD (light purple)
- Functional pillars: #D85A30 (coral)
- ICO: #0F6E56 (teal/green)
- Commercial Brain: #185FA5 (blue)
- Enterprise data: #888780 (gray)
- Governance & trust: #993556 (maroon/pink)

### Maturity stage colors (used on left-border accents)
- Stage 1: gray (var(--tx3))
- Stage 2: #534AB7 (purple)
- Stage 3: #0F6E56 (green) -- this is the target state
- Stage 4: #185FA5 (blue)

### Coverage rating colors
- Strong: green (#639922 dot, #EAF3DE bg, #97C459 border, #27500A text)
- Partial: amber (#EF9F27 dot, #FAEEDA bg, #FAC775 border, #633806 text)
- Gap: red (#E24B4A dot, #FCEBEB bg, #F09595 border, #791F1F text)

Dark mode variants swap to darker bg with lighter text from the same ramp.

---

## Vendor display order

Adobe, Salesforce, AWS, Google, Microsoft (then NVIDIA as overlay)

Rationale: experience platforms first (Adobe, Salesforce), infrastructure platforms second (AWS, Google, Microsoft), alphabetical within each group. Avoids implied bias.

NVIDIA is not a peer platform. It is a compute infrastructure overlay that maps to only 8 capabilities in the Model Hub and GenAI layers. Display it separately with a label like "Compute infrastructure overlay (8 of 123 capabilities)" and do not include it in the main coverage bar charts.

---

## Features and interaction patterns

### 1. Reference mode (default)

The default view. User browses the architecture by expanding layers and reading capability descriptions and maturity indicators.

- Each layer is collapsible (click header to expand/collapse)
- "Expand all layers" / "Collapse all layers" toggle link
- L2 capabilities show: ID, name, description, maturity indicators (S1-S4)
- Maturity indicators display as a 2-column grid with stage labels: "Stage 1: Distributed", "Stage 2: Functional", "Stage 3: Unified (target)", "Stage 4: Autonomous"

### 2. Platform coverage (toggle)

Toggle switch: "Show platform coverage on capabilities"
When on: each L2 capability shows vendor pills below the maturity indicators.

Each pill shows: vendor name + rating (e.g., "Adobe: Strong")
Color-coded: green for strong, amber for partial, red for gap
Hover tooltip shows: product names on first line, notes on second line

Tooltip positioning: for the governance sidebar panel, tooltips should center horizontally within the panel (not anchor to the individual pill) to avoid overflow.

Starts OFF by default.

### 3. Platform coverage summary (collapsible section)

A collapsible section above the architecture layout showing aggregate coverage for all vendors.

For each of the 5 main platforms (Adobe, Salesforce, AWS, Google, Microsoft):
- Vendor name
- Stacked bar chart (green/amber/red proportional to strong/partial/gap)
- Count: X strong, Y partial, Z gap

For NVIDIA:
- Displayed below a separator line
- Label: "Compute infrastructure overlay (8 of 123 capabilities)"
- Just strong/partial counts, no bar chart

Legend: Strong = production-ready, Partial = addresses some requirements, Gap = partner or build required

Starts COLLAPSED by default.

### 4. Assessment mode (toggle)

Toggle switch: "Assessment mode"
When on: each L2 capability shows a rating interface below the maturity indicators (and below coverage pills if both are on).

Rating interface per capability:
- "Current" row: four numbered buttons (1, 2, 3, 4) for selecting current maturity stage
- "Target" row: four numbered buttons (1, 2, 3, 4) for selecting target maturity stage
- Notes field: single-line text input for facilitator observations
- Click a number to select it (highlights with stage color). Click same number to deselect.
- Stage label appears next to selection (e.g., "Unified")

Button colors when selected:
- 1: gray background
- 2: purple (#EEEDFE bg, #534AB7 border/text)
- 3: green (#E1F5EE bg, #0F6E56 border/text)
- 4: blue (#E6F1FB bg, #185FA5 border/text)

Starts OFF by default.

### 5. Assessment scorecard (auto-appears)

Hidden until at least one capability is assessed. Then appears as a collapsible section above the other sections.

Contents:
- Four stat cards: average current stage, capabilities assessed, remaining, gaps (where current < target)
- Per-layer bar chart: each layer shows a colored bar proportional to its average maturity score (0-4), with the score value and assessed/total count

Updates in real time as the user rates capabilities.

### 6. Platform fit analysis (collapsible section)

A collapsible section with multi-select checkboxes for the 5 main platforms.

When platforms are selected:
- For each L2 capability, determine the BEST coverage across selected platforms (e.g., if Adobe is "strong" and Salesforce is "partial", the combined rating is "strong")
- Show aggregate: X strong, Y partial, Z gap with stacked bar
- Summary text: "Combined coverage addresses X% of capabilities (Y at production strength). Z capabilities require additional solutions."
- Gap list: scrollable list showing every capability where ALL selected platforms are "gap" or unmapped, grouped by layer

This is the diagnostic that answers "Does our current stack cover what we need?"

Starts COLLAPSED by default.

---

## Data persistence

In this HTML prototype, assessment data lives in browser memory (JavaScript object). For the Vercel microsite:

- The reference JSON is static/read-only (the blueprint template)
- Assessment data should persist per client engagement (database or local storage)
- Consider a URL-based engagement ID so assessments can be shared/revisited
- Export capability: generate a PDF or JSON of the completed assessment

---

## Future features (not in current prototype)

### Micro-journey mapping
Each of the 13 ARIA micro-journeys maps to a subset of L2 capabilities (typically 15-25 per journey). Selecting a micro-journey filters the blueprint to just those capabilities. Combined with assessment data, this generates a scoped Sprint brief.

Data structure would be a separate mapping file:
```
micro_journeys[]
  id, name, vertical, description
  required_capabilities[] (array of L2 capability IDs)
```

### Sprint scoping view
Combines micro-journey filter + assessment data + platform coverage to generate:
- Which capabilities are needed for this journey
- Client's current maturity on each
- Platform coverage for each
- Gap analysis (maturity gap + platform gap)
- Estimated Sprint scope

---

## Technical notes

- Max width: 1200px
- Font: DM Sans (with system-ui fallback)
- Full light/dark mode support using CSS variables
- No external JS frameworks in the prototype (vanilla JS)
- For Vercel: React + Tailwind recommended; the JSON data model maps directly to React component props
