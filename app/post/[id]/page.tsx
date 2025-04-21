import { Navbar } from "@/components/navbar"
import { createServerSupabaseClient } from "@/lib/supabase"
import { formatDistanceToNow } from "date-fns"
import { notFound } from "next/navigation"
import CommentForm from "./comment-form"
import CommentList from "./comment-list"
import { FadeIn, SlideUp, ScrollReveal } from "@/components/animations"
import { PostReactions } from "@/components/post-reactions"
import { Suspense } from "react"
import { LoadingState } from "@/components/loading-state"

export const revalidate = 0

export default async function PostPage({ params }: { params: { id: string } }) {
  const supabase = createServerSupabaseClient()

  // Fetch post
  const { data: post, error } = await supabase.from("posts").select("*").eq("id", params.id).single()

  if (error || !post) {
    console.error("Error fetching post:", error)
    notFound()
  }

  // Fetch comments
  const { data: comments, error: commentsError } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", params.id)
    .order("created_at", { ascending: true })

  if (commentsError) {
    console.error("Error fetching comments:", commentsError)
  }

  const commentCount = comments?.length || 0

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <article className="container py-8 flex-1">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl mb-4">{post.title}</h1>
            <p className="text-muted-foreground mb-8">
              By {post.author_name} • {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
            </p>
          </FadeIn>

          <SlideUp delay={0.2}>
            <div className="prose prose-lg dark:prose-invert max-w-none mb-6">
              <p className="handwritten text-xl whitespace-pre-wrap">{post.content}</p>
            </div>
          </SlideUp>

          <Suspense fallback={<div className="h-12 animate-pulse bg-muted rounded-md my-6"></div>}>
            <PostReactions postId={post.id} commentCount={commentCount} />
          </Suspense>

          <ScrollReveal>
            <div className="pt-4">
              <h2 className="text-2xl mb-6">Comments</h2>
              <Suspense fallback={<LoadingState message="Loading comments..." />}>
                <CommentList comments={comments || []} />
              </Suspense>
              <CommentForm postId={post.id} />
            </div>
          </ScrollReveal>
        </div>
      </article>
    </main>
  )
}
