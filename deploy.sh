#!/bin/bash

# Deployment script for tRPC + Vue example app

echo "🚀 Starting deployment..."

# Update with your VPS IP or domain
VPS_IP="your-vps-ip"

# Step 1: Install dependencies
echo "📦 Installing dependencies..."
npm install

# Step 2: Build the Vue app
echo "🔨 Building Vue app..."
npm run build

# Step 3: Create deployment directory on VPS
echo "📁 Creating deployment directory..."
ssh root@$VPS_IP "mkdir -p /var/www/trpc-vue-example"

# Step 4: Copy files to VPS
echo "📤 Copying files to VPS..."
rsync -avz --exclude 'node_modules' --exclude '.git' ./ root@$VPS_IP:/var/www/trpc-vue-example/

# Step 5: Install dependencies on VPS
echo "📦 Installing dependencies on VPS..."
ssh root@$VPS_IP "cd /var/www/trpc-vue-example && npm install --production"

# Step 6: Copy nginx config
echo "⚙️ Setting up nginx..."
ssh root@$VPS_IP "cp /var/www/trpc-vue-example/nginx.conf /etc/nginx/sites-available/trpc-vue-example"
ssh root@$VPS_IP "ln -sf /etc/nginx/sites-available/trpc-vue-example /etc/nginx/sites-enabled/"
ssh root@$VPS_IP "nginx -t && systemctl reload nginx"

# Step 7: Start the server
echo "🏃 Starting server..."
ssh root@$VPS_IP "cd /var/www/trpc-vue-example && NODE_ENV=production node server/src/server.js"

echo "✅ Deployment complete! Your app should be available at http://$VPS_IP"