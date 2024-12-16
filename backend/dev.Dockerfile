FROM node:20-alpine
WORKDIR /workspace
COPY . .
ENTRYPOINT ["/bin/sh", "./docker-entrypoint.sh" ]
