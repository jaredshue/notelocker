# FROM node:13.12.0-alpine

# WORKDIR /frontend

# ENV PATH /frontend/node_modules/.bin:$PATH

# COPY ./ ./frontend

# # COPY package.json ./
# # COPY package-lock.json ./
# RUN npm install
# RUN npm install react-scripts@3.4.1 -g 


# EXPOSE 3000

# CMD ["npm", "start"]

FROM node:15-alpine

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]