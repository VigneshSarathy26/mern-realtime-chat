FROM node:18-alpine

WORKDIR /app
COPY shared ./shared
COPY services/user-service/package.json .
RUN npm install
COPY services/user-service .

CMD ["npm", "start"]
