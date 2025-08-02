import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { TAppRouter } from '../../../server/index';

export const trpc = createTRPCProxyClient<TAppRouter>({
    links: [
        httpBatchLink({
            url: 'http://localhost:3000',
            // Send cookies with requests
            fetch: (url, options) => {
                return fetch(url, {
                    ...options,
                    credentials: 'include', // This ensures cookies are sent
                });
            },
        }),
    ],
});