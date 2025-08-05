import { serialize } from 'cookie';

export const COOKIE_CONFIG = {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: 'strict' as const,
    // For production with HTTPS:
    // secure: true,
    // domain: '.foo.bar',
};

export function createAuthCookie(token: string) {
    return serialize(
        'auth-token',
        token,
        COOKIE_CONFIG,
    );
}

export function clearAuthCookie(): string {
    return serialize('auth-token', '', {
        ...COOKIE_CONFIG,
        maxAge: 0,
    });
}