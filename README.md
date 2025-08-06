# tRPC + Vue 3 Example

A modern full-stack application demonstrating tRPC with Vue 3, TypeScript, and cookie-based authentication.

## 🚀 Quick Start

### Development
```bash
npm install
npm run dev
```
- Frontend: http://localhost:5173
- API: http://localhost:3000

### Production Deployment

**Option 1: Automated Script (PM2 + nginx)**
```bash
# On VPS
git clone https://github.com/evb0110/trpc-vue-example.git
cd trpc-vue-example
./scripts/deploy-production.sh
```

**Option 2: Docker (Coming Soon)**
```bash
# On VPS  
git clone https://github.com/evb0110/trpc-vue-example.git
cd trpc-vue-example
docker-compose up -d
```

## 📁 Project Structure

```
trpc-vue-example/
├── client/                 # Vue 3 frontend
│   ├── src/
│   │   ├── components/     # Vue components
│   │   ├── composables/    # Vue composables
│   │   └── api/           # tRPC client setup
├── server/                 # tRPC backend
│   ├── src/
│   │   ├── api/           # API route definitions
│   │   ├── middleware/    # Auth and rate limit middleware
│   │   ├── context/       # tRPC context creation
│   │   └── utils/         # Utilities
├── scripts/                # Deployment scripts
├── docs/                   # Documentation
├── config/                 # Configuration files
└── dist/                   # Built files (generated)
```

## 🛠️ Architecture

- **Frontend**: Vue 3 + TypeScript + Vite
- **Backend**: tRPC + Node.js + TypeScript  
- **Auth**: Cookie-based with role permissions
- **Build**: TypeScript → JavaScript (both client & server)
- **Deploy**: PM2 + nginx or Docker

## 🌟 Features

- 🔒 **Secure Cookie-Based Authentication**
  - HttpOnly cookies prevent XSS attacks
  - SameSite protection against CSRF
  - Automatic cookie handling

- 👥 **Role-Based Access Control**
  - User and Admin roles
  - Permission-based endpoints
  - Middleware for authentication and authorization

- 📁 **Clean Architecture**
  - Modular server structure
  - Component-based Vue frontend
  - End-to-end TypeScript

## 📚 Documentation

- [`docs/deploy-local-prod.md`](docs/deploy-local-prod.md) - Test production setup locally
- [`docs/DEPLOY-PRODUCTION.md`](docs/DEPLOY-PRODUCTION.md) - Automated VPS deployment
- [`docs/deploy-vps.md`](docs/deploy-vps.md) - Manual VPS deployment guide
- [`docs/SETUP-SSH-DEPLOY.md`](docs/SETUP-SSH-DEPLOY.md) - SSH key setup for deployment

## 🔧 Available Scripts

### Development
- `npm run dev` - Start both server and client
- `npm run dev:server` - Start server only (port 3000)
- `npm run dev:client` - Start client only (port 5173)

### Build
- `npm run build` - Build both client and server for production
- `npm run build:client` - Build Vue app only
- `npm run build:server` - Build Node server only

### Linting
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically

### Deployment
- `./scripts/deploy-production.sh` - Deploy to production VPS
- `./scripts/cleanup-non-docker.sh` - Clean up for Docker migration

## 🎯 Mock Users

- **Regular User**
  - Username: `user` / Password: `password`
  - Permissions: `read:profile`, `update:profile`

- **Admin User**
  - Username: `admin` / Password: `password`
  - All permissions including `delete:users`, `manage:system`

## 🌐 API Endpoints

### Public Routes
- `hello` - Simple greeting endpoint
- `getServerTime` - Get server timestamp
- `generateReport` - Generate sample reports
- `requestInfo` - Get request metadata

### Protected Routes (Authentication Required)
- `getProfile` - Get user profile
- `updateProfile` - Update user profile
- `whoami` - Get current user info and permissions

### Admin Routes (Admin Role Required)
- `getAllUsers` - List all users
- `getSystemStats` - Get system statistics
- `deleteUser` - Delete a user
- `getAnalytics` - View system analytics

## ⚙️ Configuration

Copy the appropriate environment file:

**Development**: Already configured in `package.json`

**Production**: 
```bash
cp config/.env.production .env
# Update FRONTEND_URL with your domain
```

**Local Production Testing**:
```bash
cp config/.env.local-prod .env
```

## 🔒 Security Considerations

This is a demo application. For production:
- Use HTTPS with valid SSL certificates
- Implement real JWT authentication
- Use proper database for user storage
- Add CSRF tokens for additional security
- Implement rate limiting with Redis
- Add comprehensive input validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Commit: `git commit -m 'Add amazing feature'`
5. Push: `git push origin feature/amazing-feature`
6. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details