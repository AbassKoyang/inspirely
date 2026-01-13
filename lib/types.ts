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
  