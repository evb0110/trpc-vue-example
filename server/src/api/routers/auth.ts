import { constants as http2Constants } from 'http2';
import { serialize } from 'cookie';
import { TRPCError } from '@trpc/server';
import type { ServerResponse } from 'http';
import { publicProcedure, router } from '../trpc';
import { protectedProcedure } from '../../middleware/auth';
import { loginSchema } from '../../schemas/auth.schema';
import { validateCredentials } from '../../utils/auth';
import { clearAuthCookie, createAuthCookie } from '../../utils/cookies';

export const authRouter = router({
    login: publicProcedure
        .input(loginSchema)
        .mutation(({ ctx, input }) => {
            const credentials = validateCredentials(input.username, input.password);

            if (!credentials) {
                throw new TRPCError({
                    code: 'UNAUTHORIZED',
                    message: 'Invalid credentials',
                });
            }

            const res = ctx.res as ServerResponse;
            res.setHeader(http2Constants.HTTP2_HEADER_SET_COOKIE, createAuthCookie(credentials.token));

            return {
                success: true,
                user: {
                    id: credentials.user.id,
                    username: credentials.user.username,
                    email: credentials.user.email,
                    role: credentials.user.role,
                },
            };
        }),

    logout: publicProcedure
        .mutation(({ ctx }) => {
            const res = ctx.res as ServerResponse;
            res.setHeader(http2Constants.HTTP2_HEADER_SET_COOKIE, clearAuthCookie());

            return { success: true };
        }),

    me: protectedProcedure
        .query(({ ctx }) => {
            return {
                id: ctx.user.id,
                username: ctx.user.username,
                email: ctx.user.email,
                role: ctx.user.role,
                permissions: ctx.user.permissions,
            };
        }),
});