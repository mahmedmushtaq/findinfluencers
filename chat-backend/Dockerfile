FROM node:16.13.2-alpine

WORKDIR '/app'

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 8080

CMD ["npm", "run", "start"]