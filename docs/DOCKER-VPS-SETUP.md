# Docker VPS Setup Guide

## Quick Installation

```bash
# One-line installation (inspect script first!)
curl -fsSL https://get.docker.com | sh

# Or use the provided script:
bash scripts/install-docker-vps.sh
```

## Manual Installation Steps

### 1. Connect to VPS
```bash
ssh root@your-vps-ip
# Or
ssh user@your-vps-ip
```

### 2. Update System
```bash
apt update && apt upgrade -y
```

### 3. Install Docker
```bash
# Remove old versions
apt-get remove docker docker-engine docker.io containerd runc

# Install prerequisites
apt-get update
apt-get install -y ca-certificates curl gnupg lsb-release

# Add Docker GPG key
mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Add Docker repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine
apt-get update
apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

### 4. Post-Installation

#### For Non-Root User
```bash
# Add user to docker group
usermod -aG docker $USER

# Log out and back in, then test
docker ps
```

#### For Root User (Create Deploy User)
```bash
# Create deployment user
adduser deploy
usermod -aG docker deploy
usermod -aG sudo deploy

# Switch to deploy user
su - deploy
```

## Security Best Practices

### 1. Firewall Setup
```bash
# Install UFW
apt install ufw -y

# Allow SSH (change port if custom)
ufw allow 22/tcp

# Allow HTTP/HTTPS
ufw allow 80/tcp
ufw allow 443/tcp

# Enable firewall
ufw --force enable
```

### 2. Docker Security Configuration
Create `/etc/docker/daemon.json`:
```json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  },
  "storage-driver": "overlay2",
  "live-restore": true,
  "userland-proxy": false,
  "default-ulimits": {
    "nofile": {
      "Name": "nofile",
      "Hard": 64000,
      "Soft": 64000
    }
  }
}
```

Reload Docker:
```bash
systemctl reload docker
```

### 3. Resource Limits
```bash
# Set memory limits in docker-compose.yml
services:
  app:
    mem_limit: 512m
    memswap_limit: 1g
    cpus: '0.5'
```

### 4. Use Non-Root Containers
```dockerfile
# In Dockerfile
USER node
# or
USER 1000:1000
```

### 5. Docker Secrets (for Swarm/Compose)
```yaml
# docker-compose.yml
secrets:
  db_password:
    file: ./secrets/db_password.txt

services:
  app:
    secrets:
      - db_password
```

## Monitoring & Maintenance

### Check Docker Status
```bash
# Service status
systemctl status docker

# Docker info
docker info

# Check logs
journalctl -u docker -f

# Resource usage
docker stats

# Disk usage
docker system df
```

### Cleanup Commands
```bash
# Remove stopped containers
docker container prune -f

# Remove unused images
docker image prune -a -f

# Remove unused volumes
docker volume prune -f

# Full cleanup
docker system prune -a --volumes -f
```

### Auto-cleanup (Cron)
```bash
# Add to crontab
crontab -e

# Add this line (daily at 2 AM)
0 2 * * * docker system prune -a -f --filter "until=24h"
```

## Common VPS Providers Notes

### DigitalOcean
- Docker pre-installed on Docker droplets
- Use floating IPs for production
- Enable backups

### Linode
- Good Docker performance
- Use NodeBalancers for load balancing

### Vultr
- Supports custom ISO for specialized setups
- Good network performance

### Hetzner
- Cost-effective
- European data centers
- Cloud firewall available

## Troubleshooting

### Docker daemon not starting
```bash
# Check logs
journalctl -xe | grep docker

# Restart Docker
systemctl restart docker

# Reset Docker
systemctl stop docker
rm -rf /var/lib/docker
systemctl start docker
```

### Permission denied errors
```bash
# Check group membership
groups

# Re-login or use
newgrp docker
```

### Disk space issues
```bash
# Check disk usage
df -h

# Clean Docker
docker system prune -a --volumes -f

# Check Docker root directory
du -sh /var/lib/docker
```

## Production Deployment Example

```bash
# 1. Clone your project
git clone https://github.com/youruser/yourproject.git
cd yourproject

# 2. Create .env file
cp .env.example .env
nano .env

# 3. Build and run with Docker Compose
docker compose up -d --build

# 4. Check logs
docker compose logs -f

# 5. Setup SSL with Nginx Proxy Manager or Traefik
docker compose -f docker-compose.prod.yml up -d
```

## Backup Strategy

```bash
# Backup volumes
docker run --rm -v myapp_data:/data -v $(pwd):/backup alpine tar czf /backup/backup.tar.gz /data

# Restore volumes
docker run --rm -v myapp_data:/data -v $(pwd):/backup alpine tar xzf /backup/backup.tar.gz -C /
```

## Useful Aliases

Add to `~/.bashrc`:
```bash
alias dps='docker ps'
alias dpsa='docker ps -a'
alias di='docker images'
alias dex='docker exec -it'
alias dl='docker logs'
alias dlf='docker logs -f'
alias dcu='docker compose up -d'
alias dcd='docker compose down'
alias dcl='docker compose logs -f'
alias dprune='docker system prune -a -f'
```

## Important Notes

1. **Never use Docker Desktop on VPS** - Use Docker Engine only
2. **Always use specific image tags** in production (not `:latest`)
3. **Set resource limits** to prevent container from consuming all resources
4. **Use health checks** in your containers
5. **Enable log rotation** to prevent disk fill
6. **Regular updates**: `apt update && apt upgrade docker-ce`
7. **Monitor disk space** regularly
8. **Use multi-stage builds** to reduce image size

## Quick Health Check Script

```bash
#!/bin/bash
# save as docker-health.sh

echo "=== Docker Health Check ==="
echo "Docker Version: $(docker --version)"
echo "Compose Version: $(docker compose version)"
echo ""
echo "Running Containers:"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
echo ""
echo "Disk Usage:"
docker system df
echo ""
echo "Memory Usage:"
free -h
echo ""
echo "Docker Daemon:"
systemctl is-active docker
```