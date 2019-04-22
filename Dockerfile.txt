FROM node:10.5.0

WORKDIR /FoodMe

COPY package*.json ./
RUN npm install


COPY . .

EXPOSE 8081

CMD protractor protractor.conf.js --suite all
