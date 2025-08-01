import type { TRateLimitEntry } from '../types';

export class RateLimiter {
    private rateLimitMap = new Map<string, TRateLimitEntry>();
    private readonly maxRequests: number;
    private readonly windowMs: number;

    constructor(maxRequests = 10, windowMs = 60000) {
        this.maxRequests = maxRequests;
        this.windowMs = windowMs;
    }

    check(clientIp: string): TRateLimitEntry {
        const now = Date.now();
        const rateLimit = this.rateLimitMap.get(clientIp);

        if (rateLimit && now < rateLimit.resetTime) {
            rateLimit.count++;
        } else {
            this.rateLimitMap.set(clientIp, {
                count: 1,
                resetTime: now + this.windowMs,
            });
        }

        return this.rateLimitMap.get(clientIp)!;
    }

    isLimited(clientIp: string): boolean {
        const entry = this.rateLimitMap.get(clientIp);
        return entry ? entry.count > this.maxRequests : false;
    }

    getRemainingRequests(clientIp: string): number {
        const entry = this.rateLimitMap.get(clientIp);
        if (!entry) {
            return this.maxRequests;
        }
        return Math.max(0, this.maxRequests - entry.count);
    }

    getActiveConnectionsCount(): number {
        return this.rateLimitMap.size;
    }
}

// Global rate limiter instance
export const globalRateLimiter = new RateLimiter();