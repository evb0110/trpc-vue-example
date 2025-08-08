# Single stage build - simpler and more reliable
FROM node:20

# Set working directory
WORKDIR /app

# Enable corepack (for future use) and prepare npm cache dir
RUN corepack enable || true

# Copy package files first
COPY package*.json ./

# Install dependencies deterministically (prefer npm ci when lockfile present)
RUN npm ci --include=dev || npm install

# Copy all source files
COPY . .

# Build the application (client + server)
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
