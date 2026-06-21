import {Hono} from 'hono';
import catchAll from './middlewares/catchAll';
import errorHandler from './utils/errorHandler';
import customLogger from './middlewares/customLogger';
import postsRouter from './routes/posts.route';
import usersRouter from './routes/users.route';
import authRouter from './routes/auth.route';

const app = new Hono();

app.use(customLogger);

app.route('/auth', authRouter);
app.route('/users', usersRouter);
// handlers are not middlewares in hono
app.route('/posts', postsRouter);

app.notFound(catchAll);
app.onError(errorHandler);

export default {
  port: 5200,
  fetch: app.fetch,
};