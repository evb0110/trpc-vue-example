# Multi-stage build for production optimization
# Use node:20 (Debian-based) for build stage to avoid Alpine npm issues
FROM node:20 AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Clean npm cache and install dependencies
# Using multiple fallback strategies to ensure installation succeeds
RUN npm cache clean --force && \
    npm install --no-audit --no-fund || \
    (rm -rf node_modules package-lock.json && npm install --no-audit --no-fund)

# Copy source code
COPY . .

# Build the application (both client and server)
RUN npm run build

# Production stage - use Alpine for smaller image
FROM node:20-alpine AS production

# Create app user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S trpc-app -u 1001

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production --no-audit --no-fund && npm cache clean --force

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Copy environment files
COPY --from=builder /app/config/.env.production ./.env.production

# Change ownership to app user
RUN chown -R trpc-app:nodejs /app
USER trpc-app

# Expose port
EXPOSE 3000

# Health check - just check if port is responding
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD nc -z localhost 3000 || exit 1

# Start the application
CMD ["node", "dist/server/index.js"]