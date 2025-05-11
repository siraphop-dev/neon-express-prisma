# 🛠 Neon + Express + Prisma CRUD API (Step-by-Step)

## 📦 1. เตรียมเครื่องมือ

* ติดตั้ง [Node.js](https://nodejs.org/)
* ติดตั้ง [Docker Desktop](https://www.docker.com/products/docker-desktop/)
* ติดตั้ง [Git](https://git-scm.com/)

---

## 🔁 2. Clone โปรเจกต์

```bash
git clone https://github.com/siraphop-dev/neon-express-prisma.git
cd neon-express-prisma
```

---

## 📁 3. ติดตั้ง dependencies (เฉพาะรอบแรก)

ลบของเก่า (ถ้ามี):

```bash
rm -rf node_modules package-lock.json
```

ติดตั้งใหม่ทั้งหมด:

```bash
npm install
```

---

## 🧱 4. ตรวจสอบ `package.json`

ไฟล์ `package.json` ควรมี dependencies ดังนี้:

```json
"dependencies": {
  "@neondatabase/serverless": "^1.0.0",
  "@prisma/adapter-neon": "^6.7.0",
  "@prisma/client": "^6.7.0",
  "dotenv": "^16.5.0",
  "express": "^5.1.0",
  "cors": "^2.8.5"
}
```

ถ้าไม่มี `cors` หรือแพ็กเกจอื่น ให้ติดตั้งด้วย:

```bash
npm install cors
```

---

## 🐳 5. รัน Docker (สำหรับ Postgres + Node App)

```bash
docker compose down --volumes --remove-orphans
docker compose build --no-cache
docker compose up
```

> ✅ เมื่อระบบทำงาน จะเห็นข้อความ:
> `Server is running on http://localhost:3000`

---

## 🌐 6. ทดสอบ API ด้วย Browser หรือ Postman

| Method | Endpoint         | ใช้งาน                        |
| ------ | ---------------- | ----------------------------- |
| GET    | `/api/items`     | ดึงรายการทั้งหมด              |
| POST   | `/api/items`     | เพิ่มรายการใหม่ (name, price) |
| PUT    | `/api/items/:id` | แก้ไขรายการที่มี id           |
| DELETE | `/api/items/:id` | ลบรายการที่มี id              |

---

## 🖥 7. HTML Frontend

ระบบนี้มี `public/index.html` ที่ให้คุณเปิดในเบราว์เซอร์:
📂 [http://localhost:3000](http://localhost:3000)

---

## 🧪 8. Prisma ใช้งานยังไง?

Prisma ใช้จัดการฐานข้อมูลแบบ ORM:

* แก้ schema ใน `prisma/schema.prisma`
* ใช้คำสั่ง migrate:

```bash
npx prisma migrate dev --name init
```

---

## 🔁 Reset ระบบใหม่ (Optional)

```bash
docker compose down --volumes --remove-orphans
rm -rf node_modules package-lock.json
npm install
docker compose build --no-cache
docker compose up
```

---

## ☁️ นำเข้าผ่าน Firebase Studio

[![Import to Firebase Studio](https://cdn.firebasestudio.dev/btn/open_blue_32.svg)](https://studio.firebase.google.com/import?url=https://github.com/siraphop-dev/neon-express-prisma)

---