"use client"

import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
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
  Cloud,
  Boxes,
  Activity,
  Monitor,
  Sparkles,
} from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { FadeIn, SlideInRight, StatusIndicator } from "@/components/animations/reveal-animations"
import { ContactModal } from "@/components/contact-modal"

const personalInfo = {
  name: "Daniel Onyeachonam",
  title: "Software Engineer",
  location: "Lagos, Nigeria",
  phone: "+234 907 387 0133",
  email: "daniel.onyeachonam@outlook.com",
  github: "github.com/beatsbydan",
  linkedin: "linkedin.com/in/daniel-onyeachonam",
}

const techCategories: {
  name: string
  skills: string[]
  familiar?: string[]
  icon: typeof Code
  color: string
  borderColor: string
}[] = [
  {
    name: "Languages",
    skills: ["Java", "TypeScript / JavaScript", "Python", "SQL"],
    icon: Code,
    color: "text-sky-500",
    borderColor: "border-t-sky-500",
  },
  {
    name: "Backend",
    skills: ["Spring Boot", "Node.js", "Express.js", "REST APIs", "Microservices", "Apache Kafka"],
    icon: Server,
    color: "text-green-500",
    borderColor: "border-t-green-500",
  },
  {
    name: "Data",
    skills: ["PostgreSQL", "MySQL", "MSSQL", "Redis", "Supabase"],
    icon: Database,
    color: "text-purple-500",
    borderColor: "border-t-purple-500",
  },
  {
    name: "Cloud",
    skills: ["AWS", "GCP", "DigitalOcean"],
    icon: Cloud,
    color: "text-cyan-500",
    borderColor: "border-t-cyan-500",
  },
  {
    name: "DevOps & CI/CD",
    skills: ["Docker", "Kubernetes", "Jenkins", "Harness", "GitLab CI", "Argo CD", "Git"],
    icon: Boxes,
    color: "text-orange-500",
    borderColor: "border-t-orange-500",
  },
  {
    name: "Observability",
    skills: ["OpenTelemetry", "New Relic"],
    icon: Activity,
    color: "text-pink-500",
    borderColor: "border-t-pink-500",
  },
  {
    name: "Frontend",
    skills: ["React", "Next.js", "React Native", "Tailwind CSS"],
    icon: Monitor,
    color: "text-blue-500",
    borderColor: "border-t-blue-500",
  },
  {
    name: "AI-Assisted Engineering",
    skills: ["Claude Code (agentic development)", "Claude API (LLM integration)"],
    icon: Sparkles,
    color: "text-violet-500",
    borderColor: "border-t-violet-500",
  },
]

const allTechSkills = techCategories.flatMap((category) => [...category.skills, ...(category.familiar ?? [])])

interface Certification {
  title: string
  issuer: string
  date: string
  description?: string
}

// None yet — the Certifications card and layout below adapt automatically
// once this is populated.
const certifications: Certification[] = []

const workHistory = [
  {
    company: "Moniepoint Inc.",
    location: "Lagos, Nigeria",
    period: "02/2024 - Present",
    positions: [
      {
        title: "Backend Engineer",
        duration: "09/2025 - Present",
        achievements: [
          "Re-architected transaction report generation into an asynchronous streaming pipeline that processes 20M+ records per run at a constant memory footprint, slashing generation time from over an hour to 2-5 minutes and eliminating out-of-memory failures in production",
          "Boosted settlement throughput by over 90% by profiling the settlement pipeline, eliminating processing bottlenecks, and optimising queries and indexes on high-volume tables",
          "Co-designed and delivered a re-engineered Settlement Agent, migrating its event messaging from Apache Kafka to Redis Streams to meet new product requirements while sustaining 4.65M+ settlement records per day for interbank partner transfers",
          "Co-designed and shipped Reversals & Refunds across the transaction-processing flow, leading impact analysis and technical deep-dives across 2 cross-functional teams, co-authoring QA test cases, and driving the feature through to production",
          "Introduced end-to-end observability across 4 services with OpenTelemetry and New Relic (distributed tracing, metrics, dashboards, and alerting), cutting incident detection time from hours to minutes",
          "Resolved 20+ production incidents end to end, from root-cause analysis to fix and follow-up, with an average turnaround of 30 minutes, strengthening platform stability and partner trust",
          "Stepped in as frontend engineer (React, TypeScript) during a frontend staffing gap, building UI features and integrating them with backend APIs to keep releases on schedule",
          "Mentored 2 junior engineers and interns and reviewed pull requests, raising the bar on code quality, testing, and service design",
        ],
      },
      {
        title: "Backend Engineer Intern",
        duration: "02/2024 - 08/2024",
        achievements: [
          "Built and launched the Family Businesses case-study website end to end, integrating Google Analytics for user-behaviour tracking and the Google Sheets API for automated data collection",
          "Engineered a SendGrid-powered mailing service that delivers the case study on demand and captures recipient data, reducing communication delays by 20-50%",
          "Developed and tested scalable RESTful APIs and shipped new features across a fault-tolerant microservices architecture, backed by end-to-end tests and robust error handling",
          "Delivered responsive frontend features integrated with backend APIs, owning delivery from UI to service",
          "Contributed to QA sessions, code audits, and design deep-dives for new features, helping cut bugs by over 80% on owned services",
        ],
      },
    ],
  },
]

const projects: {
  name: string
  type: string
  status: string
  tech: string[]
  liveUrl?: string
  githubUrl?: string
  metrics?: Record<string, string>
}[] = [
  {
    name: "Farm Zone",
    type: "Livestock E-Commerce Platform",
    status: "Live",
    tech: ["Node.js", "Express", "TypeScript", "PostgreSQL", "Redis", "BullMQ", "Paystack"],
    liveUrl: "https://farmzone.africa",
    metrics: { orders: "15,000+", livestock: "50,000+", states: "37" },
  },
  {
    name: "MetricLeap",
    type: "AI-Powered M&E SaaS",
    status: "Live",
    tech: ["Next.js", "React", "TypeScript", "Supabase", "OpenAI API", "Google Forms API"],
    liveUrl: "https://v0-metric-leap-design.vercel.app/",
  },
  {
    name: "Tobi Peter",
    type: "Artist Website & Admin CMS",
    status: "Live",
    tech: ["React", "Vite", "TanStack Query", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://www.tobipeter.com",
  },
  {
    name: "PitWall",
    type: "F1 Race-Strategy Dashboard",
    status: "Complete",
    tech: ["Python", "LightGBM", "FastF1", "Next.js", "React", "TypeScript"],
    githubUrl: "https://github.com/beatsbydan/pitwall",
    metrics: { mae: "2.021s", "win probability": "99.8%", laps: "62,311" },
  },
]

export default function ResumePage() {
  const [activeSection, setActiveSection] = useState("overview")
  const [isContactOpen, setIsContactOpen] = useState(false)

  const sections = [
    { id: "overview", label: "Overview", icon: User },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "skills", label: "Skills", icon: Code },
    { id: "education", label: "Education", icon: GraduationCap },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="md:ml-80 print:ml-0">
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
                <Button variant="outline" size="sm" asChild className="print:hidden bg-transparent">
                  <a href="/Daniel-Onyeachonam-Resume.pdf" download="Daniel-Onyeachonam-Resume.pdf">
                    <Download className="h-4 w-4 mr-2" />
                    Export PDF
                  </a>
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
                className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-all cursor-pointer ${
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
            <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Card */}
              <div className="lg:col-span-2">
                <FadeIn className="h-full">
                  <Card className="p-6 h-full">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="relative w-16 h-16 shrink-0 overflow-hidden rounded-xl border border-primary/20">
                        <Image src="/daniel.jpg" alt="Daniel Onyeachonam" fill className="object-cover" />
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
                          Software Engineer with 2+ years of professional experience designing, developing and
                          maintaining robust software solutions across the application stack. Experienced in
                          building scalable backend services, intuitive client-side applications and efficient
                          data-driven systems, with a strong foundation in software architecture, database
                          engineering and cloud-native technologies. Passionate about writing clean, maintainable
                          code and engineering reliable solutions that solve real-world problems.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">{projects.length}</div>
                          <div className="text-xs text-muted-foreground">Projects Shipped</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">2+</div>
                          <div className="text-xs text-muted-foreground">Years Experience</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </FadeIn>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col gap-4 h-full">
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

                <SlideInRight delay={0.2} className="flex-1 min-h-0">
                  <Card className="p-4 h-full flex flex-col">
                    <h3 className="font-semibold mb-4 flex items-center">
                      <Award className="h-4 w-4 mr-2 text-primary" />
                      Highlights
                    </h3>
                    <div className="space-y-3 text-sm flex-1 flex flex-col justify-center">
                      <div className="flex justify-between">
                        <span>Settlement volume:</span>
                        <span className="text-primary font-mono">4.65M+/day</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Incidents resolved:</span>
                        <span className="text-primary font-mono">20+</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Avg. turnaround:</span>
                        <span className="text-green-500 font-mono">30 min</span>
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

            {/* Tech Stack Marquee */}
            <FadeIn delay={0.3}>
              <div className="relative overflow-hidden rounded-lg border border-border bg-muted/10 py-4 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
                <div className="marquee-track flex w-max items-center gap-3">
                  {[...allTechSkills, ...allTechSkills].map((skill, index) => (
                    <Badge key={index} variant="outline" className="shrink-0 font-mono text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </FadeIn>
            </div>
          )}

          {/* Experience Section */}
          {activeSection === "experience" && (
            <FadeIn>
              <Card className="p-6">
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <Briefcase className="h-5 w-5 text-primary shrink-0" />
                  <h2 className="text-xl font-semibold">Professional Experience</h2>
                  <Badge variant="outline" className="shrink-0">Timeline View</Badge>
                </div>

                <div className="space-y-8">
                  {workHistory.map((company, index) => (
                    <div key={index} className="relative">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20">
                          <Building className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                            <h3 className="font-semibold break-words">{company.company}</h3>
                            <Badge variant="outline" className="shrink-0">{company.period}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-4">{company.location}</p>

                          {company.positions.map((position, posIndex) => (
                            <div key={posIndex} className="mb-4">
                              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                                <h4 className="font-medium text-primary break-words">{position.title}</h4>
                                <span className="text-xs text-muted-foreground shrink-0">{position.duration}</span>
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
            <div className={cn("grid grid-cols-1 gap-6", certifications.length > 0 && "md:grid-cols-2")}>
              <FadeIn>
                <Card className="p-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <Code className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">Technical Proficiency</h2>
                  </div>

                  <div
                    className={cn(
                      "grid grid-cols-1 gap-4",
                      certifications.length === 0 && "sm:grid-cols-2",
                    )}
                  >
                    {techCategories.map((category, index) => (
                      <div
                        key={index}
                        className={`rounded-lg border border-t-4 bg-muted/10 p-5 space-y-3 ${category.borderColor}`}
                      >
                        <div className="flex items-center space-x-2">
                          <category.icon className={`h-4 w-4 ${category.color}`} />
                          <span className="font-semibold">{category.name}</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {category.skills.map((skill, skillIndex) => (
                            <Badge key={skillIndex} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        {category.familiar && (
                          <p className="text-xs text-muted-foreground">
                            Familiar: {category.familiar.join(", ")}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              </FadeIn>

              {certifications.length > 0 && (
                <FadeIn delay={0.2}>
                  <Card className="p-6">
                    <div className="flex items-center space-x-2 mb-6">
                      <Award className="h-5 w-5 text-primary" />
                      <h2 className="text-xl font-semibold">Certifications</h2>
                    </div>

                    <div className="space-y-4">
                      {certifications.map((cert, index) => (
                        <div key={index} className="p-4 bg-muted/20 rounded-lg">
                          <h4 className="font-medium">{cert.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {cert.issuer} • {cert.date}
                          </p>
                          {cert.description && (
                            <p className="text-xs text-muted-foreground mt-1 font-serif">{cert.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </Card>
                </FadeIn>
              )}
            </div>
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
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <h3 className="font-semibold break-words">Bachelor of Science, Software Engineering</h3>
                      <Badge variant="outline" className="shrink-0">2022-2025</Badge>
                    </div>
                    <p className="text-primary font-medium">Bowen University</p>
                    <p className="text-sm text-muted-foreground mb-4">Nigeria • GPA: 4.67/5.00</p>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Relevant Coursework</h4>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Data Structures",
                          "Algorithms",
                          "Software Engineering",
                          "Database Systems",
                          "Web Development",
                          "Machine Learning Engineering",
                          "Cloud Computing",
                          "Operating Systems",
                          "Computer Networks",
                          "Distributed Systems",
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

          {/* Call to Action */}
          <FadeIn delay={0.2}>
            <Card className="p-8 text-center bg-linear-to-r from-primary/5 to-accent/5 border-primary/20 print:hidden">
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
