FROM node:10

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
RUN npx yarn install
COPY . ./

# Need to build UI in Gradle and package it into the server so it can be served statically
# RUN npx yarn build
# CMD [ "npx", "serve", "-s", "build" ]

EXPOSE 3000
CMD ["npx", "yarn", "start"]

