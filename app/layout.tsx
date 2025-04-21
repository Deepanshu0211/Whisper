import type React from "react"
import "./globals.css"
import { dancingScript, satisfy, caveat } from "@/lib/fonts"
import { ThemeProvider } from "@/components/theme-provider"
import { AnimationProvider } from "@/components/animation-provider"
import { AnimatedCursor } from "@/components/animated-cursor"
import { ThemeEffect } from "@/components/theme-effect"

export const metadata = {
  title: "Whispers - Anonymous Blog",
  description: "Share your thoughts anonymously in a beautiful space",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dancingScript.variable} ${satisfy.variable} ${caveat.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ThemeEffect />
          <AnimationProvider>
            {children}
            <AnimatedCursor />
          </AnimationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
