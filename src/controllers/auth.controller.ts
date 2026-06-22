import { createFactory } from "hono/factory";
import type {User} from '../types/user';
import { zValidator } from "@hono/zod-validator";
import { HTTPException } from "hono/http-exception";
import { usersSchema } from "../types/users";

const factor = createFactory<{Variables: {user: User}}>();

export const registerUser = factor.createHandlers(zValidator("json", usersSchema, (result, c) => {
  if (!result.success) {
    throw new HTTPException(400, { message: result.error.issues.map((i) => i.message).join(", ") });
  }
}),
    (c) => {
    return c.json({msg: 'hey'});
    // here we handle the user data and register
})