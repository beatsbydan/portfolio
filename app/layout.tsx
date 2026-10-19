import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, DM_Sans } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://chonam.dev"),
  title: "Daniel Onyeachonam - Software Engineer",
  description:
    "Versatile software engineer building scalable web solutions through expert system design that propels business success.",
  openGraph: {
    title: "Daniel Onyeachonam - Software Engineer",
    description:
      "Versatile software engineer building scalable web solutions through expert system design that propels business success.",
    url: "https://chonam.dev",
    siteName: "Daniel Onyeachonam",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daniel Onyeachonam - Software Engineer",
    description:
      "Versatile software engineer building scalable web solutions through expert system design that propels business success.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${dmSans.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
