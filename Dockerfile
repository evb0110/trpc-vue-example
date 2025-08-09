# Single stage build - simpler and more reliable
FROM node:20

# Set working directory
WORKDIR /app

# Enable corepack (for future use) and prepare npm cache dir
RUN corepack enable || true

# Copy package files first
COPY package*.json ./

# Install dependencies (include devDependencies); use robust flags to avoid npm bugs
RUN npm ci --include=dev --no-audit --no-fund || npm install --no-audit --no-fund || (rm -rf node_modules package-lock.json && npm install --no-audit --no-fund)

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
