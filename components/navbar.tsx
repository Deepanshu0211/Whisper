"use client"

import Link from "next/link"
import { ModeToggle } from "./mode-toggle"
import { Button } from "./ui/button"
import { PenLine } from "lucide-react"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { SearchBar } from "./search-bar"

export function Navbar() {
  const pathname = usePathname()

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur"
    >
      <div className="container flex h-16 items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Link href="/" className="flex items-center gap-2">
            <motion.span
              className="text-3xl font-satisfy text-primary"
              animate={{
                textShadow: ["0 0 0px rgba(0,0,0,0)", "0 0 10px rgba(255,100,100,0.3)", "0 0 0px rgba(0,0,0,0)"],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              Whispers
            </motion.span>
          </Link>
        </motion.div>

        <div className="hidden md:block">
          <SearchBar />
        </div>

        <div className="flex items-center gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/create">
              <Button className="font-satisfy text-lg relative overflow-hidden group" size="sm">
                <motion.span
                  className="absolute inset-0 bg-primary/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                <PenLine className="mr-2 h-4 w-4" />
                Write a Post
              </Button>
            </Link>
          </motion.div>
          <ModeToggle />
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="md:hidden px-4 pb-3">
        <SearchBar />
      </div>

      {/* Animated underline for current page */}
      <motion.div
        className="h-0.5 bg-primary"
        initial={{ width: 0, x: pathname === "/" ? "0%" : pathname === "/create" ? "100%" : "50%" }}
        animate={{
          width: pathname === "/" ? "80px" : pathname === "/create" ? "100px" : "0px",
          x: pathname === "/" ? "calc(50% - 150px)" : pathname === "/create" ? "calc(50% + 80px)" : "50%",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    </motion.header>
  )
}
