import {Hono} from 'hono';
import type {Context, Next} from 'hono';
import type {User} from '../types/user';
import {userSchema} from '../types/user';

const route = new Hono();

const users : User[] = [
    {name: 'Ella', age: 22, gender: 'F'},
    {name: 'Veronica', age: 23, gender: 'F'},
    {name: 'Jake', age: 25, gender: 'M'}
]


route.post('/', async (c: Context, next: Next) => {
    const body = await c.req.json();
    const parsed = userSchema.parse(body)

    const {name, age, gender} = parsed;

    if (!name || !age || !gender) return c.json({ msg: 'Missing fields' }, 400)

    const newUser: User = {name: name, age: age, gender: gender}
    users.push(newUser);
    return c.json(users);
});

route.get('/', (c: Context) => c.json(users));

export default route;
