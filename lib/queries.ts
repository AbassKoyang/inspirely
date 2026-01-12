import { useQuery } from "@tanstack/react-query"
import { fetchCombinedPosts, fetchLatestPosts, fetchPersonalisedPosts, fetchTrendingPosts } from "./api"

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