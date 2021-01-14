FROM node:latest

RUN mkdir -p /api

COPY ./ ./api

WORKDIR /api

RUN npm install

EXPOSE 3001

CMD ["npm", "start"]