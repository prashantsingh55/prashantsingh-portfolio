import {
  ExperienceItem,
  EducationItem,
  SkillGroup,
  CertificationItem,
} from "@/types";

export const PROFILE = {
  fullName: "Prashant Bikram Singh",
  shortName: "Prashant Singh",
  handle: "@prashantsingh55",
  title: "Tech/Business Analyst & Full Stack Developer",
  headline: "Tech/Business Analyst & Growth Marketer",
  tagline:
    "Tech/Business Analyst | Full Stack Developer | Meta & Google Ads Specialist ($10k+ Spend) | SEO Expert | Mentor to 1,000+ Students",
  roles: [
    "Tech/Business Analyst (Chitrabazar)",
    "Meta & Google Ads Specialist ($10k+ Managed Ad Spend)",
    "SEO Expert & Search Engine Visibility Strategist",
    "Meta Ads Educator (1,000+ Individuals Trained)",
    "Full Stack Developer (Next.js, TypeScript & FastAPI)",
    "Cross-Platform Mobile & AR Developer (Flutter / Dart)",
  ],
  bio: "I'm a passionate Full Stack Developer with expertise in building modern web applications. With a strong foundation in both frontend and backend technologies, I create seamless user experiences and robust server-side solutions.",
  linkedinBio:
    "I am a dedicated technology enthusiast with a broad background in app and website development, along with practical experience in strategic planning, financial management, paid ad scaling ($10k+ on Meta and Google Ads), SEO, and mentoring 1,000+ individuals. I have a proven track record of leading teams, delivering innovative solutions, and providing expert consultation to clients.",
  extendedBio:
    "Based in Kathmandu, Bāgmatī, Nepal, I bridge strategic business analysis, performance marketing (over $10,000+ profitably managed across Meta and Google Ads), and technical SEO with hands-on full-stack, mobile AR, and Web3 software engineering. Currently, I also conduct practical Meta Ads classes mentoring 1,000+ individuals across diverse sectors—including established business owners, aspiring entrepreneurs, and recent graduates. Holding an MBA from Lincoln University College and a B.Tech / B.Sc. CSIT from Texas International College, I have led product strategy at Chitrabazar and AllStockNepal, built cross-platform Flutter apps at Aasha Tech, and shipped 26+ open-source repositories on GitHub since 2017.",
  location: "Kathmandu, Bāgmatī, Nepal",
  locationShort: "Kathmandu, Nepal",
  timezone: "NPT (UTC+05:45)",
  availability:
    "Available for Tech/Business Analysis, Full-Stack Engineering, Paid Ads & SEO Strategy",
  email: "prashantbikramsingh88@gmail.com",
  secondaryEmail: "thakurisinghprashant@gmail.com",
  emails: [
    "prashantbikramsingh88@gmail.com",
    "thakurisinghprashant@gmail.com",
  ],
  phone: "+977 9808193078",
  phoneRaw: "+9779808193078",
  whatsappUrl: "https://wa.me/9779808193078",
  avatarUrl: "/Prashant.jpg",
  githubAvatarFallback: "https://avatars.githubusercontent.com/u/29041221?v=4",
  socials: {
    github: "https://github.com/prashantsingh55",
    linkedin: "https://www.linkedin.com/in/prashant-bikram-singh-900b74156/",
    twitter: "https://x.com/singhprashant57",
    portfolioLegacy: "https://prashantsingh-portfolio.vercel.app/",
  },
  stats: [
    {
      label: "Ad Spend Managed",
      value: "$10k+",
      detail: "Profitable Meta & Google Ads spend managed for internal and client ventures with 3.8x–5.2x ROAS",
    },
    {
      label: "Students Mentored",
      value: "1,000+",
      detail: "Meta Ads masterclasses for business owners, aspiring entrepreneurs & recent graduates",
    },
    {
      label: "Technical SEO & SERP",
      value: "Top 1%",
      detail: "Organic SERP dominance, Core Web Vitals optimization & conversion rate funnels",
    },
    {
      label: "GitHub Repositories",
      value: "26+",
      detail: "Open-source web, mobile AR, Python & Web3 repos since May 2017",
    },
    {
      label: "Live Production Apps",
      value: "10+",
      detail: "Deployed platforms across Marketplaces, EdTech, Events & E-Commerce",
    },
    {
      label: "Academic Credentials",
      value: "MBA + CSIT",
      detail: "MBA (Lincoln University College) & B.Sc. CSIT (Texas Int'l College)",
    },
  ],
} as const;

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "frontend",
    category: "Frontend & UI/UX Engineering",
    shortLabel: "Frontend & UI/UX",
    subtitle:
      "High-craft, accessible, responsive web interfaces with React, Next.js & Tailwind CSS",
    skills: [
      {
        name: "React & Next.js (App Router)",
        level: 95,
        years: "5+ yrs",
        highlight:
          "SSR, RSC, ISR, dynamic routing & full-stack Next.js 14/15 production platforms",
      },
      {
        name: "TypeScript & Modern JavaScript",
        level: 93,
        years: "5+ yrs",
        highlight:
          "Strict type-safe architectures, generics & LinkedIn Skill Assessment Verified (JavaScript)",
      },
      {
        name: "Tailwind CSS & Design Systems",
        level: 96,
        years: "4+ yrs",
        highlight:
          "Custom tokens, adaptive light/dark color-scheme, fluid layouts & micro-interactions",
      },
      {
        name: "HTML5, CSS3 & Web Accessibility",
        level: 95,
        years: "6+ yrs",
        highlight:
          "Semantic markup, native light-dismiss dialogs, WCAG standards & Core Web Vitals",
      },
      {
        name: "Framer Motion, Recharts & Interactive UI",
        level: 88,
        years: "3+ yrs",
        highlight:
          "Choreographed transitions, analytics dashboards (Recharts), Google Maps & multi-step wizards",
      },
    ],
  },
  {
    id: "backend",
    category: "Backend, APIs & Data Engineering",
    shortLabel: "Backend & Data",
    subtitle:
      "Scalable server-side systems, relational/NoSQL databases, Python FastAPI & AI integrations",
    skills: [
      {
        name: "Node.js, Express & REST APIs",
        level: 90,
        years: "5+ yrs",
        highlight:
          "RESTful API architecture, Socket.io real-time streams, webhooks & middleware pipelines",
      },
      {
        name: "PostgreSQL, Prisma ORM & SQLAlchemy",
        level: 88,
        years: "4+ yrs",
        highlight:
          "Relational schema modeling, Prisma ORM, psycopg2, pg-boss background queues & query optimization",
      },
      {
        name: "Python, FastAPI & Data Scraping",
        level: 86,
        years: "4+ yrs",
        highlight:
          "FastAPI, Uvicorn, BeautifulSoup4, Pandas, HTTPX async scraping pipelines & Pytest",
      },
      {
        name: "MongoDB, Firebase & AWS S3",
        level: 88,
        years: "4+ yrs",
        highlight:
          "Firestore real-time sync, AWS S3 media pipelines, Sharp SIMD image workers & NoSQL modeling",
      },
      {
        name: "NextAuth, Clerk, Stripe & Google Gemini AI",
        level: 89,
        years: "3+ yrs",
        highlight:
          "Multi-role RBAC (NextAuth/Clerk), Stripe checkout & Google Gemini AI (@google/genai) workflows",
      },
    ],
  },
  {
    id: "business-product",
    category: "Business Analysis & Product Leadership",
    shortLabel: "Business & Product",
    subtitle:
      "MBA-backed strategic planning, IT business analysis, startup leadership & agile product management",
    skills: [
      {
        name: "IT Business Analysis & Planning/Monitoring",
        level: 94,
        years: "4+ yrs",
        highlight:
          "Requirements engineering, stakeholder alignment, Business Analysis Planning & Monitoring at Chitrabazar",
      },
      {
        name: "Product Management & Product Development",
        level: 92,
        years: "4+ yrs",
        highlight:
          "End-to-end product lifecycle, roadmap prioritization, co-creation & multi-role marketplace design",
      },
      {
        name: "Strategic Planning & Start-up Leadership",
        level: 90,
        years: "4+ yrs",
        highlight:
          "Co-Founder experience (AllStockNepal), financial management, startup ventures & client consultation",
      },
      {
        name: "Agile / Scrum, Jira & Team Leadership",
        level: 90,
        years: "4+ yrs",
        highlight:
          "Sprint planning, cross-functional engineering/business coordination, problem solving & delivery governance",
      },
      {
        name: "Business Analytics & Power BI",
        level: 86,
        years: "3+ yrs",
        highlight:
          "KPI tracking, conversion funnel optimization, financial modeling & data-driven decision reporting",
      },
    ],
  },
  {
    id: "growth-ads-seo",
    category: "Paid Ads, SEO & Performance Marketing",
    shortLabel: "Ads, SEO & Growth",
    subtitle:
      "Meta Ads ($10k+ spend), Google Ads, Technical SEO & Meta Ads masterclasses for 1,000+ individuals",
    skills: [
      {
        name: "Meta Ads Manager & Scaling (Facebook & Instagram)",
        level: 96,
        years: "4+ yrs",
        highlight:
          "$10k+ managed ad spend, full-funnel CAPI/Pixel, custom & lookalike audiences, catalog sales & creative A/B testing",
      },
      {
        name: "Google Ads (Search, Display & Performance Max)",
        level: 92,
        years: "3+ yrs",
        highlight:
          "High-intent keyword harvesting, negative keyword pruning, Smart Bidding, conversion tracking & ROAS scaling",
      },
      {
        name: "Technical & On-Page SEO (Search Engine Optimization)",
        level: 95,
        years: "5+ yrs",
        highlight:
          "Core Web Vitals, Schema.org structured data, semantic content clustering, backlink auditing & SERP dominance",
      },
      {
        name: "Meta Ads Cohort Mentorship & Education (1,000+ Students)",
        level: 96,
        years: "2+ yrs",
        highlight:
          "Conducted comprehensive classes for 1,000+ business owners, aspiring entrepreneurs & recent graduates",
      },
      {
        name: "Conversion Rate Optimization (CRO) & Funnel Design",
        level: 91,
        years: "4+ yrs",
        highlight:
          "Landing page friction reduction, multi-step checkout funnels, Google Analytics 4 tracking & heatmaps",
      },
    ],
  },
  {
    id: "web3-mobile",
    category: "Mobile (Flutter/AR), Web3 & Cybersecurity",
    shortLabel: "Mobile, Web3 & Security",
    subtitle:
      "Cross-platform Flutter & AR sensor fusion apps, Solidity smart contracts & cybersecurity forensic analysis",
    skills: [
      {
        name: "Flutter, Dart & Riverpod (iOS / Android)",
        level: 88,
        years: "4+ yrs",
        highlight:
          "Production Flutter development at Aasha Tech, Riverpod state management, EcommerceApp & localho_app",
      },
      {
        name: "Mobile AR Sensor Fusion & 3D Terrain Engines",
        level: 85,
        years: "2+ yrs",
        highlight:
          "Skyline-AR: compass/gyroscope/accelerometer/GPS fusion, three_terrain, peak_model, sky_engine & astro_math",
      },
      {
        name: "Solidity, Hardhat, Brownie & Smart Contracts",
        level: 82,
        years: "3+ yrs",
        highlight:
          "On-chain SVG NFTs, Chainlink VRF lottery, ERC-20 tokens, Uniswap/Uber Web3 dApps & Coursera Blockchain Certified",
      },
      {
        name: "Cybersecurity, Penetration Testing & Forensic Analysis",
        level: 80,
        years: "4+ yrs",
        highlight:
          "Incident response, forensic analysis, cyber threat detection/mitigation (Coursera Certified) & Java",
      },
    ],
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "meta-ads-growth-consultant",
    role: "Meta Ads Instructor & Growth Marketing Consultant",
    organization: "Meta Ads Masterclass & Growth Consulting",
    location: "Kathmandu, Nepal · Hybrid",
    period: "Jan 2023 – Present",
    type: "Masterclass & Advisory",
    summary:
      "Conducted practical Meta Ads masterclasses educating 1,000+ individuals—including business owners, aspiring entrepreneurs, and recent graduates—while managing over $10k+ in paid campaigns across Meta and Google Ads, paired with high-impact technical SEO audits.",
    achievements: [
      "Conducted live Meta Ads masterclasses for over 1,000+ individuals, mentoring business owners, aspiring entrepreneurs, and recent university graduates on full-funnel campaign architecture.",
      "Managed $10,000+ in profitable paid advertising spend across Meta Ads (Facebook/Instagram) and Google Ads (Search/PMax), achieving an average 3.8x to 5.2x return on ad spend (ROAS).",
      "Delivered technical and on-page SEO strategies resulting in top organic Google rankings, Core Web Vitals optimization, and steady organic customer acquisition without recurring ad cost.",
      "Guided students through hands-on campaign creation, pixel and Meta Conversions API (CAPI) event mapping, ad creative copywriting, and retargeting workflows.",
    ],
    technologies: [
      "Meta Ads Manager",
      "Google Ads",
      "Technical SEO",
      "Meta Pixel & CAPI",
      "Conversion Funnels",
      "Google Analytics 4",
      "A/B Split Testing",
      "Cohort Mentorship",
    ],
  },
  {
    id: "chitrabazar-ba",
    role: "Business Analyst",
    organization: "Chitrabazar",
    location: "Kathmandu, Bāgmatī, Nepal",
    period: "Jan 2023 – Present",
    type: "Full-time",
    summary:
      "Leading IT business analysis, product planning, and full-stack technical architecture for Chitrabazar's digital photography, archival printmaking, and bilingual EdTech initiatives.",
    achievements: [
      "Spearheaded IT Business Analysis, Business Analysis Planning & Monitoring, and technical product architecture across Chitrabazar's digital platforms.",
      "Built and architected Chitrabazaar_PhotoPrint (https://chitrabazaar.vercel.app) using Next.js App Router, TypeScript, PostgreSQL, Prisma ORM, NextAuth, AWS S3, Sharp SIMD worker pipelines, pg-boss job queues, Stripe, Google Maps, and Recharts.",
      "Contributed to and co-engineered Be Your Own Marketer (chitrabazaarnp-bit/Be-Your-Own-Marketer — https://beyourownmarketeracademy.com/ & https://byom-tau.vercel.app) featuring bilingual EN/NE localization and Google Gemini AI (@google/genai) integration.",
      "Bridged business objectives, financial planning, and engineering execution to streamline studio fulfillment and client conversion workflows.",
    ],
    technologies: [
      "IT Business Analysis",
      "Business Analysis Planning & Monitoring",
      "Problem Solving",
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma ORM",
      "AWS S3",
      "Stripe",
      "Google Gemini AI",
    ],
  },
  {
    id: "allstocknepal-cofounder",
    role: "Co-Founder",
    organization: "AllStockNepal",
    location: "Kathmandu, Bāgmatī, Nepal",
    period: "Jun 2022 – Jan 2023",
    type: "Co-Founder · Full-time",
    summary:
      "Co-founded AllStockNepal, driving startup venture strategy, product management, business analytics, and end-to-end e-commerce platform engineering.",
    achievements: [
      "Led product development, business analysis, strategic planning, and startup operations from concept to live launch.",
      "Built and deployed the AllStockNepal e-commerce platform (https://allstocknepal.vercel.app / ecommerce-website-nextjs) with Next.js, Clerk authentication, dynamic inventory management, and a dedicated Seller Dashboard.",
      "Applied business analytics and co-creation methodologies to align merchant onboarding, catalog UX, and checkout conversion.",
    ],
    technologies: [
      "Product Development",
      "Business Analysis",
      "Product Management",
      "Business Analytics",
      "Start-up Leadership",
      "Start-up Ventures",
      "Co-creation",
      "Next.js",
      "Clerk Auth",
      "Tailwind CSS",
    ],
  },
  {
    id: "aasha-tech-flutter-dev",
    role: "Junior Flutter Developer",
    organization: "Aasha Tech",
    location: "Kathmandu, Nepal",
    period: "Oct 2021 – Oct 2022",
    type: "Full-time · On-site",
    summary:
      "Developed and shipped cross-platform mobile applications for Android and iOS using Flutter, Dart, and Firebase with a focus on responsive front-end architecture and performance optimization.",
    achievements: [
      "Engineered production cross-platform mobile features using Flutter and Dart with clean state management and reusable UI components.",
      "Integrated Firebase authentication, Cloud Firestore real-time databases, and RESTful APIs for seamless mobile user experiences.",
      "Collaborated closely with designers and backend engineers to optimize app startup times, frame rates, and client delivery milestones.",
    ],
    technologies: [
      "Flutter",
      "Dart",
      "Firebase",
      "Front-End Development",
      "REST APIs",
      "Mobile UI/UX",
    ],
  },
  {
    id: "aasha-tech-flutter-intern",
    role: "Flutter Intern",
    organization: "Aasha Tech",
    location: "Kathmandu, Bāgmatī, Nepal",
    period: "Jun 2021 – Sep 2021",
    type: "Internship · On-site",
    summary:
      "Completed an intensive on-site mobile engineering internship building responsive Flutter user interfaces and learning production software delivery workflows.",
    achievements: [
      "Built adaptive Material and Cupertino mobile screens in Flutter and Dart from Figma specifications.",
      "Assisted in debugging, state management integration, and front-end mobile feature testing prior to promotion to Junior Flutter Developer.",
    ],
    technologies: [
      "Flutter",
      "Dart",
      "Front-End Development",
      "Git",
    ],
  },
  {
    id: "open-source-fullstack",
    role: "Full Stack Developer & Open Source Contributor",
    organization: "GitHub (@prashantsingh55) & Client Consulting",
    location: "Kathmandu, Bāgmatī, Nepal",
    period: "May 2017 – Present",
    type: "Open Source & Product Engineering",
    summary:
      "Architected and published 26+ public GitHub repositories spanning production Next.js portals, Flutter AR sensor-fusion apps, Python FastAPI scrapers, and Ethereum Solidity smart contracts.",
    achievements: [
      "Delivered live production platforms including Kalash Events Pvt. Ltd., Sharada Academy International School, ROKPA International Nepal Portal, USA Limos Service, and Top AI Tools Directory.",
      "Engineered Skyline-AR in Flutter with real-time camera feed, sensor fusion (compass, accelerometer/gyroscope, GPS), 3D terrain modeling (three_terrain), mountain peak identification (peak_model, terrain_engine), and astronomical sky calculations (sky_engine, astro_math).",
      "Built Python Data-Scraper pipelines using FastAPI, Uvicorn, BeautifulSoup4, Pandas, SQLAlchemy, PostgreSQL (psycopg2), HTTPX, and Pytest, alongside Solidity/Brownie Web3 dApps.",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Python",
      "FastAPI",
      "Flutter",
      "Solidity",
      "PostgreSQL",
      "MongoDB",
    ],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    degree: "Master of Business Administration (MBA)",
    institution: "Lincoln University College",
    period: "May 2023 – May 2025",
    honors: "Postgraduate Degree",
    description:
      "Graduate business administration program focusing on strategic planning, IT business analysis, financial management, startup leadership, and organizational operations.",
    focusAreas: [
      "Strategic Planning & IT Business Analysis",
      "Financial Management & Startup Economics",
      "Product Management & Executive Leadership",
      "Business Analytics & Operations Strategy",
    ],
  },
  {
    degree:
      "Bachelor of Technology — Computer Science and Information Technology (B.Sc. CSIT)",
    institution: "Texas International College",
    period: "2016 – 2020",
    honors: "Computer Science & IT",
    description:
      "Four-year undergraduate degree in Computer Science and Information Technology covering software engineering, algorithms, relational databases, computer networks, cybersecurity, and full-stack development.",
    focusAreas: [
      "Software Engineering & System Design",
      "Data Structures, Algorithms & Java/JavaScript",
      "Database Management Systems (SQL & PostgreSQL)",
      "Computer Networks, Cybersecurity & Digital Forensics",
      "Web & Mobile Application Development",
    ],
  },
  {
    degree: "Science (+2 High School)",
    institution: "KMC Bagbazar, Kathmandu (Kathmandu Model College)",
    period: "2014 – 2016",
    honors: "Higher Secondary Science",
    description:
      "Higher secondary education in Science at Kathmandu Model College (KMC Bagbazar) with concentration in Physics, Chemistry, Mathematics, and Computer Science.",
    focusAreas: [
      "Mathematics & Analytical Problem Solving",
      "Physics & Scientific Computing",
      "Computer Science Fundamentals",
    ],
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: "blockchain-basics",
    title: "Blockchain Basics",
    issuer: "Coursera",
    issued: "Dec 2021",
    credentialId: "5X3CK886JFLM",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/verify/5X3CK886JFLM",
    domain: "Web3, Ethereum & Smart Contracts",
  },
  {
    id: "penetration-testing-forensics",
    title: "Penetration Testing, Incident Response and Forensics",
    issuer: "Coursera",
    issued: "Jul 2020",
    credentialId: "WL3C7MANKALG",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/verify/WL3C7MANKALG",
    domain: "Cybersecurity, Penetration Testing & Forensics",
  },
  {
    id: "detecting-mitigating-cyber-threats",
    title: "Detecting and Mitigating Cyber Threats and Attacks",
    issuer: "Coursera",
    issued: "Jul 2020",
    credentialId: "AGSM9VMG7SRC",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/verify/AGSM9VMG7SRC",
    domain: "Cyber Threat Intelligence & Defense",
  },
];

export const SKILL_ASSESSMENTS: string[] = ["Java", "JavaScript"];
