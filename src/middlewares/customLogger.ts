// custm logger middleware
import type {Context, Next} from 'hono';
import colors from 'colors';

const customLogger = async (c: Context, next: Next) => {
      const methodColors:  Record<string, string> = {
    GET: "green",
    POST: "blue",
    PUT: "yellow",
    DELETE: "red",
  };


    const color = (methodColors[c.req.method] || 'white') as keyof typeof colors;
console.log(colors[color](`${c.req.method} ${c.req.url}`));
    await next();
}

export default customLogger;