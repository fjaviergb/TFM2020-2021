FROM node:14
WORKDIR /usr/src/TFM13186

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8081
EXPOSE 8080
CMD [ "npm", "start" ]