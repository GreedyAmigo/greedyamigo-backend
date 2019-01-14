FROM node:11
WORKDIR /usr/src/graph

COPY package*.json ./
RUN npm install
COPY . .

RUN chmod +x ./scripts/wait-for-it.sh
RUN chmod +x ./scripts/bootstrap.sh

EXPOSE 4000