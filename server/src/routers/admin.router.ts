import { z } from 'zod';
import { router } from '../context/trpc';
import { adminProcedure, permissionProcedure } from '../middleware/auth.middleware';
import { globalRateLimiter } from '../utils/rateLimit';

export const adminRouter = router({
    // Get all users (admin only)
    getAllUsers: adminProcedure
        .query(({ ctx }) => {
            console.log(`Admin ${ctx.user.name} fetching all users`);
            return {
                users: [
                    { id: '123', name: 'John User', role: 'user' },
                    { id: '456', name: 'Jane Admin', role: 'admin' },
                    { id: '789', name: 'Bob User', role: 'user' },
                ],
                requestedBy: ctx.user.name,
            };
        }),
    
    // Get system statistics (admin only)
    getSystemStats: adminProcedure
        .query(({ ctx }) => {
            return {
                totalUsers: 3,
                activeRequests: globalRateLimiter.getActiveConnectionsCount(),
                serverUptime: process.uptime(),
                adminUser: ctx.user.name,
            };
        }),
    
    // Delete user (requires specific permission)
    deleteUser: permissionProcedure('delete:users')
        .input(z.object({ userId: z.string() }))
        .mutation(({ ctx, input }) => {
            console.log(`${ctx.user?.name} deleting user ${input.userId}`);
            return {
                deleted: input.userId,
                deletedBy: ctx.user?.name,
            };
        }),
    
    // Get analytics (requires specific permission)
    getAnalytics: permissionProcedure('read:analytics')
        .query(({ ctx }) => {
            return {
                dailyActiveUsers: 42,
                revenue: '$1,234',
                accessedBy: ctx.user?.name,
                userRole: ctx.user?.role,
            };
        }),
});