import { Project, ProjectCategory } from "@/types";

export const PROJECT_CATEGORIES: { id: ProjectCategory; label: string; count?: number }[] = [
  { id: "all", label: "All Work" },
  { id: "fullstack", label: "Full-Stack & Next.js" },
  { id: "web3", label: "Web3 & Blockchain" },
  { id: "mobile", label: "Mobile & AR" },
  { id: "opensource", label: "Open Source & Tools" },
];

export const projects: Project[] = [
  {
    id: "byom-academy",
    title: "BeYourOwnMarketer — BYOM Academy",
    subtitle: "Bilingual (EN/NE) EdTech & Content Creation Academy",
    description:
      "Interactive EdTech platform for Nepal's practical digital marketing academy featuring bilingual EN/NE localization, Google Gemini AI (@google/genai) integration, and live production academy platform.",
    longDescription:
      "Designed for entrepreneurs, business owners, and creators in Nepal (`BeYourOwnMarketer`, `Byom`, and `chitrabazaarnp-bit/Be-Your-Own-Marketer`), BYOM delivers a high-converting bilingual (English & Nepali) learning experience at `https://beyourownmarketeracademy.com/` (alongside mirror `https://byom-tau.vercel.app`). It integrates Google Gemini AI (`@google/genai`) for interactive marketing assistance alongside 7-module curriculum breakdowns covering Meta Ads, AI Content Creation, and Conversion Funnels.",
    highlights: [
      "Instant English / नेपाली language switcher across all marketing and 7-module curriculum content",
      "Integrated Google Gemini AI (@google/genai) assistant for interactive campaign planning and copy ideation",
      "Primary live production academy: https://beyourownmarketeracademy.com/ with mirror at byom-tau.vercel.app",
      "Live cohort seat availability tracker and streamlined student enrollment portal",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Google Gemini AI (@google/genai)",
      "Tailwind CSS",
      "Framer Motion",
      "Vercel",
    ],
    category: "fullstack",
    githubLink: "https://github.com/prashantsingh55/BeYourOwnMarketer",
    demoLink: "https://beyourownmarketeracademy.com/",
    secondaryDemoLink: "https://byom-tau.vercel.app",
    secondaryDemoLabel: "BYOM App (byom-tau)",
    image: "/projects/byom-academy.png",
    featured: true,
    year: "2026",
    metrics: "Bilingual EN/NE • Live Academy",
    status: "Live Production",
  },
  {
    id: "chitrabazaar",
    title: "Chitrabazaar — Photo & Print Marketplace",
    subtitle: "Physical Photography & Archival Printmaking Marketplace",
    description:
      "Multi-role marketplace connecting digital photographers with certified physical darkrooms across Kathmandu Valley, powered by Next.js App Router, Prisma, PostgreSQL, AWS S3, Sharp SIMD workers, and Stripe.",
    longDescription:
      "Chitrabazaar bridges digital visual art and museum-grade archival printmaking across Kathmandu, Patan, and Bhaktapur. Architected with Next.js App Router, TypeScript, PostgreSQL, Prisma ORM, and NextAuth, the platform features role-based workspace views (Client Folio, Darkroom Studio, and Curator HQ), AWS S3 storage with a Sharp SIMD worker image processing pipeline, pg-boss background job queues, Stripe checkout, Google Maps darkroom discovery, and Recharts studio analytics.",
    highlights: [
      "Interactive Print Commission Estimator calculating substrate, framing, and darkroom fulfillment costs",
      "Three distinct role portals (Client Folio, Darkroom Studio Queue, Curator HQ) secured via NextAuth & Prisma ORM on PostgreSQL",
      "High-throughput Sharp SIMD worker image pipeline, AWS S3 media storage, and pg-boss asynchronous job queue",
      "Integrated Stripe payments, Google Maps studio geolocation, and Recharts financial/fulfillment telemetry",
    ],
    technologies: [
      "Next.js App Router",
      "TypeScript",
      "PostgreSQL",
      "Prisma ORM",
      "NextAuth",
      "AWS S3",
      "Sharp SIMD",
      "pg-boss",
      "Stripe",
      "Google Maps",
      "Recharts",
      "Tailwind CSS",
    ],
    category: "fullstack",
    githubLink: "https://github.com/prashantsingh55/Chitrabazaar_PhotoPrint",
    demoLink: "https://chitrabazaar.vercel.app",
    image: "/projects/chitrabazaar.png",
    featured: true,
    year: "2026",
    metrics: "3 Role Portals • Sharp SIMD & pg-boss",
    status: "Live Production",
  },
  {
    id: "kalash-events",
    title: "Kalash Events Pvt. Ltd.",
    subtitle: "Cultural Pageants, National Events & Live Audition Platform",
    description:
      "Premier event management and national talent pageant portal in Kathmandu featuring online audition registration, an interactive Event Budget Estimator, video hub, and past productions showcase.",
    longDescription:
      "Built for Kalash Events Pvt. Ltd. (established 2073 B.S. in Kathmandu), this Next.js and TypeScript platform powers national cultural pageants including Little Kalash, Miss Teej, and National Cultural Pageants. It combines editorial storytelling with interactive booking tools, live audition onboarding, and a real-time event budget calculator.",
    highlights: [
      "Interactive Event Budget Estimator for custom corporate, wedding, and pageant productions",
      "Multi-step online audition registration workflow for national talent pageants",
      "Curated media gallery and embedded video showcase with 15+ landmark events and 50+ talent alumni",
      "Responsive dark/gold luxury aesthetic optimized for Core Web Vitals",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
    category: "fullstack",
    githubLink: "https://github.com/prashantsingh55/Kalash-Events",
    demoLink: "https://kalash-events.vercel.app",
    image: "/projects/kalash-events.png",
    featured: true,
    year: "2026",
    metrics: "15+ National Events • 50+ Talent Alumni",
    status: "Live Production",
  },
  {
    id: "sharada-academy",
    title: "Sharada Academy International School",
    subtitle: "Modern K-10 International Curriculum & Admissions Portal",
    description:
      "Comprehensive educational portal for Sharada Academy in Kathmandu showcasing IPC/IMYC international curricula, interactive campus video tours, and online admissions.",
    longDescription:
      "Built for Sharada Academy (Gyaneshwor, Kathmandu), this modern school portal presents the International Early Years (IEYC), Primary (IPC), and Middle Years (IMYC) programs. It includes an interactive video hero, Principal's welcome, co-curricular clubs explorer, and digital inquiry/admissions workflows.",
    highlights: [
      "Structured academic pathways for IEYC, IPC, and IMYC global curricula",
      "Interactive campus tour media player and student life showcase",
      "Digital admissions inquiry and parent scheduling system",
      "Accessible, parent-friendly information architecture",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "React", "Vercel"],
    category: "fullstack",
    githubLink: "https://github.com/prashantsingh55/School",
    demoLink: "https://school-phi-sooty.vercel.app",
    image: "/projects/sharada-academy.png",
    featured: true,
    year: "2026",
    metrics: "IEYC / IPC / IMYC Curricula • 1:12 Ratio",
    status: "Live Production",
  },
  {
    id: "allstock-ecommerce",
    title: "AllStock Nepal / QuickCart E-Commerce",
    subtitle: "Full-Stack Multi-Vendor E-Commerce Storefront & Seller Dashboard",
    description:
      "Full-stack Next.js e-commerce platform integrated with Clerk authentication, dynamic cart management, product search, and a dedicated Seller Dashboard.",
    longDescription:
      "An end-to-end e-commerce platform built with Next.js App Router, Clerk user authentication, and Tailwind CSS. Shoppers can browse categorized electronics and lifestyle products, manage persistent carts, and complete checkouts, while merchants manage inventory and orders through a protected Seller Dashboard.",
    highlights: [
      "Role-based Clerk authentication with buyer profiles and protected Seller Dashboard",
      "Dynamic product catalog filtering, search, wishlist, and cart state management",
      "Responsive promotional hero carousels and featured deal showcases",
      "RESTful API routes for product inventory and order lifecycle management",
    ],
    technologies: ["Next.js", "Clerk Auth", "JavaScript", "Tailwind CSS", "REST API"],
    category: "fullstack",
    githubLink: "https://github.com/prashantsingh55/ecommerce-website-nextjs",
    demoLink: "https://allstocknepal.vercel.app",
    image: "/projects/allstock-nepal.png",
    featured: true,
    year: "2025",
    metrics: "Clerk Auth • Seller Dashboard",
    status: "Live Production",
  },
  {
    id: "rokpa-guest-house",
    title: "ROKPA International — Nepal Humanitarian Portal",
    subtitle: "Social Enterprise Hospitality & Humanitarian Aid Platform",
    description:
      "Nepali-language humanitarian portal and social enterprise showcase for ROKPA International featuring an interactive multi-tier donation modal, impact metrics, and dark mode.",
    longDescription:
      "Created for ROKPA International's initiatives in Nepal (spanning 40+ years of service across children's homes, medical clinics, women's empowerment workshops, and the ROKPA Guest House in Boudha), this platform enables donors and visitors to explore programs and contribute directly via an interactive donation flow.",
    highlights: [
      "Interactive donation modal with preset impact tiers ($25, $50, $100, $250, and custom amounts)",
      "Full Nepali (नेपाली) localization with accessible typography and dark-mode toggle",
      "Showcases 6 core humanitarian programs including Children's Home, Medical Aid, and Eco-Hospitality",
      "Zero-dependency fast-loading architecture",
    ],
    technologies: ["HTML5", "Tailwind CSS", "JavaScript", "Responsive UI"],
    category: "fullstack",
    githubLink: "https://github.com/prashantsingh55/Rokpa-Guest-House-",
    demoLink: "https://rokpa-guest-house.vercel.app",
    image: "/projects/rokpa-guest-house.png",
    featured: false,
    year: "2026",
    metrics: "40+ Years Impact • 6 Core Programs",
    status: "Live Production",
  },
  {
    id: "usa-limos-service",
    title: "USA Limos Service — The Obsidian Standard",
    subtitle: "Luxury Chauffeur & Executive Fleet Reservation Web App",
    description:
      "Bespoke luxury ground transportation platform featuring an interactive 3-step chauffeur reservation engine, fleet class comparison, and airport FBO tracking features.",
    longDescription:
      "Engineered with an ultra-refined obsidian-and-champagne design language, USA Limos Service streamlines executive ground transfers, hourly charters, and aviation FBO pickups. Users can configure trip type, pickup/dropoff locations, dates, and passenger counts right from the hero booking engine.",
    highlights: [
      "Interactive 3-step chauffeur booking wizard (Point-to-Point, Hourly Charter, Airport Transfer)",
      "Executive fleet showcase covering First Class Sedans, Executive SUVs, and VIP Sprinters",
      "Real-time flight tracking and diplomatic security feature modules",
      "Sub-second initial load with custom obsidian design tokens",
    ],
    technologies: ["HTML5", "Tailwind CSS", "JavaScript", "UI/UX Architecture"],
    category: "fullstack",
    githubLink: "https://github.com/prashantsingh55/Limo-Rental-Prototype",
    demoLink: "https://limo-rental-prototype.vercel.app",
    image: "/projects/usa-limos.png",
    featured: false,
    year: "2026",
    metrics: "99.9% On-Time SLA • 3-Step Booking Engine",
    status: "Live Production",
  },
  {
    id: "top-ai-tools",
    title: "Top AI Tools Directory",
    subtitle: "Curated Discovery Platform for Modern Generative AI Tools",
    description:
      "Next.js and TypeScript directory indexing top artificial intelligence tools across coding, design, productivity, and copywriting with instant search and category filters.",
    longDescription:
      "Top AI Tools helps developers, marketers, and creators discover and compare generative AI platforms. Built with Next.js App Router and TypeScript, it provides fast client-side filtering, tool comparisons, pricing model tags, and direct workflow recommendations.",
    highlights: [
      "Instant search and category filtering across AI productivity, coding, and media tools",
      "Structured metadata cards with pricing tiers and capability tags",
      "Built with Next.js App Router and strict TypeScript",
      "Clean, distraction-free card grid with responsive breakpoints",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    category: "fullstack",
    githubLink: "https://github.com/prashantsingh55/Top-AI-Tools-webste-nextjs",
    demoLink: "https://topaitools-gamma.vercel.app",
    image: "/projects/top-ai-tools.png",
    featured: false,
    year: "2025",
    metrics: "Curated AI Directory • Instant Search",
    status: "Live Production",
  },
  {
    id: "web3-uniswap-uber-clones",
    title: "Web3 Decentralized Clones (Uniswap & Uber dApps)",
    subtitle: "Decentralized Exchange & Ride-Hailing Blockchain Applications",
    description:
      "Full-stack Web3 decentralized applications replicating Uniswap token swapping and Uber peer-to-peer ride coordination powered by Ethereum smart contracts.",
    longDescription:
      "Combining two flagship Web3 repositories (`unswap-clone-blockchain` and `uber-clone-blockchain`), these decentralized applications connect React/Next.js frontends with Ethereum wallets (MetaMask) and Solidity smart contracts to enable trustless token liquidity swaps and on-chain ride fare settlement.",
    highlights: [
      "Automated market maker (AMM) token swap interface inspired by Uniswap protocol",
      "Decentralized ride request and crypto fare settlement workflow (`uber-clone-blockchain`)",
      "MetaMask wallet connection, transaction state tracking, and smart contract ABI bindings",
      "End-to-end Web3 architecture demonstrating decentralized state management",
    ],
    technologies: ["Solidity", "Hardhat", "JavaScript", "React", "Web3.js", "Ethereum", "Smart Contracts"],
    category: "web3",
    githubLink: "https://github.com/prashantsingh55/unswap-clone-blockchain",
    image: "/projects/web3-clones.png",
    featured: true,
    year: "2022",
    metrics: "DeFi Swap & Web3 Mobility dApps",
    status: "Smart Contract / dApp",
  },
  {
    id: "onchain-nfts-smartcontract-lottery",
    title: "All-on-Chain SVG NFTs & Chainlink VRF Lottery",
    subtitle: "Solidity Smart Contracts with Provably Fair Randomness & On-Chain Metadata",
    description:
      "Suite of Solidity smart contracts built with Python Brownie featuring 100% on-chain SVG NFT generation, Chainlink VRF verifiable randomness lottery, and ERC-20 tokens.",
    longDescription:
      "Encompassing `All-on-Chain-NFTs`, `smartcontract-lottery`, `ERC20-Tokens`, and `brownie_fund_me`, this smart-contract engineering suite implements decentralized primitives in Solidity and Python Brownie. NFTs store both SVG artwork and attributes directly on-chain without centralized IPFS dependencies, while the lottery contract uses Chainlink VRF and Keepers for tamper-proof winner selection.",
    highlights: [
      "100% on-chain base64-encoded SVG NFT minting and metadata rendering (`All-on-Chain-NFTs`)",
      "Provably fair decentralized lottery using Chainlink VRF randomness and price feeds (`smartcontract-lottery`)",
      "Custom ERC-20 token standard implementation and crowdfunding escrow (`ERC20-Tokens`, `brownie_fund_me`)",
      "Automated unit and testnet integration tests written in Python with Eth-Brownie",
    ],
    technologies: ["Solidity", "Python", "Brownie", "Chainlink VRF", "ERC-721 / ERC-20", "Ethereum"],
    category: "web3",
    githubLink: "https://github.com/prashantsingh55/All-on-Chain-NFTs",
    image: "/projects/onchain-nfts.png",
    featured: true,
    year: "2022",
    metrics: "4 Smart Contract Repos • 100% On-Chain SVG",
    status: "Smart Contract / dApp",
  },
  {
    id: "skyline-ar-mobile",
    title: "Skyline-AR — Mountain Peak & Celestial AR App",
    subtitle: "Mountain Peak & Celestial Augmented Reality App in Flutter",
    description:
      "Mountain Peak & Celestial Augmented Reality app in Flutter featuring real-time camera feed, sensor fusion (compass, accelerometer/gyroscope, GPS), 3D terrain modeling (`three_terrain`), peak identification, and a time-travel celestial simulator.",
    longDescription:
      "Built in Flutter and Dart with Riverpod (`Skyline-AR`), this Mountain Peak & Celestial Augmented Reality application overlays 3D terrain ridges (`three_terrain`), mountain peak names (`peak_model`, `terrain_engine`), and astronomical sky objects (`sky_engine`, `astro_math`) directly onto a real-time camera feed using hardware sensor fusion (compass magnetometer, accelerometer/gyroscope, and GPS geolocation) plus an interactive time-travel celestial simulator. Complemented by cross-platform mobile commerce repositories (`EcommerceApp`, `localho_app`).",
    highlights: [
      "Real-time camera AR overlay driven by multi-sensor fusion (compass, accelerometer/gyroscope & GPS geolocation)",
      "3D terrain modeling (`three_terrain`) and mountain peak identification engine (`peak_model`, `terrain_engine`)",
      "Astronomical sky calculation engine (`sky_engine`, `astro_math`) with interactive time-travel celestial simulator",
      "Cross-platform Flutter & Riverpod architecture alongside companion apps (`EcommerceApp`, `localho_app`)",
    ],
    technologies: [
      "Flutter",
      "Dart",
      "Riverpod",
      "AR Sensor Fusion",
      "3D Terrain (three_terrain)",
      "Astro Math & Sky Engine",
      "GPS & Gyroscope",
      "iOS & Android",
    ],
    category: "mobile",
    githubLink: "https://github.com/prashantsingh55/Skyline-AR",
    image: "/projects/skyline-ar.png",
    featured: true,
    year: "2026",
    metrics: "Peak & Celestial AR • Sensor Fusion",
    status: "Mobile App",
  },
  {
    id: "task-chat-realtime-suite",
    title: "Real-Time Task Manager & Socket.io Chat Suite",
    subtitle: "Collaborative Workspace & Instant Messaging Applications",
    description:
      "Full-stack collaborative task management application and real-time Socket.io chat platform with live presence indicators, room channels, and MongoDB persistence.",
    longDescription:
      "Featured in Prashant's core full-stack showcase, this real-time productivity suite combines a Kanban/list Task Management App with a multi-room Chat Application. Powered by React, Node.js, Express, MongoDB, and Socket.io, teams receive instant state updates across connected clients without page reloads.",
    highlights: [
      "Bi-directional WebSocket communication using Socket.io for instant task and message sync",
      "Private and group chat rooms with typing indicators and online user presence",
      "Task prioritization, status workflows, and deadline tracking backed by MongoDB",
      "RESTful API authentication and responsive dashboard layout",
    ],
    technologies: ["React", "Node.js", "MongoDB", "Socket.io", "Express", "Tailwind CSS"],
    category: "opensource",
    githubLink: "https://github.com/prashantsingh55/portfolio-website-nextjs",
    image: "/projects/task-manager.webp",
    featured: false,
    year: "2025",
    metrics: "Real-Time WebSockets • MongoDB",
    status: "Open Source",
  },
  {
    id: "python-data-scraper",
    title: "Python FastAPI Data Scraper & Analytics Pipeline",
    subtitle: "FastAPI, BeautifulSoup4, Pandas & PostgreSQL Data Extraction Service",
    description:
      "Automated web scraping API and data pipeline built with Python, FastAPI, Uvicorn, BeautifulSoup4, Pandas, SQLAlchemy, PostgreSQL (psycopg2), HTTPX, and Pytest.",
    longDescription:
      "Developed in Python (`Data-Scraper`), this full-featured data extraction backend combines asynchronous HTTPX fetching and BeautifulSoup4 DOM parsing with Pandas data transformation, SQLAlchemy ORM persistence on PostgreSQL (`psycopg2`), REST API endpoints served via FastAPI and Uvicorn, and automated verification with Pytest.",
    highlights: [
      "RESTful scraping and dataset ingestion endpoints powered by FastAPI and Uvicorn",
      "Asynchronous web fetching with HTTPX, HTML DOM extraction via BeautifulSoup4, and Pandas data cleaning",
      "Relational persistence and schema modeling using SQLAlchemy and PostgreSQL (psycopg2)",
      "Automated test suite engineered with Pytest for reliable parser and API verification",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "Uvicorn",
      "BeautifulSoup4",
      "Pandas",
      "SQLAlchemy",
      "PostgreSQL (psycopg2)",
      "HTTPX",
      "Pytest",
    ],
    category: "opensource",
    githubLink: "https://github.com/prashantsingh55/Data-Scraper",
    image: "/projects/data-scraper.png",
    featured: true,
    year: "2025",
    metrics: "FastAPI • Pandas • PostgreSQL",
    status: "Open Source",
  },
];

export function filterProjects(
  allProjects: Project[],
  category: ProjectCategory = "all",
  searchQuery: string = ""
): Project[] {
  const normalizedCategory = category.trim().toLowerCase() as ProjectCategory;
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return allProjects.filter((project) => {
    const matchesCategory =
      normalizedCategory === "all" || project.category === normalizedCategory;

    if (!matchesCategory) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const searchableText = [
      project.title,
      project.subtitle,
      project.description,
      project.longDescription,
      project.status,
      project.year,
      ...project.technologies,
      ...project.highlights,
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}

export function getFeaturedProjects(allProjects: Project[]): Project[] {
  return allProjects.filter((project) => project.featured);
}
