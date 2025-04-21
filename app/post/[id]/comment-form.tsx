"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { motion } from "framer-motion"

export default function CommentForm({ postId }: { postId: string }) {
  const [authorName, setAuthorName] = useState("Anonymous")
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!content.trim()) {
      toast({
        title: "Missing comment",
        description: "Please write something before submitting",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const { error } = await supabase.from("comments").insert([
        {
          post_id: postId,
          author_name: authorName || "Anonymous",
          content,
        },
      ])

      if (error) throw error

      toast({
        title: "Comment added!",
        description: "Your comment has been posted.",
      })

      setContent("")
      router.refresh()
    } catch (error) {
      console.error("Error creating comment:", error)
      toast({
        title: "Something went wrong",
        description: "Your comment couldn't be added. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="mt-6">
        <form onSubmit={handleSubmit}>
          <CardContent className="pt-6 space-y-4">
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Label htmlFor="comment-author">Your Name (optional)</Label>
              <Input
                id="comment-author"
                placeholder="Anonymous"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="handwritten transition-all duration-300 focus:ring-2 focus:ring-primary focus:scale-[1.01]"
              />
            </motion.div>

            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Label htmlFor="comment-content">Your Comment</Label>
              <Textarea
                id="comment-content"
                placeholder="Share your thoughts on this post..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="min-h-[100px] handwritten transition-all duration-300 focus:ring-2 focus:ring-primary focus:scale-[1.01]"
              />
            </motion.div>
          </CardContent>
          <CardFooter>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button type="submit" className="font-satisfy" disabled={isSubmitting}>
                {isSubmitting ? "Posting..." : "Post Comment"}
              </Button>
            </motion.div>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  )
}
