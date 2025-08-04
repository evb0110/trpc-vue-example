import { z } from 'zod';

export const userSchema = z.object({
    id: z.string(),
    username: z.string(),
    email: z.string().email(),
    role: z.enum(['user', 'admin']),
    permissions: z.array(z.string()),
    createdAt: z.date(),
});

export const createUserSchema = z.object({
    username: z.string().min(3).max(50),
    email: z.string().email(),
});

export const updateProfileSchema = z.object({
    username: z.string().min(3).max(50).optional(),
    email: z.string().email().optional(),
});

// Only export User type because it's actually used in auth.ts and context
export type User = z.infer<typeof userSchema>;