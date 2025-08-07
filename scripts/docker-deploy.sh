#!/bin/bash

# Docker deployment script
# Usage: ./scripts/docker-deploy.sh [local|prod]

set -e

ENVIRONMENT=${1:-"local"}

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_info "🐳 Starting Docker deployment ($ENVIRONMENT)..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    log_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is available
if ! docker compose version &> /dev/null; then
    log_error "Docker Compose is not available. Please install Docker Compose."
    exit 1
fi

# Stop existing containers
log_info "Stopping existing containers..."
if [ "$ENVIRONMENT" = "prod" ]; then
    docker compose -f docker-compose.yml -f docker-compose.prod.yml down || true
else
    docker compose down || true
fi

# Clean up old images (optional)
log_warn "Cleaning up old Docker images..."
docker image prune -f

# Build and start containers
log_info "Building and starting containers..."
if [ "$ENVIRONMENT" = "prod" ]; then
    docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
else
    docker compose up -d --build
fi

# Wait for services to be healthy
log_info "Waiting for services to be healthy..."
sleep 10

# Check container status
log_info "Container status:"
docker compose ps

# Check if application is accessible
log_info "Checking application health..."
if curl -f -s http://localhost/nginx-health > /dev/null; then
    log_info "✅ Nginx is healthy"
else
    log_error "❌ Nginx health check failed"
fi

if curl -f -s http://localhost > /dev/null; then
    log_info "✅ Frontend is accessible"
else
    log_error "❌ Frontend is not accessible"
fi

# Show logs for debugging
log_info "Recent logs:"
docker compose logs --tail=10

echo ""
log_info "🎉 Docker deployment completed!"
log_info "Application is available at: http://localhost"
echo ""
log_info "Useful commands:"
echo "  docker compose logs -f           # Follow logs"
echo "  docker compose ps                # Show containers"
echo "  docker compose down              # Stop containers"
echo "  docker compose restart api      # Restart API only"