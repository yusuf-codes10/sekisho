import {Hono} from 'hono';
import type {Context} from 'hono';
import type {Post} from '../types/posts';

const router = new Hono();

const posts: Post[] = [
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

router.post('/', async (c: Context) => {
    const {title, content} = await c.req.json();

    const newPost = {id: posts.length + 1, title: title, content: content};

    posts.push(newPost);

    return c.json(posts);
})

export default router;