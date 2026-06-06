import {Hono} from 'hono';
import catchAll from './src/middlewares/catchAll';
import { HTTPException } from 'hono/http-exception'

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


app.post('/', async (c, next) => {
    const {name, age, gender} = await c.req.json();

    if (!name || !age || !gender) return c.json({ msg: 'Missing fields' }, 400)

    const newUser: User = {name: name, age: age, gender: gender}
    users.push(newUser);
    return c.json(users);
})

app.notFound(catchAll);
app.onError((err, c) => {
    if (err instanceof HTTPException) {
        return c.json({ msg: err.message }, err.status)
    }
    return c.json({ msg: 'Internal server error' }, 500)
})

export default {
  port: 5200,
  fetch: app.fetch,
};