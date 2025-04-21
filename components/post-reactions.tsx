"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, ThumbsUp, Star, Coffee, MessageCircle } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { getSessionId } from "@/lib/session"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type ReactionType = "like" | "love" | "star" | "thanks"
type ReactionCount = Record<ReactionType, number>

interface PostReactionsProps {
  postId: string
  commentCount: number
}

export function PostReactions({ postId, commentCount }: PostReactionsProps) {
  const [counts, setCounts] = useState<ReactionCount>({ like: 0, love: 0, star: 0, thanks: 0 })
  const [userReactions, setUserReactions] = useState<ReactionType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const sessionId = getSessionId()

  const reactionIcons = {
    like: <ThumbsUp className="h-4 w-4" />,
    love: <Heart className="h-4 w-4" />,
    star: <Star className="h-4 w-4" />,
    thanks: <Coffee className="h-4 w-4" />,
  }

  const reactionLabels = {
    like: "Like",
    love: "Love",
    star: "Star",
    thanks: "Thanks",
  }

  useEffect(() => {
    const fetchReactions = async () => {
      if (!postId || !sessionId) return

      setIsLoading(true)
      try {
        // Get all reactions for the post
        const { data: reactionsData, error: reactionsError } = await supabase
          .from("reactions")
          .select("*")
          .eq("post_id", postId)

        if (reactionsError) throw reactionsError

        // Count reactions by type manually
        const newCounts: ReactionCount = { like: 0, love: 0, star: 0, thanks: 0 }
        reactionsData.forEach((reaction) => {
          if (reaction.reaction_type in newCounts) {
            newCounts[reaction.reaction_type as ReactionType]++
          }
        })
        setCounts(newCounts)

        // Get user reactions
        const userReactionsData = reactionsData.filter((r) => r.session_id === sessionId)
        setUserReactions(userReactionsData.map((r) => r.reaction_type as ReactionType))
      } catch (error) {
        console.error("Error fetching reactions:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchReactions()
  }, [postId, sessionId])

  const toggleReaction = async (type: ReactionType) => {
    if (!postId || !sessionId || isSubmitting) return

    setIsSubmitting(true)
    try {
      const hasReacted = userReactions.includes(type)

      if (hasReacted) {
        // Remove reaction
        await supabase
          .from("reactions")
          .delete()
          .eq("post_id", postId)
          .eq("session_id", sessionId)
          .eq("reaction_type", type)

        setCounts((prev) => ({ ...prev, [type]: Math.max(0, prev[type] - 1) }))
        setUserReactions((prev) => prev.filter((r) => r !== type))
      } else {
        // Add reaction
        await supabase.from("reactions").insert([
          {
            post_id: postId,
            session_id: sessionId,
            reaction_type: type,
          },
        ])

        setCounts((prev) => ({ ...prev, [type]: prev[type] + 1 }))
        setUserReactions((prev) => [...prev, type])
      }
    } catch (error) {
      console.error("Error toggling reaction:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex items-center justify-between border-t border-b py-3 my-6">
      <div className="flex gap-2">
        <TooltipProvider>
          {Object.entries(reactionIcons).map(([type, icon]) => (
            <Tooltip key={type}>
              <TooltipTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleReaction(type as ReactionType)}
                  className={cn(
                    "flex items-center gap-1 px-2 py-1 rounded-full text-sm transition-colors",
                    userReactions.includes(type as ReactionType)
                      ? "bg-primary/20 text-primary"
                      : "bg-muted hover:bg-muted/80",
                  )}
                  disabled={isLoading || isSubmitting}
                >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={`${type}-${userReactions.includes(type as ReactionType)}`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {icon}
                    </motion.span>
                  </AnimatePresence>
                  <span>{counts[type as ReactionType] || 0}</span>
                </motion.button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{reactionLabels[type as ReactionType]}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>

      <div className="flex items-center gap-1 text-muted-foreground">
        <MessageCircle className="h-4 w-4" />
        <span className="text-sm">{commentCount} comments</span>
      </div>
    </div>
  )
}
