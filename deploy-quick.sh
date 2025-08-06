#!/bin/bash

# Quick deployment script - uses default values
# Edit these defaults for your setup:
DEFAULT_REPO="https://github.com/evb0110/trpc-vue-example.git"
DEFAULT_DOMAIN="e-aramaica.ru"

# Run the main deployment script with defaults
sudo ./deploy-production.sh "$DEFAULT_REPO" "$DEFAULT_DOMAIN"