export const config = {
    server: {
        port: process.env.PORT || 3000,
        corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    },
    auth: {
        cookieName: 'auth-token',
        cookieMaxAge: 60 * 60 * 24 * 7, // 7 days
    },
} as const;