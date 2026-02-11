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

  export type CategoryType = {
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
    is_liked: boolean;
    created_at: string;
    updated_at: string
  }

  export type NotificationActionType = 
  | 'follow' 
  | 'comment' 
  | 'reply' 
  | 'reaction' 
  | 'bookmark' 
  | 'sign_up' 
  | 'log_in'

export type NotificationType = {
  id: number;
  user: User;
  actor: User;
  action_type: NotificationActionType;
  content_type: number | null;
  object_id: number | null;
  target_object: any | null;
  is_read: boolean;
  email_sent: boolean;
  push_sent: boolean;
  created_at: string;
};

  export type BookmarkType = {
    id: number;
    post: PostType;
    user: User;
    created_at: string;
  }
  