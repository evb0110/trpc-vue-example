import { TRPCError } from '@trpc/server';
import { middleware, publicProcedure } from '../api/trpc';
import { globalRateLimiter } from '../utils/rateLimit';
import { enforceUserIsAuthed } from './auth';

export const enforceRateLimit = middleware(({ ctx, next }) => {
    const identifier = ctx.requestInfo.ip;
    
    if (globalRateLimiter.isLimited(identifier)) {
        const remaining = globalRateLimiter.getRemainingRequests(identifier);
        
        throw new TRPCError({
            code: 'TOO_MANY_REQUESTS',
            message: `Rate limit exceeded. You have ${remaining} requests remaining. Please try again later.`,
        });
    }
    
    return next();
});

// Procedure helpers
export const rateLimitedProcedure = publicProcedure.use(enforceRateLimit);

// Strict procedure that requires both auth AND rate limiting
export const strictProcedure = publicProcedure
    .use(enforceRateLimit)
    .use(enforceUserIsAuthed);