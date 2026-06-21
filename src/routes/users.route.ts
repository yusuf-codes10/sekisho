import { Hono } from "hono";
import type { Context, Next } from "hono";
import type { User } from "../types/user";
import { userSchema } from "../types/user";
import { zValidator } from "@hono/zod-validator";
import { HTTPException } from "hono/http-exception";
import { getUsers, getUserById, createUser, deleteUser, updateUser } from "../controllers/users.controller";

const route = new Hono();

const users: User[] = [
  { id: 1, name: "Ella", age: 23, gender: "female" },
  { id: 2, name: "Veronica", age: 23, gender: "female" },
  { id: 3, name: "Jake", age: 25, gender: "male" },
  { id: 4, name: "Monica", age: 32, gender: "female" },
  { id: 5, name: "Alice", age: 27, gender: "female" },
  { id: 6, name: "Joseph", age: 23, gender: "male" },
  { id: 7, name: "Daniel", age: 29, gender: "male" },
  { id: 8, name: "Sophia", age: 24, gender: "female" },
  { id: 9, name: "Liam", age: 31, gender: "male" },
  { id: 10, name: "Emma", age: 28, gender: "female" },
  { id: 11, name: "Noah", age: 22, gender: "male" },
  { id: 12, name: "Olivia", age: 26, gender: "female" },
  { id: 13, name: "Ethan", age: 34, gender: "male" },
  { id: 14, name: "Ava", age: 21, gender: "female" },
  { id: 15, name: "Mason", age: 30, gender: "male" },
  { id: 16, name: "Isabella", age: 29, gender: "female" },
  { id: 17, name: "Lucas", age: 27, gender: "male" },
  { id: 18, name: "Mia", age: 33, gender: "female" },
  { id: 19, name: "Logan", age: 24, gender: "male" },
  { id: 20, name: "Amelia", age: 25, gender: "female" },
  { id: 21, name: "James", age: 36, gender: "male" },
  { id: 22, name: "Harper", age: 23, gender: "female" },
  { id: 23, name: "Benjamin", age: 28, gender: "male" },
  { id: 24, name: "Evelyn", age: 31, gender: "female" },
  { id: 25, name: "Henry", age: 26, gender: "male" },
  { id: 26, name: "Abigail", age: 35, gender: "female" },
  { id: 27, name: "Alexander", age: 32, gender: "male" },
  { id: 28, name: "Emily", age: 22, gender: "female" },
  { id: 29, name: "Michael", age: 30, gender: "male" },
  { id: 30, name: "Charlotte", age: 27, gender: "female" },
  { id: 31, name: "William", age: 34, gender: "male" },
  { id: 32, name: "Scarlett", age: 29, gender: "female" },
];

route.get("/", ...getUsers);

route.post(
  "/",
  zValidator("json", userSchema),
  ...createUser
);

route.get("/:id", ...getUserById);

route.delete("/:id", ...deleteUser);

route.patch("/:id", ...updateUser);

export default route;
