"use client";

import { useState, useRef, useEffect } from "react";
import {
  sectors,
  microJourneys,
  pillars,
  revenueMetrics,
  growthData,
  type MicroJourney,
  type Engine,
} from "./data";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, isVisible };
}

function EngineTag({ engine }: { engine: Engine }) {
  const styles: Record<Engine, string> = {
    ICO: "bg-teal-500/10 text-teal-400 border-teal-500/30",
    AEO: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    "ICO+AEO": "bg-purple-500/10 text-purple-400 border-purple-500/30",
  };
  const labels: Record<Engine, string> = {
    ICO: "Intelligent Content Operations",
    AEO: "Autonomous Experience Orchestration",
    "ICO+AEO": "ICO + AEO",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[engine]}`}
    >
      {labels[engine]}
    </span>
  );
}

function JourneyCard({
  journey,
  isExpanded,
  onToggle,
}: {
  journey: MicroJourney;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const phaseColors = {
    Sprint: "bg-orange-500",
    Scale: "bg-blue-500",
    Enterprise: "bg-slate-800",
  };

  return (
    <div
      className={`group relative rounded-xl border transition-all duration-300 overflow-hidden ${
        isExpanded
          ? "border-orange-500/40 bg-white shadow-lg shadow-orange-500/5"
          : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full text-left p-6 cursor-pointer"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-bold text-orange-600 tracking-wider uppercase">
                {journey.id}
              </span>
              <EngineTag engine={journey.engine} />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 leading-tight mb-1">
              {journey.title}
            </h3>
            <p className="text-sm text-slate-500">{journey.subtitle}</p>
          </div>
          <div
            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
              isExpanded
                ? "bg-orange-500 text-white rotate-180"
                : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          {journey.metrics.map((m, i) => (
            <div key={i} className="flex-1 min-w-0">
              <div className="text-lg font-bold text-slate-900">{m.value}</div>
              <div className="text-xs text-slate-500 leading-tight">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </button>

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6 space-y-5 border-t border-slate-100 pt-5">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                The Problem
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed">
                {journey.problem}
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                What Changes in 90 Days
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed">
                {journey.outcome}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                How the Sprint Works
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed">
                {journey.howItWorks}
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                PwC&apos;s Role
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed">
                {journey.pwcRole}
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Engagement Path
            </h4>
            <div className="flex gap-0 rounded-lg overflow-hidden border border-slate-200">
              {journey.engagementPath.map((step) => (
                <div
                  key={step.phase}
                  className="flex-1 p-4 border-r last:border-r-0 border-slate-200"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div
                      className={`w-2 h-2 rounded-full ${phaseColors[step.phase]}`}
                    />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      {step.phase}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mb-1">
                    {step.duration}
                  </div>
                  <div className="text-xs text-slate-700 leading-relaxed">
                    {step.detail}
                  </div>
                  <div className="text-sm font-semibold text-slate-900 mt-2">
                    {step.investment}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-orange-50 border-l-4 border-orange-400 rounded-r-lg p-4">
            <div className="text-xs font-bold uppercase tracking-wider text-orange-600 mb-1">
              Commercial Model
            </div>
            <p className="text-sm text-slate-700">{journey.commercialNote}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AriaMicrosite() {
  const [activeSector, setActiveSector] = useState<string | "all">("all");
  const [activeEngine, setActiveEngine] = useState<Engine | "all">("all");
  const [expandedJourney, setExpandedJourney] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const progress =
        window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight);
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredJourneys = microJourneys.filter((j) => {
    const sectorMatch = activeSector === "all" || j.sectorKey === activeSector;
    const engineMatch = activeEngine === "all" || j.engine === activeEngine;
    return sectorMatch && engineMatch;
  });

  const heroSection = useInView();
  const pillarsSection = useInView();
  const metricsSection = useInView();
  const journeysSection = useInView();

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-100">
        <div
          className="h-full bg-gradient-to-r from-orange-500 via-blue-500 to-teal-500 transition-all duration-150"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-1 left-0 right-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-slate-400 tracking-wider uppercase">
              PwC &times; Adobe
            </span>
            <span className="text-slate-200">|</span>
            <span className="text-sm font-bold text-slate-900 tracking-wide">
              ARIA
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a
              href="#overview"
              className="text-slate-500 hover:text-slate-900 transition-colors"
            >
              Overview
            </a>
            <a
              href="#pillars"
              className="text-slate-500 hover:text-slate-900 transition-colors"
            >
              How It Works
            </a>
            <a
              href="#impact"
              className="text-slate-500 hover:text-slate-900 transition-colors"
            >
              Impact
            </a>
            <a
              href="#journeys"
              className="text-slate-500 hover:text-slate-900 transition-colors"
            >
              Micro-Journeys
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section
        id="overview"
        ref={heroSection.ref}
        className="relative pt-32 pb-24 px-6"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-orange-50/30" />
        <div
          className={`relative max-w-5xl mx-auto text-center transition-all duration-1000 ${
            heroSection.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-semibold tracking-wider uppercase mb-8">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            Sales Enablement
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6">
            <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent">
              ARIA
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto mb-4 font-light">
            Agentic Revenue & Intelligence Accelerator
          </p>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12">
            The joint investment model that puts Adobe at the heart of the
            Agentic Front Office.{" "}
            <span className="text-slate-900 font-medium">
              13 industry-specific micro-journeys
            </span>{" "}
            designed to prove measurable outcomes in 90 days and convert to
            license commitments.
          </p>

          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">90</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">
                Day Sprints
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">13</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">
                Micro-Journeys
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600">5</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">
                Industry Sectors
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Opportunity */}
      <section className="py-20 px-6 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-4">
            The Opportunity
          </h2>
          <p className="text-lg leading-relaxed text-slate-300">
            Adobe wins enterprise CX deals. The challenge is what happens after
            the signature. Sales cycles are long, value realization is slow, and
            adoption gaps create attrition risk at renewal.{" "}
            <span className="text-white font-medium">
              ARIA is designed to fix exactly that.
            </span>{" "}
            Pre-wired Sprint infrastructure compresses time-to-value. Proven
            micro-journeys accelerate adoption by showing results in 90 days,
            not 18 months. And the business case architecture builds the
            CFO-grade evidence that makes renewal and expansion decisions
            straightforward.
          </p>
          <p className="text-lg leading-relaxed text-slate-300 mt-6">
            The faster clients see value, the faster they commit, expand, and
            stay.
          </p>
        </div>
      </section>

      {/* Three Pillars */}
      <section id="pillars" ref={pillarsSection.ref} className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              pillarsSection.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Three Ways We Accelerate Together
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Co-Invest. Co-Innovate. Co-Deliver.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((pillar, i) => {
              const colorMap = {
                teal: {
                  border: "border-t-teal-500",
                  title: "text-teal-600",
                  bg: "bg-teal-50",
                },
                purple: {
                  border: "border-t-purple-500",
                  title: "text-purple-600",
                  bg: "bg-purple-50",
                },
                orange: {
                  border: "border-t-orange-500",
                  title: "text-orange-600",
                  bg: "bg-orange-50",
                },
              };
              const colors = colorMap[pillar.color];
              return (
                <div
                  key={pillar.id}
                  className={`rounded-xl border border-slate-200 ${colors.border} border-t-4 p-6 transition-all duration-700 ${
                    pillarsSection.isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-12"
                  }`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div
                    className={`text-xs font-bold uppercase tracking-wider ${colors.title} mb-1`}
                  >
                    {pillar.title}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    {pillar.subtitle}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {pillar.description}
                  </p>
                  <div className={`${colors.bg} rounded-lg p-3`}>
                    <p className="text-sm text-slate-700 font-medium">
                      {pillar.value}
                    </p>
                  </div>
                  <div className="mt-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {pillar.investment}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Revenue Impact */}
      <section
        id="impact"
        ref={metricsSection.ref}
        className="py-24 px-6 bg-slate-900"
      >
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              metricsSection.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              License Revenue Impact
            </h2>
            <p className="text-lg text-slate-400">
              Sprints prove the platform. Scale locks in the license. Enterprise
              makes Adobe permanent.
            </p>
          </div>

          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 transition-all duration-1000 delay-200 ${
              metricsSection.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {revenueMetrics.map((m, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-2">
                  {m.value}
                </div>
                <div className="text-xs text-slate-400 uppercase tracking-wider whitespace-pre-line leading-relaxed">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* Growth Chart */}
          <div
            className={`bg-slate-800 rounded-2xl p-8 transition-all duration-1000 delay-400 ${
              metricsSection.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-8">
              3-Year License Growth
            </h3>
            <div className="grid grid-cols-3 gap-8">
              {growthData.map((year, i) => (
                <div key={i} className="text-center">
                  <div className="flex flex-col gap-2 mb-4">
                    <div
                      className="bg-orange-500 rounded-md flex items-center justify-center text-white text-xs font-semibold py-3 transition-all duration-1000"
                      style={{
                        opacity: metricsSection.isVisible ? 1 : 0,
                        transform: metricsSection.isVisible
                          ? "scaleY(1)"
                          : "scaleY(0)",
                        transitionDelay: `${600 + i * 200}ms`,
                        transformOrigin: "bottom",
                      }}
                    >
                      {year.sprints} Sprints
                    </div>
                    <div
                      className="bg-blue-500 rounded-md flex items-center justify-center text-white text-xs font-semibold py-3 transition-all duration-1000"
                      style={{
                        opacity: metricsSection.isVisible ? 1 : 0,
                        transform: metricsSection.isVisible
                          ? "scaleY(1)"
                          : "scaleY(0)",
                        transitionDelay: `${800 + i * 200}ms`,
                        transformOrigin: "bottom",
                      }}
                    >
                      {year.scale} Scale
                    </div>
                    {year.enterprise && (
                      <div
                        className="bg-slate-600 rounded-md flex items-center justify-center text-white text-xs font-semibold py-3 transition-all duration-1000"
                        style={{
                          opacity: metricsSection.isVisible ? 1 : 0,
                          transform: metricsSection.isVisible
                            ? "scaleY(1)"
                            : "scaleY(0)",
                          transitionDelay: `${1000 + i * 200}ms`,
                          transformOrigin: "bottom",
                        }}
                      >
                        {year.enterprise} Enterprise
                      </div>
                    )}
                  </div>
                  <div className="text-white font-bold">{year.year}</div>
                  <div className="text-xs text-slate-400 mt-1">{year.arr}</div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-8 mt-8 pt-6 border-t border-slate-700">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-orange-500" />
                <span className="text-xs text-slate-400">Sprint ($0-$1M)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-blue-500" />
                <span className="text-xs text-slate-400">
                  Scale ($5-$15M)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-slate-600" />
                <span className="text-xs text-slate-400">
                  Enterprise ($15-$50M+)
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Micro-Journeys Catalog */}
      <section
        id="journeys"
        ref={journeysSection.ref}
        className="py-24 px-6 bg-slate-50"
      >
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              journeysSection.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Industry Micro-Journeys
            </h2>
            <p className="text-lg text-slate-500 max-w-3xl mx-auto">
              Each brief leads with a business outcome the client is already
              trying to solve. Pick the 1-2 that match the account&apos;s industry
              and pain point.
            </p>
          </div>

          {/* Filters */}
          <div
            className={`flex flex-col md:flex-row gap-4 mb-8 transition-all duration-1000 delay-200 ${
              journeysSection.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {/* Sector filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveSector("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  activeSector === "all"
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
                }`}
              >
                All Sectors
              </button>
              {sectors.map((s) => (
                <button
                  key={s.key}
                  onClick={() => setActiveSector(s.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    activeSector === s.key
                      ? "bg-slate-900 text-white"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {s.name}
                  <span className="ml-1.5 text-xs opacity-60">
                    ({s.journeyCount})
                  </span>
                </button>
              ))}
            </div>

            {/* Engine filter */}
            <div className="flex gap-2 md:ml-auto">
              <button
                onClick={() => setActiveEngine("all")}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeEngine === "all"
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveEngine("ICO")}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeEngine === "ICO"
                    ? "bg-teal-600 text-white"
                    : "bg-white text-teal-600 border border-teal-200 hover:border-teal-300"
                }`}
              >
                ICO
              </button>
              <button
                onClick={() => setActiveEngine("AEO")}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeEngine === "AEO"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-blue-600 border border-blue-200 hover:border-blue-300"
                }`}
              >
                AEO
              </button>
              <button
                onClick={() => setActiveEngine("ICO+AEO")}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeEngine === "ICO+AEO"
                    ? "bg-purple-600 text-white"
                    : "bg-white text-purple-600 border border-purple-200 hover:border-purple-300"
                }`}
              >
                Hybrid
              </button>
            </div>
          </div>

          {/* Sector description */}
          {activeSector !== "all" && (
            <div className="mb-8 p-4 bg-white rounded-lg border border-slate-200">
              <p className="text-sm text-slate-600">
                <span className="font-semibold text-slate-900">
                  {sectors.find((s) => s.key === activeSector)?.name}:
                </span>{" "}
                {sectors.find((s) => s.key === activeSector)?.description}
              </p>
            </div>
          )}

          {/* Results count */}
          <div className="mb-6 text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-900">
              {filteredJourneys.length}
            </span>{" "}
            micro-journey{filteredJourneys.length !== 1 ? "s" : ""}
          </div>

          {/* Journey Cards */}
          <div className="space-y-4">
            {filteredJourneys.map((journey) => (
              <JourneyCard
                key={journey.id}
                journey={journey}
                isExpanded={expandedJourney === journey.id}
                onToggle={() =>
                  setExpandedJourney(
                    expandedJourney === journey.id ? null : journey.id
                  )
                }
              />
            ))}
          </div>

          {filteredJourneys.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500">
                No micro-journeys match the current filters.
              </p>
              <button
                onClick={() => {
                  setActiveSector("all");
                  setActiveEngine("all");
                }}
                className="mt-4 text-sm text-orange-600 font-medium hover:underline cursor-pointer"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Why Now */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Why This Matters Now
          </h2>
          <div className="text-lg text-slate-600 leading-relaxed space-y-6">
            <p>
              We are at an inflection point. The shift to an Agentic Front
              Office will reshape how software and consulting companies compete.
              The platforms that have won enterprise deals through deep partner
              ecosystems offer a clear lesson:{" "}
              <span className="text-slate-900 font-medium">
                Salesforce built that model and scaled it. Microsoft built it
                with Azure and is extending it through Copilot.
              </span>
            </p>
            <p>
              But the model that worked in the last era won&apos;t simply repeat in
              the next one. The enterprise front office sale is more complex,
              more cross-functional, and more outcome-driven. It demands a
              partner model built for that complexity.
            </p>
            <p>
              <span className="text-slate-900 font-medium">PwC brings</span>{" "}
              the Agentic Front Office vision, deep CFO-suite relationships, B2B
              expertise, and regulated industry knowledge.{" "}
              <span className="text-slate-900 font-medium">Adobe brings</span>{" "}
              the activation platform that the architecture requires. Together,
              we define how the enterprise front office transforms.
            </p>
          </div>
        </div>
      </section>

      {/* CTA / Conversation */}
      <section className="py-24 px-6 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            The Conversation We Want to Have
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="text-orange-400 font-bold text-sm mb-2">01</div>
              <p className="text-slate-300 text-sm">
                How do we structure the commercial investment so it works for
                both sides?
              </p>
            </div>
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="text-orange-400 font-bold text-sm mb-2">02</div>
              <p className="text-slate-300 text-sm">
                Which two sectors do we activate first?
              </p>
            </div>
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="text-orange-400 font-bold text-sm mb-2">03</div>
              <p className="text-slate-300 text-sm">
                What&apos;s the right mechanism: retainers, co-funded roles, joint
                development?
              </p>
            </div>
          </div>
          <p className="text-slate-400 text-lg">
            We have a point of view on all of these.{" "}
            <span className="text-white font-medium">
              We&apos;d rather build the answers together.
            </span>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-slate-950 text-center">
        <div className="text-sm text-slate-500">
          PwC &times; Adobe &nbsp;|&nbsp; ARIA: Co-Invest. Co-Innovate.
          Co-Deliver.
        </div>
        <div className="text-xs text-slate-600 mt-2">PwC Confidential</div>
      </footer>
    </div>
  );
}
