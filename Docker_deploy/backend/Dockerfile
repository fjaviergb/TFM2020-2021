FROM node:14
WORKDIR /usr/src/TFM13186

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8080
EXPOSE 8081
CMD [ "npm", "start" ]