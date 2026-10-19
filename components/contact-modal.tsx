"use client"

import type React from "react"

import { useState } from "react"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Send, User, MessageSquare } from "lucide-react"

const CONTACT_EMAIL = "daniel.onyeachonam@outlook.com"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Open the default email client immediately, within the same user
      // gesture as the submit — any delay here risks browsers (esp. Safari)
      // silently dropping the mailto redirect once activation expires.
      const subject = encodeURIComponent(formData.subject || "Portfolio Contact")
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
      )
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`

      toast.success("Opening your email client…", {
        description: `If nothing opens, email me directly at ${CONTACT_EMAIL}`,
      })

      setFormData({ name: "", email: "", subject: "", message: "" })
      onClose()
    } catch {
      toast.error("Something went wrong", {
        description: `Please email me directly at ${CONTACT_EMAIL}`,
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary flex items-center gap-2">
            <Mail className="h-6 w-6" />
            Contact Me
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Contact Form — Radix's own dialog entrance animation already
              handles the reveal; a scroll-triggered FadeIn here left the
              form invisible for a couple of seconds after opening because
              its ScrollTrigger measurement raced the dialog's own transition. */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Subject *
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="What's this about?"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell me about your project, opportunity, or question..."
                  rows={6}
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button type="submit" className="flex-1" size="lg">
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
                <Button type="button" variant="outline" onClick={onClose} size="lg">
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}