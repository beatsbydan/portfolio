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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold font-sans text-primary">{project.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Project Image */}
          <div className="relative w-full h-64 bg-muted rounded-lg overflow-hidden">
            <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
          </div>

          {/* Project Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 font-sans">About This Project</h3>
                <p className="text-muted-foreground leading-relaxed font-serif">{project.longDescription}</p>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-lg font-semibold mb-2 font-sans">Key Features</h3>
                <ul className="space-y-2">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Target className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground font-serif">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Challenges */}
              <div>
                <h3 className="text-lg font-semibold mb-2 font-sans">Technical Challenges</h3>
                <ul className="space-y-2">
                  {project.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground font-serif">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Results */}
              <div>
                <h3 className="text-lg font-semibold mb-2 font-sans">Results & Impact</h3>
                <ul className="space-y-2">
                  {project.results.map((result, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground font-serif">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Project Details Sidebar */}
            <div className="space-y-6">
              {/* Project Meta */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{project.year}</span>
                </div>
                <div>
                  <Badge variant="secondary">{project.category}</Badge>
                  <Badge variant="outline" className="ml-2">
                    {project.status}
                  </Badge>
                </div>
              </div>

              {/* Technologies */}
              <div>
                <h4 className="font-semibold mb-3 font-sans">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              {project.metrics && (
                <div>
                  <h4 className="font-semibold mb-3 font-sans">Project Metrics</h4>
                  <div className="space-y-2">
                    {project.metrics.users && (
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        <span className="text-sm font-serif">{project.metrics.users}</span>
                      </div>
                    )}
                    {project.metrics.performance && (
                      <div className="text-sm">
                        <span className="font-medium">Performance: </span>
                        <span className="text-muted-foreground font-serif">{project.metrics.performance}</span>
                      </div>
                    )}
                    {project.metrics.impact && (
                      <div className="text-sm">
                        <span className="font-medium">Impact: </span>
                        <span className="text-muted-foreground font-serif">{project.metrics.impact}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                {project.liveUrl && (
                  <Button asChild className="w-full">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Live Demo
                    </a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button variant="outline" asChild className="w-full bg-transparent">
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      View Source Code
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
