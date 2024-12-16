FROM node:20-alpine AS builder
WORKDIR /workspace

COPY package*.json ./
RUN npm ci || npm install
COPY . .
RUN npm run build --omit=dev

FROM nginx:stable-alpine

COPY --from=builder /workspace/dist/zyme-business /workspace
COPY default.conf.template /etc/nginx/templates/default.conf.template

CMD ["nginx", "-g", "daemon off;"]
