FROM node:14.18.2

WORKDIR /usr/PosMecanica/frontend-posmecanica

COPY . ./
COPY package*.json ./

RUN yarn cache clean
RUN yarn config set strict-ssl false

RUN yarn install

RUN yarn build

EXPOSE 3000 

CMD ["yarn", "start"]