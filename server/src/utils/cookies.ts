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
    const parts = [`auth-token=${token}`];
    
    if (COOKIE_CONFIG.httpOnly) {
        parts.push('HttpOnly');
    }
    
    parts.push(`Path=${COOKIE_CONFIG.path}`);
    parts.push(`Max-Age=${COOKIE_CONFIG.maxAge}`);
    parts.push(`SameSite=${COOKIE_CONFIG.sameSite}`);
    
    // Add secure flag if configured (for production)
    // if (COOKIE_CONFIG.secure) {
    //     parts.push('Secure');
    // }
    
    return parts.join('; ');
}

export function clearAuthCookie(): string {
    const parts = [
        'auth-token=',
        COOKIE_CONFIG.httpOnly && 'HttpOnly',
        `Path=${COOKIE_CONFIG.path}`,
        'Max-Age=0',
        `SameSite=${COOKIE_CONFIG.sameSite}`,
    ].filter(Boolean);
    
    return parts.join('; ');
}