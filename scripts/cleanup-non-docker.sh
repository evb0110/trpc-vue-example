#!/bin/bash

# Cleanup script to stop and purge all non-Docker processes for this app
# This prepares the system for Docker-only deployment

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_info "Cleaning up non-Docker processes for tRPC Vue Example..."

# Stop PM2 processes
log_info "Stopping PM2 processes..."
if command -v pm2 &> /dev/null; then
    # Stop specific app if exists
    if pm2 describe trpc-api &> /dev/null; then
        log_warn "Stopping PM2 process 'trpc-api'..."
        pm2 stop trpc-api
        pm2 delete trpc-api
    fi
    
    # Stop all PM2 processes for extra safety
    log_warn "Stopping all PM2 processes..."
    pm2 stop all 2>/dev/null || true
    pm2 delete all 2>/dev/null || true
    
    # Remove PM2 from startup
    log_warn "Removing PM2 from system startup..."
    pm2 unstartup 2>/dev/null || true
    
    log_info "PM2 processes cleaned up"
else
    log_info "PM2 not installed, skipping..."
fi

# Stop any Node.js processes running the app
log_info "Stopping Node.js processes..."
if pgrep -f "server.*index.js" &> /dev/null; then
    log_warn "Found Node.js server processes, killing them..."
    pkill -f "server.*index.js" || true
fi

if pgrep -f "trpc.*server" &> /dev/null; then
    log_warn "Found tRPC server processes, killing them..."
    pkill -f "trpc.*server" || true
fi

# Check for processes on port 3000
if lsof -ti:3000 &> /dev/null; then
    log_warn "Found process on port 3000, killing it..."
    kill -9 $(lsof -ti:3000) 2>/dev/null || true
fi

# Remove nginx configuration
log_info "Cleaning up nginx configuration..."
if [ -f "/etc/nginx/sites-enabled/trpc-vue-example" ]; then
    log_warn "Removing nginx site configuration..."
    rm -f /etc/nginx/sites-enabled/trpc-vue-example
    rm -f /etc/nginx/sites-available/trpc-vue-example
fi

# Restore nginx default if it doesn't exist
if [ ! -f "/etc/nginx/sites-enabled/default" ] && [ -f "/etc/nginx/sites-available/default" ]; then
    log_warn "Restoring nginx default configuration..."
    ln -sf /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default
fi

# Test and reload nginx
if command -v nginx &> /dev/null; then
    log_info "Testing nginx configuration..."
    if nginx -t; then
        systemctl reload nginx
        log_info "nginx configuration reloaded"
    else
        log_error "nginx configuration test failed"
    fi
fi

# Remove application directory (optional - uncomment if needed)
# log_info "Removing application directory..."
# if [ -d "/var/www/trpc-vue-example" ]; then
#     log_warn "Removing /var/www/trpc-vue-example..."
#     rm -rf /var/www/trpc-vue-example
# fi

# Clean up systemd service if exists
log_info "Cleaning up systemd service..."
if [ -f "/etc/systemd/system/trpc-api.service" ]; then
    log_warn "Removing systemd service..."
    systemctl stop trpc-api 2>/dev/null || true
    systemctl disable trpc-api 2>/dev/null || true
    rm -f /etc/systemd/system/trpc-api.service
    systemctl daemon-reload
fi

# Verify cleanup
log_info "Verifying cleanup..."

# Check if port 3000 is free
if ! lsof -ti:3000 &> /dev/null; then
    log_info "✓ Port 3000 is free"
else
    log_error "✗ Port 3000 still in use"
fi

# Check if nginx is working
if curl -f -s http://localhost &> /dev/null; then
    log_info "✓ nginx is responding (probably default page)"
else
    log_warn "⚠ nginx not responding (might be expected)"
fi

# Check PM2 status
if command -v pm2 &> /dev/null; then
    PM2_COUNT=$(pm2 list | grep -c "online\|stopped\|errored" || echo "0")
    if [ "$PM2_COUNT" -eq 0 ]; then
        log_info "✓ No PM2 processes running"
    else
        log_warn "⚠ $PM2_COUNT PM2 processes still running"
    fi
fi

echo ""
log_info "=========================================="
log_info "Cleanup completed!"
log_info "=========================================="
log_info "The system is now ready for Docker deployment."
log_info "Non-Docker processes have been stopped and disabled."
echo ""
log_info "Next steps:"
echo "  1. Set up Docker: curl -fsSL https://get.docker.com | sh"
echo "  2. Add Docker Compose"
echo "  3. Run: docker-compose up -d"
echo ""
log_warn "Note: /var/www/trpc-vue-example was NOT removed."
log_warn "Uncomment the cleanup section in this script if you want to remove it."