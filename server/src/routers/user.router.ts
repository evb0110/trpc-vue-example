import { email, z } from 'zod';
import { publicProcedure, router } from '../context/trpc';
import { protectedProcedure } from '../middleware/auth.middleware';
import { strictProcedure } from '../middleware/rateLimit.middleware';

export const userRouter = router({
    // Create user (public endpoint)
    createUser: publicProcedure
        .input(z.object({
            name: z.string().min(1),
            email: email(),
        }))
        .mutation(({ input }) => {
            console.log('Creating user:', input);
            return {
                id: Date.now(),
                ...input,
                createdAt: new Date(),
            };
        }),
    
    // Get profile (requires authentication)
    getProfile: protectedProcedure
        .query(({ ctx }) => {
            return {
                id: ctx.user.id,
                name: ctx.user.name,
                joinedAt: new Date('2024-01-01'),
            };
        }),
    
    // Update profile (requires authentication)
    updateProfile: protectedProcedure
        .input(z.object({
            name: z.string().min(1),
        }))
        .mutation(({ ctx, input }) => {
            console.log(`Updating profile for user ${ctx.user.id}`);
            return {
                id: ctx.user.id,
                name: input.name,
                updatedAt: new Date(),
            };
        }),
    
    // Delete account (requires auth AND respects rate limit)
    deleteAccount: strictProcedure
        .mutation(({ ctx }) => {
            console.log(`User ${ctx.user.id} requesting account deletion`);
            return {
                message: `Account ${ctx.user.id} scheduled for deletion`,
                requestedBy: ctx.user.name,
                requestedFrom: ctx.requestInfo.ip,
            };
        }),
});