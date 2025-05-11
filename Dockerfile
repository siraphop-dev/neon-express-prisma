FROM node:20

# ติดตั้ง netcat (เวอร์ชัน openbsd)
RUN apt-get update && apt-get install -y netcat-openbsd

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["node", "server.js"]
