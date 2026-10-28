"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Navigation } from "@/components/navigation"
import { ProjectModal } from "@/components/project-modal"
import { ContactModal } from "@/components/contact-modal"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Folder,
  File,
  Terminal,
  Code,
  Globe,
  Server,
  ExternalLink,
  Github,
  Play,
  Pause,
  RotateCcw,
  Activity,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"
import { FadeIn, StaggerIn, HoverGlow } from "@/components/animations/reveal-animations"
import { cn } from "@/lib/utils"

interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  technologies: string[]
  category: string
  year: string
  status: string
  features: string[]
  challenges: string[]
  results: string[]
  githubUrl?: string
  liveUrl?: string
  metrics?: Record<string, string>
}

// A scroll-triggered FadeIn/StaggerIn can get permanently stuck at its
// pre-animation (invisible) state if the element is already past its
// trigger point without GSAP ever catching an actual scroll "crossing" -
// e.g. the page got shorter out from under it (switching grid/list view,
// filtering by category) rather than the user scrolling past it. Reconcile
// directly instead of relying on edge-crossing detection: anything already
// behind the current scroll position gets fast-forwarded to its settled end
// state, regardless of how it got there.
function reconcileScrollTriggers() {
  ScrollTrigger.getAll().forEach((trigger) => {
    if (!trigger.animation) return
    if (window.scrollY >= trigger.start && trigger.animation.progress() === 0) {
      trigger.animation.progress(1)
    }
  })
}

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isRunning, setIsRunning] = useState(true)
  const [isContactOpen, setIsContactOpen] = useState(false)

  useEffect(() => {
    window.addEventListener("scroll", reconcileScrollTriggers, { passive: true })
    return () => window.removeEventListener("scroll", reconcileScrollTriggers)
  }, [])

  // Switching grid/list or filtering by category changes the page's total
  // height dramatically, so every trigger's start/end (cached from whenever
  // it mounted) needs recalculating against the new layout - then reconciled
  // immediately, since the layout change itself (not a scroll) may be what
  // just carried an element past its own trigger point.
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      ScrollTrigger.refresh()
      reconcileScrollTriggers()
    })
    return () => cancelAnimationFrame(raf)
  }, [viewMode, selectedCategory])

  const categoryMap: Record<string, string[]> = {
    web: ["Web Applications"],
    api: ["APIs & Backend"],
    fullstack: ["Full-Stack Projects"],
    opensource: ["Open Source"],
  }

  const categoryDefs = [
    { id: "all", label: "All Projects", icon: Folder },
    { id: "web", label: "Web Apps", icon: Globe },
    { id: "api", label: "APIs", icon: Server },
    { id: "fullstack", label: "Full-Stack", icon: Code },
    { id: "opensource", label: "Open Source", icon: Github },
  ]

  const categoryIcons: Record<string, typeof Code> = {
    "Web Applications": Globe,
    "APIs & Backend": Server,
    "Full-Stack Projects": Code,
    "Open Source": Github,
  }

  const projects: Project[] = [
    {
      id: "1",
      title: "Farm Zone",
      description:
        "Nigeria's leading livestock marketplace — premium Halal rams, goats, cows and camels, with nationwide delivery, processing and grilling services.",
      longDescription:
        "Farm Zone is a full e-commerce platform for Nigeria's livestock market, connecting individual and corporate buyers with Halal-certified rams, goats, cows and camels. The backend is a production-grade Node.js/Express API: checkout runs through Redis-locked, queue-processed order placement so an animal is never double-sold, Paystack payments are verified via HMAC-signed webhooks, and Postgres full-text and trigram search power the catalog and admin tooling. Buyers choose between a retail flow for personal and Eid purchases or a bulk/corporate flow for events and volume orders, browse live pricing by animal size, and check out with Paystack or Google Sign-In. Beyond the sale, Farm Zone coordinates professional slaughter and meat processing, event grilling services, and nationwide delivery — for a business that has supplied 50,000+ animals and fulfilled 15,000+ orders across all 37 states.",
      image: "/projects/farmzone.jpg",
      technologies: [
        "Node.js",
        "Express",
        "TypeScript",
        "PostgreSQL",
        "Redis",
        "BullMQ",
        "Paystack",
        "JWT Auth",
        "Docker",
        "Prometheus",
      ],
      category: "Full-Stack Projects",
      year: "2025",
      status: "Live",
      features: [
        "Async order pipeline — checkout enqueues a BullMQ job and returns immediately, while a worker confirms the order inside a Postgres transaction with row-level locking",
        "Redis-backed distributed locking (atomic Lua scripts) reserves a product the moment it's added to cart — three independent layers against overselling, from cache to queue to database",
        "Paystack checkout with HMAC-SHA512 webhook signature verification and idempotent payment recording",
        "JWT access + refresh tokens with family-based rotation and theft detection — a reused, revoked token revokes every session in that family",
        "Full-text and trigram search (Postgres tsvector + pg_trgm) across the product and news catalog, plus server-enforced feature flags that can take any module offline without a redeploy",
        "Prometheus metrics and structured Winston/Loki logging, deployed via Docker + PM2 cluster mode through a GitHub Actions → GHCR → Render/DigitalOcean pipeline",
      ],
      challenges: [
        "Guaranteeing an animal is never sold twice under concurrent checkout traffic — solved with a three-layer lock: a Redis Lua-script reservation, a BullMQ worker re-check, and a Postgres row lock inside the final transaction",
        "Making payment confirmation reliable against Paystack retries and duplicate webhooks — payments are recorded idempotently so a replayed webhook is a safe no-op",
        "Modeling livestock as a product catalog with per-animal, per-size pricing instead of the flat SKUs typical e-commerce platforms assume",
        "Splitting the UX cleanly between individual retail buyers and corporate/bulk buyers, including Excel-based bulk order ingestion, without duplicating the entire storefront",
      ],
      results: [
        "Live platform behind a business reporting 15,000+ orders fulfilled and 50,000+ livestock supplied",
        "Nationwide reach across all 37 states Farm Zone serves",
        "Designed and shipped the production backend solo — API, database, queues, payments, observability and deployment pipeline",
      ],
      liveUrl: "https://farmzone.africa",
      metrics: {
        orders: "15,000+ fulfilled",
        states: "37, nationwide",
        livestock: "50,000+ supplied",
      },
    },
    {
      id: "2",
      title: "MetricLeap",
      description:
        "AI-powered monitoring & evaluation platform helping impact-driven organizations measure, track, and report their social impact.",
      longDescription:
        "MetricLeap gives NGOs and impact-driven organizations an AI-assisted alternative to spreadsheet-based monitoring and evaluation. A fine-tuned GPT-4o-mini model suggests metrics tailored to an organization's specific mission, generates stakeholder-specific survey questions, and turns collected responses into a structured, exportable impact report — cutting the time it takes to go from raw survey data to a boardroom-ready document. Supabase handles auth and storage with Row-Level Security enforced per user, and stakeholder questionnaires are real, programmatically-created Google Forms rather than an in-house form renderer, so data collection works wherever Google Forms already does.",
      image: "/projects/metricleap.jpg",
      technologies: [
        "Next.js",
        "React",
        "TypeScript",
        "Supabase",
        "PostgreSQL",
        "OpenAI API",
        "Google Forms API",
        "Tailwind CSS",
      ],
      category: "Full-Stack Projects",
      year: "2025",
      status: "Live",
      features: [
        "AI-generated metric suggestions from a custom fine-tuned GPT-4o-mini model, tailored to an organization's mission rather than a generic template",
        "AI-generated stakeholder survey questions, distributed through real Google Forms created and managed via the Google Forms API — not an in-house form builder",
        "AI-assembled impact reports: survey responses are pulled back from Google Forms and turned into a structured report, rendered server-side to PDF",
        "Supabase Postgres + Auth, with Row-Level Security policies enforcing per-user data isolation at the database level, not just in application code",
        "Supabase SSR session handling via middleware, keeping auth state in sync across server and client",
      ],
      challenges: [
        "Designing an AI metric-generation flow flexible enough to fit very different organizational missions without producing generic, cookie-cutter output",
        "Wiring the Google Forms API to programmatically create forms and questions, then reliably pull responses back in for report generation",
        "Generating a readable, correctly-paginated PDF report entirely server-side from AI-structured output",
        "Enforcing per-user data isolation with Postgres Row-Level Security rather than relying solely on application-layer checks",
      ],
      results: [
        "Shipped a working AI metric-generation → Google Forms questionnaire → AI report pipeline end to end",
        "Built and deployed solo, covering both the UI and the backend",
      ],
      liveUrl: "https://v0-metric-leap-design.vercel.app/",
    },
    {
      id: "3",
      title: "Tobi Peter",
      description:
        "Artist website and admin CMS for touring DJ/producer Tobi Peter — public EPK, tour map and music hub, plus a protected dashboard to manage it all.",
      longDescription:
        "A commissioned site for Nigerian DJ, producer and songwriter Tobi Peter: a public-facing artist site (music, tour shows, an electronic press kit with an interactive world map of past shows, a shop and a subscribe flow) paired with a password-protected admin dashboard where the team manages shows, songs, blog posts, images and site content without touching code. The frontend is a React SPA that talks to a separate backend API — this build is the client. Originally built on Create React App, it's been continuously modernized since: migrated to Vite, Redux rewritten to TanStack Query, and the whole UI converted to Tailwind CSS v4.",
      image: "/projects/tobipeter.jpg",
      technologies: ["React", "Vite", "TanStack Query", "React Router", "Tailwind CSS", "Framer Motion", "Vitest"],
      category: "Web Applications",
      year: "2023",
      status: "Live",
      features: [
        "Interactive world map of tour history (react-simple-maps + d3 + topojson) on the public EPK page",
        "Full admin CRUD dashboard — shows, songs, blog posts, images and site content — with a Chart.js-powered overview",
        "TanStack Query data layer with an Axios client that injects auth headers and retries once on a 401 after refreshing the session",
        "Form validation on every admin entity via React Hook Form + Zod",
        "Choreographed page transitions with Framer Motion, explicitly respecting prefers-reduced-motion",
        "CI-gated quality bar — GitHub Actions runs lint, Prettier format-check, and Vitest with enforced coverage thresholds on every push",
      ],
      challenges: [
        "Migrating a live, in-production Create React App to Vite — and Redux to TanStack Query — without a rewrite or downtime",
        "Keeping an animated, transition-heavy SPA accessible: jsx-a11y linting plus a reduced-motion fallback so the animation never becomes a barrier",
        "Building a general-purpose admin CMS across five distinct content types that stays simple enough for a non-technical team to actually use",
      ],
      results: [
        "Live in production since 2023 and still actively maintained — 148+ commits across a multi-phase modernization",
        "Shipped the full client rewrite (CRA → Vite, Redux → TanStack Query, Tailwind v4) with zero loss of existing functionality",
      ],
      liveUrl: "https://www.tobipeter.com",
    },
    {
      id: "4",
      title: "PitWall",
      description:
        "An F1 race-strategy dashboard — a trained tyre-degradation model, a Monte Carlo strategy simulator, a live server, and a real-time UI, built in four verified phases.",
      longDescription:
        "PitWall predicts how an F1 tyre degrades lap by lap with a LightGBM model trained on 62,311 real laps from the 2022–2024 seasons, then runs that prediction hundreds of times through a Monte Carlo simulator to compare pit strategies — 'stay out' vs. 'pit now' — as a distribution of outcomes rather than a single guess, so the comparison accounts for real race randomness like safety cars. An async Python server drives that simulation continuously from a live-shaped data stream (either replayed historical data or F1's real live-timing feed, behind one shared interface) and pushes results over WebSocket to a Next.js dashboard that mirrors a real F1 broadcast graphic: a team-grouped sidebar of every driver on track, with a full strategy comparison computed on demand for whichever one is selected.",
      image: "/projects/pitwall.jpg",
      technologies: [
        "Python",
        "LightGBM",
        "pandas",
        "FastF1",
        "asyncio",
        "WebSockets",
        "Next.js",
        "React",
        "TypeScript",
      ],
      category: "Full-Stack Projects",
      year: "2026",
      status: "Complete",
      features: [
        "LightGBM tyre-degradation model trained on 62,311 real laps across three F1 seasons, evaluated on a strictly time-ordered held-out split (never a random shuffle) so it can't learn anything about races it's supposed to have never seen",
        "Monte Carlo strategy simulator that runs each candidate pit strategy hundreds of times with paired random seeds — same safety-car and noise draws across strategies — so the win-probability comparison isolates the real structural difference instead of noise",
        "Async live server with one shared source interface for replayed historical races and F1's real live-timing feed, bridging FastF1's thread-based SignalR client into asyncio via a queue and loop.call_soon_threadsafe",
        "Multi-driver architecture: every car's cheap state streams continuously for the sidebar, while the expensive ~90-second Monte Carlo comparison only ever runs for whichever one driver is currently selected",
        "Next.js dashboard with a hand-rolled design system (no component library), tabular numerals so live-updating digits never jitter, requestAnimationFrame-based count-up animation respecting prefers-reduced-motion, and a pre-hydration theme script for light/dark with no flash of the wrong theme",
        "Real automated test coverage on both sides — 5 pytest modules for the data/model/simulation pipeline, 6 Vitest + Testing Library suites for the dashboard's hooks and components",
      ],
      challenges: [
        "F1 locked its live-timing archive behind an F1TV subscription mid-project — worked around first with a public CSV (which lost weather and safety-car filtering, visibly hurting accuracy), then properly fixed with a real subscription and a brand-new FastF1 alpha release that added authentication",
        "A single-season training split looked structurally fine but was quietly broken: every circuit appears exactly once per season, so a time-ordered split within one season guarantees the held-out race's circuit was never seen in training at all — fixed by spanning three seasons so circuits repeat",
        "A reconfigured Singapore circuit shared its old track_temp-correlated label with the new layout, confusing the model about which era's lap times applied — fixed with an explicit season feature, cutting that circuit's error from 13.1s to 1.96s",
        "FastF1's SignalRClient is synchronous and runs its own thread, not asyncio — bridged into the server's async world with a queue and call_soon_threadsafe rather than reimplementing the connection layer",
      ],
      results: [
        "2.021 seconds mean absolute error on held-out races the model never trained on",
        "A real strategy comparison (2024 British GP) came out to a decisive 99.8% win probability for the better strategy, with the simulator's bimodal output distribution directly reflecting the safety-car mechanism",
        "All four phases — model, simulator, live server, dashboard — built, tested, and verified end to end against real race data in an actual browser",
      ],
      githubUrl: "https://github.com/beatsbydan/pitwall",
      metrics: {
        mae: "2.021s on held-out laps",
        "win probability": "99.8% (real strategy comparison)",
        "training laps": "62,311 across 2022–24",
      },
    },
    {
      id: "5",
      title: "GiftDrop",
      description:
        "A social gifting platform — wishlists, gifters, and time-boxed gifting windows — built as a Spring Boot API and a React web client.",
      longDescription:
        "GiftDrop connects people with curated wishlists to gifters who want to fund them directly, built across a Spring Boot API and a React web client covering the landing site, an admin panel, and a consumer web experience. The backend runs on virtual threads with a Liquibase-managed PostgreSQL schema, Redisson-backed Redis for cache-aside query caching, refresh-token rotation, OTP storage and Bucket4j-distributed rate limiting, and ShedLock to keep cron jobs (payment reconciliation, abandoned-checkout cleanup, metric rollups, Excel report generation, mail dispatch) from double-running across instances. Paystack handles payments via a hosted checkout redirect, with HMAC-SHA512 webhook verification and a database-level unique constraint absorbing duplicate webhook deliveries. The web client runs two fully separate RTK Query auth stacks for admin and consumer sessions — distinct cookies, caches, and mutex-guarded token refresh — synced across browser tabs via BroadcastChannel.",
      image: "/projects/giftdrop.jpg",
      technologies: ["Spring Boot", "Java", "PostgreSQL", "Redis", "React", "TypeScript", "Paystack", "Redux Toolkit"],
      category: "Full-Stack Projects",
      year: "2026",
      status: "Paused",
      features: [
        "Paystack hosted checkout, verified server-side via HMAC-SHA512 webhook signatures and made idempotent with a DB-level unique constraint on the payment reference",
        "Redis (Redisson) backing refresh-token rotation, OTP storage, cache-aside query caching, and Bucket4j distributed rate limiting across three tiers — fails open rather than blocking traffic if Redis itself goes down",
        "ShedLock-coordinated cron jobs so payment reconciliation, abandoned-checkout cleanup, metric rollups, Excel report generation (Apache POI, to local disk or an S3-compatible bucket), and mail dispatch each run exactly once across instances, not per-instance",
        "Two fully independent auth stacks on the web client — separate Redux slices, RTK Query caches, cookies, and mutex-guarded refresh-and-retry logic for admin vs. consumer sessions — kept in sync across browser tabs via the BroadcastChannel API",
        "Durable, DB-backed email queue (not fire-and-forget) dispatched through Resend with Thymeleaf-rendered templates, and virtual-thread request handling throughout the API",
      ],
      challenges: [
        "Keeping admin and consumer sessions on the same web client fully isolated — separate Redux slices, RTK Query caches, and cookies — with no risk of one session's state leaking into the other",
        "Confirming Paystack payments reliably against retried and duplicate webhook deliveries — solved with HMAC-SHA512 signature verification plus a DB-level unique constraint that safely absorbs a race between two concurrent deliveries for the same reference",
        "Coordinating scheduled jobs (reconciliation, cleanup, reporting) safely across multiple server instances using DB-backed ShedLock rather than relying on in-memory scheduling that breaks the moment there's more than one instance",
      ],
      results: [
        "Shipped both layers as a working, end-to-end product — backend API and web client — sharing one real payment and auth model",
        "Previously deployed to a production droplet at giftdrop.me; the deployment has since been paused",
      ],
    },
    {
      id: "6",
      title: "LedgerCore",
      description:
        "A double-entry ledger and settlement engine proving correctness under real concurrent load — zero double-spends, zero overdrafts, zero lost events.",
      longDescription:
        "LedgerCore is a Java/Spring Boot engine built to prove, not just claim, that a transfer can move money between two accounts under concurrency without ever corrupting the books. Double-entry invariants are enforced at the database level with a deferred PostgreSQL constraint trigger that rejects any unbalanced journal, plus immutability triggers that reject every UPDATE or DELETE on a posted entry — corrections only happen as reversal entries. Concurrent transfers use pessimistic row locking with ascending-account-ID lock ordering to stay deadlock-free, idempotency spans three separate transactions (claim, execute, finalize) so a racing duplicate request can never double-execute, and every journal write lands in a transactional outbox relayed to Kafka by a scheduled poller using SELECT ... FOR UPDATE SKIP LOCKED. A nightly reconciliation job streams the ledger against a bank statement feed through a constant-memory sort-merge join. All of it is verified, not just asserted: 29 tests run against real Testcontainers Postgres and Kafka, including dedicated tests that hammer transfers, idempotency keys, and outbox delivery with real concurrent threads, and a k6 load test that sustained 219.6 transfers/sec with zero balance drift across 28,733 transfers.",
      image: "/projects/generic-api.jpg",
      technologies: ["Java", "Spring Boot", "PostgreSQL", "Apache Kafka", "Liquibase", "Testcontainers", "k6"],
      category: "APIs & Backend",
      year: "2026",
      status: "Complete",
      features: [
        "Double-entry invariants enforced at the database level — a deferred PostgreSQL constraint trigger rejects any unbalanced journal at commit, and separate immutability triggers reject any UPDATE or DELETE on a posted entry, so corrections only happen as reversal entries",
        "Deadlock-free concurrent transfers via pessimistic row locking with ascending-account-ID lock ordering, implemented independently on both the transfer and reversal code paths",
        "Three-phase idempotency (claim → execute → finalize) spanning separate transactions by construction, with SHA-256 request fingerprinting and atomic reclaim of stale or failed in-flight claims",
        "Transactional outbox: the outbox row is written in the same transaction as the journal entry, then relayed to Kafka by a separate scheduled poller using SELECT ... FOR UPDATE SKIP LOCKED for safe multi-consumer delivery",
        "Nightly reconciliation against a bank statement feed via a constant-memory sort-merge join — a Hibernate server-side cursor (fetch-size query hint) streams both sides and mismatches one at a time rather than materializing a result set",
        "Verified under real contention, not just unit-tested — 29 tests against real Testcontainers Postgres and Kafka, including concurrent-transfer, concurrent-idempotency, and concurrent-outbox-publish tests asserting zero balance drift and zero duplicate delivery",
      ],
      challenges: [
        "Caught a real lost-update bug where Hibernate's session identity map returned a stale in-memory entity instead of the freshly row-locked one — fixed by fetching a scalar ID rather than the entity before acquiring the lock",
        "Making duplicate concurrent requests on the same idempotency key resolve to exactly one transfer, without one request's in-flight claim deadlocking against or double-executing alongside another's",
        "Keeping the outbox relay's Kafka delivery failures from rolling back already-published rows in the same batch — solved with a per-row try/catch instead of one transaction per batch",
        "Reconciling a ledger against an external bank feed in constant memory instead of loading both sides in full, while still tolerating malformed statement lines without aborting the run",
      ],
      results: [
        "k6 load test sustained 219.6 transfers/sec with p90 377ms / p95 591ms latency and zero balance drift across 28,733 transfers — 100 seeded accounts, total balance identical before and after",
        "29 tests passing against real Testcontainers Postgres and Kafka, including dedicated concurrency tests for transfers, idempotency, and outbox delivery under real thread contention",
        "Full architecture, every key flow, and the database schema documented as a set of Mermaid diagrams alongside a complete product/design document",
      ],
      githubUrl: "https://github.com/beatsbydan/ledger-core",
      metrics: {
        throughput: "219.6 transfers/sec",
        latency: "p95 591ms / p90 377ms",
        "balance drift": "0 across 28,733 transfers",
      },
    },
  ]

  const projectStats = {
    total: projects.length,
    live: projects.filter((p) => p.status === "Live").length,
    maintained: projects.filter((p) => p.status === "Maintained").length,
    technologies: [...new Set(projects.flatMap((p) => p.technologies))].length,
    categories: [...new Set(projects.map((p) => p.category))].length,
  }

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((project) => categoryMap[selectedCategory]?.includes(project.category))

  const categories = categoryDefs.map((category) => ({
    ...category,
    count:
      category.id === "all"
        ? projects.length
        : projects.filter((project) => categoryMap[category.id]?.includes(project.category)).length,
  }))

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const openProjectLink = (e: React.MouseEvent, url?: string) => {
    e.stopPropagation()
    if (url) window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="md:ml-80 min-h-screen print:ml-0">
        {/* Terminal Header Bar */}
        <FadeIn duration={0.4}>
          <div className="bg-card border-b border-border p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Folder className="h-5 w-5 text-primary" />
                  <span className="font-mono text-sm">projects/</span>
                </div>
                <Badge variant="outline" className="hidden sm:inline-flex">
                  Repository
                </Badge>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsRunning(!isRunning)}
                    className="h-6 w-6 p-0"
                    title={isRunning ? "Pause live status" : "Resume live status"}
                  >
                    {isRunning ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0"
                    title="Reset filters"
                    onClick={() => {
                      setSelectedCategory("all")
                      setViewMode("grid")
                    }}
                  >
                    <RotateCcw className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <div className={cn("h-2 w-2 rounded-full bg-green-500", isRunning && "animate-pulse")}></div>
                  <span className="hidden sm:inline">{isRunning ? "Live Projects" : "Live Projects (Paused)"}</span>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="p-6 space-y-6">
          {/* Project Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* File Explorer Sidebar */}
            <div className="lg:col-span-1">
              <FadeIn className="lg:sticky lg:top-6">
                <Card className="p-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Terminal className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold">Project Explorer</h3>
                  </div>

                  <div className="space-y-1">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full flex items-center justify-between p-2 rounded-md text-sm transition-all cursor-pointer ${
                          selectedCategory === category.id
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <category.icon className="h-3 w-3" />
                          <span>{category.label}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {category.count}
                        </Badge>
                      </button>
                    ))}
                  </div>

                  {/* Project Stats */}
                  <div className="mt-6 pt-4 border-t border-border">
                    <h4 className="text-xs font-medium text-muted-foreground uppercase mb-3">Repository Stats</h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span>Total Projects:</span>
                        <span className="text-primary font-mono">{projectStats.total}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Live:</span>
                        <span className="text-green-500 font-mono">{projectStats.live}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Maintained:</span>
                        <span className="text-yellow-500 font-mono">{projectStats.maintained}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Technologies:</span>
                        <span className="text-blue-500 font-mono">{projectStats.technologies}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </FadeIn>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-6">
              {/* Project Metrics */}
              <StaggerIn staggerDelay={0.1}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Activity className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">Active Projects</span>
                    </div>
                    <div className="text-2xl font-bold text-green-500">{projectStats.live}</div>
                    <div className="text-xs text-muted-foreground">Currently deployed</div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Folder className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">Total Projects</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-500">{projectStats.total}</div>
                    <div className="text-xs text-muted-foreground">Shipped and live</div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Globe className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Categories</span>
                    </div>
                    <div className="text-2xl font-bold text-primary">{projectStats.categories}</div>
                    <div className="text-xs text-muted-foreground">Project types</div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Code className="h-4 w-4 text-purple-500" />
                      <span className="text-sm font-medium">Tech Stack</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-500">{projectStats.technologies}</div>
                    <div className="text-xs text-muted-foreground">Technologies used</div>
                  </Card>
                </div>
              </StaggerIn>

              {/* Project Grid/List */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-xl font-semibold flex items-center flex-wrap gap-2">
                    <span className="flex items-center">
                      <File className="h-5 w-5 mr-2 text-primary shrink-0" />
                      {selectedCategory === "all"
                        ? "All Projects"
                        : categories.find((c) => c.id === selectedCategory)?.label}
                    </span>
                    <Badge variant="outline">
                      {filteredProjects.length}
                    </Badge>
                  </h2>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant={viewMode === "grid" ? "default" : "outline"}
                      onClick={() => setViewMode("grid")}
                    >
                      Grid
                    </Button>
                    <Button
                      size="sm"
                      variant={viewMode === "list" ? "default" : "outline"}
                      onClick={() => setViewMode("list")}
                    >
                      List
                    </Button>
                  </div>
                </div>

                {viewMode === "grid" ? (
                  <StaggerIn staggerDelay={0.1}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {filteredProjects.map((project) => {
                        const CategoryIcon = categoryIcons[project.category] ?? Globe
                        return (
                          <HoverGlow key={project.id} className="h-full rounded-xl">
                            <Card
                              className="p-6 h-full flex flex-col cursor-pointer group"
                              onClick={() => handleProjectClick(project)}
                            >
                              <div className="flex-1 space-y-4">
                                {/* Project Header */}
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex items-center space-x-3 min-w-0">
                                    <div className="w-9 h-9 shrink-0 bg-primary/10 rounded-lg flex items-center justify-center">
                                      <CategoryIcon className="h-4 w-4 text-primary" />
                                    </div>
                                    <div className="min-w-0">
                                      <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
                                        {project.title}
                                      </h3>
                                      <p className="text-xs text-muted-foreground truncate">{project.category}</p>
                                    </div>
                                  </div>
                                  <Badge
                                    variant={project.status === "Live" ? "default" : "secondary"}
                                    className="shrink-0 text-xs"
                                  >
                                    {project.status === "Live" ? (
                                      <CheckCircle className="h-3 w-3 mr-1" />
                                    ) : (
                                      <AlertTriangle className="h-3 w-3 mr-1" />
                                    )}
                                    {project.status}
                                  </Badge>
                                </div>

                                {/* Project Description */}
                                <p className="text-sm text-muted-foreground font-serif line-clamp-2">
                                  {project.description}
                                </p>

                                {/* Technologies */}
                                <div className="flex flex-wrap gap-1.5">
                                  {project.technologies.slice(0, 4).map((tech, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {tech}
                                    </Badge>
                                  ))}
                                  {project.technologies.length > 4 && (
                                    <Badge variant="outline" className="text-xs">
                                      +{project.technologies.length - 4}
                                    </Badge>
                                  )}
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex items-center justify-between pt-4 mt-4 border-t border-border">
                                <div className="flex space-x-1">
                                  {project.githubUrl && (
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="h-7 w-7 p-0"
                                      onClick={(e) => openProjectLink(e, project.githubUrl)}
                                    >
                                      <Github className="h-3.5 w-3.5" />
                                    </Button>
                                  )}
                                  {project.liveUrl && (
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="h-7 w-7 p-0"
                                      onClick={(e) => openProjectLink(e, project.liveUrl)}
                                    >
                                      <ExternalLink className="h-3.5 w-3.5" />
                                    </Button>
                                  )}
                                </div>
                                <span className="text-xs text-muted-foreground">{project.year}</span>
                              </div>
                            </Card>
                          </HoverGlow>
                        )
                      })}
                    </div>
                  </StaggerIn>
                ) : (
                  <div className="space-y-2">
                    {filteredProjects.map((project) => (
                      <Card
                        key={project.id}
                        className="p-4 hover:shadow-md transition-all duration-200 hover:border-primary/40 cursor-pointer"
                        onClick={() => handleProjectClick(project)}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div className="flex items-center space-x-4 min-w-0">
                            <div className="w-6 h-6 shrink-0 bg-primary/10 rounded flex items-center justify-center">
                              <File className="h-3 w-3 text-primary" />
                            </div>
                            <div className="min-w-0">
                              <h3 className="font-medium truncate">{project.title}</h3>
                              <p className="text-xs text-muted-foreground truncate">{project.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground shrink-0">
                            <span>{project.technologies.length} technologies</span>
                            <Badge variant="outline" className="text-xs">
                              {project.status}
                            </Badge>
                            <span>{project.year}</span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <FadeIn delay={0.5}>
            <Card className="p-8 text-center bg-linear-to-r from-primary/5 to-accent/5 border-primary/20">
              <div className="max-w-2xl mx-auto space-y-4">
                <h2 className="text-2xl font-bold">Ready to Build Something Amazing?</h2>
                <p className="text-muted-foreground font-serif">
                  I&apos;m always excited to work on new challenges and innovative projects. Let&apos;s collaborate and create
                  something that makes a difference.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="group" onClick={() => setIsContactOpen(true)}>
                    <Terminal className="mr-2 h-4 w-4" />
                    Start Project
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="https://github.com/beatsbydan" target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      View All Code
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          </FadeIn>
        </div>
      </main>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      {/* Project Modal */}
      <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
