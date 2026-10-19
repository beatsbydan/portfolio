"use client"

import type React from "react"
import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { ProjectModal } from "@/components/project-modal"
import { ContactModal } from "@/components/contact-modal"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Folder,
  File,
  Terminal,
  Code,
  Globe,
  Server,
  ExternalLink,
  Github,
  Play,
  Pause,
  RotateCcw,
  Activity,
  Users,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"
import { FadeIn, StaggerIn, HoverGlow } from "@/components/animations/reveal-animations"
import { cn } from "@/lib/utils"

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

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isRunning, setIsRunning] = useState(true)
  const [isContactOpen, setIsContactOpen] = useState(false)

  const categoryMap: Record<string, string[]> = {
    web: ["Web Applications"],
    api: ["APIs & Backend"],
    fullstack: ["Full-Stack Projects"],
    opensource: ["Open Source"],
  }

  const categoryDefs = [
    { id: "all", label: "All Projects", icon: Folder },
    { id: "web", label: "Web Apps", icon: Globe },
    { id: "api", label: "APIs", icon: Server },
    { id: "fullstack", label: "Full-Stack", icon: Code },
    { id: "opensource", label: "Open Source", icon: Github },
  ]

  const projects: Project[] = [
    {
      id: "1",
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
      longDescription:
        "A comprehensive e-commerce platform built with modern web technologies, featuring secure payment processing, real-time inventory management, and a powerful admin dashboard. The application handles thousands of products and provides a seamless shopping experience across all devices.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Tailwind CSS", "Prisma"],
      category: "Full-Stack Projects",
      year: "2024",
      status: "Live",
      features: [
        "Secure user authentication and authorization",
        "Real-time inventory tracking and management",
        "Integrated Stripe payment processing",
        "Responsive design optimized for all devices",
        "Advanced search and filtering capabilities",
        "Admin dashboard with analytics and reporting",
      ],
      challenges: [
        "Implementing secure payment processing with Stripe webhooks",
        "Optimizing database queries for large product catalogs",
        "Building real-time inventory updates across multiple users",
        "Ensuring PCI compliance for payment data handling",
      ],
      results: [
        "Successfully processing 1000+ transactions monthly",
        "99.9% uptime with optimized performance",
        "Reduced page load times by 40% through optimization",
        "Increased conversion rate by 25% with improved UX",
      ],
      githubUrl: "https://github.com/yourusername/ecommerce-platform",
      liveUrl: "https://your-ecommerce-demo.com",
      metrics: {
        users: "5,000+ active users",
        performance: "< 2s page load time",
        impact: "25% conversion increase",
      },
    },
    {
      id: "2",
      title: "Task Management API",
      description: "RESTful API with real-time updates, authentication, and comprehensive documentation.",
      longDescription:
        "A robust task management API built with Node.js and Express, featuring JWT authentication, real-time WebSocket connections, and comprehensive API documentation. The system supports team collaboration, project management, and automated workflows.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["Node.js", "Express", "MongoDB", "Socket.io", "JWT", "Swagger"],
      category: "APIs & Backend",
      year: "2024",
      status: "Live",
      features: [
        "RESTful API design with comprehensive endpoints",
        "JWT-based authentication and authorization",
        "Real-time updates using WebSocket connections",
        "Automated API documentation with Swagger",
        "Rate limiting and security middleware",
        "Comprehensive test coverage with Jest",
      ],
      challenges: [
        "Implementing efficient real-time synchronization",
        "Designing scalable database schema for complex relationships",
        "Handling concurrent operations and data consistency",
        "Optimizing API performance for high-traffic scenarios",
      ],
      results: [
        "Serving 10,000+ API requests daily",
        "99.95% API uptime with robust error handling",
        "Sub-100ms average response time",
        "Zero security vulnerabilities in production",
      ],
      githubUrl: "https://github.com/yourusername/task-api",
      liveUrl: "https://api.your-task-manager.com/docs",
      metrics: {
        users: "2,000+ API consumers",
        performance: "< 100ms response time",
        impact: "50% productivity increase",
      },
    },
    {
      id: "3",
      title: "React Component Library",
      description: "Reusable component library with TypeScript, Storybook, and automated testing.",
      longDescription:
        "A comprehensive React component library built with TypeScript, featuring accessible components, comprehensive documentation, and automated testing. Published to npm with semantic versioning and used across multiple projects.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["React", "TypeScript", "Storybook", "Jest", "Rollup", "CSS-in-JS"],
      category: "Open Source",
      year: "2023",
      status: "Maintained",
      features: [
        "50+ reusable React components with TypeScript",
        "Comprehensive Storybook documentation",
        "Automated testing with Jest and React Testing Library",
        "Accessibility compliance (WCAG 2.1)",
        "Tree-shaking support for optimal bundle size",
        "Semantic versioning and automated releases",
      ],
      challenges: [
        "Ensuring consistent design system across components",
        "Implementing comprehensive accessibility features",
        "Optimizing bundle size while maintaining functionality",
        "Creating flexible APIs for diverse use cases",
      ],
      results: [
        "1,000+ weekly npm downloads",
        "Used in 15+ production applications",
        "100% accessibility compliance achieved",
        "Reduced development time by 40% for consuming projects",
      ],
      githubUrl: "https://github.com/yourusername/react-components",
      liveUrl: "https://your-components.netlify.app",
      metrics: {
        users: "100+ developers using",
        performance: "< 50kb bundle size",
        impact: "40% dev time reduction",
      },
    },
    {
      id: "4",
      title: "Real-Time Chat Application",
      description: "Modern chat application with real-time messaging, file sharing, and video calls.",
      longDescription:
        "A feature-rich chat application built with React and Node.js, supporting real-time messaging, file sharing, video calls, and group conversations. The application uses WebRTC for peer-to-peer communication and Socket.io for real-time updates.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["React", "Node.js", "Socket.io", "WebRTC", "MongoDB", "AWS S3"],
      category: "Web Applications",
      year: "2023",
      status: "Live",
      features: [
        "Real-time messaging with typing indicators",
        "File and image sharing with cloud storage",
        "Video and voice calling using WebRTC",
        "Group conversations and channel management",
        "Message encryption for security",
        "Mobile-responsive progressive web app",
      ],
      challenges: [
        "Implementing reliable WebRTC connections",
        "Handling message synchronization across devices",
        "Optimizing real-time performance for large groups",
        "Ensuring message delivery and offline support",
      ],
      results: [
        "Supporting 500+ concurrent users",
        "99.8% message delivery success rate",
        "Average connection time under 2 seconds",
        "High user engagement with 80% daily active users",
      ],
      githubUrl: "https://github.com/yourusername/chat-app",
      liveUrl: "https://your-chat-app.com",
      metrics: {
        users: "3,000+ registered users",
        performance: "< 2s connection time",
        impact: "80% daily active users",
      },
    },
    {
      id: "5",
      title: "Portfolio Website Builder",
      description: "Drag-and-drop website builder for creating professional portfolios without coding.",
      longDescription:
        "An intuitive website builder that allows users to create professional portfolios using a drag-and-drop interface. Features customizable templates, real-time preview, and one-click deployment to various hosting platforms.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["Vue.js", "Node.js", "PostgreSQL", "AWS", "Docker", "Stripe"],
      category: "Web Applications",
      year: "2023",
      status: "Live",
      features: [
        "Intuitive drag-and-drop interface",
        "Professional portfolio templates",
        "Real-time preview and editing",
        "Custom domain support",
        "SEO optimization tools",
        "One-click deployment to multiple platforms",
      ],
      challenges: [
        "Building a flexible drag-and-drop system",
        "Generating clean, optimized code from visual designs",
        "Implementing real-time collaborative editing",
        "Ensuring cross-browser compatibility",
      ],
      results: [
        "1,500+ portfolios created and deployed",
        "95% user satisfaction rating",
        "Average build time reduced to 30 minutes",
        "Generated $50K+ in revenue",
      ],
      githubUrl: "https://github.com/yourusername/portfolio-builder",
      liveUrl: "https://your-portfolio-builder.com",
      metrics: {
        users: "1,500+ portfolios created",
        performance: "30min average build time",
        impact: "$50K+ revenue generated",
      },
    },
    {
      id: "6",
      title: "Analytics Dashboard",
      description: "Business intelligence dashboard with real-time data visualization and reporting.",
      longDescription:
        "A comprehensive analytics dashboard that aggregates data from multiple sources and provides real-time insights through interactive visualizations. Built for scalability and performance with support for custom reports and automated alerts.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["React", "D3.js", "Python", "FastAPI", "PostgreSQL", "Redis"],
      category: "Full-Stack Projects",
      year: "2022",
      status: "Live",
      features: [
        "Real-time data visualization with D3.js",
        "Custom report builder and scheduling",
        "Interactive charts and filtering",
        "Automated alerts and notifications",
        "Multi-tenant architecture",
        "Export capabilities (PDF, Excel, CSV)",
      ],
      challenges: [
        "Processing large datasets efficiently",
        "Creating responsive and interactive visualizations",
        "Implementing real-time data streaming",
        "Optimizing query performance for complex analytics",
      ],
      results: [
        "Processing 1M+ data points daily",
        "Reduced report generation time by 70%",
        "Improved decision-making speed by 50%",
        "Serving 200+ business users across 5 departments",
      ],
      githubUrl: "https://github.com/yourusername/analytics-dashboard",
      metrics: {
        users: "200+ business users",
        performance: "1M+ data points/day",
        impact: "70% faster reporting",
      },
    },
  ]

  const projectStats = {
    total: projects.length,
    live: projects.filter((p) => p.status === "Live").length,
    maintained: projects.filter((p) => p.status === "Maintained").length,
    technologies: [...new Set(projects.flatMap((p) => p.technologies))].length,
  }

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((project) => categoryMap[selectedCategory]?.includes(project.category))

  const categories = categoryDefs.map((category) => ({
    ...category,
    count:
      category.id === "all"
        ? projects.length
        : projects.filter((project) => categoryMap[category.id]?.includes(project.category)).length,
  }))

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const openProjectLink = (e: React.MouseEvent, url?: string) => {
    e.stopPropagation()
    if (url) window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="md:ml-80 min-h-screen print:ml-0">
        {/* Terminal Header Bar */}
        <FadeIn duration={0.4}>
          <div className="bg-card border-b border-border p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Folder className="h-5 w-5 text-primary" />
                  <span className="font-mono text-sm">projects/</span>
                </div>
                <Badge variant="outline" className="hidden sm:inline-flex">
                  Repository
                </Badge>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsRunning(!isRunning)}
                    className="h-6 w-6 p-0"
                    title={isRunning ? "Pause live status" : "Resume live status"}
                  >
                    {isRunning ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0"
                    title="Reset filters"
                    onClick={() => {
                      setSelectedCategory("all")
                      setViewMode("grid")
                    }}
                  >
                    <RotateCcw className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <div className={cn("h-2 w-2 rounded-full bg-green-500", isRunning && "animate-pulse")}></div>
                  <span className="hidden sm:inline">{isRunning ? "Live Projects" : "Live Projects (Paused)"}</span>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="p-6 space-y-6">
          {/* Project Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* File Explorer Sidebar */}
            <div className="lg:col-span-1">
              <FadeIn>
                <Card className="p-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Terminal className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold">Project Explorer</h3>
                  </div>

                  <div className="space-y-1">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full flex items-center justify-between p-2 rounded-md text-sm transition-all ${
                          selectedCategory === category.id
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <category.icon className="h-3 w-3" />
                          <span>{category.label}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {category.count}
                        </Badge>
                      </button>
                    ))}
                  </div>

                  {/* Project Stats */}
                  <div className="mt-6 pt-4 border-t border-border">
                    <h4 className="text-xs font-medium text-muted-foreground uppercase mb-3">Repository Stats</h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span>Total Projects:</span>
                        <span className="text-primary font-mono">{projectStats.total}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Live:</span>
                        <span className="text-green-500 font-mono">{projectStats.live}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Maintained:</span>
                        <span className="text-yellow-500 font-mono">{projectStats.maintained}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Technologies:</span>
                        <span className="text-blue-500 font-mono">{projectStats.technologies}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </FadeIn>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-6">
              {/* Project Metrics */}
              <StaggerIn staggerDelay={0.1}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Activity className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">Active Projects</span>
                    </div>
                    <div className="text-2xl font-bold text-green-500">{projectStats.live}</div>
                    <div className="text-xs text-muted-foreground">Currently deployed</div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Users className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">Total Users</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-500">15k+</div>
                    <div className="text-xs text-muted-foreground">Across all projects</div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Performance</span>
                    </div>
                    <div className="text-2xl font-bold text-primary">99.9%</div>
                    <div className="text-xs text-muted-foreground">Average uptime</div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Code className="h-4 w-4 text-purple-500" />
                      <span className="text-sm font-medium">Tech Stack</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-500">{projectStats.technologies}</div>
                    <div className="text-xs text-muted-foreground">Technologies used</div>
                  </Card>
                </div>
              </StaggerIn>

              {/* Project Grid/List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold flex items-center">
                    <File className="h-5 w-5 mr-2 text-primary" />
                    {selectedCategory === "all"
                      ? "All Projects"
                      : categories.find((c) => c.id === selectedCategory)?.label}
                    <Badge variant="outline" className="ml-2">
                      {filteredProjects.length}
                    </Badge>
                  </h2>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant={viewMode === "grid" ? "default" : "outline"}
                      onClick={() => setViewMode("grid")}
                    >
                      Grid
                    </Button>
                    <Button
                      size="sm"
                      variant={viewMode === "list" ? "default" : "outline"}
                      onClick={() => setViewMode("list")}
                    >
                      List
                    </Button>
                  </div>
                </div>

                {viewMode === "grid" ? (
                  <StaggerIn staggerDelay={0.1}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {filteredProjects.map((project) => (
                        <HoverGlow key={project.id} className="h-full rounded-xl">
                          <Card
                            className="p-6 h-full cursor-pointer group"
                            onClick={() => handleProjectClick(project)}
                          >
                          <div className="space-y-4">
                            {/* Project Header */}
                            <div className="flex items-start justify-between">
                              <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                  {project.category.includes("API") ? (
                                    <Server className="h-4 w-4 text-primary" />
                                  ) : project.category.includes("Full-Stack") ? (
                                    <Code className="h-4 w-4 text-primary" />
                                  ) : project.category.includes("Open Source") ? (
                                    <Github className="h-4 w-4 text-primary" />
                                  ) : (
                                    <Globe className="h-4 w-4 text-primary" />
                                  )}
                                </div>
                                <div>
                                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                                    {project.title}
                                  </h3>
                                  <p className="text-xs text-muted-foreground">{project.category}</p>
                                </div>
                              </div>
                              <Badge variant={project.status === "Live" ? "default" : "secondary"} className="text-xs">
                                {project.status === "Live" ? (
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                ) : (
                                  <AlertTriangle className="h-3 w-3 mr-1" />
                                )}
                                {project.status}
                              </Badge>
                            </div>

                            {/* Project Description */}
                            <p className="text-sm text-muted-foreground font-serif line-clamp-2">
                              {project.description}
                            </p>

                            {/* Project Metrics */}
                            {project.metrics && (
                              <div className="grid grid-cols-3 gap-2 text-xs">
                                <div className="text-center p-2 bg-muted/20 rounded">
                                  <div className="font-mono text-primary">{project.metrics.users?.split(" ")[0]}</div>
                                  <div className="text-muted-foreground">Users</div>
                                </div>
                                <div className="text-center p-2 bg-muted/20 rounded">
                                  <div className="font-mono text-primary">{project.metrics.performance}</div>
                                  <div className="text-muted-foreground">Speed</div>
                                </div>
                                <div className="text-center p-2 bg-muted/20 rounded">
                                  <div className="font-mono text-primary">{project.metrics.impact?.split(" ")[0]}</div>
                                  <div className="text-muted-foreground">Impact</div>
                                </div>
                              </div>
                            )}

                            {/* Technologies */}
                            <div className="flex flex-wrap gap-1">
                              {project.technologies.slice(0, 4).map((tech, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                              {project.technologies.length > 4 && (
                                <Badge variant="outline" className="text-xs">
                                  +{project.technologies.length - 4}
                                </Badge>
                              )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-between pt-2 border-t border-border">
                              <div className="flex space-x-2">
                                {project.githubUrl && (
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-6 w-6 p-0"
                                    onClick={(e) => openProjectLink(e, project.githubUrl)}
                                  >
                                    <Github className="h-3 w-3" />
                                  </Button>
                                )}
                                {project.liveUrl && (
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-6 w-6 p-0"
                                    onClick={(e) => openProjectLink(e, project.liveUrl)}
                                  >
                                    <ExternalLink className="h-3 w-3" />
                                  </Button>
                                )}
                              </div>
                              <span className="text-xs text-muted-foreground">{project.year}</span>
                            </div>
                          </div>
                          </Card>
                        </HoverGlow>
                      ))}
                    </div>
                  </StaggerIn>
                ) : (
                  <div className="space-y-2">
                    {filteredProjects.map((project) => (
                      <Card
                        key={project.id}
                        className="p-4 hover:shadow-md transition-all duration-200 hover:border-primary/40 cursor-pointer"
                        onClick={() => handleProjectClick(project)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-6 h-6 bg-primary/10 rounded flex items-center justify-center">
                              <File className="h-3 w-3 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium">{project.title}</h3>
                              <p className="text-xs text-muted-foreground">{project.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span>{project.technologies.length} technologies</span>
                            <Badge variant="outline" className="text-xs">
                              {project.status}
                            </Badge>
                            <span>{project.year}</span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <FadeIn delay={0.5}>
            <Card className="p-8 text-center bg-linear-to-r from-primary/5 to-accent/5 border-primary/20">
              <div className="max-w-2xl mx-auto space-y-4">
                <h2 className="text-2xl font-bold">Ready to Build Something Amazing?</h2>
                <p className="text-muted-foreground font-serif">
                  I&apos;m always excited to work on new challenges and innovative projects. Let&apos;s collaborate and create
                  something that makes a difference.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="group" onClick={() => setIsContactOpen(true)}>
                    <Terminal className="mr-2 h-4 w-4" />
                    Start Project
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="https://github.com/beatsbydan" target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      View All Code
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          </FadeIn>
        </div>
      </main>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      {/* Project Modal */}
      <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
