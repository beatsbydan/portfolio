"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Calendar, Users, Target, AlertTriangle, CheckCircle2 } from "lucide-react"
import Image from "next/image"

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
  metrics?: {
    users?: string
    performance?: string
    impact?: string
  }
}

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0">
        <div className="p-8 sm:p-10 space-y-8">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold font-sans text-primary">{project.title}</DialogTitle>
          </DialogHeader>

          {/* Project Image — aspect ratio matches the actual screenshots
              (1280x632) so object-cover never has to crop the sides to
              fill a mismatched fixed-height box. */}
          <div className="relative w-full aspect-[1280/632] bg-muted rounded-xl overflow-hidden">
            <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{project.year}</span>
            </div>
            <Badge variant="secondary">{project.category}</Badge>
            <Badge variant="outline">{project.status}</Badge>
          </div>

          {/* Technologies */}
          <div className="space-y-3">
            <h4 className="font-semibold font-sans">Technologies Used</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* About */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold font-sans">About This Project</h3>
            <p className="text-muted-foreground leading-relaxed font-serif text-base max-w-prose">
              {project.longDescription}
            </p>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold font-sans">Key Features</h3>
            <ul className="space-y-3">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Target className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground font-serif leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Challenges */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold font-sans">Technical Challenges</h3>
            <ul className="space-y-3">
              {project.challenges.map((challenge, index) => (
                <li key={index} className="flex items-start gap-3">
                  <AlertTriangle className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground font-serif leading-relaxed">{challenge}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Results */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold font-sans">Results &amp; Impact</h3>
            <ul className="space-y-3">
              {project.results.map((result, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground font-serif leading-relaxed">{result}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Metrics */}
          {project.metrics && (
            <div className="space-y-3">
              <h3 className="text-xl font-semibold font-sans">Project Metrics</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {project.metrics.users && (
                  <div className="rounded-lg border border-border bg-muted/20 p-4 flex items-start gap-2">
                    <Users className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm font-serif">{project.metrics.users}</span>
                  </div>
                )}
                {project.metrics.performance && (
                  <div className="rounded-lg border border-border bg-muted/20 p-4">
                    <div className="text-xs font-medium text-muted-foreground uppercase mb-1">Performance</div>
                    <div className="text-sm font-serif">{project.metrics.performance}</div>
                  </div>
                )}
                {project.metrics.impact && (
                  <div className="rounded-lg border border-border bg-muted/20 p-4">
                    <div className="text-xs font-medium text-muted-foreground uppercase mb-1">Impact</div>
                    <div className="text-sm font-serif">{project.metrics.impact}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            {project.liveUrl && (
              <Button asChild size="lg" className="flex-1 h-auto py-4 text-base">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-5 w-5" />
                  View Live Demo
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button variant="outline" asChild size="lg" className="flex-1 h-auto py-4 text-base bg-transparent">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-5 w-5" />
                  View Source Code
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
