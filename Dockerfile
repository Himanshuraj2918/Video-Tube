FROM node

WORKDIR /backend

COPY ./package*.json ./

RUN npm install

COPY . .

ENTRYPOINT [ "npm","run","dev"]