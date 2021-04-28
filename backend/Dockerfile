# Build stage

FROM node:12-alpine

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm ci && npm run build

# Runtime 

FROM node:12-alpine

USER node

RUN mkdir /home/node/code

WORKDIR /home/node/code

COPY --from=0 --chown=node:node /app .

EXPOSE 4000

CMD ["node", "build/app.js"]