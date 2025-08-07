#!/bin/bash
# Docker Engine Installation Script for VPS (Ubuntu/Debian)
# Tested on Ubuntu 20.04, 22.04, 24.04 and Debian 11, 12

set -e

echo "========================================="
echo "Docker Engine VPS Installation Script"
echo "========================================="

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   echo "✓ Running as root"
   SUDO=""
else
   echo "✓ Running as non-root user, will use sudo"
   SUDO="sudo"
fi

# Detect OS
if [ -f /etc/os-release ]; then
    . /etc/os-release
    OS=$ID
    VERSION=$VERSION_ID
    echo "✓ Detected OS: $OS $VERSION"
else
    echo "✗ Cannot detect OS version"
    exit 1
fi

echo ""
echo "Step 1: Removing old Docker versions..."
echo "-----------------------------------------"
$SUDO apt-get remove -y docker docker-engine docker.io containerd runc 2>/dev/null || true
$SUDO apt-get remove -y docker-ce docker-ce-cli containerd.io docker-compose-plugin 2>/dev/null || true

echo ""
echo "Step 2: Installing prerequisites..."
echo "-----------------------------------------"
$SUDO apt-get update
$SUDO apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

echo ""
echo "Step 3: Adding Docker's official GPG key..."
echo "-----------------------------------------"
$SUDO mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/$OS/gpg | $SUDO gpg --dearmor -o /etc/apt/keyrings/docker.gpg
$SUDO chmod a+r /etc/apt/keyrings/docker.gpg

echo ""
echo "Step 4: Setting up Docker repository..."
echo "-----------------------------------------"
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/$OS \
  $(lsb_release -cs) stable" | $SUDO tee /etc/apt/sources.list.d/docker.list > /dev/null

echo ""
echo "Step 5: Installing Docker Engine..."
echo "-----------------------------------------"
$SUDO apt-get update
$SUDO apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

echo ""
echo "Step 6: Starting and enabling Docker..."
echo "-----------------------------------------"
$SUDO systemctl start docker
$SUDO systemctl enable docker

echo ""
echo "Step 7: Verifying installation..."
echo "-----------------------------------------"
$SUDO docker --version
$SUDO docker run hello-world

echo ""
echo "Step 8: Post-installation setup..."
echo "-----------------------------------------"

# Add current user to docker group (if not root)
if [[ $EUID -ne 0 ]]; then
    echo "Adding user $USER to docker group..."
    $SUDO usermod -aG docker $USER
    echo "✓ User added to docker group"
    echo ""
    echo "⚠️  IMPORTANT: You need to log out and back in for group changes to take effect!"
    echo "   Or run: newgrp docker"
fi

# Configure Docker daemon for production
echo ""
echo "Step 9: Configuring Docker for production..."
echo "-----------------------------------------"
$SUDO tee /etc/docker/daemon.json > /dev/null <<EOF
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  },
  "storage-driver": "overlay2",
  "live-restore": true,
  "userland-proxy": false
}
EOF

$SUDO systemctl reload docker

echo ""
echo "========================================="
echo "✅ Docker Installation Complete!"
echo "========================================="
echo ""
echo "Docker version:"
$SUDO docker --version
echo ""
echo "Docker Compose version:"
$SUDO docker compose version
echo ""

if [[ $EUID -ne 0 ]]; then
    echo "Next steps:"
    echo "1. Log out and log back in (or run 'newgrp docker')"
    echo "2. Test without sudo: docker ps"
    echo "3. Configure firewall if needed (ports 80, 443, etc.)"
else
    echo "Next steps:"
    echo "1. Create a non-root user for Docker operations"
    echo "2. Configure firewall rules as needed"
fi

echo ""
echo "Security recommendations:"
echo "• Set up UFW firewall: ufw allow 22/tcp && ufw enable"
echo "• Use Docker secrets for sensitive data"
echo "• Regularly update Docker: apt-get update && apt-get upgrade docker-ce"
echo "• Monitor logs: journalctl -u docker -f"
echo "========================================="