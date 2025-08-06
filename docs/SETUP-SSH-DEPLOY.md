# Setup SSH Deployment with Dedicated User

This guide helps you set up SSH-based deployment with a dedicated application user.

## On Your VPS

### 1. Create dedicated user for the app
```bash
# Create the user
sudo useradd -m -s /bin/bash trpc-app
sudo usermod -aG www-data trpc-app

# Set password (optional, for sudo access)
sudo passwd trpc-app
```

### 2. Setup SSH key for the trpc-app user
```bash
# Switch to the app user
sudo su - trpc-app

# Generate SSH key
ssh-keygen -t ed25519 -C "trpc-app@vps"
# Press Enter for all prompts (no passphrase)

# Display the public key
cat ~/.ssh/id_ed25519.pub
```

### 3. Add the SSH key to GitHub
1. Copy the public key output from above
2. Go to GitHub → Your Repository → Settings → Deploy keys
3. Click "Add deploy key"
4. Title: "VPS Deployment"
5. Paste the key
6. Check "Allow write access" if you need push capability
7. Click "Add key"

### 4. Test SSH connection
```bash
# Still as trpc-app user
ssh -T git@github.com
# Should see: "Hi username/repo! You've successfully authenticated..."

# Exit back to your regular user
exit
```

### 5. Run deployment
```bash
# Now you can use SSH URL for cloning
sudo ./deploy-production.sh git@github.com:evb0110/trpc-vue-example.git e-aramaica.ru
```

## Benefits of This Approach

1. **Security**: App runs as limited user, not root
2. **Isolation**: App user only has access to app files
3. **SSH Keys**: Work properly because they belong to the app user
4. **PM2 Management**: PM2 runs under app user, easier to manage

## Alternative: Use HTTPS with Token

If you prefer not to set up SSH:

```bash
# Create a GitHub personal access token
# Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
# Generate new token with 'repo' scope

# Use token in URL
sudo ./deploy-production.sh https://YOUR_TOKEN@github.com/evb0110/trpc-vue-example.git e-aramaica.ru
```

## Managing the Application

After deployment, you can manage PM2 as the app user:

```bash
# Check status
sudo -u trpc-app pm2 status

# View logs
sudo -u trpc-app pm2 logs trpc-api

# Restart
sudo -u trpc-app pm2 restart trpc-api

# Monitor
sudo -u trpc-app pm2 monit
```