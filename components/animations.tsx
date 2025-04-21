"use client"

import { motion } from "framer-motion"
import type React from "react"

// Fade in animation
export const FadeIn = ({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
}) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration, delay }} className={className}>
    {children}
  </motion.div>
)

// Slide up animation
export const SlideUp = ({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration, delay }}
    className={className}
  >
    {children}
  </motion.div>
)

// Staggered children animation
export const StaggerContainer = ({
  children,
  staggerChildren = 0.1,
  delayChildren = 0,
  className = "",
}: {
  children: React.ReactNode
  staggerChildren?: number
  delayChildren?: number
  className?: string
}) => (
  <motion.div
    variants={{
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren,
          delayChildren,
        },
      },
    }}
    initial="hidden"
    animate="show"
    className={className}
  >
    {children}
  </motion.div>
)

// Child item for staggered animations
export const StaggerItem = ({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0 },
    }}
    className={className}
  >
    {children}
  </motion.div>
)

// Scale animation on hover
export const ScaleOnHover = ({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
    className={className}
  >
    {children}
  </motion.div>
)

// Text reveal animation
export const TextReveal = ({
  text,
  className = "",
}: {
  text: string
  className?: string
}) => (
  <motion.div className={`overflow-hidden ${className}`}>
    <motion.h1 initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>
      {text}
    </motion.h1>
  </motion.div>
)

// Scroll triggered animation
export const ScrollReveal = ({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6 }}
    className={className}
  >
    {children}
  </motion.div>
)

// Floating animation
export const FloatingAnimation = ({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) => (
  <motion.div
    animate={{ y: [0, -10, 0] }}
    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "easeInOut" }}
    className={className}
  >
    {children}
  </motion.div>
)

// Pulse animation
export const PulseAnimation = ({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) => (
  <motion.div
    animate={{ scale: [1, 1.05, 1] }}
    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "easeInOut" }}
    className={className}
  >
    {children}
  </motion.div>
)
