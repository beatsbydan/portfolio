"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { ContactModal } from "@/components/contact-modal"
import {
  Home,
  User,
  FileText,
  Briefcase,
  Mail,
  Menu,
  X,
  ChevronRight,
  Github,
  Linkedin,
  ExternalLink,
  Sun,
  Moon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Scrollable from "./ui/scrollable"
import { GlitchText } from "@/components/animations/reveal-animations"

const navigationItems = [
  {
    name: "home",
    label: "Home",
    href: "/",
    icon: Home,
    command: "cd ~",
    description: "Welcome screen",
  },
  {
    name: "about",
    label: "About",
    href: "/about",
    icon: User,
    command: "cat about.md",
    description: "Personal info",
  },
  {
    name: "resume",
    label: "Resume",
    href: "/resume",
    icon: FileText,
    command: "less resume.pdf",
    description: "Experience & skills",
  },
  {
    name: "portfolio",
    label: "Portfolio",
    href: "/portfolio",
    icon: Briefcase,
    command: "ls projects/",
    description: "Recent work",
  },
]

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/beatsbydan",
    icon: Github,
    command: "git remote -v",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/daniel-onyeachonam/",
    icon: Linkedin,
    command: "curl linkedin",
  },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const pathname = usePathname()
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const handleThemeToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next = resolvedTheme === "dark" ? "light" : "dark"

    // Document with the experimental View Transitions API, which isn't yet
    // in lib.dom.d.ts for every supported TS target.
    const doc = document as Document & {
      startViewTransition?: (callback: () => void) => void
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (!doc.startViewTransition || prefersReducedMotion) {
      setTheme(next)
      return
    }

    document.documentElement.style.setProperty("--theme-toggle-x", `${e.clientX}px`)
    document.documentElement.style.setProperty("--theme-toggle-y", `${e.clientY}px`)
    doc.startViewTransition(() => setTheme(next))
  }

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="sticky top-0 z-50 flex items-center h-12 px-2 md:hidden bg-sidebar/90 backdrop-blur-sm border-b border-sidebar-border print:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-sidebar-accent"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-12 md:top-0 z-40 h-[calc(100dvh-3rem)] md:h-dvh w-80 transform bg-sidebar border-r border-sidebar-border transition-transform duration-300 ease-in-out print:hidden",
          "md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* User Info */}
        <div className="border-b border-sidebar-border p-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 shrink-0 rounded-xl overflow-hidden border border-primary/20">
                <Image src="/logo.png" alt="Daniel Onyeachonam logo" width={40} height={40} className="h-full w-full object-cover" />
              </div>
              <div>
                <h2 className="font-bold text-sidebar-foreground">
                  <GlitchText text="Daniel Onyeachonam" />
                </h2>
                <p className="text-sm text-sidebar-foreground/70 font-serif">Software Engineer</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs text-sidebar-foreground/70">Available for work</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 h-[calc(100%-125px)]">
          <Scrollable>
            <div className="p-4 space-y-6">
              {/* Main Navigation */}
              <div>
                <div className="text-xs text-sidebar-foreground/50 uppercase tracking-wider mb-4 flex items-center">
                  <span>Navigation</span>
                  <div className="ml-2 h-px bg-sidebar-border flex-1"></div>
                </div>
                <div className="space-y-1">
                  {navigationItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link key={item.name} href={item.href} onClick={() => setIsOpen(false)}>
                        <div
                          className={cn(
                            "group flex items-center justify-between rounded-lg p-3 transition-all duration-200",
                            "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                            isActive && "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm",
                          )}
                        >
                          <div className="flex items-center space-x-3">
                            <item.icon className="h-4 w-4" />
                            <div>
                              <div className="font-medium">{item.label}</div>
                              <div className="text-xs opacity-70">{item.description}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <code className="text-xs opacity-60 group-hover:opacity-100 transition-opacity">
                              {item.command}
                            </code>
                            <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>

              {/* Social Links */}
              <div>
                <div className="text-xs text-sidebar-foreground/50 uppercase tracking-wider mb-4 flex items-center">
                  <span>Social</span>
                  <div className="ml-2 h-px bg-sidebar-border flex-1"></div>
                </div>
                <div className="space-y-1">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-lg p-3 transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    >
                      <div className="flex items-center space-x-3">
                        <link.icon className="h-4 w-4" />
                        <span className="font-medium">{link.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <code className="text-xs opacity-60 group-hover:opacity-100 transition-opacity">
                          {link.command}
                        </code>
                        <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Contact Section */}
              <div>
                <div className="text-xs text-sidebar-foreground/50 uppercase tracking-wider mb-4 flex items-center">
                  <span>Contact</span>
                  <div className="ml-2 h-px bg-sidebar-border flex-1"></div>
                </div>
                <Button
                  variant="ghost"
                  className="w-full justify-start group hover:bg-sidebar-accent cursor-pointer hover:text-sidebar-accent-foreground p-3 h-auto"
                  onClick={() => setIsContactOpen(true)}
                >
                  <Mail className="mr-3 h-4 w-4" />
                  <div className="text-left">
                    <div className="font-medium">Send Message</div>
                    <div className="text-xs opacity-70">Get in touch</div>
                  </div>
                  <code className="ml-auto text-xs opacity-60 group-hover:opacity-100 transition-opacity">
                    mail -s
                  </code>
                </Button>
              </div>

              {/* Theme Toggle */}
              <div>
                <div className="text-xs text-sidebar-foreground/50 uppercase tracking-wider mb-4 flex items-center">
                  <span>System</span>
                  <div className="ml-2 h-px bg-sidebar-border flex-1"></div>
                </div>
                <Button
                  variant="ghost"
                  className="w-full justify-start group hover:bg-sidebar-accent cursor-pointer hover:text-sidebar-accent-foreground p-3 h-auto"
                  onClick={handleThemeToggle}
                  disabled={!mounted}
                >
                  {mounted && resolvedTheme === "dark" ? (
                    <Sun className="mr-3 h-4 w-4" />
                  ) : (
                    <Moon className="mr-3 h-4 w-4" />
                  )}
                  <div className="text-left">
                    <div className="font-medium">
                      {mounted && resolvedTheme === "dark" ? "Light Mode" : "Dark Mode"}
                    </div>
                    <div className="text-xs opacity-70">Toggle theme</div>
                  </div>
                  <code className="ml-auto text-xs opacity-60 group-hover:opacity-100 transition-opacity">
                    theme --toggle
                  </code>
                </Button>
              </div>
            </div>
          </Scrollable>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setIsOpen(false)} />}

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  )
}
