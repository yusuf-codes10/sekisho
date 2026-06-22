import { createFactory } from "hono/factory";
import type { User } from "../types/user";
import { zValidator } from "@hono/zod-validator";
import { HTTPException } from "hono/http-exception";
import { usersSchema } from "../types/users";
import { db } from "../db/index";
import { users } from "../db/schema";
import { eq } from 'drizzle-orm';

const factor = createFactory<{ Variables: { user: User } }>();

export const registerUser = factor.createHandlers(
  zValidator("json", usersSchema, (result, c) => {
    if (!result.success) {
      throw new HTTPException(400, {
        message: result.error.issues.map((i) => i.message).join(", "),
      });
    }
  }),
  async (c) => {
    // grab the user data
    const body = c.req.valid("json");

    const { username, email, fullName, password } = body;

    // check if email or username already in the db
    try {
      const duplicateUser = await db
        .select()
        .from(users)
        .where(eq(users.username, username));
    } catch (error) {
      console.log(error);
      throw new HTTPException(500, { message: "Error registering user!" });
    }

    return c.json({ message: "hey" });
  },
);
