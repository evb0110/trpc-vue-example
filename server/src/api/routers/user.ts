import { TRPCError } from '@trpc/server';
import { publicProcedure, router } from '../trpc';
import { permissionProcedure, protectedProcedure } from '../../middleware/auth';
import { strictProcedure } from '../../middleware/rateLimit';
import {
    createUserSchema,
    updateProfileSchema,
    type User,
} from '../../schemas/user.schema';

export const userRouter = router({
    create: publicProcedure
        .input(createUserSchema)
        .mutation(async ({ input }) => {
            // In a real app, this would save to database
            const newUser: User = {
                id: Date.now().toString(),
                username: input.username,
                email: input.email,
                role: 'user',
                permissions: ['read:profile', 'update:profile'],
                createdAt: new Date(),
            };
            
            return newUser;
        }),
    
    profile: protectedProcedure
        .query(({ ctx }) => {
            return {
                id: ctx.user.id,
                username: ctx.user.username,
                email: ctx.user.email,
                role: ctx.user.role,
                joinedAt: new Date('2024-01-01'),
            };
        }),
    
    updateProfile: permissionProcedure('update:profile')
        .input(updateProfileSchema)
        .mutation(async ({ ctx, input }) => {
            // In a real app, this would update the database
            const updatedUser = {
                ...ctx.user,
                ...(input.username && { username: input.username }),
                ...(input.email && { email: input.email }),
            };
            
            return {
                success: true,
                user: updatedUser,
                updatedAt: new Date(),
            };
        }),
    
    delete: strictProcedure
        .mutation(async ({ ctx }) => {
            // In a real app, this would soft-delete the user
            return {
                success: true,
                message: `Account ${ctx.user.id} scheduled for deletion`,
                requestedBy: ctx.user.username,
                requestedFrom: ctx.requestInfo.ip,
                scheduledAt: new Date(),
            };
        }),
});