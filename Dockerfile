# syntax=docker/dockerfile:1

FROM node:lts-alpine

WORKDIR /server

COPY package.json package-lock.json ./

FROM base as test
RUN npm ci --silent
COPY . .
EXPOSE 8080
CMD [ "npm", "run", "test" ]

FROM base as prod
RUN npm ci --production --silent
COPY . .
EXPOSE 8080
CMD [ "node", "start" ]
