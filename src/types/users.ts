import { z } from 'zod';

export const usersSchema = z.object({
    username: z.string(),
    fullName: z.string().nullish(), // both null or undefined
    password: z.string(),
})

export const fullUsersSchema = usersSchema.extend({
    id: z.number(),
    email: z.string(),
    createdAt: z.date()
})

type Users = z.infer<typeof fullUsersSchema>;

export type {Users};