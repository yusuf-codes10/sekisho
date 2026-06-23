import { z } from 'zod';

export const loginSchema = z.object({
    username: z.string()
    .min(3, "username must be at least 3 characters!")
    .max(15, "username cannot exceed 15 chatacters")
    .trim()
    .toLowerCase()
    ,
    password: z.string()
    .min(8, "password must be at least 8 characters!")
    .max(50, "Password Cannot exceed 50 characters")
    .regex(/[0-9]/, "Password must contain at least one number"),
})

export const usersSchema = loginSchema.extend({
    email: z.string()
    .email("Invalid email adress!")
    .trim()
    .toLowerCase()
    ,
    fullName: z.string()
    .min(5, "Full name must be at least 5 characters!")
    .max(20, "Full name cannot exceed 20 characters!")
    .trim()
    .nullish()
    , // both null or undefined
})

export const fullUsersSchema = usersSchema.extend({
    id: z.number(),
    createdAt: z.date()
})

type Users = z.infer<typeof fullUsersSchema>;

export type {Users};