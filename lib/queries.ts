import { useQuery } from "@tanstack/react-query"
import { fetchCombinedPosts, fetchFollowing, fetchIsFollowing, fetchLatestPosts, fetchPersonalisedPosts, fetchTrendingPosts, fetchUser, fetchUserPost } from "./api"

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
        queryKey: ['user']
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
        queryKey: ['following']
    })
}