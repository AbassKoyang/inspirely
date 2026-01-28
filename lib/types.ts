import { PostType } from "./schemas/post"
import { User } from "./schemas/user";

export type PostResponseType = {
    count: number | null;
    next: number | null;
    previous: number | null;
    results: PostType[]
}

export type Follow = {
    follower: User,
    following: User,
    createdAt: Date
}

export type PaginatedResponse<T> = {
    count: number | null;
    next: number | null;
    previous: number | null;
    results: T[];
  };

  export type TagType = {
    id: number;
    name: string;
    slug: string;
    created_at: string
  }
  export type CommentType = {
    id: number;
    post: PostType;
    user: User;
    content : string;
    reply_count : number;
    reaction_count: number;
    views_count: number;
    parent_id: number;
    created_at: string;
    updated_at: string
  }
  