import { z } from 'zod';
import { publicProcedure, router } from '../context/trpc';
import { rateLimitedProcedure } from '../middleware/rateLimit.middleware';
import { globalRateLimiter } from '../utils/rateLimit';

export const publicRouter = router({
    // Simple hello endpoint
    hello: publicProcedure
        .input(z.object({ name: z.string() }))
        .query(({ input }) => {
            return {
                greeting: `Hello ${input.name}!`,
            };
        }),
    
    // Get request info (shows IP, user agent, etc.)
    getRequestInfo: publicProcedure
        .query(({ ctx }) => {
            return {
                yourIp: ctx.requestInfo.ip,
                userAgent: ctx.requestInfo.userAgent,
                requestCount: ctx.requestInfo.requestsInWindow,
                timestamp: ctx.requestInfo.timestamp,
            };
        }),
    
    // Rate limited report generation
    generateReport: rateLimitedProcedure
        .input(z.object({
            type: z.enum(['summary', 'detailed']),
        }))
        .mutation(({ ctx, input }) => {
            console.log(`Generating ${input.type} report for ${ctx.requestInfo.ip}`);
            
            const remaining = globalRateLimiter.getRemainingRequests(ctx.requestInfo.ip);
            
            return {
                report: `${input.type} report generated`,
                requestsRemaining: remaining,
                generatedAt: new Date(),
            };
        }),
});