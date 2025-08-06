import { TRPCError } from '@trpc/server';
import { middleware, publicProcedure } from '../api/trpc';
export const enforceUserIsAuthed = middleware(({ ctx, next }) => {
    if (!ctx.user) {
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'You must be logged in to access this resource',
        });
    }
    return next({
        ctx: {
            user: ctx.user,
        },
    });
});
export const enforceUserIsAdmin = middleware(({ ctx, next }) => {
    if (!ctx.user) {
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'You must be logged in to access this resource',
        });
    }
    if (ctx.user.role !== 'admin') {
        throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'Admin access required',
        });
    }
    return next({
        ctx: {
            user: ctx.user,
        },
    });
});
export const enforceUserHasPermission = (permission) => middleware(({ ctx, next }) => {
    if (!ctx.user) {
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'You must be logged in to access this resource',
        });
    }
    if (!ctx.user.permissions.includes(permission)) {
        throw new TRPCError({
            code: 'FORBIDDEN',
            message: `Missing required permission: ${permission}`,
        });
    }
    return next({
        ctx: {
            user: ctx.user,
        },
    });
});
// Procedure helpers
export const protectedProcedure = publicProcedure.use(enforceUserIsAuthed);
export const adminProcedure = publicProcedure.use(enforceUserIsAdmin);
export const permissionProcedure = (permission) => publicProcedure.use(enforceUserHasPermission(permission));
