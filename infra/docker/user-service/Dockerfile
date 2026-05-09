FROM node:18-alpine

WORKDIR /app

# Build shared library first so the file: dependency resolves
COPY shared ./shared
WORKDIR /app/shared
RUN npm install && npm run build

# Install service dependencies (references shared via file:)
WORKDIR /app
COPY services/user-service/package.json .
RUN npm install

# Copy service source and run
COPY services/user-service .
CMD ["npm", "start"]
