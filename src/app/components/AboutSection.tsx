"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  MapPin,
  Github,
  Linkedin,
  ExternalLink,
  ArrowUpRight,
  TrendingUp,
  Users,
  Target,
  DollarSign,
  Search,
  Sparkles,
  BarChart3,
  Sliders,
  Award,
} from "lucide-react";
import {
  PROFILE,
  SKILL_GROUPS,
  EXPERIENCES,
  EDUCATION,
  CERTIFICATIONS,
  SKILL_ASSESSMENTS,
} from "@/contents/profile";

export default function AboutSection() {
  const [activeSkillTab, setActiveSkillTab] = useState<string>("all");
  const [activeGrowthTab, setActiveGrowthTab] = useState<
    "ads" | "cohort" | "seo" | "simulator"
  >("ads");
  const [monthlyBudget, setMonthlyBudget] = useState<number>(2500);
  const [selectedCohort, setSelectedCohort] = useState<
    "owners" | "entrepreneurs" | "graduates" | "freelancers"
  >("owners");

  const visibleSkillGroups =
    activeSkillTab === "all"
      ? SKILL_GROUPS
      : SKILL_GROUPS.filter((g) => g.id === activeSkillTab);

  // Growth Simulator Calculations based on Prashant's real campaign benchmarks
  const projectedImpressions = Math.round(monthlyBudget * 42).toLocaleString();
  const projectedClicks = Math.round(monthlyBudget * 4.2).toLocaleString();
  const projectedConversions = Math.round(monthlyBudget * 0.16).toLocaleString();
  const projectedRevenue = Math.round(monthlyBudget * 4.4).toLocaleString();

  return (
    <section
      id="about"
      className="py-16 md:py-24 border-b border-[#E8DEC8] dark:border-[#1E325C]"
    >
      <div className="container-max space-y-20">
        {/* Section Intro & Extended Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          suppressHydrationWarning
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
        >
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#786037] dark:text-[#93C5FD]">
              <span className="text-[#0A1226] dark:text-[#FAF6EE] font-semibold">
                03 / ARCHITECTURE &amp; BIO
              </span>
              <span>—</span>
              <span>GROWTH &amp; SYSTEMS PHILOSOPHY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.025em] text-[#0A1226] dark:text-[#FAF6EE]">
              Bridging Strategic Business Analysis, Paid Ads Scaling &amp; Full-Stack Craft
            </h2>
            <p className="font-mono text-xs text-[#57534E] dark:text-[#C5BAA9]">
              {PROFILE.location} · {PROFILE.timezone}
            </p>
            <div className="flex flex-wrap gap-2.5 pt-2">
              <a
                href={PROFILE.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="tactile-control inline-flex items-center gap-2 rounded-lg border border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF6EE] dark:bg-[#0C152B] px-3.5 py-2 font-mono text-xs text-[#0A1226] dark:text-[#FAF6EE] hover:border-blue-500 dark:hover:border-blue-400"
              >
                <Github className="h-3.5 w-3.5" />
                <span>26+ GitHub Repositories</span>
                <ArrowUpRight className="h-3 w-3 opacity-60" />
              </a>
              <a
                href={PROFILE.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="tactile-control inline-flex items-center gap-2 rounded-lg border border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF6EE] dark:bg-[#0C152B] px-3.5 py-2 font-mono text-xs text-[#0A1226] dark:text-[#FAF6EE] hover:border-blue-500 dark:hover:border-blue-400"
              >
                <Linkedin className="h-3.5 w-3.5" />
                <span>LinkedIn Dossier</span>
                <ArrowUpRight className="h-3 w-3 opacity-60" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-3.5">
            <div className="rounded-xl border border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF7F2] dark:bg-[#0C152B] p-5 sm:p-6 space-y-3 shadow-sm">
              <div className="font-mono text-[10px] uppercase tracking-wider text-red-600 dark:text-red-400 font-semibold flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                <span>CORE PHILOSOPHY &amp; PROFILE</span>
              </div>
              <p className="text-sm font-medium text-[#0A1226] dark:text-[#FAF6EE] leading-relaxed">
                {PROFILE.bio}
              </p>
              <p className="text-xs sm:text-sm text-[#57534E] dark:text-[#DCD3C5] leading-relaxed border-t border-[#E8DEC8] dark:border-[#1E325C]/70 pt-3">
                {PROFILE.linkedinBio}
              </p>
            </div>

            {/* 4 Architectural & Strategic Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="rounded-xl border border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF6EE] dark:bg-[#0C152B] p-3.5">
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#0A1226] dark:text-[#FAF6EE] font-semibold flex items-center justify-between">
                  <span>01 / Full-Stack &amp; AI</span>
                  <span className="h-1 w-1 rounded-full bg-blue-500" />
                </div>
                <div className="text-xs text-[#57534E] dark:text-[#C5BAA9] mt-1.5 leading-relaxed">
                  Next.js App Router, TypeScript, Prisma, PostgreSQL, FastAPI, Gemini AI
                </div>
              </div>
              <div className="rounded-xl border border-red-500/30 dark:border-red-500/30 bg-[#FAF6EE] dark:bg-[#0C152B] p-3.5 ring-1 ring-red-500/10">
                <div className="font-mono text-[10px] uppercase tracking-wider text-red-600 dark:text-red-400 font-semibold flex items-center justify-between">
                  <span>02 / Paid Ads &amp; SEO</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                </div>
                <div className="text-xs text-[#57534E] dark:text-[#C5BAA9] mt-1.5 leading-relaxed">
                  $10k+ Meta &amp; Google Ads Spend, 1000+ Students Mentored, Technical SEO
                </div>
              </div>
              <div className="rounded-xl border border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF6EE] dark:bg-[#0C152B] p-3.5">
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#0A1226] dark:text-[#FAF6EE] font-semibold flex items-center justify-between">
                  <span>03 / Product &amp; BA</span>
                  <span className="h-1 w-1 rounded-full bg-blue-500" />
                </div>
                <div className="text-xs text-[#57534E] dark:text-[#C5BAA9] mt-1.5 leading-relaxed">
                  IT Business Analysis, Lincoln MBA, Product Strategy &amp; Agile Scrum
                </div>
              </div>
              <div className="rounded-xl border border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF6EE] dark:bg-[#0C152B] p-3.5">
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#0A1226] dark:text-[#FAF6EE] font-semibold flex items-center justify-between">
                  <span>04 / Mobile &amp; Web3</span>
                  <span className="h-1 w-1 rounded-full bg-blue-500" />
                </div>
                <div className="text-xs text-[#57534E] dark:text-[#C5BAA9] mt-1.5 leading-relaxed">
                  Flutter, Riverpod, Skyline-AR sensor fusion, Solidity Smart Contracts
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* High-Impact Interactive Growth & Performance Marketing Studio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          suppressHydrationWarning
          className="rounded-2xl border border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF7F2] dark:bg-[#0C152B] p-6 sm:p-8 space-y-6 shadow-md"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E8DEC8] dark:border-[#1E325C]/70 pb-5">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-red-600 dark:text-red-400 font-semibold">
                <Sparkles className="h-3.5 w-3.5" />
                <span>GROWTH ENGINE &amp; ADVERTISING STUDIO</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0A1226] dark:text-[#FAF6EE] mt-1">
                Meta &amp; Google Ads Specialist, 1000+ Students Mentored &amp; SEO Expert
              </h3>
              <p className="text-xs sm:text-sm text-[#57534E] dark:text-[#C5BAA9] mt-1">
                Combining quantitative paid acquisition, cohort masterclasses, and organic search engineering.
              </p>
            </div>

            {/* Studio Navigation Tabs */}
            <div className="flex flex-wrap gap-1 rounded-xl bg-[#F0E6D4] dark:bg-[#070D1E] p-1 border border-[#E8DEC8] dark:border-[#1E325C]">
              {[
                { id: "ads", label: "Paid Ads ($10k+)", icon: DollarSign },
                { id: "cohort", label: "Meta Masterclass (1,000+)", icon: Users },
                { id: "seo", label: "Technical SEO", icon: Search },
                { id: "simulator", label: "ROI Simulator", icon: Sliders },
              ].map((tab) => {
                const Icon = tab.icon;
                const isSelected = activeGrowthTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveGrowthTab(tab.id as typeof activeGrowthTab)}
                    className={`tactile-control flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                      isSelected
                        ? "bg-[#0A1226] text-white dark:bg-[#1E325C] dark:text-[#FAF6EE] shadow-sm"
                        : "text-[#57534E] dark:text-[#C5BAA9] hover:text-[#0A1226] dark:hover:text-white"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab 1: Paid Ads Engine ($10k+ Spend) */}
          {activeGrowthTab === "ads" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="rounded-xl border border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF6EE] dark:bg-[#101C38] p-4">
                  <div className="font-mono text-[10px] uppercase text-[#786037] dark:text-[#93C5FD]">
                    Managed Ad Spend
                  </div>
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-red-600 dark:text-red-400 mt-1">
                    $10,000+
                  </div>
                  <div className="text-[11px] text-[#57534E] dark:text-[#C5BAA9] mt-0.5">
                    Meta Ads &amp; Google Ads for own &amp; client businesses
                  </div>
                </div>
                <div className="rounded-xl border border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF6EE] dark:bg-[#101C38] p-4">
                  <div className="font-mono text-[10px] uppercase text-[#786037] dark:text-[#93C5FD]">
                    Average Return (ROAS)
                  </div>
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-[#0A1226] dark:text-[#FAF6EE] mt-1">
                    3.8x – 5.2x
                  </div>
                  <div className="text-[11px] text-[#57534E] dark:text-[#C5BAA9] mt-0.5">
                    Consistent profitable customer acquisition
                  </div>
                </div>
                <div className="rounded-xl border border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF6EE] dark:bg-[#101C38] p-4">
                  <div className="font-mono text-[10px] uppercase text-[#786037] dark:text-[#93C5FD]">
                    Average Cost / Click
                  </div>
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-[#0A1226] dark:text-[#FAF6EE] mt-1">
                    &lt; $0.24
                  </div>
                  <div className="text-[11px] text-[#57534E] dark:text-[#C5BAA9] mt-0.5">
                    High-intent targeted audience harvesting
                  </div>
                </div>
                <div className="rounded-xl border border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF6EE] dark:bg-[#101C38] p-4">
                  <div className="font-mono text-[10px] uppercase text-[#786037] dark:text-[#93C5FD]">
                    Tracking Precision
                  </div>
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-[#0A1226] dark:text-[#FAF6EE] mt-1">
                    99.4%
                  </div>
                  <div className="text-[11px] text-[#57534E] dark:text-[#C5BAA9] mt-0.5">
                    Conversions API (CAPI) + GA4 event pipeline
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF6EE] dark:bg-[#101C38] p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white font-mono text-xs font-bold">
                      M
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-[#0A1226] dark:text-[#FAF6EE]">
                        Meta Ads Manager (Facebook &amp; Instagram)
                      </h4>
                      <p className="text-[11px] text-[#57534E] dark:text-[#C5BAA9]">
                        Full-funnel direct-response &amp; retargeting architecture
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-1.5 text-xs text-[#44403C] dark:text-[#DCD3C5]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-red-500 mt-0.5 shrink-0" />
                      <span>Custom audiences, 1%–3% lookalikes, and dynamic catalog ads for e-commerce.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-red-500 mt-0.5 shrink-0" />
                      <span>Server-side Meta Conversions API (CAPI) bypasses iOS 14.5+ cookie degradation.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-red-500 mt-0.5 shrink-0" />
                      <span>Rapid video hook &amp; copy A/B testing framework to identify winning ad creatives.</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-xl border border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF6EE] dark:bg-[#101C38] p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-600 text-white font-mono text-xs font-bold">
                      G
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-[#0A1226] dark:text-[#FAF6EE]">
                        Google Ads (Search, Display &amp; Performance Max)
                      </h4>
                      <p className="text-[11px] text-[#57534E] dark:text-[#C5BAA9]">
                        Intent-driven search capture &amp; conversion optimization
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-1.5 text-xs text-[#44403C] dark:text-[#DCD3C5]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-red-500 mt-0.5 shrink-0" />
                      <span>Exact/phrase match keyword harvesting with ruthless negative keyword pruning.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-red-500 mt-0.5 shrink-0" />
                      <span>Performance Max (PMax) campaigns paired with high-quality audience signals.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-red-500 mt-0.5 shrink-0" />
                      <span>Landing page alignment maximizing Quality Score to lower Cost-Per-Click.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Meta Ads Masterclass (1,000+ Individuals) */}
          {activeGrowthTab === "cohort" && (
            <div className="space-y-6">
              <div className="rounded-xl border border-red-500/20 bg-red-500/[0.04] p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-2.5 py-0.5 text-[10px] font-mono text-red-600 dark:text-red-400 font-semibold border border-red-500/20">
                      LIVE INSTRUCTOR · 1,000+ INDIVIDUALS TRAINED
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-[#0A1226] dark:text-[#FAF6EE] mt-1.5">
                      Empowering Diverse Cohorts with High-Converting Meta Ads
                    </h4>
                    <p className="text-xs text-[#57534E] dark:text-[#C5BAA9] mt-0.5 max-w-2xl">
                      Prashant conducts hands-on Meta Ads classes tailored to students across the spectrum—from experienced business founders to ambitious new graduates and aspiring entrepreneurs.
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="font-mono text-3xl font-extrabold text-red-600 dark:text-red-400">1,000+</span>
                    <span className="block font-mono text-[10px] uppercase text-[#786037] dark:text-[#93C5FD]">Mentees Trained</span>
                  </div>
                </div>
              </div>

              {/* Interactive Cohort Selector */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  {
                    id: "owners",
                    title: "Business Owners",
                    share: "35% of Cohort",
                    desc: "Local enterprises & D2C e-commerce brands scaling internal sales without agencies.",
                  },
                  {
                    id: "entrepreneurs",
                    title: "Aspiring Entrepreneurs",
                    share: "28% of Cohort",
                    desc: "Testing zero-to-one product ideas, validating demand, and running first profitable ads.",
                  },
                  {
                    id: "graduates",
                    title: "Recent Graduates",
                    share: "22% of Cohort",
                    desc: "Transitioning university degrees into practical digital marketing jobs & high-growth careers.",
                  },
                  {
                    id: "freelancers",
                    title: "Freelancers & Creators",
                    share: "15% of Cohort",
                    desc: "Managing client ad accounts, generating leads, and scaling creative media agencies.",
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedCohort(item.id as typeof selectedCohort)}
                    className={`tactile-control p-3.5 rounded-xl border text-left transition-all ${
                      selectedCohort === item.id
                        ? "border-red-500 bg-white dark:bg-[#142247] shadow-sm ring-1 ring-red-500"
                        : "border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF6EE] dark:bg-[#101C38] hover:border-blue-400"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#0A1226] dark:text-[#FAF6EE]">
                        {item.title}
                      </span>
                      <span className="font-mono text-[10px] text-red-600 dark:text-red-400 font-semibold">
                        {item.share}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#57534E] dark:text-[#C5BAA9] mt-1.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </button>
                ))}
              </div>

              {/* Curriculum Breakdown */}
              <div className="rounded-xl border border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF6EE] dark:bg-[#101C38] p-5">
                <div className="font-mono text-[10px] uppercase text-[#786037] dark:text-[#93C5FD] font-semibold mb-3">
                  PRACTICAL CURRICULUM HIGHLIGHTS
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-lg border border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF7F2] dark:bg-[#0C152B] space-y-1">
                    <span className="font-mono text-[10px] text-red-600 dark:text-red-400 font-bold">MODULE 01</span>
                    <h5 className="font-bold text-[#0A1226] dark:text-[#FAF6EE]">Pixel &amp; CAPI Mastery</h5>
                    <p className="text-[11px] text-[#57534E] dark:text-[#C5BAA9]">Domain verification, event deduplication, and tracking resilience.</p>
                  </div>
                  <div className="p-3 rounded-lg border border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF7F2] dark:bg-[#0C152B] space-y-1">
                    <span className="font-mono text-[10px] text-red-600 dark:text-red-400 font-bold">MODULE 02</span>
                    <h5 className="font-bold text-[#0A1226] dark:text-[#FAF6EE]">Creative Copy &amp; Hooks</h5>
                    <p className="text-[11px] text-[#57534E] dark:text-[#C5BAA9]">Direct-response copywriting, dynamic video hooks &amp; visual testing.</p>
                  </div>
                  <div className="p-3 rounded-lg border border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF7F2] dark:bg-[#0C152B] space-y-1">
                    <span className="font-mono text-[10px] text-red-600 dark:text-red-400 font-bold">MODULE 03</span>
                    <h5 className="font-bold text-[#0A1226] dark:text-[#FAF6EE]">Full-Funnel Retargeting</h5>
                    <p className="text-[11px] text-[#57534E] dark:text-[#C5BAA9]">Lookalikes, engaged video viewers, and cart abandoner recovery.</p>
                  </div>
                  <div className="p-3 rounded-lg border border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF7F2] dark:bg-[#0C152B] space-y-1">
                    <span className="font-mono text-[10px] text-red-600 dark:text-red-400 font-bold">MODULE 04</span>
                    <h5 className="font-bold text-[#0A1226] dark:text-[#FAF6EE]">Budget Scaling &amp; ROAS</h5>
                    <p className="text-[11px] text-[#57534E] dark:text-[#C5BAA9]">Bid cap strategies, dayparting, horizontal vs vertical budget scaling.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Technical SEO & Organic Visibility */}
          {activeGrowthTab === "seo" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-xl border border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF6EE] dark:bg-[#101C38] p-5 space-y-2">
                  <div className="font-mono text-2xl font-bold text-red-600 dark:text-red-400">98 / 100</div>
                  <h4 className="text-sm font-bold text-[#0A1226] dark:text-[#FAF6EE]">Sub-Second Core Web Vitals</h4>
                  <p className="text-xs text-[#57534E] dark:text-[#C5BAA9] leading-relaxed">
                    Largest Contentful Paint (LCP) under 1.1s, zero Cumulative Layout Shift (CLS), and instantaneous interaction readiness.
                  </p>
                </div>
                <div className="rounded-xl border border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF6EE] dark:bg-[#101C38] p-5 space-y-2">
                  <div className="font-mono text-2xl font-bold text-[#0A1226] dark:text-[#FAF6EE]">Schema.org</div>
                  <h4 className="text-sm font-bold text-[#0A1226] dark:text-[#FAF6EE]">Structured Data &amp; Rich Snippets</h4>
                  <p className="text-xs text-[#57534E] dark:text-[#C5BAA9] leading-relaxed">
                    JSON-LD semantic graphs modeling Organizations, Courses, Products, FAQs, and Breadcrumbs for maximum SERP presence.
                  </p>
                </div>
                <div className="rounded-xl border border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF6EE] dark:bg-[#101C38] p-5 space-y-2">
                  <div className="font-mono text-2xl font-bold text-blue-600 dark:text-blue-400">$0 Recurring</div>
                  <h4 className="text-sm font-bold text-[#0A1226] dark:text-[#FAF6EE]">Compounding Organic Growth</h4>
                  <p className="text-xs text-[#57534E] dark:text-[#C5BAA9] leading-relaxed">
                    High-intent search keyword clustering and crawl budget optimization delivering passive inbound lead flow without ad spend.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF6EE] dark:bg-[#101C38] p-5">
                <div className="font-mono text-[10px] uppercase text-[#786037] dark:text-[#93C5FD] font-semibold mb-3">
                  TECHNICAL SEO EXECUTION CHECKLIST
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#44403C] dark:text-[#DCD3C5]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-red-500 shrink-0" />
                    <span>Dynamic XML sitemaps and localized `hreflang` for multilingual (EN/NE) portals.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-red-500 shrink-0" />
                    <span>Next.js App Router metadata generation API with OpenGraph and Twitter cards.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-red-500 shrink-0" />
                    <span>Edge caching, stale-while-revalidate ISR, and pre-rendered static fallbacks.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-red-500 shrink-0" />
                    <span>Semantic HTML5 markup with precise `h1-h6` hierarchy and WCAG AA contrast.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Interactive Campaign ROI Simulator */}
          {activeGrowthTab === "simulator" && (
            <div className="space-y-6">
              <div className="rounded-xl border border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF6EE] dark:bg-[#101C38] p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-[#0A1226] dark:text-[#FAF6EE]">
                      Interactive Ad Budget &amp; ROAS Estimator
                    </h4>
                    <p className="text-xs text-[#57534E] dark:text-[#C5BAA9]">
                      Simulate projected campaign reach and sales return using Prashant&apos;s real-world campaign benchmarks.
                    </p>
                  </div>
                  <div className="font-mono text-xl sm:text-2xl font-extrabold text-red-600 dark:text-red-400">
                    ${monthlyBudget.toLocaleString()}{" "}
                    <span className="text-xs font-normal text-[#57534E] dark:text-[#C5BAA9]">/ month</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <input
                    type="range"
                    min="500"
                    max="10000"
                    step="250"
                    value={monthlyBudget}
                    onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                    aria-label="Monthly advertising budget slider"
                    className="w-full h-2 bg-[#E8DEC8] dark:bg-[#1E325C] rounded-lg appearance-none cursor-pointer accent-red-600"
                  />
                  <div className="flex justify-between font-mono text-[10px] text-[#786037] dark:text-[#93C5FD]">
                    <span>$500 min</span>
                    <span>$2,500</span>
                    <span>$5,000</span>
                    <span>$10,000 max</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="rounded-xl border border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF6EE] dark:bg-[#101C38] p-4 text-center">
                  <div className="font-mono text-[10px] uppercase text-[#786037] dark:text-[#93C5FD]">
                    Est. Impressions
                  </div>
                  <div className="font-mono text-xl sm:text-2xl font-bold text-[#0A1226] dark:text-[#FAF6EE] mt-1">
                    {projectedImpressions}
                  </div>
                  <div className="text-[10px] text-[#57534E] dark:text-[#C5BAA9] mt-0.5">Targeted Reach</div>
                </div>
                <div className="rounded-xl border border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF6EE] dark:bg-[#101C38] p-4 text-center">
                  <div className="font-mono text-[10px] uppercase text-[#786037] dark:text-[#93C5FD]">
                    High-Intent Clicks
                  </div>
                  <div className="font-mono text-xl sm:text-2xl font-bold text-[#0A1226] dark:text-[#FAF6EE] mt-1">
                    {projectedClicks}
                  </div>
                  <div className="text-[10px] text-[#57534E] dark:text-[#C5BAA9] mt-0.5">Est. CPC ~$0.24</div>
                </div>
                <div className="rounded-xl border border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF6EE] dark:bg-[#101C38] p-4 text-center">
                  <div className="font-mono text-[10px] uppercase text-[#786037] dark:text-[#93C5FD]">
                    Est. Conversions
                  </div>
                  <div className="font-mono text-xl sm:text-2xl font-bold text-[#0A1226] dark:text-[#FAF6EE] mt-1">
                    {projectedConversions}
                  </div>
                  <div className="text-[10px] text-[#57534E] dark:text-[#C5BAA9] mt-0.5">Lead / Sale Actions</div>
                </div>
                <div className="rounded-xl border border-red-500/30 bg-red-500/[0.04] p-4 text-center ring-1 ring-red-500/20">
                  <div className="font-mono text-[10px] uppercase text-red-600 dark:text-red-400 font-semibold">
                    Projected Revenue (4.4x)
                  </div>
                  <div className="font-mono text-xl sm:text-2xl font-extrabold text-red-600 dark:text-red-400 mt-1">
                    ${projectedRevenue}
                  </div>
                  <div className="text-[10px] text-[#57534E] dark:text-[#C5BAA9] mt-0.5">Blended Gross Return</div>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Technical & Business Specification Matrix */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          suppressHydrationWarning
          className="space-y-6"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-wider text-[#786037] dark:text-[#93C5FD]">
                CAPABILITY SPECIFICATION MATRIX
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#0A1226] dark:text-[#FAF6EE] mt-1">
                Technical, Marketing &amp; Strategic Stack Index
              </h3>
            </div>

            <div
              role="tablist"
              aria-label="Filter capability domains"
              className="flex flex-wrap gap-1 rounded-xl border border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF6EE] dark:bg-[#0C152B] p-1"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeSkillTab === "all"}
                onClick={() => setActiveSkillTab("all")}
                className={`tactile-control relative rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  activeSkillTab === "all"
                    ? "text-[#0A1226] dark:text-[#FAF6EE]"
                    : "text-[#57534E] dark:text-[#C5BAA9]"
                }`}
              >
                {activeSkillTab === "all" && (
                  <motion.span
                    layoutId="about-skill-tab"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    suppressHydrationWarning
                    className="absolute inset-0 rounded-md bg-[#FAF7F2] dark:bg-[#1E325C] border border-[#E8DEC8] dark:border-[#2B4785]"
                  />
                )}
                <span className="relative z-10">All Domains</span>
              </button>
              {SKILL_GROUPS.map((group) => {
                const selected = activeSkillTab === group.id;
                return (
                  <button
                    key={group.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActiveSkillTab(group.id)}
                    className={`tactile-control relative rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                      selected
                        ? "text-[#0A1226] dark:text-[#FAF6EE]"
                        : "text-[#57534E] dark:text-[#C5BAA9]"
                    }`}
                  >
                    {selected && (
                      <motion.span
                        layoutId="about-skill-tab"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                        suppressHydrationWarning
                        className="absolute inset-0 rounded-md bg-[#FAF7F2] dark:bg-[#1E325C] border border-[#E8DEC8] dark:border-[#2B4785]"
                      />
                    )}
                    <span className="relative z-10">{group.shortLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {visibleSkillGroups.map((group, groupIdx) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: groupIdx * 0.08 }}
                whileHover={{ y: -3 }}
                suppressHydrationWarning
                className="rounded-xl border border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF7F2] dark:bg-[#0C152B] overflow-hidden hover:border-red-500/40 dark:hover:border-red-500/40 transition-all shadow-sm"
              >
                <div className="px-5 py-3.5 border-b border-[#E8DEC8] dark:border-[#1E325C]/70 bg-[#FAF6EE] dark:bg-[#101C38] flex items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-semibold text-[#0A1226] dark:text-[#FAF6EE]">
                      {group.category}
                    </h4>
                    <p className="text-xs text-[#57534E] dark:text-[#C5BAA9] mt-0.5">
                      {group.subtitle}
                    </p>
                  </div>
                  <span className="font-mono text-[10px] text-[#786037] dark:text-[#93C5FD] shrink-0">
                    DOM-0{groupIdx + 1}
                  </span>
                </div>

                <div className="divide-y divide-[#E8DEC8] dark:divide-[#1E325C]/50">
                  {group.skills.map((skill) => {
                    const activeTicks = Math.max(
                      3,
                      Math.min(5, Math.round(skill.level / 20))
                    );
                    return (
                      <div key={skill.name} className="px-5 py-3.5 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-semibold text-[#0A1226] dark:text-[#FAF6EE]">
                            {skill.name}
                          </span>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="font-mono text-[11px] text-[#57534E] dark:text-[#C5BAA9] tabular-nums">
                              {skill.years}
                            </span>
                            <span
                              aria-hidden="true"
                              className="inline-flex items-center gap-0.5"
                            >
                              {[1, 2, 3, 4, 5].map((tick) => (
                                <span
                                  key={tick}
                                  className={`h-1.5 w-1.5 rounded-[1px] ${
                                    tick <= activeTicks
                                      ? "bg-red-500"
                                      : "bg-[#DFD4BD] dark:bg-[#1E325C]"
                                  }`}
                                />
                              ))}
                            </span>
                          </div>
                        </div>
                        <p className="text-[11px] text-[#57534E] dark:text-[#DCD3C5] leading-relaxed">
                          {skill.highlight}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Career Ledger & Academic Credentials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Professional Experience Ledger */}
          <div className="lg:col-span-7 space-y-5">
            <div className="border-b border-[#E8DEC8] dark:border-[#1E325C] pb-3">
              <div className="font-mono text-[10px] uppercase tracking-wider text-[#786037] dark:text-[#93C5FD]">
                CAREER LEDGER // 2017 — PRESENT
              </div>
              <h3 className="text-xl font-semibold tracking-tight text-[#0A1226] dark:text-[#FAF6EE] mt-0.5">
                Professional Experience
              </h3>
            </div>

            <div className="space-y-4">
              {EXPERIENCES.map((exp, idx) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.45, delay: idx * 0.05 }}
                  whileHover={{ y: -2 }}
                  suppressHydrationWarning
                  className="rounded-xl border border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF7F2] dark:bg-[#0C152B] p-5 space-y-3.5 hover:border-red-500/40 dark:hover:border-red-500/40 transition-all shadow-sm"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 border-b border-[#E8DEC8] dark:border-[#1E325C]/60 pb-3">
                    <div>
                      <div className="flex items-center gap-2 font-mono text-[11px] text-[#57534E] dark:text-[#C5BAA9]">
                        <span className="text-[#0A1226] dark:text-[#FAF6EE] font-semibold">
                          EXP-0{idx + 1}
                        </span>
                        <span>·</span>
                        <span>{exp.period}</span>
                        <span>·</span>
                        <span>{exp.type}</span>
                      </div>
                      <h4 className="text-base sm:text-lg font-semibold text-[#0A1226] dark:text-[#FAF6EE] mt-1">
                        {exp.role}
                      </h4>
                      <p className="text-xs font-mono text-[#57534E] dark:text-[#C5BAA9] flex items-center gap-1.5 mt-0.5">
                        <span className="text-[#0A1226] dark:text-[#FAF6EE] font-medium">
                          {exp.organization}
                        </span>
                        <span>·</span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-red-500" />
                          {exp.location}
                        </span>
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#44403C] dark:text-[#DCD3C5] leading-relaxed">
                    {exp.summary}
                  </p>

                  <ul className="space-y-2">
                    {exp.achievements.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-xs text-[#44403C] dark:text-[#DCD3C5]"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-red-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded border border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF6EE] dark:bg-[#101C38] px-2 py-0.5 font-mono text-[10px] text-[#0A1226] dark:text-[#FAF6EE]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education, Certifications & Direct Dispatch Column */}
          <div className="lg:col-span-5 space-y-5">
            <div className="border-b border-[#E8DEC8] dark:border-[#1E325C] pb-3">
              <div className="font-mono text-[10px] uppercase tracking-wider text-[#786037] dark:text-[#93C5FD]">
                ACADEMIC &amp; VERIFIED CREDENTIALS
              </div>
              <h3 className="text-xl font-semibold tracking-tight text-[#0A1226] dark:text-[#FAF6EE] mt-0.5">
                Education &amp; Licenses
              </h3>
            </div>

            {EDUCATION.map((edu, eduIdx) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: eduIdx * 0.06 }}
                whileHover={{ y: -2 }}
                suppressHydrationWarning
                className="rounded-xl border border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF7F2] dark:bg-[#0C152B] p-5 space-y-3 hover:border-red-500/40 dark:hover:border-red-500/40 transition-all shadow-sm"
              >
                <div className="flex items-center justify-between gap-2 font-mono text-[11px] text-[#57534E] dark:text-[#C5BAA9]">
                  <span>{edu.period}</span>
                  <span className="rounded border border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF6EE] dark:bg-[#101C38] px-2 py-0.5 text-[10px] text-[#0A1226] dark:text-[#FAF6EE]">
                    {edu.honors}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm sm:text-base font-semibold text-[#0A1226] dark:text-[#FAF6EE]">
                    {edu.degree}
                  </h4>
                  <p className="font-mono text-xs text-[#1E3A8A] dark:text-[#93C5FD] mt-0.5">
                    {edu.institution}
                  </p>
                </div>

                <p className="text-xs text-[#57534E] dark:text-[#C5BAA9] leading-relaxed">
                  {edu.description}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-[#E8DEC8] dark:border-[#1E325C]/70">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[#786037] dark:text-[#93C5FD]">
                    Core Focus Areas
                  </div>
                  <ul className="space-y-1">
                    {edu.focusAreas.map((area) => (
                      <li
                        key={area}
                        className="flex items-center gap-2 text-xs text-[#44403C] dark:text-[#DCD3C5]"
                      >
                        <span className="h-1 w-1 rounded-full bg-red-500" />
                        <span>{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}

            {/* Licenses, Certifications & Skill Assessments */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.45, delay: 0.1 }}
              suppressHydrationWarning
              className="rounded-xl border border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF7F2] dark:bg-[#0C152B] p-5 space-y-4 shadow-sm"
            >
              <div>
                <h4 className="text-sm font-semibold text-[#0A1226] dark:text-[#FAF6EE]">
                  Licenses &amp; Certifications
                </h4>
                <p className="font-mono text-[11px] text-[#57534E] dark:text-[#C5BAA9] mt-0.5">
                  Coursera Credentials &amp; LinkedIn Skill Assessments
                </p>
              </div>

              <div className="space-y-2.5">
                {CERTIFICATIONS.map((cert) => (
                  <div
                    key={cert.id}
                    className="rounded-lg border border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF6EE] dark:bg-[#101C38] p-3 space-y-1.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-xs font-semibold text-[#0A1226] dark:text-[#FAF6EE]">
                        {cert.title}
                      </div>
                      <span className="shrink-0 rounded border border-[#E8DEC8] dark:border-[#1E325C] px-1.5 py-0.5 font-mono text-[9px] text-[#786037] dark:text-[#93C5FD]">
                        {cert.domain}
                      </span>
                    </div>
                    <div className="font-mono text-[10px] text-[#57534E] dark:text-[#C5BAA9]">
                      {cert.issuer} · Issued {cert.issued}
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5 font-mono text-[10px]">
                      <span className="text-[#0A1226] dark:text-[#FAF6EE]">
                        Credential ID: {cert.credentialId}
                      </span>
                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-red-600 dark:text-red-400 hover:underline font-semibold"
                        >
                          <span>Verify Credential</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-[#E8DEC8] dark:border-[#1E325C]/70 space-y-2">
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#786037] dark:text-[#93C5FD]">
                  LinkedIn Skill Assessments Passed
                </div>
                <div className="flex flex-wrap gap-2">
                  {SKILL_ASSESSMENTS.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 rounded border border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF6EE] dark:bg-[#101C38] px-2.5 py-1 font-mono text-xs text-[#0A1226] dark:text-[#FAF6EE]"
                    >
                      <CheckCircle2 className="h-3 w-3 text-red-500" />
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Direct Contact Card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.45, delay: 0.15 }}
              whileHover={{ y: -2 }}
              suppressHydrationWarning
              className="rounded-xl border border-blue-900/60 bg-[#070D1E] p-5 text-[#FAF6EE] space-y-3 shadow-md"
            >
              <div className="font-mono text-[10px] uppercase tracking-wider text-red-400 font-bold flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping" />
                <span>● DIRECT ENGINEERING &amp; GROWTH DISPATCH</span>
              </div>
              <h4 className="text-base font-semibold tracking-tight">
                Looking for a Full-Stack Engineer, Paid Ads Specialist or SEO Expert?
              </h4>
              <p className="text-xs text-[#C5BAA9] leading-relaxed">
                Available for full-time engineering leadership, IT business
                analysis, Meta &amp; Google Ads campaign architecture, SEO audits, and cohort training from{" "}
                {PROFILE.location}.
              </p>
              <div className="pt-2 border-t border-blue-900/40 space-y-1 font-mono text-[11px] text-[#FAF6EE]">
                <div>Primary: {PROFILE.email}</div>
                <div>LinkedIn Email: {PROFILE.secondaryEmail}</div>
                <div>Phone / WhatsApp: {PROFILE.phone}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
