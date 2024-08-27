
FROM node:18

WORKDIR /backend/src

COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src
COPY .env .env

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/index.js"]
