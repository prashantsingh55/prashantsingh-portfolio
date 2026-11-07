"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Sliders,
  Play,
  Copy,
  Check,
  Cpu,
  Layers,
  Activity,
  RotateCcw,
} from "lucide-react";

export interface SpringTelemetry {
  dampingRatio: number;
  regime: "Underdamped (Bouncy)" | "Critically Tuned (Snappy)" | "Overdamped";
  settlingTimeMs: number;
  svgPath: string;
}

/**
 * Pure damped harmonic oscillator solver for the Interactive Craft Lab.
 * Computes exact analytical displacement x(t) from t=0..0.9s and generates an SVG path.
 */
export function computeSpringWaveformPoints(
  stiffness: number,
  damping: number,
  mass: number,
  width: number = 320,
  height: number = 96
): SpringTelemetry {
  const finiteStiffness = Number.isFinite(stiffness) ? stiffness : 340;
  const finiteDamping = Number.isFinite(damping) ? damping : 26;
  const finiteMass = Number.isFinite(mass) ? mass : 1.0;

  const safeStiffness = Math.max(10, Math.min(1000, finiteStiffness));
  const safeDamping = Math.max(1, Math.min(200, finiteDamping));
  const safeMass = Math.max(0.1, Math.min(10, finiteMass));

  const omegaN = Math.sqrt(safeStiffness / safeMass);
  const zeta = safeDamping / (2 * Math.sqrt(safeStiffness * safeMass));

  const steps = 48;
  const durationSec = 0.9;
  const baselineY = height * 0.35;
  const amplitudeY = height * 0.48;

  const evalDisplacement = (t: number): number => {
    if (zeta < 1) {
      const omegaD = omegaN * Math.sqrt(1 - zeta * zeta);
      const envelope = Math.exp(-zeta * omegaN * t);
      return (
        1 -
        envelope *
          (Math.cos(omegaD * t) +
            (zeta / Math.sqrt(1 - zeta * zeta)) * Math.sin(omegaD * t))
      );
    }
    if (Math.abs(zeta - 1) < 1e-4) {
      return 1 - (1 + omegaN * t) * Math.exp(-omegaN * t);
    }
    const r1 = -omegaN * (zeta - Math.sqrt(zeta * zeta - 1));
    const r2 = -omegaN * (zeta + Math.sqrt(zeta * zeta - 1));
    const c2 = r1 / (r1 - r2);
    const c1 = 1 - c2;
    return 1 - (c1 * Math.exp(r1 * t) + c2 * Math.exp(r2 * t));
  };

  const points: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * durationSec;
    const displacement = evalDisplacement(t);
    const x = (i / steps) * width;
    const y =
      height - amplitudeY * displacement - (height - baselineY - amplitudeY);
    const clampedY = Math.max(6, Math.min(height - 6, y));
    points.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)},${clampedY.toFixed(1)}`);
  }

  // Scan up to 4.0s with 10ms resolution so heavily overdamped or lightly damped springs report true 2% settling time
  let lastUnsettledTime = 0;
  for (let ms = 0; ms <= 4000; ms += 10) {
    const t = ms / 1000;
    if (Math.abs(1 - evalDisplacement(t)) > 0.02) {
      lastUnsettledTime = t;
    }
  }

  const regime: SpringTelemetry["regime"] =
    zeta < 0.72
      ? "Underdamped (Bouncy)"
      : zeta <= 1.08
      ? "Critically Tuned (Snappy)"
      : "Overdamped";

  return {
    dampingRatio: Number(zeta.toFixed(2)),
    regime,
    settlingTimeMs: Math.max(80, Math.round(lastUnsettledTime * 1000)),
    svgPath: points.join(" "),
  };
}

export interface QueueTelemetry {
  p95LatencyMs: number;
  throughputJobsPerMin: number;
  workerUtilizationPct: number;
  statusLabel: "OPTIMAL // NON-BLOCKING" | "SATURATED // BLOCKING I/O";
}

export function computeQueueThroughputTelemetry(
  concurrentUploads: number,
  payloadMb: number,
  asyncQueueEnabled: boolean
): QueueTelemetry {
  const finiteUploads = Number.isFinite(concurrentUploads)
    ? concurrentUploads
    : 18;
  const finitePayload = Number.isFinite(payloadMb) ? payloadMb : 45;

  const safeUploads = Math.max(1, Math.min(100, finiteUploads));
  const safePayload = Math.max(1, Math.min(200, finitePayload));

  if (asyncQueueEnabled) {
    // Ack via pg-boss + S3 presigned upload + Sharp SIMD background workers
    const p95LatencyMs = Math.round(38 + safeUploads * 1.4 + safePayload * 0.35);
    const throughputJobsPerMin = Math.round(
      Math.min(480, (60_000 / Math.max(120, safePayload * 9.5)) * 8)
    );
    const workerUtilizationPct = Math.min(
      96,
      Math.round(18 + safeUploads * 1.15 + safePayload * 0.25)
    );
    return {
      p95LatencyMs,
      throughputJobsPerMin,
      workerUtilizationPct,
      statusLabel: "OPTIMAL // NON-BLOCKING",
    };
  }

  // Synchronous blocking HTTP decode
  const p95LatencyMs = Math.round(420 + safeUploads * 95 + safePayload * 28);
  const throughputJobsPerMin = Math.max(
    6,
    Math.round(60_000 / Math.max(600, safePayload * 38 + safeUploads * 45))
  );
  const workerUtilizationPct = Math.min(
    100,
    Math.round(55 + safeUploads * 2.2)
  );
  return {
    p95LatencyMs,
    throughputJobsPerMin,
    workerUtilizationPct,
    statusLabel: "SATURATED // BLOCKING I/O",
  };
}

export const EXCLUSION_MODES = [
  {
    id: "production",
    key: "1",
    label: "Production Edge",
    latency: "18ms",
    surface: "#0E1012",
    border: "rgba(255,255,255,0.08)",
    note: "Zero-CLS static shell + streaming RSC data boundaries",
  },
  {
    id: "simd",
    key: "2",
    label: "Sharp SIMD Worker",
    latency: "64ms",
    surface: "#141517",
    border: "rgba(16,185,129,0.28)",
    note: "Libvips SIMD vector pipeline with ICC profile preservation",
  },
  {
    id: "sensor",
    key: "3",
    label: "AR Sensor Fusion",
    latency: "8.3ms",
    surface: "#16181D",
    border: "rgba(255,255,255,0.14)",
    note: "120Hz complementary filter merging gyroscope + magnetometer",
  },
  {
    id: "web3",
    key: "4",
    label: "On-Chain VRF",
    latency: "Block +1",
    surface: "#121316",
    border: "rgba(255,255,255,0.12)",
    note: "Deterministic base64 SVG rendering & Chainlink VRF callback",
  },
] as const;

/**
 * Resolves tactile keycap shortcuts (`1`–`4`) and arrow keys (`ArrowRight`, `ArrowLeft`,
 * `ArrowDown`, `ArrowUp`) for Lab 02 Exclusion Tabs.
 */
export function resolveExclusionModeKey(
  key: string,
  currentModeId: string
): string | null {
  const directMatch = EXCLUSION_MODES.find((m) => m.key === key);
  if (directMatch) {
    return directMatch.id;
  }

  const currentIndex = Math.max(
    0,
    EXCLUSION_MODES.findIndex((m) => m.id === currentModeId)
  );
  if (key === "ArrowRight" || key === "ArrowDown") {
    return EXCLUSION_MODES[(currentIndex + 1) % EXCLUSION_MODES.length].id;
  }
  if (key === "ArrowLeft" || key === "ArrowUp") {
    return EXCLUSION_MODES[
      (currentIndex - 1 + EXCLUSION_MODES.length) % EXCLUSION_MODES.length
    ].id;
  }
  return null;
}

export default function CraftLabSection() {
  // Lab 01: Spring Physics State
  const [stiffness, setStiffness] = useState<number>(340);
  const [damping, setDamping] = useState<number>(26);
  const [mass, setMass] = useState<number>(1.0);
  const [springStep, setSpringStep] = useState<boolean>(false);
  const [copiedSpring, setCopiedSpring] = useState<boolean>(false);
  const copyTimerRef = useRef<number | null>(null);

  // Lab 02: Exclusion Tabs State
  const [activeModeId, setActiveModeId] = useState<string>("production");

  // Lab 03: Queue Telemetry State
  const [concurrentUploads, setConcurrentUploads] = useState<number>(18);
  const [payloadMb, setPayloadMb] = useState<number>(45);
  const [asyncQueueEnabled, setAsyncQueueEnabled] = useState<boolean>(true);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  const springTelemetry = useMemo(
    () => computeSpringWaveformPoints(stiffness, damping, mass),
    [stiffness, damping, mass]
  );

  const queueTelemetry = useMemo(
    () =>
      computeQueueThroughputTelemetry(
        concurrentUploads,
        payloadMb,
        asyncQueueEnabled
      ),
    [concurrentUploads, payloadMb, asyncQueueEnabled]
  );

  const activeMode =
    EXCLUSION_MODES.find((m) => m.id === activeModeId) ?? EXCLUSION_MODES[0];

  const handleCopySpring = async () => {
    const snippet = `transition={{ type: "spring", stiffness: ${stiffness}, damping: ${damping}, mass: ${mass} }}`;
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(snippet);
      }
      setCopiedSpring(true);
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
      copyTimerRef.current = window.setTimeout(() => {
        setCopiedSpring(false);
        copyTimerRef.current = null;
      }, 2000);
    } catch {
      setCopiedSpring(false);
    }
  };

  return (
    <section
      id="craft-lab"
      className="py-16 md:py-24 border-b border-zinc-200/80 dark:border-white/[0.08]"
    >
      <div className="container-max">
        {/* Section Index Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-zinc-500 dark:text-[#8A8F98]">
              <span className="text-[#090A0B] dark:text-[#F7F8F8] font-semibold">
                02 / INTERACTIVE CRAFT LAB
              </span>
              <span>—</span>
              <span>UI ENGINEERING &amp; SYSTEMS SANDBOX</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.025em] text-[#090A0B] dark:text-[#F7F8F8]">
              Tactile Micro-Interactions &amp; Systems Telemetry
            </h2>
            <p className="text-sm text-zinc-600 dark:text-[#8A8F98] leading-relaxed">
              Great software feels inevitable. Inspect the spring physics,
              shared-layout exclusion states, and asynchronous worker queue
              models used across my production applications.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-500 dark:text-[#9FB3D9]">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            <span>INTERACTIVE // ZERO EXTERNAL ASSETS</span>
          </div>
        </div>

        {/* 3-Column Interactive Sandbox Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Module 01: Spring Physics Tuner */}
          <div className="surface-panel rounded-xl p-5 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2 border-b border-zinc-200/70 dark:border-white/[0.06] pb-3">
                <div className="flex items-center gap-2">
                  <Sliders className="h-3.5 w-3.5 text-zinc-500 dark:text-[#9FB3D9]" />
                  <h3 className="font-mono text-xs font-semibold text-[#0A1226] dark:text-[#FAF6EE]">
                    LAB 01 // SPRING PHYSICS
                  </h3>
                </div>
                <span className="font-mono text-[10px] text-red-600 dark:text-red-400 tabular-nums">
                  ζ = {springTelemetry.dampingRatio} ·{" "}
                  {springTelemetry.settlingTimeMs}ms
                </span>
              </div>

              {/* Live SVG Waveform & Animated Spring Puck */}
              <div className="rounded-lg border border-[#E8DEC8] dark:border-[#1E325C] bg-[#070D1E] p-3 space-y-3">
                <div className="flex items-center justify-between font-mono text-[10px] text-[#9FB3D9]">
                  <span>{springTelemetry.regime}</span>
                  <button
                    type="button"
                    onClick={() => setSpringStep((prev) => !prev)}
                    className="tactile-control inline-flex items-center gap-1 rounded border border-white/15 bg-[#0E1E45] px-2 py-0.5 text-[10px] text-[#FAF6EE] hover:border-red-400"
                  >
                    <Play className="h-2.5 w-2.5 text-red-400" />
                    <span>Trigger Impulse</span>
                  </button>
                </div>

                <svg
                  viewBox="0 0 320 96"
                  className="w-full h-20 overflow-visible"
                  aria-label="Damped harmonic oscillator response curve"
                >
                  <line
                    x1="0"
                    y1="33.6"
                    x2="320"
                    y2="33.6"
                    stroke="rgba(255,255,255,0.12)"
                    strokeDasharray="3 3"
                  />
                  <path
                    d={springTelemetry.svgPath}
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                  />
                </svg>

                {/* Live Motion Track */}
                <div className="relative h-8 rounded-md bg-[#0E1E45] border border-white/[0.06] px-1.5 flex items-center">
                  <motion.div
                    animate={{ x: springStep ? 180 : 0 }}
                    transition={{
                      type: "spring",
                      stiffness,
                      damping,
                      mass,
                    }}
                    onClick={() => setSpringStep((prev) => !prev)}
                    suppressHydrationWarning
                    className="cursor-pointer select-none h-5 px-2.5 rounded bg-red-600 text-white font-mono text-[10px] font-semibold inline-flex items-center gap-1 shadow"
                  >
                    <span>x: {springStep ? "180px" : "0px"}</span>
                  </motion.div>
                </div>
              </div>

              {/* Parameter Sliders */}
              <div className="space-y-2.5">
                <div>
                  <div className="flex justify-between font-mono text-[10px] text-zinc-500 dark:text-[#8A8F98] mb-1">
                    <label htmlFor="craft-stiffness">STIFFNESS (k)</label>
                    <span className="tabular-nums text-[#090A0B] dark:text-[#F7F8F8]">
                      {stiffness} N/m
                    </span>
                  </div>
                  <input
                    id="craft-stiffness"
                    type="range"
                    min={80}
                    max={500}
                    step={10}
                    value={stiffness}
                    onChange={(e) => setStiffness(Number(e.target.value))}
                    className="w-full h-1.5 rounded-lg appearance-none bg-zinc-200 dark:bg-white/10 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-mono text-[10px] text-zinc-500 dark:text-[#8A8F98] mb-1">
                    <label htmlFor="craft-damping">DAMPING (c)</label>
                    <span className="tabular-nums text-[#090A0B] dark:text-[#F7F8F8]">
                      {damping} Ns/m
                    </span>
                  </div>
                  <input
                    id="craft-damping"
                    type="range"
                    min={8}
                    max={48}
                    step={1}
                    value={damping}
                    onChange={(e) => setDamping(Number(e.target.value))}
                    className="w-full h-1.5 rounded-lg appearance-none bg-zinc-200 dark:bg-white/10 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-mono text-[10px] text-zinc-500 dark:text-[#8A8F98] mb-1">
                    <label htmlFor="craft-mass">MASS (m)</label>
                    <span className="tabular-nums text-[#090A0B] dark:text-[#F7F8F8]">
                      {mass.toFixed(1)} kg
                    </span>
                  </div>
                  <input
                    id="craft-mass"
                    type="range"
                    min={0.5}
                    max={3.0}
                    step={0.1}
                    value={mass}
                    onChange={(e) => setMass(Number(e.target.value))}
                    className="w-full h-1.5 rounded-lg appearance-none bg-zinc-200 dark:bg-white/10 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-200/70 dark:border-white/[0.06] flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => {
                  setStiffness(340);
                  setDamping(26);
                  setMass(1.0);
                }}
                className="tactile-control inline-flex items-center gap-1 font-mono text-[11px] text-zinc-500 dark:text-[#8A8F98] hover:text-[#090A0B] dark:hover:text-white"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset</span>
              </button>

              <button
                type="button"
                onClick={handleCopySpring}
                className="tactile-control inline-flex items-center gap-1.5 rounded-md border border-zinc-200 dark:border-white/[0.1] bg-zinc-50 dark:bg-[#141517] px-2.5 py-1 font-mono text-[11px] text-[#090A0B] dark:text-[#F7F8F8]"
              >
                {copiedSpring ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400">
                      Copied Config
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3 opacity-70" />
                    <span>Copy transition</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Module 02: Shared-Layout Exclusion & Tactile Keycaps */}
          <div
            onKeyDown={(e) => {
              const nextId = resolveExclusionModeKey(e.key, activeMode.id);
              if (nextId) {
                e.preventDefault();
                setActiveModeId(nextId);
              }
            }}
            className="surface-panel rounded-xl p-5 flex flex-col justify-between space-y-5"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2 border-b border-zinc-200/70 dark:border-white/[0.06] pb-3">
                <div className="flex items-center gap-2">
                  <Layers className="h-3.5 w-3.5 text-zinc-500 dark:text-[#8A8F98]" />
                  <h3 className="font-mono text-xs font-semibold text-[#090A0B] dark:text-[#F7F8F8]">
                    LAB 02 // EXCLUSION TABS
                  </h3>
                </div>
                <span className="font-mono text-[10px] text-zinc-500 dark:text-[#8A8F98]">
                  scale(0.97) · layoutId
                </span>
              </div>

              <p className="text-xs text-zinc-600 dark:text-[#8A8F98] leading-relaxed">
                Select any system profile or press keys{" "}
                <kbd className="keycap">1</kbd>–<kbd className="keycap">4</kbd>{" "}
                to test shared-layout pill interpolation and instant state token
                switching without layout thrashing.
              </p>

              {/* Shared-Layout Exclusion Pill List */}
              <div
                role="tablist"
                aria-label="System execution profile"
                className="grid grid-cols-2 gap-1.5 rounded-lg border border-zinc-200 dark:border-white/[0.08] bg-zinc-100/80 dark:bg-[#08090A] p-1.5"
              >
                {EXCLUSION_MODES.map((mode) => {
                  const selected = mode.id === activeMode.id;
                  return (
                    <button
                      key={mode.id}
                      id={`craft-tab-${mode.id}`}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      aria-controls="craft-exclusion-tabpanel"
                      aria-keyshortcuts={mode.key}
                      onClick={() => setActiveModeId(mode.id)}
                      className={`tactile-control relative flex items-center justify-between rounded-md px-2.5 py-2 text-left text-xs font-medium transition-colors ${
                        selected
                          ? "text-[#090A0B] dark:text-[#F7F8F8]"
                          : "text-zinc-500 dark:text-[#8A8F98] hover:text-zinc-900 dark:hover:text-white"
                      }`}
                    >
                      {selected && (
                        <motion.span
                          layoutId="craft-exclusion-pill"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 32,
                          }}
                          suppressHydrationWarning
                          className="absolute inset-0 rounded-md bg-white dark:bg-[#12234D] border border-[#E8DEC8] dark:border-[#2A4785] shadow-sm"
                        />
                      )}
                      <span className="relative z-10 truncate">
                        {mode.label}
                      </span>
                      <kbd className="relative z-10 keycap ml-1">
                        {mode.key}
                      </kbd>
                    </button>
                  );
                })}
              </div>

              {/* Live Token Inspector Output */}
              <div
                id="craft-exclusion-tabpanel"
                role="tabpanel"
                aria-labelledby={`craft-tab-${activeMode.id}`}
                className="rounded-lg border border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF7F2] dark:bg-[#070D1E] p-3.5 space-y-2.5 font-mono text-xs"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-zinc-400 dark:text-[#5B73A8]">
                    ACTIVE PROFILE
                  </span>
                  <span className="text-red-600 dark:text-red-400 font-semibold tabular-nums">
                    TARGET SLA: {activeMode.latency}
                  </span>
                </div>
                <div className="text-[#0A1226] dark:text-[#FAF6EE] font-sans text-xs leading-relaxed">
                  {activeMode.note}
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E8DEC8] dark:border-[#1E325C]/60 text-[10px]">
                  <div>
                    <span className="text-zinc-400 dark:text-[#5B73A8] block">
                      SURFACE TOKEN
                    </span>
                    <span className="text-[#0A1226] dark:text-[#FAF6EE]">
                      {activeMode.surface}
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-400 dark:text-[#5B73A8] block">
                      HAIRLINE BORDER
                    </span>
                    <span className="text-[#0A1226] dark:text-[#FAF6EE]">
                      {activeMode.border}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E8DEC8] dark:border-[#1E325C]/60 flex items-center justify-between font-mono text-[10px] text-zinc-500 dark:text-[#9FB3D9]">
              <span>IDENTITY TRANSFORM: scale: 1</span>
              <span>ZERO STACKING SHIFT</span>
            </div>
          </div>

          {/* Module 03: Async Queue & Worker Concurrency Simulator */}
          <div className="surface-panel rounded-xl p-5 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2 border-b border-[#E8DEC8] dark:border-[#1E325C]/60 pb-3">
                <div className="flex items-center gap-2">
                  <Activity className="h-3.5 w-3.5 text-zinc-500 dark:text-[#9FB3D9]" />
                  <h3 className="font-mono text-xs font-semibold text-[#0A1226] dark:text-[#FAF6EE]">
                    LAB 03 // QUEUE TELEMETRY
                  </h3>
                </div>
                <span
                  className={`font-mono text-[10px] font-semibold ${
                    asyncQueueEnabled
                      ? "text-red-600 dark:text-red-400"
                      : "text-amber-600 dark:text-amber-400"
                  }`}
                >
                  {queueTelemetry.statusLabel}
                </span>
              </div>

              {/* Architecture Mode Switch */}
              <div className="grid grid-cols-2 gap-1.5 rounded-lg border border-[#E8DEC8] dark:border-[#1E325C] bg-[#F2ECE1] dark:bg-[#070D1E] p-1">
                <button
                  type="button"
                  onClick={() => setAsyncQueueEnabled(true)}
                  className={`tactile-control rounded px-2.5 py-1.5 font-mono text-[10px] font-medium transition-colors ${
                    asyncQueueEnabled
                      ? "bg-white dark:bg-[#12234D] text-[#0A1226] dark:text-[#FAF6EE] shadow-sm font-semibold"
                      : "text-zinc-500 dark:text-[#9FB3D9]"
                  }`}
                >
                  pg-boss + Sharp SIMD
                </button>
                <button
                  type="button"
                  onClick={() => setAsyncQueueEnabled(false)}
                  className={`tactile-control rounded px-2.5 py-1.5 font-mono text-[10px] font-medium transition-colors ${
                    !asyncQueueEnabled
                      ? "bg-white dark:bg-[#12234D] text-[#0A1226] dark:text-[#FAF6EE] shadow-sm font-semibold"
                      : "text-zinc-500 dark:text-[#9FB3D9]"
                  }`}
                >
                  Sync HTTP Decode
                </button>
              </div>

              {/* Telemetry Metrics Readout */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="rounded-lg border border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF7F2] dark:bg-[#070D1E] p-3">
                  <div className="font-mono text-[9px] text-[#1E3A8A] dark:text-[#9FB3D9]">
                    P95 HTTP RESPONSE
                  </div>
                  <div className="font-mono text-lg font-semibold tabular-nums text-[#0A1226] dark:text-[#FAF6EE] mt-0.5">
                    {queueTelemetry.p95LatencyMs} ms
                  </div>
                </div>
                <div className="rounded-lg border border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF7F2] dark:bg-[#070D1E] p-3">
                  <div className="font-mono text-[9px] text-[#1E3A8A] dark:text-[#9FB3D9]">
                    THROUGHPUT
                  </div>
                  <div className="font-mono text-lg font-semibold tabular-nums text-[#0A1226] dark:text-[#FAF6EE] mt-0.5">
                    {queueTelemetry.throughputJobsPerMin} jobs/m
                  </div>
                </div>
              </div>

              {/* Sliders */}
              <div className="space-y-2.5">
                <div>
                  <div className="flex justify-between font-mono text-[10px] text-zinc-500 dark:text-[#8A8F98] mb-1">
                    <label htmlFor="craft-concurrency">
                      CONCURRENT STUDIO UPLOADS
                    </label>
                    <span className="tabular-nums text-[#090A0B] dark:text-[#F7F8F8]">
                      {concurrentUploads} clients
                    </span>
                  </div>
                  <input
                    id="craft-concurrency"
                    type="range"
                    min={1}
                    max={64}
                    value={concurrentUploads}
                    onChange={(e) =>
                      setConcurrentUploads(Number(e.target.value))
                    }
                    className="w-full h-1.5 rounded-lg appearance-none bg-zinc-200 dark:bg-white/10 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-mono text-[10px] text-zinc-500 dark:text-[#8A8F98] mb-1">
                    <label htmlFor="craft-payload">
                      TIFF / RAW PAYLOAD SIZE
                    </label>
                    <span className="tabular-nums text-[#090A0B] dark:text-[#F7F8F8]">
                      {payloadMb} MB
                    </span>
                  </div>
                  <input
                    id="craft-payload"
                    type="range"
                    min={10}
                    max={100}
                    step={5}
                    value={payloadMb}
                    onChange={(e) => setPayloadMb(Number(e.target.value))}
                    className="w-full h-1.5 rounded-lg appearance-none bg-zinc-200 dark:bg-white/10 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-200/70 dark:border-white/[0.06] flex items-center justify-between font-mono text-[10px] text-zinc-500 dark:text-[#8A8F98]">
              <span className="inline-flex items-center gap-1">
                <Cpu className="h-3 w-3" />
                <span>WORKER LOAD: {queueTelemetry.workerUtilizationPct}%</span>
              </span>
              <span>MODEL: CHITRABAZAAR</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
