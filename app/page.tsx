"use client"

import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Terminal } from "lucide-react"
import {
  FadeIn,
  StatusIndicator,
  TypewriterAnimation,
  DigitalRain,
} from "@/components/animations/reveal-animations"
import InteractiveTerminal from "@/components/terminal-ui"

export default function HomePage() {
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

        <div className="h-full p-6">
          <FadeIn>
            <Card className="h-[75vh] min-h-[500px] terminal-block text-white relative overflow-hidden">
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
        </div>
      </main>
    </div>
  )
}
