# Local Production Environment (Mimics VPS)

Replicate the exact production setup locally using the same paths and nginx configuration.

## Clean Previous Setup (if exists)

```bash
# Stop and remove PM2 process
pm2 stop trpc-api 2>/dev/null
pm2 delete trpc-api 2>/dev/null

# Remove nginx configuration
sudo rm -f /etc/nginx/sites-enabled/trpc-vue-example
sudo rm -f /etc/nginx/sites-available/trpc-vue-example

# Remove old production directory
sudo rm -rf /var/www/trpc-vue-example

# Reset nginx to default
sudo rm -f /etc/nginx/sites-enabled/default
sudo ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default 2>/dev/null
sudo nginx -t && sudo systemctl restart nginx
```

## Prerequisites

```bash
# Install nginx
sudo apt-get install nginx

# Install PM2 globally
sudo npm install -g pm2
```

## Setup Steps

### 1. Create production directory

```bash
sudo mkdir -p /var/www/trpc-vue-example
sudo chown -R $USER:$USER /var/www/trpc-vue-example
```

### 2. Copy project to production location

```bash
cp -r . /var/www/trpc-vue-example/
cd /var/www/trpc-vue-example
rm -rf node_modules .git dist
```

### 3. Install dependencies and build

```bash
cd /var/www/trpc-vue-example
npm install  # Installs all dependencies including tsup
npm run build
# This runs both:
# - npm run build:client (Vue app → dist/client)
# - npm run build:server (TypeScript server → dist/server)
```

### 4. Setup environment

```bash
cp .env.local-prod .env
# This sets FRONTEND_URL=http://localhost for local testing
```

### 5. Configure nginx

```bash
# Copy nginx config (uses nginx-local.conf with localhost)
sudo cp nginx-local.conf /etc/nginx/sites-available/trpc-vue-example

# Enable the site
sudo ln -sf /etc/nginx/sites-available/trpc-vue-example /etc/nginx/sites-enabled/

# Disable default site to avoid port 80 conflicts
sudo rm -f /etc/nginx/sites-enabled/default

# Test and restart nginx
sudo nginx -t
sudo systemctl restart nginx
```

### 6. Start the server with PM2

```bash
cd /var/www/trpc-vue-example
pm2 start dist/server/index.js --name trpc-api --env production
pm2 save
pm2 startup  # Follow the command it outputs for auto-start on boot
```

## Access the application

- Frontend: http://localhost
- API: http://localhost/api

The app should now be running. You'll see a 404 for `/api/auth.me` in the console - this is expected when not authenticated.

## Common Commands

### Check status
```bash
pm2 status
pm2 logs trpc-api
sudo systemctl status nginx
```

### Update and rebuild after code changes
```bash
cd /var/www/trpc-vue-example

# If using git from /var/www location
git pull

# Or copy from development directory
rm -rf dist
cp -r ~/WebstormProjects/trpc-vue-example/dist .

# Or rebuild in place
npm install  # if dependencies changed
npm run build

# Restart server
pm2 restart trpc-api

# If nginx config changed
sudo systemctl reload nginx
```

### Stop everything
```bash
pm2 stop trpc-api
sudo systemctl stop nginx
```

### Remove everything (cleanup)
```bash
pm2 delete trpc-api
sudo rm /etc/nginx/sites-enabled/trpc-vue-example
sudo rm /etc/nginx/sites-available/trpc-vue-example
sudo rm -rf /var/www/trpc-vue-example
sudo systemctl restart nginx
```

## Troubleshooting

### Port 3000 already in use
```bash
pm2 stop all
sudo lsof -i :3000
kill -9 [PID]  # if needed
```

### Check logs
```bash
pm2 logs trpc-api --lines 50
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

### Permission issues
```bash
sudo chown -R $USER:$USER /var/www/trpc-vue-example
```

### Browser caching issues
- Open in incognito/private window
- Or open DevTools (F12) → Network tab → check "Disable cache"
- Hard refresh with Ctrl+Shift+R (or Cmd+Shift+R on Mac)

## Important Notes

1. **Build Process**: The `npm run build` command builds BOTH:
   - Vue client (TypeScript → JavaScript in `dist/client`)
   - Node server (TypeScript → JavaScript in `dist/server`)

2. **API Path**: The client uses `/api` which nginx proxies to `localhost:3000`
   - Client request: `http://localhost/api/auth.login`
   - Nginx proxies to: `http://localhost:3000/auth.login`

3. **Authentication**: The 404 error on `/api/auth.me` is expected when not logged in

4. **File Structure**:
   ```
   /var/www/trpc-vue-example/
   ├── dist/
   │   ├── client/       # Vue built files (served by nginx)
   │   └── server/       # Compiled server (run by PM2)
   ├── server/           # TypeScript source (not used in production)
   ├── client/           # Vue source (not used in production)
   └── .env             # Production environment variables
   ```