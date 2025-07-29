# syntax = docker/dockerfile:1

# 1. Build stage
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# 2. Production stage - serve with Caddy
FROM caddy:2-alpine

# Copy the built files from the previous stage
COPY --from=build /app/dist /usr/share/caddy

# Expose the default Caddy port
EXPOSE 80

# No CMD needed, caddy runs by default