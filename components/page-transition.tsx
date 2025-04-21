"use client"

import type React from "react"

import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isFirstMount, setIsFirstMount] = useState(true)

  useEffect(() => {
    setIsFirstMount(false)
  }, [])

  return (
    <>
      {/* Initial page load animation */}
      {isFirstMount ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          {children}
        </motion.div>
      ) : (
        <>
          {/* Exit animation - overlay that slides in */}
          <motion.div
            key={`${pathname}-overlay`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 0 }}
            exit={{ scaleX: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{
              originX: 0,
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "hsl(var(--primary))",
              zIndex: 999,
              pointerEvents: "none",
            }}
          />

          {/* Page content with enter animation */}
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {children}
          </motion.div>
        </>
      )}
    </>
  )
}
