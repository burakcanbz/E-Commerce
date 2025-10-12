FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm cache clean --force
RUN npm install --legacy-peer-deps

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app .
COPY .env .
EXPOSE 3000
CMD ["npm", "start"]