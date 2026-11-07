"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Github,
  Search,
  CheckCircle2,
  ArrowUpRight,
  Layers,
  Filter,
  LayoutGrid,
  List,
} from "lucide-react";
import {
  projects,
  PROJECT_CATEGORIES,
  filterProjects,
} from "@/contents/projects";
import { Project, ProjectCategory } from "@/types";
import LightDismissDialog from "@/app/components/LightDismissDialog";

interface ProjectsSectionProps {
  featuredOnly?: boolean;
  showHeader?: boolean;
  defaultViewMode?: "grid" | "ledger";
}

export default function ProjectsSection({
  featuredOnly = false,
  showHeader = true,
  defaultViewMode = "grid",
}: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<ProjectCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [showAllOnHome, setShowAllOnHome] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "ledger">(defaultViewMode);

  const filtered = useMemo(() => {
    const list = filterProjects(projects, selectedCategory, searchQuery);
    if (
      featuredOnly &&
      !showAllOnHome &&
      selectedCategory === "all" &&
      !searchQuery.trim()
    ) {
      return list.filter((p) => p.featured);
    }
    return list;
  }, [selectedCategory, searchQuery, featuredOnly, showAllOnHome]);

  return (
    <section
      id="projects"
      className="py-16 md:py-24 border-b border-zinc-200/80 dark:border-white/[0.08]"
    >
      <div className="container-max">
        {showHeader && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            suppressHydrationWarning
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8"
          >
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-zinc-500 dark:text-[#8A8F98]">
                <span className="text-[#090A0B] dark:text-[#F7F8F8] font-semibold">
                  02 / FLAGSHIP SYSTEMS
                </span>
                <span>—</span>
                <span>PRODUCTION DEPLOYMENTS &amp; OPEN SOURCE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.025em] text-[#090A0B] dark:text-[#F7F8F8]">
                Engineered Platforms &amp; Architecture Specifications
              </h2>
              <p className="text-sm text-zinc-600 dark:text-[#8A8F98] leading-relaxed">
                From archival photography marketplaces, national event portals,
                and bilingual AI academies in Kathmandu to Flutter AR sensor
                fusion and Solidity smart contracts.
              </p>
            </div>

            {featuredOnly && (
              <Link
                href="/projects"
                className="tactile-control inline-flex items-center gap-1.5 self-start md:self-auto rounded-lg border border-zinc-200 dark:border-white/[0.1] bg-white dark:bg-[#141517] px-3.5 py-2 font-mono text-xs text-[#090A0B] dark:text-[#F7F8F8] hover:border-zinc-400 dark:hover:border-white/25"
              >
                <span>FULL DIRECTORY ({projects.length})</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </motion.div>
        )}

        {/* Control Bar: Shared-Layout Category Tabs + View Switcher + Search */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 mb-8 rounded-xl border border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF7F2] dark:bg-[#0A142F] p-2.5">
          {/* Category Exclusion Tabs */}
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="flex flex-wrap items-center gap-1"
          >
            {PROJECT_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const count =
                cat.id === "all"
                  ? projects.length
                  : projects.filter((p) => p.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    if (cat.id !== "all") {
                      setShowAllOnHome(true);
                    }
                  }}
                  className={`tactile-control relative inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                    isSelected
                      ? "text-[#0A1226] dark:text-[#FAF6EE]"
                      : "text-zinc-500 dark:text-[#9FB3D9] hover:text-[#0A1226] dark:hover:text-[#FAF6EE]"
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="projects-category-pill"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                      suppressHydrationWarning
                      className="absolute inset-0 rounded-lg bg-white dark:bg-[#12234D] border border-[#E8DEC8] dark:border-[#2A4785] shadow-sm"
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                  <span className="relative z-10 font-mono text-[10px] text-zinc-400 dark:text-[#5B73A8] tabular-nums">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search & View Toggle */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 min-w-[180px] sm:min-w-[250px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by stack, domain, or title..."
                aria-label="Search projects"
                className="w-full rounded-lg border border-[#E8DEC8] dark:border-[#1E325C] bg-white dark:bg-[#070D1E] pl-8 pr-3 py-1.5 text-xs text-[#0A1226] dark:text-[#FAF6EE] placeholder:text-zinc-400 dark:placeholder:text-[#9FB3D9]/60 focus:border-red-500 focus:outline-none"
              />
            </div>

            <div
              role="group"
              aria-label="Project layout view"
              className="flex shrink-0 items-center rounded-lg border border-[#E8DEC8] dark:border-[#1E325C] bg-[#F2ECE1] dark:bg-[#070D1E] p-0.5"
            >
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
                aria-pressed={viewMode === "grid"}
                className={`tactile-control rounded-md p-1.5 ${
                  viewMode === "grid"
                    ? "bg-white dark:bg-[#12234D] text-[#0A1226] dark:text-[#FAF6EE] shadow-sm"
                    : "text-zinc-400 dark:text-[#5B73A8]"
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("ledger")}
                aria-label="Index ledger view"
                aria-pressed={viewMode === "ledger"}
                className={`tactile-control rounded-md p-1.5 ${
                  viewMode === "ledger"
                    ? "bg-white dark:bg-[#12234D] text-[#0A1226] dark:text-[#FAF6EE] shadow-sm"
                    : "text-zinc-400 dark:text-[#5B73A8]"
                }`}
              >
                <List className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-300 dark:border-white/[0.1] p-12 text-center space-y-3">
            <Filter className="h-6 w-6 text-zinc-400 mx-auto" />
            <h3 className="text-sm font-semibold text-[#090A0B] dark:text-[#F7F8F8]">
              No matching systems found
            </h3>
            <p className="text-xs text-zinc-500 dark:text-[#8A8F98] max-w-md mx-auto">
              No projects matched &ldquo;{searchQuery}&rdquo; in this category.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="tactile-control inline-flex items-center gap-1.5 rounded-lg bg-[#090A0B] dark:bg-[#F7F8F8] px-3.5 py-1.5 text-xs font-medium text-white dark:text-[#08090A]"
            >
              Reset Filter
            </button>
          </div>
        ) : viewMode === "ledger" ? (
          /* MANDATORY (responsive-table): Semantic container-query responsive table with sticky headers & mobile stacked labels */
          <div
            tabIndex={0}
            role="region"
            aria-labelledby="projects-ledger-caption"
            className="ledger-table-wrapper rounded-xl border border-zinc-200/90 dark:border-white/[0.08] bg-white dark:bg-[#0E1012]"
          >
            <table className="ledger-table text-left">
              <caption id="projects-ledger-caption" className="sr-only">
                Engineered Platforms and Production Systems Index Ledger
              </caption>
              <thead className="bg-zinc-50 dark:bg-[#141517] font-mono text-[10px] uppercase tracking-wider text-zinc-500 dark:text-[#8A8F98]">
                <tr>
                  <th
                    scope="col"
                    className="border-b border-zinc-200/80 dark:border-white/[0.08] px-4 py-3 font-semibold"
                  >
                    System
                  </th>
                  <th
                    scope="col"
                    className="border-b border-zinc-200/80 dark:border-white/[0.08] px-4 py-3 font-semibold"
                  >
                    Year
                  </th>
                  <th
                    scope="col"
                    className="border-b border-zinc-200/80 dark:border-white/[0.08] px-4 py-3 font-semibold"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="border-b border-zinc-200/80 dark:border-white/[0.08] px-4 py-3 font-semibold"
                  >
                    Stack
                  </th>
                  <th
                    scope="col"
                    className="border-b border-zinc-200/80 dark:border-white/[0.08] px-4 py-3 text-right font-semibold"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200/70 dark:divide-white/[0.06]">
                {filtered.map((project, index) => (
                  <tr
                    key={project.id}
                    className="hover:bg-zinc-50/80 dark:hover:bg-[#141517] transition-colors"
                  >
                    <th
                      scope="row"
                      className="bg-white dark:bg-[#0E1012] px-4 py-3.5 align-middle font-normal"
                    >
                      <div className="flex items-start gap-3">
                        <span className="font-mono text-xs text-zinc-400 dark:text-[#555962] tabular-nums shrink-0 mt-0.5">
                          SYS-{String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-[#090A0B] dark:text-[#F7F8F8]">
                            {project.title}
                          </div>
                          <div className="text-xs text-zinc-500 dark:text-[#8A8F98] mt-0.5">
                            {project.subtitle}
                          </div>
                        </div>
                      </div>
                    </th>
                    <td className="px-4 py-3 align-middle font-mono text-xs text-zinc-600 dark:text-[#8A8F98] tabular-nums">
                      {project.year}
                    </td>
                    <td className="px-4 py-3 align-middle">
                      <span className="inline-flex items-center gap-1.5 rounded border border-zinc-200 dark:border-white/[0.08] px-2 py-0.5 font-mono text-[10px] text-zinc-600 dark:text-[#8A8F98]">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            project.status === "Live Production"
                              ? "bg-emerald-500"
                              : "bg-zinc-400"
                          }`}
                        />
                        {project.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 align-middle">
                      <div className="inline-flex flex-wrap gap-1">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="rounded border border-zinc-200 dark:border-white/[0.08] bg-zinc-50 dark:bg-[#141517] px-2 py-0.5 font-mono text-[10px] text-zinc-600 dark:text-[#8A8F98]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 align-middle lg:text-right">
                      <div className="inline-flex flex-wrap items-center gap-2.5 font-mono text-xs">
                        {project.demoLink && (
                          <a
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[#090A0B] dark:text-[#F7F8F8] hover:underline"
                          >
                            <span>Live</span>
                            <ArrowUpRight className="h-3 w-3" />
                          </a>
                        )}
                        {project.secondaryDemoLink && (
                          <a
                            href={project.secondaryDemoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:underline"
                          >
                            <span>{project.secondaryDemoLabel ?? "Mirror"}</span>
                            <ArrowUpRight className="h-3 w-3" />
                          </a>
                        )}
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-zinc-500 dark:text-[#8A8F98] hover:text-[#090A0B] dark:hover:text-white"
                        >
                          <Github className="h-3.5 w-3.5" />
                          <span>Repo</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => setActiveProject(project)}
                          className="tactile-control rounded-md border border-zinc-200 dark:border-white/[0.1] bg-zinc-100 dark:bg-[#1A1B1E] px-2.5 py-1 text-[11px] text-[#090A0B] dark:text-[#F7F8F8]"
                        >
                          Spec
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* High-Craft Architectural Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((project, index) => {
              const isLcpCandidate = !featuredOnly && index === 0;
              return (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.45, delay: (index % 3) * 0.08 }}
                  whileHover={{ y: -4 }}
                  suppressHydrationWarning
                  className="group flex flex-col rounded-xl border border-[#E8DEC8] dark:border-[#1E325C] bg-white dark:bg-[#0A142F] hover:border-red-500/40 dark:hover:border-red-500/40 hover:shadow-lg transition-all overflow-hidden"
                >
                  {/* Top Specification Header Strip */}
                  <div className="flex items-center justify-between gap-2 px-4 py-2.5 border-b border-[#E8DEC8] dark:border-[#1E325C]/80 bg-[#F2ECE1]/60 dark:bg-[#0E1E45]/80 font-mono text-[10px]">
                    <div className="flex items-center gap-2 text-zinc-500 dark:text-[#9FB3D9]">
                      <span className="text-[#0A1226] dark:text-[#FAF6EE] font-semibold tabular-nums">
                        SYS-{String(index + 1).padStart(2, "0")}
                      </span>
                      <span>·</span>
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            project.status === "Live Production"
                              ? "bg-red-500"
                              : "bg-zinc-400 dark:bg-zinc-500"
                          }`}
                        />
                        {project.status}
                      </span>
                    </div>
                    <span className="text-zinc-400 dark:text-[#5B73A8] tabular-nums">
                      {project.year}
                    </span>
                  </div>

                  {/* Preview Frame */}
                  <div className="relative h-44 w-full overflow-hidden bg-zinc-100 dark:bg-[#070D1E] border-b border-[#E8DEC8] dark:border-[#1E325C]/80">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      priority={isLcpCandidate}
                      fetchPriority={isLcpCandidate ? "high" : undefined}
                      loading={isLcpCandidate ? undefined : "lazy"}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover opacity-95 preview-zoom-target"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070D1E]/80 via-transparent to-transparent" />

                    {project.metrics && (
                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
                        <span className="rounded border border-white/15 bg-[#070D1E]/90 backdrop-blur-sm px-2 py-0.5 font-mono text-[10px] text-[#FAF6EE]">
                          {project.metrics}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-1 flex-col p-5 space-y-4">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-wider text-red-600 dark:text-red-400 font-semibold">
                        {project.subtitle}
                      </p>
                      <h3 className="text-base font-semibold tracking-tight text-[#0A1226] dark:text-[#FAF6EE] mt-1">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-zinc-600 dark:text-[#9FB3D9] mt-2 line-clamp-3 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Monospace Stack Tokens */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded border border-[#E8DEC8] dark:border-[#1E325C] bg-[#F2ECE1]/60 dark:bg-[#070D1E] px-2 py-0.5 font-mono text-[10px] text-[#1E3A8A] dark:text-[#9FB3D9]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-auto pt-3.5 border-t border-[#E8DEC8] dark:border-[#1E325C] flex items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-3 font-mono text-[11px]">
                        {project.demoLink && (
                          <a
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-semibold text-[#0A1226] dark:text-[#FAF6EE] hover:text-red-600 dark:hover:text-red-400 hover:underline"
                          >
                            <ExternalLink className="h-3 w-3" />
                            <span>Live App</span>
                          </a>
                        )}
                        {project.secondaryDemoLink && (
                          <a
                            href={project.secondaryDemoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            <ExternalLink className="h-3 w-3" />
                            <span>
                              {project.secondaryDemoLabel ?? "Mirror App"}
                            </span>
                          </a>
                        )}
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-zinc-500 dark:text-[#9FB3D9] hover:text-[#0A1226] dark:hover:text-white"
                        >
                          <Github className="h-3 w-3" />
                          <span>Source</span>
                        </a>
                      </div>

                      <button
                        type="button"
                        onClick={() => setActiveProject(project)}
                        className="tactile-control inline-flex items-center gap-1 rounded-md border border-[#E8DEC8] dark:border-[#1E325C] bg-[#F2ECE1] dark:bg-[#12234D] hover:border-red-400 px-2.5 py-1 font-mono text-[11px] font-medium text-[#0A1226] dark:text-[#FAF6EE]"
                      >
                        <Layers className="h-3 w-3" />
                        <span>Spec</span>
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}

        {/* Toggle between Featured and All on Homepage */}
        {featuredOnly &&
          selectedCategory === "all" &&
          !searchQuery.trim() && (
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => setShowAllOnHome((prev) => !prev)}
                className="tactile-control inline-flex items-center gap-2 rounded-lg border border-[#E8DEC8] dark:border-[#1E325C] bg-white dark:bg-[#0A142F] hover:border-red-400 px-5 py-2.5 font-mono text-xs font-medium text-[#0A1226] dark:text-[#FAF6EE]"
              >
                <span>
                  {showAllOnHome
                    ? "SHOW FEATURED SYSTEMS ONLY"
                    : `EXPAND ALL ${projects.length} SYSTEMS (WEB3, MOBILE AR & OPEN SOURCE)`}
                </span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
      </div>

      {/* Native <dialog closedby="any"> Case Study Modal */}
      <LightDismissDialog
        isOpen={activeProject !== null}
        onClose={() => setActiveProject(null)}
        title={activeProject?.title ?? "System Specification"}
        subtitle={activeProject?.subtitle}
      >
        {activeProject && (
          <div className="space-y-6">
            <div className="relative h-56 sm:h-64 w-full rounded-xl overflow-hidden border border-[#E8DEC8] dark:border-[#1E325C] bg-zinc-100 dark:bg-[#070D1E]">
              <Image
                src={activeProject.image}
                alt={activeProject.title}
                fill
                fetchPriority="low"
                sizes="(max-width: 768px) 100vw, 700px"
                className="object-cover"
              />
              <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
                <span className="rounded border border-red-500/30 bg-[#070D1E]/90 px-2.5 py-1 font-mono text-xs text-red-400 font-medium">
                  {activeProject.status}
                </span>
                {activeProject.metrics && (
                  <span className="rounded border border-white/20 bg-[#070D1E]/90 px-2.5 py-1 font-mono text-xs text-[#FAF6EE]">
                    {activeProject.metrics}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#1E3A8A] dark:text-[#9FB3D9]">
                01 / Architectural Overview
              </h3>
              <p className="text-sm text-zinc-700 dark:text-[#FAF6EE]/90 leading-relaxed">
                {activeProject.longDescription}
              </p>
            </div>

            <div className="space-y-2.5">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#1E3A8A] dark:text-[#9FB3D9]">
                02 / Key Engineering Highlights
              </h3>
              <ul className="space-y-2">
                {activeProject.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-600 dark:text-[#9FB3D9]"
                  >
                    <CheckCircle2 className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#1E3A8A] dark:text-[#9FB3D9]">
                03 / Stack &amp; Primitives
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {activeProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded border border-[#E8DEC8] dark:border-[#1E325C] bg-[#F2ECE1]/60 dark:bg-[#070D1E] px-2.5 py-1 font-mono text-xs text-[#0A1226] dark:text-[#FAF6EE]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8DEC8] dark:border-[#1E325C] flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2.5">
                {activeProject.demoLink && (
                  <a
                    href={activeProject.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tactile-control inline-flex items-center gap-2 rounded-lg bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-xs font-semibold shadow-sm"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>Launch Live Production App</span>
                  </a>
                )}
                {activeProject.secondaryDemoLink && (
                  <a
                    href={activeProject.secondaryDemoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tactile-control inline-flex items-center gap-2 rounded-lg border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-xs font-medium text-blue-700 dark:text-blue-300"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>
                      {activeProject.secondaryDemoLabel ?? "Secondary Live App"}
                    </span>
                  </a>
                )}
                <a
                  href={activeProject.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tactile-control inline-flex items-center gap-2 rounded-lg border border-[#E8DEC8] dark:border-[#1E325C] bg-white dark:bg-[#0A142F] px-4 py-2 text-xs font-medium text-[#0A1226] dark:text-[#FAF6EE]"
                >
                  <Github className="h-3.5 w-3.5" />
                  <span>Inspect Repository</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </LightDismissDialog>
    </section>
  );
}
