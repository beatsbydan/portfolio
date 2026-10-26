"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

interface AnimationProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}

// Fade In Animation - Enhanced for software engineer theme
export function FadeIn({ children, delay = 0, duration = 0.8, className = "" }: AnimationProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    if (prefersReducedMotion()) {
      gsap.set(element, { opacity: 1, y: 0 })
      return
    }

    const tween = gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    )

    return () => {
      tween.kill()
    }
  }, [delay, duration])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

// Slide In From Left - Smoother for clean design
export function SlideInLeft({ children, delay = 0, duration = 0.8, className = "" }: AnimationProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    if (prefersReducedMotion()) {
      gsap.set(element, { opacity: 1, x: 0 })
      return
    }

    const tween = gsap.fromTo(
      element,
      {
        opacity: 0,
        x: -40,
      },
      {
        opacity: 1,
        x: 0,
        duration,
        delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    )

    return () => {
      tween.kill()
    }
  }, [delay, duration])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

// Slide In From Right - Smoother for clean design
export function SlideInRight({ children, delay = 0, duration = 0.8, className = "" }: AnimationProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    if (prefersReducedMotion()) {
      gsap.set(element, { opacity: 1, x: 0 })
      return
    }

    const tween = gsap.fromTo(
      element,
      {
        opacity: 0,
        x: 40,
      },
      {
        opacity: 1,
        x: 0,
        duration,
        delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    )

    return () => {
      tween.kill()
    }
  }, [delay, duration])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

// Scale In Animation - Refined for professional look
export function ScaleIn({ children, delay = 0, duration = 0.8, className = "" }: AnimationProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    if (prefersReducedMotion()) {
      gsap.set(element, { opacity: 1, scale: 1 })
      return
    }

    const tween = gsap.fromTo(
      element,
      {
        opacity: 0,
        scale: 0.9,
      },
      {
        opacity: 1,
        scale: 1,
        duration,
        delay,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    )

    return () => {
      tween.kill()
    }
  }, [delay, duration])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

// Stagger Animation - Enhanced for better flow
export function StaggerIn({
  children,
  delay = 0,
  staggerDelay = 0.1,
  className = "",
}: AnimationProps & { staggerDelay?: number }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const childElements = container.children

    if (prefersReducedMotion()) {
      gsap.set(childElements, { opacity: 1, y: 0 })
      return
    }

    const tween = gsap.fromTo(
      childElements,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay,
        stagger: staggerDelay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    )

    return () => {
      tween.kill()
    }
  }, [delay, staggerDelay])

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}

// Hero Text Animation - Enhanced for software engineer theme
export function HeroTextAnimation({ children, className = "" }: { children: ReactNode; className?: string }) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const tl = gsap.timeline()

    tl.fromTo(
      element.children,
      {
        opacity: 0,
        y: 30,
        scale: 0.98,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      },
    )

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

// Floating Animation - Subtle for professional look
export function FloatingAnimation({ children, className = "" }: { children: ReactNode; className?: string }) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element || prefersReducedMotion()) return

    const tween = gsap.to(element, {
      y: -8,
      duration: 3,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    })

    return () => {
      tween.kill()
    }
  }, [])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

export function TypewriterAnimation({
  text,
  delay = 0,
  speed = 0.05,
  className = "",
}: {
  text: string
  delay?: number
  speed?: number
  className?: string
}) {
  const elementRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const chars = text.split("")
    element.textContent = ""

    const tl = gsap.timeline({ delay })

    chars.forEach((char) => {
      tl.to(element, {
        duration: speed,
        ease: "none",
        onComplete: () => {
          element.textContent += char
        },
      })
    })

    // Add blinking cursor effect — toggled once per leg via onRepeat,
    // not onUpdate (which would fire every frame and just flicker).
    tl.to(element, {
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      onRepeat: () => {
        if (element.textContent?.endsWith("|")) {
          element.textContent = element.textContent.slice(0, -1)
        } else {
          element.textContent += "|"
        }
      },
    })

    return () => {
      tl.kill()
    }
  }, [text, delay, speed])

  return <span ref={elementRef} className={className}></span>
}

export function CodeBlockReveal({ children, delay = 0, className = "" }: AnimationProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const tl = gsap.timeline({
      delay,
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    })

    // Animate container
    tl.fromTo(
      element,
      {
        opacity: 0,
        scale: 0.95,
        rotationX: 5,
      },
      {
        opacity: 1,
        scale: 1,
        rotationX: 0,
        duration: 0.8,
        ease: "power2.out",
      },
    )

    // Animate code lines if they exist
    const codeLines = element.querySelectorAll(".code-line")
    if (codeLines.length > 0) {
      tl.fromTo(
        codeLines,
        {
          opacity: 0,
          x: -20,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.4",
      )
    }

    return () => {
      tl.kill()
    }
  }, [delay])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

export function InteractiveCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const handleMouseEnter = () => {
      gsap.to(element, {
        y: -8,
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    const handleMouseLeave = () => {
      gsap.to(element, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    element.addEventListener("mouseenter", handleMouseEnter)
    element.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter)
      element.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

export function ProgressBar({
  percentage,
  delay = 0,
  duration = 1.5,
  className = "",
}: {
  percentage: number
  delay?: number
  duration?: number
  className?: string
}) {
  const barRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    const fill = fillRef.current
    if (!bar || !fill) return

    const tween = gsap.fromTo(
      fill,
      {
        width: "0%",
      },
      {
        width: `${percentage}%`,
        duration,
        delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: bar,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    )

    return () => {
      tween.kill()
    }
  }, [percentage, delay, duration])

  return (
    <div ref={barRef} className={`w-full bg-border rounded-full h-2 ${className}`}>
      <div ref={fillRef} className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: "0%" }} />
    </div>
  )
}

export function SlideUpModal({
  children,
  isOpen,
  className = "",
}: {
  children: ReactNode
  isOpen: boolean
  className?: string
}) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    if (isOpen) {
      const tween = gsap.fromTo(
        element,
        {
          opacity: 0,
          y: 50,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
        },
      )

      return () => {
        tween.kill()
      }
    }
  }, [isOpen])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

export function TerminalCommand({
  command,
  output,
  delay = 0,
  className = "",
}: {
  command: string
  output?: string
  delay?: number
  className?: string
}) {
  const elementRef = useRef<HTMLDivElement>(null)
  const [currentText, setCurrentText] = useState("")
  const [showOutput, setShowOutput] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const tl = gsap.timeline({ delay })

    // Type command
    const commandChars = command.split("")
    let currentCommand = ""

    commandChars.forEach((char) => {
      tl.to(
        {},
        {
          duration: 0.05,
          onComplete: () => {
            currentCommand += char
            setCurrentText(currentCommand)
          },
        },
      )
    })

    // Show output after command is typed
    if (output) {
      tl.to(
        {},
        {
          duration: 0.5,
          onComplete: () => {
            setShowOutput(true)
            setShowCursor(false)
          },
        },
      )
    }

    // Cursor blinking
    tl.to(
      {},
      {
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        onUpdate: () => {
          setShowCursor((prev) => !prev)
        },
      },
    )

    return () => {
      tl.kill()
    }
  }, [command, output, delay])

  return (
    <div ref={elementRef} className={`font-mono text-sm ${className}`}>
      <div className="flex items-center space-x-2">
        <span className="text-primary">$</span>
        <span className="text-white">
          {currentText}
          {showCursor && <span className="text-primary animate-pulse">_</span>}
        </span>
      </div>
      {showOutput && output && <div className="text-accent mt-1 pl-4">{output}</div>}
    </div>
  )
}

export function GlitchText({
  text,
  intensity = 0.1,
  className = "",
}: {
  text: string
  intensity?: number
  className?: string
}) {
  const elementRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element || prefersReducedMotion()) return

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 })

    tl.to(element, {
      duration: 0.1,
      skewX: 2,
      ease: "power2.inOut",
    })
      .to(element, {
        duration: 0.05,
        skewX: -1,
        textShadow: `2px 0 #ea580c, -2px 0 #f97316`,
        ease: "power2.inOut",
      })
      .to(element, {
        duration: 0.05,
        skewX: 0,
        textShadow: "none",
        ease: "power2.inOut",
      })

    return () => {
      tl.kill()
    }
  }, [intensity])

  return (
    <span ref={elementRef} className={className} data-text={text}>
      {text}
    </span>
  )
}

export function DigitalRain({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || prefersReducedMotion()) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const fontSize = 14
    const chars = "01"
    let drops: number[] = []

    function resize() {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      const columns = Math.ceil(canvas.width / fontSize)
      drops = new Array(columns).fill(1)
    }

    resize()
    window.addEventListener("resize", resize)

    function draw() {
      if (!ctx || !canvas) return

      ctx.fillStyle = "rgba(15, 23, 42, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "#ea580c"
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 100)
    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none opacity-20 ${className}`}
      style={{ width: "100%", height: "100%" }}
    />
  )
}

export function TerminalWindow({
  children,
  title = "terminal",
  delay = 0,
  className = "",
}: AnimationProps & { title?: string }) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const tween = gsap.fromTo(
      element,
      {
        opacity: 0,
        scale: 0.9,
        y: 20,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        delay,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    )

    return () => {
      tween.kill()
    }
  }, [delay])

  return (
    <div ref={elementRef} className={`terminal-block rounded-lg overflow-hidden ${className}`}>
      <div className="flex items-center justify-between p-3 bg-slate-800 border-b border-primary/20">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-sm font-mono text-white">{title}</span>
        </div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}

export function CodeSyntaxReveal({
  code,
  language = "javascript",
  delay = 0,
  className = "",
}: {
  code: string
  language?: string
  delay?: number
  className?: string
}) {
  const elementRef = useRef<HTMLPreElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const lines = code.split("\n")
    element.innerHTML = ""

    const tl = gsap.timeline({
      delay,
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    })

    lines.forEach((line, index) => {
      const lineElement = document.createElement("div")
      lineElement.className = "code-line opacity-0"
      lineElement.innerHTML = highlightSyntax(line)
      element.appendChild(lineElement)

      tl.to(
        lineElement,
        {
          opacity: 1,
          x: 0,
          duration: 0.3,
          ease: "power2.out",
        },
        index * 0.1,
      )
    })

    return () => {
      tl.kill()
    }
  }, [code, language, delay])

  function highlightSyntax(line: string): string {
    // Simple syntax highlighting for demo
    return line
      .replace(/\b(const|let|var|function|return|if|else|for|while)\b/g, '<span class="text-purple-400">$1</span>')
      .replace(/\b(true|false|null|undefined)\b/g, '<span class="text-blue-400">$1</span>')
      .replace(/"([^"]*)"/g, '<span class="text-green-400">"$1"</span>')
      .replace(/\/\/.*$/g, '<span class="text-gray-500">$&</span>')
      .replace(/\b(\d+)\b/g, '<span class="text-yellow-400">$1</span>')
  }

  return (
    <pre
      ref={elementRef}
      className={`font-mono text-sm bg-slate-900 p-4 rounded-lg overflow-x-auto ${className}`}
    ></pre>
  )
}

export function TerminalLoader({
  progress,
  label = "Loading",
  delay = 0,
  className = "",
}: {
  progress: number
  label?: string
  delay?: number
  className?: string
}) {
  const elementRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    const bar = barRef.current
    if (!element || !bar) return

    const fadeTween = gsap.fromTo(
      element,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        delay,
        ease: "power2.out",
      },
    )

    const barTween = gsap.to(bar, {
      width: `${progress}%`,
      duration: 1,
      delay: delay + 0.2,
      ease: "power2.out",
    })

    return () => {
      fadeTween.kill()
      barTween.kill()
    }
  }, [progress, delay])

  return (
    <div ref={elementRef} className={`font-mono text-sm ${className}`}>
      <div className="flex items-center space-x-2 mb-2">
        <span className="text-primary">$</span>
        <span className="text-white">{label}...</span>
        <span className="text-accent">{progress}%</span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2">
        <div
          ref={barRef}
          className="bg-linear-to-r from-primary to-accent h-2 rounded-full transition-all duration-300"
          style={{ width: "0%" }}
        />
      </div>
    </div>
  )
}

export function TechParticles({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || prefersReducedMotion()) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    function resize() {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resize()
    window.addEventListener("resize", resize)

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
    }> = []

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      })
    }

    let animationFrameId: number
    let isActive = true

    function animate() {
      if (!ctx || !canvas || !isActive) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(234, 88, 12, ${particle.opacity})`
        ctx.fill()

        // Draw connections
        particles.slice(index + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(249, 115, 22, ${0.1 * (1 - distance / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      isActive = false
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ width: "100%", height: "100%" }}
    />
  )
}

export function HoverGlow({
  children,
  glowColor = "primary",
  className = "",
}: {
  children: ReactNode
  glowColor?: string
  className?: string
}) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const handleMouseEnter = () => {
      gsap.to(element, {
        boxShadow: `0 0 20px rgba(234, 88, 12, 0.3)`,
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    const handleMouseLeave = () => {
      gsap.to(element, {
        boxShadow: "0 0 0px rgba(234, 88, 12, 0)",
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    element.addEventListener("mouseenter", handleMouseEnter)
    element.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter)
      element.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [glowColor])

  return (
    <div ref={elementRef} className={`transition-all duration-300 ${className}`}>
      {children}
    </div>
  )
}

export function StatusIndicator({
  status = "online",
  label,
  className = "",
}: {
  status?: "online" | "offline" | "busy" | "away"
  label?: string
  className?: string
}) {
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    if (!dot) return

    const colors = {
      online: "#10b981",
      offline: "#6b7280",
      busy: "#ef4444",
      away: "#f59e0b",
    }

    dot.style.backgroundColor = colors[status]

    if (prefersReducedMotion()) return

    const tween = gsap.to(dot, {
      scale: 1.2,
      duration: 1,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
    })

    return () => {
      tween.kill()
    }
  }, [status])

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div ref={dotRef} className="w-2 h-2 rounded-full" />
      {label && <span className="text-sm text-muted-foreground">{label}</span>}
    </div>
  )
}
