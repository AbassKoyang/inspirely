import { z } from 'zod'

export const REGISTRATION_METHODS = ['email', 'google'] as const

export const userSchema = z.object({
  id: z.number(),
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required').max(128, 'Password must be at most 128 characters'),
  first_name: z.string().max(30, 'First name must be at most 30 characters').optional().default(''),
  last_name: z.string().max(30, 'Last name must be at most 30 characters').optional().default(''),
  registration_method: z.enum(REGISTRATION_METHODS).default('email'),
  profile_pic_url: z.union([z.string().url('Invalid URL'), z.literal('')]).optional().default(''),
  banner_url: z.union([z.string().url('Invalid URL'), z.literal('')]).optional().default(''),
  bio: z.string().optional().default(''),
  about: z.string().optional().default(''),
  phone_number: z.string().max(15, 'Phone number must be at most 15 characters').optional().default(''),
  address: z.string().optional().default(''),
  city: z.string().max(100, 'City must be at most 100 characters').optional().default(''),
  state: z.string().max(100, 'State must be at most 100 characters').optional().default(''),
  country: z.string().max(100, 'Country must be at most 100 characters').optional().default(''),
  website: z.union([z.string().url('Invalid URL'), z.literal('')]).optional().default(''),
  linkedin: z.union([z.string().url('Invalid URL'), z.literal('')]).optional().default(''),
  instagram: z.union([z.string().url('Invalid URL'), z.literal('')]).optional().default(''),
  twitter: z.union([z.string().url('Invalid URL'), z.literal('')]).optional().default(''),
  github: z.union([z.string().url('Invalid URL'), z.literal('')]).optional().default(''),
  followers_count: z.number().int().nonnegative().default(0),
  following_count: z.number().int().nonnegative().default(0),
  posts_count: z.number().int().nonnegative().default(0),
  reactions_count: z.number().int().nonnegative().default(0),
  bookmarks_count: z.number().int().nonnegative().default(0),
  is_staff: z.boolean().default(false),
  is_superuser: z.boolean().default(false),
  is_active: z.boolean().default(true),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
})

export const createUserSchema = userSchema.pick({
  email: true,
  password: true,
  first_name: true,
  last_name: true,
  registration_method: true,
}).extend({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters').max(128, 'Password must be at most 128 characters'),
  first_name: z.string().max(30).optional(),
  last_name: z.string().max(30).optional(),
  registration_method: z.enum(REGISTRATION_METHODS).default('email'),
})

export const updateUserSchema = userSchema.partial().extend({
  email: z.string().email('Invalid email address').optional(),
  password: z.string().min(8, 'Password must be at least 8 characters').max(128, 'Password must be at most 128 characters').optional(),
})

export const updateUserProfileSchema = userSchema.pick({
  first_name: true,
  last_name: true,
  bio: true,
  phone_number: true,
  address: true,
  city: true,
  state: true,
  country: true,
  website: true,
  linkedin: true,
  instagram: true,
  twitter: true,
  github: true,
  profile_pic_url: true,
}).partial()

export type User = z.infer<typeof userSchema>
export type CreateUserInput = z.input<typeof createUserSchema>
export type UpdateUserInput = z.input<typeof updateUserSchema>
export type UpdateUserProfileInput = z.input<typeof updateUserProfileSchema>
