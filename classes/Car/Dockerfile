# Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy root package files
COPY package*.json ./
COPY tsconfig.json ./

# Copy source files
COPY packages/ ./packages/
COPY classes/Car/ ./classes/Car/

# Install dependencies and build
WORKDIR /app/classes/Car
RUN npm ci --only=production --legacy-peer-deps && \
    npm run build

# Production stage
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/classes/Car/dist ./dist
COPY --from=builder /app/classes/Car/package*.json ./

# Install only production dependencies
RUN npm ci --only=production --legacy-peer-deps && \
    npm cache clean --force

# Add healthcheck using node
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/health', (res) => res.statusCode === 200 ? process.exit(0) : process.exit(1))" || exit 1

# Set environment variables
ENV NODE_ENV=production

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "dist/index.js"]
