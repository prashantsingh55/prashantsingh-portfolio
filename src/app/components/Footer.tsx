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
    <footer className="border-t border-[#E8DEC8] dark:border-[#1E325C]/80 bg-[#FAF7F2] dark:bg-[#070D1E] py-12">
      <div className="container-max">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#E8DEC8] dark:border-[#1E325C]/60">
          {/* Brand & Craft Signature */}
          <div className="md:col-span-5 space-y-3">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-md border border-[#E8DEC8] dark:border-[#1E325C] bg-[#0E1E45] font-mono text-[11px] font-semibold text-[#FAF6EE]">
                PS
              </span>
              <span className="text-sm font-semibold tracking-tight text-[#0A1226] dark:text-[#FAF6EE]">
                {PROFILE.fullName}
              </span>
            </Link>
            <p className="text-xs text-zinc-600 dark:text-[#9FB3D9] max-w-sm leading-relaxed">
              {PROFILE.tagline}. Managing \$10k+ Meta &amp; Google Ads pipelines,
              mentoring 1,000+ individuals, optimizing technical SEO, and building
              modern Next.js platforms from {PROFILE.location}.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <a
                href={PROFILE.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="tactile-control inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#E8DEC8] dark:border-[#1E325C] bg-white dark:bg-[#0A142F] text-zinc-600 dark:text-[#9FB3D9] hover:text-[#0A1226] dark:hover:text-white hover:border-red-400"
              >
                <Github className="h-3.5 w-3.5" />
              </a>
              <a
                href={PROFILE.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="tactile-control inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#E8DEC8] dark:border-[#1E325C] bg-white dark:bg-[#0A142F] text-zinc-600 dark:text-[#9FB3D9] hover:text-[#0A1226] dark:hover:text-white hover:border-red-400"
              >
                <Linkedin className="h-3.5 w-3.5" />
              </a>
              <a
                href={PROFILE.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter"
                className="tactile-control inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#E8DEC8] dark:border-[#1E325C] bg-white dark:bg-[#0A142F] text-zinc-600 dark:text-[#9FB3D9] hover:text-[#0A1226] dark:hover:text-white hover:border-red-400"
              >
                <FaXTwitter className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Sitemap Index */}
          <div className="md:col-span-3 space-y-2.5">
            <h3 className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#1E3A8A] dark:text-[#9FB3D9]">
              Directory
            </h3>
            <ul className="space-y-1.5 font-mono text-xs text-zinc-600 dark:text-[#9FB3D9]">
              <li>
                <Link
                  href="/"
                  className="hover:text-red-600 dark:hover:text-[#FAF6EE]"
                >
                  01 / Index Overview
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="hover:text-red-600 dark:hover:text-[#FAF6EE]"
                >
                  02 / Production Systems
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-red-600 dark:hover:text-[#FAF6EE]"
                >
                  03 / Architecture, Ads &amp; Bio
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="hover:text-red-600 dark:hover:text-[#FAF6EE]"
                >
                  04 / Engineering Notes
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-red-600 dark:hover:text-[#FAF6EE]"
                >
                  05 / Direct Transmission
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Tactile Coordinates */}
          <div className="md:col-span-4 space-y-2.5">
            <h3 className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#1E3A8A] dark:text-[#9FB3D9]">
              Direct Coordinates (Click to Copy)
            </h3>
            <ul className="space-y-2 font-mono text-xs text-zinc-600 dark:text-[#9FB3D9]">
              <li className="flex items-center justify-between gap-2">
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="hover:text-red-600 dark:hover:text-[#FAF6EE] truncate text-[#0A1226] dark:text-[#FAF6EE] font-medium"
                >
                  {PROFILE.email}
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy(PROFILE.email)}
                  className="tactile-control shrink-0 inline-flex items-center gap-1 rounded border border-[#E8DEC8] dark:border-[#1E325C] bg-[#F2ECE1] dark:bg-[#12234D] px-2 py-0.5 text-[10px] text-[#0A1226] dark:text-[#FAF6EE]"
                >
                  {copiedEmail === PROFILE.email ? (
                    <>
                      <Check className="h-2.5 w-2.5 text-red-500" />
                      <span className="text-red-600 dark:text-red-400 font-semibold">
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
                  className="hover:text-red-600 dark:hover:text-[#FAF6EE] truncate text-zinc-600 dark:text-[#9FB3D9]"
                >
                  {PROFILE.secondaryEmail}
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy(PROFILE.secondaryEmail)}
                  className="tactile-control shrink-0 inline-flex items-center gap-1 rounded border border-[#E8DEC8] dark:border-[#1E325C] bg-[#F2ECE1] dark:bg-[#12234D] px-2 py-0.5 text-[10px] text-zinc-600 dark:text-[#9FB3D9]"
                >
                  {copiedEmail === PROFILE.secondaryEmail ? (
                    <>
                      <Check className="h-2.5 w-2.5 text-red-500" />
                      <span className="text-red-600 dark:text-red-400 font-semibold">
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
                  className="hover:text-red-600 dark:hover:text-[#FAF6EE] text-[#0A1226] dark:text-[#FAF6EE] font-medium"
                >
                  {PROFILE.phone}
                </a>
              </li>
              <li className="text-zinc-500 dark:text-[#5B73A8]">
                {PROFILE.location} · {PROFILE.timezone}
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-zinc-500 dark:text-[#5B73A8]">
          <p>
            © {new Date().getFullYear()} {PROFILE.fullName}. Growth Marketer &amp; Full-Stack Engineer in
            Kathmandu, Nepal.
          </p>
          <p className="inline-flex items-center gap-1.5">
            <span>Next.js 15 · Meta/Google Ads · SEO</span>
            <span>·</span>
            <a
              href={PROFILE.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#0A1226] dark:text-[#FAF6EE] hover:text-red-500 hover:underline"
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
