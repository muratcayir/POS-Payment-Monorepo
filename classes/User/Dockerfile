# Node.js imajını temel alarak başlıyoruz
FROM node:18-alpine

# Proje dizinini oluşturuyoruz ve ona geçiş yapıyoruz
WORKDIR /app

# Yalnızca package.json ve package-lock.json dosyalarını kopyalıyoruz ve bağımlılıkları yüklüyoruz
COPY ../../package*.json ./
RUN npm install --legacy-peer-deps

# Gerekli dosyaları kopyalıyoruz
COPY ../../tsconfig.json .
COPY ../../packages ./packages

# Sadece User modülünü kopyalıyoruz
COPY ./classes/User ./classes/User

# User modülündeki bağımlılıkları yüklemek için User dizinine geçiyoruz
WORKDIR /app/classes/User

# User modülündeki bağımlılıkları yüklüyoruz ve hataları yok sayarak lint işlemi yapıyoruz
RUN npm install --legacy-peer-deps
RUN npm run lint || true

# User modülünü derliyoruz
RUN npm run build || true

# Uygulamanın çalışacağı portu belirtiyoruz
EXPOSE 3000

# Uygulamayı başlatma komutunu tanımlıyoruz
CMD ["npm", "run", "dev"]
