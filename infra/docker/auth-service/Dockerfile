FROM node:18-alpine

WORKDIR /app
COPY shared ./shared
COPY services/auth-service/package.json .
RUN npm install
COPY services/auth-service .

CMD ["npm", "start"]
