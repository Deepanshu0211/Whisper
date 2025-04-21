"use client"

import { Spinner } from "@/components/ui/spinner"
import { motion } from "framer-motion"

interface LoadingStateProps {
  message?: string
}

export function LoadingState({ message = "Loading..." }: LoadingStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center p-8 space-y-4"
    >
      <Spinner size="lg" />
      <p className="text-lg font-satisfy text-muted-foreground">{message}</p>
    </motion.div>
  )
}
