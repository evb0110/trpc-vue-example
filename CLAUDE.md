# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Run both server and client concurrently
- `npm run dev:server` - Run server only (port 3000)
- `npm run dev:client` - Run client only (port 5173)

### Build & Lint
- `npm run build` - Production build with type checking
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically

## High-Level Architecture

This is a tRPC + Vue 3 example application demonstrating cookie-based authentication with role-based access control.

### Server Architecture (tRPC)
The server uses a **modular router composition** pattern:
- **Entry**: `server/index.ts` exports types, `server/src/server.ts` creates HTTP server
- **Main Router**: `server/src/app.ts` merges all sub-routers in a flat structure
- **Context**: Created in `server/src/context/createContext.ts`, handles auth cookie parsing and rate limiting
- **Middleware**: Composable middleware in `server/src/middleware/` for auth and rate limiting
  - `protectedProcedure` - Requires authentication
  - `adminProcedure` - Requires admin role
  - `permissionProcedure(permission)` - Requires specific permission
  - `rateLimitedProcedure` - Applies rate limiting
  - `strictProcedure` - Combines auth + rate limiting

### Client Architecture (Vue 3)
- **tRPC Client**: `client/src/api/trpc.ts` creates type-safe proxy client with credentials
- **Auth State**: `client/src/composables/useAuth.ts` manages reactive authentication state
- **Components**: Modular components in `client/src/components/` for different feature areas

### Authentication System
- **Cookie-Based**: HttpOnly, SameSite=Strict cookies with 7-day expiration
- **Mock Users**: 
  - Regular user: `user-token` (permissions: read:profile, update:profile)
  - Admin: `admin-token` (all permissions)
- **No Real Database**: Uses in-memory mock storage in `server/src/utils/auth.ts`

### Key Design Patterns
1. **Procedure Composition**: Middleware creates specialized procedures for different access levels
2. **Type Safety**: End-to-end type inference from server routers to client
3. **Flat Router Structure**: All routers merged at root level in `app.ts`
4. **Permission-Based Access**: Granular permissions checked via middleware

### Important Notes
- This is a demo app with mock authentication - see README.md for production considerations
- Rate limiting is in-memory only
- No testing framework is configured
- When modifying routers, ensure they're properly exported and merged in `app.ts`