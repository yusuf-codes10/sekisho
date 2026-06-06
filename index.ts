import {Hono} from 'hono';
import catchAll from './src/middlewares/catchAll';
import errorHandler from './src/utils/errorHandler';
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

app.get('/', (c) => c.text('Hono is running'));

app.get('/users', (c) => c.json(users));


app.post('/', async (c, next) => {
    const body = await c.req.json();
    const parsed = userSchema.parse(body)

    const {name, age, gender} = parsed;

    if (!name || !age || !gender) return c.json({ msg: 'Missing fields' }, 400)

    const newUser: User = {name: name, age: age, gender: gender}
    users.push(newUser);
    return c.json(users);
})

app.notFound(catchAll);
app.onError(errorHandler);

export default {
  port: 5200,
  fetch: app.fetch,
};