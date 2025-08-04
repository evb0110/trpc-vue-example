import { constants as http2Constants } from 'http2';
import type { CreateHTTPContextOptions } from '@trpc/server/adapters/standalone';
import type { User } from '../schemas/user.schema';
import { parseCookies } from '../utils/cookies';
import { getUserByToken } from '../utils/auth';

export type TContext = {
    user?: User;
    req: CreateHTTPContextOptions['req'];
    res: CreateHTTPContextOptions['res'];
};

export function createContext({ req, res }: CreateHTTPContextOptions): TContext {
    // Check authentication from cookies
    const cookies = parseCookies(req.headers[http2Constants.HTTP2_HEADER_COOKIE] as string);
    const authToken = cookies['auth-token'];
    
    let user = undefined;
    if (authToken) {
        user = getUserByToken(authToken);
    }
    
    return {
        user,
        req,
        res,
    };
}