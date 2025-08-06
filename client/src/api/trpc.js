import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import superjson from 'superjson';
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
export const trpc = createTRPCProxyClient({
    links: [
        httpBatchLink({
            url: getApiUrl(),
            transformer: superjson,
            fetch: (url, options = {}) => {
                return fetch(url, {
                    ...options,
                    credentials: 'include',
                });
            },
        }),
    ],
});
