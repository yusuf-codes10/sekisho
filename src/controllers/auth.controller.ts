import { createFactory } from "hono/factory";
import { fullUserSchema, type User } from "../types/user";
import { zValidator } from "@hono/zod-validator";
import { HTTPException } from "hono/http-exception";
import { usersSchema, fullUsersSchema } from "../types/users";
import { db } from "../db/index";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { decode, sign, verify } from "hono/jwt";

const factor = createFactory<{ Variables: { user: User } }>();

export const registerUser = factor.createHandlers(
  zValidator("json", fullUsersSchema, (result, c) => {
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
      const [duplicateUsername] = await db
        .select()
        .from(users)
        .where(eq(users.username, username));

      if (duplicateUsername)
        throw new HTTPException(400, { message: "username already exits!" });

      const [duplicateEmail] = await db
        .select()
        .from(users)
        .where(eq(users.email, email));

      if (duplicateEmail)
        throw new HTTPException(400, { message: "email already exists!" });

      //   hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // inset a new user
      await db.insert(users).values({
        username: username,
        email: email,
        fullName: fullName,
        passwordHash: hashedPassword,
      });

      return c.json({ message: "user registered" });
    } catch (error) {
      console.log(error);
      if (error instanceof HTTPException) throw error;
      throw new HTTPException(500, { message: "Error registering user!" });
    }
  },
);

export const logUserIn = factor.createHandlers(
  zValidator("json", usersSchema, (result, c) => {
    if (!result.success) {
      throw new HTTPException(400, {
        message: result.error.issues.map((i) => i.message).join(", "),
      });
    }
  }),
  async (c) => {
    // grab user data
    const body = c.req.valid("json");

    const { username, password } = body;
    try {
      const [isExisting] = await db
        .select()
        .from(users)
        .where(eq(users.username, username));

      if (!isExisting)
        throw new HTTPException(400, {
          message: "username does not exist! Please, Register first!",
        });

      // check if password hash match

      const validPwd = await bcrypt.compare(password, isExisting.passwordHash);
      if (!validPwd)
        throw new HTTPException(400, { message: "Wrong Password!" });

      const jwtSecret = process.env.JWT_SECRET;

      if (!jwtSecret) {
        throw new HTTPException(500, {
          message: "JWT secret is not configured",
        });
      }
      // now generate a jwt token to sign the user in
      const token = await sign(
        {
          id: isExisting.id,
          username: isExisting.username,
          email: isExisting.email,
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
        },
        jwtSecret,
        "HS256",
      );

      return c.json("logged in");
    } catch (error) {
      console.log(error);
      if (error instanceof HTTPException) throw error;
      throw new HTTPException(500, { message: "Somthing went wrong!" });
    }
  },
);

// export const logout = factor.createHandlers();
