import React from "react";
import type { Metadata } from "next";
import BlogsSection from "@/app/components/BlogsSection";
import Newsletter from "@/app/components/Newsletter";
import { PROFILE } from "@/contents/profile";

export const metadata: Metadata = {
  title: `Technical Articles & Engineering Blog — ${PROFILE.fullName}`,
  description:
    "Articles and tutorials on Next.js 14/15, TypeScript for React, Tailwind CSS responsive layouts, React Hooks, Vercel deployments, and Node.js REST APIs.",
};

export default function BlogsPage() {
  return (
    <div className="pt-4">
      <BlogsSection showSearch={true} />
      <Newsletter />
    </div>
  );
}
