FROM node:15-alpine

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN npm install

EXPOSE 3001

CMD [ "npm", "start" ]
