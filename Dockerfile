FROM node:8.11-alpine

# Set up working directory
WORKDIR /usr/src/app

# Install app dependencies
COPY ./package*.json /usr/src/app/

RUN npm install

COPY . /usr/src/app/
RUN npm run build:prod

EXPOSE 3000
CMD ["npm", "run", "serve"]
# Angular base image
#FROM teracy/angular-cli:1.7.4
#RUN npm update -g @angular/cli
#
## Install latest version of Chrome
#RUN apt-get update && apt-get install google-chrome-stable
#
## Set up working directory
#WORKDIR /usr/src/app/
#
## Install packages
#COPY ./package*.json /usr/src/app/
#
#RUN npm install --silent
#
## Add code
#COPY ./ /usr/src/app/
#
#EXPOSE 4200
#
#CMD ["ng"]
