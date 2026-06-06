import {Hono} from 'hono';
import {logger} from 'hono/logger';

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

app.use(logger());

app.get('/', (c) => c.text('Hono is running'));

app.get('/users', (c) => c.json(users));

export default {
  port: 5200,
  fetch: app.fetch,
};