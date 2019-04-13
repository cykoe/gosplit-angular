# build stage
FROM node:8.15.1 as build-stage

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install

COPY . .

RUN npm run build:prod

# serve stage
FROM nginx:1.13.9-alpine

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
