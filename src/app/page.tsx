import React from "react";
import Hero from "@/app/components/Hero";
import ProjectsSection from "@/app/components/ProjectsSection";
import AboutSection from "@/app/components/AboutSection";
import BlogsSection from "@/app/components/BlogsSection";
import Newsletter from "@/app/components/Newsletter";
import ContactSection from "@/app/components/ContactSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProjectsSection featuredOnly={true} />
      <AboutSection />
      <BlogsSection limit={3} showSearch={false} />
      <Newsletter />
      <ContactSection />
    </>
  );
}
