#!/bin/bash

# Production deployment script for tRPC Vue Example
# Usage: ./deploy-production.sh [DOMAIN]
# Example: ./deploy-production.sh e-aramaica.ru

set -e  # Exit on error

# Configuration
DOMAIN=${1:-"e-aramaica.ru"}
REPO_OWNER="evb0110"
REPO_NAME="trpc-vue-example"

# Try SSH first, fallback to HTTPS
REPO_URL_SSH="git@github.com:$REPO_OWNER/$REPO_NAME.git"
REPO_URL_HTTPS="https://github.com/$REPO_OWNER/$REPO_NAME.git"
REPO_URL=""  # Will be determined later
APP_DIR="/var/www/trpc-vue-example"
PM2_APP_NAME="trpc-api"
APP_USER="trpc-app"  # Dedicated user for the application

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root or with sudo
if [ "$EUID" -ne 0 ]; then
    log_error "Please run as root or with sudo: sudo ./deploy-production.sh"
    exit 1
fi

log_info "Starting production deployment..."

# Step 1: Install prerequisites
log_info "Checking and installing prerequisites..."

# Check Node.js
if ! command -v node &> /dev/null; then
    log_info "Installing Node.js 20..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs
else
    log_info "Node.js $(node -v) already installed"
fi

# Check nginx
if ! command -v nginx &> /dev/null; then
    log_info "Installing nginx..."
    apt-get update
    apt-get install -y nginx
else
    log_info "nginx already installed"
fi

# Check PM2
if ! command -v pm2 &> /dev/null; then
    log_info "Installing PM2 globally..."
    npm install -g pm2
else
    log_info "PM2 already installed"
fi

# Check git
if ! command -v git &> /dev/null; then
    log_info "Installing git..."
    apt-get install -y git
else
    log_info "git already installed"
fi

# Step 2: Create dedicated user if doesn't exist
if ! id "$APP_USER" &>/dev/null; then
    log_info "Creating dedicated user '$APP_USER'..."
    useradd -m -s /bin/bash $APP_USER
    usermod -aG www-data $APP_USER
else
    log_info "User '$APP_USER' already exists"
fi

# Generate SSH key for the app user if it doesn't exist
if [ ! -f "/home/$APP_USER/.ssh/id_ed25519" ]; then
    log_info "Generating SSH key for '$APP_USER'..."
    sudo -u $APP_USER ssh-keygen -t ed25519 -C "$APP_USER@$DOMAIN" -f /home/$APP_USER/.ssh/id_ed25519 -N ""
    echo ""
    log_warn "=========================================="
    log_warn "SSH PUBLIC KEY FOR GITHUB:"
    echo ""
    sudo -u $APP_USER cat /home/$APP_USER/.ssh/id_ed25519.pub
    echo ""
    log_warn "=========================================="
    log_warn "Add this key to GitHub:"
    log_warn "1. Go to: https://github.com/$REPO_OWNER/$REPO_NAME/settings/keys"
    log_warn "2. Click 'Add deploy key'"
    log_warn "3. Paste the key above"
    log_warn "4. Check 'Allow write access' (optional)"
    log_warn "5. Click 'Add key'"
    echo ""
    log_warn "Press Enter after adding the key to continue..."
    read -r
else
    log_info "SSH key already exists for '$APP_USER'"
fi

# Test SSH connection and determine which URL to use
log_info "Testing SSH connection to GitHub..."
if sudo -u $APP_USER ssh -o StrictHostKeyChecking=no -T git@github.com 2>&1 | grep -q "successfully authenticated"; then
    log_info "SSH authentication successful, using SSH URL"
    REPO_URL=$REPO_URL_SSH
else
    log_warn "SSH authentication failed, using HTTPS URL"
    REPO_URL=$REPO_URL_HTTPS
fi

# Step 3: Clean existing deployment
log_info "Cleaning existing deployment..."

# Stop PM2 process if exists
if pm2 describe $PM2_APP_NAME &> /dev/null; then
    log_warn "Stopping existing PM2 process..."
    pm2 stop $PM2_APP_NAME
    pm2 delete $PM2_APP_NAME
fi

# Remove old nginx config
if [ -f "/etc/nginx/sites-enabled/trpc-vue-example" ]; then
    log_warn "Removing old nginx configuration..."
    rm -f /etc/nginx/sites-enabled/trpc-vue-example
    rm -f /etc/nginx/sites-available/trpc-vue-example
fi

# Remove old app directory
if [ -d "$APP_DIR" ]; then
    log_warn "Removing old application directory..."
    rm -rf $APP_DIR
fi

# Step 4: Clone repository or copy current directory
# Create directory with proper ownership first
mkdir -p $APP_DIR
chown $APP_USER:www-data $APP_DIR

if [ -f "./package.json" ]; then
    log_info "Using current directory (already cloned)..."
    log_info "Copying to $APP_DIR..."
    cp -r . $APP_DIR
    cd $APP_DIR
else
    log_info "Cloning repository from $REPO_URL..."
    # Clone as the app user to avoid permission issues
    cd $APP_DIR
    sudo -u $APP_USER git clone $REPO_URL .
    # Stay in the directory
fi

# Step 5: Install dependencies
log_info "Installing dependencies..."
npm install

# Step 6: Build application
log_info "Building application (client and server)..."
npm run build

# Step 7: Setup production environment
log_info "Setting up production environment..."

# Check if .env.production exists
if [ ! -f ".env.production" ]; then
    log_info "Creating .env.production file..."
    cat > .env.production << EOF
# Production environment variables
NODE_ENV=production

# Server configuration
PORT=3000
HOST=127.0.0.1

# Frontend URL for CORS (update with your domain)
FRONTEND_URL=http://$DOMAIN

# API URL (for client to connect to server)
VITE_API_URL=/api
EOF
else
    # Update FRONTEND_URL in existing .env.production
    log_info "Updating FRONTEND_URL in .env.production..."
    sed -i "s|FRONTEND_URL=.*|FRONTEND_URL=http://$DOMAIN|" .env.production
fi

# Copy to .env
cp .env.production .env

# Step 7: Configure nginx
log_info "Configuring nginx..."

# Create nginx config with the domain
cat > /etc/nginx/sites-available/trpc-vue-example << EOF
server {
    listen 80;
    server_name $DOMAIN;

    # Serve Vue app
    root $APP_DIR/dist/client;
    index index.html;

    # API proxy
    location /api/ {
        proxy_pass http://localhost:3000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    # Vue app - try files, fallback to index.html for client-side routing
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
EOF

# Enable the site
ln -sf /etc/nginx/sites-available/trpc-vue-example /etc/nginx/sites-enabled/

# Remove default site if exists
rm -f /etc/nginx/sites-enabled/default

# Test nginx configuration
if nginx -t; then
    log_info "nginx configuration is valid"
    systemctl reload nginx
else
    log_error "nginx configuration test failed!"
    exit 1
fi

# Step 9: Start application with PM2
log_info "Starting application with PM2..."

# Start the server as the app user
sudo -u $APP_USER pm2 start dist/server/index.js --name $PM2_APP_NAME --env production

# Save PM2 configuration
sudo -u $APP_USER pm2 save

# Setup PM2 to start on boot for the app user
log_info "Setting up PM2 startup script..."
PM2_STARTUP=$(sudo -u $APP_USER pm2 startup systemd -u $APP_USER --hp /home/$APP_USER | grep sudo | sed 's/^.*sudo/sudo/')
if [ ! -z "$PM2_STARTUP" ]; then
    eval $PM2_STARTUP
    log_info "PM2 startup script installed"
fi

# Step 10: Set proper permissions
log_info "Setting file permissions..."
chown -R $APP_USER:www-data $APP_DIR
chmod -R 755 $APP_DIR

# Step 11: Verify deployment
log_info "Verifying deployment..."

# Check PM2 status
sudo -u $APP_USER pm2 status

# Check if server is responding
sleep 3
if curl -f -s http://localhost:3000/health > /dev/null 2>&1; then
    log_info "✓ Server is running on port 3000"
else
    log_warn "Server health check failed (this might be normal if /health endpoint doesn't exist)"
fi

# Check if nginx is serving the frontend
if curl -f -s http://localhost > /dev/null 2>&1; then
    log_info "✓ Frontend is accessible via nginx"
else
    log_error "Frontend is not accessible!"
fi

# Final message
echo ""
log_info "=========================================="
log_info "Deployment completed successfully!"
log_info "=========================================="
log_info "Application URL: http://$DOMAIN"
log_info "API endpoint: http://$DOMAIN/api"
echo ""
log_info "Useful commands:"
echo "  pm2 status          - Check server status"
echo "  pm2 logs $PM2_APP_NAME     - View server logs"
echo "  pm2 restart $PM2_APP_NAME  - Restart server"
echo "  nginx -t            - Test nginx config"
echo "  systemctl reload nginx - Reload nginx"
echo ""
log_info "To update the deployment, run this script again."