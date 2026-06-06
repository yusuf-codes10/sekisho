import {Hono} from 'hono';
import {logger} from 'hono/logger';
import customLogger from './src/middlewares/customLogger';
import catchAll from './src/middlewares/catchAll';

type User = {
    name: string,
    age: number,
    gender?: string
}

const users : User[] = [
    {name: 'Ella', age: 22, gender: 'F'},
    {name: 'Veronica', age: 23, gender: 'F'},
    {name: 'Jake', age: 25, gender: 'M'}
]

const app = new Hono();

app.get('/', (c) => c.text('Hono is running'));

app.get('/users', (c) => c.json(users));


app.post('/', async (c) => {
    const {name, age, gender} = await c.req.json();
})

app.use(customLogger);
app.notFound(catchAll);

export default {
  port: 5200,
  fetch: app.fetch,
};