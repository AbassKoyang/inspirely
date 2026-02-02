import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment, createReply, likeComment, likeReply } from "./api";
import { toast } from "sonner";
import { PostType } from "./schemas/post";

export const useCreatComment = (postId: string) => {
    const queryClient = useQueryClient()
  
    return useMutation({
      mutationFn: createComment,
      onError: (_, __, context) => {
        toast.error('An error occurred')
      },
  
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['comments', postId] })
      },
    })
  }

export const useCreateReply = (commentId: string) => {
    const queryClient = useQueryClient()
  
    return useMutation({
      mutationFn: createReply,
      onError: (_, __, context) => {
        toast.error('An error occurred')
      },
  
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: [`replies-${commentId}`] })
      },
    })
  }
  

export const useLikeComment = (postId: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: likeComment,      
        onMutate: async (commentId) => {     
            await queryClient.cancelQueries({ queryKey: ['comments', postId] })
            const oldPagesArray: any = queryClient.getQueryData(['comments', postId]);
            console.log('Prev value:', oldPagesArray)
            const newPagesArray =
            oldPagesArray?.pages.map((page: any) => {
                const newResults = page.results.map((comment: any) => {
                    return comment.id == commentId ? {
                    ...comment,
                    is_liked: !comment.is_liked,
                    reaction_count: comment.is_liked ? comment.reaction_count - 1 : comment.reaction_count +1
                    } : comment})
                return {
                    ...page,
                    results: newResults
                }
        })

            console.log("newPages", newPagesArray)

          queryClient.setQueryData(['comments', postId], (data: any) => ({
            pages: newPagesArray,
            pageParams: data.pageParams,          
        }))
      
          return { oldPagesArray };
        },
      
        onError: (error, __, context) => {
          queryClient.setQueryData(['comments', postId], context?.oldPagesArray);
          console.log(error)
          toast.error("An error occured")
        },
      
        onSettled: () => {
          queryClient.invalidateQueries({queryKey: ['comments', postId]});
        },
    });
}

export const useLikeReply = (commentId: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: likeReply,      
        onMutate: async (replyId) => {     
            await queryClient.cancelQueries({ queryKey: [`replies-${commentId}`] })
            const oldPagesArray: any = queryClient.getQueryData([`replies-${commentId}`]);
            console.log('Prev value:', oldPagesArray)
            const newPagesArray =
            oldPagesArray?.pages.map((page: any) => {
                const newResults = page.results.map((comment: any) => {
                    return comment.id == replyId ? {
                    ...comment,
                    is_liked: !comment.is_liked,
                    reaction_count: comment.is_liked ? comment.reaction_count - 1 : comment.reaction_count +1
                    } : comment})
                return {
                    ...page,
                    results: newResults
                }
        })

            console.log("newPages", newPagesArray)

          queryClient.setQueryData([`replies-${commentId}`], (data: any) => ({
            pages: newPagesArray,
            pageParams: data.pageParams,          
        }))
      
          return { oldPagesArray };
        },
      
        onError: (error, __, context) => {
          queryClient.setQueryData([`replies-${commentId}`], context?.oldPagesArray);
          console.log(error)
          toast.error("An error occured")
        },
      
        onSettled: () => {
          queryClient.invalidateQueries({queryKey: [`replies-${commentId}`]});
        },
    });
}

