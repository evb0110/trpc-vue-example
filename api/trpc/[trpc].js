import { createHTTPHandler } from '@trpc/server/adapters/standalone';
import { createContext } from '../../server/src/context/createContext';
import { appRouter } from '../../server/src/api/root';
// Create the tRPC HTTP handler
const handler = createHTTPHandler({
    router: appRouter,
    createContext,
    batching: {
        enabled: true,
    },
    onError({ error, path }) {
        if (error.code === 'INTERNAL_SERVER_ERROR') {
            console.error(`tRPC error on ${path}:`, error);
        }
    },
});
export default async function (req, res) {
    // Set CORS headers only for local development
    if (process.env.NODE_ENV !== 'production') {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
        res.setHeader('Access-Control-Allow-Headers', 'content-type');
        if (req.method === 'OPTIONS') {
            return res.status(200).end();
        }
    }
    // Let tRPC handle the request
    return handler(req, res);
}
