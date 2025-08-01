export function parseCookies(cookieHeader?: string): Record<string, string> {
    if (!cookieHeader) {
        return {};
    }
    
    return cookieHeader
        .split(';')
        .map((v) => v.split('='))
        .reduce((acc: Record<string, string>, v) => {
            acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
            return acc;
        }, {});
}

export const COOKIE_CONFIG = {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: 'strict' as const,
    // For production with HTTPS:
    // secure: true,
    // domain: '.foo.bar',
};

export function createAuthCookie(token: string): string {
    const parts = [
        `auth-token=${token}`,
        'HttpOnly',
        `Path=${COOKIE_CONFIG.path}`,
        `Max-Age=${COOKIE_CONFIG.maxAge}`,
        `SameSite=${COOKIE_CONFIG.sameSite}`,
    ];
    
    return parts.join('; ');
}

export function clearAuthCookie(): string {
    return 'auth-token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict';
}