FROM node:18-alpine

WORKDIR /app
COPY api-gateway/package.json .
RUN npm install
COPY api-gateway .

CMD ["npm", "start"]
