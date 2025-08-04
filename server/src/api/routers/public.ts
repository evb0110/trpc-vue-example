import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { rateLimitedProcedure } from '../../middleware/rateLimit';
import { globalRateLimiter } from '../../utils/rateLimit';

const helloInputSchema = z.object({
    name: z.string().min(1).max(100),
});

const generateReportSchema = z.object({
    type: z.enum(['summary', 'detailed']),
});

export const publicRouter = router({
    hello: publicProcedure
        .input(helloInputSchema)
        .query(({ input }) => {
            return {
                greeting: `Hello ${input.name}!`,
                timestamp: new Date(),
            };
        }),
    
    requestInfo: publicProcedure
        .query(({ ctx }) => {
            return {
                ip: ctx.requestInfo.ip,
                userAgent: ctx.requestInfo.userAgent,
                requestCount: ctx.requestInfo.requestsInWindow,
                timestamp: ctx.requestInfo.timestamp,
            };
        }),
    
    generateReport: rateLimitedProcedure
        .input(generateReportSchema)
        .mutation(({ ctx, input }) => {
            const remaining = globalRateLimiter.getRemainingRequests(ctx.requestInfo.ip);
            
            return {
                type: input.type,
                report: `${input.type} report generated successfully`,
                requestsRemaining: remaining,
                generatedAt: new Date(),
                generatedBy: ctx.requestInfo.ip,
            };
        }),
});