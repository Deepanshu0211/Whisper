import { Navbar } from "@/components/navbar"
import { createServerSupabaseClient } from "@/lib/supabase"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import {
  FadeIn,
  SlideUp,
  StaggerContainer,
  StaggerItem,
  FloatingAnimation,
  ScrollReveal,
} from "@/components/animations"
import { Suspense } from "react"
import { PostSkeleton } from "@/components/post-skeleton"

export const revalidate = 0

export default async function Home() {
  const supabase = createServerSupabaseClient()

  const { data: posts, error } = await supabase.from("posts").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching posts:", error)
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container py-8 flex-1">
        <FadeIn>
          <FloatingAnimation>
            <h1 className="text-4xl md:text-5xl mb-8 text-center">
              Welcome to <span className="text-primary">Whispers</span>
            </h1>
          </FloatingAnimation>
        </FadeIn>

        <SlideUp delay={0.2}>
          <p className="text-xl handwritten text-center mb-12 max-w-2xl mx-auto">
            A place where thoughts flow freely, where words dance on the page, and where every voice can be heard
            without judgment.
          </p>
        </SlideUp>

        <Suspense
          fallback={
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <PostSkeleton key={i} />
              ))}
            </div>
          }
        >
          <StaggerContainer
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            staggerChildren={0.1}
            delayChildren={0.3}
          >
            {posts && posts.length > 0 ? (
              posts.map((post) => (
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
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <SlideUp>
                  <p className="text-xl handwritten mb-4">No posts yet. Be the first to share your thoughts!</p>
                  <Link href="/create">
                    <button className="font-satisfy text-lg px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                      Write a Post
                    </button>
                  </Link>
                </SlideUp>
              </div>
            )}
          </StaggerContainer>
        </Suspense>
      </div>
      <ScrollReveal>
        <footer className="border-t py-6 text-center">
          <p className="handwritten text-lg">Made with ❤️ for anonymous expression</p>
        </footer>
      </ScrollReveal>
    </main>
  )
}
