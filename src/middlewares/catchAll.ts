import type {Context} from 'hono';

const catchAll = (c: Context) => {
    return c.json({msg: 'Route does not exist'}, 404);
}

export default catchAll;