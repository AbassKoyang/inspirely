import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { fetchCategories, fetchCombinedPosts, fetchComments, fetchFollowing, fetchIsFollowing, fetchLatestPosts, fetchPersonalisedPosts, fetchPost, fetchReplies, fetchSessionUser, fetchTags, fetchTrendingPosts, fetchUser, fetchUserComments, fetchUserPost, fetchUsers, searchCategories, searchPosts, searchUsers } from "./api"

export const useFetchUserPosts = (userId: string) => {
    return useQuery({
        queryFn: () => fetchUserPost(userId),
        queryKey: ['user-posts']
    })
}

export const useFetchPersonalisedPosts = () => {
    return useQuery({
        queryFn: fetchPersonalisedPosts,
        queryKey: ['personalised-posts']
    })
}

export const useFetchTrendingPosts = () => {
    return useQuery({
        queryFn: fetchTrendingPosts,
        queryKey: ['trending-posts']
    })
}
export const useFetchLatestPosts = () => {
    return useQuery({
        queryFn: fetchLatestPosts,
        queryKey: ['latest-posts']
    })
}
export const useFetchCombinedPosts = () => {
    return useQuery({
        queryFn: fetchCombinedPosts,
        queryKey: ['combined-posts']
    })
}
export const useFetchUser = (userId:string) => {
    return useQuery({
        queryFn: () => fetchUser(userId),
        queryKey: [`user-${userId}`]
    })
}

export const useFetchUsers = () => {
    return useQuery({
        queryFn: fetchUsers,
        queryKey: [`whotofollow`]
    })
}

export const useFetchSessionUser = () => {
    return useQuery({
        queryFn: () => fetchSessionUser(),
        queryKey: ['session-user']
    })
}
export const useFetchIsFollowing = (userId:string) => {
    return useQuery({
        queryFn: () => fetchIsFollowing(userId),
        queryKey: ['is-following']
    })
}

export const useFetchFollowing = (userId:string) => {
    return useQuery({
        queryFn: () => fetchFollowing(userId),
        queryKey: ['following', userId]
    })
}

export const useFetchCategories = () => {
    return useQuery({
        queryFn: fetchCategories,
        queryKey: ['categories']
    })
}

export const useFetchTags = () => {
    return useQuery({
        queryFn: fetchTags,
        queryKey: ['tags']
    })
}

export const useFetchPost = (slug:string) => {
    return useQuery({
        queryFn: () => fetchPost(slug),
        queryKey: ['article', slug]
    })
}

export const useFetchComments = (postId: string) => {
    return useInfiniteQuery({
      queryKey: ['comments', postId],
      queryFn: ({pageParam=1}) => fetchComments(postId, pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (!lastPage.next) return undefined
  
        const url = new URL(String(lastPage.next))
        return Number(url.searchParams.get('page'))
      },
      enabled: !!postId,
    })
  }

export const useFetchReplies = (commentId:string) => {
    return useInfiniteQuery({
        queryFn: ({pageParam = 1}) => fetchReplies(commentId, pageParam),
        queryKey: [`replies-${commentId}`],
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (!lastPage.next) return undefined
    
            const url = new URL(String(lastPage.next))
            return Number(url.searchParams.get('page'))
        },
        enabled: !!commentId,
    })
}

export const useFetchBookmarks = (userId:string) => {
    return useInfiniteQuery({
        queryFn: ({pageParam = 1}) => fetchReplies(userId, pageParam),
        queryKey: [`bookmarks-${userId}`],
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (!lastPage.next) return undefined
    
            const url = new URL(String(lastPage.next))
            return Number(url.searchParams.get('page'))
        },
        enabled: !!userId,
    })
}

export const useFetchUserComments = (userId:string) => {
    return useInfiniteQuery({
        queryFn: ({pageParam = 1}) => fetchUserComments(userId, pageParam),
        queryKey: [`user-comments-${userId}`],
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (!lastPage.next) return undefined
    
            const url = new URL(String(lastPage.next))
            return Number(url.searchParams.get('page'))
        },
        enabled: !!userId,
    })
}

export const useSearchPosts = (query: string) => {
    return useInfiniteQuery({
        queryFn: ({pageParam = 1}) => searchPosts({query, page: pageParam}),
        queryKey: [`post-search-${query}`],
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (!lastPage.next) return undefined
    
            const url = new URL(String(lastPage.next))
            return Number(url.searchParams.get('page'))
        },
        enabled: !!query,
    })
}

export const useSearchCategories = (query: string) => {
    return useInfiniteQuery({
        queryFn: ({pageParam = 1}) => searchCategories({query, page: pageParam}),
        queryKey: [`category-search-${query}`],
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (!lastPage.next) return undefined
    
            const url = new URL(String(lastPage.next))
            return Number(url.searchParams.get('page'))
        },
        enabled: !!query,
    })
}

export const useSearchUsers = (query: string) => {
    return useInfiniteQuery({
        queryFn: ({pageParam = 1}) => searchUsers({query, page: pageParam}),
        queryKey: [`users-search-${query}`],
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (!lastPage.next) return undefined
    
            const url = new URL(String(lastPage.next))
            return Number(url.searchParams.get('page'))
        },
        enabled: !!query,
    })
}
