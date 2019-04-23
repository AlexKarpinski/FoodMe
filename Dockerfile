FROM node:10.5.0

WORKDIR /FoodMe

COPY package.json /FoodMe
RUN npm install
COPY . /FoodMe
CMD protractor protractor.conf.js --suite all
EXPOSE 8081
