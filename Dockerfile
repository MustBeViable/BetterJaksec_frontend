FROM node:20-alpine AS builder
WORKDIR /app
COPY BetterJaksec/package*.json ./
RUN npm ci
COPY BetterJaksec/ .
COPY BetterJaksec/.env.sample .env
RUN cat .env
RUN npm run build  # creates /app/build
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]