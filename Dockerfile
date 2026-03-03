FROM node:20-alpine AS builder
WORKDIR /app
COPY BetterJaksec/package*.json ./
RUN npm ci
COPY BetterJaksec/ .
RUN npm run build

FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/dist ./dist