FROM node:20
COPY . /api

ENV HOST=localhost
ENV DB_HOST=postgres
ENV DB_PORT=5432

WORKDIR /api

RUN npm install
ENTRYPOINT [ "npm", "start"]
