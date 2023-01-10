FROM node:16.14.2-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

COPY . ./

ENV TOKEN=MTAyMjUzOTM4MDc2MzY3Njc1Mg.Gz2qlY.Uyy74R0Q4cecToG61885gDLw8uZaYFznBfi7ww

CMD ["npm", "run" ,"start"]
