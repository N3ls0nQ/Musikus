FROM node:alpine

WORKDIR /src/

COPY package*.json ./

RUN npm install 

COPY . ./

ENV TOKEN=

CMD ["node", "/src/index.js"]
