import { Hono } from "hono";
import { userSchema } from "../types/user";
import { zValidator } from "@hono/zod-validator";
import { getUsers, getUserById, createUser, deleteUser, updateUser } from "../controllers/users.controller";

const route = new Hono();

route.get("/", ...getUsers);

route.post("/",
  zValidator("json", userSchema),
  ...createUser
);

route.get("/:id", ...getUserById);

route.delete("/:id", ...deleteUser);

route.patch("/:id", ...updateUser);

export default route;
