FROM node:19

ADD . /src/

RUN cd /src/
RUN npm install --production

CMD ["node", "/src/index.js"]
