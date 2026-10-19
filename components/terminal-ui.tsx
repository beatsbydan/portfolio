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

const defaultTerminalHistory:TerminalLine[] = [
    { type: 'output', content: 'Welcome to Daniel\'s Portfolio Terminal!', timestamp: Date.now() },
    { type: 'output', content: 'Type "help" to see available commands.', timestamp: Date.now() + 1 },
    { type: 'output', content: '─────────────────────────────────────────', timestamp: Date.now() + 2 }
  ]

interface TerminalLine {
  type: 'command' | 'output' | 'error'
  content: string
  timestamp: number
}
interface InteractiveTerminalProps {
    autoScroll?: boolean
  }

const InteractiveTerminal:React.FC<InteractiveTerminalProps> = ({autoScroll = true}) => {
  const [history, setHistory] = useState<TerminalLine[]>(defaultTerminalHistory)
  const [input, setInput] = useState('')
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
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
    if (window.matchMedia("(pointer: fine)").matches) {
      inputRef.current?.focus()
    }
  }, [])

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
      setHistory(defaultTerminalHistory)
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
    <div className="h-full text-white">
      <Scrollable ref={scrollableRef}>
        {/* Terminal Output */}
        <div
          className="flex-1 text-xs md:text-sm p-3 md:p-4 h-full space-y-1"
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
              ) : (
                <div className="text-green-400 pl-4">{line.content}</div>
              )}
            </div>
          ))}

          {/* Input Line */}
          <div className="flex items-start space-x-2 pt-2">
            <span className="text-orange-500 shrink-0">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-white caret-orange-500"
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        </div>
      </Scrollable>

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