import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

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
    
    getServerTime: publicProcedure
        .query(() => {
            return {
                timestamp: new Date(),
            };
        }),
    
    generateReport: publicProcedure
        .input(generateReportSchema)
        .mutation(({ input }) => {
            return {
                type: input.type,
                report: `${input.type} report generated successfully`,
                generatedAt: new Date(),
            };
        }),
    
    requestInfo: publicProcedure
        .query(({ ctx }) => {
            const req = ctx.req as any;
            return {
                headers: ctx.req.headers,
                ip: req.ip || req.connection?.remoteAddress || 'unknown',
                userAgent: ctx.req.headers['user-agent'],
                timestamp: new Date(),
            };
        }),
});