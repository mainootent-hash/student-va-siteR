FROM node:18-alpine AS deps-backend
WORKDIR /workspace

# Install backend production dependencies
COPY backend/package*.json backend/
RUN cd backend && npm ci --production

FROM node:18-alpine AS builder-frontend
WORKDIR /workspace

# Copy frontend sources and build
COPY app/package*.json app/
COPY app/tsconfig*.json app/
COPY app/vite.config.ts app/
COPY app/public app/public
COPY app/src app/src
RUN cd app && npm ci && npm run build

FROM node:18-alpine AS final
WORKDIR /app

# Copy backend code
COPY backend/ ./

# Use previously installed backend deps
COPY --from=deps-backend /workspace/backend/node_modules ./node_modules

# Copy frontend build into ./client
COPY --from=builder-frontend /workspace/app/dist ./client

ENV PORT=3001
EXPOSE 3001

CMD ["node", "server.js"]
