import { createFactory } from "hono/factory";
import type { User } from "../types/user";
import { HTTPException } from "hono/http-exception";

const factory = createFactory<{ Variables: { user: User } }>();

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

// createHandelers returns an arrays of handlers, thus speard them
export const getUsers = factory.createHandlers((c) => {
  const ageQuery = c.req.query("age");
  const gender = c.req.query("gender");
  const pageQuery = c.req.query("page");
  const limitQuery = c.req.query("limit");
  const page = Number(pageQuery) || 1;
  const limit = Number(limitQuery) || 10;
  const skip = (page - 1) * limit;

  let filteredUsers = users;
  if (ageQuery !== undefined || gender !== undefined) {
    if (ageQuery !== undefined) {
      const age = Number(ageQuery);
      filteredUsers = filteredUsers.filter((user) => user.age === age);
    }

    if (gender !== undefined) {
      filteredUsers = filteredUsers.filter((user) => user.gender === gender);
    }
  }

  // pagination: ALWAYS PAGINATE
  return c.json(filteredUsers.slice(skip, skip + limit));
});

export const getUserById = factory.createHandlers((c) => {
  const id = Number(c.req.param("id"));

  const foundUser = users.find((user) => user.id === id);

  if (!foundUser)
    throw new HTTPException(404, { message: "User does not exist!" });

  return c.json(foundUser, 200);
});

export const createUser = factory.createHandlers(async (c) => {
  const body = await c.req.json();

  const { name, age, gender } = body;

  if (!name || !age || !gender) return c.json({ msg: "Missing fields" }, 400);

  const newUser: User = {
    id: users.length + 1,
    name: name,
    age: age,
    gender: gender,
  };
  users.push(newUser);
  return c.json(users);
});

export const deleteUser = factory.createHandlers((c) => {
  const id = Number(c.req.param("id"));

  const index = users.findIndex((user) => user.id === id);
  if (index === -1)
    throw new HTTPException(404, { message: "User Does not exist!" });

  users.splice(index, 1);

  return c.json({ msg: "user has beed deleted!", users });
})

export const updateUser = factory.createHandlers(async (c) => {
  const id = Number(c.req.param("id"));
  const { name, age, gender } = await c.req.json();
  const foundUser = users.find((user) => user.id === id);

  if (!foundUser)
    throw new HTTPException(404, { message: "User Does not exist!" });

  if (foundUser.name !== undefined) foundUser.name = name;
  if (foundUser.age !== undefined) foundUser.age = age;
  if (foundUser.gender !== undefined) foundUser.gender = gender;

  return c.json(users);
})