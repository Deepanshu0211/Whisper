"use client"

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { motion } from "framer-motion"

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container flex-1 flex flex-col items-center justify-center py-12 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <h1 className="text-6xl font-satisfy text-primary mb-6">Oops!</h1>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
          <p className="text-2xl handwritten mb-8">We couldn't find the page you were looking for.</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Link
            href="/"
            className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors font-satisfy text-lg"
          >
            Return Home
          </Link>
        </motion.div>
      </div>
    </main>
  )
}
