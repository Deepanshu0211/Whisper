"use client"

import type React from "react"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FadeIn, SlideUp } from "@/components/animations"
import { SuccessAnimation } from "@/components/success-animation"

export default function CreatePost() {
  const [title, setTitle] = useState("")
  const [authorName, setAuthorName] = useState("Anonymous")
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !content.trim()) {
      toast({
        title: "Missing fields",
        description: "Please fill in both title and content",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const { data, error } = await supabase
        .from("posts")
        .insert([
          {
            title,
            author_name: authorName || "Anonymous",
            content,
          },
        ])
        .select()

      if (error) throw error

      setShowSuccess(true)

      // Redirect after a delay to allow the animation to play
      setTimeout(() => {
        if (data && data[0]) {
          router.push(`/post/${data[0].id}`)
        } else {
          router.push("/")
        }
      }, 3000)
    } catch (error) {
      console.error("Error creating post:", error)
      toast({
        title: "Something went wrong",
        description: "Your post couldn't be created. Please try again.",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container py-8 flex-1">
        <FadeIn>
          <h1 className="text-4xl md:text-5xl mb-8 text-center">
            Share Your <span className="text-primary">Thoughts</span>
          </h1>
        </FadeIn>

        <SlideUp delay={0.2}>
          <Card className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle className="text-2xl">Create a New Post</CardTitle>
                <CardDescription>Express yourself freely. Your words matter.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Give your post a title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="font-satisfy text-lg transition-all duration-300 focus:ring-2 focus:ring-primary focus:scale-[1.01]"
                  />
                </motion.div>

                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Label htmlFor="author">Your Name (optional)</Label>
                  <Input
                    id="author"
                    placeholder="Anonymous"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="handwritten text-lg transition-all duration-300 focus:ring-2 focus:ring-primary focus:scale-[1.01]"
                  />
                </motion.div>

                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Label htmlFor="content">Your Thoughts</Label>
                  <Textarea
                    id="content"
                    placeholder="Let your thoughts flow freely..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    className="min-h-[200px] handwritten text-lg transition-all duration-300 focus:ring-2 focus:ring-primary focus:scale-[1.01]"
                  />
                </motion.div>
              </CardContent>
              <CardFooter>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
                  <Button type="submit" className="w-full font-satisfy text-lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sharing...
                      </span>
                    ) : (
                      "Share Your Thoughts"
                    )}
                  </Button>
                </motion.div>
              </CardFooter>
            </form>
          </Card>
        </SlideUp>
      </div>

      <AnimatePresence>
        {showSuccess && <SuccessAnimation message="Your thoughts have been shared with the world!" />}
      </AnimatePresence>
    </main>
  )
}
