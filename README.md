# tRPC + Vue 3 Example with Authentication

A complete example of using tRPC with Vue 3, TypeScript, and cookie-based authentication with role-based access control.

## Features

- 🔒 **Secure Cookie-Based Authentication**
  - HttpOnly cookies prevent XSS attacks
  - SameSite protection against CSRF
  - Automatic cookie handling

- 👥 **Role-Based Access Control**
  - User and Admin roles
  - Permission-based endpoints
  - Middleware for authentication and authorization

- 🚦 **Rate Limiting**
  - In-memory rate limiter
  - Configurable request limits
  - Per-IP tracking

- 📁 **Clean Architecture**
  - Modular server structure
  - Separated routers, middleware, and utilities
  - Component-based Vue frontend

## Project Structure

```
tRPC/
├── server/
│   ├── src/
│   │   ├── routers/        # API route definitions
│   │   │   ├── auth.router.ts
│   │   │   ├── public.router.ts
│   │   │   ├── user.router.ts
│   │   │   └── admin.router.ts
│   │   ├── middleware/     # Auth and rate limit middleware
│   │   ├── context/        # tRPC context creation
│   │   ├── types/          # TypeScript type definitions
│   │   ├── utils/          # Utilities (cookies, auth, rate limit)
│   │   ├── config/         # Configuration
│   │   ├── app.ts          # Main router composition
│   │   └── server.ts       # HTTP server setup
│   └── index.ts            # Entry point
├── client/
│   └── src/
│       ├── components/     # Vue components
│       │   ├── AuthSection.vue
│       │   ├── PublicRoutes.vue
│       │   ├── ProtectedRoutes.vue
│       │   └── AdminPanel.vue
│       ├── composables/    # Vue composables
│       │   └── useAuth.ts
│       ├── api/            # tRPC client setup
│       ├── App.vue         # Main app component
│       └── main.ts         # Vue app entry
└── package.json
```

## Setup

```bash
npm install
```

## Development

Run the server and client concurrently:

```bash
npm run dev
```

Or run them separately:

```bash
# Server (port 3000)
npm run dev:server

# Client (port 5173)
npm run dev:client
```

## Authentication Flow

1. **Login**: Sends credentials to `/loginAsUser` or `/loginAsAdmin`
2. **Cookie Set**: Server sets httpOnly cookie with auth token
3. **Requests**: All subsequent requests automatically include the cookie
4. **Verification**: Server validates the cookie on each request
5. **Logout**: Clears the authentication cookie

## Mock Users

- **Regular User**
  - Username: `user`
  - Password: `password`
  - Permissions: `read:profile`, `update:profile`

- **Admin User**
  - Username: `admin`
  - Password: `password`
  - Permissions: All user permissions plus `delete:users`, `read:analytics`, `manage:system`

## API Endpoints

### Public Routes
- `hello` - Simple greeting endpoint
- `createUser` - Create a new user
- `getRequestInfo` - Get request metadata

### Protected Routes (Requires Authentication)
- `getProfile` - Get user profile
- `updateProfile` - Update user profile
- `whoami` - Get current user info and permissions

### Admin Routes (Requires Admin Role)
- `getAllUsers` - List all users
- `getSystemStats` - Get system statistics
- `deleteUser` - Delete a user (requires permission)
- `getAnalytics` - View analytics (requires permission)

## Security Considerations

For production deployment:
- Use HTTPS
- Set proper cookie domain and secure flags
- Implement real JWT authentication
- Use a proper database for user storage
- Add CSRF tokens for additional security
- Implement proper rate limiting with Redis
- Add request validation and sanitization