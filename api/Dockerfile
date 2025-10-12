FROM node:18-alpine as builder
WORKDIR /app
COPY . .
RUN npm cache clean --force
RUN npm install --legacy-peer-deps

FROM node:18-alpine as production
WORKDIR /app
COPY --from=builder /app .
EXPOSE 3000
CMD ["npm", "start"]