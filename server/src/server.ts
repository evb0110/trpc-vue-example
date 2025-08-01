import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { appRouter } from './app';
import { createContext } from './context/createContext';
import { config } from './config';

export const server = createHTTPServer({
    router: appRouter,
    createContext,
    middleware: (req, res, next) => {
        // CORS headers
        res.setHeader('Access-Control-Allow-Origin', config.server.corsOrigin);
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        
        // Handle preflight requests
        if (req.method === 'OPTIONS') {
            res.writeHead(200);
            res.end();
            return;
        }
        
        next();
    },
});

export function startServer() {
    const port = config.server.port;
    server.listen(port);
    console.log(`Server listening on http://localhost:${port}`);
}