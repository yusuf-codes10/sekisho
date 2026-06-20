import {Hono} from 'hono';
import type {Context} from 'hono';
import type {Post} from '../types/posts';
import { HTTPException } from 'hono/http-exception';
import { zValidator } from '@hono/zod-validator';
import { postSchema } from '../types/posts';

const router = new Hono();

let posts: Post[] = [
    {id: 1, title: 'Weather API', content: 'nothing to mention'},
    {id: 2, title: 'Blog Article', content: 'Simple Blog Web app'},
    {id: 3, title: 'World Cup Analysis', content: '2026 WC'},
    {id: 4, title: 'Reality of Software Engineer', content: 'Tutorial hell, no first job'},
    {id: 5, title: 'Something Went Wrong'}
]

router.get('/', (c: Context) => {
    return c.json(posts);
})

router.get('/:id', (c: Context) => {
    const id = Number(c.req.param('id'));

    const foundPost = posts.find(p => p.id === id);

    if (!foundPost) return c.json({msg: 'post does not exist'});

    return c.json(foundPost);
})

router.post('/', zValidator('json', postSchema), async (c: Context) => {
    const {title, content} = await c.req.json();

    if (!content || !title) throw new HTTPException(400, {message: 'Missing Fields'});

    const newPost = {id: posts.length + 1, title: title, content: content};

    posts.push(newPost);

    return c.json(posts, 201);
})

router.delete('/:id', (c: Context) => {
    // grab the id
    const id = Number(c.req.param('id'));

    const foundPost = posts.find(p => p.id === id);

    if (!foundPost) throw new HTTPException(404, {message: 'Post does not exist!'});

    posts = posts.filter(p => p.id !== id);

    return c.json({msg: 'it has been deleted!', posts});


})

export default router;