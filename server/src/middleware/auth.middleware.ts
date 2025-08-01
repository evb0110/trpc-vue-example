import { TRPCError } from '@trpc/server';
import { middleware, publicProcedure } from '../context/trpc';

// Middleware to check if user is authenticated
export const isAuthed = middleware(({ ctx, next }) => {
    if (!ctx.user) {
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Not authenticated',
        });
    }
    
    return next({
        ctx: {
            user: ctx.user, // user is now guaranteed to exist
        },
    });
});

// Middleware to check for admin role
export const isAdmin = middleware(({ ctx, next }) => {
    if (!ctx.user || ctx.user.role !== 'admin') {
        throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'Admin access required',
        });
    }
    
    return next({
        ctx: {
            user: ctx.user, // user is guaranteed to be admin
        },
    });
});

// Middleware to check specific permissions
export const hasPermission = (permission: string) =>
    middleware(({ ctx, next }) => {
        if (!ctx.user || !ctx.user.permissions.includes(permission)) {
            throw new TRPCError({
                code: 'FORBIDDEN',
                message: `Missing required permission: ${permission}`,
            });
        }
        return next();
    });

// Procedure creators
export const protectedProcedure = publicProcedure.use(isAuthed);
export const adminProcedure = publicProcedure.use(isAdmin);
export const permissionProcedure = (permission: string) =>
    publicProcedure.use(hasPermission(permission));