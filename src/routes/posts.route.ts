import {Hono} from 'hono';
import type {Context} from 'hono';
import type {Post} from '../types/posts';

const router = new Hono();

const posts: Post[] = [
    {id: 1, title: 'Weather API', content: 'nothing to mention'}
]

router.get('/', (c: Context) => {
    return c.json({msg: 'Hello!'});
})

router.get('/:id', (c: Context) => {
    const id = Number(c.req.param());

    const foundPost = posts.find(p => p.id === id);

    if (!foundPost) return c.json({msg: 'post does not exist'});

    c.json(foundPost);
})

export default router;