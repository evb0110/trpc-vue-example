# Production Deployment (Automated)

Deploy to production VPS with a single command.

## One-Command Deployment

```bash
# SSH into your VPS
ssh your-user@your-vps-ip

# Clone and run deployment
git clone https://github.com/YOUR_USERNAME/trpc-vue-example.git
cd trpc-vue-example
sudo ./deploy-production.sh https://github.com/YOUR_USERNAME/trpc-vue-example.git e-aramaica.ru
```

That's it! The script will:
- ✅ Install all prerequisites (Node.js, nginx, PM2)
- ✅ Clean any existing deployment
- ✅ Build both client and server
- ✅ Configure nginx with your domain
- ✅ Start server with PM2
- ✅ Setup auto-restart on boot

## Alternative: Without Cloning First

```bash
# Download and run the script directly
wget https://raw.githubusercontent.com/YOUR_USERNAME/trpc-vue-example/main/deploy-production.sh
chmod +x deploy-production.sh
sudo ./deploy-production.sh https://github.com/YOUR_USERNAME/trpc-vue-example.git e-aramaica.ru
```

## What the Script Does

1. **Installs prerequisites** - Node.js 20, nginx, PM2, git
2. **Cleans previous setup** - Removes old PM2 processes, nginx configs, app directory
3. **Clones repository** - Fresh clone to `/var/www/trpc-vue-example`
4. **Builds application** - Runs `npm run build` (both client and server)
5. **Configures environment** - Sets up `.env` from `.env.production`
6. **Configures nginx** - Creates site config with your domain
7. **Starts server** - PM2 manages the Node.js server
8. **Sets up auto-start** - PM2 will restart on system reboot

## Update Deployment

Just run the same command again:
```bash
cd /var/www/trpc-vue-example
sudo ./deploy-production.sh https://github.com/YOUR_USERNAME/trpc-vue-example.git e-aramaica.ru
```

## Manual Commands

After deployment, you can use these commands:

```bash
# Check status
pm2 status
pm2 logs trpc-api

# Restart server
pm2 restart trpc-api

# Rebuild and restart
cd /var/www/trpc-vue-example
git pull
npm run build
pm2 restart trpc-api

# Check nginx
sudo nginx -t
sudo systemctl status nginx
```

## Troubleshooting

If deployment fails:
```bash
# Check logs
pm2 logs trpc-api --lines 100
sudo tail -f /var/log/nginx/error.log

# Manual cleanup and retry
pm2 delete all
sudo rm -rf /var/www/trpc-vue-example
sudo rm /etc/nginx/sites-enabled/trpc-vue-example
sudo ./deploy-production.sh [REPO_URL] [DOMAIN]
```

## Important Notes

- Replace `YOUR_USERNAME` with your GitHub username
- Replace `e-aramaica.ru` with your domain
- The script requires `sudo` to install packages and configure nginx
- Default ports: nginx on 80, Node.js on 3000 (internal)