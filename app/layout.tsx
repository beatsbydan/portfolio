import type React from "react"
import type { Metadata } from "next"
import { Bricolage_Grotesque, Inter, Instrument_Serif } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
})

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-accent",
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
      className={`${bricolage.variable} ${inter.variable} ${instrumentSerif.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
