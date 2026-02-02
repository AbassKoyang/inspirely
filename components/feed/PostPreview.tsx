'use client'
import React, { useEffect, useState } from 'react'
import defaultAvatar from '@/public/assets/images/default-avatar.png'
import thumbnailPlaceholder from '@/public/assets/images/thumbnail-placeholder.png'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@/lib/contexts/authContext'
import { PostType } from '@/lib/schemas/post'
import { truncateText } from '@/lib/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { bookmarkPost } from '@/lib/api'
import { toast } from 'sonner'


const PostPreview = ({post}:{post: PostType}) => {
    const queryClient = useQueryClient()
    const [isSelf, setIsSelf] = useState(false)
    const {user} = useAuth()
    const date = new Date(post.created_at)
    const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long", 
    year: "numeric",
    month: "long",
    day: "numeric"}).format(date);
    const formattedMonth = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"}).format(date);   
    const title = truncateText(post.title, 70)
    const content = truncateText(post.title, 150)

    useEffect(() => {
        setIsSelf(user?.id == post.author.id)
    }, [user])

    const bookmarkMutation = useMutation({
        mutationFn: () => bookmarkPost(String(post?.author.id) || ''),      
        onMutate: async () => {     
            await queryClient.cancelQueries({ queryKey: ['article'] })
          const prevValue = queryClient.getQueryData(['article', String(post?.author.id)]);
          queryClient.setQueryData(['article', String(post?.author.id)], (old: any) => ({
            ...old,
            is_bookmarked: !post?.is_bookmarked,
            reaction_count: post?.is_bookmarked ? post?.bookmark_count - 1 : post?.bookmark_count! + 1
          }));
      
          return { prevValue };
        },

        onSuccess: () => {
            toast.success("Added to bookmark")
        },
      
        onError: (_, __, context) => {
          queryClient.setQueryData(['article', String(post?.author.id)], context?.prevValue);
          toast.error("An error occured")
        },
      
        onSettled: () => {
          queryClient.invalidateQueries({queryKey: ['article']});
        },
      });

  return (
    <div className='w-full flex md:flex-row flex-col md:justify-between py-4 bg-white mb-5'>
        <div className="w-full md:w-[70%]">
        <div className="w-full flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
                <Link href='#'>
                    <div className='size-[30px] relative rounded-full overflow-hidden object-center object-cover cursor-pointer'>
                    <Image
                        className='object-cover'
                        fill
                        sizes="(max-width: 768px) 100px, 100px"
                        src={post.author.profile_pic_url || defaultAvatar}
                        loading='eager'
                        placeholder='blur'
                        blurDataURL='/assets/images/default-avatar.png'
                        alt='Profle Picture'
                        />
                    </div>
                </Link>
                <div className="flex items-center gap-2">
                    <p className='font-sans text-sm font-medium text-black'>{post.author.first_name} {post.author.last_name}</p>
                    <div className='size-[4px] rounded-full bg-black'></div>
                    <button className='font-sans text-sm font-normal text-emerald-600'>Follow</button>
                </div>
            </div>
            <div className="flex items-center gap-3 md:hidden">
                <button className='p-2 group'>
                    <svg className='fill-black/60 group-hover:fill-black transition-all duration-200 ease-in-out' width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.5 13.9615L2.53075 15.6652C1.92825 15.9229 1.35583 15.8743 0.8135 15.5195C0.271167 15.1647 0 14.6627 0 14.0135V1.80775C0 1.30258 0.175 0.875 0.525 0.525C0.875 0.175 1.30258 0 1.80775 0H6.75C6.9625 0 7.14067 0.0719168 7.2845 0.21575C7.42817 0.359583 7.5 0.53775 7.5 0.75025C7.5 0.962917 7.42817 1.141 7.2845 1.2845C7.14067 1.42817 6.9625 1.5 6.75 1.5H1.80775C1.73075 1.5 1.66025 1.53208 1.59625 1.59625C1.53208 1.66025 1.5 1.73075 1.5 1.80775V13.9788C1.5 14.0878 1.5465 14.1743 1.6395 14.2385C1.73233 14.3025 1.83008 14.3121 1.93275 14.2673L6.5 12.3L11.0673 14.2673C11.1699 14.3121 11.2677 14.3025 11.3605 14.2385C11.4535 14.1743 11.5 14.0878 11.5 13.9788V8.25C11.5 8.0375 11.5719 7.85933 11.7158 7.7155C11.8596 7.57183 12.0378 7.5 12.2503 7.5C12.4629 7.5 12.641 7.57183 12.7845 7.7155C12.9282 7.85933 13 8.0375 13 8.25V14.0135C13 14.6627 12.7288 15.1647 12.1865 15.5195C11.6442 15.8743 11.0718 15.9229 10.4693 15.6652L6.5 13.9615ZM6.5 1.5H1.5H7.5H6.5ZM11.5 3.5H10.25C10.0375 3.5 9.85933 3.42808 9.7155 3.28425C9.57183 3.14042 9.5 2.96225 9.5 2.74975C9.5 2.53708 9.57183 2.359 9.7155 2.2155C9.85933 2.07183 10.0375 2 10.25 2H11.5V0.75C11.5 0.5375 11.5719 0.359417 11.7158 0.21575C11.8596 0.0719168 12.0378 0 12.2503 0C12.4629 0 12.641 0.0719168 12.7845 0.21575C12.9282 0.359417 13 0.5375 13 0.75V2H14.25C14.4625 2 14.6406 2.07192 14.7843 2.21575C14.9281 2.35958 15 2.53775 15 2.75025C15 2.96292 14.9281 3.141 14.7843 3.2845C14.6406 3.42817 14.4625 3.5 14.25 3.5H13V4.75C13 4.9625 12.9281 5.14067 12.7843 5.2845C12.6404 5.42817 12.4622 5.5 12.2498 5.5C12.0371 5.5 11.859 5.42817 11.7155 5.2845C11.5718 5.14067 11.5 4.9625 11.5 4.75V3.5Z" fill=""/>
                    </svg>
                </button>
                <button className='p-2 group'>
                    <svg className='fill-black/60 group-hover:fill-black transition-all duration-200 ease-in-out' width="3" height="15" viewBox="0 0 3 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.5 14.5385C1.0875 14.5385 0.734417 14.3916 0.44075 14.0977C0.146917 13.8041 0 13.451 0 13.0385C0 12.626 0.146917 12.2728 0.44075 11.979C0.734417 11.6853 1.0875 11.5385 1.5 11.5385C1.9125 11.5385 2.26558 11.6853 2.55925 11.979C2.85308 12.2728 3 12.626 3 13.0385C3 13.451 2.85308 13.8041 2.55925 14.0977C2.26558 14.3916 1.9125 14.5385 1.5 14.5385ZM1.5 8.76925C1.0875 8.76925 0.734417 8.62233 0.44075 8.3285C0.146917 8.03483 0 7.68175 0 7.26925C0 6.85675 0.146917 6.50367 0.44075 6.21C0.734417 5.91617 1.0875 5.76925 1.5 5.76925C1.9125 5.76925 2.26558 5.91617 2.55925 6.21C2.85308 6.50367 3 6.85675 3 7.26925C3 7.68175 2.85308 8.03483 2.55925 8.3285C2.26558 8.62233 1.9125 8.76925 1.5 8.76925ZM1.5 3C1.0875 3 0.734417 2.85317 0.44075 2.5595C0.146917 2.26567 0 1.9125 0 1.5C0 1.0875 0.146917 0.734417 0.44075 0.44075C0.734417 0.146917 1.0875 0 1.5 0C1.9125 0 2.26558 0.146917 2.55925 0.44075C2.85308 0.734417 3 1.0875 3 1.5C3 1.9125 2.85308 2.26567 2.55925 2.5595C2.26558 2.85317 1.9125 3 1.5 3Z" fill=""/>
                    </svg>
                </button>
            </div>
        </div>
        <div className="w-full h-[200px] rounded-xl object-cover object-center overflow-hidden mt-2 md:hidden relative">
         <Image
            className='object-cover'
            fill
            src={post.thumbnail || thumbnailPlaceholder}
            loading='eager'
            placeholder='blur'
            blurDataURL='/assets/images/thumbnail-placeholder.png'
            alt='Profle Picture'
            />
        </div>

        <p className='text-sm font-normal font-sans text-black/60 mt-3 md:hidden'>{formattedDate}</p>
        <h4 className='text-lg md:text-2xl font-semibold md:font-bold font-sans text-black mt-1 md:mt-5'>{title}</h4>
        <h4 className='text-base font-normal font-sans text-black/60 mt-1'>{content}</h4>

        <div className="w-full flex items-center justify-between mt-5">
            <div className="flex items-center gap-4">
                <p className='text-sm font-normal font-sans text-black/60 hidden md:block'>{formattedMonth}</p>
                <div className="flex items-center gap-2">
                    <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.83333 15.8975C5.41236 15.8975 5.04938 15.7517 4.74438 15.46C4.43938 15.1683 4.27354 14.812 4.24688 14.391H7.41979C7.39313 14.812 7.22729 15.1683 6.92229 15.46C6.61729 15.7517 6.25431 15.8975 5.83333 15.8975ZM3.33333 13.2371C3.15597 13.2371 3.0075 13.1773 2.88792 13.0577C2.76819 12.938 2.70833 12.7894 2.70833 12.6121C2.70833 12.4347 2.76819 12.2863 2.88792 12.1667C3.0075 12.0469 3.15597 11.9871 3.33333 11.9871H8.33333C8.5107 11.9871 8.65917 12.0469 8.77875 12.1667C8.89847 12.2863 8.95833 12.4347 8.95833 12.6121C8.95833 12.7894 8.89847 12.938 8.77875 13.0577C8.65917 13.1773 8.5107 13.2371 8.33333 13.2371H3.33333ZM2.83646 10.8333C1.96368 10.2906 1.27278 9.58139 0.76375 8.70584C0.254583 7.83042 0 6.87292 0 5.83333C0 4.20945 0.56625 2.83125 1.69875 1.69875C2.83125 0.56625 4.20944 0 5.83333 0C7.45722 0 8.83542 0.56625 9.96792 1.69875C11.1004 2.83125 11.6667 4.20945 11.6667 5.83333C11.6667 6.87292 11.4121 7.83042 10.9029 8.70584C10.3939 9.58139 9.70299 10.2906 8.83021 10.8333H2.83646Z" fill="#4CAF50"/>
                    </svg>
                    <span className='text-sm font-normal font-sans text-black/60'>{post.reaction_count}</span>
                </div>
                <div className="flex items-center gap-4">
                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.8875 7.65C11.8875 9.3 10.5542 10.6333 8.90417 10.6333C7.25417 10.6333 5.92083 9.3 5.92083 7.65C5.92083 6 7.25417 4.66667 8.90417 4.66667C10.5542 4.66667 11.8875 6 11.8875 7.65Z" stroke="#2C3E50" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M8.90417 14.5417C11.8458 14.5417 14.5875 12.8083 16.4958 9.80833C17.2458 8.63333 17.2458 6.65833 16.4958 5.48333C14.5875 2.48333 11.8458 0.75 8.90417 0.75C5.9625 0.75 3.22083 2.48333 1.3125 5.48333C0.5625 6.65833 0.5625 8.63333 1.3125 9.80833C3.22083 12.8083 5.9625 14.5417 8.90417 14.5417Z" stroke="#2C3E50" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

                    <span className='text-sm font-normal font-sans text-black/60'>{post.views_count}</span>
                </div>
                <div className="flex items-center gap-4">
                    <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.5833 1.79805C10.8583 2.08972 10.1917 2.41472 9.66668 2.73972L9.52502 2.83138C9.28336 2.98138 8.88331 2.98138 8.64164 2.83138L8.43331 2.70641C6.94998 1.78141 4.29998 0.898054 2.54998 0.756387C1.55831 0.673054 0.75 1.42305 0.75 2.41471V12.4814C0.75 13.2814 1.39999 14.0314 2.19999 14.1314L2.44169 14.1647C4.25002 14.4064 7.04164 15.3231 8.64164 16.1981L8.67501 16.2147C8.90001 16.3397 9.25831 16.3397 9.47498 16.2147C11.075 15.3314 13.875 14.4064 15.6917 14.1647L15.9667 14.1314C16.7667 14.0314 17.4167 13.2814 17.4167 12.4814V2.42305C17.4167 1.42305 16.6 0.681395 15.6083 0.764729H15.5584C15.3584 0.781395 15.1417 0.806426 14.9167 0.848092M11.5833 1.79805V5.19807L13.25 4.08972L14.9167 5.19807V0.848092M11.5833 1.79805C12.675 1.36472 13.8917 1.01476 14.9167 0.848092M9.08333 3.10637V15.6064" stroke="#2C3E50" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

                    <span className='text-sm font-normal font-sans text-black/60'>{post.bookmark_count}</span>
                </div>
            </div>
            <div className="items-center gap-3 hidden md:flex">
                <button onClick={() => bookmarkMutation.mutate()} disabled={isSelf} className='p-2 group cursor-pointer disabled:cursor-not-allowed'>
                    <svg className='fill-black/60 group-hover:fill-black transition-all duration-200 ease-in-out group-disabled:fill-black/30' width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.5 13.9615L2.53075 15.6652C1.92825 15.9229 1.35583 15.8743 0.8135 15.5195C0.271167 15.1647 0 14.6627 0 14.0135V1.80775C0 1.30258 0.175 0.875 0.525 0.525C0.875 0.175 1.30258 0 1.80775 0H6.75C6.9625 0 7.14067 0.0719168 7.2845 0.21575C7.42817 0.359583 7.5 0.53775 7.5 0.75025C7.5 0.962917 7.42817 1.141 7.2845 1.2845C7.14067 1.42817 6.9625 1.5 6.75 1.5H1.80775C1.73075 1.5 1.66025 1.53208 1.59625 1.59625C1.53208 1.66025 1.5 1.73075 1.5 1.80775V13.9788C1.5 14.0878 1.5465 14.1743 1.6395 14.2385C1.73233 14.3025 1.83008 14.3121 1.93275 14.2673L6.5 12.3L11.0673 14.2673C11.1699 14.3121 11.2677 14.3025 11.3605 14.2385C11.4535 14.1743 11.5 14.0878 11.5 13.9788V8.25C11.5 8.0375 11.5719 7.85933 11.7158 7.7155C11.8596 7.57183 12.0378 7.5 12.2503 7.5C12.4629 7.5 12.641 7.57183 12.7845 7.7155C12.9282 7.85933 13 8.0375 13 8.25V14.0135C13 14.6627 12.7288 15.1647 12.1865 15.5195C11.6442 15.8743 11.0718 15.9229 10.4693 15.6652L6.5 13.9615ZM6.5 1.5H1.5H7.5H6.5ZM11.5 3.5H10.25C10.0375 3.5 9.85933 3.42808 9.7155 3.28425C9.57183 3.14042 9.5 2.96225 9.5 2.74975C9.5 2.53708 9.57183 2.359 9.7155 2.2155C9.85933 2.07183 10.0375 2 10.25 2H11.5V0.75C11.5 0.5375 11.5719 0.359417 11.7158 0.21575C11.8596 0.0719168 12.0378 0 12.2503 0C12.4629 0 12.641 0.0719168 12.7845 0.21575C12.9282 0.359417 13 0.5375 13 0.75V2H14.25C14.4625 2 14.6406 2.07192 14.7843 2.21575C14.9281 2.35958 15 2.53775 15 2.75025C15 2.96292 14.9281 3.141 14.7843 3.2845C14.6406 3.42817 14.4625 3.5 14.25 3.5H13V4.75C13 4.9625 12.9281 5.14067 12.7843 5.2845C12.6404 5.42817 12.4622 5.5 12.2498 5.5C12.0371 5.5 11.859 5.42817 11.7155 5.2845C11.5718 5.14067 11.5 4.9625 11.5 4.75V3.5Z" fill=""/>
                    </svg>
                </button>
                <button className='p-2 group'>
                    <svg className='fill-black/60 group-hover:fill-black transition-all duration-200 ease-in-out' width="3" height="15" viewBox="0 0 3 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.5 14.5385C1.0875 14.5385 0.734417 14.3916 0.44075 14.0977C0.146917 13.8041 0 13.451 0 13.0385C0 12.626 0.146917 12.2728 0.44075 11.979C0.734417 11.6853 1.0875 11.5385 1.5 11.5385C1.9125 11.5385 2.26558 11.6853 2.55925 11.979C2.85308 12.2728 3 12.626 3 13.0385C3 13.451 2.85308 13.8041 2.55925 14.0977C2.26558 14.3916 1.9125 14.5385 1.5 14.5385ZM1.5 8.76925C1.0875 8.76925 0.734417 8.62233 0.44075 8.3285C0.146917 8.03483 0 7.68175 0 7.26925C0 6.85675 0.146917 6.50367 0.44075 6.21C0.734417 5.91617 1.0875 5.76925 1.5 5.76925C1.9125 5.76925 2.26558 5.91617 2.55925 6.21C2.85308 6.50367 3 6.85675 3 7.26925C3 7.68175 2.85308 8.03483 2.55925 8.3285C2.26558 8.62233 1.9125 8.76925 1.5 8.76925ZM1.5 3C1.0875 3 0.734417 2.85317 0.44075 2.5595C0.146917 2.26567 0 1.9125 0 1.5C0 1.0875 0.146917 0.734417 0.44075 0.44075C0.734417 0.146917 1.0875 0 1.5 0C1.9125 0 2.26558 0.146917 2.55925 0.44075C2.85308 0.734417 3 1.0875 3 1.5C3 1.9125 2.85308 2.26567 2.55925 2.5595C2.26558 2.85317 1.9125 3 1.5 3Z" fill=""/>
                    </svg>
                </button>
            </div>
        </div>
        </div>
        <div className="w-[150px] h-[100px] rounded-xs object-cover object-center overflow-hidden mt-2 hidden md:block relative">
            <Image
            className='object-cover'
            fill
            src={post.thumbnail || thumbnailPlaceholder}
            loading='eager'
            placeholder='blur'
            blurDataURL='/assets/images/thumbnail-placeholder.png'
            alt='Profle Picture'
            />
        </div>
    </div>
  )
}

export default PostPreview