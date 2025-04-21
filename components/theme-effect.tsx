"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeEffect() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    document.documentElement.style.setProperty("--theme-transition", "0.5s")
    document.documentElement.classList.add("theme-transition")

    const timeout = setTimeout(() => {
      document.documentElement.classList.remove("theme-transition")
    }, 500)

    return () => clearTimeout(timeout)
  }, [theme, mounted])

  return null
}
