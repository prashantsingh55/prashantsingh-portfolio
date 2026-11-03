"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Github,
  Linkedin,
  MapPin,
  Copy,
  Check,
  Code2,
  Briefcase,
  Smartphone,
} from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { PROFILE } from "@/contents/profile";

export interface ShortcutContext {
  key: string;
  metaKey?: boolean;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  repeat?: boolean;
  targetTagName?: string;
  isContentEditable?: boolean;
  isInsideInteractiveOrDialog?: boolean;
  hasOpenDialog?: boolean;
  hasTextSelection?: boolean;
}

/**
 * Pure guard ensuring single-key shortcuts (`C` to copy email) never fire inside
 * inputs, buttons, tabs, sliders, open `<dialog>` modals, or when text is selected.
 */
export function shouldTriggerEmailCopyShortcut(ctx: ShortcutContext): boolean {
  if (ctx.key.toLowerCase() !== "c") return false;
  if (ctx.metaKey || ctx.ctrlKey || ctx.altKey || ctx.shiftKey || ctx.repeat) {
    return false;
  }
  if (ctx.hasOpenDialog || ctx.hasTextSelection || ctx.isContentEditable) {
    return false;
  }
  if (ctx.isInsideInteractiveOrDialog) {
    return false;
  }
  const tag = (ctx.targetTagName ?? "").toUpperCase();
  if (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    tag === "BUTTON" ||
    tag === "A" ||
    tag === "DIALOG"
  ) {
    return false;
  }
  return true;
}

/**
 * Generates a continuous, wrap-around 360° mountain ridge SVG path using trigonometric
 * harmonics of the compass azimuth angle (avoiding discontinuous modulo jumps).
 */
export function computeSkylineRidgePath(azimuthDeg: number): string {
  const safeAzimuth = Number.isFinite(azimuthDeg) ? azimuthDeg : 358;
  const rad = (safeAzimuth * Math.PI) / 180;
  const y1 = (31 + Math.sin(rad) * 7 + Math.cos(rad * 2) * 2.5).toFixed(1);
  const y2 = (18 + Math.cos(rad) * 6 + Math.sin(rad * 3) * 2.0).toFixed(1);
  const y3 = (25 + Math.sin(rad + 1.2) * 6.5 + Math.cos(rad * 2) * 2.0).toFixed(
    1
  );
  return `M0,80 L0,52 L45,${y1} L95,48 L150,${y2} L210,44 L265,${y3} L320,50 L320,80 Z`;
}

type ShowcaseTab = "systems" | "product" | "mobile";

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<ShowcaseTab>("systems");
  const copyTimerRef = useRef<number | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const onChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  const handleCopyEmail = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(PROFILE.email);
      }
      setCopied(true);
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
      copyTimerRef.current = window.setTimeout(() => {
        setCopied(false);
        copyTimerRef.current = null;
      }, 2000);
    } catch {
      setCopied(false);
    }
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInsideInteractiveOrDialog = Boolean(
        target?.closest?.(
          'dialog[open], input, textarea, select, button, a, [role="tab"], [role="slider"], [contenteditable="true"]'
        )
      );
      const hasOpenDialog =
        typeof document !== "undefined" &&
        Boolean(document.querySelector("dialog[open]"));
      const hasTextSelection =
        typeof window !== "undefined" &&
        Boolean(window.getSelection?.()?.toString().trim());

      if (
        shouldTriggerEmailCopyShortcut({
          key: e.key,
          metaKey: e.metaKey,
          ctrlKey: e.ctrlKey,
          altKey: e.altKey,
          shiftKey: e.shiftKey,
          repeat: e.repeat,
          targetTagName: target?.tagName,
          isContentEditable: Boolean(target?.isContentEditable),
          isInsideInteractiveOrDialog,
          hasOpenDialog,
          hasTextSelection,
        })
      ) {
        e.preventDefault();
        handleCopyEmail();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section className="relative border-b border-zinc-200/80 dark:border-white/[0.08] pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden">
      {/* Subtle modern ambient background with animated floating glow orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 architectural-grid opacity-30 dark:opacity-20"
      />
      <motion.div
        aria-hidden="true"
        suppressHydrationWarning
        animate={
          prefersReducedMotion
            ? {}
            : {
                x: [0, 20, 0],
                y: [0, -15, 0],
                scale: [1, 1.05, 1],
              }
        }
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -top-20 -left-20 -z-10 h-80 w-80 rounded-full bg-emerald-500/10 dark:bg-emerald-500/[0.06] blur-2xl"
      />
      <motion.div
        aria-hidden="true"
        suppressHydrationWarning
        animate={
          prefersReducedMotion
            ? {}
            : {
                x: [0, -25, 0],
                y: [0, 20, 0],
                scale: [1, 1.06, 1],
              }
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute top-1/2 -right-20 -z-10 h-80 w-80 rounded-full bg-zinc-300/20 dark:bg-zinc-700/[0.08] blur-2xl"
      />


      <div className="container-max">
        {/* Top Breadcrumb Bar */}
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          suppressHydrationWarning
          className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-8 border-b border-zinc-200/80 dark:border-white/[0.08] text-[11px] font-mono text-zinc-500 dark:text-[#8A8F98]"
        >
          <div className="flex items-center gap-2">
            <span className="text-zinc-900 dark:text-[#F7F8F8] font-semibold">
              01 / PORTFOLIO INDEX
            </span>
            <span className="text-zinc-300 dark:text-white/15">—</span>
            <span>{PROFILE.tagline}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-3 w-3 text-emerald-500" />
            <span>{PROFILE.location}</span>
            <span className="text-zinc-300 dark:text-white/15">·</span>
            <span>{PROFILE.timezone}</span>
          </div>
        </motion.div>

        {/* Main 12-Column Responsive Grid */}
        <motion.div
          variants={containerVariants}
          initial={false}
          animate="visible"
          suppressHydrationWarning
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center"
        >
          {/* Left Column: Headline, Bio & Primary CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div variants={itemVariants} initial={false} suppressHydrationWarning className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>{PROFILE.availability}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#090A0B] dark:text-[#F7F8F8] leading-[1.08]">
                {PROFILE.fullName}
                <span className="block text-zinc-500 dark:text-[#8A8F98] font-normal text-2xl sm:text-3xl lg:text-4xl mt-2 tracking-tight">
                  {PROFILE.headline} &amp; Full Stack Developer
                </span>
              </h1>
            </motion.div>

            {/* Concise, Readable Narrative */}
            <motion.div
              variants={itemVariants}
              initial={false}
              suppressHydrationWarning
              className="space-y-3 text-sm sm:text-base text-zinc-600 dark:text-[#8A8F98] leading-relaxed max-w-2xl"
            >
              <p>
                {PROFILE.bio} Holding an{" "}
                <strong className="font-semibold text-zinc-900 dark:text-[#F7F8F8]">
                  MBA from Lincoln University College
                </strong>{" "}
                and a{" "}
                <strong className="font-semibold text-zinc-900 dark:text-[#F7F8F8]">
                  B.Sc. CSIT from Texas International College
                </strong>
                , I bridge IT Business Analysis with full-stack engineering at{" "}
                <span className="font-medium text-zinc-900 dark:text-[#F7F8F8] underline decoration-zinc-300 dark:decoration-white/20 underline-offset-4">
                  Chitrabazar
                </span>{" "}
                and{" "}
                <span className="font-medium text-zinc-900 dark:text-[#F7F8F8] underline decoration-zinc-300 dark:decoration-white/20 underline-offset-4">
                  AllStockNepal
                </span>
                .
              </p>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-[#7A808A]">
                Author of 26+ open-source repositories spanning Next.js, FastAPI,{" "}
                <span className="font-mono text-zinc-900 dark:text-[#F7F8F8]">
                  Skyline-AR
                </span>{" "}
                Flutter sensor fusion, and verified Solidity Web3 contracts.
              </p>
            </motion.div>

            {/* Tactile Primary Controls & Quick Links */}
            <motion.div
              variants={itemVariants}
              initial={false}
              suppressHydrationWarning
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <Link
                href="/projects"
                className="tactile-control inline-flex items-center gap-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-[#F7F8F8] dark:hover:bg-white px-5 py-3 text-xs sm:text-sm font-semibold text-white dark:text-[#08090A] shadow-sm hover:shadow transition-all"
              >
                <span>Inspect Production Systems</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="tactile-control inline-flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-white/[0.12] bg-white dark:bg-[#141517] hover:bg-zinc-50 dark:hover:bg-[#1A1B1E] px-4 py-3 text-xs sm:text-sm font-medium text-zinc-800 dark:text-[#F7F8F8] transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400">
                      Copied {PROFILE.email}
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 text-zinc-400 dark:text-[#8A8F98]" />
                    <span>Copy Email</span>
                    <kbd className="keycap ml-0.5">C</kbd>
                  </>
                )}
              </button>

              <Link
                href="/about"
                className="tactile-control inline-flex items-center gap-1.5 rounded-xl border border-zinc-200/80 dark:border-white/[0.08] bg-zinc-100/70 dark:bg-[#0E1012] hover:bg-zinc-200/70 dark:hover:bg-[#141517] px-4 py-3 text-xs sm:text-sm font-medium text-zinc-700 dark:text-[#8A8F98] transition-colors"
              >
                <span>About &amp; Dossier</span>
              </Link>
            </motion.div>

            {/* Verified Profiles Bar */}
            <motion.div
              variants={itemVariants}
              initial={false}
              suppressHydrationWarning
              className="pt-4 border-t border-zinc-200/70 dark:border-white/[0.06] flex flex-wrap items-center gap-2.5 text-xs"
            >
              <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 dark:text-[#555962] mr-1">
                VERIFIED PROFILES:
              </span>
              <a
                href={PROFILE.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="tactile-control inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-[#0E1012] px-3 py-1.5 font-mono text-[11px] text-zinc-700 dark:text-[#8A8F98] hover:text-zinc-950 dark:hover:text-[#F7F8F8] hover:border-zinc-400 dark:hover:border-white/20 transition-colors"
              >
                <Github className="h-3.5 w-3.5" />
                <span>GitHub</span>
                <ArrowUpRight className="h-3 w-3 opacity-50" />
              </a>
              <a
                href={PROFILE.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="tactile-control inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-[#0E1012] px-3 py-1.5 font-mono text-[11px] text-zinc-700 dark:text-[#8A8F98] hover:text-zinc-950 dark:hover:text-[#F7F8F8] hover:border-zinc-400 dark:hover:border-white/20 transition-colors"
              >
                <Linkedin className="h-3.5 w-3.5" />
                <span>LinkedIn</span>
                <ArrowUpRight className="h-3 w-3 opacity-50" />
              </a>
              <a
                href={PROFILE.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="tactile-control inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-[#0E1012] px-3 py-1.5 font-mono text-[11px] text-zinc-700 dark:text-[#8A8F98] hover:text-zinc-950 dark:hover:text-[#F7F8F8] hover:border-zinc-400 dark:hover:border-white/20 transition-colors"
              >
                <FaXTwitter className="h-3.5 w-3.5" />
                <span>Twitter / X</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Visual Showcase & Profile Card (Zero Math Telemetry) */}
          <motion.div variants={itemVariants} initial={false} suppressHydrationWarning className="lg:col-span-5">
            <div className="relative rounded-2xl border border-zinc-200 dark:border-white/[0.1] bg-white/90 dark:bg-[#0E1012]/90 shadow-xl backdrop-blur-md overflow-hidden">
              {/* Profile Card Header with Real Photo */}
              <div className="p-6 border-b border-zinc-100 dark:border-white/[0.06] bg-gradient-to-b from-zinc-50/80 to-transparent dark:from-white/[0.02] dark:to-transparent">
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-20 shrink-0 rounded-2xl overflow-hidden p-0.5 border border-zinc-300/80 dark:border-white/15 ring-1 ring-zinc-200/90 dark:ring-white/10 bg-gradient-to-b from-zinc-200 via-zinc-100 to-zinc-300 dark:from-zinc-700 dark:via-zinc-800 dark:to-zinc-900 shadow-sm">
                    <div className="relative h-full w-full rounded-[14px] overflow-hidden">
                      <Image
                        src={PROFILE.avatarUrl}
                        alt={PROFILE.fullName}
                        fill
                        sizes="80px"
                        priority
                        fetchPriority="high"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-zinc-900 dark:text-[#F7F8F8] truncate">
                        {PROFILE.fullName}
                      </h2>
                      <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                        Active
                      </span>
                    </div>
                    <p className="text-xs font-medium text-zinc-600 dark:text-[#8A8F98] truncate mt-0.5">
                      {PROFILE.title}
                    </p>
                    <p className="text-[11px] text-zinc-400 dark:text-[#6A707C] truncate mt-1">
                      MBA · Lincoln Univ. | B.Sc. CSIT · Texas College
                    </p>
                  </div>
                </div>
              </div>

              {/* Intuitive Focus Selector */}
              <div className="px-6 pt-4 pb-2">
                <div className="flex items-center justify-between text-xs font-semibold text-zinc-400 dark:text-[#555962] uppercase tracking-wider mb-2 font-mono">
                  <span>Core Expertise Areas</span>
                  <span className="text-emerald-600 dark:text-emerald-400">
                    Verified
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-zinc-100/80 dark:bg-[#141517]">
                  {(
                    [
                      { id: "systems", label: "Full-Stack", icon: Code2 },
                      { id: "product", label: "Product & BA", icon: Briefcase },
                      { id: "mobile", label: "Mobile / AR", icon: Smartphone },
                    ] as const
                  ).map((tab) => {
                    const Icon = tab.icon;
                    const isSelected = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={`tactile-control flex items-center justify-center gap-1.5 rounded-lg py-2 px-1 text-xs font-medium transition-all ${
                          isSelected
                            ? "bg-white dark:bg-[#1E2024] text-zinc-950 dark:text-white shadow-sm"
                            : "text-zinc-500 dark:text-[#8A8F98] hover:text-zinc-900 dark:hover:text-white"
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Showcase Card Content */}
              <div className="p-6 pt-3 space-y-4">
                {activeTab === "systems" && (
                  <motion.div
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    suppressHydrationWarning
                    className="space-y-3"
                  >
                    <p className="text-xs text-zinc-600 dark:text-[#8A8F98] leading-relaxed">
                      Production web applications built with Next.js App Router,
                      PostgreSQL, Prisma ORM, and high-performance server APIs.
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        "Next.js 15",
                        "TypeScript",
                        "PostgreSQL",
                        "Prisma ORM",
                        "FastAPI",
                        "AWS S3",
                        "Stripe",
                      ].map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-zinc-200 dark:border-white/[0.08] bg-zinc-50 dark:bg-[#141517] px-2.5 py-1 text-[11px] font-mono text-zinc-700 dark:text-[#8A8F98]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="pt-2 border-t border-zinc-100 dark:border-white/[0.06] flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-400">Flagships:</span>
                      <div className="flex items-center gap-3">
                        <a
                          href="https://beyourownmarketeracademy.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                        >
                          BeYourOwnMarketer <ArrowUpRight className="h-3 w-3" />
                        </a>
                        <a
                          href="https://chitrabazaar.vercel.app"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-700 dark:text-[#F7F8F8] hover:underline flex items-center gap-1"
                        >
                          Chitrabazaar <ArrowUpRight className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "product" && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    suppressHydrationWarning
                    className="space-y-3"
                  >
                    <p className="text-xs text-zinc-600 dark:text-[#8A8F98] leading-relaxed">
                      MBA-backed IT Business Analysis, market strategy, Agile/Scrum
                      governance, and startup co-founder leadership.
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        "BA Planning & Monitoring",
                        "Product Management",
                        "Power BI",
                        "Scrum / Jira",
                        "Financial Planning",
                      ].map((item) => (
                        <span
                          key={item}
                          className="rounded-md border border-zinc-200 dark:border-white/[0.08] bg-zinc-50 dark:bg-[#141517] px-2.5 py-1 text-[11px] font-mono text-zinc-700 dark:text-[#8A8F98]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                    <div className="pt-2 border-t border-zinc-100 dark:border-white/[0.06] flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-400">Deployments:</span>
                      <div className="flex items-center gap-3">
                        <a
                          href="https://allstocknepal.vercel.app"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                        >
                          AllStockNepal <ArrowUpRight className="h-3 w-3" />
                        </a>
                        <a
                          href="https://beyourownmarketeracademy.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-700 dark:text-[#F7F8F8] hover:underline flex items-center gap-1"
                        >
                          BeYourOwnMarketer <ArrowUpRight className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "mobile" && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    suppressHydrationWarning
                    className="space-y-3"
                  >
                    <p className="text-xs text-zinc-600 dark:text-[#8A8F98] leading-relaxed">
                      Cross-platform mobile apps, Flutter AR with camera and sensor
                      fusion (Skyline-AR), and on-chain Ethereum smart contracts.
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        "Flutter & Dart",
                        "Riverpod",
                        "Sensor Fusion (Gyro/GPS)",
                        "three_terrain",
                        "Solidity",
                        "Hardhat",
                      ].map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-zinc-200 dark:border-white/[0.08] bg-zinc-50 dark:bg-[#141517] px-2.5 py-1 text-[11px] font-mono text-zinc-700 dark:text-[#8A8F98]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="pt-2 border-t border-zinc-100 dark:border-white/[0.06] flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-400">Repositories:</span>
                      <a
                        href="https://github.com/prashantsingh55/Skyline-AR"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                      >
                        Skyline-AR Repo <ArrowUpRight className="h-3 w-3" />
                      </a>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Clean, Modern Metric Counters at Bottom */}
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          suppressHydrationWarning
          className="mt-14 pt-8 border-t border-zinc-200/80 dark:border-white/[0.08] grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {PROFILE.stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              suppressHydrationWarning
              className="rounded-xl border border-zinc-200/60 dark:border-white/[0.06] bg-white/50 dark:bg-[#0E1012]/50 p-4 hover:border-zinc-300 dark:hover:border-white/15 transition-colors"
            >
              <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 dark:text-[#555962]">
                0{idx + 1} / {stat.label}
              </div>
              <div className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-[#090A0B] dark:text-[#F7F8F8] tabular-nums mt-1">
                {stat.value}
              </div>
              <p className="text-xs text-zinc-500 dark:text-[#8A8F98] mt-1 line-clamp-2 leading-relaxed">
                {stat.detail}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
