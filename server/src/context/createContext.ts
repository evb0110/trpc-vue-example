import type { CreateHTTPContextOptions } from '@trpc/server/adapters/standalone';
import type { TContext } from '../types';
import { parseCookies } from '../utils/cookies';
import { getUserByToken } from '../utils/auth';
import { globalRateLimiter } from '../utils/rateLimit';

export function createContext({ req, res }: CreateHTTPContextOptions): TContext {
    // Get client IP for rate limiting
    const clientIp = req.socket.remoteAddress || 'unknown';
    
    // Check rate limit
    const rateLimitEntry = globalRateLimiter.check(clientIp);
    
    // Get request metadata
    const requestInfo = {
        ip: clientIp,
        userAgent: req.headers['user-agent'] || 'unknown',
        timestamp: new Date(),
        requestsInWindow: rateLimitEntry.count,
    };
    
    // Check authentication from cookies
    const cookies = parseCookies(req.headers.cookie);
    const authToken = cookies['auth-token'];
    
    let user = undefined;
    if (authToken) {
        user = getUserByToken(authToken);
    }
    
    return {
        user,
        requestInfo,
        req,
        res,
    };
}