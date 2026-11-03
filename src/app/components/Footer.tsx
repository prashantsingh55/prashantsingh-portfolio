"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Github, Linkedin, Copy, Check, ArrowUpRight } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { PROFILE } from "@/contents/profile";

export default function Footer() {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const copyTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  const handleCopy = async (email: string) => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(email);
      }
      setCopiedEmail(email);
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
      copyTimerRef.current = window.setTimeout(() => {
        setCopiedEmail(null);
        copyTimerRef.current = null;
      }, 2000);
    } catch {
      setCopiedEmail(null);
    }
  };

  return (
    <footer className="border-t border-zinc-200/80 dark:border-white/[0.08] bg-white dark:bg-[#08090A] py-12">
      <div className="container-max">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-zinc-200/70 dark:border-white/[0.06]">
          {/* Brand & Craft Signature */}
          <div className="md:col-span-5 space-y-3">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-md border border-zinc-300 dark:border-white/[0.12] bg-zinc-900 dark:bg-[#141517] font-mono text-[11px] font-semibold text-white dark:text-[#F7F8F8]">
                PS
              </span>
              <span className="text-sm font-semibold tracking-tight text-[#090A0B] dark:text-[#F7F8F8]">
                {PROFILE.fullName}
              </span>
            </Link>
            <p className="text-xs text-zinc-500 dark:text-[#8A8F98] max-w-sm leading-relaxed">
              {PROFILE.tagline}. Engineering Next.js web platforms, archival
              marketplaces, Solidity smart contracts, and Flutter AR systems
              from {PROFILE.location}.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <a
                href={PROFILE.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="tactile-control inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 dark:border-white/[0.08] bg-zinc-50 dark:bg-[#141517] text-zinc-600 dark:text-[#8A8F98] hover:text-[#090A0B] dark:hover:text-white"
              >
                <Github className="h-3.5 w-3.5" />
              </a>
              <a
                href={PROFILE.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="tactile-control inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 dark:border-white/[0.08] bg-zinc-50 dark:bg-[#141517] text-zinc-600 dark:text-[#8A8F98] hover:text-[#090A0B] dark:hover:text-white"
              >
                <Linkedin className="h-3.5 w-3.5" />
              </a>
              <a
                href={PROFILE.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter"
                className="tactile-control inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 dark:border-white/[0.08] bg-zinc-50 dark:bg-[#141517] text-zinc-600 dark:text-[#8A8F98] hover:text-[#090A0B] dark:hover:text-white"
              >
                <FaXTwitter className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Sitemap Index */}
          <div className="md:col-span-3 space-y-2.5">
            <h3 className="font-mono text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-[#555962]">
              Directory
            </h3>
            <ul className="space-y-1.5 font-mono text-xs text-zinc-600 dark:text-[#8A8F98]">
              <li>
                <Link
                  href="/"
                  className="hover:text-[#090A0B] dark:hover:text-[#F7F8F8]"
                >
                  01 / Index Overview
                </Link>
              </li>
              <li>
                <Link
                  href="/#craft-lab"
                  className="hover:text-[#090A0B] dark:hover:text-[#F7F8F8]"
                >
                  02 / Interactive Craft Lab
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="hover:text-[#090A0B] dark:hover:text-[#F7F8F8]"
                >
                  03 / Production Systems
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#090A0B] dark:hover:text-[#F7F8F8]"
                >
                  04 / Architecture &amp; CV
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="hover:text-[#090A0B] dark:hover:text-[#F7F8F8]"
                >
                  05 / Engineering Notes
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#090A0B] dark:hover:text-[#F7F8F8]"
                >
                  06 / Direct Transmission
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Tactile Coordinates */}
          <div className="md:col-span-4 space-y-2.5">
            <h3 className="font-mono text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-[#555962]">
              Direct Coordinates (Click to Copy)
            </h3>
            <ul className="space-y-2 font-mono text-xs text-zinc-600 dark:text-[#8A8F98]">
              <li className="flex items-center justify-between gap-2">
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="hover:text-[#090A0B] dark:hover:text-[#F7F8F8] truncate"
                >
                  {PROFILE.email}
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy(PROFILE.email)}
                  className="tactile-control shrink-0 inline-flex items-center gap-1 rounded border border-zinc-200 dark:border-white/[0.1] bg-zinc-50 dark:bg-[#141517] px-2 py-0.5 text-[10px]"
                >
                  {copiedEmail === PROFILE.email ? (
                    <>
                      <Check className="h-2.5 w-2.5 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400">
                        Copied to clipboard!
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-2.5 w-2.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </li>
              <li className="flex items-center justify-between gap-2">
                <a
                  href={`mailto:${PROFILE.secondaryEmail}`}
                  className="hover:text-[#090A0B] dark:hover:text-[#F7F8F8] truncate"
                >
                  {PROFILE.secondaryEmail}
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy(PROFILE.secondaryEmail)}
                  className="tactile-control shrink-0 inline-flex items-center gap-1 rounded border border-zinc-200 dark:border-white/[0.1] bg-zinc-50 dark:bg-[#141517] px-2 py-0.5 text-[10px]"
                >
                  {copiedEmail === PROFILE.secondaryEmail ? (
                    <>
                      <Check className="h-2.5 w-2.5 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400">
                        Copied!
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-2.5 w-2.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </li>
              <li>
                <a
                  href={`tel:${PROFILE.phoneRaw}`}
                  className="hover:text-[#090A0B] dark:hover:text-[#F7F8F8]"
                >
                  {PROFILE.phone}
                </a>
              </li>
              <li className="text-zinc-500 dark:text-[#555962]">
                {PROFILE.location} · {PROFILE.timezone}
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-zinc-500 dark:text-[#555962]">
          <p>
            © {new Date().getFullYear()} {PROFILE.fullName}. Engineered in
            Kathmandu, Nepal.
          </p>
          <p className="inline-flex items-center gap-1.5">
            <span>Next.js 15 · TypeScript · Tailwind CSS</span>
            <span>·</span>
            <a
              href={PROFILE.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#090A0B] dark:text-[#F7F8F8] hover:underline"
            >
              <span>github.com/prashantsingh55</span>
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
