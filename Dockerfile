FROM node:18-alpine3.15 AS builder
WORKDIR /app
COPY /*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine3.15
WORKDIR /app
COPY --from=builder /app ./
EXPOSE ${PORT}
CMD ["npm", "run", "start:dev"]