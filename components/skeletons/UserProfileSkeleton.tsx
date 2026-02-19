import { Skeleton } from "@/components/ui/skeleton"

export function UserProfileSkeleton({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const avatarSize = size === "sm" ? "size-[30px]" : size === "lg" ? "size-[60px]" : "size-[50px]"
  
  return (
    <div className='w-full border-y border-gray-100 py-6 first:border-t-0'>
      <div className="w-full flex justify-between items-center">
        <div className="flex gap-5 items-center">
          <Skeleton className={`${avatarSize} rounded-full`} />
          <div className="">
            <Skeleton className="h-[10px] w-[100px]" />
            <Skeleton className="h-[10px] w-[100px] mt-1" />
          </div>
        </div>
        <Skeleton className="h-[24px] w-[60px] rounded-4xl" />
      </div>
    </div>
  )
}

