"use client"

import { formatDistanceToNow } from "date-fns"
import { motion } from "framer-motion"

type Comment = {
  id: string
  post_id: string
  author_name: string
  content: string
  created_at: string
}

export default function CommentList({ comments }: { comments: Comment[] }) {
  if (comments.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center py-6 text-muted-foreground handwritten text-lg"
      >
        No comments yet. Be the first to share your thoughts!
      </motion.div>
    )
  }

  return (
    <motion.div
      className="space-y-4 mb-8"
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      initial="hidden"
      animate="show"
    >
      {comments.map((comment) => (
        <motion.div
          key={comment.id}
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0 },
          }}
          className="border rounded-lg p-4 bg-card hover:shadow-md transition-all duration-300"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-satisfy text-lg">{comment.author_name}</h3>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
            </span>
          </div>
          <p className="handwritten">{comment.content}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}
