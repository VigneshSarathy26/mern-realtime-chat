FROM node:18-alpine

WORKDIR /app
COPY shared ./shared
COPY services/chat-service/package.json .
RUN npm install
COPY services/chat-service .

CMD ["npm", "start"]
