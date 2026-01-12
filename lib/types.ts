import { PostType } from "./schemas/post"

export type PostResponseType = {
    count: number | null;
    next: number | null;
    previous: number | null;
    results: PostType[]
}