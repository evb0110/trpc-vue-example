import { createHTTPServer } from '@trpc/server/adapters/standalone';
import cors from 'cors';
import { appRouter } from './api/root';
import { createContext } from './context/createContext';
import { config } from './config';
export const server = createHTTPServer({
    router: appRouter,
    createContext,
    middleware: cors({
        origin: config.server.corsOrigin,
        credentials: true,
    }),
});
export function startServer() {
    const port = config.server.port;
    server.listen(port);
    console.log(`Server listening on http://localhost:${port}`);
}
