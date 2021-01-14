FROM node:latest

COPY ./ ./frontend

WORKDIR /frontend

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]