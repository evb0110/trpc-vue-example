import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { TAppRouter } from '../../server';

let authToken: string | null = null;

export const trpc = createTRPCProxyClient<TAppRouter>({
    links: [
        httpBatchLink({
            url: 'http://localhost:3000',
            headers: () => {
                return authToken 
                    ? { Authorization: `Bearer ${authToken}` }
                    : {};
            },
        }),
    ],
});

export const setAuthToken = (token: string) => {
    authToken = token;
};

export const clearAuthToken = () => {
    authToken = null;
};