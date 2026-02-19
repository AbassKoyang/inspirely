import { Skeleton } from "@/components/ui/skeleton"

export function ProfilePostPreviewSkeleton() {
  return (
    <div className='w-full flex md:flex-row flex-col md:justify-between py-4 bg-white mb-5'>
      <div className="w-full md:w-[70%]">
        <div className="w-full h-[200px] rounded-xl mt-2 md:hidden">
          <Skeleton className="w-full h-full rounded-xl" />
        </div>
        <Skeleton className="h-4 w-32 mt-3 md:hidden" />
        <Skeleton className="h-6 w-full mt-1 md:mt-5" />
        <Skeleton className="h-5 w-3/4 mt-1" />

        <div className="w-full flex items-center justify-between mt-10">
          <Skeleton className="h-4 w-24 hidden md:block" />
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

