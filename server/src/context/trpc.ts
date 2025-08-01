import { initTRPC } from '@trpc/server';
import type { TContext } from '../types';

export const t = initTRPC.context<TContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const middleware = t.middleware;