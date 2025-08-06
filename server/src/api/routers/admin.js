import { z } from 'zod';
import { router } from '../trpc';
import { adminProcedure, permissionProcedure } from '../../middleware/auth';
const deleteUserSchema = z.object({
    userId: z.string().min(1),
});
// Remove unused schema - the analytics query doesn't actually use it
export const adminRouter = router({
    users: adminProcedure
        .query(async ({ ctx }) => {
        // In a real app, this would query the database
        const users = [
            { id: '123', username: 'john_user', email: 'john@example.com', role: 'user' },
            { id: '456', username: 'jane_admin', email: 'jane@example.com', role: 'admin' },
            { id: '789', username: 'bob_user', email: 'bob@example.com', role: 'user' },
        ];
        return {
            users,
            total: users.length,
            requestedBy: ctx.user.username,
            requestedAt: new Date(),
        };
    }),
    systemStats: adminProcedure
        .query(({ ctx }) => {
        return {
            stats: {
                totalUsers: 3,
                serverUptime: Math.floor(process.uptime()),
                memoryUsage: process.memoryUsage(),
            },
            adminUser: ctx.user.username,
            timestamp: new Date(),
        };
    }),
    deleteUser: permissionProcedure('delete:users')
        .input(deleteUserSchema)
        .mutation(async ({ ctx, input }) => {
        // In a real app, this would delete from database
        return {
            success: true,
            deletedUserId: input.userId,
            deletedBy: ctx.user.username,
            deletedAt: new Date(),
        };
    }),
    analytics: permissionProcedure('read:analytics')
        .query(async ({ ctx }) => {
        // In a real app, this would query analytics data
        return {
            period: {
                start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                end: new Date(),
            },
            metrics: {
                dailyActiveUsers: 42,
                totalRevenue: 1234.56,
                newSignups: 12,
                churnRate: 0.05,
            },
            accessedBy: ctx.user.username,
            generatedAt: new Date(),
        };
    }),
});
