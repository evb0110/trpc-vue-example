import { TRPCError } from '@trpc/server';
import { middleware, publicProcedure } from '../context/trpc';
import { globalRateLimiter } from '../utils/rateLimit';

// Middleware for rate limiting
export const rateLimited = middleware(({ ctx, next }) => {
    if (globalRateLimiter.isLimited(ctx.requestInfo.ip)) {
        throw new TRPCError({
            code: 'TOO_MANY_REQUESTS',
            message: 'Rate limit exceeded. Please try again later.',
        });
    }
    return next();
});

// Rate limited procedure
export const rateLimitedProcedure = publicProcedure.use(rateLimited);

// Import auth middleware
import { isAuthed } from './auth.middleware';

// Strict procedure that requires both auth AND rate limiting
export const strictProcedure = publicProcedure
    .use(rateLimited)
    .use(isAuthed);