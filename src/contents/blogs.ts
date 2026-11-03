import { Blog } from "@/types";

export const blogs: Blog[] = [
  {
    title: "Getting Started with Next.js 14",
    excerpt: "Learn about the new features and improvements in Next.js 14.",
    date: "2024-03-15",
    readTime: "5 min read",
    slug: "getting-started-with-nextjs-14",
    category: "Next.js & Architecture",
    tags: ["Next.js", "React Server Components", "App Router", "Server Actions"],
    content: [
      "Next.js 14 marked a major milestone in full-stack React engineering by stabilizing Server Actions, introducing Partial Prerendering (PPR) previews, and dramatically accelerating local development startup times with Turbopack.",
      "With React Server Components (RSC) at the core of the App Router, data fetching moves closer to the database without shipping heavy client-side JavaScript bundles. Components are server-first by default, allowing you to query PostgreSQL, MongoDB, or external REST APIs directly inside async components.",
      "When building production platforms like Kalash Events, Chitrabazaar, and AllStock Nepal, combining Server Components for initial SEO-critical content with targeted `'use client'` islands for interactive calculators and modals yields the best balance of speed and interactivity.",
      "Server Actions further simplify mutations—eliminating boilerplate API routes for form submissions, progressive enhancement, and automatic cache revalidation via `revalidatePath` and `revalidateTag`.",
    ],
    codeSnippet: {
      language: "tsx",
      title: "app/projects/page.tsx — Async Server Component Pattern",
      code: `export default async function ProjectsPage() {
  const projects = await getFeaturedProjects();
  return (
    <section className="grid gap-6 md:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </section>
  );
}`,
    },
  },
  {
    title: "Mastering TypeScript for React",
    excerpt: "A comprehensive guide to using TypeScript with React applications.",
    date: "2024-03-10",
    readTime: "8 min read",
    slug: "mastering-typescript-for-react",
    category: "TypeScript & Frontend",
    tags: ["TypeScript", "React", "Generics", "Type Safety"],
    content: [
      "TypeScript transforms React development from runtime guesswork into compile-time confidence. By modeling component props, discriminated union states, and API payloads explicitly, teams eliminate entire classes of `undefined is not a function` bugs before code ever reaches production.",
      "One of the highest-leverage TypeScript patterns in React is using discriminated unions for asynchronous state machines and multi-role UI views. Instead of juggling multiple boolean flags (`isLoading`, `isError`, `isSuccess`), a single `status: 'idle' | 'submitting' | 'success' | 'error'` union narrows state deterministically.",
      "Additionally, generic components and utility types like `ComponentPropsWithoutRef<'button'>`, `Record<K, V>`, and `Exclude<Category, 'all'>` allow design-system primitives to remain both flexible and strictly typed across dozens of views.",
    ],
    codeSnippet: {
      language: "ts",
      title: "Discriminated Union for Form Submission State",
      code: `type SubmissionState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; timestamp: string }
  | { status: "error"; message: string };`,
    },
  },
  {
    title: "Building Responsive Layouts with Tailwind CSS",
    excerpt: "Tips and tricks for creating responsive designs using Tailwind CSS.",
    date: "2024-03-05",
    readTime: "6 min read",
    slug: "building-responsive-layouts-with-tailwind-css",
    category: "CSS & UI Design",
    tags: ["Tailwind CSS", "Responsive Design", "CSS Grid", "Dark Mode"],
    content: [
      "Tailwind CSS enables rapid, systematic UI engineering when paired with disciplined layout primitives. Rather than scattering arbitrary pixel widths, modern responsive layouts rely on CSS Grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`), fluid typography (`clamp()`), and semantic spacing scales.",
      "When designing multi-device experiences—from mobile commuters browsing in Kathmandu to desktop curators inspecting high-resolution photography—start mobile-first. Ensure touch targets meet the 44×44px minimum accessibility threshold and avoid horizontal overflow.",
      "Combining Tailwind's utility classes with native CSS standards like `color-scheme: light dark`, `light-dark()`, and `:has()` creates resilient themes that respect system preferences while preventing Flash of Unstyled/Unthemed Content (FOUC).",
    ],
    codeSnippet: {
      language: "css",
      title: "Adaptive Color Scheme with Zero FOUC",
      code: `:root {
  color-scheme: light dark;
  &:has(> head > meta[name="color-scheme"][content="dark"]) {
    color-scheme: dark;
  }
  &:has(> head > meta[name="color-scheme"][content="light"]) {
    color-scheme: light;
  }
}`,
    },
  },
  {
    title: "Understanding React Hooks",
    excerpt: "A deep dive into React Hooks and how to use them effectively.",
    date: "2024-03-01",
    readTime: "7 min read",
    slug: "understanding-react-hooks",
    category: "React Fundamentals",
    tags: ["React Hooks", "useEffect", "useMemo", "Custom Hooks"],
    content: [
      "React Hooks revolutionized component composition by allowing stateful logic to be extracted, tested, and shared without class hierarchies or wrapper hell. Yet mastering hooks requires understanding the rendering lifecycle and referential equality.",
      "Keep `useState` minimal by deriving computed values during render rather than synchronizing state inside `useEffect`. For example, filtered project lists or active category counts should be calculated directly from `projects`, `selectedCategory`, and `searchQuery`.",
      "Reserve `useEffect` strictly for synchronizing React with external systems: DOM APIs like `<dialog>.showModal()`, `window` storage events, or WebSocket (`Socket.io`) subscriptions—and always return a deterministic cleanup function.",
    ],
    codeSnippet: {
      language: "tsx",
      title: "Deriving State Without Redundant useEffect",
      code: `const visibleProjects = useMemo(
  () => filterProjects(projects, activeCategory, searchQuery),
  [activeCategory, searchQuery]
);`,
    },
  },
  {
    title: "Deploying Next.js Applications on Vercel",
    excerpt: "Step-by-step guide to deploying your Next.js applications on Vercel.",
    date: "2024-02-25",
    readTime: "4 min read",
    slug: "deploying-nextjs-applications-on-vercel",
    category: "DevOps & Cloud",
    tags: ["Vercel", "CI/CD", "Next.js", "Edge Network"],
    content: [
      "Deploying Next.js applications to Vercel transforms every Git push into an immutable, globally distributed deployment with automatic preview URLs, edge caching, and serverless API execution.",
      "To achieve reliable zero-downtime releases and cut deployment times by 50%, enforce strict pre-build checks in your CI pipeline: run `tsc --noEmit` for static type verification, execute automated unit tests (`vitest run`), and verify environment variables before promoting preview builds to production.",
      "Across 10+ live Vercel production deployments—including Kalash Events, Chitrabazaar, BYOM Academy, and Sharada Academy—optimizing images with `next/image` and leveraging static route generation ensures sub-second Largest Contentful Paint (LCP).",
    ],
    codeSnippet: {
      language: "bash",
      title: "Production Pre-Flight Verification Pipeline",
      code: `npm run lint && npm run test && npm run build`,
    },
  },
  {
    title: "Building a RESTful API with Node.js and Express",
    excerpt: "Learn how to create a RESTful API using Node.js and Express.",
    date: "2024-02-20",
    readTime: "10 min read",
    slug: "building-a-restful-api-with-nodejs-and-express",
    category: "Backend Engineering",
    tags: ["Node.js", "Express", "REST API", "PostgreSQL", "Validation"],
    content: [
      "A well-designed RESTful API is the backbone of any scalable full-stack or mobile application. Built with Node.js and Express (or Next.js App Router Route Handlers), production APIs require predictable resource URIs, strict input validation, structured error payloads, and proper HTTP status codes.",
      "Always validate and sanitize incoming request bodies at the boundary. Reject malformed JSON, empty required fields, oversized strings, or invalid email formats with `400 Bad Request` or `422 Unprocessable Entity` before touching database connections.",
      "Pairing clean controller validation with indexed PostgreSQL/MongoDB queries and connection pooling enabled a 40% reduction in database query latency across our production backend services.",
    ],
    codeSnippet: {
      language: "ts",
      title: "Boundary Validation in an API Route Handler",
      code: `if (!name?.trim() || !isValidEmail(email) || !message?.trim()) {
  return NextResponse.json(
    { error: "Please provide a valid name, email, and message." },
    { status: 400 }
  );
}`,
    },
  },
];

export function filterBlogs(
  allBlogs: Blog[],
  category: string = "all",
  searchQuery: string = ""
): Blog[] {
  const normalizedCategory = category.trim().toLowerCase();
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return allBlogs.filter((blog) => {
    const matchesCategory =
      normalizedCategory === "all" ||
      blog.category.toLowerCase() === normalizedCategory;

    if (!matchesCategory) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const searchableText = [
      blog.title,
      blog.excerpt,
      blog.category,
      ...blog.tags,
      ...blog.content,
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}

export function getBlogBySlug(slug: string): Blog | undefined {
  return blogs.find((blog) => blog.slug === slug.trim());
}
