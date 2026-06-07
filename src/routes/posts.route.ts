import {Hono} from 'hono';
import type {Context} from 'hono';

const router = new Hono();

router.get('/', (c: Context) => {
    return c.json({msg: 'Hello!'});
})

export default router;