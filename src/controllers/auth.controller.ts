import { createFactory } from "hono/factory";
import { zValidator } from "@hono/zod-validator";
import { HTTPException } from "hono/http-exception";
import { usersSchema, loginSchema } from "../types/users";
import type { Users } from '../types/users';
import { db } from "../db/index";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken";

const factor = createFactory<{ Variables: { user: Users } }>();

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
      const [user] = await db.insert(users).values({
        username: username,
        email: email,
        fullName: fullName,
        passwordHash: hashedPassword,
      }).returning();

      if(!user) throw new HTTPException(500, {message: 'can\'t register! Please try agian!'});

      // log the user in (generate token)
      const token = await generateToken(user);

      return c.json({ message: "user registered", token });
    } catch (error) {
      console.log(error);
      if (error instanceof HTTPException) throw error;
      throw new HTTPException(500, { message: "Error registering user!" });
    }
  },
);

export const logUserIn = factor.createHandlers(
  zValidator("json", loginSchema, (result, c) => {
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

      // generate token
      const token = await generateToken(isExisting);

      return c.json({ msg: "user logged in", token });
    } catch (error) {
      console.log(error);
      if (error instanceof HTTPException) throw error;
      throw new HTTPException(500, { message: "Somthing went wrong!" });
    }
  },
);