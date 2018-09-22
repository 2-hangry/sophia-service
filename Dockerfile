FROM node:latest

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN npm install
RUN npm run db-start

EXPOSE 8080

CMD [ "npm", "start" ]