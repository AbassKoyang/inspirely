import { Skeleton } from "@/components/ui/skeleton"

export function ProfileNavSkeleton() {
  return (
    <div className="w-full mt-4">
      <div className="w-full flex items-center justify-between py-6">
        <div className="flex items-start gap-5">
          <Skeleton className="size-[60px] rounded-full lg:hidden" />
          <div className="">
            <Skeleton className="h-8 lg:h-12 w-48 lg:w-64" />
            <Skeleton className="h-4 w-32 mt-1 lg:hidden" />
          </div>
        </div>
        <Skeleton className="size-6 rounded" />
      </div>
      <nav className="w-full py-4 lg:pt-6 bg-white border-b border-gray-100 overflow-hidden">
        <div className='min-w-full flex items-center gap-3 lg:gap-5 bg-white overflow-x-auto'>
          <Skeleton className="h-8 w-20 lg:w-24 rounded-4xl" />
          <Skeleton className="h-8 w-20 lg:w-24 rounded-4xl" />
        </div>
      </nav>
    </div>
  )
}

