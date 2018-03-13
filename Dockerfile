FROM node:carbon

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm config set proxy "http://wwwcache.univ-lr.fr:3128"
RUN npm config set https-proxy "http://wwwcache.univ-lr.fr:3128"

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "prod"]