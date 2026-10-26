"use client"

import { useState } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Terminal, Code } from "lucide-react"
import {
  FadeIn,
  StatusIndicator,
  TypewriterAnimation,
  DigitalRain,
} from "@/components/animations/reveal-animations"
import InteractiveTerminal from "@/components/terminal-ui"
import { ContactModal } from "@/components/contact-modal"

export default function HomePage() {
  const [isContactOpen, setIsContactOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="md:ml-80 print:ml-0">
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

        <div className="p-6 space-y-6">
          <FadeIn>
            <Card className="h-[480px] terminal-block text-white relative overflow-hidden">
              <DigitalRain className="opacity-20" />
              <div className="relative z-10 px-6 h-full flex flex-col">
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

          {/* Call to Action */}
          <FadeIn delay={0.2}>
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
