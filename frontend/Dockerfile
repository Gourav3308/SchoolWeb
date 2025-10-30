# ===== Build Angular app =====
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ===== Nginx runtime =====
FROM nginx:1.25-alpine
WORKDIR /usr/share/nginx/html

# Copy build output
COPY --from=build /app/dist/ /usr/share/nginx/html/

# Template and entrypoint to support dynamic PORT on Render
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY docker-nginx-entrypoint.sh /docker-nginx-entrypoint.sh

ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["/bin/sh","/docker-nginx-entrypoint.sh"]


