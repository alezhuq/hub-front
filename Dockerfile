FROM node:22-alpine

WORKDIR /app

COPY bookhub/package*.json ./

RUN npm install

COPY bookhub .

EXPOSE 3000
RUN npm run build

CMD ["npm", "run", "dev"]
