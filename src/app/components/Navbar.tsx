"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sun,
  Moon,
  Menu,
  X,
  Github,
  Linkedin,
  ArrowUpRight,
  Command,
  Copy,
  Check,
  Search,
  ExternalLink,
  Layers,
  FlaskConical,
  User,
  FileText,
  Mail,
} from "lucide-react";
import { useTheme } from "@/app/context/ThemeContext";
import { PROFILE } from "@/contents/profile";
import LightDismissDialog from "@/app/components/LightDismissDialog";

export const NAV_ITEMS = [
  { href: "/", label: "Index", code: "01" },
  { href: "/projects", label: "Projects", code: "02" },
  { href: "/about", label: "About", code: "03" },
  { href: "/blogs", label: "Notes", code: "04" },
  { href: "/contact", label: "Contact", code: "05" },
] as const;

export function computeNextCommandIndex(
  currentIndex: number,
  total: number,
  key: "ArrowDown" | "ArrowUp"
): number {
  if (total <= 0) return 0;
  const safeCurrent =
    Number.isFinite(currentIndex) && currentIndex >= 0 && currentIndex < total
      ? Math.floor(currentIndex)
      : 0;
  if (key === "ArrowDown") {
    return (safeCurrent + 1) % total;
  }
  return (safeCurrent - 1 + total) % total;
}

export function formatKathmanduTime(date: Date): string {
  try {
    if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
      return "NPT +05:45";
    }
    return new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kathmandu",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(date);
  } catch {
    return "NPT +05:45";
  }
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState("");
  const [activeCommandIndex, setActiveCommandIndex] = useState(0);
  const [katTime, setKatTime] = useState<string>("NPT UTC+05:45");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const copyTimerRef = useRef<number | null>(null);
  const commandInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const updateClock = () => {
      setKatTime(`${formatKathmanduTime(new Date())} NPT`);
    };
    updateClock();
    const timer = window.setInterval(updateClock, 1000);
    return () => {
      window.clearInterval(timer);
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen((prev) => {
          const next = !prev;
          if (next) {
            setActiveCommandIndex(0);
          } else {
            setCommandQuery("");
          }
          return next;
        });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (commandOpen) {
      setActiveCommandIndex(0);
      const id = window.requestAnimationFrame(() => {
        commandInputRef.current?.focus();
      });
      return () => window.cancelAnimationFrame(id);
    }
  }, [commandOpen]);

  const handleCopyEmail = async (emailToCopy: string = PROFILE.email) => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(emailToCopy);
      }
      setCopiedEmail(true);
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
      copyTimerRef.current = window.setTimeout(() => {
        setCopiedEmail(false);
        copyTimerRef.current = null;
      }, 2000);
    } catch {
      setCopiedEmail(false);
    }
  };

  const commandActions = useMemo(
    () => [
      {
        id: "nav-home",
        group: "Navigation",
        label: "Go to Index / Overview",
        hint: "01",
        icon: Layers,
        action: () => {
          setCommandOpen(false);
          router.push("/");
        },
      },
      {
        id: "nav-projects",
        group: "Navigation",
        label: "Browse All Production Projects & Repos",
        hint: "02",
        icon: Layers,
        action: () => {
          setCommandOpen(false);
          router.push("/projects");
        },
      },
      {
        id: "nav-about",
        group: "Navigation",
        label: "Inspect Experience, MBA/CSIT & Credentials",
        hint: "03",
        icon: User,
        action: () => {
          setCommandOpen(false);
          router.push("/about");
        },
      },
      {
        id: "nav-blogs",
        group: "Navigation",
        label: "Read Engineering Notes & Articles",
        hint: "04",
        icon: FileText,
        action: () => {
          setCommandOpen(false);
          router.push("/blogs");
        },
      },
      {
        id: "nav-contact",
        group: "Navigation",
        label: "Get in Touch / Contact Coordinates",
        hint: "05",
        icon: Mail,
        action: () => {
          setCommandOpen(false);
          router.push("/contact");
        },
      },
      {
        id: "copy-primary-email",
        group: "Direct Action",
        label: `Copy Primary Email (${PROFILE.email})`,
        hint: "Copy",
        icon: Mail,
        action: () => {
          handleCopyEmail(PROFILE.email);
          setCommandOpen(false);
        },
      },
      {
        id: "toggle-theme",
        group: "Direct Action",
        label: "Toggle Color Scheme (Light / Dark)",
        hint: "Theme",
        icon: Sun,
        action: () => {
          toggleTheme();
          setCommandOpen(false);
        },
      },
      {
        id: "live-chitrabazaar",
        group: "Live Production Deployments",
        label: "Launch Chitrabazaar — Photo & Print Marketplace",
        hint: "chitrabazaar.vercel.app",
        icon: ExternalLink,
        action: () => {
          setCommandOpen(false);
          window.open("https://chitrabazaar.vercel.app", "_blank", "noopener,noreferrer");
        },
      },
      {
        id: "live-kalash",
        group: "Live Production Deployments",
        label: "Launch Kalash Events Pvt. Ltd. Portal",
        hint: "kalash-events.vercel.app",
        icon: ExternalLink,
        action: () => {
          setCommandOpen(false);
          window.open("https://kalash-events.vercel.app", "_blank", "noopener,noreferrer");
        },
      },
      {
        id: "live-byom",
        group: "Live Production Deployments",
        label: "Launch BeYourOwnMarketer — BYOM Academy (Bilingual AI Platform)",
        hint: "beyourownmarketeracademy.com",
        icon: ExternalLink,
        action: () => {
          setCommandOpen(false);
          window.open("https://beyourownmarketeracademy.com/", "_blank", "noopener,noreferrer");
        },
      },
      {
        id: "ext-github",
        group: "Verified Profiles",
        label: "Open GitHub (@prashantsingh55 — 26+ Repositories)",
        hint: "github.com",
        icon: Github,
        action: () => {
          setCommandOpen(false);
          window.open(PROFILE.socials.github, "_blank", "noopener,noreferrer");
        },
      },
      {
        id: "ext-linkedin",
        group: "Verified Profiles",
        label: "Open LinkedIn Profile (Prashant Bikram Singh)",
        hint: "linkedin.com",
        icon: Linkedin,
        action: () => {
          setCommandOpen(false);
          window.open(PROFILE.socials.linkedin, "_blank", "noopener,noreferrer");
        },
      },
    ],
    [router, toggleTheme]
  );

  const filteredCommands = useMemo(() => {
    const q = commandQuery.trim().toLowerCase();
    if (!q) return commandActions;
    return commandActions.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q) ||
        item.hint.toLowerCase().includes(q)
    );
  }, [commandActions, commandQuery]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 dark:border-white/[0.08] bg-[#FAFAFA]/85 dark:bg-[#08090A]/85 backdrop-blur-md">
      {/* Top Utilitarian Telemetry Strip */}
      <div className="border-b border-zinc-200/60 dark:border-white/[0.05] bg-zinc-100/60 dark:bg-[#0E1012]/90">
        <div className="container-max flex h-8 items-center justify-between gap-4 text-[11px] font-mono text-zinc-500 dark:text-[#8A8F98]">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="truncate text-zinc-700 dark:text-[#F7F8F8] font-medium">
              AVAILABLE FOR ENGINEERING &amp; PRODUCT LEADERSHIP
            </span>
            <span className="hidden md:inline text-zinc-300 dark:text-white/15">
              /
            </span>
            <span className="hidden md:inline truncate">
              Kathmandu, Nepal
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => handleCopyEmail(PROFILE.email)}
              className="tactile-control hidden sm:inline-flex items-center gap-1.5 rounded px-1.5 py-0.5 text-[11px] font-mono text-zinc-600 dark:text-[#8A8F98] hover:text-zinc-950 dark:hover:text-[#F7F8F8] hover:bg-zinc-200/60 dark:hover:bg-white/[0.06]"
              title="Click to copy primary email"
            >
              {copiedEmail ? (
                <>
                  <Check className="h-3 w-3 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">
                    COPIED TO CLIPBOARD
                  </span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3 opacity-70" />
                  <span>{PROFILE.email}</span>
                </>
              )}
            </button>
            <span className="hidden sm:inline text-zinc-300 dark:text-white/15">
              |
            </span>
            <span className="tabular-nums text-zinc-700 dark:text-[#F7F8F8]">
              {katTime}
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="container-max flex h-14 items-center justify-between gap-4">
        {/* Monogram & Identity */}
        <Link
          href="/"
          className="tactile-control group flex items-center gap-3 focus:outline-none"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-300 dark:border-white/[0.12] bg-zinc-900 dark:bg-[#141517] font-mono text-xs font-semibold tracking-tighter text-white dark:text-[#F7F8F8] group-hover:border-zinc-500 dark:group-hover:border-white/30 transition-colors">
            PS
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-[#090A0B] dark:text-[#F7F8F8] leading-none">
              {PROFILE.fullName}
            </span>
            <span className="font-mono text-[10px] text-zinc-500 dark:text-[#8A8F98] mt-1 leading-none">
              DESIGN ENGINEER · BA · FULL-STACK
            </span>
          </div>
        </Link>

        {/* Desktop Architectural Nav */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-0.5 rounded-lg border border-zinc-200/90 dark:border-white/[0.08] bg-zinc-100/80 dark:bg-[#0E1012] p-1"
        >
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : !item.href.includes("#") && pathname?.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`tactile-control inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-white dark:bg-[#1A1B1E] text-[#090A0B] dark:text-[#F7F8F8] shadow-sm border border-zinc-200/70 dark:border-white/[0.08]"
                    : "text-zinc-600 dark:text-[#8A8F98] hover:text-[#090A0B] dark:hover:text-[#F7F8F8]"
                }`}
              >
                <span className="font-mono text-[10px] text-zinc-400 dark:text-[#555962]">
                  {item.code}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Tactile Actions & Command Trigger */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setCommandOpen(true)}
            aria-label="Open command menu"
            className="tactile-control inline-flex h-8 items-center gap-2 rounded-lg border border-zinc-200 dark:border-white/[0.1] bg-white dark:bg-[#141517] px-2.5 text-xs font-medium text-zinc-600 dark:text-[#8A8F98] hover:border-zinc-400 dark:hover:border-white/25 hover:text-zinc-950 dark:hover:text-[#F7F8F8]"
          >
            <Command className="h-3.5 w-3.5" />
            <span className="hidden sm:inline text-[11px]">Command</span>
            <kbd className="keycap">⌘K</kbd>
          </button>

          <a
            href={PROFILE.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="tactile-control hidden sm:inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 dark:border-white/[0.1] bg-white dark:bg-[#141517] text-zinc-600 dark:text-[#8A8F98] hover:text-zinc-950 dark:hover:text-[#F7F8F8] hover:border-zinc-400 dark:hover:border-white/25"
          >
            <Github className="h-3.5 w-3.5" />
          </a>

          <a
            href={PROFILE.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="tactile-control hidden sm:inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 dark:border-white/[0.1] bg-white dark:bg-[#141517] text-zinc-600 dark:text-[#8A8F98] hover:text-zinc-950 dark:hover:text-[#F7F8F8] hover:border-zinc-400 dark:hover:border-white/25"
          >
            <Linkedin className="h-3.5 w-3.5" />
          </a>

          {/* MANDATORY (dark-mode-toggle & selector-atrule-combinations):
              Include both states in the markup (icon + sr-only action text) and hide the inactive one via CSS
              so display: none removes the redundant option from the Accessibility Tree without depending on JS. */}
          <button
            type="button"
            onClick={toggleTheme}
            className="tactile-control inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 dark:border-white/[0.1] bg-white dark:bg-[#141517] text-zinc-600 dark:text-[#8A8F98] hover:text-zinc-950 dark:hover:text-[#F7F8F8] hover:border-zinc-400 dark:hover:border-white/25"
          >
            <span className="if-dark inline-flex items-center justify-center">
              <Sun className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="sr-only">Switch to light theme</span>
            </span>
            <span className="if-light inline-flex items-center justify-center">
              <Moon className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="sr-only">Switch to dark theme</span>
            </span>
          </button>

          <Link
            href="/contact"
            className="tactile-control hidden xl:inline-flex h-8 items-center gap-1.5 rounded-lg bg-[#090A0B] dark:bg-[#F7F8F8] px-3 text-xs font-medium text-white dark:text-[#08090A] hover:opacity-90"
          >
            <span>Collaborate</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            className="tactile-control inline-flex lg:hidden h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 dark:border-white/[0.1] bg-white dark:bg-[#141517] text-zinc-700 dark:text-[#F7F8F8]"
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-200 dark:border-white/[0.08] bg-[#FAFAFA] dark:bg-[#08090A] px-4 py-4 space-y-3">
          <nav className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : !item.href.includes("#") && pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-zinc-200/70 dark:bg-[#141517] text-[#090A0B] dark:text-[#F7F8F8]"
                      : "text-zinc-600 dark:text-[#8A8F98] hover:bg-zinc-100 dark:hover:bg-[#0E1012]"
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="font-mono text-[10px] text-zinc-400 dark:text-[#555962]">
                    {item.code}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center justify-between pt-3 border-t border-zinc-200 dark:border-white/[0.08]">
            <div className="flex items-center gap-2">
              <a
                href={PROFILE.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 dark:border-white/[0.1] px-2.5 py-1.5 text-xs font-mono text-zinc-700 dark:text-[#8A8F98]"
              >
                <Github className="h-3.5 w-3.5" />
                <span>GitHub</span>
              </a>
              <a
                href={PROFILE.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 dark:border-white/[0.1] px-2.5 py-1.5 text-xs font-mono text-zinc-700 dark:text-[#8A8F98]"
              >
                <Linkedin className="h-3.5 w-3.5" />
                <span>LinkedIn</span>
              </a>
            </div>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center gap-1 rounded-lg bg-[#090A0B] dark:bg-[#F7F8F8] px-3 py-1.5 text-xs font-medium text-white dark:text-[#08090A]"
            >
              <span>Collaborate</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* Command Palette Modal */}
      <LightDismissDialog
        isOpen={commandOpen}
        onClose={() => {
          setCommandOpen(false);
          setCommandQuery("");
          setActiveCommandIndex(0);
        }}
        title="Command Palette"
        subtitle="Navigate sections, launch production systems, or copy contact coordinates"
      >
        <div className="space-y-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              ref={commandInputRef}
              type="search"
              value={commandQuery}
              onChange={(e) => {
                setCommandQuery(e.target.value);
                setActiveCommandIndex(0);
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                  e.preventDefault();
                  setActiveCommandIndex((prev) =>
                    computeNextCommandIndex(
                      prev,
                      filteredCommands.length,
                      e.key as "ArrowDown" | "ArrowUp"
                    )
                  );
                } else if (e.key === "Enter" && filteredCommands.length > 0) {
                  e.preventDefault();
                  const targetCmd =
                    filteredCommands[activeCommandIndex] ?? filteredCommands[0];
                  targetCmd?.action();
                }
              }}
              placeholder="Type a command, system name, or route..."
              aria-label="Filter commands"
              className="w-full rounded-xl border border-zinc-200 dark:border-white/[0.1] bg-zinc-50 dark:bg-[#141517] pl-10 pr-4 py-2.5 text-sm text-[#090A0B] dark:text-[#F7F8F8] placeholder:text-zinc-400 dark:placeholder:text-[#555962] focus:border-zinc-400 dark:focus:border-white/30 focus:outline-none"
            />
          </div>

          <div
            role="listbox"
            aria-label="Command actions"
            className="space-y-1 max-h-80 overflow-y-auto"
          >
            {filteredCommands.length === 0 ? (
              <div className="rounded-lg border border-dashed border-zinc-200 dark:border-white/[0.08] py-8 px-4 text-center font-mono text-xs text-zinc-500 dark:text-[#8A8F98]">
                No matching commands or systems for &ldquo;{commandQuery}&rdquo;
              </div>
            ) : (
              filteredCommands.map((cmd, idx) => {
                const Icon = cmd.icon;
                const isSelected = idx === activeCommandIndex;
                return (
                  <button
                    key={cmd.id}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onMouseEnter={() => setActiveCommandIndex(idx)}
                    onClick={cmd.action}
                    className={`tactile-control w-full flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-xs transition-colors group ${
                      isSelected
                        ? "bg-zinc-100 dark:bg-[#141517] border border-zinc-200/80 dark:border-white/[0.1]"
                        : "border border-transparent hover:bg-zinc-100 dark:hover:bg-[#141517]"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon className="h-4 w-4 text-zinc-400 dark:text-[#8A8F98] group-hover:text-[#090A0B] dark:group-hover:text-[#F7F8F8] shrink-0" />
                      <div className="truncate">
                        <span className="font-medium text-[#090A0B] dark:text-[#F7F8F8]">
                          {cmd.label}
                        </span>
                        <span className="ml-2 font-mono text-[10px] text-zinc-400 dark:text-[#555962]">
                          {cmd.group}
                        </span>
                      </div>
                    </div>
                    <span className="keycap shrink-0">{cmd.hint}</span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      </LightDismissDialog>
    </header>
  );
}
