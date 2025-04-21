"use client"

import { Navbar } from "@/components/navbar"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { PostSkeleton } from "@/components/post-skeleton"
import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from "@/components/animations"
import { motion } from "framer-motion"

type Post = {
  id: string
  title: string
  author_name: string
  content: string
  created_at: string
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .or(`title.ilike.%${query}%,content.ilike.%${query}%,author_name.ilike.%${query}%`)
          .order("created_at", { ascending: false })

        if (error) throw error
        setPosts(data || [])
      } catch (error) {
        console.error("Error searching posts:", error)
      } finally {
        setLoading(false)
      }
    }

    if (query) {
      fetchPosts()
    } else {
      setPosts([])
      setLoading(false)
    }
  }, [query])

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container py-8 flex-1">
        <FadeIn>
          <h1 className="text-4xl md:text-5xl mb-4 text-center">
            Search Results for <span className="text-primary">"{query}"</span>
          </h1>
        </FadeIn>

        <SlideUp delay={0.2}>
          <p className="text-xl handwritten text-center mb-8 max-w-2xl mx-auto">
            {loading
              ? "Searching through whispers..."
              : posts.length > 0
                ? `Found ${posts.length} whisper${posts.length === 1 ? "" : "s"} matching your search`
                : "No whispers found matching your search"}
          </p>
        </SlideUp>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <PostSkeleton key={i} />
            ))}
          </div>
        ) : posts.length > 0 ? (
          <StaggerContainer
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            staggerChildren={0.1}
            delayChildren={0.3}
          >
            {posts.map((post) => (
              <StaggerItem key={post.id}>
                <Link href={`/post/${post.id}`} className="group block h-full">
                  <div className="h-full border rounded-lg overflow-hidden transition-all duration-500 hover:shadow-lg hover:-translate-y-2 bg-card">
                    <div className="p-6 flex flex-col h-full">
                      <h2 className="text-2xl mb-2 group-hover:text-primary transition-colors duration-300">
                        {post.title}
                      </h2>
                      <p className="text-sm text-muted-foreground mb-2">
                        By {post.author_name} • {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                      </p>
                      <p className="handwritten text-lg line-clamp-3 mb-4 flex-1">{post.content}</p>
                      <div className="text-sm font-medium text-primary group-hover:translate-x-1 transition-transform duration-300">
                        Read more →
                      </div>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
            <p className="text-xl handwritten mb-4">No posts found matching your search.</p>
            <Link href="/">
              <button className="font-satisfy text-lg px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                Back to Home
              </button>
            </Link>
          </motion.div>
        )}
      </div>
    </main>
  )
}
