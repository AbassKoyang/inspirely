import { useQuery } from "@tanstack/react-query"
import { fetchPersonalisedPosts, fetchTrendingPosts } from "./api"

export const useFetchPersonalisedPosts = () => {
    return useQuery({
        queryFn: fetchPersonalisedPosts,
        queryKey: ['personalised-posts']
    })
}

export const useFetchTrendingPosts = () => {
    return useQuery({
        queryFn: fetchPersonalisedPosts,
        queryKey: ['trending-posts']
    })
}