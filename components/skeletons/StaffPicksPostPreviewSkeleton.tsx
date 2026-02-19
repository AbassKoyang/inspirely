import { Skeleton } from "@/components/ui/skeleton"

export function StaffPicksPostPreviewSkeleton() {
  return (
    <div className="w-full flex flex-col gap-4">
        {Array.from({length: 3}).map((_, i) => (
            <div className="w-full">
                <div className="w-full flex items-center gap-3">
                    <Skeleton className="size-[25px] rounded-[0px]" />
                    <Skeleton className="h-[10px] w-[100px] rounded-sm" />
                </div>
                <Skeleton className="h-[14px] w-full rounded-sm mt-2" />
                <Skeleton className="h-[14px] w-full rounded-sm mt-1" />
                <Skeleton className="h-[10px] w-[80px] rounded-sm mt-2" />
            </div>
        ))}
    </div>
  )
}

