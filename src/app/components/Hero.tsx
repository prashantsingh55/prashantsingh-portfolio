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
  TrendingUp,
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

type ShowcaseTab = "systems" | "product" | "growth" | "mobile";

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
    <section className="relative border-b border-[#E8DEC8] dark:border-[#1E325C] pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden">
      {/* Subtle modern ambient background with animated floating glow orbs (Blue 60%, Cream 30%, Red 10%) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 architectural-grid opacity-35 dark:opacity-25"
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
        className="pointer-events-none absolute -top-20 -left-20 -z-10 h-80 w-80 rounded-full bg-blue-600/15 dark:bg-blue-500/[0.1] blur-2xl"
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
        className="pointer-events-none absolute top-1/2 -right-20 -z-10 h-80 w-80 rounded-full bg-[#FAF6EE]/20 dark:bg-[#FAF6EE]/[0.05] blur-2xl"
      />
      <motion.div
        aria-hidden="true"
        suppressHydrationWarning
        animate={
          prefersReducedMotion
            ? {}
            : {
                x: [0, 15, 0],
                y: [0, 15, 0],
                scale: [1, 1.04, 1],
              }
        }
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute bottom-0 left-1/3 -z-10 h-64 w-64 rounded-full bg-red-500/10 dark:bg-red-500/[0.06] blur-2xl"
      />


      <div className="container-max">
        {/* Top Breadcrumb Bar */}
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          suppressHydrationWarning
          className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-8 border-b border-[#E8DEC8] dark:border-[#1E325C] text-[11px] font-mono text-[#57534E] dark:text-[#C5BAA9]"
        >
          <div className="flex items-center gap-2">
            <span className="text-[#0A1226] dark:text-[#FAF6EE] font-semibold">
              01 / PORTFOLIO INDEX
            </span>
            <span className="text-[#DFD4BD] dark:text-[#1E325C]">—</span>
            <span>{PROFILE.tagline}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-3 w-3 text-red-500" />
            <span>{PROFILE.location}</span>
            <span className="text-[#DFD4BD] dark:text-[#1E325C]">·</span>
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
              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/25 bg-red-500/10 px-3.5 py-1 text-xs font-medium text-red-700 dark:text-red-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                </span>
                <span>{PROFILE.availability}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0A1226] dark:text-[#FAF6EE] leading-[1.08]">
                {PROFILE.fullName}
                <span className="block text-[#1E3A8A] dark:text-[#93C5FD] font-normal text-2xl sm:text-3xl lg:text-4xl mt-2 tracking-tight">
                  {PROFILE.headline} &amp; Full Stack Developer
                </span>
              </h1>
            </motion.div>

            {/* Concise, Readable Narrative */}
            <motion.div
              variants={itemVariants}
              initial={false}
              suppressHydrationWarning
              className="space-y-3 text-sm sm:text-base text-[#44403C] dark:text-[#DCD3C5] leading-relaxed max-w-2xl"
            >
              <p>
                {PROFILE.bio} Holding an{" "}
                <strong className="font-semibold text-[#0A1226] dark:text-[#FAF6EE]">
                  MBA from Lincoln University College
                </strong>{" "}
                and a{" "}
                <strong className="font-semibold text-[#0A1226] dark:text-[#FAF6EE]">
                  B.Sc. CSIT from Texas International College
                </strong>
                , I bridge IT Business Analysis with full-stack engineering at{" "}
                <span className="font-medium text-[#0A1226] dark:text-[#FAF6EE] underline decoration-[#DFD4BD] dark:decoration-[#1E325C] underline-offset-4">
                  Chitrabazar
                </span>{" "}
                and{" "}
                <span className="font-medium text-[#0A1226] dark:text-[#FAF6EE] underline decoration-[#DFD4BD] dark:decoration-[#1E325C] underline-offset-4">
                  AllStockNepal
                </span>
                .
              </p>
              <p className="text-xs sm:text-sm text-[#57534E] dark:text-[#B8AEA0]">
                Managed <strong className="text-red-600 dark:text-red-400 font-semibold">$10k+ on Meta &amp; Google Ads</strong> with high ROAS, educator to <strong className="text-red-600 dark:text-red-400 font-semibold">1,000+ individuals</strong> in Meta Ads masterclasses, SEO expert, and author of 26+ open-source repositories spanning Next.js, FastAPI,{" "}
                <span className="font-mono text-[#0A1226] dark:text-[#FAF6EE]">
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
                className="tactile-control inline-flex items-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-500 px-5 py-3 text-xs sm:text-sm font-semibold text-white shadow-md shadow-red-950/20 transition-all"
              >
                <span>Inspect Production Systems</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="tactile-control inline-flex items-center gap-2 rounded-xl border border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF6EE] dark:bg-[#0F1B38] hover:bg-[#F3ECE0] dark:hover:bg-[#15254A] px-4 py-3 text-xs sm:text-sm font-medium text-[#0A1226] dark:text-[#FAF6EE] transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-red-500" />
                    <span className="font-mono text-xs text-red-600 dark:text-red-400">
                      Copied {PROFILE.email}
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 text-[#786037] dark:text-[#93C5FD]" />
                    <span>Copy Email</span>
                    <kbd className="keycap ml-0.5">C</kbd>
                  </>
                )}
              </button>

              <Link
                href="/about"
                className="tactile-control inline-flex items-center gap-1.5 rounded-xl border border-[#E8DEC8] dark:border-[#1E325C] bg-[#F5EFE6] dark:bg-[#0C152B] hover:bg-[#EFE8DC] dark:hover:bg-[#142347] px-4 py-3 text-xs sm:text-sm font-medium text-[#0A1226] dark:text-[#FAF6EE] transition-colors"
              >
                <span>About &amp; Dossier</span>
              </Link>
            </motion.div>

            {/* Verified Profiles Bar */}
            <motion.div
              variants={itemVariants}
              initial={false}
              suppressHydrationWarning
              className="pt-4 border-t border-[#E8DEC8] dark:border-[#1E325C] flex flex-wrap items-center gap-2.5 text-xs"
            >
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#786037] dark:text-[#93C5FD] mr-1">
                VERIFIED PROFILES:
              </span>
              <a
                href={PROFILE.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="tactile-control inline-flex items-center gap-1.5 rounded-lg border border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF6EE] dark:bg-[#0C152B] px-3 py-1.5 font-mono text-[11px] text-[#0A1226] dark:text-[#FAF6EE] hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
              >
                <Github className="h-3.5 w-3.5" />
                <span>GitHub</span>
                <ArrowUpRight className="h-3 w-3 opacity-50" />
              </a>
              <a
                href={PROFILE.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="tactile-control inline-flex items-center gap-1.5 rounded-lg border border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF6EE] dark:bg-[#0C152B] px-3 py-1.5 font-mono text-[11px] text-[#0A1226] dark:text-[#FAF6EE] hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
              >
                <Linkedin className="h-3.5 w-3.5" />
                <span>LinkedIn</span>
                <ArrowUpRight className="h-3 w-3 opacity-50" />
              </a>
              <a
                href={PROFILE.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="tactile-control inline-flex items-center gap-1.5 rounded-lg border border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF6EE] dark:bg-[#0C152B] px-3 py-1.5 font-mono text-[11px] text-[#0A1226] dark:text-[#FAF6EE] hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
              >
                <FaXTwitter className="h-3.5 w-3.5" />
                <span>Twitter / X</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Visual Showcase & Profile Card */}
          <motion.div variants={itemVariants} initial={false} suppressHydrationWarning className="lg:col-span-5">
            <div className="relative rounded-2xl border border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF7F2]/95 dark:bg-[#0C152B]/95 shadow-xl backdrop-blur-md overflow-hidden">
              {/* Profile Card Header with Real Photo */}
              <div className="p-6 border-b border-[#E8DEC8] dark:border-[#1E325C]/70 bg-gradient-to-b from-[#F3ECE0] to-transparent dark:from-[#101C38] dark:to-transparent">
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-20 shrink-0 rounded-2xl overflow-hidden p-0.5 border border-[#DFD5C2] dark:border-[#22396B] ring-1 ring-blue-500/20 dark:ring-blue-500/30 bg-gradient-to-b from-blue-900/10 via-[#FAF6EE] to-blue-900/10 shadow-sm">
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
                      <h2 className="text-lg font-bold text-[#0A1226] dark:text-[#FAF6EE] truncate">
                        {PROFILE.fullName}
                      </h2>
                      <span className="inline-flex items-center rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-mono text-red-600 dark:text-red-400 font-medium border border-red-500/20">
                        Active
                      </span>
                    </div>
                    <p className="text-xs font-medium text-[#1E3A8A] dark:text-[#93C5FD] truncate mt-0.5">
                      {PROFILE.title}
                    </p>
                    <p className="text-[11px] text-[#786037] dark:text-[#C5BAA9] truncate mt-1 font-mono">
                      MBA · Lincoln Univ. | CSIT · Texas College
                    </p>
                  </div>
                </div>
              </div>

              {/* Intuitive Focus Selector */}
              <div className="px-6 pt-4 pb-2">
                <div className="flex items-center justify-between text-xs font-semibold text-[#786037] dark:text-[#93C5FD] uppercase tracking-wider mb-2 font-mono">
                  <span>Core Expertise Areas</span>
                  <span className="text-red-600 dark:text-red-400">
                    Verified
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-1 p-1 rounded-xl bg-[#F0E6D4] dark:bg-[#070D1E]">
                  {(
                    [
                      { id: "systems", label: "Full-Stack", icon: Code2 },
                      { id: "growth", label: "Ads & SEO", icon: TrendingUp },
                      { id: "product", label: "Product/BA", icon: Briefcase },
                      { id: "mobile", label: "Mobile/AR", icon: Smartphone },
                    ] as const
                  ).map((tab) => {
                    const Icon = tab.icon;
                    const isSelected = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={`tactile-control flex items-center justify-center gap-1 rounded-lg py-2 px-1 text-[11px] font-medium transition-all ${
                          isSelected
                            ? "bg-[#0A1226] text-white dark:bg-[#1E325C] dark:text-[#FAF6EE] shadow-sm"
                            : "text-[#57534E] dark:text-[#C5BAA9] hover:text-[#0A1226] dark:hover:text-white"
                        }`}
                      >
                        <Icon className="h-3 w-3 shrink-0" />
                        <span className="truncate">{tab.label}</span>
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
                    <p className="text-xs text-[#57534E] dark:text-[#DCD3C5] leading-relaxed">
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
                          className="rounded-md border border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF6EE] dark:bg-[#101C38] px-2.5 py-1 text-[11px] font-mono text-[#0A1226] dark:text-[#FAF6EE]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="pt-2 border-t border-[#E8DEC8] dark:border-[#1E325C]/60 flex items-center justify-between text-xs font-mono">
                      <span className="text-[#786037] dark:text-[#93C5FD]">Flagships:</span>
                      <div className="flex items-center gap-3">
                        <a
                          href="https://beyourownmarketeracademy.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-red-600 dark:text-red-400 hover:underline flex items-center gap-1 font-semibold"
                        >
                          BeYourOwnMarketer <ArrowUpRight className="h-3 w-3" />
                        </a>
                        <a
                          href="https://chitrabazaar.vercel.app"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0A1226] dark:text-[#FAF6EE] hover:underline flex items-center gap-1"
                        >
                          Chitrabazaar <ArrowUpRight className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "growth" && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    suppressHydrationWarning
                    className="space-y-3"
                  >
                    <p className="text-xs text-[#57534E] dark:text-[#DCD3C5] leading-relaxed">
                      Over <strong className="text-red-600 dark:text-red-400 font-semibold">$10,000+ managed in Meta &amp; Google Ads</strong> with high ROAS, educator to <strong className="text-red-600 dark:text-red-400 font-semibold">1,000+ individuals</strong> (business founders, entrepreneurs &amp; graduates), and organic SEO architect.
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        "Meta Ads ($10k+ Spend)",
                        "Google Ads (PMax)",
                        "1,000+ Mentored",
                        "Technical SEO Expert",
                        "Meta Pixel & CAPI",
                        "3.8x–5.2x ROAS",
                      ].map((item) => (
                        <span
                          key={item}
                          className="rounded-md border border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF6EE] dark:bg-[#101C38] px-2.5 py-1 text-[11px] font-mono text-[#0A1226] dark:text-[#FAF6EE]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                    <div className="pt-2 border-t border-[#E8DEC8] dark:border-[#1E325C]/60 flex items-center justify-between text-xs font-mono">
                      <span className="text-[#786037] dark:text-[#93C5FD]">Deployments:</span>
                      <div className="flex items-center gap-3">
                        <a
                          href="https://beyourownmarketeracademy.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-red-600 dark:text-red-400 hover:underline flex items-center gap-1 font-semibold"
                        >
                          BYOM Academy <ArrowUpRight className="h-3 w-3" />
                        </a>
                        <a
                          href="https://allstocknepal.vercel.app"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0A1226] dark:text-[#FAF6EE] hover:underline flex items-center gap-1"
                        >
                          AllStockNepal <ArrowUpRight className="h-3 w-3" />
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
                    <p className="text-xs text-[#57534E] dark:text-[#DCD3C5] leading-relaxed">
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
                          className="rounded-md border border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF6EE] dark:bg-[#101C38] px-2.5 py-1 text-[11px] font-mono text-[#0A1226] dark:text-[#FAF6EE]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                    <div className="pt-2 border-t border-[#E8DEC8] dark:border-[#1E325C]/60 flex items-center justify-between text-xs font-mono">
                      <span className="text-[#786037] dark:text-[#93C5FD]">Deployments:</span>
                      <div className="flex items-center gap-3">
                        <a
                          href="https://allstocknepal.vercel.app"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-red-600 dark:text-red-400 hover:underline flex items-center gap-1 font-semibold"
                        >
                          AllStockNepal <ArrowUpRight className="h-3 w-3" />
                        </a>
                        <a
                          href="https://beyourownmarketeracademy.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0A1226] dark:text-[#FAF6EE] hover:underline flex items-center gap-1"
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
                    <p className="text-xs text-[#57534E] dark:text-[#DCD3C5] leading-relaxed">
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
                          className="rounded-md border border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF6EE] dark:bg-[#101C38] px-2.5 py-1 text-[11px] font-mono text-[#0A1226] dark:text-[#FAF6EE]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="pt-2 border-t border-[#E8DEC8] dark:border-[#1E325C]/60 flex items-center justify-between text-xs font-mono">
                      <span className="text-[#786037] dark:text-[#93C5FD]">Repositories:</span>
                      <a
                        href="https://github.com/prashantsingh55/Skyline-AR"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 dark:text-red-400 hover:underline flex items-center gap-1 font-semibold"
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

        {/* Clean, Modern Metric Counters at Bottom (Blue 60%, Cream 30%, Red 10%) */}
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          suppressHydrationWarning
          className="mt-14 pt-8 border-t border-[#E8DEC8] dark:border-[#1E325C] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5"
        >
          {PROFILE.stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              suppressHydrationWarning
              className="rounded-xl border border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF6EE]/70 dark:bg-[#0C152B]/70 p-3.5 hover:border-red-500/50 dark:hover:border-red-500/50 transition-colors"
            >
              <div className="font-mono text-[9px] uppercase tracking-wider text-[#786037] dark:text-[#93C5FD]">
                0{idx + 1} / {stat.label}
              </div>
              <div className="font-mono text-xl sm:text-2xl font-bold tracking-tight text-[#0A1226] dark:text-[#FAF6EE] tabular-nums mt-1 flex items-baseline gap-1">
                <span>{stat.value}</span>
                {idx < 3 && <span className="h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />}
              </div>
              <p className="text-[11px] text-[#57534E] dark:text-[#C5BAA9] mt-1 line-clamp-2 leading-relaxed">
                {stat.detail}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
