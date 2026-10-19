"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Terminal,
  Code,
  Database,
  Server,
  Globe,
  GitBranch,
  Activity,
  Clock,
  Zap,
  CheckCircle,
  AlertCircle,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import {
  FadeIn,
  SlideInRight,
  StaggerIn,
  StatusIndicator,
  TypewriterAnimation,
  DigitalRain,
  HoverGlow,
  GlitchText,
} from "@/components/animations/reveal-animations"
import { ContactModal } from "@/components/contact-modal"
import InteractiveTerminal from "@/components/terminal-ui"

const techStack =[
  { 
    icon: Code, 
    title: "Frontend", 
    badge: "Client Side", items: 
    [
      {
        stack: "React.js",
        experience: "advanced"
      },
      {
        stack: "Next.js",
        experience: "advanced"
      },
      {
        stack: "TypeScript",
        experience: "advanced"
      },
      {
        stack: "HTML & CSS",
        experience: "advanced"
      },
      {
        stack: "React-Native",
        experience: "intermediate"
      }
    ] 
  },
  { 
    icon: Server, 
    title: "Backend", 
    badge: "Server Side", 
    items: 
    [
      {
        stack: "Node.js",
        experience: "advanced"
      },
      {
        stack: "SpringBoot",
        experience: "advanced"
      },
      {
        stack: "Python",
        experience: "intermediate"
      },
      {
        stack: "Nest.js",
        experience: "intermediate"
      }
    ]
  },
  { 
    icon: Database, 
    title: "Database", 
    badge: "Data Layer", 
    items: [
      {
        stack: "PostgreSQL",
        experience: "advanced"
      },
      {
        stack: "MySQL",
        experience: "advanced"
      },
      {
        stack: "MSSQL",
        experience: "advanced"
      },
      {
        stack: "MongoDB",
        experience: "intermediate"
      }
    ]
  },
  { 
    icon: Globe, 
    title: "DevOps", 
    badge: "Deployment", 
    items: [
      {
        stack: "Docker",
        experience: "advanced"
      },
      {
        stack: "Kubernetes",
        experience: "advanced"
      },
      {
        stack: "Jenkins",
        experience: "advanced"
      },
      {
        stack: "AWS",
        experience: "intermediate"
      },
    ]
  }
]

const recentActivity = [
  { action: "Deployed my portfolio.", time: "2 hours ago", status: "success" }
]

export default function HomePage() {
  const [metrics, setMetrics] = useState([
    { label: "CPU Load", value: 0, color: "text-green-500" },
    { label: "Memory (Heap)", value: 0, color: "text-yellow-500" },
    { label: "Network (Speed)", value: 0, color: "text-blue-500" },
    { label: "Disk Usage", value: 0, color: "text-red-500" },
  ]);
  const [isContactOpen, setIsContactOpen] = useState(false)


  useEffect(() => {
    // Chrome-only / experimental browser APIs with no official TS types.
    interface PerformanceWithMemory extends Performance {
      memory?: { usedJSHeapSize: number; jsHeapSizeLimit: number }
    }
    interface NavigatorConnection extends Navigator {
      connection?: { downlink: number }
      mozConnection?: { downlink: number }
      webkitConnection?: { downlink: number }
    }

    const updateStats = async () => {
      // 1. Memory Usage %
      const perf = window.performance as PerformanceWithMemory
      const mem = perf.memory
        ? Math.round((perf.memory.usedJSHeapSize / perf.memory.jsHeapSizeLimit) * 100)
        : 0;

      // 2. Network Load (Mapped 0-100 based on 100Mbps max)
      const nav = navigator as NavigatorConnection;
      const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
      const net = connection ? Math.min(Math.round((connection.downlink / 100) * 100), 100) : 0;

      // 3. Disk Quota Usage %
      let storage = 0;
      if (navigator.storage && navigator.storage.estimate) {
        const { usage, quota } = await navigator.storage.estimate();
        if(usage && quota)storage = Math.round((usage / quota) * 100);
      }

      // 4. CPU Simulation (Hardware Concurrency + Random Variance for UI feel)
      const cpuBase = (navigator.hardwareConcurrency || 4) * 10;
      const cpu = Math.min(cpuBase + Math.floor(Math.random() * 10), 100);

      setMetrics([
        { label: "CPU Load", value: cpu, color: "text-green-500" },
        { label: "Memory (Heap)", value: mem, color: "text-yellow-500" },
        { label: "Network (Speed)", value: net, color: "text-blue-500" },
        { label: "Disk Usage", value: storage, color: "text-red-500" },
      ]);
    };

    const interval = setInterval(updateStats, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="md:ml-80 min-h-screen print:ml-0">
        {/* Terminal Header Bar */}
        <FadeIn duration={0.4}>
          <div className="bg-card border-b border-border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Terminal className="h-5 w-5 text-primary" />
                  <span className="font-mono text-sm">
                    <TypewriterAnimation text="daniel@portfolio:~$" speed={0.03} />
                  </span>
                </div>
              </div>
              <StatusIndicator status="online" label="Online" />
            </div>
          </div>
        </FadeIn>

        <div className="h-full p-6 space-y-6">
          {/* Hero Dashboard Section */}
          <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Terminal Window */}
            <div className="h-full lg:col-span-2">
              <FadeIn>
                <Card className="h-[60vh] min-h-[380px] lg:h-118 terminal-block text-white relative overflow-hidden">
                  <DigitalRain className="opacity-20" />
                  <div className="relative z-10 p-6 h-full flex flex-col">
                    {/* Terminal Header */}
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-primary/20">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <span className="text-sm font-mono">terminal</span>
                      </div>
                      <Badge variant="outline" className="border-primary/30 text-primary">
                        Active Session
                      </Badge>
                    </div>

                    {/* Terminal Content */}
                    <InteractiveTerminal autoScroll/>
                  </div>
                </Card>
              </FadeIn>
            </div>

            {/* System Metrics */}
            <div className="space-y-4">
              <SlideInRight>
                <Card className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold flex items-center">
                      <Activity className="h-4 w-4 mr-2 text-primary" />
                      System Metrics
                    </h3>
                    <Badge variant="outline">Live</Badge>
                  </div>
                  <div className="space-y-3">
                    {metrics.map((metric) => (
                      <div key={metric.label} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{metric.label}</span>
                          <span className={metric.color}>{metric.value}%</span>
                        </div>
                        <Progress value={metric.value} className="h-2" />
                      </div>
                    ))}
                  </div>
                </Card>
              </SlideInRight>

              <SlideInRight delay={0.2}>
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold flex items-center">
                      <GitBranch className="h-4 w-4 mr-2 text-primary" />
                      Quick Stats
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">15+</div>
                      <div className="text-xs text-muted-foreground">Projects</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">3+</div>
                      <div className="text-xs text-muted-foreground">Years</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">50k+</div>
                      <div className="text-xs text-muted-foreground">Lines of Code</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">99%</div>
                      <div className="text-xs text-muted-foreground">Uptime</div>
                    </div>
                  </div>
                </Card>
              </SlideInRight>
            </div>
          </div>
          

          {/* Dashboard Widgets */}
          <StaggerIn staggerDelay={0.1}>
            {/* Tech Stack Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mt-4 md:mt-6">
              {techStack.map((card) => (
                <HoverGlow key={card.title} className="h-full rounded-xl">
                  <Card className="p-4 h-full">
                    <div className="flex items-center justify-between mb-3">
                      <card.icon className="h-5 w-5 text-primary" />
                      <Badge variant="outline">{card.badge}</Badge>
                    </div>
                    <h3 className="font-semibold mb-2 text-sm md:text-base">{card.title}</h3>
                    <div className="space-y-1.5">
                      {card.items.map((item) => (
                        <div key={item.stack} className="flex justify-between text-xs md:text-sm">
                          <span>{item.stack}</span>
                          <span className={item.experience === "advanced" ? "text-green-500" : "text-yellow-500"}>●</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </HoverGlow>
              ))}
            </div>
          </StaggerIn>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FadeIn delay={0.3}>
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-primary" />
                    Recent Activity
                  </h3>
                </div>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50">
                      {activity.status === "success" ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-yellow-500" />
                      )}
                      <div className="flex-1">
                        <div className="text-sm font-medium">{activity.action}</div>
                        <div className="text-xs text-muted-foreground">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </FadeIn>

            {/* Quick Actions */}
            <FadeIn delay={0.4}>
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold flex items-center">
                    <Zap className="h-4 w-4 mr-2 text-primary" />
                    Quick Actions
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" asChild className="h-auto p-4 flex-col space-y-2 bg-transparent">
                    <Link href="/portfolio">
                      <Code className="h-5 w-5" />
                      <span className="text-sm">View Projects</span>
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="h-auto p-4 flex-col space-y-2 bg-transparent">
                    <Link href="/resume">
                      <TrendingUp className="h-5 w-5" />
                      <span className="text-sm">View Resume</span>
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="h-auto p-4 flex-col space-y-2 bg-transparent">
                    <Link href="/about">
                      <Activity className="h-5 w-5" />
                      <span className="text-sm">About Me</span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto p-4 flex-col space-y-2 bg-transparent"
                    onClick={() => setIsContactOpen(true)}
                  >
                    <Globe className="h-5 w-5" />
                    <span className="text-sm">Contact Me</span>
                  </Button>
                </div>
              </Card>
            </FadeIn>
          </div>

          {/* Call to Action */}
          <FadeIn delay={0.5}>
            <Card className="p-8 text-center bg-linear-to-r from-primary/5 to-accent/5 border-primary/20">
              <div className="max-w-2xl mx-auto space-y-4">
                <h2 className="text-2xl font-bold">
                  <GlitchText text="Ready to Build Something Amazing?" />
                </h2>
                <p className="text-muted-foreground">
                  Let&apos;s collaborate on your next project. I bring technical expertise, creative problem-solving, and a
                  passion for clean, efficient code.
                </p>
              </div>
            </Card>
          </FadeIn>
        </div>
        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      </main>
    </div>
  )
}
