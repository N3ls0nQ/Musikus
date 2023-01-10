FROM node:alpine

WORKDIR /src/

COPY package*.json ./

RUN npm install 

COPY . ./

ENV TOKEN=MTAyMjUzOTM4MDc2MzY3Njc1Mg.G1MVPy.rkh8SwZ2mta2aE8fLQrZBfKDDunXO3rxCy3tLw

CMD ["node", "/src/index.js"]
