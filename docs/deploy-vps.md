# VPS Deployment Guide (All on VPS)

## Prerequisites on VPS

1. **Install Node.js and nginx:**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs nginx git
```

## Deployment Steps

1. **Clone the repository:**
```bash
cd /var/www
git clone https://github.com/YOUR_USERNAME/trpc-vue-example.git
cd trpc-vue-example
```

2. **Install dependencies and build:**
```bash
npm install
npm run build
# This builds both client (dist/client) and server (dist/server)
```

3. **Configure environment:**
```bash
cp .env.production .env
nano .env
# Update FRONTEND_URL with your domain/IP
```

4. **Setup nginx:**
```bash
# Copy nginx config
sudo cp nginx.conf /etc/nginx/sites-available/trpc-vue-example

# Enable the site
sudo ln -sf /etc/nginx/sites-available/trpc-vue-example /etc/nginx/sites-enabled/

# Remove default site if needed
sudo rm -f /etc/nginx/sites-enabled/default

# Test and reload nginx
sudo nginx -t
sudo systemctl reload nginx
```

5. **Start the server with PM2 (recommended):**
```bash
# Install PM2 globally
sudo npm install -g pm2

# Start the server (use compiled version)
pm2 start dist/server/index.js --name trpc-api --env production

# Save PM2 config
pm2 save

# Setup PM2 to start on boot
pm2 startup systemd
# Follow the command it outputs
```

Alternative: **Start with systemd service:**
```bash
# Create service file
sudo nano /etc/systemd/system/trpc-api.service
```

Add this content:
```ini
[Unit]
Description=tRPC API Server
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/trpc-vue-example
ExecStart=/usr/bin/node dist/server/index.js
Restart=on-failure
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

Then:
```bash
sudo systemctl daemon-reload
sudo systemctl enable trpc-api
sudo systemctl start trpc-api
sudo systemctl status trpc-api
```

## Updating the App

```bash
cd /var/www/trpc-vue-example
git pull
npm install
npm run build

# If using PM2
pm2 restart trpc-api

# If using systemd
sudo systemctl restart trpc-api
```

## Useful Commands

```bash
# Check server logs (PM2)
pm2 logs trpc-api

# Check server logs (systemd)
sudo journalctl -u trpc-api -f

# Check nginx logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

## Troubleshooting

1. **Port 3000 already in use:**
```bash
sudo lsof -i :3000
kill -9 [PID]
```

2. **Permission issues:**
```bash
sudo chown -R www-data:www-data /var/www/trpc-vue-example
```

3. **Check if services are running:**
```bash
sudo systemctl status nginx
pm2 status
# or
sudo systemctl status trpc-api
```