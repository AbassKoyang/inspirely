'use client';
import ProfilePostPreview from '@/components/profile/ProfilePostPreview';
import { api, bookmarkPost, followUser, likePost, unfollowUser } from '@/lib/api';
import { useAuth } from '@/lib/contexts/authContext'
import { useFetchIsFollowing, useFetchPost, useFetchUser, useFetchUserPosts } from '@/lib/queries'
import defaultAvatar from '@/public/assets/images/default-avatar.png'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Ellipsis, MessageCircle, Share } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
import { formatFollowersCount } from '@/lib/utils';
import ProfilePopup from '@/components/feed/ProfilePopup';
import CommentsSidebar from '@/components/feed/CommentsSidebar';
import MobileComments from '@/components/feed/MobileComment';
import CommentSection from '@/components/feed/CommentSection';
import PostActionButtons from '@/components/feed/PostActionButtons';
import UserInfo from '@/components/feed/UserInfo';

const ArticlePage = () => {
    const [isSelf, setIsSelf] = useState(false)
    const {user: sessionUser} = useAuth();
    const slug = useParams<{slug: string}>().slug
    const {data:post} = useFetchPost(slug)
    const {data:isFollowing} = useFetchIsFollowing(String(post?.author.id) || '')
    const queryClient = useQueryClient();
    const [formattedMonth, setformattedMonth] = useState('');
    const [visible, setVisible] = useState(false);
    const lastScrollY = useRef(0)
    const [isSidebarOpen, setisSidebarOpen] = useState(false)



    useEffect(() => {
        setIsSelf(sessionUser?.id == post?.author.id)
    }, [sessionUser, post])

    useEffect(() => {
        if(!post?.created_at) return
        const date = new Date(post?.created_at || '')
        const month = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"}).format(date);
        setformattedMonth(month);
        console.log(post)
    }, [post])

    useEffect(() => {
        const handleScroll = () => {
          const currentScrollY = window.scrollY
    
          if (currentScrollY <= 0) {
            setVisible(true)
            lastScrollY.current = currentScrollY
            return
          }
    
          if (Math.abs(currentScrollY - lastScrollY.current) < 10) {
            return
          }
    
          if (currentScrollY < lastScrollY.current) {
            setVisible(true)
          } 
          else {
            setVisible(false)
          }
    
          lastScrollY.current = currentScrollY
        }
    
        window.addEventListener('scroll', handleScroll, { passive: true })
    
        return () => {
          window.removeEventListener('scroll', handleScroll)
        }
      }, [])
    
    
    
    const followMutation = useMutation({
        mutationFn: () => followUser(String(post?.author.id) || ''),
        onMutate: async () => {     
            await queryClient.cancelQueries({ queryKey: [`user-${post?.author.id}`] })
 
          const prevValue = queryClient.getQueryData([`user-${post?.author.id}`, String(post?.author.id)]);
          queryClient.setQueryData([`user-${post?.author.id}`, String(post?.author.id)], (old: any) => ({
            ...old,
            is_following: true,
          }));
      
          return { prevValue };
        },
      
        onError: (_, __, context) => {
          queryClient.setQueryData([`user-${post?.author.id}`, String(post?.author.id)], context?.prevValue);
          toast.error("An error occured")
        },
      
        onSettled: () => {
          queryClient.invalidateQueries({queryKey: [`user-${post?.author.id}`]});
        },
      });

    const unfollowMutation = useMutation({
        mutationFn: () => unfollowUser(String(post?.author.id) || ''),
      
        onMutate: async () => {     
            await queryClient.cancelQueries({ queryKey: [`user-${post?.author.id}`] })
 
          const prevValue = queryClient.getQueryData([`user-${post?.author.id}`]);
          queryClient.setQueryData([`user-${post?.author.id}`], (old: any) => ({
            ...old,
            is_following: false,
          }));
      
          return { prevValue };
        },
      
        onError: (_, __, context) => {
          queryClient.setQueryData([`user-${post?.author.id}`], context?.prevValue);
          toast.error("An error occured")
        },
      
        onSettled: () => {
          queryClient.invalidateQueries({queryKey: [`user-${post?.author.id}`]});
        },
      });

      const likeMutation = useMutation({
        mutationFn: () => likePost(String(post?.author.id) || ''),      
        onMutate: async () => {     
            await queryClient.cancelQueries({ queryKey: ['article'] })
          const prevValue = queryClient.getQueryData(['article', String(post?.author.id)]);
          queryClient.setQueryData(['article', String(post?.author.id)], (old: any) => ({
            ...old,
            is_liked: !post?.is_liked,
            reaction_count: post?.is_liked ? post?.reaction_count - 1 : post?.reaction_count! + 1
          }));
      
          return { prevValue };
        },
      
        onError: (_, __, context) => {
          queryClient.setQueryData(['article', String(post?.author.id)], context?.prevValue);
          toast.error("An error occured")
        },
      
        onSettled: () => {
          queryClient.invalidateQueries({queryKey: ['article']});
        },
      });

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
      
        onError: (_, __, context) => {
          queryClient.setQueryData(['article', String(post?.author.id)], context?.prevValue);
          toast.error("An error occured")
        },
      
        onSettled: () => {
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
    <section className='w-full max-w-2xl bg-white min-h-dvh overflow-x-hidden'>
       {post && (
        <>
         <div className="w-full">
         <h5 className='max-w-full font-sans font-bold text-3xl lg:text-[40px] text-black/90 leading-[40px] lg:leading-[50px] tracking-normal'>{post?.title}</h5>
         <p className='max-w-full font-sans font-nromal text-base lg:text-xl text-black/60 tracking-normal mt-2'>{post?.subtitle}</p>
         <div className="w-full flex lg:flex-row flex-col-reverse lg:items-center lg:gap-5 gap-3 my-5 lg:my-8">
             <div className="flex items-center gap-5">
                 <HoverCard openDelay={700} closeDelay={100}>
                     <HoverCardTrigger asChild>
                         <Link href='#'>
                             <div className='size-[35px] rounded-full overflow-hidden cursor-pointer relative'>
                                 <Image
                                 className='object-cover'
                                 fill
                                 sizes="(max-width: 768px) 100px, 100px"
                                 src={post?.author.profile_pic_url || defaultAvatar}
                                 loading='eager'
                                 placeholder='blur'
                                 blurDataURL='/assets/images/default-avatar.png'
                                 alt='Profle Picture'
                                 />
                             </div>
                         </Link>
                     </HoverCardTrigger>
                     <HoverCardContent side='right' className="w-[290px] bg-white p-6">
                     <ProfilePopup userId={String(post?.author.id) || ''} />                             
                     </HoverCardContent>
                 </HoverCard>

                 <HoverCard openDelay={700} closeDelay={100}>
                     <HoverCardTrigger asChild>
                          <Link href='#' className='text-sm font-sans text-black hover:underline'>{post?.author.first_name} {post?.author.last_name}</Link>
                     </HoverCardTrigger>
                     <HoverCardContent side='right' className="w-[290px] bg-white p-6">
                         <ProfilePopup userId={String(post?.author.id) || ''}  />
                     </HoverCardContent>
                 </HoverCard>

                 {isSelf ? null : (
                     <>
                         {isFollowing?.is_following ? (
                             <button onClick={() => unfollowMutation.mutate()} className='mt-3 bg-white text-black border border-black px-4.5 py-1 rounded-4xl cursor-pointer'>Unfollow</button>
                         ) : (
                             <button onClick={() => followMutation.mutate()} className='mt-3 bg-emerald-700 border border-emerald-700 text-white px-4.5 py-1 rounded-4xl cursor-pointer'>Follow</button>
                         )}
                     </>
                 )}
             </div>

             <div className="flex items-center gap-3">
                 <p className='text-sm text-black/60 font-sans'>{post?.read_time} min read</p>
                 <div className="size-[3px] bg-black/60 rounded-full"></div>
                 <p className='text-sm text-black/60 font-sans'>{formattedMonth}</p>
             </div>
         </div>

         <div className="w-full flex items-center justify-between py-3 lg:py-2 lg:border-y border-gray-100">
            <PostActionButtons post={post} isSelf={isSelf} openSidebar={() => setisSidebarOpen(true)}/>
         </div>
     </div>
     
     

     <div className="w-full mt-6 lg:mt-10" dangerouslySetInnerHTML={{ __html: post?.content || '' }}>
     </div>

     <div className="w-full">
        <div className="w-full flex items-center justify-between mt-16 mb-10">
            <PostActionButtons post={post} isSelf={isSelf} openSidebar={() => setisSidebarOpen(true)}/>
        </div>            
        <UserInfo userId={String(post.author.id)} />
        <CommentSection post={post} />
     </div>


     {/* Mobile bottom bar */}

     <div className={`w-full fixed bottom-0 left-0 px-4 py-5 bg-white flex lg:hidden items-center justify-center gap-30 ${visible ? 'translate-y-0' : 'translate-y-full'} transition-transform duration-300 ease-in-out`}>
         <button onClick={() => likeMutation.mutate()}  className="flex items-center gap-2 cursor-pointer group">
             <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path className={`${post?.is_liked ? 'fill-[#4CAF50]' : 'fill-black/60'} group-hover:fill-[#4CAF50] transition-all duration-200 ease-in-out`} d="M5.83333 15.8975C5.41236 15.8975 5.04938 15.7517 4.74438 15.46C4.43938 15.1683 4.27354 14.812 4.24688 14.391H7.41979C7.39313 14.812 7.22729 15.1683 6.92229 15.46C6.61729 15.7517 6.25431 15.8975 5.83333 15.8975ZM3.33333 13.2371C3.15597 13.2371 3.0075 13.1773 2.88792 13.0577C2.76819 12.938 2.70833 12.7894 2.70833 12.6121C2.70833 12.4347 2.76819 12.2863 2.88792 12.1667C3.0075 12.0469 3.15597 11.9871 3.33333 11.9871H8.33333C8.5107 11.9871 8.65917 12.0469 8.77875 12.1667C8.89847 12.2863 8.95833 12.4347 8.95833 12.6121C8.95833 12.7894 8.89847 12.938 8.77875 13.0577C8.65917 13.1773 8.5107 13.2371 8.33333 13.2371H3.33333ZM2.83646 10.8333C1.96368 10.2906 1.27278 9.58139 0.76375 8.70584C0.254583 7.83042 0 6.87292 0 5.83333C0 4.20945 0.56625 2.83125 1.69875 1.69875C2.83125 0.56625 4.20944 0 5.83333 0C7.45722 0 8.83542 0.56625 9.96792 1.69875C11.1004 2.83125 11.6667 4.20945 11.6667 5.83333C11.6667 6.87292 11.4121 7.83042 10.9029 8.70584C10.3939 9.58139 9.70299 10.2906 8.83021 10.8333H2.83646Z" fill=""/>
             </svg>
         </button>
         <button onClick={() => setisSidebarOpen(true)} className="flex items-center gap-2 cursor-pointer group">
             <MessageCircle className="size-[18px] text-black/60 group-hover:text-black transition-all duration-200 ease-in-out" />
             <span className='text-sm font-normal font-sans text-black/60'>{post?.comment_count}</span>
         </button>
         <div className="flex items-center gap-2">
             <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M11.8875 7.65C11.8875 9.3 10.5542 10.6333 8.90417 10.6333C7.25417 10.6333 5.92083 9.3 5.92083 7.65C5.92083 6 7.25417 4.66667 8.90417 4.66667C10.5542 4.66667 11.8875 6 11.8875 7.65Z" stroke="#2C3E50" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                 <path d="M8.90417 14.5417C11.8458 14.5417 14.5875 12.8083 16.4958 9.80833C17.2458 8.63333 17.2458 6.65833 16.4958 5.48333C14.5875 2.48333 11.8458 0.75 8.90417 0.75C5.9625 0.75 3.22083 2.48333 1.3125 5.48333C0.5625 6.65833 0.5625 8.63333 1.3125 9.80833C3.22083 12.8083 5.9625 14.5417 8.90417 14.5417Z" stroke="#2C3E50" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
             </svg>

             <span className='text-sm font-normal font-sans text-black/60'>{post?.views_count}</span>
         </div>
        </div>

        {/* Sidebar */}
        <CommentsSidebar isOpen={isSidebarOpen} closeSidebar={() => setisSidebarOpen(false)} post={post} />
        <MobileComments isOpen={isSidebarOpen} closeSidebar={() => setisSidebarOpen(false)} post={post} />
        </>
    )}
    </section>
  )
}

export default ArticlePage