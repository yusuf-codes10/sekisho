import {Hono} from 'hono';
import catchAll from './middlewares/catchAll';
import errorHandler from './utils/errorHandler';
import customLogger from './middlewares/customLogger';
import postsRouter from './routes/posts.route';
import { z } from 'zod';

const userSchema = z.object({
    name: z.string(),
    age: z.number(),
    gender: z.string().optional()
})

type User = z.infer<typeof userSchema>

const users : User[] = [
    {name: 'Ella', age: 22, gender: 'F'},
    {name: 'Veronica', age: 23, gender: 'F'},
    {name: 'Jake', age: 25, gender: 'M'}
]

const app = new Hono();

app.use(customLogger);

app.get('/', (c) => c.text('Hono is running'));

app.get('/users', (c) => c.json(users));


app.post('/', )

// handlers are not middlewares in hono
app.route('/posts', postsRouter);

app.notFound(catchAll);
app.onError(errorHandler);

export default {
  port: 5200,
  fetch: app.fetch,
};