import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { z, email } from 'zod';

type User = {
    id: string;
    name: string;
    role: 'user' | 'admin';
    permissions: string[];
};

type Context = {
    user?: User;
    requestInfo: {
        ip: string;
        userAgent: string;
        timestamp: Date;
        requestsInWindow: number;
    };
};

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

// Middleware to check if user is authenticated
const isAuthed = t.middleware(({ ctx, next }) => {
    if (!ctx.user) {
        throw new Error('UNAUTHORIZED');
    }
    return next({
        ctx: {
            user: ctx.user, // user is now guaranteed to exist
        },
    });
});

// Protected procedure that requires authentication
export const protectedProcedure = t.procedure.use(isAuthed);

// Middleware for rate limiting
const rateLimited = t.middleware(({ ctx, next }) => {
    if (ctx.requestInfo.requestsInWindow > 10) {
        throw new Error('RATE_LIMIT_EXCEEDED: Too many requests');
    }
    return next();
});

// Rate limited procedure (doesn't require auth)
export const rateLimitedProcedure = t.procedure.use(rateLimited);

// Strict procedure that requires both auth AND rate limiting
export const strictProcedure = t.procedure
    .use(rateLimited)
    .use(isAuthed);

// Middleware to check for admin role
const isAdmin = t.middleware(({ ctx, next }) => {
    if (!ctx.user || ctx.user.role !== 'admin') {
        throw new Error('FORBIDDEN: Admin access required');
    }
    return next({
        ctx: {
            user: ctx.user, // user is guaranteed to be admin
        },
    });
});

// Middleware to check specific permissions
const hasPermission = (permission: string) => 
    t.middleware(({ ctx, next }) => {
        if (!ctx.user || !ctx.user.permissions.includes(permission)) {
            throw new Error(`FORBIDDEN: Missing permission: ${permission}`);
        }
        return next();
    });

// Admin-only procedure
export const adminProcedure = t.procedure.use(isAdmin);

// Permission-based procedure
export const permissionProcedure = (permission: string) => 
    t.procedure.use(hasPermission(permission));

const appRouter = router({
    hello: publicProcedure
        .input(z.object({ name: z.string() }))
        .query(({ input }) => {
            return {
                greeting: `Hello ${input.name}!`,
            };
        }),
  
    createUser: publicProcedure
        .input(z.object({
            name: z.string().min(1),
            email: email(),
        }))
        .mutation(({ input }) => {
            console.log('Creating user:', input);
            return {
                id: Date.now(),
                ...input,
                createdAt: new Date(),
            };
        }),
    
    // Protected route - requires authentication
    getProfile: protectedProcedure
        .query(({ ctx }) => {
            return {
                id: ctx.user.id,
                name: ctx.user.name,
                joinedAt: new Date('2024-01-01'),
            };
        }),
    
    updateProfile: protectedProcedure
        .input(z.object({
            name: z.string().min(1),
        }))
        .mutation(({ ctx, input }) => {
            console.log(`Updating profile for user ${ctx.user.id}`);
            return {
                id: ctx.user.id,
                name: input.name,
                updatedAt: new Date(),
            };
        }),
    
    // Public endpoint that shows request info (no auth needed)
    getRequestInfo: publicProcedure
        .query(({ ctx }) => {
            return {
                yourIp: ctx.requestInfo.ip,
                userAgent: ctx.requestInfo.userAgent,
                requestCount: ctx.requestInfo.requestsInWindow,
                timestamp: ctx.requestInfo.timestamp,
            };
        }),
    
    // Rate limited endpoint (no auth, but limited to 10 req/min)
    generateReport: rateLimitedProcedure
        .input(z.object({
            type: z.enum(['summary', 'detailed']),
        }))
        .mutation(({ ctx, input }) => {
            console.log(`Generating ${input.type} report for ${ctx.requestInfo.ip}`);
            return {
                report: `${input.type} report generated`,
                requestsRemaining: 10 - ctx.requestInfo.requestsInWindow,
                generatedAt: new Date(),
            };
        }),
    
    // Strict endpoint (needs BOTH auth AND respects rate limit)
    deleteAccount: strictProcedure
        .mutation(({ ctx }) => {
            console.log(`User ${ctx.user.id} requesting account deletion`);
            return {
                message: `Account ${ctx.user.id} scheduled for deletion`,
                requestedBy: ctx.user.name,
                requestedFrom: ctx.requestInfo.ip,
            };
        }),
    
    // Admin-only endpoints
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
    
    getSystemStats: adminProcedure
        .query(({ ctx }) => {
            return {
                totalUsers: 3,
                activeRequests: rateLimitMap.size,
                serverUptime: process.uptime(),
                adminUser: ctx.user.name,
            };
        }),
    
    // Permission-based endpoints
    deleteUser: permissionProcedure('delete:users')
        .input(z.object({ userId: z.string() }))
        .mutation(({ ctx, input }) => {
            console.log(`${ctx.user?.name} deleting user ${input.userId}`);
            return {
                deleted: input.userId,
                deletedBy: ctx.user?.name,
            };
        }),
    
    getAnalytics: permissionProcedure('read:analytics')
        .query(({ ctx }) => {
            return {
                dailyActiveUsers: 42,
                revenue: '$1,234',
                accessedBy: ctx.user?.name,
                userRole: ctx.user?.role,
            };
        }),
    
    // Show current user's role and permissions
    whoami: protectedProcedure
        .query(({ ctx }) => {
            return {
                id: ctx.user.id,
                name: ctx.user.name,
                role: ctx.user.role,
                permissions: ctx.user.permissions,
            };
        }),
});

export type TAppRouter = typeof appRouter;

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const server = createHTTPServer({
    router: appRouter,
    createContext: ({ req }) => {
        // Get client IP for rate limiting
        const clientIp = req.socket.remoteAddress || 'unknown';
        
        // Check rate limit (10 requests per minute)
        const now = Date.now();
        const rateLimit = rateLimitMap.get(clientIp);
        
        if (rateLimit && now < rateLimit.resetTime) {
            rateLimit.count++;
        } else {
            rateLimitMap.set(clientIp, {
                count: 1,
                resetTime: now + 60000, // Reset after 1 minute
            });
        }
        
        // Get request metadata
        const requestInfo = {
            ip: clientIp,
            userAgent: req.headers['user-agent'] || 'unknown',
            timestamp: new Date(),
            requestsInWindow: rateLimitMap.get(clientIp)?.count || 1,
        };
        
        // Check authentication
        const authHeader = req.headers.authorization;
        let user: User | undefined = undefined;
        
        if (authHeader?.startsWith('Bearer ')) {
            const token = authHeader.substring(7);
            
            // Mock token-based authentication with different roles
            if (token === 'user-token') {
                user = {
                    id: '123',
                    name: 'John User',
                    role: 'user',
                    permissions: ['read:profile', 'update:profile'],
                };
            } else if (token === 'admin-token') {
                user = {
                    id: '456',
                    name: 'Jane Admin',
                    role: 'admin',
                    permissions: ['read:profile', 'update:profile', 'delete:users', 'read:analytics', 'manage:system'],
                };
            }
            // Invalid token = no user
        }
        
        // Return context with multiple concerns
        return {
            user,
            requestInfo,
            // Could add more: database, config, logger, etc.
        };
    },
    middleware: (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        
        if (req.method === 'OPTIONS') {
            res.writeHead(200);
            res.end();
            return;
        }
        
        next();
    },
});

server.listen(3000);
console.log('Server listening on http://localhost:3000');