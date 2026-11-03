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

  const visibleSkillGroups =
    activeSkillTab === "all"
      ? SKILL_GROUPS
      : SKILL_GROUPS.filter((g) => g.id === activeSkillTab);

  return (
    <section
      id="about"
      className="py-16 md:py-24 border-b border-zinc-200/80 dark:border-white/[0.08]"
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
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-zinc-500 dark:text-[#8A8F98]">
              <span className="text-[#090A0B] dark:text-[#F7F8F8] font-semibold">
                03 / ARCHITECTURE &amp; BIO
              </span>
              <span>—</span>
              <span>PRODUCT &amp; SYSTEMS PHILOSOPHY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.025em] text-[#090A0B] dark:text-[#F7F8F8]">
              Bridging Strategic Business Analysis with Full-Stack &amp; Mobile
              Craft
            </h2>
            <p className="font-mono text-xs text-zinc-500 dark:text-[#8A8F98]">
              {PROFILE.location} · {PROFILE.timezone}
            </p>
            <div className="flex flex-wrap gap-2.5 pt-2">
              <a
                href={PROFILE.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="tactile-control inline-flex items-center gap-2 rounded-lg border border-zinc-200 dark:border-white/[0.1] bg-white dark:bg-[#141517] px-3.5 py-2 font-mono text-xs text-[#090A0B] dark:text-[#F7F8F8] hover:border-zinc-400 dark:hover:border-white/25"
              >
                <Github className="h-3.5 w-3.5" />
                <span>26+ GitHub Repositories</span>
                <ArrowUpRight className="h-3 w-3 opacity-60" />
              </a>
              <a
                href={PROFILE.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="tactile-control inline-flex items-center gap-2 rounded-lg border border-zinc-200 dark:border-white/[0.1] bg-white dark:bg-[#141517] px-3.5 py-2 font-mono text-xs text-[#090A0B] dark:text-[#F7F8F8] hover:border-zinc-400 dark:hover:border-white/25"
              >
                <Linkedin className="h-3.5 w-3.5" />
                <span>LinkedIn Dossier</span>
                <ArrowUpRight className="h-3 w-3 opacity-60" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-3.5">
            <div className="rounded-xl border border-zinc-200/90 dark:border-white/[0.08] bg-white dark:bg-[#0E1012] p-5 sm:p-6 space-y-3 shadow-sm">
              <div className="font-mono text-[10px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">
                CORE PHILOSOPHY &amp; PROFILE
              </div>
              <p className="text-sm font-medium text-[#090A0B] dark:text-[#F7F8F8] leading-relaxed">
                {PROFILE.bio}
              </p>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-[#8A8F98] leading-relaxed border-t border-zinc-100 dark:border-white/[0.06] pt-3">
                {PROFILE.linkedinBio}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-xl border border-zinc-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0E1012] p-4">
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#090A0B] dark:text-[#F7F8F8] font-semibold">
                  01 / Full-Stack &amp; AI
                </div>
                <div className="text-xs text-zinc-500 dark:text-[#8A8F98] mt-1.5 leading-relaxed">
                  Next.js App Router, TypeScript, Prisma, PostgreSQL, FastAPI,
                  Gemini AI
                </div>
              </div>
              <div className="rounded-xl border border-zinc-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0E1012] p-4">
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#090A0B] dark:text-[#F7F8F8] font-semibold">
                  02 / Product &amp; Strategy
                </div>
                <div className="text-xs text-zinc-500 dark:text-[#8A8F98] mt-1.5 leading-relaxed">
                  IT Business Analysis, Lincoln MBA, Product Planning &amp; Agile Scrum
                </div>
              </div>
              <div className="rounded-xl border border-zinc-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0E1012] p-4">
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#090A0B] dark:text-[#F7F8F8] font-semibold">
                  03 / Mobile AR &amp; Web3
                </div>
                <div className="text-xs text-zinc-500 dark:text-[#8A8F98] mt-1.5 leading-relaxed">
                  Flutter, Riverpod, Skyline-AR sensor fusion, Solidity &amp; Smart Contracts
                </div>
              </div>
            </div>
          </div>
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
              <div className="font-mono text-[11px] uppercase tracking-wider text-zinc-400 dark:text-[#555962]">
                CAPABILITY SPECIFICATION MATRIX
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#090A0B] dark:text-[#F7F8F8] mt-1">
                Technical &amp; Strategic Stack Index
              </h3>
            </div>

            <div
              role="tablist"
              aria-label="Filter capability domains"
              className="flex flex-wrap gap-1 rounded-lg border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-[#0E1012] p-1"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeSkillTab === "all"}
                onClick={() => setActiveSkillTab("all")}
                className={`tactile-control relative rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  activeSkillTab === "all"
                    ? "text-[#090A0B] dark:text-[#F7F8F8]"
                    : "text-zinc-500 dark:text-[#8A8F98]"
                }`}
              >
                {activeSkillTab === "all" && (
                  <motion.span
                    layoutId="about-skill-tab"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    suppressHydrationWarning
                    className="absolute inset-0 rounded-md bg-zinc-100 dark:bg-[#1A1B1E] border border-zinc-200/80 dark:border-white/[0.1]"
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
                        ? "text-[#090A0B] dark:text-[#F7F8F8]"
                        : "text-zinc-500 dark:text-[#8A8F98]"
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
                        className="absolute inset-0 rounded-md bg-zinc-100 dark:bg-[#1A1B1E] border border-zinc-200/80 dark:border-white/[0.1]"
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
                className="rounded-xl border border-zinc-200/90 dark:border-white/[0.08] bg-white dark:bg-[#0E1012] overflow-hidden hover:border-zinc-300 dark:hover:border-white/20 transition-all shadow-sm"
              >
                <div className="px-5 py-3.5 border-b border-zinc-200/70 dark:border-white/[0.06] bg-zinc-50/70 dark:bg-[#141517] flex items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-semibold text-[#090A0B] dark:text-[#F7F8F8]">
                      {group.category}
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-[#8A8F98] mt-0.5">
                      {group.subtitle}
                    </p>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-400 dark:text-[#555962] shrink-0">
                    DOM-0{groupIdx + 1}
                  </span>
                </div>

                <div className="divide-y divide-zinc-200/60 dark:divide-white/[0.05]">
                  {group.skills.map((skill) => {
                    const activeTicks = Math.max(
                      3,
                      Math.min(5, Math.round(skill.level / 20))
                    );
                    return (
                      <div key={skill.name} className="px-5 py-3.5 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-semibold text-[#090A0B] dark:text-[#F7F8F8]">
                            {skill.name}
                          </span>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="font-mono text-[11px] text-zinc-500 dark:text-[#8A8F98] tabular-nums">
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
                                      ? "bg-zinc-900 dark:bg-[#F7F8F8]"
                                      : "bg-zinc-200 dark:bg-white/10"
                                  }`}
                                />
                              ))}
                            </span>
                          </div>
                        </div>
                        <p className="text-[11px] text-zinc-500 dark:text-[#8A8F98] leading-relaxed">
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
            <div className="border-b border-zinc-200/80 dark:border-white/[0.08] pb-3">
              <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 dark:text-[#555962]">
                CAREER LEDGER // 2017 — PRESENT
              </div>
              <h3 className="text-xl font-semibold tracking-tight text-[#090A0B] dark:text-[#F7F8F8] mt-0.5">
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
                  className="rounded-xl border border-zinc-200/90 dark:border-white/[0.08] bg-white dark:bg-[#0E1012] p-5 space-y-3.5 hover:border-zinc-300 dark:hover:border-white/20 transition-all shadow-sm"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 border-b border-zinc-200/60 dark:border-white/[0.06] pb-3">
                    <div>
                      <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-500 dark:text-[#8A8F98]">
                        <span className="text-[#090A0B] dark:text-[#F7F8F8] font-semibold">
                          EXP-0{idx + 1}
                        </span>
                        <span>·</span>
                        <span>{exp.period}</span>
                        <span>·</span>
                        <span>{exp.type}</span>
                      </div>
                      <h4 className="text-base sm:text-lg font-semibold text-[#090A0B] dark:text-[#F7F8F8] mt-1">
                        {exp.role}
                      </h4>
                      <p className="text-xs font-mono text-zinc-500 dark:text-[#8A8F98] flex items-center gap-1.5 mt-0.5">
                        <span className="text-[#090A0B] dark:text-[#F7F8F8]">
                          {exp.organization}
                        </span>
                        <span>·</span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {exp.location}
                        </span>
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-[#8A8F98] leading-relaxed">
                    {exp.summary}
                  </p>

                  <ul className="space-y-2">
                    {exp.achievements.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-xs text-zinc-600 dark:text-[#8A8F98]"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded border border-zinc-200/80 dark:border-white/[0.07] bg-zinc-50 dark:bg-[#141517] px-2 py-0.5 font-mono text-[10px] text-zinc-600 dark:text-[#8A8F98]"
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
            <div className="border-b border-zinc-200/80 dark:border-white/[0.08] pb-3">
              <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 dark:text-[#555962]">
                ACADEMIC &amp; VERIFIED CREDENTIALS
              </div>
              <h3 className="text-xl font-semibold tracking-tight text-[#090A0B] dark:text-[#F7F8F8] mt-0.5">
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
                className="rounded-xl border border-zinc-200/90 dark:border-white/[0.08] bg-white dark:bg-[#0E1012] p-5 space-y-3 hover:border-zinc-300 dark:hover:border-white/20 transition-all shadow-sm"
              >
                <div className="flex items-center justify-between gap-2 font-mono text-[11px] text-zinc-500 dark:text-[#8A8F98]">
                  <span>{edu.period}</span>
                  <span className="rounded border border-zinc-200 dark:border-white/[0.08] bg-zinc-50 dark:bg-[#141517] px-2 py-0.5 text-[10px]">
                    {edu.honors}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm sm:text-base font-semibold text-[#090A0B] dark:text-[#F7F8F8]">
                    {edu.degree}
                  </h4>
                  <p className="font-mono text-xs text-zinc-600 dark:text-[#8A8F98] mt-0.5">
                    {edu.institution}
                  </p>
                </div>

                <p className="text-xs text-zinc-500 dark:text-[#8A8F98] leading-relaxed">
                  {edu.description}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-zinc-200/70 dark:border-white/[0.06]">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 dark:text-[#555962]">
                    Core Focus Areas
                  </div>
                  <ul className="space-y-1">
                    {edu.focusAreas.map((area) => (
                      <li
                        key={area}
                        className="flex items-center gap-2 text-xs text-zinc-600 dark:text-[#8A8F98]"
                      >
                        <span className="h-1 w-1 rounded-full bg-zinc-400 dark:bg-[#8A8F98]" />
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
              className="rounded-xl border border-zinc-200/90 dark:border-white/[0.08] bg-white dark:bg-[#0E1012] p-5 space-y-4 shadow-sm"
            >
              <div>
                <h4 className="text-sm font-semibold text-[#090A0B] dark:text-[#F7F8F8]">
                  Licenses &amp; Certifications
                </h4>
                <p className="font-mono text-[11px] text-zinc-500 dark:text-[#8A8F98] mt-0.5">
                  Coursera Credentials &amp; LinkedIn Skill Assessments
                </p>
              </div>

              <div className="space-y-2.5">
                {CERTIFICATIONS.map((cert) => (
                  <div
                    key={cert.id}
                    className="rounded-lg border border-zinc-200/80 dark:border-white/[0.07] bg-zinc-50/70 dark:bg-[#141517] p-3 space-y-1.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-xs font-semibold text-[#090A0B] dark:text-[#F7F8F8]">
                        {cert.title}
                      </div>
                      <span className="shrink-0 rounded border border-zinc-200 dark:border-white/[0.08] px-1.5 py-0.5 font-mono text-[9px] text-zinc-500 dark:text-[#8A8F98]">
                        {cert.domain}
                      </span>
                    </div>
                    <div className="font-mono text-[10px] text-zinc-500 dark:text-[#8A8F98]">
                      {cert.issuer} · Issued {cert.issued}
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5 font-mono text-[10px]">
                      <span className="text-zinc-600 dark:text-[#F7F8F8]">
                        Credential ID: {cert.credentialId}
                      </span>
                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[#090A0B] dark:text-[#F7F8F8] hover:underline"
                        >
                          <span>Verify Credential</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-zinc-200/70 dark:border-white/[0.06] space-y-2">
                <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 dark:text-[#555962]">
                  LinkedIn Skill Assessments Passed
                </div>
                <div className="flex flex-wrap gap-2">
                  {SKILL_ASSESSMENTS.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 rounded border border-zinc-200 dark:border-white/[0.1] bg-zinc-50 dark:bg-[#141517] px-2.5 py-1 font-mono text-xs text-[#090A0B] dark:text-[#F7F8F8]"
                    >
                      <CheckCircle2 className="h-3 w-3 text-emerald-500" />
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
              className="rounded-xl border border-zinc-900 dark:border-white/[0.14] bg-[#090A0B] dark:bg-[#141517] p-5 text-[#F7F8F8] space-y-3 shadow-sm"
            >
              <div className="font-mono text-[10px] uppercase tracking-wider text-emerald-400">
                ● DIRECT ENGINEERING &amp; PRODUCT DISPATCH
              </div>
              <h4 className="text-base font-semibold tracking-tight">
                Looking for a Full-Stack Engineer or Tech/Business Analyst?
              </h4>
              <p className="text-xs text-[#8A8F98] leading-relaxed">
                Available for full-time engineering leadership, IT business
                analysis, product builds, and technical consulting from{" "}
                {PROFILE.location}.
              </p>
              <div className="pt-2 border-t border-white/10 space-y-1 font-mono text-[11px] text-[#F7F8F8]">
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
