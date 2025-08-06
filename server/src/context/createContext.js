import { constants as http2Constants } from 'http2';
import { parse } from 'cookie';
import { getUserByToken } from '../utils/auth';
export function createContext({ req, res }) {
    // Check authentication from cookies
    const cookieHeader = req.headers[http2Constants.HTTP2_HEADER_COOKIE] || '';
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
