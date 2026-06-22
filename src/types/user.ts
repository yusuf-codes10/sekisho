import { z } from 'zod';

export const userSchema = z.object({
    name: z.string(),
    age: z.number(),
    gender: z.string().optional()
})

export const fullUserSchema = userSchema.extend({
    id: z.number()
})

type User = z.infer<typeof fullUserSchema>

export type {User};