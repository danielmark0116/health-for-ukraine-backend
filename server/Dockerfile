FROM node:14.18

WORKDIR /app

COPY package.json ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 7001
