FROM node:18-alpine3.15

WORKDIR /app

COPY *.json ./

RUN npm install --cache-clean --force

COPY . .

EXPOSE ${PORT}

CMD ["npm", "run", "start:dev"]