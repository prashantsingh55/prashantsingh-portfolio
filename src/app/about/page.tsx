import React from "react";
import type { Metadata } from "next";
import AboutSection from "@/app/components/AboutSection";
import { PROFILE } from "@/contents/profile";

export const metadata: Metadata = {
  title: `About, Ads & SEO, Skills & Experience — ${PROFILE.fullName}`,
  description:
    "Background, technical & business analysis skills matrix, Meta & Google Ads expertise ($10k+ spend), SEO architecture, 1,000+ mentored individuals, professional experience at Chitrabazar, AllStockNepal & Aasha Tech, MBA (Lincoln University College), B.Sc. CSIT (Texas International College), and Coursera certifications of Prashant Bikram Singh.",
};

export default function AboutPage() {
  return (
    <div className="pt-4">
      <AboutSection />
    </div>
  );
}
