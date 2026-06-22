import { sign } from "hono/jwt";
import type {Users} from '../types/users';

const generateToken = async (user: Pick<Users, "id" | "username" | "email">) => {
  return await sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7
    },
    process.env.JWT_SECRET!,
    "HS256"
  )
}

export { generateToken };