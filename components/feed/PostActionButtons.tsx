'use client';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
import { bookmarkPost, deletePost, likePost, removeBookmark } from "@/lib/api";
import { useAuth } from "@/lib/contexts/authContext";
import { PostType } from "@/lib/schemas/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Ellipsis, MessageCircle, Share } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const PostActionButtons = ({post, isSelf, openSidebar}:{post:PostType; isSelf: boolean; openSidebar: () => void}) => {
    const {user} = useAuth()
    const [isMoreOpen, setisMoreOpen] = useState(false)
    const queryClient = useQueryClient()
    const router = useRouter()

    const likeMutation = useMutation({
        mutationFn: () => likePost(post.slug || ''),      
        onMutate: async () => {     
            await queryClient.cancelQueries({ queryKey: ['article'] })
          const prevValue = queryClient.getQueryData(['article', post.slug]);
          queryClient.setQueryData(['article', post.slug], (old: any) => ({
            ...old,
            is_liked: !post?.is_liked,
            reaction_count: post?.is_liked ? post?.reaction_count - 1 : post?.reaction_count! + 1
          }));
      
          return { prevValue };
        },
      
        onError: (_, __, context) => {
          queryClient.setQueryData(['article', post.slug], context?.prevValue);
          toast.error("An error occured")
        },
      
        onSettled: () => {
          queryClient.invalidateQueries({queryKey: ['article']});
        },
      });

      const bookmarkMutation = useMutation({
        mutationFn: () => bookmarkPost(String(post.id) || ''),      
        onMutate: async () => {     
            await queryClient.cancelQueries({ queryKey: ['article', post.slug] })
          const prevValue = queryClient.getQueryData(['article', post.slug]);
          queryClient.setQueryData(['article', post.slug], (old: any) => ({
            ...old,
            is_bookmarked: !post?.is_bookmarked,
            reaction_count: post?.is_bookmarked ? post?.bookmark_count - 1 : post?.bookmark_count! + 1
          }));
      
          return { prevValue };
        },
      
        onError: (_, __, context) => {
          queryClient.setQueryData(['article', post.slug], context?.prevValue);
          toast.error("An error occured")
        },
        onSuccess: () => {
            toast.success("Article bookmarked.")
        },
      
        onSettled: () => {
          queryClient.invalidateQueries({queryKey: ['article', post.slug]});
        },
      });

      const removeBookmarkMutation = useMutation({
        mutationFn: () => removeBookmark(String(post.id) || ''),      
        onMutate: async () => {     
            await queryClient.cancelQueries({ queryKey: ['article', post.slug] })
          const prevValue = queryClient.getQueryData(['article', post.slug]);
          queryClient.setQueryData(['article', post.slug], (old: any) => ({
            ...old,
            is_bookmarked: !post?.is_bookmarked,
            reaction_count: post?.is_bookmarked ? post?.bookmark_count + 1 : post?.bookmark_count! - 1
          }));
      
          return { prevValue };
        },
      
        onError: (_, __, context) => {
          queryClient.setQueryData(['article', post.slug], context?.prevValue);
          toast.error("An error occured")
        },
        onSuccess: () => {
            toast.success("Article removed from bookmarks.")
        },
      
        onSettled: () => {
          queryClient.invalidateQueries({queryKey: ['article', post.slug]});
        },
      });

      const deleteMutation = useMutation({
        mutationFn: () => deletePost(String(post.id) || ''),      
        onError: (_, __, context) => {
            setisMoreOpen(false)
          toast.error("An error occured")
        },
        onSuccess: () => {
            router.back()
            toast.success("Article deleted.")
        },
      
        onSettled: () => {
            setisMoreOpen(false)
          queryClient.invalidateQueries({queryKey: ['article']});
        },
      });

      const handleShare = () => {
        if (navigator.share) {
          navigator.share({
            title: post?.title,
            text: post?.subtitle,
            url: `https://inspirely.vercel.app/articles/${post?.slug}`,
          })
          .then(() => toast.success('Thanks for sharing!'))
          .catch((err) => toast.error('Error sharing:', err));
        } else {
          navigator.clipboard.writeText(`https://inspirely.vercel.app/articles/${post?.slug}`);
          toast.success('Product link copied to clipboard');
        }
      }

  return (
    <>
                 <div className="hidden items-center gap-8 lg:flex">
                 <HoverCard openDelay={700} closeDelay={100}>
                         <HoverCardTrigger asChild>
                         <button onClick={() => likeMutation.mutate()} className="flex items-center gap-2 cursor-pointer group">
                             <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path className={`${post?.is_liked ? 'fill-[#4CAF50]' : 'fill-black/60'} group-hover:fill-[#4CAF50] transition-all duration-200 ease-in-out`} d="M5.83333 15.8975C5.41236 15.8975 5.04938 15.7517 4.74438 15.46C4.43938 15.1683 4.27354 14.812 4.24688 14.391H7.41979C7.39313 14.812 7.22729 15.1683 6.92229 15.46C6.61729 15.7517 6.25431 15.8975 5.83333 15.8975ZM3.33333 13.2371C3.15597 13.2371 3.0075 13.1773 2.88792 13.0577C2.76819 12.938 2.70833 12.7894 2.70833 12.6121C2.70833 12.4347 2.76819 12.2863 2.88792 12.1667C3.0075 12.0469 3.15597 11.9871 3.33333 11.9871H8.33333C8.5107 11.9871 8.65917 12.0469 8.77875 12.1667C8.89847 12.2863 8.95833 12.4347 8.95833 12.6121C8.95833 12.7894 8.89847 12.938 8.77875 13.0577C8.65917 13.1773 8.5107 13.2371 8.33333 13.2371H3.33333ZM2.83646 10.8333C1.96368 10.2906 1.27278 9.58139 0.76375 8.70584C0.254583 7.83042 0 6.87292 0 5.83333C0 4.20945 0.56625 2.83125 1.69875 1.69875C2.83125 0.56625 4.20944 0 5.83333 0C7.45722 0 8.83542 0.56625 9.96792 1.69875C11.1004 2.83125 11.6667 4.20945 11.6667 5.83333C11.6667 6.87292 11.4121 7.83042 10.9029 8.70584C10.3939 9.58139 9.70299 10.2906 8.83021 10.8333H2.83646Z" fill=""/>
                             </svg>
                             <span className='text-sm font-normal font-sans text-black/60'>{post?.reaction_count}</span>
                         </button>
                         </HoverCardTrigger>
                         <HoverCardContent side='top' className="w-fit flex items-center justify-center p-0">
                             <div className=" bg-black/95 relative p-2 flex items-center justify-center rounded-sm">
                                 <p className='text-sm font-sans text-white font-normal'>Like</p>
                                 <div className="size-5 bg-black/95 [clip-path:polygon(0_0,100%_0,50%_100%)] absolute left-[50%] translate-x-[-50%] bottom-[-7px]"></div>
                             </div>
                         </HoverCardContent>
                 </HoverCard>
                 <HoverCard openDelay={700} closeDelay={100}>
                         <HoverCardTrigger asChild>
                             <button onClick={openSidebar} className="flex items-center gap-2 cursor-pointer group">
                                 <MessageCircle className="size-[18px] text-black/60 group-hover:text-black transition-all duration-200 ease-in-out" />
                                 <span className='text-sm font-normal font-sans text-black/60'>{post?.comment_count}</span>
                             </button>
                         </HoverCardTrigger>
                         <HoverCardContent side='top' className="w-fit flex items-center justify-center p-0">
                             <div className=" bg-black/95 relative p-2 flex items-center justify-center rounded-sm">
                                 <p className='text-sm font-sans text-white font-normal'>Comment</p>
                                 <div className="size-5 bg-black/95 [clip-path:polygon(0_0,100%_0,50%_100%)] absolute left-[50%] translate-x-[-50%] bottom-[-7px]"></div>
                             </div>
                         </HoverCardContent>
                 </HoverCard>
                
                 <HoverCard openDelay={700} closeDelay={100}>
                         <HoverCardTrigger asChild>
                             <div className="flex items-center gap-2">
                                 <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                     <path d="M11.8875 7.65C11.8875 9.3 10.5542 10.6333 8.90417 10.6333C7.25417 10.6333 5.92083 9.3 5.92083 7.65C5.92083 6 7.25417 4.66667 8.90417 4.66667C10.5542 4.66667 11.8875 6 11.8875 7.65Z" stroke="#2C3E50" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                     <path d="M8.90417 14.5417C11.8458 14.5417 14.5875 12.8083 16.4958 9.80833C17.2458 8.63333 17.2458 6.65833 16.4958 5.48333C14.5875 2.48333 11.8458 0.75 8.90417 0.75C5.9625 0.75 3.22083 2.48333 1.3125 5.48333C0.5625 6.65833 0.5625 8.63333 1.3125 9.80833C3.22083 12.8083 5.9625 14.5417 8.90417 14.5417Z" stroke="#2C3E50" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                 </svg>

                                 <span className='text-sm font-normal font-sans text-black/60'>{post?.views_count}</span>
                                  </div>
                         </HoverCardTrigger>
                         <HoverCardContent side='top' className="w-fit flex items-center justify-center p-0">
                             <div className=" bg-black/95 relative p-2 flex items-center justify-center rounded-sm">
                                 <p className='text-sm font-sans text-white font-normal'>Views</p>
                                 <div className="size-5 bg-black/95 [clip-path:polygon(0_0,100%_0,50%_100%)] absolute left-[50%] translate-x-[-50%] bottom-[-7px]"></div>
                             </div>
                         </HoverCardContent>
                 </HoverCard>
             </div>

             <div className="flex items-center gap-8 lg:gap-5">
                 <HoverCard openDelay={700} closeDelay={100}>
                         <HoverCardTrigger asChild>
                             <button onClick={() => {
                                if(post.is_bookmarked){
                                    removeBookmarkMutation.mutate()
                                } else {
                                    bookmarkMutation.mutate()
                                }
                             }} className='py-2 px-4 group cursor-pointer disabled:cursor-not-allowed border lg:border-0 border-gray-100 rounded-4xl flex items-center gap-2'>
                                 <svg className={`${post?.is_bookmarked ? 'fill-emerald-700' : 'fill-black/60'} group-hover:fill-black transition-all duration-200 ease-in-out group-disabled:fill-black/30`} width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path d="M6.5 13.9615L2.53075 15.6652C1.92825 15.9229 1.35583 15.8743 0.8135 15.5195C0.271167 15.1647 0 14.6627 0 14.0135V1.80775C0 1.30258 0.175 0.875 0.525 0.525C0.875 0.175 1.30258 0 1.80775 0H6.75C6.9625 0 7.14067 0.0719168 7.2845 0.21575C7.42817 0.359583 7.5 0.53775 7.5 0.75025C7.5 0.962917 7.42817 1.141 7.2845 1.2845C7.14067 1.42817 6.9625 1.5 6.75 1.5H1.80775C1.73075 1.5 1.66025 1.53208 1.59625 1.59625C1.53208 1.66025 1.5 1.73075 1.5 1.80775V13.9788C1.5 14.0878 1.5465 14.1743 1.6395 14.2385C1.73233 14.3025 1.83008 14.3121 1.93275 14.2673L6.5 12.3L11.0673 14.2673C11.1699 14.3121 11.2677 14.3025 11.3605 14.2385C11.4535 14.1743 11.5 14.0878 11.5 13.9788V8.25C11.5 8.0375 11.5719 7.85933 11.7158 7.7155C11.8596 7.57183 12.0378 7.5 12.2503 7.5C12.4629 7.5 12.641 7.57183 12.7845 7.7155C12.9282 7.85933 13 8.0375 13 8.25V14.0135C13 14.6627 12.7288 15.1647 12.1865 15.5195C11.6442 15.8743 11.0718 15.9229 10.4693 15.6652L6.5 13.9615ZM6.5 1.5H1.5H7.5H6.5ZM11.5 3.5H10.25C10.0375 3.5 9.85933 3.42808 9.7155 3.28425C9.57183 3.14042 9.5 2.96225 9.5 2.74975C9.5 2.53708 9.57183 2.359 9.7155 2.2155C9.85933 2.07183 10.0375 2 10.25 2H11.5V0.75C11.5 0.5375 11.5719 0.359417 11.7158 0.21575C11.8596 0.0719168 12.0378 0 12.2503 0C12.4629 0 12.641 0.0719168 12.7845 0.21575C12.9282 0.359417 13 0.5375 13 0.75V2H14.25C14.4625 2 14.6406 2.07192 14.7843 2.21575C14.9281 2.35958 15 2.53775 15 2.75025C15 2.96292 14.9281 3.141 14.7843 3.2845C14.6406 3.42817 14.4625 3.5 14.25 3.5H13V4.75C13 4.9625 12.9281 5.14067 12.7843 5.2845C12.6404 5.42817 12.4622 5.5 12.2498 5.5C12.0371 5.5 11.859 5.42817 11.7155 5.2845C11.5718 5.14067 11.5 4.9625 11.5 4.75V3.5Z" fill=""/>
                                 </svg>
                                 <p className='text-sm text-black/60 font-sans group-disabled:text-black/30 block lg:hidden'>Save</p>
                             </button>
                         </HoverCardTrigger>
                         <HoverCardContent side='top' className="w-fit flex items-center justify-center p-0">
                             <div className=" bg-black/95 relative p-2 flex items-center justify-center rounded-sm">
                                 <p className='text-sm font-sans text-white font-normal'>Save</p>
                                 <div className="size-5 bg-black/95 [clip-path:polygon(0_0,100%_0,50%_100%)] absolute left-[50%] translate-x-[-50%] bottom-[-7px]"></div>
                             </div>
                         </HoverCardContent>
                     </HoverCard>
                
                 <HoverCard openDelay={700} closeDelay={100}>
                     <HoverCardTrigger asChild>
                         <button onClick={handleShare} className='py-2 px-4 group cursor-pointer disabled:cursor-not-allowed border lg:border-0 border-gray-100 rounded-4xl flex items-center gap-2'>
                             <Share className='size-[18px] text-black/60 group-hover:text-black transition-all duration-200 ease-in-out' />
                             <p className='text-sm text-black/60 font-sans group-disabled:text-black/30 group-hover:text-black block lg:hidden'>Share</p>
                         </button>
                     </HoverCardTrigger>
                     <HoverCardContent side='top' className="w-fit flex items-center justify-center p-0">
                         <div className=" bg-black/95 relative p-2 flex items-center justify-center rounded-sm">
                             <p className='text-sm font-sans text-white font-normal'>Share</p>
                             <div className="size-5 bg-black/95 [clip-path:polygon(0_0,100%_0,50%_100%)] absolute left-[50%] translate-x-[-50%] bottom-[-7px]"></div>
                         </div>
                     </HoverCardContent>
                 </HoverCard>

                 <HoverCard openDelay={700} closeDelay={100}>
                     <HoverCardTrigger asChild>
                        <div className="relative">
                            <button onClick={() => setisMoreOpen(!isMoreOpen)} className='py-2 px-4 group cursor-pointer disabled:cursor-not-allowed border lg:border-0 border-gray-100 rounded-4xl flex items-center gap-2'>
                                <Ellipsis className="size-[18px] text-black/60 group-hover:text-black transition-all duration-200 ease-in-out" />
                                <p className='text-sm text-black/60 font-sans group-disabled:text-black/30 group-hover:text-black block lg:hidden'>More</p>
                            </button>
                            <div  className={`${isMoreOpen ? 'block' : 'hidden'} absolute left-[50%] translate-x-[-50%] bottom-[-80px] z-200`}>
                            <div className=" bg-white relative p-2 justify-center rounded-xs shadow-sm w-[160px]">
                                {user?.id == post.author.id && (
                                   <div className="w-full">
                                     <Link href={`/edit/${post.slug}`} className="w-full py-1 text-black/60 hover:text-black cursor-pointer font-sans text-sm flex items-center justify-start px-2">Edit Story</Link>

                                     <button onClick={() => deleteMutation.mutate()} className="w-full py-1 text-red-600 hover:text-red-700 cursor-pointer font-sans text-sm flex items-center justify-start px-2">Delete Story</button>
                                   </div>
                                )}
                                <div className="size-4 bg-white absolute left-[50%] translate-x-[-50%] top-[-8px] rotate-45 border border-gray-200 z-[-1]"></div>
                            </div>
                            </div>
                        </div>
                     </HoverCardTrigger>
                     <HoverCardContent side='top' className="w-fit flex items-center justify-center p-0">
                         <div className=" bg-black/95 relative p-2 flex items-center justify-center rounded-sm">
                             <p className='text-sm font-sans text-white font-normal'>More</p>
                             <div className="size-5 bg-black/95 [clip-path:polygon(0_0,100%_0,50%_100%)] absolute left-[50%] translate-x-[-50%] bottom-[-7px]"></div>
                         </div>
                     </HoverCardContent>
                 </HoverCard>
             </div>
    </>
  )
}

export default PostActionButtons