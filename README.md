# Product-management-App - PERN Full Stack Application

This is a product management full stack application built using the PERN stack (PostgreSQL, Express.js, React, Node.js). It provides a robust platform for managing products with comprehensive CRUD operations: Add products, Fetch products, Update products, and Delete products. Additionally, it is enhanced with the following features:


- 🚀 Rate Limiting & Bot Detection with Arcjet: Protects the application from automated clients and excessive requests using Arcjet's infrastructure-free security solutions.

- 👌 Global State Management with Zustand: Offers a lightweight and scalable state management solution with a simple hook-based API.

- 🐞 Error Handling on Server and Client: Ensures robust error management across both frontend and backend for a seamless user experience.

## 🛠️ Technologies

1. Vue.js
2. Javascript
3. Tailwind CSS
4. React.js
5. Express.js
6. Node.js
7. Neon - Serverless postgresql platform

## ⚙️ Start project

### 1. Clone the Repository

```bash
git clone https://github.com/GitAvi001/Product-management-App.git
```

### 2. Start backend

```bash
cd backend
npm install
npm run dev
```

### 3. Start frontend

```bash
cd frontend
npm install
npm run dev
```

## Environment variables configuration(.env)
```bash
PORT=<PORT_NUMBER>

### Connection string for PostgreSQL database(example)
'postgresql://<PGUSER>:<PGPASSWORD>@<PGHOST>/<PGDATABASE>?sslmode=require&channel_binding=require'

### PostgreSQL database configuration with Neon(example)

PGUSER='<PGUSER>'
PGHOST='<PGHOST>'
PGPASSWORD='<PGPASSWORD>'
PGDATABASE='<PGDATABASE>'

### Arcjet configuration
ARCJET_KEY=
ARCJET_ENV=

NODE_ENV=
```

## 📚 Links

Here are some of the key resources referred to during the development of this project:

- [Neon  Documentation](https://neon.com/docs/introduction) 
- [Arcjet Bot detection](https://docs.arcjet.com/bot-protection/quick-start)
- [Arcjet Rate Limiting](https://docs.arcjet.com/rate-limiting/quick-start)
- [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction)
- [daisyUI](https://v4.daisyui.com/docs/install/)
