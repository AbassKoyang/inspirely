import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment, likeComment } from "./api";
import { toast } from "sonner";
import { PostType } from "./schemas/post";

export const useCreatComment = () => {
    const queryClient = useQueryClient()
    return useMutation({
    mutationFn: createComment,
    onMutate: async (comment) => {     
        await queryClient.cancelQueries({ queryKey: ['comments'] })

      const prevValue = queryClient.getQueryData(['comments']);
      queryClient.setQueryData(['comments'], (old: any) => ({
        ...old,
        comment,
      }));
  
      return { prevValue };
    },
  
    onError: (_, __, context) => {
      queryClient.setQueryData(['comments'], context?.prevValue);
      toast.error("An error occured")
    },

    onSettled: () => {
      queryClient.invalidateQueries({queryKey: ['comments']});
    },
});
}

export const useLikeComment = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: likeComment,      
        onMutate: async (commentId) => {     
            await queryClient.cancelQueries({ queryKey: ['comments'] })
          const prevValue = queryClient.getQueryData(['comments']);

          queryClient.setQueryData(['comments'], (old: any) => {
            console.log(old)
            const new_comments = old.results.map((c: any) =>
              c.id === commentId
                ? {
                    ...c,
                    is_liked: !c.is_liked,
                    reaction_count: c.is_liked
                      ? c.reaction_count - 1
                      : c.reaction_count + 1,
                  }
                : c
            )
            return {
                ...old,
                results: new_comments
            }
        })
      
          return { prevValue };
        },
      
        onError: (error, __, context) => {
          queryClient.setQueryData(['comments'], context?.prevValue);
          console.log(error)
          toast.error("An error occured")
        },
      
        onSettled: () => {
          queryClient.invalidateQueries({queryKey: ['comments']});
        },
    });
}

