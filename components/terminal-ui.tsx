"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Scrollable from "./ui/scrollable"
import { OverlayScrollbarsComponentRef } from "overlayscrollbars-react"

// Commands that navigate the site, matching the hints shown in the sidebar nav
const navigationCommands: Record<string, { path: string; label: string }> = {
  "cd ~": { path: "/", label: "~" },
  "cd home": { path: "/", label: "~" },
  "cd about": { path: "/about", label: "about" },
  "cat about.md": { path: "/about", label: "about" },
  "cd resume": { path: "/resume", label: "resume" },
  "less resume.pdf": { path: "/resume", label: "resume" },
  "cd portfolio": { path: "/portfolio", label: "portfolio" },
  "cd projects": { path: "/portfolio", label: "portfolio" },
  "ls projects/": { path: "/portfolio", label: "portfolio" },
}

// Commands that open an external link in a new tab
const externalCommands: Record<string, { url: string; label: string }> = {
  "open github": { url: "https://github.com/beatsbydan", label: "GitHub" },
  "open linkedin": { url: "https://www.linkedin.com/in/daniel-onyeachonam/", label: "LinkedIn" },
}

// Command responses mapping
const commandResponses: Record<string, string | string[]> = {
  "whoami": "Daniel Onyeachonam, a Software Engineer, lover of chicken & chips!",
  "help": [
    "AVAILABLE COMMANDS:",
    "  whoami           - Brief overview about me.",
    "  skills           - Some technologies I work with.",
    "  experience       - My work experience so far.",
    "  contact          - How to contact me.",
    "  education        - My educational history so far.",
    "  clear            - Clear terminal.",
    "  help             - Show this help message.",
    "",
    "NAVIGATION:",
    "  cd ~             - Go to the home page.",
    "  cat about.md     - Go to the about page.",
    "  less resume.pdf  - Go to the resume page.",
    "  ls projects/     - Go to the portfolio page.",
    "",
    "LINKS:",
    "  open github      - Open my GitHub in a new tab.",
    "  open linkedin    - Open my LinkedIn in a new tab.",
    "",
    "Tip: press Tab to autocomplete, ↑/↓ to cycle command history.",
  ],
  "skills": [
    "Frontend: React, Next.js, TypeScript, HTML/CSS, React Native.",
    "Backend: Node.js, Java (SpringBoot), Python, Nest.js.",
    "Database: PostgreSQL, MySQL, MSSQL, MongoDB.",
    "DevOps: Docker, Kubernetes, Jenkins, GitLab CI, AWS, Digital Ocean."
  ],
  "experience": [
    "Software Engineer - 3+ years",
    "Specialized in full-stack development",
    "Built 15+ production applications",
    "Expertise in modern web technologies"
  ],
  "contact": [
    "Email: daniel.onyeachonam@outlook.com.",
    "LinkedIn: @daniel-onyeachonam.",
    "Portfolio: chonam.dev."
  ],
  "education": [
    "Bachelor's Degree in Software Engineering (Bowen University, 2022-2025).",
  ]
}

// All commands that are valid completion/suggestion targets
const allCommands = [
  ...Object.keys(commandResponses),
  ...Object.keys(navigationCommands),
  ...Object.keys(externalCommands),
  "clear",
]

// Quick-tap commands for touch devices, where the input never autofocuses
const quickCommands = ["whoami", "skills", "contact", "help"]

const bootSequence = [
  "Booting daniel-os v1.0.0...",
  "[OK] Loading modules: react, next, typescript",
  "[OK] Mounting /projects",
  "[OK] Establishing secure connection",
]

const welcomeLines: TerminalLine[] = [
  { type: 'output', content: 'Welcome to Daniel\'s Portfolio Terminal!', timestamp: Date.now() },
  { type: 'output', content: 'Type "help" to see available commands.', timestamp: Date.now() + 1 },
  { type: 'output', content: '─────────────────────────────────────────', timestamp: Date.now() + 2 }
]

interface TerminalLine {
  type: 'command' | 'output' | 'error' | 'boot'
  content: string
  timestamp: number
}

// Give plain-text output some visual hierarchy instead of flat green on
// everything: "ALL CAPS:" lines are section headers, "  cmd   - desc" lines
// split into a highlighted command and a muted description, blank lines
// become spacers, and everything else is regular body text.
function renderOutputLine(content: string) {
  if (content === '') {
    return <div className="h-2" />
  }

  if (/^[A-Z ]+:$/.test(content)) {
    return <div className="text-orange-400 font-semibold mt-2 first:mt-0">{content}</div>
  }

  const commandMatch = content.match(/^ {2}(\S.*?)\s{2,}- (.+)$/)
  if (commandMatch) {
    const [, cmd, desc] = commandMatch
    return (
      <div className="flex flex-wrap gap-x-2 pl-4">
        <span className="text-white">{cmd}</span>
        <span className="text-white/50">- {desc}</span>
      </div>
    )
  }

  return <div className="text-slate-200 pl-4">{content}</div>
}
interface InteractiveTerminalProps {
    autoScroll?: boolean
  }

const InteractiveTerminal:React.FC<InteractiveTerminalProps> = ({autoScroll = true}) => {
  const [history, setHistory] = useState<TerminalLine[]>([])
  const [input, setInput] = useState('')
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollableRef = useRef<OverlayScrollbarsComponentRef>(null)
  const router = useRouter()

  // Auto-scroll to bottom when history updates
  useEffect(() => {
    if (!autoScroll) return
    if (scrollableRef.current) {
      const instance = scrollableRef.current.osInstance()
      if (instance) {
        const { viewport } = instance.elements()
        viewport.scrollTo({
          top: viewport.scrollHeight,
          behavior: 'smooth'
        })
      }
    }
  }, [history, autoScroll])

  // Autofocus on mount only for precise-pointer (desktop-like) devices —
  // on touch devices this would pop the keyboard and scroll the page the
  // instant the homepage loads, before the user has interacted with anything.
  useEffect(() => {
    const isPrecisePointer = window.matchMedia("(pointer: fine)").matches
    setIsTouchDevice(!isPrecisePointer)
    if (isPrecisePointer) {
      inputRef.current?.focus()
    }
  }, [])

  // Boot sequence: stagger a few system-log lines in before the welcome
  // message, then it settles into the normal prompt.
  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = []

    bootSequence.forEach((line, i) => {
      timeouts.push(
        setTimeout(() => {
          setHistory((prev) => [...prev, { type: 'boot', content: line, timestamp: Date.now() + i }])
        }, i * 180)
      )
    })

    timeouts.push(
      setTimeout(() => {
        setHistory((prev) => [...prev, ...welcomeLines])
      }, bootSequence.length * 180 + 150)
    )

    return () => timeouts.forEach(clearTimeout)
  }, [])

  const trimmedInput = input.trim().toLowerCase()
  const suggestion =
    trimmedInput.length > 0
      ? allCommands.find((c) => c !== trimmedInput && c.startsWith(trimmedInput))
      : undefined

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()

    if (!trimmedCmd) return

    // Add command to history
    const newHistory: TerminalLine[] = [
      ...history,
      { type: 'command', content: cmd, timestamp: Date.now() }
    ]

    // Handle clear command
    if (trimmedCmd === 'clear') {
      setHistory(welcomeLines)
      setInput('')
      setCommandHistory([...commandHistory, cmd])
      return
    }

    // Handle navigation commands
    const destination = navigationCommands[trimmedCmd]
    if (destination) {
      newHistory.push({
        type: 'output',
        content: `Navigating to ${destination.label}...`,
        timestamp: Date.now()
      })
      setHistory(newHistory)
      setCommandHistory([...commandHistory, cmd])
      setHistoryIndex(-1)
      setInput('')
      setTimeout(() => router.push(destination.path), 400)
      return
    }

    // Handle external link commands
    const externalLink = externalCommands[trimmedCmd]
    if (externalLink) {
      newHistory.push({
        type: 'output',
        content: `Opening ${externalLink.label} in a new tab...`,
        timestamp: Date.now()
      })
      setHistory(newHistory)
      setCommandHistory([...commandHistory, cmd])
      setHistoryIndex(-1)
      setInput('')
      window.open(externalLink.url, '_blank', 'noopener,noreferrer')
      return
    }

    // Process command
    const response = commandResponses[trimmedCmd]

    if (response) {
      if (Array.isArray(response)) {
        response.forEach((line, index) => {
          newHistory.push({
            type: 'output',
            content: line,
            timestamp: Date.now() + index
          })
        })
      } else {
        newHistory.push({
          type: 'output',
          content: response,
          timestamp: Date.now()
        })
      }
    } else {
      newHistory.push({
        type: 'error',
        content: `Command not found: ${trimmedCmd}. Type "help" for available commands.`,
        timestamp: Date.now()
      })
    }

    setHistory(newHistory)
    setCommandHistory([...commandHistory, cmd])
    setHistoryIndex(-1)
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input)
    } else if (e.key === 'Tab') {
      e.preventDefault()
      if (suggestion) {
        setInput(suggestion)
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1)
          setInput('')
        } else {
          setHistoryIndex(newIndex)
          setInput(commandHistory[newIndex])
        }
      }
    }
  }

  return (
    <div className="flex-1 min-h-0 text-white flex flex-col">
      {/* flex-1 + min-h-0 (not h-full) so this reliably claims exactly the
          space left after the header above, instead of fighting it via
          flex-shrink — which is what was throwing the top/bottom padding
          inside the card out of sync. */}
      <div className="flex-1 min-h-0">
        <Scrollable ref={scrollableRef}>
          {/* Terminal Output */}
          <div
            className="text-xs md:text-sm p-3 md:p-4 space-y-1"
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((line, index) => (
              <div key={`${line.timestamp}-${index}`} className="wrap-break-word">
                {line.type === 'command' ? (
                  <div className="flex items-start space-x-2">
                    <span className="text-orange-500 shrink-0">$</span>
                    <span className="text-white">{line.content}</span>
                  </div>
                ) : line.type === 'error' ? (
                  <div className="text-red-400 pl-4">{line.content}</div>
                ) : line.type === 'boot' ? (
                  <div className="text-white/40">{line.content}</div>
                ) : (
                  renderOutputLine(line.content)
                )}
              </div>
            ))}

            {/* Input Line */}
            <div className="flex items-start space-x-2 pt-2">
              <span className="text-orange-500 shrink-0">$</span>
              <div className="relative flex-1">
                <div aria-hidden className="pointer-events-none absolute inset-0 whitespace-pre">
                  <span className="invisible">{input}</span>
                  <span className="text-white/30">{suggestion ? suggestion.slice(trimmedInput.length) : ''}</span>
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="relative w-full bg-transparent outline-none text-white caret-orange-500"
                  spellCheck={false}
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
        </Scrollable>
      </div>

      {/* Quick-tap commands — the input never autofocuses on touch devices,
          so this is the discovery path for mobile visitors. */}
      {isTouchDevice && (
        <div className="flex gap-2 overflow-x-auto p-2 border-t border-primary/20 no-scrollbar">
          {quickCommands.map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              className="shrink-0 cursor-pointer rounded-full border border-primary/30 px-3 py-1 text-xs text-primary/90 active:bg-primary/20"
            >
              {cmd}
            </button>
          ))}
        </div>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgb(15 23 42);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgb(71 85 105);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgb(100 116 139);
        }
      `}</style>
    </div>
  )
}

export default InteractiveTerminal
