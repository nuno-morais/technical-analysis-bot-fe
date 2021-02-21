FROM node:12 AS builder

WORKDIR /app
COPY ./package.json ./
RUN yarn install
COPY . .
FROM node:12-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 8000
CMD ["node", "./node_modules/.bin/react-scripts", "start"]
