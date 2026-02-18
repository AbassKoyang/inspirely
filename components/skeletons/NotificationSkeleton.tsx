import { Skeleton } from "@/components/ui/skeleton"

export function NotificationSkeleton() {
  return (
    <div className='w-full py-4 border-b border-gray-100'>
      <div className="w-full flex gap-4 items-start">
        <Skeleton className="size-[45px] rounded-full shrink-0" />
        <div className="w-full flex-1">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full mt-2" />
              <Skeleton className="h-3 w-1/2 mt-1" />
            </div>
            <Skeleton className="size-2 rounded-full shrink-0 mt-1" />
          </div>
        </div>
      </div>
    </div>
  )
}

