"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useTheme } from "next-themes"
import gsap from "gsap"
import Lenis from "lenis"

interface Project {
  id: string
  name: string
  tag: string
  year: string
  img: string
  pattern: "dots" | "diagonal" | "grid" | "cross" | "circles"
  desc: string
  tech: string[]
  metrics?: string[]
  link: string | null
  linkType?: "github" | "live"
  linkLabel?: string
}

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
]

const marqueeItems = ["FULL-STACK ENGINEERING", "SYSTEM DESIGN", "FINTECH AT SCALE", "AI-ASSISTED DELIVERY"]

const projects: Project[] = [
  {
    id: "portcullis",
    name: "Portcullis",
    tag: "Fraud defense",
    year: "2026",
    img: "/projects/portcullis.jpg",
    pattern: "cross",
    desc: "A two-bank interbank clearing system defended by a hybrid rules-and-ML fraud engine — every purchase is scored by both a rules engine and a LightGBM model before a single ledger entry is written.",
    tech: ["Java", "Spring Boot", "Python", "LightGBM", "FastAPI", "Next.js"],
    metrics: ["0.185 avg precision (holdout)", "12.8% fraud caught @ 1% false-alarm"],
    link: "https://github.com/beatsbydan/portcullis",
    linkType: "github",
    linkLabel: "View on GitHub",
  },
  {
    id: "ledgercore",
    name: "LedgerCore",
    tag: "Ledger engine",
    year: "2026",
    img: "/projects/generic-api.jpg",
    pattern: "grid",
    desc: "A double-entry ledger and settlement engine proving correctness under real concurrent load — zero double-spends, zero overdrafts, zero lost events.",
    tech: ["Java", "Spring Boot", "PostgreSQL", "Apache Kafka", "Testcontainers"],
    metrics: ["219.6 transfers/sec sustained", "Zero balance drift across 28,733 transfers"],
    link: "https://github.com/beatsbydan/ledger-core",
    linkType: "github",
    linkLabel: "View on GitHub",
  },
  {
    id: "metricleap",
    name: "MetricLeap",
    tag: "Live · AI SaaS",
    year: "2025",
    img: "/projects/metricleap.jpg",
    pattern: "dots",
    desc: "An AI-powered monitoring & evaluation platform that turns raw survey data into boardroom-ready impact reports for NGOs and impact-driven organizations.",
    tech: ["Next.js", "React", "Supabase", "OpenAI API", "Google Forms API"],
    link: "https://v0-metric-leap-design.vercel.app/",
    linkType: "live",
    linkLabel: "Visit Live Site",
  },
  {
    id: "pitwall",
    name: "PitWall",
    tag: "Data / ML",
    year: "2025",
    img: "/projects/pitwall.jpg",
    pattern: "circles",
    desc: "An F1 race-strategy dashboard — a trained tyre-degradation model and a Monte Carlo simulator that compares pit strategies as real probability distributions, not single guesses.",
    tech: ["Python", "LightGBM", "FastF1", "Next.js", "WebSockets"],
    metrics: ["2.021s MAE on held-out laps", "99.8% win probability, real strategy comparison"],
    link: "https://github.com/beatsbydan/pitwall",
    linkType: "github",
    linkLabel: "View on GitHub",
  },
  {
    id: "farmzone",
    name: "Farm Zone",
    tag: "Live · E-commerce",
    year: "2025",
    img: "/projects/farmzone.jpg",
    pattern: "diagonal",
    desc: "Nigeria's livestock marketplace — three independent locking layers (Redis, queue, database) guarantee an animal is never sold twice under concurrent checkout traffic.",
    tech: ["Node.js", "Express", "PostgreSQL", "Redis", "BullMQ", "Paystack"],
    metrics: ["15,000+ orders fulfilled", "50,000+ livestock across 37 states"],
    link: "https://farmzone.africa",
    linkType: "live",
    linkLabel: "Visit Live Site",
  },
  {
    id: "giftdrop",
    name: "GiftDrop",
    tag: "Social gifting",
    year: "2026",
    img: "/projects/giftdrop.jpg",
    pattern: "dots",
    desc: "A social gifting platform connecting curated wishlists to gifters — a Spring Boot API running on virtual threads paired with a React web client covering landing, admin and consumer experiences.",
    tech: ["Spring Boot", "Java", "PostgreSQL", "Redis", "React", "Paystack"],
    link: null,
  },
  {
    id: "almanac",
    name: "Almanac",
    tag: "Timetabling system",
    year: "2025–26",
    img: "/projects/almanac.jpg",
    pattern: "grid",
    desc: "A university course-timetabling system — a Spring Boot API, a React client, and a real Google OR-Tools CP-SAT solver assigning conflict-free room/day/time slots instead of random sampling.",
    tech: ["Spring Boot", "Java", "PostgreSQL", "React", "Python", "OR-Tools"],
    link: "https://github.com/beatsbydan/almanac",
    linkType: "github",
    linkLabel: "View on GitHub",
  },
  {
    id: "tobipeter",
    name: "Tobi Peter",
    tag: "Artist site & CMS",
    year: "2023",
    img: "/projects/tobipeter.jpg",
    pattern: "circles",
    desc: "A public artist site and a protected admin CMS for touring DJ/producer Tobi Peter — an interactive tour map, a full content dashboard, and a client continuously modernized since 2023.",
    tech: ["React", "Vite", "TanStack Query", "Tailwind CSS", "Framer Motion"],
    link: "https://www.tobipeter.com",
    linkType: "live",
    linkLabel: "Visit Live Site",
  },
]

const experienceList = [
  {
    dates: "09/2025 — Present",
    role: "Backend Engineer",
    company: "Moniepoint Inc. — Lagos, Nigeria",
    desc: "Built and scaled core settlement infrastructure — including a 6M+ transaction Card Issuer Settlement system and a streaming pipeline processing 20M+ records per run — while introducing end-to-end observability and stepping in as frontend engineer during a staffing gap.",
    metrics: ["6M+ card transactions", "4.65M+ settlements / day", "20+ incidents resolved"],
  },
  {
    dates: "02/2024 — 08/2024",
    role: "Backend Engineer Intern",
    company: "Moniepoint Inc. — Lagos, Nigeria",
    desc: "Built and launched a case-study website end to end — integrating Google Analytics and a SendGrid mailing pipeline — while shipping RESTful APIs and responsive frontend features across a fault-tolerant microservices architecture.",
    metrics: ["20–50% faster comms", "80% fewer bugs on owned services"],
  },
]

const skillCategories = [
  { label: "Languages", items: ["Java", "TypeScript / JavaScript", "Python", "SQL"] },
  { label: "Backend", items: ["Spring Boot", "Node.js", "Express.js", "REST APIs", "Microservices", "Apache Kafka"] },
  { label: "Frontend", items: ["React", "Next.js", "React Native", "Tailwind CSS"] },
  { label: "Data & Cloud", items: ["PostgreSQL", "MySQL", "MSSQL", "Redis", "Supabase", "AWS", "GCP", "DigitalOcean"] },
  {
    label: "DevOps & Observability",
    items: ["Docker", "Kubernetes", "Jenkins", "GitLab CI", "Argo CD", "OpenTelemetry", "New Relic"],
  },
  { label: "AI-Assisted", items: ["Claude Code", "Claude API"] },
]

const RESUME_PATH = "/Daniel-Onyeachonam-Resume.pdf"

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  )
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.95.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.73.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.07.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .31.21.67.8.56A10.5 10.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  )
}

export default function HomePage() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const navRef = useRef<HTMLElement | null>(null)
  const cursorDotRef = useRef<HTMLDivElement | null>(null)
  const cursorRingRef = useRef<HTMLDivElement | null>(null)
  const galleryRef = useRef<HTMLDivElement | null>(null)
  const spacerLeftRef = useRef<HTMLDivElement | null>(null)
  const spacerRightRef = useRef<HTMLDivElement | null>(null)
  const loaderNumRef = useRef<HTMLSpanElement | null>(null)
  const modalScrollRef = useRef<HTMLDivElement | null>(null)

  const lenisRef = useRef<Lenis | null>(null)
  const introDoneRef = useRef(false)
  const movedRef = useRef(false)

  useEffect(() => setMounted(true), [])

  function closeModal() {
    setModalOpen(false)
  }

  function handleThemeToggle(e: React.MouseEvent<HTMLButtonElement>) {
    const next = resolvedTheme === "dark" ? "light" : "dark"
    const doc = document as Document & { startViewTransition?: (callback: () => void) => void }
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (!doc.startViewTransition || prefersReducedMotion) {
      setTheme(next)
      return
    }
    document.documentElement.style.setProperty("--theme-toggle-x", `${e.clientX}px`)
    document.documentElement.style.setProperty("--theme-toggle-y", `${e.clientY}px`)
    doc.startViewTransition(() => setTheme(next))
  }

  // the browser restores scroll position across reloads of the same URL —
  // reopening the page mid-session loads it already scrolled down, which
  // fights the entrance animation. Force a clean top on every load.
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual"
    window.scrollTo(0, 0)
  }, [])

  // real touch detection (not device capability) — hides the custom cursor
  // only once an actual touch happens, not just because the device supports it
  useEffect(() => {
    const onTouch = () => document.body.classList.add("touch-mode")
    const onMouse = () => document.body.classList.remove("touch-mode")
    window.addEventListener("touchstart", onTouch, { once: true, passive: true })
    window.addEventListener("mousemove", onMouse, { passive: true })
    return () => {
      window.removeEventListener("touchstart", onTouch)
      window.removeEventListener("mousemove", onMouse)
    }
  }, [])

  // lenis smooth scroll + anchor links + nav hide-on-scroll
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, easing: (t: number) => 1 - Math.pow(1 - t, 3), smoothWheel: true })
    lenisRef.current = lenis

    const update = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    const anchors = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'))
    const onAnchorClick = function (this: HTMLAnchorElement, e: MouseEvent) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href") || "")
      if (target) lenis.scrollTo(target as HTMLElement, { duration: 1.3 })
    }
    anchors.forEach((a) => a.addEventListener("click", onAnchorClick))

    let lastY = 0
    const onLenisScroll = (e: { scroll: number }) => {
      const navEl = navRef.current
      if (!introDoneRef.current || !navEl) {
        lastY = e.scroll
        return
      }
      if (e.scroll > 140 && e.scroll > lastY) navEl.classList.add("hidden")
      else navEl.classList.remove("hidden")
      lastY = e.scroll
    }
    lenis.on("scroll", onLenisScroll)

    return () => {
      anchors.forEach((a) => a.removeEventListener("click", onAnchorClick))
      gsap.ticker.remove(update)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // custom cursor: dot + lagging ring, scales up over any [data-hover] element.
  // Delegated to document so it also works on elements that appear later
  // (like the modal's link), not just what existed at mount time.
  useEffect(() => {
    const dot = cursorDotRef.current
    const ring = cursorRingRef.current
    if (!dot || !ring) return

    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" })
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" })
    const ringX = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3" })
    const ringY = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3" })
    const onMove = (e: MouseEvent) => {
      dotX(e.clientX)
      dotY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)
    }
    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("[data-hover]")) ring.classList.add("hover")
    }
    const onOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("[data-hover]")) ring.classList.remove("hover")
    }
    window.addEventListener("mousemove", onMove)
    document.addEventListener("mouseover", onOver)
    document.addEventListener("mouseout", onOut)
    return () => {
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseover", onOver)
      document.removeEventListener("mouseout", onOut)
    }
  }, [])

  // magnetic buttons
  useEffect(() => {
    const buttons = Array.from(document.querySelectorAll<HTMLElement>(".btn, .theme-toggle"))
    const cleanups: Array<() => void> = []
    buttons.forEach((btn) => {
      const bx = gsap.quickTo(btn, "x", { duration: 0.3, ease: "power3" })
      const by = gsap.quickTo(btn, "y", { duration: 0.3, ease: "power3" })
      const onMove = (e: MouseEvent) => {
        const r = btn.getBoundingClientRect()
        bx((e.clientX - r.left - r.width / 2) * 0.35)
        by((e.clientY - r.top - r.height / 2) * 0.35)
      }
      const onLeave = () => {
        bx(0)
        by(0)
      }
      btn.addEventListener("mousemove", onMove)
      btn.addEventListener("mouseleave", onLeave)
      cleanups.push(() => {
        btn.removeEventListener("mousemove", onMove)
        btn.removeEventListener("mouseleave", onLeave)
      })
    })
    return () => cleanups.forEach((fn) => fn())
  }, [])

  // scroll reveals: `.reveal-head` mask-reveals its text (markup already in
  // JSX), `.reveal` rises up out of a soft blur into focus.
  useEffect(() => {
    gsap.set(".reveal-head .mask > span", { yPercent: 115 })
    gsap.set(".reveal", { y: 28, filter: "blur(6px)" })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          observer.unobserve(entry.target)
          const el = entry.target as HTMLElement
          if (el.classList.contains("reveal-head")) {
            const span = el.querySelector(".mask > span")
            if (span) gsap.to(span, { yPercent: 0, duration: 1.1, ease: "power4.out" })
          } else {
            gsap.to(el, { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power3.out" })
          }
        })
      },
      { threshold: 0.2 },
    )
    document.querySelectorAll(".reveal, .reveal-head").forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // work gallery: centering spacers, bounded wheel/drag scroll that falls
  // through to the page once past the first/last project, debounced
  // snap-to-center, and a staggered entrance the first time it's scrolled to
  useEffect(() => {
    const gallery = galleryRef.current
    const spacerLeft = spacerLeftRef.current
    const spacerRight = spacerRightRef.current
    if (!gallery || !spacerLeft || !spacerRight) return
    const cards = Array.from(gallery.querySelectorAll<HTMLElement>(".g-card"))
    if (!cards.length) return

    function updateSpacers() {
      const w = Math.max(0, (gallery!.clientWidth - cards[0].getBoundingClientRect().width) / 2)
      spacerLeft!.style.width = `${w}px`
      spacerRight!.style.width = `${w}px`
    }
    updateSpacers()

    function findNearestCard() {
      const bounds = gallery!.getBoundingClientRect()
      const center = bounds.left + bounds.width / 2
      let closest = cards[0]
      let closestDist = Infinity
      cards.forEach((c) => {
        const r = c.getBoundingClientRect()
        const d = Math.abs(r.left + r.width / 2 - center)
        if (d < closestDist) {
          closestDist = d
          closest = c
        }
      })
      return closest
    }
    function setActive(card: HTMLElement) {
      cards.forEach((c) => c.classList.remove("active"))
      card.classList.add("active")
    }
    function snapTo(card: HTMLElement, animate: boolean) {
      const bounds = gallery!.getBoundingClientRect()
      const center = bounds.left + bounds.width / 2
      const r = card.getBoundingClientRect()
      const target = gallery!.scrollLeft + (r.left + r.width / 2) - center
      if (animate) gsap.to(gallery!, { scrollLeft: target, duration: 0.6, ease: "power3.out" })
      else gallery!.scrollLeft = target
    }

    setActive(findNearestCard())

    const onResize = () => {
      updateSpacers()
      const active = gallery!.querySelector<HTMLElement>(".g-card.active")
      if (active) snapTo(active, false)
    }
    window.addEventListener("resize", onResize)

    gsap.set(cards, { opacity: 0, y: 36, filter: "blur(6px)" })
    const galleryRevealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          galleryRevealObserver.unobserve(entry.target)
          cards.forEach((c, i) => {
            gsap.to(c, {
              opacity: c.classList.contains("active") ? 1 : 0.4,
              y: 0,
              filter: "blur(0px)",
              duration: 0.9,
              ease: "power3.out",
              delay: i * 0.05,
              clearProps: "opacity,transform,filter",
            })
          })
        })
      },
      { threshold: 0.15 },
    )
    const wrapEl = gallery.closest(".gallery-wrap")
    if (wrapEl) galleryRevealObserver.observe(wrapEl)

    let settleTimer: ReturnType<typeof setTimeout>
    function scheduleSettle() {
      clearTimeout(settleTimer)
      settleTimer = setTimeout(() => {
        const nearest = findNearestCard()
        setActive(nearest)
        snapTo(nearest, true)
      }, 500)
    }

    const onWheel = (e: WheelEvent) => {
      // only take over once the gallery is roughly centered in the viewport
      // (its vertical midpoint has scrolled to about the middle of the
      // screen) — otherwise let the page keep scrolling normally into view
      const rect = gallery!.getBoundingClientRect()
      const viewportMid = window.innerHeight / 2
      if (rect.top > viewportMid || rect.bottom < viewportMid) return

      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      const max = gallery!.scrollWidth - gallery!.clientWidth
      const atStart = gallery!.scrollLeft <= 0
      const atEnd = gallery!.scrollLeft >= max - 1
      if ((delta > 0 && atEnd) || (delta < 0 && atStart)) return
      e.preventDefault()
      e.stopPropagation()
      gallery!.scrollLeft += delta
      scheduleSettle()
    }
    gallery.addEventListener("wheel", onWheel, { passive: false })

    let dragging = false
    let dragStartX = 0
    let dragScrollStart = 0
    const onPointerDown = (e: PointerEvent) => {
      dragging = true
      movedRef.current = false
      dragStartX = e.clientX
      dragScrollStart = gallery!.scrollLeft
      gallery!.classList.add("dragging")
    }
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return
      const dx = e.clientX - dragStartX
      if (Math.abs(dx) > 4) movedRef.current = true
      gallery!.scrollLeft = dragScrollStart - dx
    }
    const endDrag = () => {
      if (!dragging) return
      dragging = false
      gallery!.classList.remove("dragging")
      scheduleSettle()
    }
    gallery.addEventListener("pointerdown", onPointerDown)
    window.addEventListener("pointermove", onPointerMove)
    window.addEventListener("pointerup", endDrag)
    gallery.addEventListener("scroll", scheduleSettle, { passive: true })

    return () => {
      window.removeEventListener("resize", onResize)
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerup", endDrag)
      gallery!.removeEventListener("wheel", onWheel)
      gallery!.removeEventListener("pointerdown", onPointerDown)
      gallery!.removeEventListener("scroll", scheduleSettle)
      clearTimeout(settleTimer)
      galleryRevealObserver.disconnect()
    }
  }, [])

  // Escape closes the modal regardless of when it was opened
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  // the modal scrolls internally with its own Lenis instance while open, so
  // it feels exactly like the rest of the site instead of a plain scrollbar
  useEffect(() => {
    if (!modalOpen) return
    const scrollEl = modalScrollRef.current
    lenisRef.current?.stop()
    if (scrollEl) scrollEl.scrollTop = 0

    let modalLenis: Lenis | null = null
    if (scrollEl && scrollEl.firstElementChild) {
      modalLenis = new Lenis({
        wrapper: scrollEl,
        content: scrollEl.firstElementChild as HTMLElement,
        duration: 1,
        smoothWheel: true,
      })
    }
    const raf = (time: number) => modalLenis?.raf(time * 1000)
    gsap.ticker.add(raf)

    return () => {
      gsap.ticker.remove(raf)
      modalLenis?.destroy()
      lenisRef.current?.start()
    }
  }, [modalOpen])

  // loader counter + hero/nav entrance, once everything has loaded
  useEffect(() => {
    function runIntro() {
      const tl = gsap.timeline({
        onComplete: () => {
          introDoneRef.current = true
          gsap.set(".nav", { clearProps: "transform,opacity" })
        },
      })
      tl.to(".loader", { yPercent: -100, duration: 0.9, ease: "power4.inOut" })
        .set(".loader", { display: "none" })
        // the loader (translateY(-100%)) uncovers the screen from the
        // bottom edge upward, so the nav at the very top is the last thing
        // revealed — starting its slide-down early (overlapping the loader
        // tween) meant it was mostly finished by the time it became visible.
        // Start it only once the loader is actually gone.
        .from(".nav", { y: -40, opacity: 0, duration: 0.6, ease: "power3.out" })
        .from(".hero-eyebrow", { opacity: 0, y: 10, duration: 0.5 }, "-=.3")
        .from(".hero-line span", { yPercent: 115, duration: 0.9, ease: "power4.out", stagger: 0.08 }, "-=.2")
        .from(".hero-sub", { opacity: 0, y: 16, duration: 0.6 }, "-=.4")
        .from(".scroll-cue", { opacity: 0, duration: 0.6 }, "-=.4")
    }

    function startLoaderCount() {
      const num = { v: 0 }
      gsap.to(num, {
        v: 100,
        duration: 1.3,
        ease: "power2.inOut",
        onUpdate: () => {
          if (loaderNumRef.current) loaderNumRef.current.textContent = String(Math.round(num.v))
        },
        onComplete: runIntro,
      })
      gsap.to(".loader-bar", { width: "100%", duration: 1.3, ease: "power2.inOut" })
    }

    if (document.readyState === "complete") {
      startLoaderCount()
    } else {
      window.addEventListener("load", startLoaderCount, { once: true })
      return () => window.removeEventListener("load", startLoaderCount)
    }
  }, [])

  return (
    <>
      <div className="bg-pattern" />
      <div className="bg-grain" />
      <div className="cursor-dot" ref={cursorDotRef} />
      <div className="cursor-ring" ref={cursorRingRef} />

      <div className="loader">
        <div className="loader-bar" />
        <div className="loader-row">
          <div className="loader-label">
            Daniel Onyeachonam
            <br />
            Portfolio
          </div>
          <div className="loader-label">Loading assets</div>
        </div>
        <div className="loader-row">
          <div className="loader-count">
            <span ref={loaderNumRef}>0</span>%
          </div>
          <div className="loader-label">Lagos, NG</div>
        </div>
      </div>

      <header className="nav" ref={navRef}>
        <a href="#top" className="nav-mark" data-hover="true">
          DANIEL<span>.ONYEACHONAM</span>
        </a>
        <nav className="nav-links">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} data-hover="true">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <a className="theme-toggle" href={RESUME_PATH} download="Daniel-Onyeachonam-Resume.pdf" data-hover="true" aria-label="Download résumé">
            <svg viewBox="0 0 24 24" strokeWidth="1.6">
              <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 19h16" />
            </svg>
          </a>
          <button className="theme-toggle" onClick={handleThemeToggle} disabled={!mounted} data-hover="true" aria-label="Toggle theme">
            {mounted && resolvedTheme === "dark" ? (
              <svg viewBox="0 0 24 24" strokeWidth="1.6">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" strokeWidth="1.6">
                <path d="M21 12.8A9 9 0 1111.2 3 7 7 0 0021 12.8z" />
              </svg>
            )}
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="marquee">
            <div className="marquee-track">
              {[...marqueeItems, ...marqueeItems].map((item, i) => (
                <span key={i}>{item}</span>
              ))}
            </div>
          </div>

          <div className="hero-body">
            <div className="hero-eyebrow">
              <span className="dot-live" />
              <span className="eyebrow">Available for select work — Lagos, Nigeria (remote-friendly)</span>
            </div>
            <h1 className="hero-title">
              <div className="hero-line">
                <span>Software engineer</span>
              </div>
              <div className="hero-line">
                <span>building full-stack systems</span>
              </div>
              <div className="hero-line">
                <span>
                  that hold up <em>— at scale.</em>
                </span>
              </div>
            </h1>

            <div className="hero-sub">
              <p>
                2+ years shipping production fintech systems at Moniepoint, end to end — backend, frontend, and
                everything load-bearing in between. Currently open to new opportunities.
              </p>
              <div className="btn-row">
                <a href="#work" className="btn primary" data-hover="true">
                  View Work <ArrowIcon />
                </a>
                <a href="#contact" className="btn" data-hover="true">
                  Get in touch
                </a>
              </div>
            </div>
          </div>

          <div className="scroll-cue">
            <div className="line" />
            <span>SCROLL</span>
          </div>
        </section>

        <section id="about">
          <div className="sec-head">
            <h2 className="reveal-head">
              <span className="mask">
                <span>About</span>
              </span>
            </h2>
            <span className="count reveal">2+ years professional experience</span>
          </div>
          <div className="about-grid">
            <div className="about-photo reveal" data-hover="true">
              <Image src="/daniel.jpg" alt="Daniel Onyeachonam" fill />
            </div>
            <div className="about-copy">
              <p className="about-lead reveal-head">
                <span className="mask">
                  <span>I build things end to end — and I don&apos;t stop at &quot;it works.&quot;</span>
                </span>
              </p>
              <p className="about-body reveal">
                Software engineering, to me, isn&apos;t a stack — it&apos;s whatever the problem actually needs: a
                backend service, the frontend wired to it, a data pipeline underneath. I care about the parts most
                people skip — the edge cases, the load test, the thing that breaks at 2am. Outside of work, I&apos;m
                still building: personal projects, new ideas, the occasional deep rabbit hole.
              </p>
            </div>
          </div>
        </section>

        <section id="work">
          <div className="sec-head">
            <h2 className="reveal-head">
              <span className="mask">
                <span>Projects</span>
              </span>
            </h2>
            <span className="count reveal">8 projects — scroll or drag to explore</span>
          </div>

          <div className="gallery-wrap">
            <div className="gallery" ref={galleryRef}>
              <div className="g-spacer" ref={spacerLeftRef} />
              {projects.map((p, i) => (
                <article
                  key={p.id}
                  className="g-card"
                  data-hover="true"
                  onClick={() => {
                    if (movedRef.current) return
                    setActiveProject(p)
                    setModalOpen(true)
                  }}
                >
                  <span className="g-index">{String(i + 1).padStart(2, "0")}</span>
                  <div className={`g-face pat-${p.pattern}`}>
                    <span className="g-tag">{p.tag}</span>
                    <h3 className="g-title">{p.name}</h3>
                    <span className="g-year">{p.year}</span>
                  </div>
                </article>
              ))}
              <div className="g-spacer" ref={spacerRightRef} />
            </div>
          </div>
          <p className="gallery-hint">Click a project to open it</p>
        </section>

        <section id="experience">
          <div className="sec-head">
            <h2 className="reveal-head">
              <span className="mask">
                <span>Experience</span>
              </span>
            </h2>
            <a href={RESUME_PATH} download="Daniel-Onyeachonam-Resume.pdf" className="resume-link reveal" data-hover="true">
              Download Résumé
              <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" fill="none">
                <path d="M12 4v10m0 0 3.5-3.5M12 14l-3.5-3.5M5 18h14" />
              </svg>
            </a>
          </div>

          <div className="exp-list">
            {experienceList.map((exp) => (
              <div className="exp-row reveal" key={exp.role}>
                <span className="exp-dates">{exp.dates}</span>
                <div className="exp-main">
                  <div className="exp-head">
                    <h3 className="exp-role">{exp.role}</h3>
                    <span className="exp-company">{exp.company}</span>
                  </div>
                  <p className="exp-desc">{exp.desc}</p>
                  <div className="exp-metrics">
                    {exp.metrics.map((m) => (
                      <span className="tag-stat" key={m}>
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="skills">
          <div className="sec-head">
            <h2 className="reveal-head">
              <span className="mask">
                <span>Skills</span>
              </span>
            </h2>
            <span className="count reveal">What I build with</span>
          </div>
          <div className="skill-list">
            {skillCategories.map((cat) => (
              <div className="skill-row reveal" key={cat.label}>
                <span className="skill-label">{cat.label}</span>
                <div className="skill-pills">
                  {cat.items.map((item) => (
                    <span className="tag" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact">
          <div className="contact-top reveal">
            <span className="eyebrow">Contact</span>
            <div style={{ marginTop: "1.6rem" }}>
              <a href="mailto:danielonyeachonam2020@gmail.com" className="contact-email" data-hover="true">
                Let&apos;s talk
                <svg viewBox="0 0 24 24" width="40" height="40" stroke="currentColor" strokeWidth="1.6" fill="none">
                  <path d="M7 17 17 7M7 7h10v10" />
                </svg>
                <span className="underline" />
              </a>
            </div>
          </div>
          <div className="contact-foot reveal">
            <span className="copy">© 2026 Daniel Onyeachonam — built with care in Lagos</span>
            <div className="social-row">
              <a href="https://github.com/beatsbydan" data-hover="true" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/daniel-onyeachonam"
                data-hover="true"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a href="#top" data-hover="true">
                Back to top
              </a>
            </div>
          </div>
        </section>
      </main>

      <div
        className={`modal-backdrop${modalOpen ? " open" : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModal()
        }}
      >
        <div className="modal">
          <button className="modal-close" onClick={closeModal} data-hover="true" aria-label="Close">
            <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" fill="none">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
          <div className="modal-scroll" ref={modalScrollRef} data-lenis-prevent="true">
            {activeProject && (
              <div className="modal-inner">
                <div className="modal-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={activeProject.img} alt={activeProject.name} />
                </div>
                <div className="modal-body">
                  <div className="modal-head">
                    <div>
                      <span className="modal-tag">{activeProject.tag}</span>
                      <h3>{activeProject.name}</h3>
                    </div>
                    <span className="modal-year">{activeProject.year}</span>
                  </div>
                  <p className="modal-desc">{activeProject.desc}</p>
                  <div className="modal-group">
                    <span className="modal-label">Stack</span>
                    <div className="modal-tags">
                      {activeProject.tech.map((t) => (
                        <span className="tag" key={t}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  {activeProject.metrics && activeProject.metrics.length > 0 && (
                    <div className="modal-group">
                      <span className="modal-label">Highlights</span>
                      <div className="modal-metrics">
                        {activeProject.metrics.map((m) => (
                          <span className="tag-stat" key={m}>
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {activeProject.link && (
                    <a
                      href={activeProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="modal-link"
                      data-hover="true"
                      aria-label={activeProject.linkLabel || "Visit"}
                    >
                      {activeProject.linkType === "github" ? <GithubIcon /> : <ArrowIcon />}
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
