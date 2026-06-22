import { z } from 'zod';

export const loginSchema = z.object({
    username: z.string(),
    password: z.string(),
})

export const usersSchema = loginSchema.extend({
    email: z.string(),
    fullName: z.string().nullish(), // both null or undefined
})

export const fullUsersSchema = usersSchema.extend({
    id: z.number(),
    createdAt: z.date()
})

type Users = z.infer<typeof fullUsersSchema>;

export type {Users};