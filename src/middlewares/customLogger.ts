// custm logger middleware
import type { Context, Next } from "hono";
import chalk from "chalk";

const customLogger = async (c: Context, next: Next) => {
  const methodColors: Record<string, Function> = {
    GET: chalk.green,
    POST: chalk.blue,
    PUT: chalk.yellow,
    DELETE: chalk.red,
  };

  const colorFn = methodColors[c.req.method] || chalk.white;
  console.log(colorFn(`${c.req.method} ${c.req.url}`));
  await next();
};

export default customLogger;
