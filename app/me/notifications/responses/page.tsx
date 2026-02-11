'use client'
import React, { useMemo } from 'react'
import { useFetchUserNotifications } from "@/lib/queries"
import { useMarkNotificationAsRead } from "@/lib/mutations"
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import defaultAvatar from '@/public/assets/images/default-avatar.png'
import { NotificationType } from '@/lib/types'

const getActionText = (actionType: string) => {
  const actionMap: Record<string, string> = {
    'comment': 'commented on your post',
    'reply': 'replied to your comment',
  }
  return actionMap[actionType] || actionType
}

const getTimeAgo = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`
  const weeks = Math.floor(days / 7)
  if (weeks < 4) return `${weeks} week${weeks > 1 ? 's' : ''} ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`
  const years = Math.floor(days / 365)
  return `${years} year${years > 1 ? 's' : ''} ago`
}

const NotificationItem = ({ notification, findNotificationPage }: { notification: NotificationType; findNotificationPage: (id: number) => number }) => {
  const timeAgo = getTimeAgo(notification.created_at)
  const markAsReadMutation = useMarkNotificationAsRead()
  
  const handleClick = () => {
    if (!notification.is_read) {
      const page = findNotificationPage(notification.id)
      markAsReadMutation.mutate({ id: notification.id, page })
    }
  }
  
  return (
    <div 
      className={`w-full py-4 border-b border-gray-100 ${!notification.is_read ? '' : ''} cursor-pointer hover:bg-gray-50/50 transition-colors`}
      onClick={handleClick}
    >
      <div className="w-full flex gap-4 items-start">
        <Link href={`/${notification.actor.id}/profile`} onClick={(e) => e.stopPropagation()}>
          <div className='size-[45px] rounded-full overflow-hidden cursor-pointer relative shrink-0'>
            <Image
              className='object-cover'
              fill
              sizes="45px"
              src={notification.actor.profile_pic_url || defaultAvatar}
              loading='lazy'
              placeholder='blur'
              blurDataURL='/assets/images/default-avatar.png'
              alt='Profile Picture'
            />
          </div>
        </Link>
        <div className="w-full flex-1">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className='font-sans text-sm text-black'>
                <Link href={`/${notification.actor.id}/profile`} className='font-semibold hover:underline' onClick={(e) => e.stopPropagation()}>
                  {notification.actor.first_name} {notification.actor.last_name}
                </Link>
                {' '}
                <span className='text-black/70'>{getActionText(notification.action_type)}</span>
              </p>
              {notification.target_object && (
                <div className="mt-2">
                  <p className='font-sans text-xs text-black/60 line-clamp-2'>
                    "{notification.target_object.content || notification.target_object.title}"
                  </p>
                  {notification.target_object.post && (
                    <Link href={`/articles/${notification.target_object.post.slug}`} className='font-sans text-xs text-emerald-700 hover:underline mt-1 block' onClick={(e) => e.stopPropagation()}>
                      View post: {notification.target_object.post.title}
                    </Link>
                  )}
                </div>
              )}
              <p className='font-sans text-xs text-black/50 mt-1'>{timeAgo}</p>
            </div>
            {!notification.is_read && (
              <div className='size-2 rounded-full bg-emerald-700 shrink-0 mt-1'></div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const ResponsesPage = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useFetchUserNotifications()

  const responseNotifications = useMemo(() => {
    const allNotifications = data?.pages.flatMap(page => page.results) || []
    return allNotifications.filter(
      notification => notification.action_type === 'comment' || notification.action_type === 'reply'
    )
  }, [data])

  const findNotificationPage = (notificationId: number): number => {
    if (!data?.pages) return 1
    for (let i = 0; i < data.pages.length; i++) {
      const page = data.pages[i]
      if (page.results.some((n: NotificationType) => n.id === notificationId)) {
        return i + 1
      }
    }
    return 1
  }

  return (
    <div className='w-full relative pt-6'>
      {isLoading && (
        <div className="w-full flex items-center justify-center py-10">
          <p className='font-sans text-base text-black/60'>Loading...</p>
        </div>
      )}
      {isError && (
        <div className="w-full flex items-center justify-center py-10">
          <p className='font-sans text-base text-red-600'>An error occurred while loading responses.</p>
        </div>
      )}
      {responseNotifications && responseNotifications.length > 0 && (
        <div className="w-full flex flex-col">
          {responseNotifications.map((notification) => (
            <NotificationItem 
              key={notification.id} 
              notification={notification} 
              findNotificationPage={findNotificationPage}
            />
          ))}
        </div>
      )}

      {responseNotifications && responseNotifications.length === 0 && !isLoading && (
        <div className="w-full flex items-center justify-center h-[60vh]">
          <p className='font-sans text-base text-black/60'>No responses yet.</p>
        </div>
      )}

      <div className={`w-full h-[200px] bg-linear-to-t from-white via-white/80 to-white/40 items-end justify-center absolute left-0 bottom-0 z-30 pb-4 ${hasNextPage ? 'flex' : 'hidden'}`}>
        <button 
          disabled={!hasNextPage || isFetchingNextPage} 
          onClick={() => fetchNextPage()} 
          className='text-emerald-700 flex items-center gap-2 cursor-pointer disabled:hidden'
        >
          <p className='text-sm font-sans font-medium'>{isFetchingNextPage ? "Loading more..." : 'Show more'}</p>
          <ChevronDown className='text-emerald-700 size-[20px]'/>
        </button>
      </div>
    </div>
  )
}

export default ResponsesPage