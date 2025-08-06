import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import superjson from 'superjson';
import type { AppRouter } from '../../../server';

// Determine API URL based on environment
const getApiUrl = () => {
    if (import.meta.env.PROD) {
        // In production, use relative path (same domain)
        // nginx proxies /api/* to server root, so no /trpc needed
        return '/api';
    }
    // In development, use local server
    return 'http://localhost:3000';
};

export const trpc = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: getApiUrl(),
            transformer: superjson,
            fetch: (url, options = {}) => {
                return fetch(url, {
                    ...options,
                    credentials: 'include',
                } as RequestInit);
            },
        }),
    ],
});