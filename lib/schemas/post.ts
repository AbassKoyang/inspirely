import { z } from "zod";

const authorSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  first_name: z.string(),
  last_name: z.string(),
  profile_pic_url: z.string().optional(), 
});

const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  created_at: z.date(),
});

const postSchema = z.object({
  id: z.number(),
  content: z.string(),
  title: z.string().max(225, 'Title cannot be more than 225 characters long.'),
  subtitle: z.string().max(500, 'Subtitle cannot be more than 500 characters long.'),
  author: authorSchema,
  tags: z.array(z.string()),
  category: z.number(),
  slug: z.string(),
  thumbnail: z.string().nullable(),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  comment_count: z.number(),
  reaction_count: z.number(),
  bookmark_count: z.number(),
  views_count: z.number().optional(),
  word_count: z.number().optional(),
  paragraph_count: z.number().optional(),
  read_time: z.number().optional(),
  created_at: z.date(),
  updated_at: z.date(),
});

export const createPostSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  content: z.string(),
  slug: z.string().min(1, 'Slug cannot be empty').nonempty(),
  thumbnail: z.string().nullable(),
  category: z.string().min(1, 'Category cannot be empty').nonempty(),
  tags: z.array(z.string()),
})
export type CreatePostInput = z.input<typeof createPostSchema>
export type PostType = z.infer<typeof postSchema>