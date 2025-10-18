# 1️⃣ Builder
FROM node:18-alpine AS builder
WORKDIR /app

# Önce package dosyalarını kopyala (cache için)
COPY package*.json ./

# dependencies ve devDependencies yükle
RUN npm install --legacy-peer-deps
RUN npm install --include=dev

# Tüm proje dosyalarını kopyala
COPY . .

# Build al
RUN npm run build

# 2️⃣ Production container
FROM node:18-alpine
WORKDIR /app

# serve global olarak yükle
RUN npm install -g serve

# builder’dan dist klasörünü kopyala
COPY --from=builder /app/dist ./dist

# Render için port
EXPOSE 5173

# Render ortamında genellikle $PORT atanır
CMD ["sh", "-c", "serve -s dist -l ${PORT:-5173}"]
