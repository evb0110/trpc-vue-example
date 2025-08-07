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

**Option 1: Docker (Recommended)** 🐳
```bash
# On VPS with Docker installed
git clone https://github.com/evb0110/trpc-vue-example.git
cd trpc-vue-example
./scripts/docker-deploy.sh prod
```

**Option 2: Traditional (PM2 + nginx)**
```bash
# On VPS
git clone https://github.com/evb0110/trpc-vue-example.git
cd trpc-vue-example
./scripts/deploy-production.sh
```

## 📁 Project Structure

```
trpc-vue-example/
├── client/                 # Vue 3 frontend
├── server/                 # tRPC backend
├── scripts/                # Deployment scripts
├── docs/                   # Documentation
├── config/                 # Configuration files
├── docker/                 # Docker configurations
├── Dockerfile              # Container build instructions
├── docker-compose.yml      # Container orchestration
└── dist/                   # Built files (generated)
```

## 🛠️ Architecture

- **Frontend**: Vue 3 + TypeScript + Vite
- **Backend**: tRPC + Node.js + TypeScript  
- **Auth**: Cookie-based with role permissions
- **Build**: TypeScript → JavaScript (both client & server)
- **Deploy**: Docker containers OR PM2 + nginx

## 🐳 Docker Deployment

Docker provides the easiest and most reliable deployment method:

### Local Testing (with Docker)
```bash
# Install Docker first: https://docs.docker.com/get-docker/
git clone https://github.com/evb0110/trpc-vue-example.git
cd trpc-vue-example
./scripts/docker-deploy.sh local
```

### Production (VPS with Docker)
```bash
# On VPS
curl -fsSL https://get.docker.com | sh  # Install Docker
git clone https://github.com/evb0110/trpc-vue-example.git
cd trpc-vue-example
./scripts/docker-deploy.sh prod
```

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

- 🐳 **Container Ready**
  - Multi-stage Docker builds
  - nginx + Node.js containers
  - Health checks and auto-restart

## 📚 Documentation

### Deployment Guides
- [`docs/DOCKER-DEPLOYMENT.md`](docs/DOCKER-DEPLOYMENT.md) - **Docker deployment (recommended)**
- [`docs/DEPLOY-PRODUCTION.md`](docs/DEPLOY-PRODUCTION.md) - Automated traditional deployment
- [`docs/deploy-local-prod.md`](docs/deploy-local-prod.md) - Test production setup locally
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
- `./scripts/docker-deploy.sh [local|prod]` - **Deploy with Docker**
- `./scripts/deploy-production.sh` - Deploy with PM2 + nginx
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

### Docker (Recommended)
Configuration is automatic. For production, edit `docker-compose.prod.yml`:
```yaml
environment:
  - FRONTEND_URL=http://your-domain.com
```

### Traditional Deployment
Copy the appropriate environment file:
```bash
# Production
cp config/.env.production .env

# Local testing
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