import { Skeleton } from "@/components/ui/skeleton"

export function CategorySkeleton() {
  return (
    <div className="w-full flex flex-wrap gap-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="h-8 w-24 rounded-4xl" />
      ))}
    </div>
  )
}

