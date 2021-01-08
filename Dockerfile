FROM node:12-alpine AS build

USER node
RUN mkdir /home/node/svg-optimizer/ && chown -R node:node /home/node/svg-optimizer
WORKDIR /home/node/svg-optimizer

COPY --chown=node:node . .
RUN yarn install --frozen-lockfile && yarn build

FROM node:12-alpine

USER node
EXPOSE 3010

RUN mkdir /home/node/svg-optimizer/ && chown -R node:node /home/node/svg-optimizer
WORKDIR /home/node/svg-optimizer

COPY --chown=node:node --from=build /home/node/svg-optimizer/dist ./dist
COPY --chown=node:node --from=build /home/node/svg-optimizer/package.json /home/node/svg-optimizer/yarn.lock ./
RUN mkdir /home/node/svg-optimizer/uploads
RUN yarn install --frozen-lockfile --production

CMD [ "node", "dist/index.js" ]
