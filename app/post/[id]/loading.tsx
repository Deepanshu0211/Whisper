import { Navbar } from "@/components/navbar"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <article className="container py-8 flex-1">
        <div className="max-w-3xl mx-auto">
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-4 w-1/2 mb-8" />

          <div className="space-y-4 mb-12">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-3/4" />
          </div>

          <Skeleton className="h-10 w-full mb-6" />

          <Skeleton className="h-8 w-1/4 mb-6" />

          <div className="space-y-4 mb-8">
            <Skeleton className="h-32 w-full rounded-lg" />
            <Skeleton className="h-32 w-full rounded-lg" />
          </div>

          <Skeleton className="h-48 w-full rounded-lg" />
        </div>
      </article>
    </main>
  )
}
