import { Navbar } from "@/components/navbar"
import { PostSkeleton } from "@/components/post-skeleton"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container py-8 flex-1">
        <Skeleton className="h-12 w-64 mx-auto mb-8" />
        <Skeleton className="h-6 w-full max-w-2xl mx-auto mb-12" />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <PostSkeleton key={i} />
          ))}
        </div>
      </div>
      <footer className="border-t py-6 text-center">
        <Skeleton className="h-6 w-48 mx-auto" />
      </footer>
    </main>
  )
}
