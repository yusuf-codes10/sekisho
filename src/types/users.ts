import { z } from 'zod';

export const usersSchema = z.object({
    username: z.string(),
    email: z.string(),
    fullName: z.string().nullish(), // both null or undefined
    passwordHash: z.string(),
})

export const fullUsersSchema = usersSchema.extend({
    id: z.number(),
    createdAt: z.date()
})

type Users = z.infer<typeof fullUsersSchema>;

export type {Users};