import { constants as http2Constants } from 'http2';
import { parse } from 'cookie';
import type { User } from '../schemas/user.schema';
import type { CreateHTTPContextOptions } from '@trpc/server/adapters/standalone';
import { getUserByToken } from '../utils/auth';

export type TContext = {
    user?: User;
    req: CreateHTTPContextOptions['req'];
    res: CreateHTTPContextOptions['res'];
};

export function createContext({ req, res }: CreateHTTPContextOptions): TContext {
    // Check authentication from cookies
    const cookieHeader = req.headers[http2Constants.HTTP2_HEADER_COOKIE] as string || '';
    const cookies = parse(cookieHeader);
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