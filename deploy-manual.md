# Manual Deployment Steps

## On your local machine:

1. **Build the Vue app:**
   ```bash
   npm install
   npm run build
   ```

2. **Copy project to VPS:**
   ```bash
   rsync -avz --exclude 'node_modules' --exclude '.git' ./ root@YOUR_VPS_IP:/var/www/trpc-vue-example/
   ```

## On your VPS:

1. **Install Node.js and nginx:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs nginx
   ```

2. **Install dependencies:**
   ```bash
   cd /var/www/trpc-vue-example
   npm install --production
   ```

3. **Update environment variables:**
   ```bash
   nano .env.production
   # Update YOUR_VPS_IP with actual IP
   ```

4. **Setup nginx:**
   ```bash
   # Copy nginx config
   sudo cp nginx.conf /etc/nginx/sites-available/trpc-vue-example
   
   # Enable the site
   sudo ln -sf /etc/nginx/sites-available/trpc-vue-example /etc/nginx/sites-enabled/
   
   # Remove default site if needed
   sudo rm /etc/nginx/sites-enabled/default
   
   # Test and reload nginx
   sudo nginx -t
   sudo systemctl reload nginx
   ```

5. **Start the server (simple way):**
   ```bash
   cd /var/www/trpc-vue-example
   NODE_ENV=production node server/src/server.js
   ```

   Or run in background with nohup:
   ```bash
   nohup NODE_ENV=production node server/src/server.js > server.log 2>&1 &
   ```

6. **Check if it's working:**
   - Visit `http://YOUR_VPS_IP` - should see Vue app
   - API is available at `http://YOUR_VPS_IP/api`

## To stop the server:
```bash
# Find the process
ps aux | grep node

# Kill it
kill [PID]
```