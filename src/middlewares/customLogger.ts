// custm logger middleware
import type {Context, Next} from 'hono';

const customLogger = async (c: Context, next: Next) => {
    console.log(`${c.req.method} ${c.req.url}`);
    await next();
}

export default customLogger;