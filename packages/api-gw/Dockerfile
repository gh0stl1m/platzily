# Build
from node:14.14-alpine as builder

# Environment
WORKDIR /src/app

# Dependencies
COPY package.json /src/app
COPY yarn.lock /src/app
COPY lerna.json /src/app

COPY ./packages/mongodb-connection-module /src/app/packages/mongodb-connection-module
COPY ./packages/links-module /src/app/packages/links-module
COPY ./packages/api-gw /src/app/packages/api-gw

RUN yarn install --frozen-file --production -W

# Serve
FROM node:14.14-alpine

ENV NODE_ENV=production
ARG SERVER_PORT
ENV SERVER_PORT=$SERVER_PORT
WORKDIR /src/app

COPY --from=builder /src/app /src/app
COPY .env /src/.env

EXPOSE $SERVER_PORT

ENTRYPOINT ["yarn", "start:server"]
