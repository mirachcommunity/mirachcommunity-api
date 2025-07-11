# 🌐 Mirach Community API

A simple RESTful API built with **Express.js**, **MySQL**, and **Prisma ORM**.

## 🚀 Features

- RESTful API structure
- MySQL database integration
- Prisma ORM for database access
- Modular routing & controllers
- Environment variable configuration via `.env` & `.env.local`
- Logger middleware
- Nodemon for development

---

## 📦 Tech Stack

- [Express.js](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [Prisma ORM](https://www.prisma.io/)
- [Dotenv](https://github.com/motdotla/dotenv)
- [Nodemon](https://nodemon.io/)

---

## ⚙️ Installation

1. **Clone the repo**

```bash
git clone https://github.com/mirachcommunity/mirachcommunity-api.git
cd mirachcommunity-api
npm install
cp .env.example .env
cp .env.local.example .env.local
# Edit the .env.local with your DB credentials
npx prisma migrate dev --name init
npm run dev
```
