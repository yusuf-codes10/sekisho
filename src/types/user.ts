import { z } from 'zod';


export const userSchema = z.object({
    id: z.number(),
    name: z.string(),
    age: z.number(),
    gender: z.string().optional()
})

type User = z.infer<typeof userSchema>

export type {User};