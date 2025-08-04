import { z } from 'zod';

export const loginSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
});

export const tokenSchema = z.object({
    token: z.string(),
    expiresAt: z.date(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type TokenData = z.infer<typeof tokenSchema>;