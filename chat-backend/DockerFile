FROM node:12.22.1-alpine3.12

WORKDIR '/app'

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 8080

CMD ["npm", "run", "build"]