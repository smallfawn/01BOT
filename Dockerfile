FROM node:20
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3333
RUN npm install pm2
CMD pm2 start app/ws.js --watch