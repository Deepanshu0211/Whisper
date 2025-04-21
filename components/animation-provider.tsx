"use client"

import { AnimatePresence } from "framer-motion"
import type React from "react"
import { PageTransition } from "./page-transition"

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <PageTransition>{children}</PageTransition>
    </AnimatePresence>
  )
}
