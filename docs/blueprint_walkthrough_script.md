# AFO Capability Blueprint — Walkthrough Script

**Format:** Single presenter, shared screen, collaborative posture (sitting at the table, not presenting from a podium)
**Duration:** 45–60 minutes core (scales to 90 in half-day workshop setting)
**Prerequisite:** Audience has received AFO grounding (first call deck or earlier in the same session)
**Primary audience:** VP / Senior Director level functional leaders
**Tool state at start:** Site loaded, all layers collapsed, all toggles off

---

## Act 1: The Bridge (5–7 minutes)

**Purpose:** Transition from the AFO vision they've already heard to the architecture that makes it real. This section also serves as a standalone executive preview in earlier C-suite conversations — a self-contained "here's what we'd take your team through" module.

**Starting view:** Header visible with the four stat cards (7 layers, 29 L1 components, 123 L2 capabilities, version).

### Talking Points

> *"You've seen the Agentic Front Office vision — the idea that AI agents will fundamentally reshape how companies run sales, service, marketing, and commerce. What we want to do now is go a level deeper."*
>
> *"One of the challenges we see with every client we work with is that 'agentic' means something different to every person in the room. Your marketing team is thinking about content personalization. Your service team is thinking about case deflection. Your sales team is thinking about pipeline intelligence. They're all right — but nobody has a shared map."*
>
> *"That's what this is. We decomposed the entire agentic front office into 123 discrete capabilities across 7 architectural layers. Not features of a specific vendor's product — capabilities that any enterprise needs regardless of platform."*

**Gesture to the stat cards:**

> *"Seven layers of architecture. Twenty-nine component areas. One hundred twenty-three specific capabilities. Each one has a maturity model, platform coverage data, and can be individually assessed. This is the most granular view of the agentic front office that exists."*

**The "so what" for this audience:**

> *"The reason this matters for your team specifically is that it gives us a shared language. When we say 'you need an agent orchestration layer,' we can point to exactly what that means — not as a vendor pitch, but as an architectural requirement. And when we assess where you are today versus where you need to be, we're doing it against a standard, not a guess."*

### Flex Point: C-Suite Preview Mode

**[If this is an earlier C-suite conversation or an executive is sitting in for the opening:]** Close Act 1 here with:

> *"This is what we'd take your team through in a working session — let me give you a quick two-minute flyover of the architecture, and then we can talk about how we'd apply it to [company name]."*

Then do a quick scroll through the collapsed layers naming each one, and skip to Act 5 (the close).

---

## Act 2: The Architecture (12–15 minutes)

**Purpose:** Build architectural literacy. They need to *see* the structure before any feature of the tool makes sense. This is the credibility moment — the depth speaks for itself.

### 2a. The Layers at a Glance (3 minutes)

**Action:** Slowly scroll down through the collapsed layer headers. Don't click anything yet. Let them read the names and absorb the structure.

> *"Let me walk you through the architecture top to bottom. Think of this like a building — each layer depends on the ones below it."*

Name each layer with a one-sentence framing:

| Layer | Framing |
|-------|---------|
| **Experience** | *"This is the surface — how customers, employees, and AI agents actually interact with your commercial engine. Web, voice, conversational, embedded."* |
| **Autonomous Experience Orchestration (AEO)** | *"This is the brain behind the experience — the layer that decides what to do next. Intent recognition, journey orchestration, agent coordination."* |
| **Functional Pillars** | *"This is where your domain expertise lives — Marketing, Sales, Commerce, Service, and Pricing. These are the five engines of the front office."* |
| **Intelligent Content Operations (ICO)** | *"Content is the fuel for everything above it — creation, governance, assembly, delivery. This is where GenAI has the most immediate impact for most organizations."* |
| **Commercial Brain** | *"This is the intelligence layer — customer 360, predictive models, decision engines, revenue analytics. This is what makes the system smart."* |
| **Enterprise Data Foundation** | *"Nothing works without this — identity resolution, data integration, quality, the underlying infrastructure that feeds everything above."* |

**Then gesture to the right sidebar:**

> *"And running alongside everything is Governance and Trust — AI ethics, security, compliance, model oversight. This isn't a nice-to-have bolted on at the end. It spans the entire stack because every layer has governance implications."*

**Pause. Let it land.**

> *"That's the architecture. Now let me show you what's inside."*

### 2b. Deep Dive — Option A: Experience + AEO Composition

**When to use this path:** This path works well when the audience is familiar with customer experience, journey orchestration, or CX platform terminology. It draws parallels to concepts they already know (CDP, journey builder, personalization engine) and then extends them into the agentic paradigm. It also naturally sets up the "don't think in silos" message — because the AEO layer sits *above* the functional pillars and orchestrates across them.

#### The Experience Layer (4–5 minutes)

**Action:** Click to expand the **Experience layer**.

> *"Let's start at the top — the Experience layer. This is every way a human or an AI agent touches your commercial engine. We've broken it into three component areas."*

**Point out the three L1 components as they expand:**

> *"First, **Conversational touchpoints** — this is what most people think of when they hear 'agentic.' Multi-modal experience agents, conversational commerce, autonomous service agents, machine workflow agents. These are the AI-native interfaces."*

**Action:** Click into Conversational touchpoints to show the L2 capabilities. Hover briefly on **Autonomous service agent** or **Conversational commerce agent** — these are immediately recognizable to a VP/SD audience.

> *"But here's what makes the architecture honest — it's not just the shiny new thing."*

**Point to the second L1:**

> *"**Traditional channels** — web, email, SMS, paid media, search, events, print. These don't go away in an agentic world. They get smarter. The content flowing through them gets more personalized, the timing gets more intelligent, the measurement gets more unified. But the channels still exist, and they need to be part of the architecture."*

> *"Most organizations we work with have 80% of their customer interactions still flowing through these traditional channels. The agentic opportunity isn't to replace them — it's to orchestrate across them."*

**Point to the third L1:**

> *"And then something that most frameworks completely miss — **Agent-to-agent interfaces.** API commerce endpoints and agent protocol endpoints. This is where your buyer's AI agent talks to your seller's AI agent. MCP, A2A, ACP protocols. This isn't science fiction — this is happening now in B2B procurement. If you're not thinking about how external agents interact with your commercial engine, you're going to be caught flat-footed."*

This third L1 is a credibility differentiator — most competitors' frameworks don't include agent-to-agent. Let the audience react.

#### The AEO Layer (5–6 minutes)

**Action:** Collapse the Experience layer. Click to expand **Autonomous Experience Orchestration (AEO)**.

> *"Now let's go one layer down to the piece that ties it all together. AEO — Autonomous Experience Orchestration. If the Experience layer is 'where,' AEO is 'how.' This is the connective tissue."*

**Point out the three L1 components:**

> *"Three areas here. First, the **Orchestration Core** — multi-agent coordination, conversation patterns, process flows, human-AI balance, event-driven routing. This is the plumbing that makes agents work together rather than stepping on each other."*

**Action:** Click into Orchestration Core. Focus on **Human-AI balance** — this one resonates universally because every leader is nervous about autonomy.

> *"I want to pause on this one — Human-AI balance. This is the capability that manages where agents act autonomously and where humans stay in the loop. Look at the maturity stages:"*
>
> - *"Stage 1: fixed rules — 'bots handle X, humans handle Y' — that's where most organizations are"*
> - *"Stage 2: confidence-based escalation — the agent knows when it's unsure"*
> - *"Stage 3: dynamic autonomy tiers that adjust based on performance and context"*
> - *"Stage 4: self-calibrating — the system earns trust through demonstrated outcomes"*
>
> *"This is the capability that determines whether your organization trusts the technology. It's not a feature of a specific platform — it's an architectural requirement."*

**Action:** Scroll to the second L1 — **Experience Composition**.

> *"Second, **Experience Composition** — this is where terms you probably already know show up: journey orchestration, dynamic segmentation, personalization, next-best-action, offer optimization. But notice where they sit in the architecture. They're not inside Marketing. They're not inside Sales. They sit above the functional pillars because their job is to compose experiences that draw from multiple functions simultaneously."*

> *"That's the key insight of the whole architecture — journey orchestration isn't a marketing capability. It's a cross-functional orchestration capability that marketing, sales, service, and commerce all feed into and benefit from."*

**This is the "don't think in silos" moment.** If the audience includes leaders from different functions, pause and let this sink in. It reframes how they think about shared infrastructure vs. function-owned tools.

**Action:** Briefly show the third L1 — **AI Workbench & Agentic UI**.

> *"And third, the AI Workbench — the human-facing surface where your marketers, sellers, and operators actually interact with all of this. Because an architecture this sophisticated still needs to be something a business user can configure and monitor without writing code."*

**Transition:**

> *"So that's the top two layers — the 'what touches the customer' and the 'what composes the experience.' Now let me show you where your domain expertise lives."*

### 2b. Deep Dive — Option B: Commercial Brain

**When to use this path:** This path works well when the audience is more analytically oriented (CDOs, data leaders, revenue operations) or when you want to start with something cross-functional that doesn't favor any single domain. The Commercial Brain is immediately recognizable to anyone who's worked with customer data, analytics, or predictive models.

**Action:** Click to expand the **Commercial Brain** layer.

> *"Let's open up the Commercial Brain as an example. This is the intelligence layer — the part that makes everything above it smart. Inside every layer, you'll see L1 components — these are the major building blocks."*

**Point out the L1 components** as they expand (Customer Intelligence, Revenue Intelligence, Decision Engines, etc.).

**Action:** Click into one L1 to show L2 capabilities.

> *"And inside each component, these are the actual capabilities — the things you'd need to build, buy, or configure. Each one is independently defined."*

### 2c. The Maturity Model (3–4 minutes)

**Use this section with either deep-dive option. Pick one L2 capability from whichever path you took to illustrate the maturity model.**

**Action:** Focus on a single L2 capability. Show the maturity indicators (Stage 1–4).

> *"Every capability has a four-stage maturity model. Let me walk you through what these stages mean — because this becomes the backbone of any assessment we do together."*
>
> - *"**Stage 1, Distributed** — the capability exists somewhere, probably in a silo, probably manually. Think spreadsheets, tribal knowledge, one person who knows how it works."*
> - *"**Stage 2, Functional** — it's been formalized within a function. There's a tool, there's a process, but it doesn't cross boundaries. Marketing has their version, Sales has theirs."*
> - *"**Stage 3, Unified** — this is the target state for most organizations on an 18-month horizon. The capability is shared across functions, data flows between systems, there's a single source of truth."*
> - *"**Stage 4, Autonomous** — the system is self-optimizing. AI agents are making decisions, learning, and adapting without human intervention for routine scenarios. This is where the 'agentic' in Agentic Front Office lives."*

> *"Most of our clients are somewhere between Stage 1 and 2 on most capabilities. The goal isn't to get everything to Stage 4 — it's to be intentional about which capabilities you push to Stage 3 and which ones you leapfrog."*

### Discussion Prompt

Pause here and invite reaction:

> *"Before I go further — does this architecture resonate with how you think about your front office? Are there areas where you immediately see yourselves, or areas that feel foreign?"*

This is a critical moment. Their answers tell you which pillars and layers to emphasize for the rest of the session. In a 90-minute workshop, let this conversation breathe — it often surfaces the most valuable insights of the session.

---

## Act 3: The Functional Pillars (10–12 minutes)

**Purpose:** Make it personal. This is where generic architecture becomes *their* architecture. The five side-by-side pillar cards are the visual that most closely maps to how they organize their teams.

**Action:** Click to expand the Functional Pillars layer. The five cards appear side by side: Marketing, Sales, Commerce, Service, Pricing.

> *"This is the heart of the front office — and probably where most of you live day to day. Five functional pillars, each with their own set of capabilities."*

> *"Notice they're laid out side by side, not stacked. That's intentional. In the reference architecture, these run in parallel — but the layers above and below them are shared. That's the whole point. The experience layer doesn't care if a lead came from marketing or a service interaction. The data foundation doesn't maintain separate customer profiles per function. The pillars are where domain expertise lives, but they're connected by shared infrastructure."*

### Choose Your Path

**[Read the room from the Act 2 discussion prompt.]** Click into the 1–2 pillars most relevant to the audience.

**Action:** Click a pillar card (e.g., **Service** if CX leaders are in the room, **Sales** if revenue leaders). The L2 capabilities expand below.

> *"Let's look at [Pillar]. You can see [X] capabilities here — things like [name 2–3 that would resonate]. Each one of these can be independently assessed and mapped to platforms."*

**Pick one L2 capability that you know will spark recognition** — something they're probably struggling with today. Walk through its description and maturity stages.

> *"Where would you put yourselves on this one today? Stage 1, 2?"*

**Don't force an answer.** If they engage, let the conversation flow — this is the collaborative energy you want. If they're quiet, just acknowledge:

> *"That's exactly the kind of question we'd work through together in an assessment."*

### Flex Point

**[If the audience spans multiple functions:]** Open a second pillar briefly to show the breadth. Don't go as deep — just show that the same rigor exists across all five.

---

## Act 4: The Diagnostic Features (10–15 minutes)

**Purpose:** Shift from "here's the architecture" to "here's what we do with it." This is the tool demo — but framed as methodology, not software.

### 4a. Platform Coverage (5–7 minutes)

**Action:** Toggle on "Show platform coverage on capabilities."

> *"Now let me add another dimension. Every one of these 123 capabilities has been mapped against five major platform ecosystems — Adobe, Salesforce, AWS, Google, and Microsoft. Not at the product level. At the capability level."*

**Point to the colored pills** that appear on the capabilities already expanded:

> *"Green means the platform has production-ready coverage for this capability. Amber means it partially addresses it — you'd need configuration, extension, or a complementary tool. Red means it's a gap — the platform doesn't address this, and you'd need to build or bring in a partner solution."*

**Action:** Scroll up and expand the **Coverage Summary** section. Show the stacked bar charts.

> *"And here's the aggregate view. You can see at a glance how each platform covers the full 123-capability map. No platform covers everything — that's by design. The agentic front office is bigger than any single vendor's ecosystem."*

> *"This isn't a vendor bake-off. We're not here to tell you which platform is best. We're here to help you understand what your current stack covers and where the gaps are — so you can make informed decisions about what to build, buy, integrate, or defer."*

### Flex Point: Platform Fit Analysis

**[If you know their platform stack or they're in a vendor consolidation conversation:]**

**Action:** Expand the **Platform Fit Analysis** section. Select the platforms they currently use.

> *"Since we know you're running on [Salesforce and AWS / Adobe and Microsoft / etc.], let me show you something. I've selected your platforms — and now the tool calculates your combined coverage."*

> *"Together, your current stack gives you strong coverage on X% of capabilities. Y capabilities are partially addressed. And Z are genuine gaps — places where neither platform in your ecosystem has a native answer."*

**If there's a gap list visible:**

> *"These gaps aren't necessarily problems to solve tomorrow. But they're the honest answer to the question: 'Can we build an agentic front office on what we already have?' The answer is almost always 'mostly, with some intentional choices.'"*

### 4b. Assessment Mode (5–8 minutes)

**Action:** Toggle on "Assessment mode."

> *"This is where the tool becomes a working instrument. In assessment mode, every capability gets a rating interface — current state and target state, on the same 1-to-4 maturity scale we talked about."*

**Action:** Demonstrate on one capability — click a current stage (e.g., 2), click a target stage (e.g., 3). Type a short note.

> *"In a full assessment sprint, we'd work through these together — your subject matter experts alongside ours. It's not a survey we send out. It's a facilitated conversation, capability by capability, where we calibrate against real evidence."*

**Action:** Scroll up to show the **Scorecard** that auto-populates.

> *"And as we rate capabilities, the scorecard builds in real time — average maturity, gaps between current and target, progress by layer. This becomes the diagnostic foundation for everything that follows."*

### Flex Point: The Pre-Populated Reveal

**[If you've pre-loaded client-specific data based on prior research, earlier conversations, or publicly available information:]**

This is the most powerful moment in the walkthrough. Transition with:

> *"Now — we didn't come into this cold. Based on what we already know about your environment from [source — public information, earlier conversations, RFP responses, whatever is appropriate], we pre-populated a starting point."*

**Action:** The assessment data is already loaded in the tool. Toggle assessment mode on if not already. Scroll through a few capabilities showing pre-filled ratings. Show the scorecard with real numbers.

> *"This isn't a finished assessment — it's a hypothesis. An informed starting point based on what we can see from the outside. The real value comes when your team validates, corrects, and fills in the gaps we can't see."*

> *"But it gives you a sense of what the output looks like. And honestly, when clients see their own environment reflected in this framework, that's usually the moment where the conversation shifts from 'is this relevant to us' to 'when do we start.'"*

---

## Act 5: The Close (5 minutes)

**Purpose:** Consolidate what they've seen and create a clear path to next steps. Don't oversell — let the tool speak for itself.

**Action:** Collapse everything back. Return to the top of the page — the header and stat cards visible.

> *"Let me bring it back up to the top. What you've seen today is the architecture — 7 layers, 29 components, 123 capabilities — and the methodology we use to turn that architecture into actionable insight for your organization."*

> *"The blueprint does three things: it gives us a shared vocabulary so we're not talking past each other, it gives us an honest diagnostic of where you are versus where you need to be, and it maps that against the platforms you already have — so every recommendation is grounded in your reality, not a theoretical ideal."*

### The Ask

Choose the framing that best fits the client's readiness and engagement context:

**[Option A — Assessment Sprint:]**

> *"The natural next step is what we call an assessment sprint. It's typically [X weeks], where we work with your functional leads to rate each relevant capability, validate the maturity levels, and produce a prioritized roadmap. You don't assess all 123 — we scope it to the domains that matter most for your strategic priorities."*

**[Option B — Broader AFO Discovery & Strategy:]**

> *"What we'd recommend is incorporating this into a broader AFO discovery engagement — where we start with the assessment but layer on journey mapping, platform architecture, and a phased transformation roadmap. The blueprint becomes the backbone of the entire engagement."*

**[Option C — Let Them Tell You:]**

> *"I'd be curious — based on what you've seen, where does your mind go? What lit up for you, and what would you want to dig into first?"*

Option C is usually the strongest close. If the tool did its job, they'll tell you what they want next.

---

## Presenter Notes

### Pacing

- **Don't rush the architecture (Act 2).** It's tempting to speed through layers to get to the "cool" features. Resist. The architecture *is* the product. If they don't understand the structure, the diagnostics are just colored dots.
- **Let silence work.** After you show a maturity model or a platform coverage view, pause. Count to three. The most valuable reactions come after the pause.
- **Follow their energy.** If they latch onto a specific pillar or layer, stay there. The script is a guide, not a rail.

### Choosing Your Act 2 Deep-Dive Path

| Audience composition | Recommended path |
|---|---|
| CX / Marketing / Digital leaders | **Option A (Experience + AEO)** — draws parallels to journey orchestration, CDP, personalization concepts they already know |
| CDO / Data / Revenue Ops leaders | **Option B (Commercial Brain)** — starts with analytics, customer intelligence, decision engines |
| Mixed functional leaders | **Option A (Experience + AEO)** — the "don't think in silos" message resonates when multiple functions are represented |
| Technical / Architecture audience | **Either** — but spend more time in maturity indicators and platform coverage than in the narrative framing |

### Timing Guide

| Section | 45-min version | 60-min version | 90-min workshop |
|---|---|---|---|
| Act 1: The Bridge | 5 min | 7 min | 7 min |
| Act 2: The Architecture | 10 min | 15 min | 20 min (allow discussion) |
| Act 3: Functional Pillars | 8 min | 12 min | 20 min (open 3–4 pillars) |
| Act 4: Diagnostics | 10 min | 15 min | 25 min (deeper platform fit) |
| Act 5: The Close | 5 min | 5 min | 5 min |
| Buffer / Discussion | 7 min | 6 min | 13 min |

### Common Audience Reactions and How to Handle Them

| Reaction | Response |
|----------|----------|
| *"We're already doing a lot of this"* | *"That's great — the assessment will validate that. What we often find is that capabilities exist but aren't connected across functions. The maturity model helps distinguish between having a tool and having a capability."* |
| *"This feels overwhelming — 123 capabilities?"* | *"You'd never assess all 123 at once. We scope to the 30–40 that matter for your priority use cases. The full map exists so we never miss a dependency."* |
| *"How does this compare to [Vendor X]'s framework?"* | *"Vendor frameworks are designed to map to their product portfolio. This is platform-agnostic — it tells you what you need, then we look at how your platforms cover it. That's a fundamentally different starting point."* |
| *"Can we get access to this tool?"* | *"The tool is part of how we work together — it's the instrument for our engagement, and the assessment data becomes a client deliverable. We'd set up a dedicated instance for your organization."* |
| *"What about [capability/topic] not shown here?"* | *"Good catch. This is a living framework — v0.2 with 123 capabilities today. If there's something specific to your industry or operating model, we'd incorporate it into your assessment scope."* |

### What NOT to Do

- **Don't click through every layer.** Pick 2–3. Let them ask about the rest.
- **Don't turn it into a vendor conversation.** Platform coverage is a diagnostic, not a recommendation. Stay neutral.
- **Don't demo assessment mode for more than 2–3 capabilities.** Show the mechanism, not the entire workflow.
- **Don't apologize for gaps or "v0.2."** The version number signals iterative rigor, not incompleteness.
