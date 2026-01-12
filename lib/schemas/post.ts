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
  title: z.string(),
  author: authorSchema,
  tags: z.array(z.any()),
  category: categorySchema,
  slug: z.string(),
  thumbnail: z.string().nullable(),
  status: z.enum(["draft", "published", "archived"]),
  comment_count: z.number(),
  reaction_count: z.number(),
  bookmark_count: z.number(),
  views_count: z.number(),
  created_at: z.date(),
  updated_at: z.date(),
});

export type PostType = z.infer<typeof postSchema>