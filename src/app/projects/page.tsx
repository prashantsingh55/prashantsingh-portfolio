import React from "react";
import type { Metadata } from "next";
import ProjectsSection from "@/app/components/ProjectsSection";
import { PROFILE } from "@/contents/profile";

export const metadata: Metadata = {
  title: `Projects & Live Deployments — ${PROFILE.fullName}`,
  description:
    "Explore 14+ full-stack Next.js platforms, multi-role marketplaces, Web3 Solidity smart contracts, and Flutter AR mobile applications by Prashant Bikram Singh.",
};

export default function ProjectsPage() {
  return (
    <div className="pt-4">
      <ProjectsSection featuredOnly={false} showHeader={true} />
    </div>
  );
}
