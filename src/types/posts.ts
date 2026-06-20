import {z} from 'zod';

export const postSchema = z.object({
    id: z.number(),
    title: z.string(),
    content: z.string().optional()
})

type Post = z.infer<typeof postSchema>

export type {Post}