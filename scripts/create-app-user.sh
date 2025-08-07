#!/bin/bash
# Create application user with Docker access on VPS

set -e

APP_USER="trpc-app"
APP_HOME="/home/$APP_USER"

echo "=== Creating Application User for Docker ==="

# Check if user already exists
if id "$APP_USER" &>/dev/null; then
    echo "✓ User $APP_USER already exists"
else
    echo "Creating user $APP_USER..."
    
    # Create user with home directory
    sudo adduser --gecos "" --disabled-password $APP_USER
    
    echo "✓ User $APP_USER created"
fi

# Add user to docker group
echo "Adding $APP_USER to docker group..."
sudo usermod -aG docker $APP_USER

# Optional: Add to sudo group if needed for deployments
read -p "Add $APP_USER to sudo group? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    sudo usermod -aG sudo $APP_USER
    echo "✓ Added to sudo group"
fi

# Create app directory
echo "Creating application directory..."
sudo mkdir -p $APP_HOME/app
sudo chown -R $APP_USER:$APP_USER $APP_HOME/app

# Set up SSH key (optional)
read -p "Set up SSH key for $APP_USER? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    sudo -u $APP_USER mkdir -p $APP_HOME/.ssh
    sudo -u $APP_USER touch $APP_HOME/.ssh/authorized_keys
    sudo chmod 700 $APP_HOME/.ssh
    sudo chmod 600 $APP_HOME/.ssh/authorized_keys
    echo "✓ SSH directory created"
    echo "  Add your public key to: $APP_HOME/.ssh/authorized_keys"
fi

# Display user info
echo ""
echo "=== User Setup Complete ==="
echo "Username: $APP_USER"
echo "Home: $APP_HOME"
echo "Groups: $(groups $APP_USER)"
echo ""
echo "Next steps:"
echo "1. If you added SSH keys, the user can now SSH in"
echo "2. Switch to user: sudo su - $APP_USER"
echo "3. Test Docker: docker ps"
echo ""
echo "Note: User must log out and back in for docker group to take effect"
echo "Or run as that user: su - $APP_USER -c 'docker ps'"