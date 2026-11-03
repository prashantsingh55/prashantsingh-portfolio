import fs from "fs";
import path from "path";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, it, expect } from "vitest";
import {
  PROFILE,
  SKILL_GROUPS,
  EXPERIENCES,
  EDUCATION,
  CERTIFICATIONS,
  SKILL_ASSESSMENTS,
} from "@/contents/profile";
import {
  projects,
  filterProjects,
  getFeaturedProjects,
} from "@/contents/projects";
import { blogs, filterBlogs, getBlogBySlug } from "@/contents/blogs";
import {
  isValidEmail,
  validateContactPayload,
  validateNewsletterPayload,
} from "@/lib/validation";
import { computeNextToggleState } from "@/app/context/ThemeContext";
import { isClickInsideDialogBounds } from "@/app/components/LightDismissDialog";
import { syncAriaInvalid } from "@/lib/userInvalidFallback";
import { POST as postContact } from "@/app/api/contact/route";
import { POST as postNewsletter } from "@/app/api/newsletter/route";
import Hero, {
  shouldTriggerEmailCopyShortcut,
  computeSkylineRidgePath,
} from "@/app/components/Hero";
import CraftLabSection, {
  computeSpringWaveformPoints,
  computeQueueThroughputTelemetry,
  resolveExclusionModeKey,
} from "@/app/components/CraftLabSection";
import {
  formatKathmanduTime,
  NAV_ITEMS,
  computeNextCommandIndex,
} from "@/app/components/Navbar";
import AboutSection from "@/app/components/AboutSection";
import ProjectsSection from "@/app/components/ProjectsSection";
import ContactSection from "@/app/components/ContactSection";
import Footer from "@/app/components/Footer";
import BlogsSection from "@/app/components/BlogsSection";
import BlogsPage from "@/app/blogs/page";
import HomePage from "@/app/page";

describe("Portfolio Data & Three-Source Integration", () => {
  it("contains accurate profile identity, bios, emails, and all three source links", () => {
    expect(PROFILE.fullName).toBe("Prashant Bikram Singh");
    expect(PROFILE.shortName).toBe("Prashant Singh");
    expect(PROFILE.tagline).toContain("Tech/Business Analyst");
    expect(PROFILE.tagline).toContain("Full Stack Developer");
    expect(PROFILE.email).toBe("prashantbikramsingh88@gmail.com");
    expect(PROFILE.secondaryEmail).toBe("thakurisinghprashant@gmail.com");
    expect(PROFILE.emails).toEqual([
      "prashantbikramsingh88@gmail.com",
      "thakurisinghprashant@gmail.com",
    ]);
    expect(PROFILE.phone).toBe("+977 9808193078");
    expect(PROFILE.location).toBe("Kathmandu, Bāgmatī, Nepal");
    expect(PROFILE.bio).toContain("passionate Full Stack Developer");
    expect(PROFILE.linkedinBio).toContain("dedicated technology enthusiast");
    expect(PROFILE.socials.github).toBe("https://github.com/prashantsingh55");
    expect(PROFILE.socials.linkedin).toBe(
      "https://www.linkedin.com/in/prashant-bikram-singh-900b74156/"
    );
    expect(PROFILE.socials.portfolioLegacy).toBe(
      "https://prashantsingh-portfolio.vercel.app/"
    );
  });

  it("includes authentic LinkedIn work experience, education, certifications, and skill groups", () => {
    expect(SKILL_GROUPS).toHaveLength(4);
    const skillGroupIds = SKILL_GROUPS.map((g) => g.id);
    expect(skillGroupIds).toContain("business-product");
    expect(SKILL_GROUPS.map((g) => g.shortLabel)).toEqual([
      "Frontend & UI/UX",
      "Backend & Data",
      "Business & Product",
      "Mobile, Web3 & Security",
    ]);

    const allSkillNames = SKILL_GROUPS.flatMap((g) => g.skills.map((s) => s.name)).join(" ");
    expect(allSkillNames).toContain("Forensic Analysis");
    expect(allSkillNames).toContain("Hardhat");
    expect(allSkillNames).toContain("Power BI");
    expect(allSkillNames).toContain("Jira");

    expect(EXPERIENCES).toHaveLength(5);
    const orgs = EXPERIENCES.map((e) => e.organization);
    expect(orgs).toContain("Chitrabazar");
    expect(orgs).toContain("AllStockNepal");
    expect(orgs.filter((o) => o === "Aasha Tech")).toHaveLength(2);

    expect(EDUCATION).toHaveLength(3);
    expect(EDUCATION[0].institution).toBe("Lincoln University College");
    expect(EDUCATION[0].degree).toContain("Master of Business Administration");
    expect(EDUCATION[1].institution).toBe("Texas International College");
    expect(EDUCATION[1].degree).toContain("Computer Science and Information Technology");
    expect(EDUCATION[2].institution).toContain("KMC Bagbazar");

    expect(CERTIFICATIONS).toHaveLength(3);
    expect(CERTIFICATIONS.map((c) => c.credentialId)).toEqual([
      "5X3CK886JFLM",
      "WL3C7MANKALG",
      "AGSM9VMG7SRC",
    ]);
    expect(SKILL_ASSESSMENTS).toEqual(["Java", "JavaScript"]);
  });

  it("includes real GitHub production projects, Web3 repos, and mobile AR projects with accurate GitHub stacks and years", () => {
    expect(projects.length).toBeGreaterThanOrEqual(12);
    const featured = getFeaturedProjects(projects);
    expect(featured).toHaveLength(9);
    const featuredIds = featured.map((p) => p.id);
    expect(featuredIds).toContain("chitrabazaar");
    expect(featuredIds).toContain("byom-academy");
    expect(featuredIds).toContain("skyline-ar-mobile");
    expect(featuredIds).toContain("python-data-scraper");

    expect(projects[0].id).toBe("byom-academy");
    expect(projects[1].id).toBe("chitrabazaar");

    const chitrabazaar = projects.find((p) => p.id === "chitrabazaar");
    expect(chitrabazaar?.technologies).toContain("Prisma ORM");
    expect(chitrabazaar?.technologies).toContain("Sharp SIMD");
    expect(chitrabazaar?.technologies).toContain("pg-boss");
    expect(chitrabazaar?.technologies).toContain("AWS S3");
    expect(chitrabazaar?.technologies).toContain("Stripe");
    expect(chitrabazaar?.technologies).toContain("Google Maps");
    expect(chitrabazaar?.technologies).toContain("Recharts");

    const byom = projects.find((p) => p.id === "byom-academy");
    expect(byom?.demoLink).toBe("https://beyourownmarketeracademy.com/");
    expect(byom?.secondaryDemoLink).toBe("https://byom-tau.vercel.app");
    expect(byom?.technologies).toContain("Google Gemini AI (@google/genai)");
    expect(byom?.longDescription).toContain("chitrabazaarnp-bit/Be-Your-Own-Marketer");

    const skyline = projects.find((p) => p.id === "skyline-ar-mobile");
    expect(skyline?.year).toBe("2026");
    expect(skyline?.longDescription).toContain("three_terrain");
    expect(skyline?.longDescription).toContain("peak_model");
    expect(skyline?.longDescription).toContain("terrain_engine");
    expect(skyline?.longDescription).toContain("sky_engine");
    expect(skyline?.longDescription).toContain("astro_math");

    const scraper = projects.find((p) => p.id === "python-data-scraper");
    expect(scraper?.year).toBe("2025");
    expect(scraper?.technologies).toContain("FastAPI");
    expect(scraper?.technologies).toContain("Uvicorn");
    expect(scraper?.technologies).toContain("BeautifulSoup4");
    expect(scraper?.technologies).toContain("Pandas");
    expect(scraper?.technologies).toContain("SQLAlchemy");
    expect(scraper?.technologies).toContain("PostgreSQL (psycopg2)");
    expect(scraper?.technologies).toContain("HTTPX");
    expect(scraper?.technologies).toContain("Pytest");

    const taskChat = projects.find((p) => p.id === "task-chat-realtime-suite");
    expect(taskChat?.year).toBe("2025");

    expect(projects.find((p) => p.id === "kalash-events")?.image).toBe("/projects/kalash-events.png");
    expect(projects.find((p) => p.id === "chitrabazaar")?.image).toBe("/projects/chitrabazaar.png");
    expect(projects.find((p) => p.id === "byom-academy")?.image).toBe("/projects/byom-academy.png");
    expect(projects.find((p) => p.id === "sharada-academy")?.image).toBe("/projects/sharada-academy.png");
    expect(projects.find((p) => p.id === "allstock-ecommerce")?.image).toBe("/projects/allstock-nepal.png");
    expect(projects.find((p) => p.id === "rokpa-guest-house")?.image).toBe("/projects/rokpa-guest-house.png");
    expect(projects.find((p) => p.id === "usa-limos-service")?.image).toBe("/projects/usa-limos.png");
    expect(projects.find((p) => p.id === "top-ai-tools")?.image).toBe("/projects/top-ai-tools.png");
    expect(projects.find((p) => p.id === "web3-uniswap-uber-clones")?.image).toBe("/projects/web3-clones.png");
    expect(projects.find((p) => p.id === "onchain-nfts-smartcontract-lottery")?.image).toBe("/projects/onchain-nfts.png");
    expect(projects.find((p) => p.id === "skyline-ar-mobile")?.image).toBe("/projects/skyline-ar.png");
    expect(projects.find((p) => p.id === "python-data-scraper")?.image).toBe("/projects/data-scraper.png");

    for (const project of projects) {
      expect(project.title.length).toBeGreaterThan(2);
      expect(project.githubLink).toMatch(
        /^https:\/\/github\.com\/prashantsingh55\//
      );
      expect(project.technologies.length).toBeGreaterThan(0);
      expect(project.image).toMatch(/^\/projects\/[\w-]+\.(png|jpe?g|webp)$/);
      const diskPath = path.join(process.cwd(), "public", project.image.replace(/^\//, ""));
      expect(fs.existsSync(diskPath)).toBe(true);
    }
  });

  it("renders authentic Portfolio, GitHub, and LinkedIn content across Hero, AboutSection, ProjectsSection, ContactSection, and Footer UI components", () => {
    const heroHtml = renderToStaticMarkup(React.createElement(Hero));
    expect(heroHtml).toContain("Prashant Bikram Singh");
    expect(heroHtml).toContain("Tech/Business Analyst");
    expect(heroHtml).toContain("Kathmandu, Bāgmatī, Nepal");
    expect(heroHtml).toContain("Lincoln University College");
    expect(heroHtml).toContain("Skyline-AR");
    expect(heroHtml).toContain("Prashant.jpg");
    expect(heroHtml).toContain("BeYourOwnMarketer");
    expect(heroHtml).toContain("Chitrabazaar");
    // Ensure photo frame does not contain Gemini blue/indigo/purple colors
    expect(heroHtml).not.toContain("indigo-500");
    expect(heroHtml).not.toContain("violet-600");
    expect(heroHtml).not.toContain("from-indigo-600");
    expect(heroHtml).not.toContain("ring-indigo-500");

    const aboutHtml = renderToStaticMarkup(React.createElement(AboutSection));
    expect(aboutHtml).toContain(
      "passionate Full Stack Developer with expertise in building modern web applications"
    );
    expect(aboutHtml).toContain(PROFILE.linkedinBio);
    expect(aboutHtml).toContain("Chitrabazar");
    expect(aboutHtml).toContain("AllStockNepal");
    expect(aboutHtml).toContain("Aasha Tech");
    expect(aboutHtml).toContain("Lincoln University College");
    expect(aboutHtml).toContain("Texas International College");
    expect(aboutHtml).toContain("KMC Bagbazar, Kathmandu (Kathmandu Model College)");
    expect(aboutHtml).toContain("5X3CK886JFLM");
    expect(aboutHtml).toContain("WL3C7MANKALG");
    expect(aboutHtml).toContain("AGSM9VMG7SRC");
    expect(aboutHtml).toContain("Verify Credential");
    expect(aboutHtml).toContain("Mobile, Web3 &amp; Security");
    expect(aboutHtml).toContain("prashantbikramsingh88@gmail.com");
    expect(aboutHtml).toContain("thakurisinghprashant@gmail.com");

    const projectsHtml = renderToStaticMarkup(
      React.createElement(ProjectsSection, { featuredOnly: true })
    );
    expect(projectsHtml).toContain("https://beyourownmarketeracademy.com/");
    expect(projectsHtml).toContain("https://byom-tau.vercel.app");
    expect(projectsHtml).toContain("BYOM App (byom-tau)");
    expect(projectsHtml).toContain("BeYourOwnMarketer");
    expect(projectsHtml).toContain("Chitrabazaar");
    expect(projectsHtml).toContain("Skyline-AR");
    expect(projectsHtml).toContain("Python FastAPI Data Scraper");
    expect(projectsHtml).toContain("Sharp SIMD");
    expect(projectsHtml).toContain("pg-boss");
    expect(projectsHtml).toContain("kalash-events.png");
    expect(projectsHtml).toContain("byom-academy.png");
    expect(projectsHtml).toContain("skyline-ar.png");

    const allProjectsHtml = renderToStaticMarkup(
      React.createElement(ProjectsSection, { featuredOnly: false })
    );
    for (const project of projects) {
      const fileName = path.basename(project.image);
      expect(allProjectsHtml).toContain(fileName);
    }

    const contactHtml = renderToStaticMarkup(React.createElement(ContactSection));
    expect(contactHtml).toContain("prashantbikramsingh88@gmail.com");
    expect(contactHtml).toContain("thakurisinghprashant@gmail.com");
    expect(contactHtml).toContain("+977 9808193078");

    const footerHtml = renderToStaticMarkup(React.createElement(Footer));
    expect(footerHtml).toContain("prashantbikramsingh88@gmail.com");
    expect(footerHtml).toContain("thakurisinghprashant@gmail.com");
    expect(footerHtml).toContain("+977 9808193078");
  });

  it("preserves all 6 original blog posts with expanded full-text content", () => {
    expect(blogs).toHaveLength(6);
    for (const blog of blogs) {
      expect(blog.slug.length).toBeGreaterThan(3);
      expect(blog.content.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("renders BlogsSection and BlogsPage cleanly without missing chunks, SSR errors, or hydration issues", () => {
    const blogsSectionHtml = renderToStaticMarkup(
      React.createElement(BlogsSection, { showSearch: true })
    );
    expect(blogsSectionHtml).toContain("04 / ENGINEERING NOTES");
    expect(blogsSectionHtml).toContain("Field Notes on Next.js, TypeScript &amp; Systems");
    expect(blogsSectionHtml).toContain("All Topics");
    expect(blogsSectionHtml).toContain("Search articles...");
    expect(blogsSectionHtml).toContain("Getting Started with Next.js 14");
    expect(blogsSectionHtml).toContain("Mar 15, 2024");
    expect(blogsSectionHtml).toContain("Mastering TypeScript for React");
    expect(blogsSectionHtml).toContain("Mar 10, 2024");

    const blogsPageHtml = renderToStaticMarkup(React.createElement(BlogsPage));
    expect(blogsPageHtml).toContain("04 / ENGINEERING NOTES");
    expect(blogsPageHtml).toContain("Subscribe to Engineering Notes &amp; Architecture Updates");
    expect(blogsPageHtml).toContain("you@domain.com");
  });
});

describe("Project & Blog Filtering Logic (Edge Cases)", () => {
  it("filters projects by category accurately", () => {
    const all = filterProjects(projects, "all", "");
    expect(all).toHaveLength(projects.length);

    const web3 = filterProjects(projects, "web3", "");
    expect(web3.length).toBeGreaterThanOrEqual(2);
    expect(web3.every((p) => p.category === "web3")).toBe(true);

    const mobile = filterProjects(projects, "mobile", "");
    expect(mobile.length).toBeGreaterThanOrEqual(1);
    expect(mobile[0].id).toBe("skyline-ar-mobile");
  });

  it("handles case-insensitive search queries, whitespace padding, and empty matches", () => {
    const searchKalash = filterProjects(projects, "all", "  KALASH  ");
    expect(searchKalash).toHaveLength(1);
    expect(searchKalash[0].id).toBe("kalash-events");

    const searchBYOM = filterProjects(projects, "all", "BeYourOwnMarketer");
    expect(searchBYOM.length).toBeGreaterThanOrEqual(1);
    expect(searchBYOM[0].id).toBe("byom-academy");

    const searchSolidity = filterProjects(projects, "web3", "Chainlink");
    expect(searchSolidity).toHaveLength(1);
    expect(searchSolidity[0].id).toBe("onchain-nfts-smartcontract-lottery");

    const noMatch = filterProjects(
      projects,
      "all",
      "non-existent-xyz-99999-framework"
    );
    expect(noMatch).toEqual([]);
  });

  it("returns only featured projects from getFeaturedProjects", () => {
    const featured = getFeaturedProjects(projects);
    expect(featured.length).toBeGreaterThan(0);
    expect(featured.every((p) => p.featured)).toBe(true);
  });

  it("filters blogs and looks up blog slugs with whitespace handling", () => {
    const tsBlogs = filterBlogs(blogs, "all", "  TypeScript ");
    expect(tsBlogs.length).toBeGreaterThanOrEqual(1);

    const found = getBlogBySlug("  getting-started-with-nextjs-14 ");
    expect(found?.title).toBe("Getting Started with Next.js 14");

    expect(getBlogBySlug("unknown-slug")).toBeUndefined();
  });
});

describe("Dark-Mode Toggle, Dialog Light-Dismiss & Form ARIA Helpers", () => {
  it("implements the two-state color-scheme toggle state machine with dark mode as default", () => {
    // Step 1: Default state is dark (no stored override) -> user toggles -> switches to "light" and stores "light"
    const step1 = computeNextToggleState(null, "light");
    expect(step1).toEqual({
      targetScheme: "light",
      nextStoredOverride: "light",
      metaContent: "light",
    });

    // Step 2: Currently light (storedOverride = "light") -> user toggles -> reverts to default "dark" and clears override
    const step2 = computeNextToggleState(step1.nextStoredOverride, "light");
    expect(step2).toEqual({
      targetScheme: "dark",
      nextStoredOverride: null,
      metaContent: "dark",
    });

    // Step 3: Explicit stored override "dark" -> user toggles -> switches to "light"
    const step3 = computeNextToggleState("dark", "dark");
    expect(step3).toEqual({
      targetScheme: "light",
      nextStoredOverride: "light",
      metaContent: "light",
    });
  });

  it("accurately distinguishes dialog content clicks vs. backdrop clicks", () => {
    const rect = { top: 100, left: 200, width: 600, height: 400 };

    // Inside dialog content box
    expect(isClickInsideDialogBounds(rect, 500, 300)).toBe(true);

    // Exact boundary edges (padding/border of dialog)
    expect(isClickInsideDialogBounds(rect, 200, 100)).toBe(true);
    expect(isClickInsideDialogBounds(rect, 800, 500)).toBe(true);

    // Outside dialog bounds (backdrop click)
    expect(isClickInsideDialogBounds(rect, 199, 300)).toBe(false);
    expect(isClickInsideDialogBounds(rect, 801, 300)).toBe(false);
    expect(isClickInsideDialogBounds(rect, 500, 99)).toBe(false);
    expect(isClickInsideDialogBounds(rect, 500, 501)).toBe(false);
  });

  it("synchronizes aria-invalid attribute with control validity state", () => {
    const attrs: Record<string, string> = {};
    const mockInvalidControl = {
      checkValidity: () => false,
      classList: { contains: () => true },
      matches: () => true,
      setAttribute: (k: string, v: string) => {
        attrs[k] = v;
      },
    };
    syncAriaInvalid(mockInvalidControl);
    expect(attrs["aria-invalid"]).toBe("true");

    const mockValidControl = {
      checkValidity: () => true,
      classList: { contains: () => false },
      matches: () => false,
      setAttribute: (k: string, v: string) => {
        attrs[k] = v;
      },
    };
    syncAriaInvalid(mockValidControl);
    expect(attrs["aria-invalid"]).toBe("false");
  });
});

describe("Validation & Boundary Edge Cases", () => {
  it("validates email addresses across valid and invalid edge cases", () => {
    expect(isValidEmail("prashantbikramsingh88@gmail.com")).toBe(true);
    expect(isValidEmail("  user@domain.co.uk  ")).toBe(true);
    expect(isValidEmail("")).toBe(false);
    expect(isValidEmail("   ")).toBe(false);
    expect(isValidEmail("invalid-email")).toBe(false);
    expect(isValidEmail("user@domain.c")).toBe(false);
    expect(isValidEmail(`${"a".repeat(250)}@test.com`)).toBe(false);
  });

  it("rejects non-object, empty, or boundary-violating contact payloads", () => {
    expect(validateContactPayload(null).valid).toBe(false);
    expect(validateContactPayload([]).valid).toBe(false);
    expect(validateContactPayload("string").valid).toBe(false);

    // Empty fields
    const empty = validateContactPayload({ name: " ", email: "", message: "" });
    expect(empty.valid).toBe(false);
    expect(empty.fieldErrors?.name).toBeDefined();
    expect(empty.fieldErrors?.email).toBeDefined();
    expect(empty.fieldErrors?.message).toBeDefined();

    // Boundary: name too short (1 char) and too long (101 chars)
    expect(
      validateContactPayload({
        name: "A",
        email: "test@example.com",
        message: "Valid message content here.",
      }).valid
    ).toBe(false);
    expect(
      validateContactPayload({
        name: "A".repeat(101),
        email: "test@example.com",
        message: "Valid message content here.",
      }).valid
    ).toBe(false);

    // Boundary: message too short (9 chars) and too long (3001 chars)
    expect(
      validateContactPayload({
        name: "Prashant",
        email: "test@example.com",
        message: "123456789",
      }).valid
    ).toBe(false);
    expect(
      validateContactPayload({
        name: "Prashant",
        email: "test@example.com",
        message: "x".repeat(3001),
      }).valid
    ).toBe(false);

    // Valid exact boundary (2-char name, 10-char message)
    const validBoundary = validateContactPayload({
      name: "  Ab ",
      email: "  USER@Example.com ",
      message: "1234567890",
    });
    expect(validBoundary.valid).toBe(true);
    expect(validBoundary.data?.name).toBe("Ab");
    expect(validBoundary.data?.email).toBe("user@example.com");
    expect(validBoundary.data?.subject).toBe("Portfolio Inquiry");
  });

  it("validates newsletter payloads", () => {
    expect(validateNewsletterPayload(null).valid).toBe(false);
    expect(validateNewsletterPayload({ email: "" }).valid).toBe(false);
    expect(validateNewsletterPayload({ email: "bad-email" }).valid).toBe(false);

    const ok = validateNewsletterPayload({ email: "  Dev@Example.com " });
    expect(ok.valid).toBe(true);
    expect(ok.data?.email).toBe("dev@example.com");
  });
});

describe("API Route Handlers (/api/contact & /api/newsletter)", () => {
  it("POST /api/contact returns 200 for valid payload and 400 for invalid or malformed JSON", async () => {
    const validReq = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Aarav Nepal",
        email: "aarav@example.com",
        subject: "Next.js Consulting",
        message: "We would love to collaborate on our upcoming platform.",
      }),
    });
    const validRes = await postContact(validReq);
    expect(validRes.status).toBe(200);
    const validJson = await validRes.json();
    expect(validJson.message).toBe("Message sent successfully");
    expect(validJson.submission.email).toBe("aarav@example.com");

    const invalidReq = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "",
        email: "not-an-email",
        message: "short",
      }),
    });
    const invalidRes = await postContact(invalidReq);
    expect(invalidRes.status).toBe(400);

    const malformedReq = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{bad json",
    });
    const malformedRes = await postContact(malformedReq);
    expect(malformedRes.status).toBe(400);
  });

  it("POST /api/newsletter returns 200 for valid email and 400 for invalid input", async () => {
    const validReq = new Request("http://localhost:3000/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "reader@example.com" }),
    });
    const validRes = await postNewsletter(validReq);
    expect(validRes.status).toBe(200);

    const badReq = new Request("http://localhost:3000/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "invalid" }),
    });
    const badRes = await postNewsletter(badReq);
    expect(badRes.status).toBe(400);
  });
});

describe("Interactive Craft Lab Physics, Queue Telemetry & Design Engineer Standards", () => {
  it("computes damped harmonic oscillator waveforms across underdamped, critical, and overdamped regimes", () => {
    const underdamped = computeSpringWaveformPoints(400, 12, 1.0);
    expect(underdamped.regime).toBe("Underdamped (Bouncy)");
    expect(underdamped.dampingRatio).toBeLessThan(0.72);
    expect(underdamped.svgPath).toMatch(/^M0\.0,/);
    expect(underdamped.settlingTimeMs).toBeGreaterThanOrEqual(80);

    const critical = computeSpringWaveformPoints(300, 34, 1.0);
    expect(critical.regime).toBe("Critically Tuned (Snappy)");
    expect(critical.dampingRatio).toBeGreaterThanOrEqual(0.72);
    expect(critical.dampingRatio).toBeLessThanOrEqual(1.08);

    const overdamped = computeSpringWaveformPoints(100, 48, 1.0);
    expect(overdamped.regime).toBe("Overdamped");
    expect(overdamped.dampingRatio).toBeGreaterThan(1.08);

    // Extreme boundary clamping (negative, zero, NaN, or Infinity inputs should not produce NaN)
    const clamped = computeSpringWaveformPoints(-50, 0, -2);
    expect(Number.isFinite(clamped.dampingRatio)).toBe(true);
    expect(clamped.svgPath).not.toContain("NaN");

    const nanGuarded = computeSpringWaveformPoints(NaN, Infinity, -Infinity);
    expect(Number.isFinite(nanGuarded.dampingRatio)).toBe(true);
    expect(nanGuarded.svgPath).not.toContain("NaN");
    expect(Number.isFinite(nanGuarded.settlingTimeMs)).toBe(true);

    // Heavily overdamped slow spring should report true >900ms settling time rather than capping at 900ms
    const slowOverdamped = computeSpringWaveformPoints(80, 120, 3.0);
    expect(slowOverdamped.settlingTimeMs).toBeGreaterThan(900);
  });

  it("models async pg-boss + Sharp SIMD queue latency vs synchronous HTTP blocking and guards NaN inputs", () => {
    const asyncStats = computeQueueThroughputTelemetry(24, 50, true);
    const syncStats = computeQueueThroughputTelemetry(24, 50, false);

    expect(asyncStats.statusLabel).toBe("OPTIMAL // NON-BLOCKING");
    expect(syncStats.statusLabel).toBe("SATURATED // BLOCKING I/O");
    expect(asyncStats.p95LatencyMs).toBeLessThan(syncStats.p95LatencyMs);
    expect(asyncStats.throughputJobsPerMin).toBeGreaterThan(
      syncStats.throughputJobsPerMin
    );

    const nanQueue = computeQueueThroughputTelemetry(NaN, NaN, true);
    expect(Number.isFinite(nanQueue.p95LatencyMs)).toBe(true);
    expect(Number.isFinite(nanQueue.throughputJobsPerMin)).toBe(true);
  });

  it("formats Kathmandu time (Asia/Kathmandu UTC+05:45) accurately and handles invalid Date", () => {
    // 2026-01-01T00:00:00Z is 05:45:00 in Asia/Kathmandu
    const formatted = formatKathmanduTime(new Date("2026-01-01T00:00:00Z"));
    expect(formatted).toBe("05:45:00");
    expect(formatKathmanduTime(new Date("invalid"))).toBe("NPT +05:45");
  });

  it("aligns Navbar NAV_ITEMS codes (01-05) with homepage section order and cycles Command Palette selection", () => {
    expect(NAV_ITEMS.map((item) => `${item.code}:${item.href}`)).toEqual([
      "01:/",
      "02:/projects",
      "03:/about",
      "04:/blogs",
      "05:/contact",
    ]);

    expect(computeNextCommandIndex(0, 5, "ArrowDown")).toBe(1);
    expect(computeNextCommandIndex(4, 5, "ArrowDown")).toBe(0);
    expect(computeNextCommandIndex(0, 5, "ArrowUp")).toBe(4);
    expect(computeNextCommandIndex(0, 0, "ArrowDown")).toBe(0);
  });

  it("guards global C email shortcut against open dialogs, interactive elements, text selections, and modifiers", () => {
    expect(
      shouldTriggerEmailCopyShortcut({
        key: "c",
        targetTagName: "DIV",
      })
    ).toBe(true);

    // Blocked when a modal <dialog open> is active
    expect(
      shouldTriggerEmailCopyShortcut({
        key: "c",
        targetTagName: "DIV",
        hasOpenDialog: true,
      })
    ).toBe(false);

    // Blocked when focus is inside a button, link, slider, or tab
    expect(
      shouldTriggerEmailCopyShortcut({
        key: "c",
        targetTagName: "BUTTON",
        isInsideInteractiveOrDialog: true,
      })
    ).toBe(false);

    // Blocked when text is selected on the page or key is held down (repeat) or Shift+C
    expect(
      shouldTriggerEmailCopyShortcut({
        key: "c",
        hasTextSelection: true,
      })
    ).toBe(false);
    expect(
      shouldTriggerEmailCopyShortcut({
        key: "c",
        repeat: true,
      })
    ).toBe(false);
    expect(
      shouldTriggerEmailCopyShortcut({
        key: "C",
        shiftKey: true,
      })
    ).toBe(false);
  });

  it("generates continuous 360-degree Skyline-AR ridge SVG paths without modulo jump discontinuities", () => {
    const extractFirstPeakY = (path: string): number => {
      const match = path.match(/L45,([\d.]+)/);
      return match ? Number(match[1]) : NaN;
    };

    for (let deg = 0; deg < 360; deg++) {
      const yCurr = extractFirstPeakY(computeSkylineRidgePath(deg));
      const yNext = extractFirstPeakY(computeSkylineRidgePath((deg + 1) % 360));
      expect(Number.isFinite(yCurr)).toBe(true);
      expect(Math.abs(yNext - yCurr)).toBeLessThan(1.0);
    }

    expect(computeSkylineRidgePath(NaN)).not.toContain("NaN");
  });

  it("resolves Lab 02 tactile keycaps (1-4) and arrow keys across exclusion modes", () => {
    expect(resolveExclusionModeKey("1", "web3")).toBe("production");
    expect(resolveExclusionModeKey("2", "production")).toBe("simd");
    expect(resolveExclusionModeKey("3", "production")).toBe("sensor");
    expect(resolveExclusionModeKey("4", "production")).toBe("web3");
    expect(resolveExclusionModeKey("ArrowRight", "production")).toBe("simd");
    expect(resolveExclusionModeKey("ArrowLeft", "production")).toBe("web3");
    expect(resolveExclusionModeKey("x", "production")).toBeNull();
  });

  it("renders HomePage, CraftLabSection, and semantic responsive Index Ledger table with zero AI clichés", () => {
    const craftHtml = renderToStaticMarkup(React.createElement(CraftLabSection));
    expect(craftHtml).toContain("02 / INTERACTIVE CRAFT LAB");
    expect(craftHtml).toContain("LAB 01 // SPRING PHYSICS");
    expect(craftHtml).toContain("LAB 02 // EXCLUSION TABS");
    expect(craftHtml).toContain("LAB 03 // QUEUE TELEMETRY");

    const ledgerHtml = renderToStaticMarkup(
      React.createElement(ProjectsSection, {
        featuredOnly: true,
        defaultViewMode: "ledger",
      })
    );
    expect(ledgerHtml).toContain('<table class="ledger-table');
    expect(ledgerHtml).toContain('role="region"');
    expect(ledgerHtml).toContain('id="projects-ledger-caption"');
    expect(ledgerHtml).toContain('scope="row"');

    const homeHtml = renderToStaticMarkup(React.createElement(HomePage));
    expect(homeHtml).toContain("01 / PORTFOLIO INDEX");
    expect(homeHtml).toContain("02 / FLAGSHIP SYSTEMS");
    expect(homeHtml).toContain("03 / ARCHITECTURE &amp; BIO");
    expect(homeHtml).toContain("04 / ENGINEERING NOTES");
    expect(homeHtml).toContain("05 / DIRECT TRANSMISSION");

    // Ensure AI template clichés are eliminated
    expect(homeHtml).not.toContain("bg-clip-text text-transparent");
    expect(homeHtml).not.toContain("blur-3xl");

    // Ensure all target scroll anchor sections are properly wired on HomePage
    expect(homeHtml).toContain('id="projects"');
    expect(homeHtml).toContain('id="about"');
    expect(homeHtml).toContain('id="blogs"');
    expect(homeHtml).toContain('id="contact"');

    // Ensure Hero above-the-fold content renders visible on SSR without hidden opacity or translateY mismatches
    expect(homeHtml).toContain('style="opacity:1;transform:none"');
  });

  it("verifies dark-mode-by-default behavior across edge cases", () => {
    // Edge case: null stored override -> always targets light
    expect(computeNextToggleState(null).targetScheme).toBe("light");
    expect(computeNextToggleState(null).nextStoredOverride).toBe("light");
    expect(computeNextToggleState(null).metaContent).toBe("light");

    // Edge case: stored is "light" -> always targets dark and clears override
    expect(computeNextToggleState("light").targetScheme).toBe("dark");
    expect(computeNextToggleState("light").nextStoredOverride).toBeNull();
    expect(computeNextToggleState("light").metaContent).toBe("dark");

    // Edge case: stored is "dark" -> targets light
    expect(computeNextToggleState("dark").targetScheme).toBe("light");
    expect(computeNextToggleState("dark").nextStoredOverride).toBe("light");
  });
});


