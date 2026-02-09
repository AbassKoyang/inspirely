import axios from "axios";
import { PostType } from "./schemas/post";
import { CategoryType, CommentType, Follow, PaginatedResponse, PostResponseType, TagType } from "./types";
import { User } from "./schemas/user";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

let isRefreshing = false;
let refreshSubscribers: (() => void)[] = [];

function onRefreshed() {
  refreshSubscribers.forEach((cb) => cb());
  refreshSubscribers = [];
}

function addRefreshSubscriber(cb: () => void) {
  refreshSubscribers.push(cb);
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          addRefreshSubscriber(() => resolve(api(originalRequest)));
        });
      }

      isRefreshing = true;

      try {
        await api.post("/api/auth/refresh/");
        isRefreshing = false;
        onRefreshed();
        return api(originalRequest);
      } catch (err) {
        isRefreshing = false;
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);


export const fetchUserPost = async (userId: string) : Promise<PaginatedResponse<PostType>> => {
    try {
        const response =  await api.get(`/api/users/${userId}/posts/`)
        console.log(response.data)
        return response.data as PaginatedResponse<PostType>
    } catch (error) {
        console.error("error fetching user posts", error)
        throw error
    }
}

export const fetchPersonalisedPosts = async () => {
    try {
        const response =  await api.get("/api/feeds/personalized/")
        console.log(response.data)
        return response.data
    } catch (error) {
        console.error("error fetching posts", error)
    }
}

export const fetchTrendingPosts = async () => {
    try {
        const response =  await api.get("/api/feeds/trending/")
        console.log(response.data)
        return response.data
    } catch (error) {
        console.error("error fetching trending posts", error)
    }
}

export const fetchLatestPosts = async () : Promise<PostResponseType> => {
    try {
        const response =  await api.get("/api/feeds/recent/")
        console.log(response.data)
        return response.data as PostResponseType
    } catch (error) {
        console.error("error fetching latest posts", error)
        throw error
    }
}

export const fetchCombinedPosts = async () : Promise<PostResponseType> => {
    try {
        const response =  await api.get("/api/feeds/combined/")
        console.log(response.data)
        return response.data as PostResponseType
    } catch (error) {
        console.error("error fetching combined posts", error)
        throw error
    }
}

export const fetchUser = async (userId: string) : Promise<User> => {
      try {
        const response =  await api.get(`/api/users/${userId}/`)
        console.log(response.data)
        return response.data as User
    } catch (error) {
        console.error("error fetching user", error)
        throw error
    }
}

export const fetchUsers = async () : Promise<PaginatedResponse<User>> => {
      try {
        const response =  await api.get(`/api/users/`)
        console.log(response.data)
        return response.data as PaginatedResponse<User>
    } catch (error) {
        console.error("error fetching users", error)
        throw error
    }
}

export const fetchSessionUser = async () : Promise<User> => {
      try {
        const response =  await api.get(`/api/auth/me/`, {withCredentials: true})
        console.log(response.data)
        return response.data as User
    } catch (error) {
        console.error("error fetching user", error)
        throw error
    }
}

export const fetchFollowing = async (userId: string) : Promise<PaginatedResponse<Follow>> => {
      try {
        const response =  await api.get(`/api/users/${userId}/following/`)
        console.log(response.data)
        return response.data as PaginatedResponse<Follow>
    } catch (error) {
        console.error("error fetching following", error)
        throw error
    }
}

export const fetchIsFollowing = async (userId: string) : Promise<{is_following: boolean}> => {
      try {
        const response =  await api.get(`/api/users/${userId}/is-following/`)
        console.log(response.data)
        return response.data as {is_following: boolean}
    } catch (error) {
        console.error("error fetching isfollowing", error)
        throw error
    }
}

export const fetchCategories = async () : Promise<CategoryType[]> => {
      try {
        const response =  await api.get(`/api/categories/`)
        console.log(response.data)
        return response.data as TagType[]
    } catch (error) {
        console.error("error fetching categories", error)
        throw error
    }
}

export const fetchTags = async () : Promise<TagType[]> => {
      try {
        const response =  await api.get(`/api/tags/`)
        console.log(response.data)
        return response.data as TagType[]
    } catch (error) {
        console.error("error fetching categories", error)
        throw error
    }
}

export const fetchPost = async (slug: string) : Promise<PostType> => {
      try {
        const response =  await api.get(`/api/posts/${slug}`)
        console.log(response.data)
        return response.data as PostType
    } catch (error) {
        console.error("error fetching post", error)
        throw error
    }
}

export const followUser = async (postId: string) : Promise<User> => {
      try {
        const response = await api.post(`/api/users/${postId}/follow/`)
        console.log(response.data)
        return response.data as User
    } catch (error) {
        console.error("error following user", error)
        throw error
    }
}
export const unfollowUser = async (postId: string) : Promise<User> => {
      try {
        const response = await api.delete(`/api/users/${postId}/follow/`)
        console.log(response.data)
        return response.data as User
    } catch (error) {
        console.error("error unfollowing post", error)
        throw error
    }
}

export const likePost = async (postId: string) => {
      try {
        const response = await api.post(`/api/posts/${postId}/reactions/`, {reaction_type: 'upvote'}, {withCredentials: true})
        console.log(response.data)
    } catch (error) {
        console.error("error liking post", error)
        throw error
    }
}
export const likeComment = async (commentId: string) => {
      try {
        const response = await api.post(`/api/comments/${commentId}/reactions/`, {reaction_type: 'upvote'}, {withCredentials: true})
        console.log(response.data)
    } catch (error) {
        console.error("error liking comment", error)
        throw error
    }
}
export const likeReply = async (commentId: string) => {
      try {
        const response = await api.post(`/api/comments/${commentId}/reactions/`, {reaction_type: 'upvote'}, {withCredentials: true})
        console.log(response.data)
    } catch (error) {
        console.error("error liking reply", error)
        throw error
    }
}

export const bookmarkPost = async (postId: string) => {
      try {
        const response = await api.post(`/api/posts/${postId}/bookmark/`,null, {withCredentials: true})
        console.log(response.data)
    } catch (error) {
        console.error("error boookmarking post", error)
        throw error
    }
}
export const removeBookmark = async (postId: string) => {
      try {
        const response = await api.delete(`/api/posts/${postId}/bookmark/delete/`, {withCredentials: true})
        console.log(response.data)
    } catch (error) {
        console.error("error deleting bookmark", error)
        throw error
    }
}

export const deletePost = async (postId: string) => {
      try {
        const response = await api.delete(`/api/posts/${postId}/delete/`, {withCredentials: true})
        console.log(response.data)
    } catch (error) {
        console.error("error deleting post", error)
        throw error
    }
}

export const fetchComments = async (postId:string, page: number) : Promise<PaginatedResponse<CommentType>> => {
  try {
    const response =  await api.get(`/api/posts/${postId}/comments/?page=${page}`)
    console.log(response.data)
    return response.data as PaginatedResponse<CommentType>
} catch (error) {
    console.error("error fetching comments", error)
    throw error
}
}
export const fetchReplies = async (commentid: string, page: number) : Promise<PaginatedResponse<CommentType>> => {
  try {
    const response =  await api.get(`/api/comments/${commentid}/replies/?page=${page}`)
    console.log(response.data)
    return response.data as PaginatedResponse<CommentType>
} catch (error) {
    console.error("error fetching replies", error)
    throw error
}
}


export const createComment = async ({postId, comment}:{postId: string; comment: {content: string; parent_id?: number}}) : Promise<CommentType> => {
  try {
    const response = await api.post(`/api/posts/${postId}/comments/`, comment)
    console.log(response.data)
    return response.data as CommentType
} catch (error) {
    console.error("error creating comment", error)
    throw error
}
}
export const createReply = async ({commentId, comment}:{commentId: string; comment: {content: string; parent_id?: number}}) : Promise<CommentType> => {
  try {
    const response = await api.post(`/api/comments/${commentId}/replies/`, comment)
    console.log(response.data)
    return response.data as CommentType
} catch (error) {
    console.error("error creating comment", error)
    throw error
}
}