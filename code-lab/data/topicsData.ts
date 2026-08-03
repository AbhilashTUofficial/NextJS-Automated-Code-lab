import { TabType } from "@/context/CodeLabContext";
import automationData from "./automation-run.json";

export interface CodeFile {
  filename: string;
  language: string;
  code: string;
}

export interface TopicDetail {
  id: TabType;
  title: string;
  category: string;
  badge: string;
  exampleCount: number;
  description: string;
  keyHighlights: string[];
  files: CodeFile[];
  documentation: {
    overview: string;
    bestPractices: string[];
    useCases: string[];
  };
  interactiveDemoType?: string;
}

export const LAST_RUN_METADATA = {
  lastRunTimeISO: automationData.lastRunTimeISO,
  lastRunTimeFormatted: automationData.lastRunTimeFormatted,
  automationStatus: automationData.automationStatus,
  scheduleCron: automationData.scheduleCron,
  nextRun: automationData.nextRun,
};

export const RECENT_ENTRY = {
  title: automationData.recentEntry.title,
  category: automationData.recentEntry.category,
  filesCount: automationData.recentEntry.filesCount,
  description: automationData.recentEntry.description,
  highlights: automationData.recentEntry.highlights,
  targetTab: automationData.recentEntry.targetTab as TabType,
};

export const AUTOMATION_STEPS = automationData.automationSteps;

export const TOPIC_CATEGORIES: { id: TabType; label: string; count: number; iconName: string }[] = [
  { id: "app-router", label: "App Router", count: 7, iconName: "FolderTree" },
  { id: "server-components", label: "Server Components", count: 6, iconName: "Cpu" },
  { id: "server-actions", label: "Server Actions", count: 5, iconName: "Zap" },
  { id: "routing-navigation", label: "Routing & Navigation", count: 4, iconName: "GitFork" },
  { id: "data-fetching", label: "Data Fetching", count: 5, iconName: "Download" },
  { id: "caching-revalidation", label: "Caching & Revalidation", count: 4, iconName: "RefreshCw" },
  { id: "middleware", label: "Middleware", count: 3, iconName: "Shield" },
  { id: "authentication", label: "Authentication", count: 3, iconName: "Lock" },
  { id: "ui-styling", label: "UI & Styling", count: 4, iconName: "Palette" },
  { id: "forms", label: "Forms", count: 3, iconName: "FileText" },
  { id: "axios-api-calls", label: "Axios & API Calls", count: 4, iconName: "Code2" },
  { id: "pagination", label: "Pagination", count: 3, iconName: "ListOrdered" },
  { id: "search-filters", label: "Search & Filters", count: 3, iconName: "Search" },
  { id: "infinite-scroll", label: "Infinite Scroll", count: 2, iconName: "Repeat" },
  { id: "performance", label: "Performance", count: 4, iconName: "Gauge" },
  { id: "deployment", label: "Deployment", count: 3, iconName: "Server" },
  { id: "testing", label: "Testing", count: 3, iconName: "TestTube" },
];

export const TOPICS_DATA: Record<string, TopicDetail> = {
  "app-router": {
    id: "app-router",
    title: "App Router Architecture",
    category: "Routing & Architecture",
    badge: "Core Feature",
    exampleCount: 7,
    description: "Master directory-based routing, layout inheritance, error boundaries, and streaming loading UIs in Next.js 14+ App Router.",
    keyHighlights: [
      "Folder-based nesting with layout.tsx and page.tsx",
      "Streaming server components with loading.tsx",
      "Granular error boundaries using error.tsx and global-error.tsx",
      "Route Handlers (route.ts) for web standard Request/Response APIs",
    ],
    documentation: {
      overview:
        "The App Router is built on React Server Components (RSC) and leverages file-system conventions. Routes are defined using directory structures inside the /app folder. Layouts preserve state across navigations and do not re-render.",
      bestPractices: [
        "Keep layouts focused on persistent navigation and shared UI wrappers.",
        "Use loading.tsx for instant loading feedback using React Suspense boundaries.",
        "Group routes using parentheses like (auth) or (dashboard) without affecting URL paths.",
        "Colocate components, hooks, and styles inside feature subfolders.",
      ],
      useCases: [
        "Nested layouts with persistent sidebar state.",
        "Streaming data directly from server components.",
        "REST API endpoints with route.ts.",
      ],
    },
    files: [
      {
        filename: "app/dashboard/layout.tsx",
        language: "typescript",
        code: `import { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}`,
      },
      {
        filename: "app/dashboard/page.tsx",
        language: "typescript",
        code: `import { Suspense } from "react";
import AnalyticsCard from "@/components/AnalyticsCard";
import RecentOrders from "@/components/RecentOrders";

export default async function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
      <Suspense fallback={<div className="h-32 rounded-xl bg-slate-200 animate-pulse" />}>
        <AnalyticsCard />
      </Suspense>
      <RecentOrders />
    </div>
  );
}`,
      },
      {
        filename: "app/api/users/route.ts",
        language: "typescript",
        code: `import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";

  const users = [
    { id: 1, name: "Alice Johnson", role: "Developer" },
    { id: 2, name: "Bob Smith", role: "Designer" }
  ].filter(u => u.name.toLowerCase().includes(query.toLowerCase()));

  return NextResponse.json({ success: true, count: users.length, data: users });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ success: true, message: "User created", data: body }, { status: 201 });
}`,
      },
    ],
  },

  "server-components": {
    id: "server-components",
    title: "React Server Components (RSC)",
    category: "Performance & Rendering",
    badge: "Default in App Router",
    exampleCount: 6,
    description: "Execute components exclusively on the Vercel/Node server to eliminate client JS bundle size and query databases directly.",
    keyHighlights: [
      "Zero client-side JavaScript sent for server components",
      "Direct async/await database & filesystem access",
      "Automatic code splitting and bundle reduction",
      "'use client' directive for interactive client boundaries",
    ],
    documentation: {
      overview:
        "React Server Components render entirely on the server. They cannot use client hooks like useState, useEffect, or browser APIs, but can directly access serverside secrets, ORMs, and APIs without exposure.",
      bestPractices: [
        "Default to Server Components; push 'use client' boundaries as deep in the UI tree as possible.",
        "Pass Server Components as children to Client Component wrappers to avoid converting children into client components.",
        "Do not pass non-serializable values (like functions) from Server to Client Components.",
      ],
      useCases: [
        "Direct Prisma / Drizzle ORM database queries inside pages.",
        "Rendering static markdown or HTML content.",
        "Fetching sensitive third-party APIs without exposing secret keys.",
      ],
    },
    files: [
      {
        filename: "app/products/page.tsx",
        language: "typescript",
        code: `// Server Component by default - async data fetching directly in component
import ProductGrid from "@/components/ProductGrid";
import AddToCartButton from "@/components/AddToCartButton"; // 'use client' inside

async function getProducts() {
  // Direct server DB call or fetch
  return [
    { id: "1", name: "Wireless Headphones", price: 199.99, rating: 4.8 },
    { id: "2", name: "Ergonomic Keyboard", price: 149.50, rating: 4.9 },
  ];
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Featured Gear</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((item) => (
          <div key={item.id} className="p-6 border rounded-xl shadow-sm bg-white">
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="text-gray-600 my-2">\${item.price.toFixed(2)} — ★ {item.rating}</p>
            {/* Interactive button isolated into client component */}
            <AddToCartButton productId={item.id} />
          </div>
        ))}
      </div>
    </div>
  );
}`,
      },
      {
        filename: "components/AddToCartButton.tsx",
        language: "typescript",
        code: `"use client"; // Marks client boundary for interactivity

import { useState } from "react";

export default function AddToCartButton({ productId }: { productId: string }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      className={\`px-4 py-2 rounded-lg font-medium transition-colors \${
        added ? "bg-emerald-600 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
      }\`}
    >
      {added ? "✓ Added to Cart!" : "Add to Cart"}
    </button>
  );
}`,
      },
    ],
  },

  "server-actions": {
    id: "server-actions",
    title: "Server Actions & Mutations",
    category: "Data Mutations",
    badge: "Next.js 14",
    exampleCount: 5,
    description: "Execute server-side functions triggered directly from forms or client components without building separate API routes.",
    keyHighlights: [
      "Zero API boilerplate needed for form submission",
      "Progressive enhancement works even without client JS",
      "useActionState & useFormStatus for submission pending state",
      "revalidatePath & redirect for server-driven UI updates",
    ],
    documentation: {
      overview:
        "Server Actions are asynchronous functions executed on the server. They can be defined inside Server Components or exported from separate files marked with the 'use server' directive.",
      bestPractices: [
        "Always validate input parameters using Zod or similar validation schemas inside Server Actions.",
        "Return structured error/success objects rather than throwing unhandled errors.",
        "Combine with useOptimistic for instant zero-latency UI updates.",
      ],
      useCases: [
        "Form submissions (Sign up, Contact, Settings update).",
        "Inline button actions (Like post, Delete item, Toggle status).",
        "Optimistic list updates.",
      ],
    },
    files: [
      {
        filename: "app/actions/userActions.ts",
        language: "typescript",
        code: `"use server";

import { revalidatePath } from "next/cache";

export interface FormState {
  success?: boolean;
  error?: string;
}

export async function updateProfile(prevState: FormState, formData: FormData): Promise<FormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  if (!name || name.length < 3) {
    return { error: "Name must be at least 3 characters long." };
  }

  // Simulate Server DB update delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Trigger cache invalidation so UI re-renders with fresh data
  revalidatePath("/profile");

  return { success: true };
}`,
      },
      {
        filename: "components/ProfileForm.tsx",
        language: "typescript",
        code: `"use client";

import { useActionState } from "react";
import { updateProfile, FormState } from "@/app/actions/userActions";

const initialState: FormState = {};

export default function ProfileForm() {
  const [state, formAction, isPending] = useActionState(updateProfile, initialState);

  return (
    <form action={formAction} className="space-y-4 max-w-md bg-white p-6 rounded-xl border">
      <div>
        <label className="block text-sm font-medium text-gray-700">Display Name</label>
        <input
          name="name"
          type="text"
          defaultValue="John Doe"
          className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {state.error && <p className="text-sm text-red-600 font-medium">{state.error}</p>}
      {state.success && <p className="text-sm text-emerald-600 font-medium">✓ Profile saved!</p>}

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? "Saving changes..." : "Save Profile"}
      </button>
    </form>
  );
}`,
      },
    ],
  },

  "routing-navigation": {
    id: "routing-navigation",
    title: "Routing & Dynamic Navigation",
    category: "Navigation",
    badge: "App Router",
    exampleCount: 4,
    description: "Programmatic navigation, query parameters parsing, dynamic segments, and parallel route slots in Next.js.",
    keyHighlights: [
      "<Link> component with prefetching support",
      "useRouter, usePathname, useSearchParams hooks",
      "Dynamic segments [id] and catch-all routes [...slug]",
      "Parallel routes (@slot) and Intercepting routes ((.))",
    ],
    documentation: {
      overview:
        "Next.js provides client-side navigation via `<Link>` and the `useRouter` hook. Routes auto-prefetch code in viewport for instant transitions.",
      bestPractices: [
        "Prefer `<Link>` over `useRouter().push()` for standard navigation to preserve SEO and accessibility.",
        "Wrap components using `useSearchParams` in `<Suspense>` to prevent client-side opt-out of static rendering.",
      ],
      useCases: ["Search filter sync via URL query params.", "Modal routes with intercepting routes.", "Tabbed navigation."],
    },
    files: [
      {
        filename: "app/blog/[slug]/page.tsx",
        language: "typescript",
        code: `import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ ref?: string }>;
}

export default async function BlogPostPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { ref } = await searchParams;

  if (slug === "404-test") {
    notFound();
  }

  return (
    <article className="prose max-w-3xl mx-auto py-10">
      <h1 className="text-4xl font-extrabold capitalize">Article: {slug.replace(/-/g, " ")}</h1>
      {ref && <p className="text-sm text-gray-500">Referred via: {ref}</p>}
      <p className="text-lg text-slate-700 mt-6">
        This page dynamically renders parameters from the route segment.
      </p>
    </article>
  );
}`,
      },
    ],
  },

  "data-fetching": {
    id: "data-fetching",
    title: "Data Fetching & Cache Controls",
    category: "Data Management",
    badge: "Extended Fetch",
    exampleCount: 5,
    description: "Understand fetch caching options, tag-based cache invalidation, and async server component patterns.",
    keyHighlights: [
      "Extended native fetch API with Next.js caching options",
      "force-cache (default) vs no-store (dynamic data)",
      "Time-based revalidation (next: { revalidate: 60 })",
      "Tag-based caching with next: { tags: ['posts'] }",
    ],
    documentation: {
      overview:
        "Next.js extends the web `fetch` API to allow per-request caching and revalidation settings directly inside Server Components.",
      bestPractices: [
        "Use `tags` to invalidate specific cached resources on-demand via `revalidateTag`.",
        "Avoid redundant client-side fetching when Server Components can fetch during SSR/ISR.",
      ],
      useCases: ["E-commerce product lists with ISR.", "Real-time user feeds with no-store.", "Cached CMS entries."],
    },
    files: [
      {
        filename: "lib/api/posts.ts",
        language: "typescript",
        code: `export async function getCachedPosts() {
  // Time-based revalidation every 3600 seconds (1 hour)
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5", {
    next: { revalidate: 3600, tags: ["blog-posts"] },
  });

  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}`,
      },
    ],
  },

  "caching-revalidation": {
    id: "caching-revalidation",
    title: "Caching & On-Demand Revalidation",
    category: "Performance",
    badge: "ISR & Cache",
    exampleCount: 4,
    description: "Control Next.js Data Cache, Router Cache, and perform instant revalidation with revalidatePath and revalidateTag.",
    keyHighlights: [
      "revalidateTag('tag-name') for targeted cache purging",
      "revalidatePath('/route') for page-level cache clearing",
      "unstable_cache helper for non-fetch data sources",
      "Understanding 4 layers of Next.js caching",
    ],
    documentation: {
      overview:
        "Next.js has four caching layers: Request Memoization, Data Cache, Full Route Cache, and Client-side Router Cache.",
      bestPractices: [
        "Call revalidateTag inside Server Actions after database updates to reflect instant changes.",
      ],
      useCases: ["CMS webhook listeners.", "E-commerce inventory stock updates."],
    },
    files: [
      {
        filename: "app/api/revalidate/route.ts",
        language: "typescript",
        code: `import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const secret = request.headers.get("x-secret-token");
  if (secret !== process.env.MY_SECRET_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Purge cache for tagged fetches
  revalidateTag("products");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}`,
      },
    ],
  },

  "middleware": {
    id: "middleware",
    title: "Edge Middleware & Request Interception",
    category: "Security & Edge",
    badge: "Edge Runtime",
    exampleCount: 3,
    description: "Run lightweight code before a request is completed to inspect headers, handle auth redirects, and inject request context.",
    keyHighlights: [
      "Runs on Edge Runtime before router matching",
      "NextResponse.redirect, rewrite, and next() options",
      "Custom matcher patterns to target specific paths",
      "Cookie and authorization header validation",
    ],
    documentation: {
      overview:
        "Middleware allows you to intercept incoming requests and responses before they reach routes or layouts.",
      bestPractices: [
        "Keep Middleware lightweight and fast; avoid heavy database queries inside Middleware.",
        "Use matcher regex arrays to filter out static assets and public routes.",
      ],
      useCases: ["Session auth redirect to /login.", "Geo-location based routing.", "A/B testing flag rewrites."],
    },
    files: [
      {
        filename: "middleware.ts",
        language: "typescript",
        code: `import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("session_token")?.value;
  const isAuthPage = request.nextUrl.pathname.startsWith("/login");
  const isProtectedPage = request.nextUrl.pathname.startsWith("/dashboard");

  if (isProtectedPage && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};`,
      },
    ],
  },

  "authentication": {
    id: "authentication",
    title: "Authentication & Protected Routes",
    category: "Security",
    badge: "Auth Patterns",
    exampleCount: 3,
    description: "Implement secure session token authentication, OAuth providers, and route authorization guards.",
    keyHighlights: [
      "JWT and session cookie management",
      "Protected layout wrapper and middleware guards",
      "Auth status context provider for client components",
      "OAuth & Email passwordless login integration",
    ],
    documentation: {
      overview: "Authentication in Next.js utilizes HTTP-only cookies and Edge Middleware for route protection.",
      bestPractices: ["Store sensitive JWTs only in HTTP-only cookies.", "Verify session token server-side in RSC."],
      useCases: ["User registration & login flows.", "Role-based access control (RBAC)."],
    },
    files: [
      {
        filename: "lib/auth.ts",
        language: "typescript",
        code: `import { cookies } from "next/headers";

export async function getSessionUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) return null;

  // Validate session token with database or Auth service
  return { id: "usr_99", name: "Developer", email: "dev@codelab.io" };
}`,
      },
    ],
  },

  "ui-styling": {
    id: "ui-styling",
    title: "UI Styling & Asset Optimization",
    category: "Styling & Assets",
    badge: "CSS Modules & Tailwind",
    exampleCount: 4,
    description: "Use CSS Modules (*.module.css), Tailwind CSS v4, Google Fonts, and Image optimization for zero CLS layouts.",
    keyHighlights: [
      "CSS Modules with scoped class names",
      "Tailwind CSS v4 engine integration",
      "next/font Google font optimization with zero layout shift",
      "next/image responsive WebP/AVIF images",
    ],
    documentation: {
      overview: "Styling in Next.js supports CSS Modules, Tailwind CSS, and global CSS declarations seamlessly.",
      bestPractices: ["Use CSS Modules for modular component-level custom CSS without class collision."],
      useCases: ["Glassmorphism designs.", "Responsive mobile drawers.", "Theme variables."],
    },
    files: [
      {
        filename: "components/Card/Card.module.css",
        language: "css",
        code: `.card {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 1rem;
  padding: 1.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08);
}

.title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
}`,
      },
    ],
  },

  "forms": {
    id: "forms",
    title: "Form Handling & Zod Validation",
    category: "Interactive UI",
    badge: "Zod & Hook Form",
    exampleCount: 3,
    description: "Build validated, accessible forms combining React Hook Form with Zod schemas and Server Action targets.",
    keyHighlights: [
      "Zod schema type inference for end-to-end type safety",
      "React Hook Form for zero-rerender form state",
      "Field error message rendering",
      "Server Action submission bindings",
    ],
    documentation: {
      overview: "Zod schemas validate data on both the client (for fast feedback) and the server (for security).",
      bestPractices: ["Always duplicate validation on server-side actions."],
      useCases: ["Complex multi-step registration forms.", "Feedback forms."],
    },
    files: [
      {
        filename: "schemas/contactSchema.ts",
        language: "typescript",
        code: `import { z } from "zod";

export const contactSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

export type ContactFormData = z.infer<typeof contactSchema>;`,
      },
    ],
  },

  "axios-api-calls": {
    id: "axios-api-calls",
    title: "Axios Setup & Interceptors",
    category: "Networking",
    badge: "Client Requests",
    exampleCount: 4,
    description: "Configure Axios instances with global base URLs, header injection, error handling, and refresh token interceptors.",
    keyHighlights: [
      "Centralized Axios instance with timeout & headers",
      "Request interceptors to attach bearer tokens",
      "Response interceptors to transform data & catch 401 errors",
      "TypeScript payload typing",
    ],
    documentation: {
      overview: "Axios provides a clean wrapper for client-side API requests with automatic JSON parsing and interceptors.",
      bestPractices: ["Export a single configured Axios instance across the client app."],
      useCases: ["Third-party API integration.", "Client-side CRUD operations."],
    },
    files: [
      {
        filename: "lib/axiosClient.ts",
        language: "typescript",
        code: `import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    config.headers.Authorization = \`Bearer \${token}\`;
  }
  return config;
});`,
      },
    ],
  },

  "pagination": {
    id: "pagination",
    title: "URL-Based Pagination State",
    category: "Data Management",
    badge: "URL State",
    exampleCount: 3,
    description: "Implement page navigation synced with URL query parameters for bookmarkable and shareable paginated views.",
    keyHighlights: [
      "URL query string synchronization (?page=2&limit=10)",
      "Next and Previous navigation bounds control",
      "Preserves existing filters during page changes",
      "Compatible with SSR data fetching",
    ],
    documentation: {
      overview: "Storing page numbers in searchParams ensures users can share deep links to exact search result pages.",
      bestPractices: ["Sanitize page numbers to ensure page >= 1 and page <= totalPages."],
      useCases: ["Table paginated views.", "E-commerce search result pages."],
    },
    files: [
      {
        filename: "components/Pagination.tsx",
        language: "typescript",
        code: `"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return \`\${pathname}?\${params.toString()}\`;
  };

  return (
    <div className="flex items-center gap-2 mt-6">
      <button
        disabled={currentPage <= 1}
        onClick={() => replace(createPageURL(currentPage - 1))}
        className="px-3 py-1.5 border rounded-md disabled:opacity-40"
      >
        Previous
      </button>
      <span className="text-sm font-medium">Page {currentPage} of {totalPages}</span>
      <button
        disabled={currentPage >= totalPages}
        onClick={() => replace(createPageURL(currentPage + 1))}
        className="px-3 py-1.5 border rounded-md disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}`,
      },
    ],
  },

  "search-filters": {
    id: "search-filters",
    title: "Debounced Search & Multi-Filters",
    category: "Interactive UI",
    badge: "URL Sync",
    exampleCount: 3,
    description: "Build fast, debounced search inputs with URL parameter syncing for instant client or server filtering.",
    keyHighlights: [
      "use-debounce pattern to prevent excessive requests",
      "URL search parameter synchronization",
      "Filter reset functionality",
      "Accessible clear-input buttons",
    ],
    documentation: {
      overview: "Debouncing delays updating search parameters until the user stops typing for a given interval (e.g. 300ms).",
      bestPractices: ["Always debounce input typing before pushing updates to URL or API."],
      useCases: ["Live directory search.", "Catalog filtering."],
    },
    files: [
      {
        filename: "components/SearchBox.tsx",
        language: "typescript",
        code: `"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchBox() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    params.set("page", "1");
    replace(\`\${pathname}?\${params.toString()}\`);
  };

  return (
    <input
      type="text"
      placeholder="Search topics..."
      defaultValue={searchParams.get("query")?.toString()}
      onChange={(e) => handleSearch(e.target.value)}
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}`,
      },
    ],
  },

  "infinite-scroll": {
    id: "infinite-scroll",
    title: "IntersectionObserver Infinite Scroll",
    category: "Interactive UI",
    badge: "Hooks",
    exampleCount: 2,
    description: "Load dynamic feeds automatically as the user scrolls using the native Intersection Observer browser API.",
    keyHighlights: [
      "Custom useIntersectionObserver hook",
      "Sentinel element target binding",
      "Loading spinner and end-of-list detection",
      "Memory cleanup on unmount",
    ],
    documentation: {
      overview: "Infinite scroll triggers batch data fetches whenever a sentinel element at the bottom of the page enters viewport.",
      bestPractices: ["Provide fallback pagination controls for keyboard/accessibility compliance."],
      useCases: ["Social media feeds.", "Activity logs."],
    },
    files: [
      {
        filename: "hooks/useInfiniteScroll.ts",
        language: "typescript",
        code: `import { useEffect, useRef } from "react";

export function useInfiniteScroll(onIntersect: () => void, hasMore: boolean) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        onIntersect();
      }
    });

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
  }, [onIntersect, hasMore]);

  return sentinelRef;
}`,
      },
    ],
  },

  "performance": {
    id: "performance",
    title: "Performance Optimization & Lazy Loading",
    category: "Performance",
    badge: "Core Web Vitals",
    exampleCount: 4,
    description: "Optimize bundle size with next/dynamic lazy imports, dynamic import code splitting, and web vitals tracking.",
    keyHighlights: [
      "dynamic() lazy imports for client components",
      "ssr: false option for heavy client libraries (e.g. charts)",
      "Image priority loading for LCP elements",
      "Turbopack build optimizations",
    ],
    documentation: {
      overview: "Next.js dynamic imports defer downloading heavy JavaScript components until they are actually rendered on screen.",
      bestPractices: ["Lazy load heavy libraries like syntax highlighters, interactive maps, or chart renderers."],
      useCases: ["Interactive chart rendering.", "Modal popups."],
    },
    files: [
      {
        filename: "components/ChartWrapper.tsx",
        language: "typescript",
        code: `import dynamic from "next/dynamic";

// Dynamic import with SSR disabled for browser-only chart rendering
const HeavyChart = dynamic(() => import("@/components/HeavyChart"), {
  ssr: false,
  loading: () => <div className="h-64 bg-slate-100 animate-pulse rounded-lg flex items-center justify-center text-slate-400">Loading Analytics Chart...</div>
});

export default function AnalyticsWidget() {
  return (
    <div className="p-6 bg-white rounded-xl border">
      <h3 className="font-semibold mb-4">User Activity Breakdown</h3>
      <HeavyChart />
    </div>
  );
}`,
      },
    ],
  },

  "deployment": {
    id: "deployment",
    title: "Deployment & Production Builds",
    category: "DevOps",
    badge: "Vercel & Docker",
    exampleCount: 3,
    description: "Deploy Next.js apps with Vercel zero-config or standalone Docker containers for self-hosted environments.",
    keyHighlights: [
      "output: 'standalone' configuration in next.config.ts",
      "Multi-stage Dockerfile build optimization",
      "Environment variable validation",
      "Edge Network distribution",
    ],
    documentation: {
      overview: "Next.js applications can be deployed to Vercel with zero configuration, or packaged into ultra-compact Docker containers.",
      bestPractices: ["Use standalone output mode to reduce Docker image size from ~1GB to ~80MB."],
      useCases: ["Vercel production deployments.", "Self-hosted Docker / Kubernetes setups."],
    },
    files: [
      {
        filename: "Dockerfile",
        language: "dockerfile",
        code: `FROM node:20-alpine AS base

FROM base AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]`,
      },
    ],
  },

  "testing": {
    id: "testing",
    title: "Testing with Vitest & Playwright",
    category: "Quality Assurance",
    badge: "Unit & E2E",
    exampleCount: 3,
    description: "Write unit tests for Server Actions/Components using Vitest and end-to-end browser tests using Playwright.",
    keyHighlights: [
      "Vitest + React Testing Library setup",
      "Mocking Next.js router hooks (useRouter, usePathname)",
      "Playwright end-to-end test specs",
      "CI/CD pipeline test integration",
    ],
    documentation: {
      overview: "Testing Next.js applications involves unit testing utility functions and components, as well as E2E testing full routes.",
      bestPractices: ["Use Playwright for testing user journeys across real browsers."],
      useCases: ["Testing login flows.", "Validating form submissions."],
    },
    files: [
      {
        filename: "tests/home.spec.ts",
        language: "typescript",
        code: `import { test, expect } from "@playwright/test";

test("should navigate to App Router topic on click", async ({ page }) => {
  await page.goto("http://localhost:3000");

  // Expect title
  await expect(page.locator("h1")).toContainText("Welcome to Code Lab");

  // Click App Router topic
  await page.click("text=App Router");

  // Verify URL or heading
  await expect(page.locator("h2")).toContainText("App Router Architecture");
});`,
      },
    ],
  },
};
