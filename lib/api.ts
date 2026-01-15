import axios from "axios";
import { PostType } from "./schemas/post";
import { Follow, PaginatedResponse, PostResponseType } from "./types";
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

