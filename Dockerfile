FROM node:24-alpine

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

EXPOSE 3000
EXPOSE 5173

CMD ["npm", "run", "dev"]
