import {Hono} from 'hono';
import catchAll from './middlewares/catchAll';
import errorHandler from './utils/errorHandler';
import customLogger from './middlewares/customLogger';
import authRouter from './routes/auth.route';
import { rateLimiter } from 'hono-rate-limiter';
import { env } from './utils/env';

const app = new Hono();

app.use(customLogger);

app.use('*', rateLimiter({
  windowMs: 60 * 1000,
  limit: 100,
  keyGenerator: (c) => c.req.header("x-forwarded-for") ?? "unknown"
}))

app.route('/auth', authRouter);

// handlers are not middlewares in hono
app.notFound(catchAll);
app.onError(errorHandler);

export default {
  port: env.PORT,
  fetch: app.fetch,
};