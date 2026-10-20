"use client"

import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Code,
  Terminal,
  User,
  Coffee,
  BookOpen,
  Target,
  Zap,
  Server,
  Database,
  Globe,
  Monitor,
  Heart,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import {
  FadeIn,
  StaggerIn,
  TypewriterAnimation,
  StatusIndicator,
} from "@/components/animations/reveal-animations"
import { ContactModal } from "@/components/contact-modal"

type SkillTier = "Expert" | "Proficient" | "Familiar"

const tierStyles: Record<SkillTier, string> = {
  Expert: "border-green-500/30 text-green-500",
  Proficient: "border-blue-500/30 text-blue-500",
  Familiar: "border-muted-foreground/30 text-muted-foreground",
}

const skillCategories: {
  name: string
  skills: { name: string; tier: SkillTier }[]
  icon: typeof Monitor
  color: string
}[] = [
  {
    name: "Frontend",
    skills: [
      { name: "React", tier: "Expert" },
      { name: "TypeScript", tier: "Expert" },
      { name: "Next.js", tier: "Expert" },
      { name: "Tailwind CSS", tier: "Proficient" },
    ],
    icon: Monitor,
    color: "text-blue-500",
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", tier: "Expert" },
      { name: "Python", tier: "Proficient" },
      { name: "API Design", tier: "Expert" },
      { name: "Microservices", tier: "Proficient" },
    ],
    icon: Server,
    color: "text-green-500",
  },
  {
    name: "Database",
    skills: [
      { name: "PostgreSQL", tier: "Proficient" },
      { name: "MongoDB", tier: "Proficient" },
      { name: "Redis", tier: "Familiar" },
      { name: "SQL Optimization", tier: "Proficient" },
    ],
    icon: Database,
    color: "text-purple-500",
  },
  {
    name: "DevOps",
    skills: [
      { name: "Docker", tier: "Proficient" },
      { name: "AWS", tier: "Proficient" },
      { name: "CI/CD", tier: "Proficient" },
      { name: "Kubernetes", tier: "Familiar" },
    ],
    icon: Globe,
    color: "text-orange-500",
  },
]

const achievements = [
  { title: "Clean Code Advocate", description: "Maintainable, readable code", icon: Code },
  { title: "Performance Optimizer", description: "Fast, efficient applications", icon: Zap },
  { title: "Problem Solver", description: "Creative technical solutions", icon: Target },
  { title: "Team Player", description: "Collaborative development", icon: Heart },
]

const terminalHistory = [
  "$ cat /etc/profile",
  "> Name: Software Engineer",
  "> Role: Software Engineer (Mid-Level)",
  "> Experience: 3+ years",
  "$ ls skills/",
  "> frontend/ backend/ database/ devops/",
  "$ git log --oneline",
  "> feat: optimized performance",
  "> fix: resolved edge cases",
  "> docs: updated documentation",
]

export default function AboutPage() {
  const [currentLine, setCurrentLine] = useState(0)
  const [isContactOpen, setIsContactOpen] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine((prev) => (prev + 1) % terminalHistory.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="md:ml-80 min-h-screen print:ml-0">
        {/* Header Bar */}
        <FadeIn duration={0.4}>
          <div className="bg-card border-b border-border p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-primary" />
                  <span className="font-mono text-sm">about.profile</span>
                </div>
                <Badge variant="outline">Personal Info</Badge>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <StatusIndicator status="online" label="Active" />
                <span className="hidden font-mono sm:inline">profile.json</span>
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="p-6 space-y-6">
          {/* Profile Terminal */}
          <FadeIn>
            <Card className="terminal-block text-white h-72 md:h-96">
              <div className="p-6 h-full flex flex-col">
                {/* Terminal Header */}
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-primary/20">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-sm font-mono">profile.sh</span>
                  </div>
                  <Badge variant="outline" className="border-primary/30 text-primary">
                    Interactive
                  </Badge>
                </div>

                {/* Terminal Content */}
                <div className="flex-1 font-mono text-sm space-y-2 overflow-hidden">
                  <div className="space-y-1">
                    <div className="text-primary">Loading developer profile...</div>
                    <div className="text-muted-foreground">Initializing personal data...</div>
                    <div className="h-px bg-primary/20 my-3"></div>
                  </div>

                  <div className="space-y-1">
                    {terminalHistory.slice(0, currentLine + 1).map((line, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        {line.startsWith("$") ? (
                          <>
                            <span className="text-primary">$</span>
                            <TypewriterAnimation text={line.slice(2)} className="text-white" speed={30} />
                          </>
                        ) : (
                          <div className="text-accent pl-4">{line.slice(2)}</div>
                        )}
                      </div>
                    ))}
                    <div className="flex items-center space-x-1 mt-4">
                      <span className="text-primary">$</span>
                      <span className="terminal-cursor text-white">_</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </FadeIn>

          {/* Skills Matrix */}
          <FadeIn delay={0.3}>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center">
                  <Code className="h-5 w-5 mr-2 text-primary" />
                  Technical Skills Matrix
                </h2>
                <Badge variant="outline">Live Data</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {skillCategories.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="space-y-4">
                    <div className="flex items-center space-x-2 pb-2 border-b border-border">
                      <category.icon className={`h-4 w-4 ${category.color}`} />
                      <h3 className="font-medium">{category.name}</h3>
                    </div>
                    <div className="space-y-2">
                      {category.skills.map((skill, skillIndex) => (
                        <div key={skillIndex} className="flex items-center justify-between">
                          <span className="text-sm">{skill.name}</span>
                          <Badge variant="outline" className={`text-xs ${tierStyles[skill.tier]}`}>
                            {skill.tier}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </FadeIn>

          {/* Achievements Grid */}
          <StaggerIn staggerDelay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {achievements.map((achievement, index) => (
                <Card key={index} className="p-4 hover:shadow-lg transition-all duration-300 hover:border-primary/40">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <achievement.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{achievement.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </StaggerIn>

          {/* Philosophy Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FadeIn delay={0.4} className="h-full">
              <Card className="p-6 h-full flex flex-col">
                <div className="flex items-center space-x-2 mb-4">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Development Philosophy</h2>
                </div>
                <div className="space-y-4 text-muted-foreground font-serif">
                  <p>
                    I believe in writing clean, maintainable code that not only solves problems but also tells a story.
                    Every line of code should have a purpose, and every function should be a step toward a larger goal.
                  </p>
                  <p>
                    My approach combines technical excellence with user-centric thinking, ensuring that the solutions I
                    build are not just technically sound but also meaningful and impactful.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="outline">Clean Code</Badge>
                    <Badge variant="outline">Test-Driven</Badge>
                    <Badge variant="outline">User-Focused</Badge>
                    <Badge variant="outline">Performance-First</Badge>
                  </div>
                </div>
              </Card>
            </FadeIn>

            <FadeIn delay={0.5} className="h-full">
              <Card className="p-6 h-full flex flex-col">
                <div className="flex items-center space-x-2 mb-4">
                  <Coffee className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Beyond the Code</h2>
                </div>
                <div className="space-y-4 text-muted-foreground font-serif">
                  <p>
                    When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to open source
                    projects, or sharing knowledge with the developer community.
                  </p>
                  <p>
                    I&apos;m passionate about mentoring junior developers and believe that the best way to grow is by helping
                    others grow alongside you.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="outline">Open Source</Badge>
                    <Badge variant="outline">Mentoring</Badge>
                    <Badge variant="outline">Tech Writing</Badge>
                    <Badge variant="outline">Community</Badge>
                  </div>
                </div>
              </Card>
            </FadeIn>
          </div>

          {/* Call to Action */}
          <FadeIn delay={0.6}>
            <Card className="p-8 text-center bg-linear-to-r from-primary/5 to-accent/5 border-primary/20">
              <div className="max-w-2xl mx-auto space-y-4">
                <h2 className="text-2xl font-bold">Ready to Collaborate?</h2>
                <p className="text-muted-foreground font-serif">
                  I&apos;m always excited to work on challenging projects and collaborate with talented teams. Let&apos;s build
                  something amazing together.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="group" onClick={() => setIsContactOpen(true)}>
                    <Terminal className="mr-2 h-4 w-4" />
                    Initialize Contact
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/portfolio">
                      <Code className="mr-2 h-4 w-4" />
                      View Projects
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </FadeIn>
        </div>
      </main>
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  )
}
