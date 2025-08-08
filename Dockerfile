# Single stage build - simpler and more reliable
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install ALL dependencies (both dev and production)
# Use multiple strategies to ensure it works
RUN npm install || npm install --force || (rm -rf node_modules package-lock.json && npm install)

# Verify critical dependencies are installed
RUN which vue-tsc || (echo "vue-tsc not found, trying to install directly..." && npm install vue-tsc typescript vite @vitejs/plugin-vue tsup tsx --save-dev)

# Copy all source files
COPY . .

# Build the application
RUN npm run build

# Remove dev dependencies after build to reduce image size
RUN npm prune --production

# Create non-root user for security
RUN groupadd -r trpc && useradd -r -g trpc trpc
RUN chown -R trpc:trpc /app
USER trpc

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "dist/server/index.js"]