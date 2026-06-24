# Sekisho
## 📖 Overview
Sekisho is a stateless authentication REST API built with Hono and Bun. It handles user registration, login, and JWT token generation — designed to be consumed by any frontend or external service that needs auth out of the box.

## 🚀 Live Demo
Coming soon

## ✨ Features

* JWT-based authentication with secure token generation
* Password hashing using Bun's native `Bun.password` (Argon2id)
* Runtime request validation with Zod — no invalid data reaches your handlers
* Rate limiting on auth routes — brute force protection out of the box
* Optimistic insertion with race condition safe duplicate detection via DB unique constraints
* Global error handling — clean, consistent error responses across all routes
* CORS enabled — ready to be consumed by any client
* Environment validation at boot — fails loudly if secrets are missing

🛠 Tech Stack
Runtime Bun · Framework Hono · Database PostgreSQL · ORM Drizzle ORM · Validation Zod · Auth JWT

## 💡 Why I built this
Most projects repeat the same auth setup from scratch. Sekisho is a standalone auth service you can plug into any project — it handles registration, login, and token issuance so you don't have to.

## ⚙️ Installation

```bash
git clone https://github.com/yusef-codes10/sekisho
cd sekisho
bun install
```

Set up your environment variables:

```bash
cp .env.example .env
```

```env
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_jwt_secret
```

Run database migrations:

```bash
bun drizzle-kit push
```

Start the development server:

```bash
bun dev
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login and receive a JWT token |

🔐 Auth Flow
1. Register a user via `POST /auth/register`
2. Login via `POST /auth/login` to receive a JWT token
3. Pass the token in the `Authorization: Bearer <token>` header to protected routes in your own services

## 👨‍💻 Author
Yusuf — [github.com/yusef-codes10](https://github.com/yusef-codes10)