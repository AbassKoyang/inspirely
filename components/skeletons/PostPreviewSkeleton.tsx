import { Skeleton } from "@/components/ui/skeleton"

export function PostPreviewSkeleton() {
  return (
    <div className='w-full flex md:flex-row flex-col md:justify-between py-4 bg-white mb-5'>
      <div className="w-full md:w-[70%]">
        <div className="w-full flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Skeleton className="size-[30px] rounded-full" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="size-[4px] rounded-full" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
          <div className="flex items-center gap-3 md:hidden">
            <Skeleton className="size-6 rounded" />
            <Skeleton className="size-6 rounded" />
          </div>
        </div>

        <div className="w-full h-[200px] rounded-xl mt-2 md:hidden">
          <Skeleton className="w-full h-full rounded-xl" />
        </div>
        <Skeleton className="h-4 w-32 mt-3 md:hidden" />
        <Skeleton className="h-6 w-full mt-1 md:mt-5" />
        <Skeleton className="h-5 w-3/4 mt-1" />

        <div className="w-full flex items-center justify-between mt-5">
          <div className="flex items-center gap-4">
            <Skeleton className="h-4 w-24 hidden md:block" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-12" />
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-12" />
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-12" />
            </div>
          </div>
          <div className="items-center gap-3 hidden md:flex">
            <Skeleton className="size-6 rounded" />
            <Skeleton className="size-6 rounded" />
          </div>
        </div>
      </div>
      <div className="w-[150px] h-[100px] rounded-xs mt-2 hidden md:block">
        <Skeleton className="w-full h-full rounded-xs" />
      </div>
    </div>
  )
}

