"use client"

import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Download,
  FileText,
  Terminal,
  User,
  Briefcase,
  GraduationCap,
  Code,
  Award,
  MapPin,
  Phone,
  Mail,
  Github,
  Linkedin,
  Building,
  Zap,
  Database,
  Server,
  Globe,
  ExternalLink,
} from "lucide-react"
import { useState } from "react"
import { FadeIn, SlideInRight, StaggerIn, StatusIndicator } from "@/components/animations/reveal-animations"

const personalInfo = {
  name: "Software Engineer",
  title: "Full-Stack Developer",
  location: "Remote / Global",
  phone: "+1 (555) 123-4567",
  email: "your.email@example.com",
  github: "github.com/yourusername",
  linkedin: "linkedin.com/in/yourprofile",
}

const techCategories = [
  {
    name: "Frontend",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Vue.js"],
    proficiency: 95,
    icon: Code,
    color: "text-blue-500",
  },
  {
    name: "Backend",
    skills: ["Node.js", "Python", "Express", "FastAPI", "GraphQL"],
    proficiency: 90,
    icon: Server,
    color: "text-green-500",
  },
  {
    name: "Database",
    skills: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Prisma"],
    proficiency: 85,
    icon: Database,
    color: "text-purple-500",
  },
  {
    name: "DevOps",
    skills: ["Docker", "AWS", "CI/CD", "Kubernetes", "Terraform"],
    proficiency: 80,
    icon: Globe,
    color: "text-orange-500",
  },
]

const workHistory = [
  {
    company: "Tech Solutions Inc.",
    location: "Remote",
    period: "2023 - Present",
    positions: [
      {
        title: "Senior Full-Stack Developer",
        duration: "8 months",
        achievements: [
          "Led development of scalable applications serving 50,000+ users",
          "Architected microservices improving performance by 40%",
          "Mentored 5 junior developers and established coding standards",
          "Delivered user-centric features ahead of schedule",
        ],
      },
    ],
  },
  {
    company: "Digital Agency Co.",
    location: "Remote",
    period: "2021 - 2022",
    positions: [
      {
        title: "Full-Stack Developer",
        duration: "1.5 years",
        achievements: [
          "Built RESTful APIs reducing manual processes by 60%",
          "Implemented CI/CD pipelines decreasing deployment time by 50%",
          "Optimized database queries improving load times by 35%",
          "Maintained multiple client-facing applications",
        ],
      },
    ],
  },
  {
    company: "StartupXYZ",
    location: "Remote",
    period: "2020 - 2021",
    positions: [
      {
        title: "Frontend Developer",
        duration: "1 year",
        achievements: [
          "Created responsive interfaces with React and TypeScript",
          "Collaborated with designers for pixel-perfect implementations",
          "Integrated frontend with backend APIs effectively",
          "Contributed to development workflows and documentation",
        ],
      },
    ],
  },
]

const projects = [
  {
    name: "E-Commerce Platform",
    type: "Full-Stack Application",
    status: "Production",
    tech: ["Next.js", "PostgreSQL", "Stripe", "AWS"],
    metrics: { users: "10k+", uptime: "99.9%", performance: "A+" },
  },
  {
    name: "Task Management API",
    type: "Backend Service",
    status: "Production",
    tech: ["Node.js", "MongoDB", "WebSocket", "Docker"],
    metrics: { requests: "1M+", latency: "<100ms", coverage: "95%" },
  },
  {
    name: "Component Library",
    type: "Open Source",
    status: "Active",
    tech: ["React", "TypeScript", "Storybook", "npm"],
    metrics: { downloads: "5k+", stars: "200+", contributors: "15" },
  },
]

export default function ResumePage() {
  const [activeSection, setActiveSection] = useState("overview")

  const handleDownload = () => {
    window.print()
  }

  const sections = [
    { id: "overview", label: "Overview", icon: User },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "skills", label: "Skills", icon: Code },
    { id: "projects", label: "Projects", icon: ExternalLink },
    { id: "education", label: "Education", icon: GraduationCap },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="md:ml-80 min-h-screen print:ml-0">
        {/* Header Bar */}
        <FadeIn duration={0.4}>
          <div className="bg-card border-b border-border p-4 print:hidden">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <span className="font-mono text-sm">resume.json</span>
                </div>
                <Badge variant="outline" className="hidden sm:inline-flex">
                  Professional Profile
                </Badge>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm" onClick={handleDownload} className="print:hidden bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
                <div className="hidden sm:block">
                  <StatusIndicator status="online" label="Live Document" className="text-sm" />
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="p-6 space-y-6">
          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-1 bg-muted/20 p-1 rounded-lg print:hidden">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeSection === section.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <section.icon className="h-4 w-4" />
                <span>{section.label}</span>
              </button>
            ))}
          </div>

          {/* Overview Section */}
          {activeSection === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Card */}
              <div className="lg:col-span-2">
                <FadeIn>
                  <Card className="p-6">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                        <User className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold">{personalInfo.name}</h1>
                        <p className="text-primary font-medium">{personalInfo.title}</p>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3" />
                          <span>{personalInfo.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2">Professional Summary</h3>
                        <p className="text-muted-foreground font-serif leading-relaxed">
                          Passionate software engineer with 3+ years of experience building scalable web applications
                          and APIs. Expertise in modern JavaScript frameworks, backend development, and cloud
                          technologies. Proven track record of delivering high-quality solutions that improve user
                          experience and business outcomes.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">50+</div>
                          <div className="text-xs text-muted-foreground">Projects Completed</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">3+</div>
                          <div className="text-xs text-muted-foreground">Years Experience</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </FadeIn>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <SlideInRight>
                  <Card className="p-4">
                    <h3 className="font-semibold mb-4 flex items-center">
                      <Terminal className="h-4 w-4 mr-2 text-primary" />
                      Contact Info
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span className="font-mono">{personalInfo.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span className="font-mono">{personalInfo.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Github className="h-3 w-3 text-muted-foreground" />
                        <span className="font-mono">{personalInfo.github}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Linkedin className="h-3 w-3 text-muted-foreground" />
                        <span className="font-mono">{personalInfo.linkedin}</span>
                      </div>
                    </div>
                  </Card>
                </SlideInRight>

                <SlideInRight delay={0.2}>
                  <Card className="p-4">
                    <h3 className="font-semibold mb-4 flex items-center">
                      <Award className="h-4 w-4 mr-2 text-primary" />
                      Quick Stats
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>Code Quality:</span>
                        <Badge variant="outline" className="text-xs">
                          A+
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Response Time:</span>
                        <span className="text-green-500 font-mono">&lt; 24h</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Availability:</span>
                        <Badge variant="outline" className="text-xs">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1"></div>
                          Available
                        </Badge>
                      </div>
                    </div>
                  </Card>
                </SlideInRight>
              </div>
            </div>
          )}

          {/* Experience Section */}
          {activeSection === "experience" && (
            <FadeIn>
              <Card className="p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Professional Experience</h2>
                  <Badge variant="outline">Timeline View</Badge>
                </div>

                <div className="space-y-8">
                  {workHistory.map((company, index) => (
                    <div key={index} className="relative">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20">
                          <Building className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{company.company}</h3>
                            <Badge variant="outline">{company.period}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-4">{company.location}</p>

                          {company.positions.map((position, posIndex) => (
                            <div key={posIndex} className="mb-4">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium text-primary">{position.title}</h4>
                                <span className="text-xs text-muted-foreground">{position.duration}</span>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {position.achievements.map((achievement, achIndex) => (
                                  <div key={achIndex} className="flex items-start space-x-2 text-sm">
                                    <Zap className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                                    <span className="text-muted-foreground font-serif">{achievement}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      {index < workHistory.length - 1 && (
                        <div className="absolute left-6 top-12 w-px h-16 bg-border"></div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </FadeIn>
          )}

          {/* Skills Section */}
          {activeSection === "skills" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FadeIn>
                <Card className="p-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <Code className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">Technical Proficiency</h2>
                  </div>

                  <div className="space-y-6">
                    {techCategories.map((category, index) => (
                      <div key={index} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <category.icon className={`h-4 w-4 ${category.color}`} />
                            <span className="font-medium">{category.name}</span>
                          </div>
                          <span className="text-sm text-primary font-mono">{category.proficiency}%</span>
                        </div>
                        <Progress value={category.proficiency} className="h-2" />
                        <div className="flex flex-wrap gap-1">
                          {category.skills.map((skill, skillIndex) => (
                            <Badge key={skillIndex} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </FadeIn>

              <FadeIn delay={0.2}>
                <Card className="p-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <Award className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">Achievements</h2>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-muted/20 rounded-lg">
                      <h4 className="font-medium">Outstanding Developer Award</h4>
                      <p className="text-sm text-muted-foreground">Tech Solutions Inc. • 2023</p>
                      <p className="text-xs text-muted-foreground mt-1 font-serif">
                        Recognition for exceptional code quality and team leadership
                      </p>
                    </div>
                    <div className="p-4 bg-muted/20 rounded-lg">
                      <h4 className="font-medium">Hackathon Winner</h4>
                      <p className="text-sm text-muted-foreground">Regional Tech Meetup • 2022</p>
                      <p className="text-xs text-muted-foreground mt-1 font-serif">
                        First place for innovative web application
                      </p>
                    </div>
                    <div className="p-4 bg-muted/20 rounded-lg">
                      <h4 className="font-medium">Dean&apos;s List</h4>
                      <p className="text-sm text-muted-foreground">University CS Department • 2020</p>
                      <p className="text-xs text-muted-foreground mt-1 font-serif">
                        Academic excellence in Computer Science
                      </p>
                    </div>
                  </div>
                </Card>
              </FadeIn>
            </div>
          )}

          {/* Projects Section */}
          {activeSection === "projects" && (
            <StaggerIn staggerDelay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {projects.map((project, index) => (
                  <Card key={index} className="p-4 hover:shadow-lg transition-all duration-300 hover:border-primary/40">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{project.name}</h3>
                        <Badge variant={project.status === "Production" ? "default" : "outline"} className="text-xs">
                          {project.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{project.type}</p>

                      <div className="space-y-2">
                        <h4 className="text-xs font-medium text-muted-foreground uppercase">Metrics</h4>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          {Object.entries(project.metrics).map(([key, value]) => (
                            <div key={key} className="text-center">
                              <div className="font-mono text-primary">{value}</div>
                              <div className="text-muted-foreground capitalize">{key}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {project.tech.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </StaggerIn>
          )}

          {/* Education Section */}
          {activeSection === "education" && (
            <FadeIn>
              <Card className="p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Education</h2>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Bachelor of Science, Computer Science</h3>
                      <Badge variant="outline">2017-2021</Badge>
                    </div>
                    <p className="text-primary font-medium">Your University</p>
                    <p className="text-sm text-muted-foreground mb-4">Your City, Country • GPA: 3.8/4.0</p>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Relevant Coursework</h4>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Data Structures",
                          "Algorithms",
                          "Software Engineering",
                          "Database Systems",
                          "Web Development",
                        ].map((course, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </FadeIn>
          )}
        </div>
      </main>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            font-size: 12px !important;
            line-height: 1.4 !important;
            color: black !important;
            background: white !important;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  )
}
