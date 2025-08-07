# Docker Deployment Guide

Deploy the tRPC Vue application using Docker containers.

## 🐳 Prerequisites

```bash
# Install Docker
curl -fsSL https://get.docker.com | sh

# Install Docker Compose (if not included)
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

## 🚀 Quick Start

### Local Testing
```bash
# Clone and deploy
git clone https://github.com/evb0110/trpc-vue-example.git
cd trpc-vue-example
./scripts/docker-deploy.sh local
```

### Production Deployment
```bash
# On VPS
git clone https://github.com/evb0110/trpc-vue-example.git
cd trpc-vue-example
./scripts/docker-deploy.sh prod
```

## 🏗️ Architecture

### Container Structure
```
┌─────────────────┐    ┌─────────────────┐
│     nginx       │    │      api        │
│   (Port 80)     │◄───┤   (Port 3000)   │
│                 │    │                 │
│ • Static files  │    │ • tRPC server   │
│ • Reverse proxy │    │ • Built from    │
│ • Load balancer │    │   TypeScript    │
└─────────────────┘    └─────────────────┘
```

### File Flow
1. **Build Stage**: TypeScript → JavaScript (both client & server)
2. **API Container**: Runs the tRPC server
3. **Nginx Container**: Serves static files + proxies API calls
4. **Shared Volume**: Client files copied from build to nginx

## 📁 Docker Files

### Dockerfile (Multi-stage)
- **Builder stage**: Installs deps, builds TypeScript
- **Production stage**: Only runtime deps, security hardened
- **Health checks**: Ensures container is responding

### docker-compose.yml
- **Local development**: Uses localhost
- **Service orchestration**: API + nginx + init container
- **Health checks**: Waits for services to be ready

### docker-compose.prod.yml
- **Production overrides**: Real domain, logging, SSL ready
- **Restart policies**: Always restart on failure
- **Resource limits**: Can be added for production

## 🔧 Commands

### Development
```bash
# Start everything
docker compose up -d

# View logs
docker compose logs -f

# Restart just the API
docker compose restart api

# Rebuild and restart
docker compose up -d --build
```

### Production
```bash
# Deploy with production config
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Check status
docker compose ps

# View production logs
docker compose logs api --tail=50
```

### Management
```bash
# Stop all containers
docker compose down

# Stop and remove volumes
docker compose down -v

# Clean up old images
docker image prune -f

# View container resource usage
docker stats
```

## 🌐 Access

- **Application**: http://localhost
- **API Health**: http://localhost/api (should return API responses)
- **Nginx Health**: http://localhost/nginx-health

## 🔒 Production Configuration

### Environment Variables
Edit `docker-compose.prod.yml`:
```yaml
environment:
  - FRONTEND_URL=http://your-domain.com  # Your actual domain
```

### SSL/HTTPS Setup
Uncomment SSL section in `docker-compose.prod.yml`:
```yaml
ports:
  - "80:80"
  - "443:443"
volumes:
  - ./ssl:/etc/nginx/ssl:ro
```

### Domain Configuration
Update nginx config or use environment variables for your domain.

## 🐛 Troubleshooting

### Container won't start
```bash
# Check logs
docker compose logs api
docker compose logs nginx

# Check if ports are in use
sudo lsof -i :80
sudo lsof -i :3000
```

### Build failures
```bash
# Clean build
docker compose down
docker system prune -f
docker compose up --build
```

### API not accessible
```bash
# Test API container directly
docker compose exec api curl http://localhost:3000

# Check networking
docker network ls
docker compose exec nginx ping api
```

### Static files not loading
```bash
# Check if files were copied
docker compose exec nginx ls -la /usr/share/nginx/html

# Restart init container
docker compose up client-files-init --force-recreate
```

## 📊 Monitoring

### Health Checks
```bash
# Check container health
docker compose ps

# Manual health check
curl http://localhost/nginx-health
```

### Logs
```bash
# All services
docker compose logs -f

# Specific service with timestamps
docker compose logs -f -t api

# Last N lines
docker compose logs --tail=100 nginx
```

## 🔄 Updates

### Code Updates
```bash
git pull
./scripts/docker-deploy.sh prod
```

### Manual Update Process
```bash
git pull
docker compose build
docker compose up -d
docker image prune -f
```

## 🆚 Docker vs Traditional

| Aspect | Docker | PM2 + nginx |
|--------|---------|-------------|
| **Setup** | `docker compose up` | Install Node, nginx, PM2 |
| **Updates** | `git pull && compose up` | Build, restart PM2 |
| **Isolation** | Full container isolation | Shared system resources |
| **Rollback** | `docker tag` versions | Manual file management |
| **Scaling** | `docker compose scale` | Manual PM2 clusters |
| **Monitoring** | Docker stats + health | PM2 + system tools |

## 💡 Tips

1. **Development**: Use `docker compose up` (without `-d`) to see logs in real-time
2. **Debugging**: Use `docker compose exec api sh` to get shell access
3. **Performance**: Add resource limits in production
4. **Security**: Containers run as non-root user
5. **Caching**: Docker layers cache npm installs for faster rebuilds