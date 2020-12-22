FROM node:14.11

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
COPY package.json yarn.lock package-lock.json /app/

RUN npm install

CMD ["./docker-entrypoint.sh"]
