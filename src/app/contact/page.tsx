import React from "react";
import type { Metadata } from "next";
import ContactSection from "@/app/components/ContactSection";
import { PROFILE } from "@/contents/profile";

export const metadata: Metadata = {
  title: `Contact — ${PROFILE.fullName}`,
  description: `Get in touch with ${PROFILE.fullName} (${PROFILE.email}, ${PROFILE.secondaryEmail}, ${PROFILE.phone}) in ${PROFILE.location} for Tech/Business Analysis, Full-Stack Next.js, Flutter Mobile/AR, and Web3 engineering projects.`,
};

export default function ContactPage() {
  return (
    <div className="pt-4">
      <ContactSection />
    </div>
  );
}
