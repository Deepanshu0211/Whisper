import { Dancing_Script, Satisfy, Caveat } from "next/font/google"

export const dancingScript = Dancing_Script({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dancing-script",
})

export const satisfy = Satisfy({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-satisfy",
})

export const caveat = Caveat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-caveat",
})
