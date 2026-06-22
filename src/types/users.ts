import { z } from 'zod';

export const usersSchema = z.object({
    username: z.string(),
    email: z.string(),
    // fullName: z.string(),
    passwordHash: z.string(),
})

export const fullUsersSchema = usersSchema.extend({
    id: z.number()
})

type Users = z.infer<typeof fullUsersSchema>;

export type {Users};