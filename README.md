# Sekisho

## Overivew

A stateless Authentication API

# bun-setup

To install dependencies:

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

📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login and receive a JWT token |

🔐 Auth Flow
1. Register a user via `POST /auth/register`
2. Login via `POST /auth/login` to receive a JWT token
3. Pass the token in the `Authorization: Bearer <token>` header to protected routes in your own services

👨‍💻 Author
Yusuf — [github.com/yusef-codes10](https://github.com/yusef-codes10)