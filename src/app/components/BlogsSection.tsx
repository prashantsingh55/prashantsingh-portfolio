"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Search, Code } from "lucide-react";
import { blogs, filterBlogs } from "@/contents/blogs";
import { Blog } from "@/types";
import LightDismissDialog from "@/app/components/LightDismissDialog";

interface BlogsSectionProps {
  limit?: number;
  showSearch?: boolean;
}

export default function BlogsSection({
  limit,
  showSearch = true,
}: BlogsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeBlog, setActiveBlog] = useState<Blog | null>(null);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(blogs.map((b) => b.category)));
    return ["all", ...unique];
  }, []);

  const visibleBlogs = useMemo(() => {
    const filtered = filterBlogs(blogs, selectedCategory, searchQuery);
    return typeof limit === "number" ? filtered.slice(0, limit) : filtered;
  }, [selectedCategory, searchQuery, limit]);

  return (
    <section
      id="blogs"
      className="py-16 md:py-24 border-b border-zinc-200/80 dark:border-white/[0.08]"
    >
      <div className="container-max">
        {/* Section Header */}
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
                04 / ENGINEERING NOTES
              </span>
              <span>—</span>
              <span>TECHNICAL WRITING &amp; ARCHITECTURE GUIDES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.025em] text-[#090A0B] dark:text-[#F7F8F8]">
              Field Notes on Next.js, TypeScript &amp; Systems
            </h2>
            <p className="text-sm text-zinc-600 dark:text-[#8A8F98]">
              Practical dispatches on Next.js 14/15, TypeScript patterns,
              Tailwind CSS responsive architecture, React Hooks, Vercel CI/CD,
              and Node.js REST APIs.
            </p>
          </div>

          {typeof limit === "number" && (
            <Link
              href="/blogs"
              className="tactile-control inline-flex items-center gap-1.5 self-start md:self-auto rounded-lg border border-zinc-200 dark:border-white/[0.1] bg-white dark:bg-[#141517] px-3.5 py-2 font-mono text-xs text-[#090A0B] dark:text-[#F7F8F8] hover:border-zinc-400 dark:hover:border-white/25"
            >
              <span>ALL {blogs.length} ARTICLES</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </motion.div>

        {/* Search & Category Filter */}
        {showSearch && (
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 mb-8 rounded-xl border border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF7F2] dark:bg-[#0A142F] p-2.5">
            <div className="flex flex-wrap items-center gap-1">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`tactile-control rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                      isSelected
                        ? "bg-white text-[#0A1226] dark:bg-[#12234D] dark:text-[#FAF6EE] border border-[#E8DEC8] dark:border-[#2A4785] shadow-sm font-semibold"
                        : "text-zinc-500 dark:text-[#9FB3D9] hover:text-[#0A1226] dark:hover:text-white"
                    }`}
                  >
                    {cat === "all" ? "All Topics" : cat}
                  </button>
                );
              })}
            </div>

            <div className="relative min-w-[240px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                aria-label="Search blog posts"
                className="w-full rounded-lg border border-[#E8DEC8] dark:border-[#1E325C] bg-white dark:bg-[#070D1E] pl-8 pr-3 py-1.5 text-xs text-[#0A1226] dark:text-[#FAF6EE] placeholder:text-zinc-400 dark:placeholder:text-[#9FB3D9]/60 focus:border-red-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Editorial Journal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleBlogs.map((blog, idx) => (
            <motion.article
              key={blog.slug}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.45, delay: (idx % 3) * 0.08 }}
              whileHover={{ y: -4 }}
              suppressHydrationWarning
              className="group flex flex-col rounded-xl border border-[#E8DEC8] dark:border-[#1E325C] bg-white dark:bg-[#0A142F] p-5 hover:border-red-500/40 dark:hover:border-red-500/40 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between gap-2 font-mono text-[10px] text-zinc-500 dark:text-[#9FB3D9] pb-3 border-b border-[#E8DEC8] dark:border-[#1E325C]/60">
                <span className="text-red-600 dark:text-red-400 font-semibold">
                  NOTE-0{idx + 1} // {blog.category.toUpperCase()}
                </span>
                <span className="tabular-nums">{blog.readTime}</span>
              </div>

              <h3 className="text-base font-semibold tracking-tight text-[#0A1226] dark:text-[#FAF6EE] mt-3.5 group-hover:underline decoration-red-400 underline-offset-4">
                <button
                  type="button"
                  onClick={() => setActiveBlog(blog)}
                  className="text-left focus:outline-none"
                >
                  {blog.title}
                </button>
              </h3>

              <p className="text-xs sm:text-[13px] text-zinc-600 dark:text-[#9FB3D9] mt-2 leading-relaxed flex-1">
                {blog.excerpt}
              </p>

              <div className="flex flex-wrap gap-1 mt-4">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded border border-[#E8DEC8] dark:border-[#1E325C] bg-[#F2ECE1]/60 dark:bg-[#070D1E] px-2 py-0.5 font-mono text-[10px] text-[#1E3A8A] dark:text-[#9FB3D9]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-4 pt-3.5 border-t border-[#E8DEC8] dark:border-[#1E325C]/60 flex items-center justify-between font-mono text-[11px]">
                <span className="text-zinc-400 dark:text-[#5B73A8] tabular-nums">
                  {new Date(blog.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    timeZone: "UTC",
                  })}
                </span>

                <button
                  type="button"
                  onClick={() => setActiveBlog(blog)}
                  className="tactile-control inline-flex items-center gap-1 font-semibold text-[#0A1226] dark:text-[#FAF6EE] hover:text-red-600 dark:hover:text-red-400 hover:underline"
                >
                  <span>Read Note</span>
                  <ArrowUpRight className="h-3 w-3" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Native <dialog closedby="any"> Article Reader Modal */}
      <LightDismissDialog
        isOpen={activeBlog !== null}
        onClose={() => setActiveBlog(null)}
        title={activeBlog?.title ?? "Article"}
        subtitle={
          activeBlog
            ? `${activeBlog.category} · ${activeBlog.readTime} · Published ${activeBlog.date}`
            : undefined
        }
      >
        {activeBlog && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-1.5">
              {activeBlog.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded border border-[#E8DEC8] dark:border-[#1E325C] bg-[#F2ECE1]/60 dark:bg-[#070D1E] px-2.5 py-0.5 font-mono text-xs text-[#1E3A8A] dark:text-[#9FB3D9]"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[#0A1226] dark:text-[#FAF6EE]/90 leading-relaxed">
              {activeBlog.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {activeBlog.codeSnippet && (
              <div className="rounded-xl overflow-hidden border border-[#1E325C] bg-[#070D1E] text-[#FAF6EE]">
                <div className="flex items-center justify-between px-4 py-2.5 bg-[#0E1E45] border-b border-[#1E325C] text-xs font-mono text-[#9FB3D9]">
                  <span className="inline-flex items-center gap-1.5">
                    <Code className="h-3.5 w-3.5 text-red-400" />
                    {activeBlog.codeSnippet.title}
                  </span>
                  <span className="uppercase">
                    {activeBlog.codeSnippet.language}
                  </span>
                </div>
                <pre className="p-4 text-xs sm:text-sm font-mono overflow-x-auto leading-relaxed">
                  <code>{activeBlog.codeSnippet.code}</code>
                </pre>
              </div>
            )}
          </div>
        )}
      </LightDismissDialog>
    </section>
  );
}
