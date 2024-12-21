FROM node:20
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3333
CMD npm start