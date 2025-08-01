import type { IncomingMessage, ServerResponse } from 'http';

export type TUser = {
    id: string;
    name: string;
    role: 'user' | 'admin';
    permissions: string[];
};

export type TRequestInfo = {
    ip: string;
    userAgent: string;
    timestamp: Date;
    requestsInWindow: number;
};

export type TContext = {
    user?: TUser;
    requestInfo: TRequestInfo;
    req: IncomingMessage;
    res: ServerResponse;
};

export type TRateLimitEntry = {
    count: number;
    resetTime: number;
};