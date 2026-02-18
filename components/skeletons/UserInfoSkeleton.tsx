import { Skeleton } from "@/components/ui/skeleton"

export function UserInfoSkeleton() {
  return (
    <div className="w-full mb-20 mt-16">
      <div className='w-full'>
        <div className="w-full flex justify-between items-start">
          <div className="w-full flex gap-5">
            <Skeleton className="size-[60px] rounded-full" />
            <div className="w-full max-w-lg hidden lg:block">
              <Skeleton className="h-6 w-48 mb-1" />
              <div className="flex gap-2 items-center mt-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="size-[3px] rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-4 w-full mt-3" />
              <Skeleton className="h-4 w-3/4 mt-1" />
            </div>
          </div>
          <Skeleton className="h-9 w-24 mt-3 rounded-4xl" />
        </div>
        <div className="w-full lg:hidden mt-5">
          <Skeleton className="h-6 w-48 mb-2" />
          <div className="flex gap-2 items-center mt-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="size-[3px] rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-4 w-full mt-3" />
          <Skeleton className="h-4 w-3/4 mt-1" />
        </div>
      </div>
    </div>
  )
}

