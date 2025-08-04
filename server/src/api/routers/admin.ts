import { z } from 'zod';
import { router } from '../trpc';
import { adminProcedure, permissionProcedure } from '../../middleware/auth';
import { globalRateLimiter } from '../../utils/rateLimit';

const deleteUserSchema = z.object({
    userId: z.string().min(1),
});

const analyticsQuerySchema = z.object({
    startDate: z.date().optional(),
    endDate: z.date().optional(),
});

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
                    activeConnections: globalRateLimiter.getActiveConnectionsCount(),
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
        .input(analyticsQuerySchema)
        .query(async ({ ctx, input }) => {
            // In a real app, this would query analytics data
            return {
                period: {
                    start: input.startDate || new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                    end: input.endDate || new Date(),
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