import { z } from 'zod';
import type { ServerResponse } from 'http';
import { publicProcedure, router } from '../context/trpc';
import { protectedProcedure } from '../middleware/auth.middleware';
import { validateCredentials } from '../utils/auth';
import { clearAuthCookie, createAuthCookie } from '../utils/cookies';

export const authRouter = router({
    // Login as regular user
    loginAsUser: publicProcedure
        .input(z.object({
            username: z.string(),
            password: z.string(),
        }))
        .mutation(({ ctx, input }) => {
            const credentials = validateCredentials(input.username, input.password);
            
            if (!credentials) {
                throw new Error('Invalid credentials');
            }
            
            // Set httpOnly cookie
            const res = ctx.res as ServerResponse;
            res.setHeader('Set-Cookie', createAuthCookie(credentials.token));
            
            return {
                success: true,
                user: {
                    id: credentials.user.id,
                    name: credentials.user.name,
                    role: credentials.user.role,
                },
            };
        }),
    
    // Login as admin
    loginAsAdmin: publicProcedure
        .input(z.object({
            username: z.string(),
            password: z.string(),
        }))
        .mutation(({ ctx, input }) => {
            // Force admin login for demo
            const credentials = validateCredentials('admin', input.password);
            
            if (!credentials) {
                throw new Error('Invalid credentials');
            }
            
            // Set httpOnly cookie
            const res = ctx.res as ServerResponse;
            res.setHeader('Set-Cookie', createAuthCookie(credentials.token));
            
            return {
                success: true,
                user: {
                    id: credentials.user.id,
                    name: credentials.user.name,
                    role: credentials.user.role,
                },
            };
        }),
    
    // Logout
    logout: publicProcedure
        .mutation(({ ctx }) => {
            // Clear the auth cookie
            const res = ctx.res as ServerResponse;
            res.setHeader('Set-Cookie', clearAuthCookie());
            
            return { success: true };
        }),
    
    // Get current user info
    whoami: protectedProcedure
        .query(({ ctx }) => {
            return {
                id: ctx.user.id,
                name: ctx.user.name,
                role: ctx.user.role,
                permissions: ctx.user.permissions,
            };
        }),
});