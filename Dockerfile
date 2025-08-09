# Single stage build - simpler and more reliable
FROM node:20

# Set working directory
WORKDIR /app

# Enable corepack (for future use) and prepare npm cache dir
RUN corepack enable || true

# Copy package files first
COPY package*.json ./

# Install ALL dependencies including devDependencies (needed for build)
# First try with ci for speed, fallback to install if needed
RUN npm ci --no-audit --no-fund || \
    npm install --no-audit --no-fund --legacy-peer-deps || \
    (echo "Retrying with cache clear..." && npm cache clean --force && npm install --no-audit --no-fund --legacy-peer-deps)

# Verify that vite is installed
RUN npx vite --version || (echo "Vite not found, listing node_modules:" && ls -la node_modules/ | head -20 && exit 1)

# Copy all source files
COPY . .

# Build the application (client + server) without vue-tsc in Docker
RUN npm run build:docker

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
