import { Skeleton } from "@/components/ui/skeleton"

export function UserProfileSkeleton({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const avatarSize = size === "sm" ? "size-[45px]" : size === "lg" ? "size-[60px]" : "size-[50px]"
  
  return (
    <div className='w-full border-y border-gray-100 py-6 first:border-t-0'>
      <div className="w-full flex justify-between items-center">
        <div className="w-full flex gap-5 items-center">
          <Skeleton className={`${avatarSize} rounded-full`} />
          <div className="w-full">
            <Skeleton className="h-4 lg:h-5 w-32 lg:w-40" />
            <Skeleton className="h-3 w-48 lg:w-64 mt-2" />
          </div>
        </div>
        <Skeleton className="h-8 w-20 lg:w-24 rounded-4xl" />
      </div>
    </div>
  )
}

